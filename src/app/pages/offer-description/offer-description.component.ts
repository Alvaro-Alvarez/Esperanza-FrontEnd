import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromotionType } from 'src/app/core/enums/promotion-type.enum';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs';
import { Offer, ProductBonification, ProductSale } from 'src/app/core/models/cart';
import { BasService } from 'src/app/modules/shared/services/bas.service';
import { EventService } from 'src/app/modules/shared/services/event.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { ShoppingService } from 'src/app/modules/shared/services/shopping.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';

@Component({
  selector: 'app-offer-description',
  templateUrl: './offer-description.component.html',
  styleUrls: ['./offer-description.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }]
})
export class OfferDescriptionComponent implements OnInit {

  promotion: any;
  auxBread = '';
  condition = '';
  code = '';
  noUserClientCode = '001';
  hasImg = true;
  maxQuantity = 1000; // TODO: Modificar esto
  quantity = 0;
  quantities: number[] = [];
  bonusAmmount: number[] = [];
  outOfStock = false;
  products: any[] = [];
  noItems = true;
  breadcrumbs: Breadcrumb[]= [];

  constructor(
    private productService: ProductService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private route: ActivatedRoute,
    private basService: BasService,
    private localStorageService: LocalStorageService,
    private shoppingService: ShoppingService,
    public routing: RoutingService,
    private eventService: EventService,
  ) { 
    this.auxBread = this.route.snapshot.params['condition'];
    this.condition = this.route.snapshot.params['condition'];
    this.condition = this.condition === 'Alimentos' ? 'CCB' : 'CCM';
    this.code = this.route.snapshot.params['code'];
    this.code = this.code.replace('%', ' ');
    this.insertBreadcrumb();
  }

  ngOnInit(): void {
    this.getPromotions();
  }
  getPromotions(){
    this.spinner.show();
    const clientBas = JSON.parse(this.localStorageService.getBasClient()!);
    const clientCode: string = clientBas?.Codigo ? clientBas?.Codigo : this.noUserClientCode;
    this.basService.getAllPromotions(clientCode, this.condition).subscribe(promotions => {
      this.spinner.hide();
      this.promotion = promotions.find((p: any) => p?.Codigo === this.code);
      this.promotion?.Detalle.map((item: any) => {
        this.quantities.push(0);
        this.bonusAmmount.push(0);
      });
      this.getProducts();
    }, err =>{
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  getProducts(){
    this.spinner.show();
    const codes: string[] = [];
    if (this.promotion){
      this.promotion?.Detalle.map((item: any) => {
        codes.push(item?.CodigoProducto);
      });
    }
    this.productService.getAllRecommended({productCodes: codes}).subscribe(res => {
      this.spinner.hide();
      this.products = res?.products;
    }, err =>{
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  getImgName(promotion: any): string{
    let name: string = promotion?.Codigo;;
    return name + '.jpeg';
  }
  updateUrl(event: any){
    this.hasImg = false;
  }
  getProductImage(prodCode: string){
    const prod = this.products.find(p => p?.codigo === prodCode)
    return prod ? prod.foto : 'assets/no-image3.jpg';
  }
  addQuantity(val: any, many: boolean = false, index: number = 0){
    if (many){
      this.quantities[index] = val;
      this.bonusAmount(index);
    }
    else this.quantity = val;
  }
  bonusAmount(index: number){
    const quantity = this.quantities[index];
    let cantidadDesde = this.getPromotionQuantity(quantity);
    const bonif = this.promotion?.TablaBonificaciones.find((b: any) => b.CantidadDesde === cantidadDesde);
    const bonusAmount = (bonif.Porcentaje*quantity) / 100;
    this.bonusAmmount[index] = Math.floor(bonusAmount);
    return ;
  }
  getPromotionQuantity(quantity: number){
    for (let i = 0; i < this.promotion?.TablaBonificaciones.length; i++) {
      if (quantity >= this.promotion?.TablaBonificaciones[i].CantidadDesde) {
        if (i+1 < this.promotion?.TablaBonificaciones.length){
          if (quantity < this.promotion?.TablaBonificaciones[i+1].CantidadDesde){
            return this.promotion?.TablaBonificaciones[i].CantidadDesde;
          }
        }
        else return this.promotion?.TablaBonificaciones[i].CantidadDesde;
      }
      else return this.promotion?.TablaBonificaciones[i].CantidadDesde;
    }
  }
  getPriceMany(price: number, index: number){
    return (price * this.quantities[index])
  }
  anyProduct(){
    return this.quantity > 0 || this.quantities.some(q => q > 0);
  }
  buyNow(){
  }
  addToCart(){
    debugger
    const offer = new Offer();
    let productCount = 0;
    offer.offerCode = this.promotion.Codigo;
    offer.type = this.promotion?.Tipo;
    offer.condition = this.products[0]?.condicion;
    offer.name = this.promotion.Descripcion;
    offer.imageUrl = `https://esperanzadistri.com.ar/flyers/${offer.offerCode}.jpeg`;
    offer.unitPrice = this.promotion?.Precio;
    offer.bonifications = this.getBonifications(this.promotion?.TablaBonificaciones);
    offer.category = this.promotion.Categoria;
    offer.quantity = this.quantity;
    offer.iva = this.promotion?.Detalle[0].TasaIva;
    this.promotion?.Detalle.map((product: any) => {
      const prod = this.products.find((p: any) => p.codigo === product?.CodigoProducto);
      const productSale = new ProductSale();
      productSale.code = product?.CodigoProducto;
      productSale.quantity = offer.type === PromotionType.One ? product.Cantidad : this.quantities[productCount];
      productSale.unitPrice = product.Precio;
      productSale.iva = product.TasaIva;
      productSale.category = product.Categoria;
      productSale.name = product.Descripcion;
      productSale.image = prod?.foto;
      if (PromotionType.Three === offer.type){
        productSale.bonusAmmount = this.bonusAmmount[productCount];
      }
      offer.productSales.push(productSale);
      productCount++;
    });
    this.shoppingService.addOfferToCart(offer);
    this.routing.goToCart();
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
    this.localStorageService.setBreadcrumbs(new Breadcrumb('Oferta', `/offer-description/${this.auxBread}/${this.code}`));
    this.breadcrumbs = this.localStorageService.getBreadcrumbs();
    this.eventService.onShowBreadcrumbs.emit(this.breadcrumbs);
  }
  getPriceUnitOne(){
    let totalProducts = 0;
    this.promotion?.Detalle.map((prom: any) => {
      totalProducts = totalProducts + prom?.Cantidad*this.quantity;
    });
    return ((this.promotion?.Precio*this.quantity)/totalProducts);
  }
  getPriceUnitThree(qunatity: number, qunatityAmmount: number, price: number){
    return (price * qunatity) / (qunatity + qunatityAmmount);
  }
}
