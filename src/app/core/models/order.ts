export class OrderItems {
    orderCcm?: Order;
    orderCcb?: Order;
}
export class Order {
    pedidoVenta?: OrderSale;
}
export class OrderSale {
    cliente?: string;
    comprobante?: string;
    concepto?: string;
    condicionVentaCompra?: string;
    deposito?: string;
    empresa?: string;
    fecha?: string;
    fechaExpiracion?: string;
    listaPrecios?: string;
    metodoPago?: string;
    numero?: string;
    prefijo?: string;
    sucursal?: string;
    total?: string;
    totalGravado?: string;
    totalImpuestosInternos?: string;
    totalIva?: string;
    totalPercepcionGanancias?: string;
    totalPercepcionIngBr?: string;
    totalPercepcionIva?: string;
    transportista?: string;
    vendedoroCobrador?: string;
    items?: Item[];
}
export class Item {
    cantidadPrimeraUnidad?: string;
    codigoItem?: string;
    fechaEntrega?: string;
    importeGravado?: string;
    importeImpuestoInterno?: string;
    importeIva?: string;
    importeIvaNoInscripto?: string;
    importePercepcionGanancias?: string;
    importePercepcionIngBr?: string;
    importePercepcionIva?: string;
    importeTotal?: string;
    numeroUnidadMedida?: string;
    observacionItem?: string;
    pendienteRemitirFacturar?: string;
    porcentajeBonificacion?: string;
    porcentajeComisionCobranzas?: string;
    porcentajeComisionVentas?: string;
    porcentajeSegundaBonificacion?: string;
    precioUnitario?: string;
    secuenciaDetalle?: string;
    tasaImpuestoInterno?: string;
    tasaIva?: string;
    tasaIvaNoInscripto?: string;
}