import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { RoutingService } from '../shared/services/routing.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private routingService: RoutingService,
    private authService: AuthService
) { }

canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.getToken() != null){
      const role = this.authService.getRole();
      if (next.data['roles'] && next.data['roles'].indexOf(role) === -1) {
        this.routingService.goToHome();
        return false;
      }
      return true;
    }
    else {
      this.routingService.goToHome();
      return false;
    }
  }
}
