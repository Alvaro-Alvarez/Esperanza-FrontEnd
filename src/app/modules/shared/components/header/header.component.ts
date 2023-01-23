import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';
import { MasterDataService } from '../../services/master-data.service';
import { RoutingService } from '../../services/routing.service';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() tabletResolution: boolean = false;
  loginSub: Subscription;
  activeUser = false;
  role!: string;
  // menuClicked = false;

  constructor(
    public nav :RoutingService,
    config: NgbDropdownConfig,
    private masterDataService: MasterDataService,
    private eventService: EventService,
    private authService: AuthService,
    private alert: SweetAlertService,
  ) {
    this.role = this.authService.getRole();
		config.autoClose = true;
    // this.checkResolution();
    this.activeUser = this.authService.activeUser();
    this. loginSub = this.eventService.onLogIn.subscribe(val => {
      this.activeUser = this.authService.activeUser();
      this.role = this.authService.getRole();
      // this.getUser();
    });
  }
  ngOnDestroy(): void {
    if (this.loginSub) this.loginSub.unsubscribe();
  }

  ngOnInit(): void {
  }
  goToVademecum(){
    this.masterDataService.getSexs().subscribe(res => {

    });
    console.log("Vademecum");
  }
  goToNotifications(){
    console.log("Notificaciones");
  }
  goToUser(){
    console.log("Usuario");
  }
  search(){
    console.log("Busqueda");
  }
  goToHome(){
    this.nav.goToHome();
  }
  askAction(){
    this.alert.warning('Cerrar Sesión', 'Estas por cerrar la sesión, estás de acuerdo?', ()=>{this.logout()})
  }
  logout(){
    this.authService.logout();
    this.activeUser = this.authService.activeUser();
    this.eventService.onLogOut.emit(true);
    this.nav.goToLogin();
  }
}
