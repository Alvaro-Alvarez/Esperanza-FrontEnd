import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { BasService } from 'src/app/modules/shared/services/bas.service';
import { EventService } from 'src/app/modules/shared/services/event.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { ShoppingService } from 'src/app/modules/shared/services/shopping.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { CompletePurchaseComponent } from './complete-purchase/complete-purchase.component';
import { ProductService } from '../../modules/shared/services/product.service';
import { PromotionInformationComponent } from './promotion-information/promotion-information.component';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { AuthService } from '../../modules/shared/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  shoppingCart: any;
  maxQuantity = 10;
  noUserClientCode = '001';
  outOfStock = false;
  userLogged = false;
  recommendedProducts: any[] = [];
  hasImgs: boolean[] = [];
  userEnabled? = false;

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
  ) {
    this.getUser();
  }

  ngOnInit(): void {
    this.shoppingCart = this.shoppingCartService.getLocalCart();
    if (this.shoppingCart?.itemPromotionsCart){
      this.shoppingCart?.itemPromotionsCart.forEach((item: any) => {
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
      let priceToDiscount = 0;
      let shoppingCartCopy = this.shoppingCart;
      if (condition === 'CCM'){
        priceToDiscount = shoppingCartCopy.itemsCcm[index].price;
        shoppingCartCopy.itemsCcm.splice(index, 1);
      }
      if (condition === 'CCB'){
        priceToDiscount = shoppingCartCopy.itemsCcb[index].price;
        shoppingCartCopy.itemsCcb.splice(index, 1);
      }
      shoppingCartCopy.totalPrice = shoppingCartCopy.totalPrice - priceToDiscount;
      if (shoppingCartCopy.itemsCcm.length === 0 && shoppingCartCopy.itemsCcb.length === 0){
        this.shoppingCartService.removeShoppingBag();
        this.eventService.onShoppingCartAction.emit();
        this.routing.goToHome();
      }
      else this.shoppingCartService.resetShoppingBag(shoppingCartCopy);
    })
  }
  removePromotion(index: number){
    this.alert.warning('Eliminar', 'Estas por eliminar la promoción del carrito, estás de acuerdo?', ()=>{
      let priceToDiscount = 0;
      let promotion = this.shoppingCart.itemPromotionsCart[index];
      let type = promotion.type;
      let shoppingCartCopy = this.shoppingCart;
      if (type === '001'){
        priceToDiscount = (promotion.promotionTypeOne?.unitPrice * promotion.promotionTypeOne?.cant);
      }
      if (type === '003'){
        priceToDiscount = this.getPromotionPriceThree(index);
      }
      shoppingCartCopy.itemPromotionsCart.splice(index, 1);
      shoppingCartCopy.totalPrice = shoppingCartCopy.totalPrice - priceToDiscount;
      if (shoppingCartCopy.itemsCcm.length === 0 && shoppingCartCopy.itemsCcb.length === 0 && shoppingCartCopy.itemPromotionsCart.length === 0){
        this.shoppingCartService.removeShoppingBag();
        this.eventService.onShoppingCartAction.emit();
        this.routing.goToHome();
      }
      else this.shoppingCartService.resetShoppingBag(shoppingCartCopy);
      this.eventService.onShoppingCartAction.emit();
    })
  }
  resetPrices(event: any, condition: string){
    let totalPrice = 0;
    if (condition === 'CCM'){
      const pricePerPackageUnit = this.shoppingCart.itemsCcm[event.index].price / 
        (event.less ? event.quantity : event.quantity);
      this.shoppingCart.itemsCcm[event.index].quantity = event.quantity;
      this.shoppingCart.itemsCcm[event.index].price = pricePerPackageUnit * event.quantity;
      /**************BONIFICACIONES**************/
      const bonifs = this.shoppingCart.itemsCcm[event.index].productBas?.Bonificaciones;
      if (bonifs){
        const totalPriceWithoutDiscount = this.shoppingCart.itemsCcm[event.index].priceWithoutDiscount * event.quantity;
        if (bonifs.length > 0){
          const currentBonification = this.getBonification(event.quantity, bonifs);
          if (currentBonification){
            const priceWithBonification = totalPriceWithoutDiscount - (totalPriceWithoutDiscount * (currentBonification?.Porcentaje/100));
            this.shoppingCart.itemsCcm[event.index].price = priceWithBonification;
          }
        }
      }

      this.shoppingCart.itemsCcm.forEach((pkg: any) => {
        totalPrice = totalPrice + pkg.price;
      });
      this.shoppingCart.totalPrice = totalPrice;
      this.shoppingCartService.resetShoppingBag(this.shoppingCart);
    }
    if (condition === 'CCB'){
      const pricePerPackageUnit = this.shoppingCart.itemsCcb[event.index].price / 
        (event.less ? this.shoppingCart.itemsCcb[event.index].quantity : this.shoppingCart.itemsCcb[event.index].quantity);
      this.shoppingCart.itemsCcb[event.index].quantity = event.quantity;
      this.shoppingCart.itemsCcb[event.index].price = pricePerPackageUnit * event.quantity;
      /**************BONIFICACIONES**************/
      const bonifs = this.shoppingCart.itemsCcb[event.index].productBas?.Bonificaciones;
      if (bonifs){
        const totalPriceWithoutDiscount = this.shoppingCart.itemsCcb[event.index].priceWithoutDiscount * event.quantity;
        if (bonifs.length > 0){
          const currentBonification = this.getBonification(event.quantity, bonifs);
          if (currentBonification){
            const priceWithBonification = totalPriceWithoutDiscount - (totalPriceWithoutDiscount * (currentBonification?.Porcentaje/100));
            this.shoppingCart.itemsCcb[event.index].price = priceWithBonification;
          }
        }
      }

      this.shoppingCart.itemsCcb.forEach((pkg: any) => {
        totalPrice = totalPrice + pkg.price;
      });
      this.shoppingCart.totalPrice = totalPrice;
      this.shoppingCartService.resetShoppingBag(this.shoppingCart);
    }
  }
  getMaxStock(bas: any){
    return bas.Stock;
  }
  updateStocks(){
    let items: any[] = [];
    let canWork = this.shoppingCart && (this.shoppingCart.itemsCcb != undefined || this.shoppingCart.itemsCcm != undefined);
    if (canWork){
      const clientBas = JSON.parse(this.localStorageService.getBasClient()!);
      let clientCode: string = this.userLogged ? clientBas.Codigo : this.noUserClientCode;
      if (this.shoppingCart.itemsCcb) items.push(...this.shoppingCart.itemsCcb);
      if (this.shoppingCart.itemsCcm) items.push(...this.shoppingCart.itemsCcm);
      let obs: any[] = [];
      items.forEach(item => {
        obs.push(this.basService.getProduct(clientCode, item.product.codigo, item.product.condicion));
      });
      this.spinner.show();
      forkJoin(obs).subscribe(results => {
        this.spinner.hide();
        results.forEach(result => {
          let itemCcm = this.shoppingCart.itemsCcm.find((item: any) => item.product.codigo == result.Codigo);
          let itemCcb = this.shoppingCart.itemsCcb.find((item: any) => item.product.codigo == result.Codigo);
          let indexCcb = this.shoppingCart.itemsCcb.indexOf(itemCcb);
          let indexCcm = this.shoppingCart.itemsCcm.indexOf(itemCcm);
          if (indexCcb != -1) this.shoppingCart.itemsCcb[indexCcb].productBas = result;
          if (indexCcm != -1) this.shoppingCart.itemsCcm[indexCcm].productBas = result;
        });
        this.updateavailableStocks();
      }, err =>{
        this.spinner.hide();
        const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
        this.alert.error(error);
      });
    }
  }
  updateavailableStocks(){
    this.shoppingCart.itemsCcm.forEach((item: any) => {
      item.availableStock = item.quantity <= item.productBas.Stock;
    });
    this.shoppingCart.itemsCcb.forEach((item: any) => {
      item.availableStock = item.quantity <= item.productBas.Stock;
    });
  }
  finishOrder(){
    const basClient = this.localStorageService.getBasClient();
    if (!basClient){
      this.alert.info('Realizar pedido', 'Para realizar pedido registrarse o iniciar sesión');
      return;
    }

    let items = [];
    if (this.shoppingCart.itemsCcb) items.push(...this.shoppingCart.itemsCcb);
    if (this.shoppingCart.itemsCcm) items.push(...this.shoppingCart.itemsCcm);
    let itemNoStock = items.find((item: any) => !item.availableStock);
    if (itemNoStock){
      this.alert.error('Alguno de los productos no cuenta con stock disponible, eliminelo para poder continuar.');
      return;
    }
    this.goToCompletePurchase();
  }
  goToCompletePurchase(){
    const modalRef = this.modalService.open(CompletePurchaseComponent, { centered: true, backdrop: 'static', size: 'lg' });
    modalRef.componentInstance.cart = this.shoppingCart; 
    modalRef.componentInstance.complete.subscribe((res: any) => {
      this.shoppingCartService.removeShoppingBag();
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
      res?.sort((a: any,b: any) => a.RANKING - b.RANKING);
      const codes = res?.map((a: any) => a.CODIGOS);
      for(let i = 0; i < codes?.length; i++){
        const arr = codes[i].split('|');
        if (arr.length > 1) codes[i] = arr[0];
      }
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
  anyPromotionCCM(){
    if (!this.shoppingCart.itemPromotionsCart) return false;
    if (this.shoppingCart.itemPromotionsCart.length === 0) return false;
    return this.shoppingCart.itemPromotionsCart.some((i: any) => i.condition === 'CCM');
  }
  anyPromotionCCB(){
    if (!this.shoppingCart.itemPromotionsCart) return false;
    if (this.shoppingCart.itemPromotionsCart.length === 0) return false;
    return this.shoppingCart.itemPromotionsCart.some((i: any) => i.condition === 'CCB');
  }
  getImgName(promotion: any): string{
    let name: string = promotion?.Codigo;
    return name + '.jpeg';
  }
  updateUrl(event: any, index: number){
    this.hasImgs[index] = false;
  }
  getPromotionPriceThree(index: number){
    let totalPrice = 0;
    this.shoppingCart.itemPromotionsCart[index].promotionsTypeThree.forEach((promotion: any) => {
      totalPrice += (promotion.cant * promotion.unitPrice);
    });
    return totalPrice;
  }
  promotionDetail(index: number, type: string){
    const modalRef = this.modalService.open(PromotionInformationComponent, { centered: true, backdrop: 'static', size: 'lg' });
    modalRef.componentInstance.promotion = this.shoppingCart.itemPromotionsCart[index]; 
    modalRef.componentInstance.type = type;
  }
  getBonification(quantity: number, bonifs: any[]) {
    for (let i = 0; i < bonifs.length; i++) {
      if (quantity >= bonifs[i].CantidadDesde && (bonifs[i + 1]?.CantidadDesde === undefined || bonifs[i].CantidadDesde <= bonifs[i + 1].CantidadDesde)) {
        return bonifs[i];
      }
    }
    return null;
  }
}
