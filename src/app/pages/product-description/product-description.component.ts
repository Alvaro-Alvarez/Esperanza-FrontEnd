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

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {

  isFav: boolean = false;
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

  constructor(
    private productService: ProductService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private route: ActivatedRoute,
    private basService: BasService,
    private localStorageService: LocalStorageService,
    private currencyPipe: CurrencyPipe,
    private cartService: ShoppingService,
    private routing: RoutingService,
  ) {
    this.code = this.route.snapshot.params['code'];
  }

  ngOnInit(): void {
    this.fillUserLogged();
    this.getProduct();
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
      this.alert.error('Ocurrió un error al tratar obtener producto');
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
      console.log("Producto BAS: ", this.productBas);
    }, err => {
      console.log(err);
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar obtener producto bas');
    });
  }
  getSemaphoreData(){
    this.spinner.show();
    this.basService.getSemaphoreData(this.code).subscribe(res => {
      this.spinner.hide();
      this.semaphoreData = res;
      console.log("Semaforo: ", this.semaphoreData);
      // this.maxQuantity = Number(res[0].STKACTUAL);
      this.decideTrafficLightColor(res);
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.alert.error('Ocurrió un error al tratar obtener datos del semaforo');
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
      console.log(value[0].INDICADOR);
      switch(value[0].INDICADOR){
        case 'VERDE': this.semaphoreValue = 'Disponible'
        break;
        case 'AMARILLO': this.semaphoreValue = 'Otro'
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
    console.log("buyNow");
  }
}
