import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemCart } from 'src/app/core/models/shopping';
import { BasService } from 'src/app/modules/shared/services/bas.service';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { ShoppingService } from 'src/app/modules/shared/services/shopping.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { LocalStorageService } from '../../modules/shared/services/local-storage.service';
import { AuthService } from '../../modules/shared/services/auth.service';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {

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
    private authService: AuthService
  ) {
    this.code = this.route.snapshot.params['code'];
    this.isUserLogged = authService.activeUser();
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
      // this.spinner.hide();
      this.product = res;
      console.log("Producto: ", this.product);
      this.getProductBas();
    }, err => {
      console.log(err);
      this.spinner.hide();
      // this.alert.error('Ocurrió un error al tratar obtener producto');
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  getProductBas(){
    // this.spinner.show();
    const clientBas = JSON.parse(this.localStorageService.getBasClient()!);
    let clientCode: string = this.userLogged ? clientBas.Codigo : this.noUserClientCode;
    this.basService.getProduct(clientCode, this.code, this.product.condicion).subscribe(res => {
      this.spinner.hide();
      this.productBas = res;
      this.maxQuantity = this.productBas.Stock;
      // console.log("Producto BAS: ", this.productBas);
      this.getAlternativeProducts();
    }, err => {
      console.log(err);
      this.spinner.hide();
      // this.alert.error('Ocurrió un error al tratar obtener producto bas');
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  getSemaphoreData(){
    this.spinner.show();
    this.basService.getSemaphoreData(this.code).subscribe(res => {
      this.spinner.hide();
      this.semaphoreData = res;
      // console.log("Semaforo: ", this.semaphoreData);
      this.decideTrafficLightColor(res);
    }, err => {
      this.spinner.hide();
      console.log(err);
      // this.alert.error('Ocurrió un error al tratar obtener datos del semaforo');
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  getAlternativeProducts(){
    this.spinner.show();
    const codes = this.productBas?.Alternativos?.map((prod: any) => prod.CodigoProductoAlternativo);
    // console.log('Productos recomendados a buscar --> ', codes);
    this.productService.getAllRecommended({productCodes: codes}).subscribe(res => {
      this.spinner.hide();
      this.alternativeProducts = res?.products;
      if (this.alternativeProducts?.length > 5) this.alternativeProducts = this.alternativeProducts.slice(0, 5)
    }, err => {
      this.spinner.hide();
      console.log(err);
      // this.alert.error('Ocurrió un error al tratar obtener los productos recomendados');
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  getPrice(price: string){
    if (price){
      price = price.replace(',', '.');
      let money = Number(price);
      let moneyConverted = this.currencyPipe.transform(money, '$');
      return moneyConverted;
    }
    else return '0';
  }
  getPriceNumber(price: string){
    if (price){
      price = price.replace(',', '.');
      return  Number(price);;
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
      // console.log(value[0].INDICADOR);
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
  }
  addToCart(){
    const price = this.product?.precio.replace(',', '.');
    const item = new ItemCart();
    item.condition = this.product?.condicion;
    item.product = this.product;
    item.productBas = this.productBas;
    item.semaphoreStock = this.semaphoreData;
    item.quantity = this.quantity;
    item.price = Number(price) * this.quantity;
    item.availableStock = !this.outOfStock;
    this.cartService.addToLocalStorage(item);
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
      res?.sort((a: any,b: any) => a.RANKING - b.RANKING);
      // if (res?.length > 5) res = res.slice(0, 5)
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
}
