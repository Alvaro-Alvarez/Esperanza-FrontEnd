import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from 'src/app/core/models/product';
import { RoutingService } from '../../services/routing.service';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it'
registerLocaleData(localeIt, 'it');

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product?: any;
  @Input() discount?: boolean = false;
  @Input() isProductLaboratory?: boolean = false;
  
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
      let moneyConverted = this.currencyPipe.transform(money, '$');
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
}
