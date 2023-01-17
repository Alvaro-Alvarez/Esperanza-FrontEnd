import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: any[] = [
    {path: 'assets/images/pruebas/prueba1.png'},
    {path: 'assets/images/pruebas/prueba2.png'},
    {path: 'assets/images/pruebas/prueba3.png'},
    {path: 'assets/images/pruebas/prueba4.png'},
    {path: 'assets/images/pruebas/prueba5.png'}
  ]

  constructor(
    private routing: RoutingService
  ) { }

  ngOnInit(): void {
  }
  goToRelatedProducts(){
    // this.routing.
  }
  goToProduct(){
    console.log("Producto");
  }
}
