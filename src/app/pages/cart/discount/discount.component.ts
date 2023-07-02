import { Component, Input, OnInit } from '@angular/core';
import { ProductBonification } from 'src/app/core/models/cart';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  @Input() bonifications?: ProductBonification[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
