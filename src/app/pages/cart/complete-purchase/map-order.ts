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

// {
//     "PedidoVenta":{
//        "Cliente":"76151", //cod cliente
//        "Comprobante":"PV", // Dato estatico
//        "Concepto":"VEN", // Dato estatico
//        "CondicionVentaCompra":"CCM", // obtengo de cliente bas
//        "Deposito":"1", // lo tiene el cliente bas
//        "Empresa":"1",// lo tiene el cliente bas
//        "Fecha":"20220924",// fecha en la q realiza la compra
//        "FechaExpiracion":"20221023",// mas 30 dias de lo de arriba
//        "ListaPrecios":"",// obtener el codigo de lista segun el cliente y los servicios (ej: 001)
//        "MetodoPago":"C",// Dato estatico
//        "Numero":"",// No se le pasa nada.
//        "Prefijo":"100",// lo tiene el cliente bas
//        "Sucursal":"1",// lo tiene el cliente bas
//        "Total":"636.34",// total del paquete ccm o ccb
//        "TotalGravado":"525.90",// precio sin IVA
//        "TotalImpuestosInternos":"0.00",// dejarlo en 0.00
//        "TotalIva":"110.44",// solo 21% del iva
//        "TotalPercepcionGanancias":"0.00",// dejarlo en 0.00
//        "TotalPercepcionIngBr":"0.00",// dejarlo en 0.00
//        "TotalPercepcionIva":"0.00",// dejarlo en 0.00
//        "Transportista":"T0007",// por ahora dejarlo vacio
//        "VendedoroCobrador":"501",// lo tiene el cliente bas
//        "Items":[
//           {
//              "CantidadPrimeraUnidad":"2.00", // lo tiene el producto
//              "CodigoItem":"0101000006",// lo tiene el producto
//              "FechaEntrega":"20200724", // mandar vacio
//              "ImporteGravado":"525.90", // precio sin IVA
//              "ImporteImpuestoInterno":"0.00",// por ahora dejarlo vacio
//              "ImporteIva":"110.44",// solo 21% del iva
//              "ImporteIvaNoInscripto":"0.00",// por ahora dejarlo vacio
//              "ImportePercepcionGanancias":"0.00",// por ahora dejarlo vacio
//              "ImportePercepcionIngBr":"0.00",// por ahora dejarlo vacio
//              "ImportePercepcionIva":"0.00",// por ahora dejarlo vacio
//              "ImporteTotal":"636.34", // lo tiene el carrito
//              "NumeroUnidadMedida":"1", // por el momento dejarlo en 1
//              "ObservacionItem":"", // vacio
//              "PendienteRemitirFacturar":"A", // por el momento dejarlo en A
//              "PorcentajeBonificacion":"0.00", // el % de bonic q ya tiene el prod
//              "PorcentajeComisionCobranzas":"0.00",// por ahora dejarlo vacio
//              "PorcentajeComisionVentas":"0.00",// por ahora dejarlo vacio
//              "PorcentajeSegundaBonificacion":"0.00",// por ahora dejarlo vacio
//              "PrecioUnitario":"262.95",// precio del articulo
//              "SecuenciaDetalle":"1", // por ahora dejarlo en 1
//              "TasaImpuestoInterno":"0.00", // siempre 0
//              "TasaIva":"21.00", // lo q tiene el prod bas
//              "TasaIvaNoInscripto":"0.00" // siempre 0
//           }
//        ]
//     }
//  }