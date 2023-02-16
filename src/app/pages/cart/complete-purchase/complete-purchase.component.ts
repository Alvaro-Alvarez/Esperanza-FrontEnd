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
  form!: FormGroup;
  sellerCode = '';
  clientBas: any;
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
    this.getCarriers();
    this.clientBas = JSON.parse(this.localStorageService.getBasClient()!);
    this.initForm();
    console.log(this.cart);
    console.log(this.items);
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
          this.complete.emit();
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
    let workCcm = this.cart.itemsCcm && this.cart.itemsCcm.length > 0;
    let workCcb = this.cart.itemsCcb && this.cart.itemsCcb.length > 0;
    this.cart.itemsCcm?.forEach(item => {priceCcm += item.price!;});
    this.cart.itemsCcb?.forEach(item => {priceCcb += item.price!;});
    let initDate = new Date();
    let finishDate = new Date();
    finishDate.setDate(finishDate.getDate() + 30);

    const orderItems: OrderItems = new OrderItems();
    if (workCcm){
      const orderCcm: Order = new Order();
      orderCcm.pedidoVenta = new OrderSale();
      orderCcm.pedidoVenta.items = [];
      orderCcm.pedidoVenta.cliente = this.clientBas.Codigo;
      orderCcm.pedidoVenta.comprobante = 'PV';
      orderCcm.pedidoVenta.concepto = 'VEN';
      orderCcm.pedidoVenta.condicionVentaCompra = 'CCM';
      orderCcm.pedidoVenta.deposito = this.clientBas.Deposito;
      orderCcm.pedidoVenta.empresa = this.clientBas.Empresa?.toString();
      orderCcm.pedidoVenta.fecha = this.getDateFormat(initDate);
      orderCcm.pedidoVenta.fechaExpiracion = this.getDateFormat(finishDate);
      orderCcm.pedidoVenta.listaPrecios = '';
      orderCcm.pedidoVenta.metodoPago = 'C';
      orderCcm.pedidoVenta.numero = '';
      orderCcm.pedidoVenta.prefijo = this.clientBas.Prefijo?.toString();
      orderCcm.pedidoVenta.sucursal = this.clientBas.Sucursal?.toString();
      orderCcm.pedidoVenta.total = (this.getPriceWithIva(priceCcm, this.cart?.itemsCcm![0].productBas?.TasaIva)).toString();
      orderCcm.pedidoVenta.totalGravado = priceCcm.toString();
      orderCcm.pedidoVenta.totalImpuestosInternos = '0.00';
      orderCcm.pedidoVenta.totalIva = (priceCcm* (this.cart?.itemsCcm![0].productBas?.TasaIva/100)).toString();
      orderCcm.pedidoVenta.totalPercepcionGanancias = '0.00';
      orderCcm.pedidoVenta.totalPercepcionIngBr = '0.00';
      orderCcm.pedidoVenta.totalPercepcionIva = '0.00';
      orderCcm.pedidoVenta.transportista = this.sellerCode ? '' : this.form.get('carrier')?.value;
      orderCcm.pedidoVenta.vendedoroCobrador = this.sellerCode ? this.sellerCode : '';
      let countCcm = 1;
      this.cart.itemsCcm?.forEach(item => {
        const newItem = new Item();
        newItem.cantidadPrimeraUnidad = item?.quantity?.toString();
        newItem.codigoItem = item?.product?.codigo;
        newItem.fechaEntrega = '';
        newItem.importeGravado = (item?.price)?.toString();
        newItem.importeImpuestoInterno = '0.00';
        newItem.importeIva = (item?.price! * (item.productBas?.TasaIva/100)).toString();
        newItem.importeIvaNoInscripto = '';
        newItem.importePercepcionGanancias = '';
        newItem.importePercepcionIngBr = '';
        newItem.importePercepcionIva = '';
        newItem.importeTotal = (this.getPriceWithIva(item?.price!, item.productBas?.TasaIva)).toString();
        newItem.numeroUnidadMedida = '1';
        newItem.observacionItem = this.form.get('observation')?.value;
        newItem.pendienteRemitirFacturar = 'A';
        newItem.porcentajeBonificacion = ''; // TODO: VEEEER
        newItem.porcentajeComisionCobranzas = '0.00';
        newItem.porcentajeComisionVentas = '0.00';
        newItem.porcentajeSegundaBonificacion = '0.00';
        newItem.precioUnitario = (item?.price! / item?.quantity!).toString();
        newItem.secuenciaDetalle = countCcm.toString();
        newItem.tasaImpuestoInterno = '0.00';
        newItem.tasaIva = item.productBas?.TasaIva.toString();
        newItem.tasaIvaNoInscripto = '0.00';
        orderCcm.pedidoVenta?.items?.push(newItem);
        countCcm++;
      });
      orderItems.orderCcm = orderCcm;
    }
    if (workCcb){
      const orderCcb: Order = new Order();
      orderCcb.pedidoVenta = new OrderSale();
      orderCcb.pedidoVenta.items = [];
      orderCcb.pedidoVenta.cliente = this.clientBas.Codigo;
      orderCcb.pedidoVenta.comprobante = 'PV';
      orderCcb.pedidoVenta.concepto = 'VEN';
      orderCcb.pedidoVenta.condicionVentaCompra = 'CCM';
      orderCcb.pedidoVenta.deposito = this.clientBas.Deposito;
      orderCcb.pedidoVenta.empresa = this.clientBas.Empresa?.toString();
      orderCcb.pedidoVenta.fecha = this.getDateFormat(initDate);
      orderCcb.pedidoVenta.fechaExpiracion = this.getDateFormat(finishDate);
      orderCcb.pedidoVenta.listaPrecios = '';
      orderCcb.pedidoVenta.metodoPago = 'C';
      orderCcb.pedidoVenta.numero = '';
      orderCcb.pedidoVenta.prefijo = this.clientBas.Prefijo?.toString();
      orderCcb.pedidoVenta.sucursal = this.clientBas.Sucursal?.toString();
      orderCcb.pedidoVenta.total = (this.getPriceWithIva(priceCcb, this.cart?.itemsCcb![0].productBas?.TasaIva)).toString();
      orderCcb.pedidoVenta.totalGravado = priceCcb.toString();
      orderCcb.pedidoVenta.totalImpuestosInternos = '0.00';
      orderCcb.pedidoVenta.totalIva = (priceCcb* (this.cart?.itemsCcb![0].productBas?.TasaIva/100)).toString();
      orderCcb.pedidoVenta.totalPercepcionGanancias = '0.00';
      orderCcb.pedidoVenta.totalPercepcionIngBr = '0.00';
      orderCcb.pedidoVenta.totalPercepcionIva = '0.00';
      orderCcb.pedidoVenta.transportista = this.sellerCode ? '' : this.form.get('carrier')?.value;
      orderCcb.pedidoVenta.vendedoroCobrador = this.sellerCode ? this.sellerCode : '';
      let countCcb = 1;
      this.cart.itemsCcb?.forEach(item => {
        const newItem = new Item();
        newItem.cantidadPrimeraUnidad = item?.quantity?.toString();
        newItem.codigoItem = item?.product?.codigo;
        newItem.fechaEntrega = '';
        newItem.importeGravado = (item?.price)?.toString();
        newItem.importeImpuestoInterno = '0.00';
        newItem.importeIva = (item?.price! * (item.productBas?.TasaIva/100)).toString();
        newItem.importeIvaNoInscripto = '';
        newItem.importePercepcionGanancias = '';
        newItem.importePercepcionIngBr = '';
        newItem.importePercepcionIva = '';
        newItem.importeTotal = (this.getPriceWithIva(item?.price!, item.productBas?.TasaIva)).toString();
        newItem.numeroUnidadMedida = '1';
        newItem.observacionItem = this.form.get('observation')?.value;
        newItem.pendienteRemitirFacturar = 'A';
        newItem.porcentajeBonificacion = ''; // TODO: VEEEER
        newItem.porcentajeComisionCobranzas = '0.00';
        newItem.porcentajeComisionVentas = '0.00';
        newItem.porcentajeSegundaBonificacion = '0.00';
        newItem.precioUnitario = (item?.price! / item?.quantity!).toString();
        newItem.secuenciaDetalle = countCcb.toString();
        newItem.tasaImpuestoInterno = '0.00';
        newItem.tasaIva = item.productBas?.TasaIva.toString();
        newItem.tasaIvaNoInscripto = '0.00';
        orderCcb.pedidoVenta?.items?.push(newItem);
        countCcb++;
      });
      orderItems.orderCcb = orderCcb;
    }
    return orderItems;
  }
  getDateFormat(date: Date){
    const format = date.toLocaleDateString("es-ES");
    const arr = format.split('/');
    for (let i = 0; i < arr.length; i++){
      if (arr[i].length === 1) arr[i] = '0'+arr[i];
    }
    // arr.forEach(item => {
    //   if (item.length === 1) item = '0'+item;
    // });
    return arr.reverse().join('/');
  }
}
