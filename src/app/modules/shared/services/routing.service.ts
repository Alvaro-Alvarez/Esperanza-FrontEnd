import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(
    private router: Router
  ) { }

  goToHome(){
    this.router.navigate(['/home']);
  }
  goToProduct(id: string){
    this.router.navigate([`/product/${id}`]);
  }
  goToCart(){
    this.router.navigate(['/cart']);
  }
  goToAccount(){
    this.router.navigate(['/account']);
  }
  goToUsers(){
    this.router.navigate(['/users']);
  }
  goToProducts(){
    this.router.navigate(['/products']);
  }
  goToMyOrders(){
    this.router.navigate(['/my-orders']);
  }
  goToOrdersPlaced(){
    this.router.navigate(['/orders-placed']);
  }
  goToAddEditUser(id: string){
    this.router.navigate([`/users/${id}`]);
  }
  goToAddEditProduct(id: string){
    this.router.navigate([`/products/${id}`]);
  }
}
