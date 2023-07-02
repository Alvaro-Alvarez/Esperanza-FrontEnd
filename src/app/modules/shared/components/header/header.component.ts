import { Component, Input, OnInit, OnDestroy, HostListener, AfterViewInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';
import { RoutingService } from '../../services/routing.service';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { RoleEnum } from 'src/app/core/helpers/role-helper';
import { ShoppingService } from '../../services/shopping.service';
import { Cart } from 'src/app/core/models/cart';
import { UserService } from '../../services/user.service';
import { SpinnerService } from '../../services/spinner.service';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkResolution();
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (window.pageYOffset >= this.stickyOffSet) this.addStickyClass = true;
    else this.addStickyClass = false;
  }
  
  @Input() tabletResolution: boolean = false;
  loginSub: Subscription;
  logoutSub: Subscription;
  activeUser = false;
  isUserAdmin = false;
  role!: string;
  isCollapsed = false;
  menues: any[] = [];
  itemsCount = 0;
  cartActionSub: Subscription;
  breadcrumbsSub: Subscription;
  user: any;
  clientBas: any;
  angleDown = true;
  userActive = false;
  addStickyClass = false;
  stickyOffSet = 0;
  navHeight = 0;
  breadcrumbs: Breadcrumb[]= [];
  isCollapsedSearch = true;

  constructor(
    public nav :RoutingService,
    config: NgbDropdownConfig,
    private eventService: EventService,
    private authService: AuthService,
    private alert: SweetAlertService,
    private localStorageService: LocalStorageService,
    private shoppingService: ShoppingService,
    private userService: UserService,
    private spinner: SpinnerService,
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
    this.cartActionSub = this.eventService.onShoppingCartAction.subscribe(val => {
      this.reCountCartItems();
    });
    this.breadcrumbsSub = this.eventService.onShowBreadcrumbs.subscribe(val => {
      this.breadcrumbs = val;
    });
    this. logoutSub = this.eventService.onLogOut.subscribe(val => {
      this.isUserAdmin = false;
      this.activeUser = this.authService.activeUser();
      this.loadMenues();
    });
  }
  ngAfterViewInit(): void {
    let navbar = document.getElementById("header-mobile");
    this.navHeight = navbar?.offsetHeight!;
    this.stickyOffSet = navbar?.offsetTop!;
  }
  ngOnDestroy(): void {
    if (this.loginSub) this.loginSub.unsubscribe();
    if (this.logoutSub) this.logoutSub.unsubscribe();
    if (this.cartActionSub) this.cartActionSub.unsubscribe();
    if (this.breadcrumbsSub) this.breadcrumbsSub.unsubscribe();
  }
  ngOnInit(): void {
    this.loadMenues();
    this.reCountCartItems();
    this.userActive = this.authService.getToken() ? true: false;
    if (this.isUserAdmin) this.getUser();
    else this.fillUserLogged();
  }
  goToVademecum(){
    this.nav.goToVademecums();
  }
  search(){
    const input: any = document.getElementById("product-search")!;
    const searchVal = input as any;
    const searchlbl = searchVal?.value ? searchVal?.value : '0';
    const condition = this.localStorageService.getConditionToRouting();
    this.nav.goCustomerToProducs(searchlbl, condition!);
    input.value = '';
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
    this.shoppingService.removeCartToLocalStorage();
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
  goToShoppingCart(){
    this.nav.goToCart();
  }
  reCountCartItems(){
    let count = 0;
    const cart: Cart = this.shoppingService.getCartLocalStorage();
    cart.packages.map(cartPackage => {
      count = count + cartPackage.products.length;
    });
    count = count + cart.offers.length;
    this.itemsCount = count;
  }
  fillUserLogged(){
    const clientBas = this.localStorageService.getBasClient();
    if (clientBas) this.clientBas = JSON.parse(clientBas);
    else this.clientBas = null;
  }
  getUser(){
    this.spinner.show();
    const userId = this.authService.getUserId();
    this.userService.GetByGuid(userId).subscribe(res => {
      this.spinner.hide();
      this.user = res;
    }, err => {
      this.spinner.hide();
      console.log(err);
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  goToAllProducts(){
    const condition = this.localStorageService.getConditionToRouting();
    this.eventService.onSearchOtherTypeProduct.emit('0');
    this.nav.goCustomerToProducs('0', condition!);
  }
  goToAllProductsCcb(){
    this.eventService.onSearchOtherTypeProduct.emit('CCB');
    this.nav.goCustomerToProducs('0', 'CCB');
  }
  goToAllProductsCcm(){
    this.eventService.onSearchOtherTypeProduct.emit('CCM');
    this.nav.goCustomerToProducs('0', 'CCM');
  }
  scroll(event: any) {
    const element = document.getElementById(event);
    const y = (element!.getBoundingClientRect().top + window.pageYOffset) - this.navHeight;
    window.scrollTo({top: y, behavior: 'smooth'});
  }
}
