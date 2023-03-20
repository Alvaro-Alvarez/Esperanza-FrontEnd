import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasService } from 'src/app/modules/shared/services/bas.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { ProductService } from 'src/app/modules/shared/services/product.service';
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
  quantity = 1;
  quantities: number[] = [];
  outOfStock = false;
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private route: ActivatedRoute,
    private basService: BasService,
    private localStorageService: LocalStorageService,
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
        this.quantities.push(1);
      });
      console.log(this.promotion);
      this.getProducts();
    }, err =>{
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de obtener las promociones');
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
      console.log(res);
      this.products = res?.products;
    }, err =>{
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de obtener los productos');
    });
  }
  getImgName(promotion: any): string{
    let name: string = promotion?.Codigo;;
    return name + '.jpeg';
  }
  // getProductPrice(prod: any): string{
  //   let name: string = promotion?.Codigo;;
  //   return name + '.jpeg';
  // }
  updateUrl(event: any){
    this.hasImg = false;
  }
  getProductImage(prodCode: string){
    const prod = this.products.find(p => p?.codigo === prodCode)
    return prod ? prod.foto : 'assets/no-image3.jpg';
  }
  addQuantity(val: any){
    this.quantity = val;
  }
  buyNow(){
  }
  addToCart(){
    
  }
}
