import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  @Input() bonifications: any;
  // @Input() price: string = '';

  constructor(private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
  }
  // getPriceIva(discount: number){
  //   if (this.price){
  //     this.price = this.price.replace(',', '.');
  //     const money = Number(this.price);
  //     const moneyWithDiscount = money - (money * (discount/100));
  //     // const iva = this.productBas.TasaIva;
  //     // const priceWhithIva = moneyWithDiscount + (moneyWithDiscount * (iva/100));
  //     // const moneyConverted = this.currencyPipe.transform(priceWhithIva, '$');
  //     const moneyConverted = this.currencyPipe.transform(moneyWithDiscount, '$');
  //     return moneyConverted;
  //   }
  //   else return '0';
  // }
  // getDiscount(discount: number){
  //   if (this.price){
  //     this.price = this.price.replace(',', '.');
  //     const money = Number(this.price);
  //     const onlyDiscount = money * (discount/100);
  //     const moneyConverted = this.currencyPipe.transform(onlyDiscount, '$');
  //     return moneyConverted;
  //   }
  //   else return '0';
  // }
}
