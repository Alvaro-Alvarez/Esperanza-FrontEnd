import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  @Input() bonifications: any;

  constructor() { }

  ngOnInit(): void {
  }
}
