import { Component, Input, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() product: any;
  
  constructor(
    public nav :RoutingService
  ) { }

  ngOnInit(): void {
  }
  addToCart(){

  }
  goToProduct(){
    this.nav.goToProduct('1');
  }
}
