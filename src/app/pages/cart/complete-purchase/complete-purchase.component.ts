import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Item, Order, OrderItems, OrderSale } from 'src/app/core/models/order';
import { Shopping } from 'src/app/core/models/shopping';
import { BasService } from 'src/app/modules/shared/services/bas.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { OrderService } from 'src/app/modules/shared/services/order.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';

@Component({
  selector: 'app-complete-purchase',
  templateUrl: './complete-purchase.component.html',
  styleUrls: ['./complete-purchase.component.scss']
})
export class CompletePurchaseComponent implements OnInit {

  carriers: any[] = [];
  items: any[] = [];
  promotionItems: any[] = [];
  form!: FormGroup;
  sellerCode = '';
  clientBas: any;
  hasImg = true;
  @Input() cart!: Shopping;
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
    if (this.cart.itemsCcb) this.items.push(...this.cart.itemsCcb);
    if (this.cart.itemsCcm) this.items.push(...this.cart.itemsCcm);
    if (this.cart.itemPromotionsCart) this.promotionItems.push(...this.cart.itemPromotionsCart);
    console.log(this.promotionItems);
    this.getCarriers();
    this.clientBas = JSON.parse(this.localStorageService.getBasClient()!);
    this.initForm();
  }
  initForm(){
    this.sellerCode = this.clientBas?.CodigoVendedor;
    if (!this.sellerCode){
      this.form = this.builder.group({
        observation: ['', [Validators.required]],
        carrier: ['', [Validators.required]],
      });
    }
    else{
      this.form = this.builder.group({
        observation: ['', [Validators.required]],
        carrier: ['', []],
      });
    }
  }
  getImgName(promotion: any): string{
    let name: string = promotion?.Codigo;;
    return name + '.jpeg';
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
      this.alert.error('Ocurrió un error al tratar de obtener información de transportistas');
    });
  }
  getPriceWithIva(price: number, iva: number){
    const priceWithIva = price + (price* (iva/100));
    return priceWithIva;
  }
  finish(){
    this.alert.info('Finalizar pedido', 'Estas por finalizar el pedido, estás de acuerdo?.', ()=>{
      this.spinner.show();
      this.orderService.finishOrder(this.getOrder()).subscribe(res =>{
        this.spinner.hide();
        this.alert.successful('Pedido realizado!', 'Tu pedido fue realizado con exito!', ()=>{
          // this.complete.emit();
        })
      }, err =>{
        this.spinner.hide();
        this.alert.error('Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador');
        console.log(err);
      });
    })
  }
  close(){
    this.modal.dismiss();
  }
  getOrder(): OrderItems{
    let priceCcm = 0;
    let priceCcb = 0;
    const workCcm = this.cart.itemsCcm && this.cart.itemsCcm.length > 0;
    const workCcb = this.cart.itemsCcb && this.cart.itemsCcb.length > 0;
    this.cart.itemsCcm?.forEach(item => {priceCcm += item.price!;});
    this.cart.itemsCcb?.forEach(item => {priceCcb += item.price!;});
    let countCcm = 1;
    let countCcb = 1;
    let iva = this.cart.itemsCcm!.length > 0 ? this.cart.itemsCcm![0].productBas.TasaIva : this.cart?.itemsCcb![0]?.productBas.TasaIva;
    if (!iva){
      iva = this.cart.itemPromotionsCart![0].promotion?.Detalle[0].TasaIva;
    }
    this.cart.itemPromotionsCart?.forEach(item => {
      if (item.condition === 'CCM'){
        if (item.type === '001'){
          priceCcm += (item.promotionTypeOne?.unitPrice! * item.promotionTypeOne?.cant!)
        }
        if (item.type === '003'){
          item.promotionsTypeThree?.forEach(itemProd => {
            priceCcm += (itemProd.unitPrice! * itemProd.cant);
          });
        }
      }
      if (item.condition === 'CCB'){
        if (item.type === '001'){
          priceCcb += (item.promotionTypeOne?.unitPrice! * item.promotionTypeOne?.cant!)
        }
        if (item.type === '003'){
          item.promotionsTypeThree?.forEach(itemProd => {
            priceCcb += (itemProd.unitPrice! * itemProd.cant);
          });
        }
      }

    });
    let initDate = new Date();
    let finishDate = new Date();
    finishDate.setDate(finishDate.getDate() + 30);
debugger
    const orderItems: OrderItems = new OrderItems();
    const orderCcm: Order = new Order();
    orderCcm.pedidoVenta = new OrderSale();
    this.setDefaultValuesOrderSale(orderCcm.pedidoVenta, 'CCM', initDate, finishDate, priceCcm, priceCcb, iva);

    const orderCcb: Order = new Order();
    orderCcb.pedidoVenta = new OrderSale();
    this.setDefaultValuesOrderSale(orderCcb.pedidoVenta, 'CCB', initDate, finishDate, priceCcm, priceCcb, iva);
    orderItems.orderCcm = orderCcm;
    orderItems.orderCcb = orderCcb;

    if (workCcm){
      this.cart.itemsCcm?.forEach(item => {
        const newItem = new Item();
        this.setDefaultItems(newItem);
        newItem.cantidadPrimeraUnidad = item?.quantity?.toString();
        newItem.codigoItem = item?.product?.codigo;
        newItem.importeGravado = (item?.price)?.toString();
        newItem.importeIva = (item?.price! * (item.productBas?.TasaIva/100)).toString();
        newItem.importeTotal = (this.getPriceWithIva(item?.price!, item.productBas?.TasaIva)).toString();
        newItem.precioUnitario = (item?.price! / item?.quantity!).toString();
        newItem.secuenciaDetalle = countCcm.toString();
        newItem.tasaIva = item.productBas?.TasaIva.toString();
        orderCcm.pedidoVenta?.items?.push(newItem);
        countCcm++;
      });
      orderItems.orderCcm = orderCcm;
    }
    if (workCcb){
      this.cart.itemsCcb?.forEach(item => {
        const newItem = new Item();
        this.setDefaultItems(newItem);
        newItem.cantidadPrimeraUnidad = item?.quantity?.toString();
        newItem.codigoItem = item?.product?.codigo;
        newItem.importeGravado = (item?.price)?.toString();
        newItem.importeIva = (item?.price! * (item.productBas?.TasaIva/100)).toString();
        newItem.importeTotal = (this.getPriceWithIva(item?.price!, item.productBas?.TasaIva)).toString();
        newItem.precioUnitario = (item?.price! / item?.quantity!).toString();
        newItem.secuenciaDetalle = countCcb.toString();
        newItem.tasaIva = item.productBas?.TasaIva.toString();
        orderCcb.pedidoVenta?.items?.push(newItem);
        countCcb++;
      });
      orderItems.orderCcb = orderCcb;
    }

    if (this.promotionItems.length > 0){
      this.promotionItems.forEach(cartProm => {
        if (cartProm.type === '001'){
          
          if (cartProm.condition === 'CCM'){
            cartProm?.promotion?.Detalle.forEach((prod: any) => {
              let item = new Item();
              this.setDefaultItems(item);
              item.cantidadPrimeraUnidad =  prod?.Cantidad?.toString();
              item.codigoItem = prod?.CodigoProducto;
              item.importeGravado = (prod?.Precio)?.toString();
              item.importeIva = (prod?.Precio! * (prod.TasaIva/100)).toString();
              item.importeTotal = (this.getPriceWithIva(prod?.Precio!, prod.TasaIva)).toString();
              item.precioUnitario = (prod?.Precio).toString();
              item.secuenciaDetalle = countCcm.toString();
              item.tasaIva = prod.TasaIva.toString();
              orderItems.orderCcm?.pedidoVenta?.items?.push(item);
              countCcm++;
            });
          }
          if (cartProm.condition === 'CCB'){
            cartProm?.promotion?.Detalle.forEach((prod: any) => {
              let item = new Item();
              this.setDefaultItems(item);
              item.cantidadPrimeraUnidad =  prod?.Cantidad?.toString();
              item.codigoItem = prod?.CodigoProducto;
              item.importeGravado = (prod?.Precio)?.toString();
              item.importeIva = (prod?.Precio! * (prod.TasaIva/100)).toString();
              item.importeTotal = (this.getPriceWithIva(prod?.Precio!, prod.TasaIva)).toString();
              item.precioUnitario = (prod?.Precio).toString();
              item.secuenciaDetalle = countCcb.toString();
              item.tasaIva = prod.TasaIva.toString();
              orderItems.orderCcb?.pedidoVenta?.items?.push(item);
              countCcb++;
            });
          }
        }
        if (cartProm.type === '003'){
          if (cartProm.condition === 'CCM'){
            for(let i = 0; i < cartProm?.promotionsTypeThree.length; i++){
              let item = new Item();
              this.setDefaultItems(item);
              let cantidadDesde = this.getPromotionQuantity(cartProm.promotion.TablaBonificaciones, cartProm?.promotionsTypeThree.cant);
              const bonif = cartProm.promotion?.TablaBonificaciones.find((b: any) => b.CantidadDesde === cantidadDesde);
              
              item.cantidadPrimeraUnidad =  (cartProm?.promotionsTypeThree[i].cant+cartProm?.promotionsTypeThree[i].bonusAmmount).toString();
              item.codigoItem = cartProm?.promotion?.Detalle[i].CodigoProducto;
              item.importeGravado = (cartProm?.promotionsTypeThree[i].unitPrice * (cartProm?.promotionsTypeThree[i].cant + cartProm?.promotionsTypeThree[i].bonusAmmount))?.toString();
              item.importeIva = ((cartProm?.promotionsTypeThree[i].unitPrice * (cartProm?.promotionsTypeThree[i].cant + cartProm?.promotionsTypeThree[i].bonusAmmount)) * (cartProm?.promotionsTypeThree[i].iva/100)).toString();
              item.importeTotal = (this.getPriceWithIva((cartProm?.promotionsTypeThree[i].unitPrice * (cartProm?.promotionsTypeThree[i].cant + cartProm?.promotionsTypeThree[i].bonusAmmount)), cartProm?.promotionsTypeThree[i].iva)).toString();
              item.precioUnitario = (cartProm?.promotionsTypeThree[i].unitPrice).toString();
              item.secuenciaDetalle = countCcm.toString();
              item.tasaIva = cartProm?.promotionsTypeThree[i].iva.toString();
              orderItems.orderCcm?.pedidoVenta?.items?.push(item);
              countCcm++;
            }
          }
          if (cartProm.condition === 'CCB'){
            for(let i = 0; i < cartProm?.promotionsTypeThree.length; i++){
              let item = new Item();
              this.setDefaultItems(item);
              let cantidadDesde = this.getPromotionQuantity(cartProm.promotion.TablaBonificaciones, cartProm?.promotionsTypeThree.cant);
              const bonif = cartProm.promotion?.TablaBonificaciones.find((b: any) => b.CantidadDesde === cantidadDesde);
              
              item.cantidadPrimeraUnidad =  (cartProm?.promotionsTypeThree[i].cant+cartProm?.promotionsTypeThree[i].bonusAmmount).toString();
              item.codigoItem = cartProm?.promotion?.Detalle[i].CodigoProducto;
              item.importeGravado = (cartProm?.promotionsTypeThree[i].unitPrice * (cartProm?.promotionsTypeThree[i].cant + cartProm?.promotionsTypeThree[i].bonusAmmount))?.toString();
              item.importeIva = ((cartProm?.promotionsTypeThree[i].unitPrice * (cartProm?.promotionsTypeThree[i].cant + cartProm?.promotionsTypeThree[i].bonusAmmount)) * (cartProm?.promotionsTypeThree[i].iva/100)).toString();
              item.importeTotal = (this.getPriceWithIva((cartProm?.promotionsTypeThree[i].unitPrice * (cartProm?.promotionsTypeThree[i].cant + cartProm?.promotionsTypeThree[i].bonusAmmount)), cartProm?.promotionsTypeThree[i].iva)).toString();
              item.precioUnitario = (cartProm?.promotionsTypeThree[i].unitPrice).toString();
              item.secuenciaDetalle = countCcb.toString();
              item.tasaIva = cartProm?.promotionsTypeThree[i].iva.toString();
              orderItems.orderCcb?.pedidoVenta?.items?.push(item);
              countCcb++;
            }
          }
        }
      });
    }
    // this.loadPromotions(orderItems);
    if (orderItems.orderCcb?.pedidoVenta?.items?.length === 0) delete orderItems.orderCcb;
    if (orderItems.orderCcm?.pedidoVenta?.items?.length === 0) delete orderItems.orderCcm;
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
  getPromotionQuantity(promotions: any, quantity: number){
    for (let i = 0; i < promotions.length; i++) {
      if (quantity >= promotions[i].CantidadDesde) {
        if (i+1 < promotions.length){
          if (quantity < promotions[i+1].CantidadDesde){
            return promotions[i].CantidadDesde;
          }
        }
        else return promotions[i].CantidadDesde;
      }
      else return promotions[i].CantidadDesde;
    }
  }
  setDefaultValuesOrderSale(order :OrderSale, condition: string, initDate: Date, finishDate: Date, priceCcm: number, priceCcb: number, iva: number){
    order.items = [];
    order.cliente = this.clientBas.Codigo;
    order.comprobante = 'PV';
    order.concepto = 'VEN';
    order.condicionVentaCompra = condition;
    order.deposito = this.clientBas.Deposito;
    order.empresa = this.clientBas.Empresa?.toString();
    order.fecha = this.getDateFormat(initDate);
    order.fechaExpiracion = this.getDateFormat(finishDate);
    order.listaPrecios = '';
    order.metodoPago = 'C';
    order.numero = '';
    order.prefijo = this.clientBas.Prefijo?.toString();
    order.sucursal = this.clientBas.Sucursal?.toString();
    order.total = condition === 'CCM' ? (this.getPriceWithIva(priceCcm, iva)).toString(): (this.getPriceWithIva(priceCcb, iva)).toString();
    order.totalGravado = condition === 'CCM' ? priceCcm.toString() : priceCcb.toString();
    order.totalImpuestosInternos = '0.00';
    order.totalIva = condition === 'CCM' ?  (priceCcm* (iva/100)).toString() : (priceCcb* (iva/100)).toString();
    order.totalPercepcionGanancias = '0.00';
    order.totalPercepcionIngBr = '0.00';
    order.totalPercepcionIva = '0.00';
    order.transportista = this.sellerCode ? '' : this.form.get('carrier')?.value;
    order.vendedoroCobrador = this.sellerCode ? this.sellerCode : '';
  }
  setDefaultItems(item: Item){
    item.fechaEntrega = '';
    item.importeImpuestoInterno = '0.00';
    item.importeIvaNoInscripto = '';
    item.importePercepcionGanancias = '';
    item.importePercepcionIngBr = '';
    item.importePercepcionIva = '';
    item.numeroUnidadMedida = '1';
    item.observacionItem = this.form.get('observation')?.value;
    item.pendienteRemitirFacturar = 'A';
    item.porcentajeBonificacion = '';
    item.porcentajeComisionCobranzas = '0.00';
    item.porcentajeComisionVentas = '0.00';
    item.porcentajeSegundaBonificacion = '0.00';
    item.tasaImpuestoInterno = '0.00';
    item.tasaIvaNoInscripto = '0.00';
  }
}
