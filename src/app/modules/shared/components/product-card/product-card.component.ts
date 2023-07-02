import { Component, Input, LOCALE_ID, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RoutingService } from '../../services/routing.service';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it'
registerLocaleData(localeIt, 'it');

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }]
})
export class ProductCardComponent implements OnInit {

  @Input() product?: any;
  @Input() discount?: boolean = false;
  @Input() activeUser?: boolean = false;
  @Input() isProductLaboratory?: boolean = false;
  errorImg = false;
  
  constructor(
    public nav :RoutingService,
    private sanitizer: DomSanitizer,
    private currencyPipe: CurrencyPipe
  ) { }

  ngOnInit(): void {
  }
  addToCart(){  }
  goToProduct(){
    this.nav.goToProduct('1');
  }
  transformImage(base64Image: any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }
  getPrice(price: string){
    if (price){
      price = price.replace(',', '.');
      let money = Number(price);
      let moneyConverted = this.currencyPipe.transform(money, 'ARS');
      return moneyConverted;
    }
    else return '0';
  }
  getPriceNumber(price: string){
    if (price){
      price = price.replace(',', '.');
      return  Number(price);;
    }
    else return 0;
  }
  updateUrl(ev: any){
    this.errorImg = true;
  }
}
