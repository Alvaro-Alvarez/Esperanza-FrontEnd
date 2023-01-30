import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';
import { RoutingService } from '../../services/routing.service';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { LocalStorageService } from '../../services/local-storage.service';

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

  constructor(
    public nav :RoutingService,
    config: NgbDropdownConfig,
    private eventService: EventService,
    private authService: AuthService,
    private alert: SweetAlertService,
    private localStorageService: LocalStorageService
  ) {
    this.role = this.authService.getRole();
		config.autoClose = true;
    this.activeUser = this.authService.activeUser();
    this. loginSub = this.eventService.onLogIn.subscribe(val => {
      this.activeUser = this.authService.activeUser();
      this.role = this.authService.getRole();
    });
  }
  ngOnDestroy(): void {
    if (this.loginSub) this.loginSub.unsubscribe();
  }

  ngOnInit(): void {
  }
  goToVademecum(){
    console.log("Vademecum");
  }
  search(){
    const input = document.getElementById("product-search")!;
    const searchVal = input as any;
    const searchlbl = searchVal?.value ? searchVal?.value : '0';
    const condition = this.localStorageService.getConditionToRouting();
    this.nav.goCustomerToProducs(searchlbl, condition!);
    this.eventService.onSearchProduct.emit(searchlbl);
  }
  askAction(){
    this.alert.warning('Cerrar Sesión', 'Estas por cerrar la sesión, estás de acuerdo?', ()=>{this.logout()})
  }
  logout(){
    this.authService.logout();
    this.localStorageService.removeBasClient();
    this.activeUser = this.authService.activeUser();
    this.eventService.onLogOut.emit(true);
    this.nav.goToLogin();
  }
}
