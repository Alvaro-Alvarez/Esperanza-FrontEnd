import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { BasService } from 'src/app/modules/shared/services/bas.service';
import { EventService } from 'src/app/modules/shared/services/event.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { ShoppingService } from 'src/app/modules/shared/services/shopping.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { ProductService } from '../../modules/shared/services/product.service';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { AuthService } from '../../modules/shared/services/auth.service';
import { Cart, Package, Product } from 'src/app/core/models/cart';
import { MasterDataService } from '../../modules/shared/services/master-data.service';
import { PromotionType } from 'src/app/core/enums/promotion-type.enum';
import { PromotionInformationComponent } from './promotion-information/promotion-information.component';
import { CompletePurchaseComponent } from './complete-purchase/complete-purchase.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }]
})
export class CartComponent implements OnInit {

  cart: Cart;
  maxQuantity = 10;
  noUserClientCode = '001';
  outOfStock = false;
  userLogged = false;
  recommendedProducts: any[] = [];
  hasImgs: boolean[] = [];
  userEnabled? = false;
  conditionTypes: any[] = [];
  promotionType = PromotionType;

  constructor(
    private routing: RoutingService,
    private shoppingCartService: ShoppingService,
    private eventService: EventService,
    private alert: SweetAlertService,
    private basService: BasService,
    private spinner: SpinnerService,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private productService: ProductService,
    private userService: UserService,
    private authService: AuthService,
    private masterDataService: MasterDataService
  ) {
    this.cart = this.shoppingCartService.getCartLocalStorage();
    this.getConditionsTypes();
    this.getUser();
  }

