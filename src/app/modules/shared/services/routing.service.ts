import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(
    private router: Router
  ) { }

  goToLogin(){
    this.router.navigate(['/login']);
  }
  goToRegister(){
    this.router.navigate(['/register']);
  }
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
  goToRoles(){
    this.router.navigate(['/roles']);
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
  goToAddEditRole(id: string){
    this.router.navigate([`/roles/${id}`]);
  }
  goToProductDescription(code: string){
    this.router.navigate([`/product-description/${code}`]);
  }
  goCustomerToProducs(search: string, condition: string){
    this.router.navigate([`/customer-products/${search}/${condition}`]);
  }
}
