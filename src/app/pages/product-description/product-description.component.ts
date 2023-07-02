import { CurrencyPipe } from '@angular/common';
import { Component, HostListener, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasService } from 'src/app/modules/shared/services/bas.service';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { ShoppingService } from 'src/app/modules/shared/services/shopping.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { LocalStorageService } from '../../modules/shared/services/local-storage.service';
import { AuthService } from '../../modules/shared/services/auth.service';
import { Product, ProductBonification } from 'src/app/core/models/cart';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs';
import { EventService } from 'src/app/modules/shared/services/event.service';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }]
})
export class ProductDescriptionComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkResolution();
  }
  
  isFav: boolean = false;
  isUserLogged: boolean = false;
  userLogged = false;
  maxQuantity = 0;
  quantity = 1;
  outOfStock = false;
  noUserClientCode = '001';
  code: string;
  product: any;
  productBas: any;
  semaphoreData: any;
  semaphoreValue?: string;
  alternativeProducts: any[] = [];
  recommendedProducts: any[] = [];
  breadcrumbs: Breadcrumb[]= [];
  mobile = false;
  subPrice = 0;

  constructor(
    private productService: ProductService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private route: ActivatedRoute,
    private basService: BasService,
    private localStorageService: LocalStorageService,
    private currencyPipe: CurrencyPipe,
    private cartService: ShoppingService,
    public routing: RoutingService,
    private eventService: EventService,
    private authService: AuthService
  ) {
    this.code = this.route.snapshot.params['code'];
    this.isUserLogged = authService.activeUser();
    this.insertBreadcrumb();
    this.checkResolution();
  }

  ngOnInit(): void {
    this.fillUserLogged();
    this.getProduct();
    this.getRecommended();
    this.getSemaphoreData();
  }
  getProduct(){
    this.spinner.show();
    this.productService.getByCode(this.code).subscribe(res => {
      this.product = res;
      this.getProductBas();
    }, err => {
      console.log(err);
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  getProductBas(){
    const clientBas = JSON.parse(this.localStorageService.getBasClient()!);
    let clientCode: string = this.userLogged ? clientBas.Codigo : this.noUserClientCode;
    this.basService.getProduct(clientCode, this.code, this.product.condicion).subscribe(res => {
      this.spinner.hide();
      this.productBas = res;
      this.maxQuantity = this.productBas.Stock;
      this.getAlternativeProducts();
    }, err => {
      console.log(err);
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  getSemaphoreData(){
    this.spinner.show();
    this.basService.getSemaphoreData(this.code).subscribe(res => {
      this.spinner.hide();
      this.semaphoreData = res;
      this.decideTrafficLightColor(res);
    }, err => {
      this.spinner.hide();
      console.log(err);
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  getAlternativeProducts(){
    this.spinner.show();
    const codes = this.productBas?.Alternativos?.map((prod: any) => prod.CodigoProductoAlternativo);
    this.productService.getAllRecommended({productCodes: codes}).subscribe(res => {
      this.spinner.hide();
      this.alternativeProducts = res?.products;
      if (this.alternativeProducts?.length > 5) this.alternativeProducts = this.alternativeProducts.slice(0, 5)
    }, err => {
      this.spinner.hide();
      console.log(err);
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  getPrice(price: string){
    if (price){
      price = price.replace(',', '.');
      let money = Number(price);
      let moneyConverted = this.currencyPipe.transform(money, 'ARS');
      return moneyConverted;
    }
    else return '0';
  }
  getPriceNumber(price: string, html: boolean = true){
    if (price){
      price = price.replace(',', '.');
      let priceNumber = Number(price);
      
      if (this.productBas && this.product && html){
        const bonifications = this.getBonifications(this.productBas?.Bonificaciones);
        const totalPriceWithoutDiscount = (1 * priceNumber);
        const currentBonification = this.getBonification(1, bonifications);
        if (currentBonification){
          priceNumber = totalPriceWithoutDiscount - (totalPriceWithoutDiscount * (currentBonification.percentage / 100));
        }
      }
      return  priceNumber;
    }
    else return 0;
  }
  fillUserLogged(){
    const basClient = this.localStorageService.getBasClient();
    this.userLogged = basClient != null;
  }
  markFavorite(isMarked: boolean){
    this.isFav = isMarked;
  }
  decideTrafficLightColor(value: any){
    let status = '';
    if (value){
      switch(value[0].INDICADOR){
        case 'VERDE': this.semaphoreValue = 'Disponible'
        break;
        case 'AMARILLO': this.semaphoreValue = 'Stock Crítico'
        break;
        case 'ROJO': this.semaphoreValue = 'Sin Stock'
        break;
      }
    }
    else this.semaphoreValue = 'Disponible';
    this.outOfStock = value[0].INDICADOR == 'ROJO' || !Number(value[0].STKACTUAL);
  }
  addQuantity(val: any){
    this.quantity = val;
    const bonifications = this.getBonifications(this.productBas?.Bonificaciones);
    const totalPriceWithoutDiscount = (this.quantity * this.getPriceNumber(this.product?.precio, false));
    const currentBonification = this.getBonification(this.quantity, bonifications);
    if (currentBonification){
      this.subPrice = totalPriceWithoutDiscount - (totalPriceWithoutDiscount * (currentBonification.percentage / 100));
    }
    else this.subPrice = (this.getPriceNumber(this.product?.precio, false)*this.quantity);
  }
  addToCart(){
    const product = new Product();
    product.code = this.product?.codigo;
    product.condition = this.product?.condicion;
    product.bonification = this.getBonifications(this.productBas?.Bonificaciones);
    product.iva = this.productBas.TasaIva
    product.quantity = this.quantity;
    product.inStock = !this.outOfStock;
    product.unitPrice = Number(this.product?.precio.replace(',', '.'));
    product.category = this.product.categoria;
    product.name = this.product.nombre;
    product.imageUrl = this.product.foto;
    this.cartService.addToCart(product);
    this.routing.goToCart();
  }
  buyNow(){
  }
  goToProduct(code: string){
    this.code = code;
    this.ngOnInit();
  }
  getRecommended(){
    this.spinner.show();
    const clientBas = JSON.parse(this.localStorageService.getBasClient()!);
    let clientCode: string = clientBas ? clientBas.Codigo : this.noUserClientCode;
    this.basService.GetRecommendedProducts(clientCode).subscribe(res => {
      this.spinner.hide();
      console.log(res);
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
      console.log(res);
      this.recommendedProducts = res.products;
      if (this.recommendedProducts?.length > 5) this.recommendedProducts = this.recommendedProducts.slice(0, 5)
    }, err =>{
      this.spinner.hide();
      console.log(err);
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    })
  }
  getBonifications(bonifs: any[]): ProductBonification[]{
    const bonifications: ProductBonification[] = [];
    bonifs?.map(bonif => {
      const newBonification: ProductBonification = new ProductBonification();
      newBonification.quantity = bonif.CantidadDesde;
      newBonification.percentage = bonif.Porcentaje;
      bonifications.push(newBonification);
    });
    return bonifications;
  }
  insertBreadcrumb(){
    this.localStorageService.setBreadcrumbs(new Breadcrumb('Producto', `/product-description/${this.code}`));
    this.breadcrumbs = this.localStorageService.getBreadcrumbs();
    this.eventService.onShowBreadcrumbs.emit(this.breadcrumbs);
  }
  checkResolution(){
    if(window.innerWidth < 821) this.mobile = true;
    else this.mobile = false;
  }
  getBonification(quantity: number, bonification: ProductBonification[]) {
    let newBonif = null;
    for (let i = 0; i < bonification.length; i++) {
      if (quantity >= bonification[i].quantity && (bonification[i + 1]?.quantity === undefined || bonification[i + 1].quantity > quantity)) {
        newBonif = bonification[i].quantity === 1 ? null : bonification[i];
        return newBonif;
      }
    }
    return newBonif;

  }
}
