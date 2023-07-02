import { FormGroup } from "@angular/forms";
import { Offer, Package, ProductSale } from "src/app/core/models/cart";
import { Item, OrderSale } from "src/app/core/models/order";

export class MapOrder {
    public static setDefaultValuesOrderSale(order: OrderSale, cartPackage: Package, bas: any, sellerCode: string, form: FormGroup){
        let initDate = new Date();
        let finishDate = new Date();
        finishDate.setDate(finishDate.getDate() + 30);
        order.items = [];
        order.cliente = bas.Codigo;
        order.comprobante = 'PV';
        order.concepto = 'VEN';
        order.condicionVentaCompra = cartPackage.condition;
        order.deposito = bas.Deposito;
        order.empresa = bas.Empresa?.toString();
        order.fecha = this.getDateFormat(initDate);
        order.fechaExpiracion = this.getDateFormat(finishDate);
        order.listaPrecios = '';
        order.metodoPago = 'C';
        order.numero = '';
        order.prefijo = bas.Prefijo?.toString();
        order.sucursal = bas.Sucursal?.toString();
        order.total = cartPackage.priceWithIva?.toString();
        order.totalGravado = cartPackage.price?.toString();
        order.totalImpuestosInternos = '0.00';
        order.totalIva = (cartPackage.priceWithIva - cartPackage.price)?.toString();
        order.totalPercepcionGanancias = '0.00';
        order.totalPercepcionIngBr = '0.00';
        order.totalPercepcionIva = '0.00';
        order.transportista = sellerCode ? '' : form.get('carrier')?.value;
        order.vendedoroCobrador = sellerCode ? sellerCode : '';
    }
    public static setDefaultValuesOrderSalePromotion(order: OrderSale, offer: Offer, bas: any, sellerCode: string, form: FormGroup){
        let initDate = new Date();
        let finishDate = new Date();
        finishDate.setDate(finishDate.getDate() + 30);
        order.items = [];
        order.cliente = bas.Codigo;
        order.comprobante = 'PV';
        order.concepto = 'VEN';
        order.condicionVentaCompra = offer.condition;
        order.deposito = bas.Deposito;
        order.empresa = bas.Empresa?.toString();
        order.fecha = this.getDateFormat(initDate);
        order.fechaExpiracion = this.getDateFormat(finishDate);
        order.listaPrecios = '';
        order.metodoPago = 'C';
        order.numero = '';
        order.prefijo = bas.Prefijo?.toString();
        order.sucursal = bas.Sucursal?.toString();
        order.total = offer.priceWithIva?.toString();
        order.totalGravado = offer.totalPriceWithBonifications?.toString();
        order.totalImpuestosInternos = '0.00';
        order.totalIva = (offer.priceWithIva - offer.totalPriceWithBonifications)?.toString();
        order.totalPercepcionGanancias = '0.00';
        order.totalPercepcionIngBr = '0.00';
        order.totalPercepcionIva = '0.00';
        order.transportista = sellerCode ? '' : form.get('carrier')?.value;
        order.vendedoroCobrador = sellerCode ? sellerCode : '';
    }
    public static setDefaultItems(item: Item, form: FormGroup, productSale: any = null){
        item.fechaEntrega = '';
        item.importeImpuestoInterno = '0.00';
        item.importeIvaNoInscripto = '';
        item.importePercepcionGanancias = '';
        item.importePercepcionIngBr = '';
        item.importePercepcionIva = '';
        item.numeroUnidadMedida = '1';
        item.observacionItem = form.get('observation')?.value;
        item.pendienteRemitirFacturar = 'A';
        item.porcentajeBonificacion = '';
        item.porcentajeComisionCobranzas = '0.00';
        item.porcentajeComisionVentas = '0.00';
        item.porcentajeSegundaBonificacion = '0.00';
        item.tasaImpuestoInterno = '0.00';
        item.tasaIvaNoInscripto = '0.00';
    }
    public static getItemPromotionFlag(productSale: any, form: FormGroup, itemCount: number){
        const item = new Item();
        MapOrder.setDefaultItems(item, form);
        item.codigoItem = 'TXT01';
        item.observacionItem = productSale.name;
        item.secuenciaDetalle = itemCount.toString();
        item.cantidadPrimeraUnidad = '1';
        item.importeGravado = '0.00';
        item.importeIva = '0.00';
        item.importeTotal = '0.00';
        item.precioUnitario = '0.00';
        item.porcentajeBonificacion = '0';
        return item;
    }
    public static getItemOnlyPromotion(productSale: any, form: FormGroup, itemCount: number){
        const item = new Item();
        MapOrder.setDefaultItems(item, form);
        item.tasaIva = productSale.iva.toString()
        item.secuenciaDetalle = itemCount.toString();
        item.codigoItem = productSale?.code;
        item.cantidadPrimeraUnidad = productSale.bonusAmmount?.toString();
        item.importeGravado = '0.00';
        item.importeIva = '0.00';
        item.importeTotal = '0.00';
        item.precioUnitario = '0.00';
        item.porcentajeBonificacion = '100';
        return item;
    }
    public static getItemOnlyPromotionOne(productSale: any, offer: any, form: FormGroup, itemCount: number){
        const item = new Item();
        MapOrder.setDefaultItems(item, form);
        item.tasaIva = productSale.iva.toString()
        item.secuenciaDetalle = itemCount.toString();
        item.codigoItem = productSale?.code;
        item.cantidadPrimeraUnidad = (productSale.quantity*offer.quantity).toString();
        item.importeGravado = '0.00';
        item.importeIva = '0.00';
        item.importeTotal = '0.00';
        item.precioUnitario = '0.00';
        item.porcentajeBonificacion = '100';
        return item;
    }
    private static getDateFormat(date: Date){
        const format = date.toLocaleDateString("es-ES");
        const arr = format.split('/');
        for (let i = 0; i < arr.length; i++){
          if (arr[i].length === 1) arr[i] = '0'+arr[i];
        }
        return arr.reverse().join('/');
    }
}