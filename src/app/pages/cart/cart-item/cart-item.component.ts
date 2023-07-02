import { Component, LOCALE_ID, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }]
})
export class CartItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
