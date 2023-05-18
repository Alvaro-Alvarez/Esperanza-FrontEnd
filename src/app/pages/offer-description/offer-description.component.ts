import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemPromotionCart, PromotionTypeOne, PromotionTypeThree } from 'src/app/core/models/shopping';
import { BasService } from 'src/app/modules/shared/services/bas.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { ShoppingService } from 'src/app/modules/shared/services/shopping.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';

@Component({
  selector: 'app-offer-description',
  templateUrl: './offer-description.component.html',
  styleUrls: ['./offer-description.component.scss']
})
export class OfferDescriptionComponent implements OnInit {

  promotion: any;
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

  constructor(
    private productService: ProductService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private route: ActivatedRoute,
    private basService: BasService,
    private localStorageService: LocalStorageService,
    private shoppingService: ShoppingService,
    public routing: RoutingService,
  ) { 
    this.condition = this.route.snapshot.params['condition'];
    this.condition = this.condition === 'Alimentos' ? 'CCB' : 'CCM';
    this.code = this.route.snapshot.params['code'];
    this.code = this.code.replace('%', ' ');
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
      this.promotion?.Detalle.forEach((item: any) => {
        this.quantities.push(0);
        this.bonusAmmount.push(0);
      });
      console.log(this.promotion);
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
      this.promotion?.Detalle.forEach((item: any) => {
        codes.push(item?.CodigoProducto);
      });
    }
    this.productService.getAllRecommended({productCodes: codes}).subscribe(res => {
      this.spinner.hide();
      // console.log(res);
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
    // const quantity = this.quantities[index];
    // const percen = this.promotion?.TablaBonificaciones[0]?.Porcentaje;
    // const bonusAmount = (percen*quantity) / 100;
    // this.bonusAmmount[index] = Math.floor(bonusAmount);
    // return ;
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
    const item = new ItemPromotionCart();
    item.type = this.promotion?.Tipo;
    item.promotion = this.promotion;
    item.condition = this.products[0]?.condicion;
    if (this.promotion?.Tipo === '001'){
      item.promotionTypeOne = new PromotionTypeOne();
      item.promotionTypeOne.images = [];
      item.promotionTypeOne.iva = this.promotion?.Detalle[0]?.TasaIva;
      item.promotionTypeOne.cant = this.quantity;
      item.promotionTypeOne.unitPrice = this.promotion?.Precio;
      for(let i = 0; i < this.promotion?.Detalle.length; i++){
        const prod = this.products.find((p: any) => p.codigo === this.promotion?.Detalle[i]?.CodigoProducto);
        item.promotionTypeOne.images.push(prod?.foto);
      }
      // item.promotionTypeOne.condition = this.products[0]?.condicion;
    }
    else if (this.promotion?.Tipo === '003'){
      item.promotionsTypeThree = [];
      for(let i = 0; i < this.promotion?.Detalle.length; i++){
        const prod = this.products.find((p: any) => p.codigo === this.promotion?.Detalle[i]?.CodigoProducto);
        let prom = new PromotionTypeThree();
        prom.cant = this.quantities[i];
        prom.bonusAmmount = this.bonusAmmount[i];
        prom.unitPrice = this.promotion?.Detalle[i].Precio;
        prom.iva = this.promotion?.Detalle[i].TasaIva;;
        prom.category = prod?.categoria;
        prom.name = prod?.nombre;
        prom.image = prod?.foto;
        item.promotionsTypeThree.push(prom);
      }
    }
    this.shoppingService.addPromotionToLocalStorage(item);
    this.routing.goToCart();
  }
}
