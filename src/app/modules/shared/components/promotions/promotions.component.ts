import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {

  constructor(public routing: RoutingService) { }

  ngOnInit(): void {
  }
  goToOffer(){
    console.log("Ofertas");
  }
  goToMoreSells(){
    console.log("Más vendidos");
  }
  goToExpiringOffers(){
    console.log("Ofertas por vencer");
  }
  goToLaboratories(){
    this.routing.goToLaboratories();
  }
  goToIncreases(){
    console.log("Aumentos");
  }
  goToVideos(){
    this.routing.goToVideos();
  }
}
