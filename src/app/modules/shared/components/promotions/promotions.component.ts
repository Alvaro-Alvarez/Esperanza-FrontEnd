import { Component, Input, OnInit } from '@angular/core';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {

  @Input() mobile?: boolean = false;
  @Input() inline?: boolean = false;
  
  constructor(private routing: RoutingService) { }

  ngOnInit(): void {
  }
  goToOffer(){
    this.routing.goToOffers();
  }
  goToMoreSells(){
    this.routing.goToBestSellers();
  }
  goToExpiringOffers(){
    this.routing.goToExpiringOffers();
  }
  goToLaboratories(){
    this.routing.goToLaboratories();
  }
  goToVideos(){
    this.routing.goToVideos();
  }
}
