import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';
import { RoutingService } from '../../services/routing.service';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { RoleEnum } from 'src/app/core/helpers/role-helper';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit, OnDestroy {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkResolution();
  }
  
  @Input() tabletResolution: boolean = false;
  loginSub: Subscription;
  logoutSub: Subscription;
  activeUser = false;
  isUserAdmin = false;
  role!: string;
  isCollapsed = false;
  menues: any[] = [];

  constructor(
    public nav :RoutingService,
    config: NgbDropdownConfig,
    private eventService: EventService,
    private authService: AuthService,
    private alert: SweetAlertService,
    private localStorageService: LocalStorageService,
    private shoppingService: ShoppingService
  ) {
    this.checkResolution();
    this.role = this.authService.getRole();
    this.isUserAdmin = this.role === RoleEnum.admin;
		config.autoClose = true;
    this.activeUser = this.authService.activeUser();
    this. loginSub = this.eventService.onLogIn.subscribe(val => {
      this.activeUser = this.authService.activeUser();
      this.role = this.authService.getRole();
      this.isUserAdmin = this.role === RoleEnum.admin;
      this.loadMenues();
    });
    this. logoutSub = this.eventService.onLogOut.subscribe(val => {
      this.isUserAdmin = false;
      this.activeUser = this.authService.activeUser();
      this.loadMenues();
    });
  }
  ngOnDestroy(): void {
    if (this.loginSub) this.loginSub.unsubscribe();
    if (this.logoutSub) this.logoutSub.unsubscribe();
  }
  ngOnInit(): void {
    this.loadMenues();
  }
  goToVademecum(){
    this.nav.goToVademecums();
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
    this.eventService.onShoppingCartAction.emit();
    this.shoppingService.removeShoppingBag();
    this.nav.goToLogin();
  }
  loadMenues(){
    this.menues = [];
    this.menues.push({title: 'Quiénes somos', route: 'about-us', show: true});
    this.menues.push( {title: 'Ensayos y Servicios', route: 'essays-and-services', show: true});
    this.menues.push( {title: 'Abrir cuenta con Esperanza', route: 'register', show: !this.activeUser});
    this.menues.push( {title: 'Contacto', route: 'contact', show: true});
    this.menues.push( {title: 'Blog', route: '', show: false});
  }
  checkResolution(){
    if(window.innerWidth < 769) this.tabletResolution = true;
    else this.tabletResolution = false;
  }
  goToMenu(route: string){
    this.nav.goToMenu(route);
  }
}
