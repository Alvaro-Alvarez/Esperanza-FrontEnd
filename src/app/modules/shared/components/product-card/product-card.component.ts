import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from 'src/app/core/models/product';
import { RoutingService } from '../../services/routing.service';
import { registerLocaleData } from '@angular/common';
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
  // @Input() product?: Product;
  
  constructor(
    public nav :RoutingService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
  }
  addToCart(){

  }
  goToProduct(){
    // const id = this.product.id;
    this.nav.goToProduct('1');
  }
  transformImage(base64Image: any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }
}
