import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RoutingService } from '../../services/routing.service';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { RoleEnum } from '../../../../core/helpers/role-helper';
import { EventService } from '../../services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  @Input() tabletResolution: boolean = false;
  public isMenuCollapsed = true;
  userActive = false;
  isUserAdmin = false;
  sub: Subscription;
  
  constructor(
    public routingService: RoutingService,
    private authService: AuthService,
    private alert: SweetAlertService,
    private eventService: EventService
  ) {
    this.sub = this.eventService.onLogIn.subscribe(res => {
      this.init();
    })
  }
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.init();
  }
  logout(){
    this.authService.logout();
    // this.alert.successful('Exito!', 'Sesion cerrada', ()=>{this.routingService.goToHome()})
    this.eventService.onLogOut.emit();
    this.routingService.goToHome();
    this.init();
  }
  init(){
    this.userActive = this.authService.getToken() ? true: false;
    this.isUserAdmin = this.authService.getRole() === RoleEnum.admin;
  }
  goToShoppingCart(){
    this.routingService.goToCart();
  }
}
