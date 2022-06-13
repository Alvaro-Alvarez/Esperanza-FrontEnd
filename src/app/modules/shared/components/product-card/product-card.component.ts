import { Component, Input, OnInit } from '@angular/core';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: any;
  
  constructor(
    public nav :RoutingService
  ) { }

  ngOnInit(): void {
  }
  addToCart(){

  }
  goToProduct(){
    // const id = this.product.id;
    this.nav.goToProduct('1');
  }

}
