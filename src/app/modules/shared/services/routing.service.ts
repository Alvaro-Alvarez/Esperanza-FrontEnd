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

 
  goToVideosAdmin(){
    this.router.navigate(['/video-admin']);
  }
  goToLabs(){
    this.router.navigate(['/laboratory-admin']);
  }
  goToCarousels(){
    this.router.navigate(['/carousel-admin']);
  }
  goToAddEditVideo(id: string){
    this.router.navigate([`/add-edit-video/${id}`]);
  }
  goToAddEditCarousel(id: string){
    this.router.navigate([`/add-edit-carousel/${id}`]);
  }
  goToAddEditLab(id: string){
    this.router.navigate([`/add-edit-laboratory/${id}`]);
  }
  goToVideos(){
    this.router.navigate(['/videos']);
  }
  goToLaboratories(){
    this.router.navigate(['/laboratories']);
  }
  goToProductLaboratory(lab: string){
    this.router.navigate([`/product-laboratory/${lab}`]);
  }
  goToDocumentsCtacte(){
    this.router.navigate(['/documents-ctacte']);
  }
  goToBestSellers(){
    this.router.navigate(['/best-sellers']);
  }
  goToOffers(){
    this.router.navigate(['/offers']);
  }
  goToOfferDescription(condition: string, code: string){
    this.router.navigate([`/offer-description/${condition}/${code}`]);
  }
  goToExpiringOffers(){
    this.router.navigate(['/expiring-offers']);
  }
  goToVademecums(){
    this.router.navigate(['/vademecums']);
  }
}

