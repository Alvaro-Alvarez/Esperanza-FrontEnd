import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { BasService } from 'src/app/modules/shared/services/bas.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.scss']
})
export class BestSellersComponent implements OnInit {

  products: any[] = [];
  noUserClientCode = '001';
  isUserLogged: boolean = false;
  
  constructor(
    private productService: ProductService,
    private localStorageService: LocalStorageService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private basService: BasService,
    public routing: RoutingService,
    private authService: AuthService,
    private currencyPipe: CurrencyPipe,
  ) {
    this.isUserLogged = authService.activeUser();
  }

  ngOnInit(): void {
    this.getRecommendeds();
  }
  goToProduct(code: string){
    this.routing.goToProductDescription(code);
  }
  getPrice(price: string){
    if (price){
      price = price.replace(',', '.');
      let money = Number(price);
      let moneyConverted = this.currencyPipe.transform(money, '$');
      return moneyConverted;
    }
    else return '0';
  }
  getRecommendeds(){
    this.spinner.show();
    const clientBas = JSON.parse(this.localStorageService.getBasClient()!);
    let clientCode: string = clientBas ? clientBas.Codigo : this.noUserClientCode;
    this.basService.GetRecommendedProducts(clientCode).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      res?.sort((a: any,b: any) => a.RANKING - b.RANKING);
      const codes = res?.map((a: any) => a.CODIGOS);
      for(let i = 0; i < codes?.length; i++){
        const arr = codes[i].split('|');
        if (arr.length > 1) codes[i] = arr[0];
      }
      this.getRecommendedProducts(codes);
    }, err =>{
      this.spinner.hide();
      console.log(err);
      this.alert.error('Ocurrió un error al obtener productos recomendados bas.');
    })
  }
  getRecommendedProducts(productCodes: string[]){
    this.spinner.show();
    this.productService.getAllRecommended({productCodes: productCodes}).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.products = res.products;
    }, err =>{
      this.spinner.hide();
      console.log(err);
      this.alert.error('Ocurrió un error al obtener productos recomendados.');
    })
  }
}
