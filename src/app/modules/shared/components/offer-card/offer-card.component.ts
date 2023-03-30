import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent implements OnInit {

  @Input() promotion?: any;
  // haveImage: boolean[] = [];
  hasImg = true;
  
  constructor() { }

  ngOnInit(): void {
  }
  goToOffer(promotion: any){
  }
  // getImgName(promotion: any): string{
  //   let name: string = promotion?.Codigo;;
  //   return name + '.jpeg';
  // }
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
