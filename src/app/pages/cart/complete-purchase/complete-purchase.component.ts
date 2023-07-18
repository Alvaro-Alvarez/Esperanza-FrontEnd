import { Component, EventEmitter, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cart } from 'src/app/core/models/cart';
import { Item, Order, OrderItems, OrderSale } from 'src/app/core/models/order';
import { BasService } from 'src/app/modules/shared/services/bas.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { OrderService } from 'src/app/modules/shared/services/order.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { MapOrder } from './map-order';
import { PromotionType } from 'src/app/core/enums/promotion-type.enum';

@Component({
  selector: 'app-complete-purchase',
  templateUrl: './complete-purchase.component.html',
  styleUrls: ['./complete-purchase.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }]
})
export class CompletePurchaseComponent implements OnInit {

  carriers: any[] = [];
  promotionItems: any[] = [];
  form!: FormGroup;
  sellerCode = '';
  clientBas: any;
  hasImg = true;
  promotionType = PromotionType;
  @Input() cart!: Cart;
  @Output() complete: EventEmitter<any> = new EventEmitter();

  constructor(
    public modal: NgbActiveModal,
    private basService: BasService,
    private alert: SweetAlertService,
    private spinner: SpinnerService,
    private builder: FormBuilder,
    private localStorageService: LocalStorageService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getCarriers();
    this.clientBas = JSON.parse(this.localStorageService.getBasClient()!);
    this.initForm();
  }
  initForm(){
    this.sellerCode = this.clientBas?.CodigoVendedor;
    if (!this.sellerCode){
      this.form = this.builder.group({
        observation: ['', []],
        carrier: ['', [Validators.required]],
      });
    }
    else{
      this.form = this.builder.group({
        observation: ['', []],
        carrier: ['', []],
      });
    }
  }
  updateUrl(){
    this.hasImg = false;
  }
  getCarriers(){
    this.spinner.show();
    this.basService.getCarriers().subscribe(res =>{
      this.spinner.hide();
      this.carriers = res;
    }, err =>{
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  finish(){
    this.alert.infoWithCancel('Finalizar pedido', 'Estas por finalizar el pedido, estás de acuerdo?.', ()=>{
      this.spinner.show();
      this.orderService.finishOrder(this.getOrder()).subscribe(res =>{
        this.spinner.hide();
        this.alert.successful('Pedido realizado!', 'Tu pedido fue realizado con exito!', ()=>{
          this.complete.emit();
        })
      }, err =>{
        this.spinner.hide();
        const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
        this.alert.error(error);
        console.log(err);
      });
    })
  }
  close(){
    this.modal.dismiss();
  }
  getOrder(): OrderItems{
    const orderItems: OrderItems = new OrderItems();
    this.cart.packages.map(cartPackage => {
      let itemCount = 1;
      const order: Order = new Order();
      order.pedidoVenta = new OrderSale();
      MapOrder.setDefaultValuesOrderSale(order.pedidoVenta, cartPackage, this.clientBas, this.sellerCode, this.form);
      cartPackage.products.map(product => {
        const item = new Item();
        MapOrder.setDefaultItems(item, this.form);
        item.cantidadPrimeraUnidad = product?.quantity?.toString();
        item.codigoItem = product?.code;
        item.importeGravado = (product?.totalPriceWithBonifications)?.toString();
        item.importeIva = (product?.priceWithIva - product?.totalPriceWithBonifications).toString();
        item.importeTotal = (this.cart.totalPriceWithIva).toString();
        item.precioUnitario = (product?.unitPrice).toString();
        item.secuenciaDetalle = itemCount.toString();
        item.tasaIva = product.iva.toString()
        order.pedidoVenta?.items?.push(item);
        itemCount++;
      });
      orderItems.orders.push(order);
    });

    this.cart.offers.map(offer => {
      let itemCount = 1;
      const order: Order = new Order();
      order.pedidoVenta = new OrderSale();
      MapOrder.setDefaultValuesOrderSalePromotion(order.pedidoVenta, offer, this.clientBas, this.sellerCode, this.form);
      debugger
      if (offer.type === PromotionType.One){
        order.pedidoVenta?.items?.push(MapOrder.getItemPromotionFlag(offer.productSales[0], this.form, itemCount));
        itemCount++;
        const item = new Item();
        MapOrder.setDefaultItems(item, this.form);
        item.tasaIva = offer.productSales[0].iva.toString()
        item.secuenciaDetalle = itemCount.toString();
        item.codigoItem = offer.productSales[0]?.code;
        item.cantidadPrimeraUnidad = (offer.productSales[0].quantity*offer.quantity).toString();
        item.importeGravado = (offer?.totalPriceWithBonifications)?.toString();
        item.importeIva = (offer?.priceWithIva - offer?.totalPriceWithBonifications).toString();
        item.importeTotal = (offer?.priceWithIva).toString();
        // item.precioUnitario = (offer?.totalPriceWithBonifications/(offer.productSales.map(p=>p.quantity).reduce((a,b)=>a+b))).toString();
        item.precioUnitario = (offer?.totalPriceWithBonifications/offer.productSales[0].quantity).toString();
        order.pedidoVenta?.items?.push(item);
        itemCount++;
        order.pedidoVenta?.items?.push(MapOrder.getItemOnlyPromotionOne(offer.productSales[0], offer, this.form, itemCount));
        itemCount++;
      }
      // if (offer.type === PromotionType.One){
      //   offer.productSales.map(productSale => {
      //     order.pedidoVenta?.items?.push(MapOrder.getItemPromotionFlag(productSale, this.form, itemCount));
      //     itemCount++;
      //     const item = new Item();
      //     MapOrder.setDefaultItems(item, this.form);
      //     item.tasaIva = productSale.iva.toString()
      //     item.secuenciaDetalle = itemCount.toString();
      //     item.codigoItem = productSale?.code;
      //     item.cantidadPrimeraUnidad = (productSale.quantity*offer.quantity).toString();
      //     item.importeGravado = (offer?.totalPriceWithBonifications)?.toString();
      //     item.importeIva = (offer?.priceWithIva - offer?.totalPriceWithBonifications).toString();
      //     item.importeTotal = (offer?.priceWithIva).toString();
      //     item.precioUnitario = (offer?.totalPriceWithBonifications/(offer.productSales.map(p=>p.quantity).reduce((a,b)=>a+b))).toString();
      //     order.pedidoVenta?.items?.push(item);
      //     itemCount++;
      //     order.pedidoVenta?.items?.push(MapOrder.getItemOnlyPromotionOne(productSale, offer, this.form, itemCount));
      //     itemCount++;
      //   });
      // }
      if(offer.type === PromotionType.Three){
        offer.productSales.map(productSale => {
          order.pedidoVenta?.items?.push(MapOrder.getItemPromotionFlag(productSale, this.form, itemCount));
          itemCount++;
          const item = new Item();
          MapOrder.setDefaultItems(item, this.form);
          item.tasaIva = productSale.iva.toString()
          item.secuenciaDetalle = itemCount.toString();
          item.codigoItem = productSale?.code;
          item.cantidadPrimeraUnidad = productSale.quantity?.toString();
          item.importeGravado = (offer?.totalPriceWithBonifications)?.toString();
          item.importeIva = (offer?.priceWithIva - offer?.totalPriceWithBonifications).toString();
          item.importeTotal = (offer?.priceWithIva).toString();
          item.precioUnitario = (productSale?.totalPriceWithBonifications / (productSale.bonusAmmount + productSale.quantity)).toString();
          order.pedidoVenta?.items?.push(item);
          itemCount++;
          order.pedidoVenta?.items?.push(MapOrder.getItemOnlyPromotion(productSale, this.form, itemCount));
          itemCount++;
        });
      }
      orderItems.orders.push(order);
    });
    console.log(JSON.stringify(orderItems));
    debugger
    return orderItems;
  }
  getDateFormat(date: Date){
    const format = date.toLocaleDateString("es-ES");
    const arr = format.split('/');
    for (let i = 0; i < arr.length; i++){
      if (arr[i].length === 1) arr[i] = '0'+arr[i];
    }
    return arr.reverse().join('/');
  }
  // getItemPromotionFlag(productSale: any, itemCount: number){
  //   const item = new Item();
  //   MapOrder.setDefaultItems(item, this.form);
  //   item.codigoItem = 'TXT01';
  //   item.observacionItem = productSale.name;
  //   item.secuenciaDetalle = itemCount.toString();
  //   item.cantidadPrimeraUnidad = '1';
  //   itemCount++;
  //   return item;
  // }
  // getItemOnlyPromotion(productSale: any, itemCount: number){
  //   const item = new Item();
  //   MapOrder.setDefaultItems(item, this.form);
  //   item.tasaIva = productSale.iva.toString()
  //   item.secuenciaDetalle = itemCount.toString();
  //   item.codigoItem = productSale?.code;
  //   item.cantidadPrimeraUnidad = productSale.bonusAmmount?.toString();
  //   item.importeGravado = '0';
  //   item.importeIva = '0';
  //   item.importeTotal = '0';
  //   item.precioUnitario = '0';
  //   item.porcentajeBonificacion = '100';
  //   itemCount++;
  //   return item;
  // }
}
