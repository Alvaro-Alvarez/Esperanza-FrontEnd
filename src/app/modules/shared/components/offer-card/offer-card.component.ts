import { Component, Input, LOCALE_ID, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }]
})
export class OfferCardComponent implements OnInit {

  @Input() promotion?: any;
  @Input() withExpirationDate: boolean = false;
  hasImg = true;
  
  constructor() { }

  ngOnInit(): void {
  }
  goToOffer(promotion: any){
  }
  getImgName(promotion: any): string{
    let name: string = promotion?.Codigo;;
    return name + '.jpeg';
  }
  getPriceNumber(price: string){
    if (price){
      price = price.replace(',', '.');
      return  Number(price);;
    }
    else return 0;
  }
  updateUrl(event: any){
    this.hasImg = false;
  }
}
