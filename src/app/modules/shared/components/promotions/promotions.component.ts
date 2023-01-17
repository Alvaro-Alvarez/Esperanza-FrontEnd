import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {

  constructor() { }

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
    console.log("Laboratorios");
  }
  goToIncreases(){
    console.log("Aumentos");
  }
  goToVideos(){
    console.log("Videos promocionales");
  }
}