  ngOnInit(): void {
    if (this.cart?.offers){
      this.cart?.offers.map((offers: any) => {
        this.hasImgs.push(true);
      });
    }
    this.getRecommended();
    this.updateStocks();
  }
  getUser(){
    this.spinner.show();
    const id = this.authService.getUserId();
    if (id){
      this.userService.GetByGuid(id).subscribe(user => {
        this.userEnabled = user.enabled;
      }, err => {
        this.spinner.hide();
        const error = err?.error ? err.error : 'Ocurrió un error al tratar de obtener el usuario actual';
        this.alert.error(error);
      });
    }
  }
  removeElement(index: number, condition: string){
    this.alert.warning('Eliminar', 'Estas por eliminar el producto del carrito, estás de acuerdo?', ()=>{
      const cartCopy = this.cart;
      const cartPackage = cartCopy.packages.find(p => p.condition === condition);
      cartPackage?.products.splice(index, 1);
      if (cartPackage?.products.length === 0) cartCopy.packages.splice(cartCopy.packages.indexOf(cartPackage), 1);
      if (cartCopy.offers.length === 0 && cartCopy.packages.length === 0){
        this.shoppingCartService.removeCartToLocalStorage();
        this.eventService.onShoppingCartAction.emit();
        this.routing.goToHome();
      }
      else this.shoppingCartService.resetPrices(cartCopy);
    })
  }
  removePromotion(index: number){
    this.alert.warning('Eliminar', 'Estas por eliminar la promoción del carrito, estás de acuerdo?', ()=>{
      const cartCopy = this.cart;
      cartCopy.offers.splice(index, 1);
      if (cartCopy.offers.length === 0 && cartCopy.packages.length === 0){
        this.shoppingCartService.removeCartToLocalStorage();
        this.eventService.onShoppingCartAction.emit();
        this.routing.goToHome();
      }
      else this.shoppingCartService.resetPrices(cartCopy);
    })
  }
  resetPrices(event: any, condition: string){
    const cartPackage = this.cart.packages.find(p => p.condition === condition);
    cartPackage!.products[event.index].quantity = event.quantity;
    this.shoppingCartService.resetPrices(this.cart);
  }
  getMaxStock(bas: any){
    return bas.Stock;
  }
  updateStocks(){
    let products: Product[] = [];
    let canWork = this.cart && this.cart.packages != undefined;
    if (canWork){
      const clientBas = JSON.parse(this.localStorageService.getBasClient()!);
      let clientCode: string = this.userLogged ? clientBas.Codigo : this.noUserClientCode;
      this.cart.packages.map(cartPackage => {
        products.push(...cartPackage.products);
      });
      let obs: any[] = [];
      products.map((product: Product) => {
        obs.push(this.basService.getProduct(clientCode, product.code, product.condition));
      });
      this.spinner.show();
      forkJoin(obs).subscribe(productsBas => {
        this.spinner.hide();
        productsBas.map(productBas => {
          const product = products.find(p => p.code === productBas.Codigo);
          if (product){
            product.stock = productBas.Stock;
            product.inStock = product.quantity <= productBas.Stock;
          }
        });
      }, err =>{
        this.spinner.hide();
        const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
        this.alert.error(error);
      });
    }
  }
  finishOrder(){
    const basClient = this.localStorageService.getBasClient();
    if (!basClient){
      this.alert.info('Realizar pedido', 'Para realizar pedido registrarse o iniciar sesión');
      return;
    }
    let products: Product[] = [];
    this.cart.packages.map((cartPackage: Package) => {
      products.push(...cartPackage.products);
    });
    let itemNoStock = products.some((product: Product) => !product.inStock);
    if (itemNoStock){
      this.alert.error('Alguno de los productos no cuenta con stock disponible, eliminelo para poder continuar.');
      return;
    }
    this.goToCompletePurchase();
  }
  goToCompletePurchase(){
    const modalRef = this.modalService.open(CompletePurchaseComponent, { centered: true, backdrop: 'static', size: 'lg' });
    modalRef.componentInstance.cart = this.cart; 
    modalRef.componentInstance.complete.subscribe((res: any) => {
      this.shoppingCartService.removeCartToLocalStorage();
      this.eventService.onShoppingCartAction.emit();
      this.modalService.dismissAll();
      this.routing.goToAccount();
    })
  }
  getRecommended(){
    this.spinner.show();
    const clientBas = JSON.parse(this.localStorageService.getBasClient()!);
    let clientCode: string = clientBas ? clientBas.Codigo : this.noUserClientCode;
    this.basService.GetRecommendedProducts(clientCode).subscribe(res => {
      this.spinner.hide();
      let codes = res?.map((a: any) => a.CODIGOS);
      for(let i = 0; i < codes?.length; i++){
        const arr = codes[i].split('|');
        if (arr.length > 1) codes[i] = arr[0];
      }
      codes = codes.slice(0, 7);
      this.getRecommendedProducts(codes);
    }, err =>{
      this.spinner.hide();
      console.log(err);
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    })
  }
  getRecommendedProducts(productCodes: string[]){
    this.spinner.show();
    this.productService.getAllRecommended({productCodes: productCodes}).subscribe(res => {
      this.spinner.hide();
      this.recommendedProducts = res.products;
      if (this.recommendedProducts?.length > 5) this.recommendedProducts = this.recommendedProducts.slice(0, 5)
    }, err =>{
      this.spinner.hide();
      console.log(err);
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    })
  }
  goToProduct(code: string){
    this.routing.goToProductDescription(code);
  }
  goToAllProducts(){
    const condition = this.localStorageService.getConditionToRouting();
    this.routing.goCustomerToProducs('0', condition!);
  }
  getImgName(promotion: any): string{
    let name: string = promotion?.Codigo;
    return name + '.jpeg';
  }
  updateUrl(index: number){
    this.hasImgs[index] = false;
  }
  promotionDetail(index: number){
    const modalRef = this.modalService.open(PromotionInformationComponent, { centered: true, backdrop: 'static', size: 'lg' });
    modalRef.componentInstance.offer = this.cart.offers[index]; 
    modalRef.componentInstance.type = this.cart.offers[index].type;
  }
  getConditionsTypes(){
    this.spinner.show();
    this.masterDataService.getConditionTypes().subscribe(res => {
      this.spinner.hide();
      this.conditionTypes = res;
    }, err =>{
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de obtener el usuario actual';
      this.alert.error(error);
    })
  }
  getPackageName(condition: string): string{
    if (this.conditionTypes.length > 0){
      const conditionType = this.conditionTypes.find(c => c.code === condition);
      if (conditionType){
        return conditionType.description;
      }
      else return '';
    }
    else return '';
  }
  goToLogin(){
    this.routing.goToLogin();
  }
  goToRegister(){
    this.routing.goToRegister();
  }
}
