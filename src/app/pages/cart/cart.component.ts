import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { BasService } from 'src/app/modules/shared/services/bas.service';
import { EventService } from 'src/app/modules/shared/services/event.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { ShoppingService } from 'src/app/modules/shared/services/shopping.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { CompletePurchaseComponent } from './complete-purchase/complete-purchase.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  shoppingCart: any;
  maxQuantity = 10;
  // quantity = 1;
  outOfStock = false;

  constructor(
    private routing: RoutingService,
    private shoppingCartService: ShoppingService,
    private eventService: EventService,
    private alert: SweetAlertService,
    private basService: BasService,
    private spinner: SpinnerService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.shoppingCart = this.shoppingCartService.getLocalCart();
    console.log(this.shoppingCart);
    this.updateStocks();
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
      }
      else this.shoppingCartService.resetShoppingBag(shoppingCartCopy);
    })
  }
  resetPrices(event: any, condition: string){
    let totalPrice = 0;
    if (condition === 'CCM'){
      const pricePerPackageUnit = this.shoppingCart.itemsCcm[event.index].price / 
        (event.less ? event.quantity +1 : event.quantity -1);
      this.shoppingCart.itemsCcm[event.index].quantity = event.quantity;
      this.shoppingCart.itemsCcm[event.index].price = pricePerPackageUnit * event.quantity;
      this.shoppingCart.itemsCcm.forEach((pkg: any) => {
        totalPrice = totalPrice + pkg.price;
      });
      this.shoppingCart.totalPrice = totalPrice;
      this.shoppingCartService.resetShoppingBag(this.shoppingCart);
    }
    if (condition === 'CCB'){
      const pricePerPackageUnit = this.shoppingCart.itemsCcb[event.index].price / 
        (event.less ? this.shoppingCart.itemsCcb[event.index].quantity +1 : this.shoppingCart.itemsCcb[event.index].quantity -1);
      this.shoppingCart.itemsCcb[event.index].quantity = event.quantity;
      this.shoppingCart.itemsCcb[event.index].price = pricePerPackageUnit * event.quantity;
      this.shoppingCart.itemsCcb.forEach((pkg: any) => {
        totalPrice = totalPrice + pkg.price;
      });
      this.shoppingCart.totalPrice = totalPrice;
      this.shoppingCartService.resetShoppingBag(this.shoppingCart);
    }
  }
  getMaxStock(semaphoreStock: any){
    console.log(Number(semaphoreStock[0].STKACTUAL));
    return Number(semaphoreStock[0].STKACTUAL);
  }
  updateStocks(){
    let codes: string[] = [];
    let canWork = this.shoppingCart && (this.shoppingCart.itemsCcb != undefined || this.shoppingCart.itemsCcm != undefined);
    if (canWork){
      if (this.shoppingCart.itemsCcb) codes = this.shoppingCart.itemsCcb.map((item: any) => item.product.codigo);
      if (this.shoppingCart.itemsCcm) codes = this.shoppingCart.itemsCcm.map((item: any) => item.product.codigo);
      let obs: any[] = [];
      codes.forEach(code => {
        obs.push(this.basService.getSemaphoreData(code));
      });
      this.spinner.show();
      forkJoin(obs).subscribe(results => {
        this.spinner.hide();
        results.forEach(result => {
          let itemCcm = this.shoppingCart.itemsCcm.find((item: any) => item.semaphoreStock[0].CODITM == result[0].CODITM);
          let itemCcb = this.shoppingCart.itemsCcb.find((item: any) => item.semaphoreStock[0].CODITM == result[0].CODITM);
          let indexCcb = this.shoppingCart.itemsCcb.indexOf(itemCcb);
          let indexCcm = this.shoppingCart.itemsCcm.indexOf(itemCcm);
          if (indexCcb != -1) this.shoppingCart.itemsCcb[indexCcb].semaphoreStock = result;
          if (indexCcm != -1) this.shoppingCart.itemsCcm[indexCcm].semaphoreStock = result;
        });
        this.updateavailableStocks();
      }, err =>{
        this.spinner.hide();
        this.alert.error('Ocurrió un error al tratar de obtener información de stocks');
      });
    }
  }
  updateavailableStocks(){
    this.shoppingCart.itemsCcm.forEach((item: any) => {
      // item.availableStock = (item.semaphoreStock[0].STKACTUAL) <= item.quantity;
      item.availableStock = item.quantity <= (item.semaphoreStock[0].STKACTUAL);
    });
    this.shoppingCart.itemsCcb.forEach((item: any) => {
      item.availableStock = item.quantity <= (item.semaphoreStock[0].STKACTUAL);
    });
  }
  finishOrder(){
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
    // modalRef.componentInstance.complete.subscribe((res: any) => {
    //   this.modalService.dismissAll();
    //   // this.routingService.goToAccount();
    // })
  }
}
