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
}
