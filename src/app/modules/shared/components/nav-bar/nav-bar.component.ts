import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RoutingService } from '../../services/routing.service';
import { RoleEnum } from '../../../../core/helpers/role-helper';
import { EventService } from '../../services/event.service';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { ShoppingService } from '../../services/shopping.service';
import { SpinnerService } from '../../services/spinner.service';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { UserService } from '../../services/user.service';
import { Cart } from 'src/app/core/models/cart';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs';

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
  canCcb = false;
  canCcm = false;
  sub: Subscription;
  subLogout: Subscription;
  cartActionSub: Subscription;
  clientBas: any;
  user: any;
  itemsCount = 0;
  breadcrumbs: Breadcrumb[]= [];
  
  constructor(
    public routingService: RoutingService,
    private authService: AuthService,
    private eventService: EventService,
    private localStorageService: LocalStorageService,
    private cartService: ShoppingService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private userService: UserService
  ) {
    this.canCcb = this.localStorageService.canCcb();
    this.canCcm = this.localStorageService.canCcm();
    if (!this.canCcb || !this.canCcm){
      this.canCcb = false;
      this.canCcm = false;
    }
    this.sub = this.eventService.onLogIn.subscribe(res => {
      this.init();
    });
    this.subLogout = this.eventService.onLogOut.subscribe(res => {
      this.init();
    });
    this.cartActionSub = this.eventService.onShoppingCartAction.subscribe(val => {
      this.reCountCartItems();
    });
  }
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
    if (this.subLogout) this.subLogout.unsubscribe();
    if (this.cartActionSub) this.cartActionSub.unsubscribe();
  }
  ngOnInit(): void {
    this.init();
    this.reCountCartItems();
  }
  logout(){
    this.authService.logout();
    this.eventService.onLogOut.emit();
    this.routingService.goToHome();
    this.init();
  }
  init(){
    this.userActive = this.authService.getToken() ? true: false;
    this.isUserAdmin = this.authService.getRole() === RoleEnum.admin;
    this.canCcb = this.localStorageService.canCcb();
    this.canCcm = this.localStorageService.canCcm();
    if (!this.canCcb || !this.canCcm){
      this.canCcb = false;
      this.canCcm = false;
    }
    if (this.isUserAdmin) this.getUser();
    else this.fillUserLogged();
  }
  goToShoppingCart(){
    this.routingService.goToCart();
  }
  fillUserLogged(){
    const clientBas = this.localStorageService.getBasClient();
    if (clientBas) this.clientBas = JSON.parse(clientBas);
    else this.clientBas = null;
  }
  goToAllProducts(){
    const condition = this.localStorageService.getConditionToRouting();
    this.eventService.onSearchOtherTypeProduct.emit('0');
    this.routingService.goCustomerToProducs('0', condition!);
  }
  goToAllProductsCcb(){
    this.eventService.onSearchOtherTypeProduct.emit('CCB');
    this.routingService.goCustomerToProducs('0', 'CCB');
  }
  goToAllProductsCcm(){
    this.eventService.onSearchOtherTypeProduct.emit('CCM');
    this.routingService.goCustomerToProducs('0', 'CCM');
  }
  reCountCartItems(){
    let count = 0;
    const cart: Cart = this.cartService.getCartLocalStorage();
    cart.packages.map(cartPackage => {
      count = count + cartPackage.products.length;
    });
    count = count + cart.offers.length;
    this.itemsCount = count;
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
}
