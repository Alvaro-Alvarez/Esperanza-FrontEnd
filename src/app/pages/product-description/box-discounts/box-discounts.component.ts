import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit, LOCALE_ID  } from '@angular/core';

@Component({
  selector: 'app-box-discounts',
  templateUrl: './box-discounts.component.html',
  styleUrls: ['./box-discounts.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }]
})
export class BoxDiscountsComponent implements OnInit {

  @Input() product: any;
  @Input() productBas: any;
  @Input() price: string = '';
  @Input() isUserLogged: boolean = false;
  bonifications: any[] = [];

  constructor(private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.bonifications.push(...this.productBas?.Bonificaciones);
    if(!this.isUserLogged){
      const one = this.bonifications.find(b => b.CantidadDesde === 1);
      if (one){
        const index = this.bonifications.indexOf(one);
        this.bonifications.splice(index,1);
      }
    }
  }
  getPriceIva(bonif: any){
    if (this.price){
      this.price = this.price.replace(',', '.');
      const bonificaiton = bonif.CantidadDesde > 1 ? bonif.Porcentaje : 0;
      const money = Number(this.price);
      const moneyWithDiscount = money - (money * (bonificaiton/100));
      const moneyConverted = this.currencyPipe.transform(moneyWithDiscount, 'ARS');
      return moneyConverted;
    }
    else return '0';
  }
  getDiscount(bonif: any){
    if (this.product?.preciO_BASE){
      let newPrice = this.product?.preciO_BASE.replace(',', '.');
      const money = Number(newPrice);
      const onlyDiscount = money * (bonif.Porcentaje/100);
      const moneyConverted = this.currencyPipe.transform(onlyDiscount, 'ARS');
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
