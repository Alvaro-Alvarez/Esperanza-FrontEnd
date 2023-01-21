import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {

  isFav: boolean = false;
  //debe ser un input()
  product = {
    nameMark: "Bravecto",
    nameProduct: "Antipulgas y Garrapatas",
    originalPrice: 625,
    priceWithEsperanza: 580,
    productQuantity: 1,
  }

  constructor() { }

  ngOnInit(): void {
  }

  markFavorite(isMarked: boolean){
    this.isFav = isMarked;
  }

  buyNow(){
    console.log("buyNow");
  }

  addToCart(){
    console.log("addToCart");
  }

}
