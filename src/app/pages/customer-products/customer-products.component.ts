import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductFieldTypeEnum } from 'src/app/core/enums/product-field-type.enum';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { EventService } from 'src/app/modules/shared/services/event.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';

@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }]
})
export class CustomerProductsComponent implements OnInit, OnDestroy {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkResolution();
  }
  search: string;
  condition: string;
  lastSearch?: string;
  searchSub: Subscription;
  searchTypeSub: Subscription;
  isUserLogged: boolean = false;
  products: any[] = [];
  filters: any;
  collapsed = false;
  totalRows: number = 0;
  isFiltered = false;
  mobile = false;
  angleDown = true;
  filter: any = {};
  pageActive: number = 1;
  productFieldTypes = ProductFieldTypeEnum;
  errorImages: boolean[] = [];

  marcas: string[] = [];
  proveedores: string[] = [];
  subrubros: string[] = [];
  condiciones: string[] = [];

  showMoreMarcas = false;
  showMoreProveedores = false;
  showMoreSubrubros = false;
  breadcrumbs: Breadcrumb[]= [];

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private productService: ProductService,
    private currencyPipe: CurrencyPipe,
    public routing: RoutingService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    
  ) {
    this.isUserLogged = authService.activeUser();
    this.search = this.route.snapshot.params['search'];
    this.condition = this.route.snapshot.params['condition'];
    this.checkResolution();
    this. searchSub = this.eventService.onSearchProduct.subscribe(val => {
      this.search = val;
      this.searching();
    });
    this. searchTypeSub = this.eventService.onSearchOtherTypeProduct.subscribe(val => {
      this.condiciones = [];
      if (val == '0'){
        this.condiciones.push('CCM');
        this.condiciones.push('CCB');
      }
      else this.condiciones.push(val);
      this.search = '0';
      this.searching();
    });

    if (this.condition == '0'){
      this.condiciones.push('CCM');
      this.condiciones.push('CCB');
    }
    else this.condiciones.push(this.condition);
    this.insertBreadcrumb();
  }
  
  ngOnDestroy(): void {
    if (this.searchSub) this.searchSub.unsubscribe();
    if (this.searchTypeSub) this.searchTypeSub.unsubscribe();
  }
  ngOnInit(): void {
    this.filter.condiciones = this.condiciones;
    this.initFilters();
    this.searching();
  }
  cleanFilter(){
    this.filter.marcas = [];
    this.filter.proveedores = [];
    this.filter.subrubros = [];
    this.ngOnInit();
  }
  getProductsByFilter(restartPagination: boolean = false){
    this.spinner.show();
    this.productService.getAllByFilter(this.filter).subscribe(res => {
      if (res){
        this.errorImages = [];
        this.products = res.products!;
        this.totalRows = res.rows;
        this.filters = res.valuesToFilter;
        if (restartPagination) this.eventService.onNewSearchProduct.emit({rows: res.rows});
        this.lastSearch = this.search;
        res.products.map((item: any) => {
          this.errorImages.push(false);
        });
      }
      this.spinner.hide();
    }, err => {
      console.log(err);
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  searching(){
    if (this.search == '0') this.filter.search = '';
    else this.filter.search = this.search;
    if (this.lastSearch != this.search){
      this.filter.start = 0;
    }
    this.getProductsByFilter();
  }
  reSearchItemsPagination(event: any){
    this.filter.start = event[0];
    this.getProductsByFilter();
  }
  initFilters(){
    this.filter.start = 0;
    this.filter.withSemaphore = true;
  }
  getPrice(price: string){
    if (price){
      price = price.replace(',', '.');
      let money = Number(price);
      let moneyConverted = this.currencyPipe.transform(money, 'ARS');
      return moneyConverted;
    }
    else return '0';
  }
  getPriceNumber(price: string){
    if (price){
      price = price.replace(',', '.');
      return  Number(price);;
    }
    else return 0;
  }
  goToProduct(code: string){
    this.routing.goToProductDescription(code);
  }
  formatText(text: string){
    text = text.trimEnd();
    return text.length > 18 ? text.slice(0, 18) + '...' : text;
  }
  updateCategories(val: string, type: ProductFieldTypeEnum){
    let index = 0;
    switch(type){
      case ProductFieldTypeEnum.Marca:
        index = this.marcas.indexOf(val);
        if (index == -1)this.marcas.push(val);
        else this.marcas.splice(index, 1);
      break;
      case ProductFieldTypeEnum.Proveedor:
        index = this.proveedores.indexOf(val);
        if (index == -1)this.proveedores.push(val);
        else this.proveedores.splice(index, 1);
      break;
      case ProductFieldTypeEnum.Subrubro:
        index = this.subrubros.indexOf(val);
        if (index == -1)this.subrubros.push(val);
        else this.subrubros.splice(index, 1);
      break;
    }
    this.reSearch();
  }
  reSearch(){
    this.filter.start = 0;
    this.filter.marcas = this.marcas;
    this.filter.proveedores = this.proveedores;
    this.filter.subrubros = this.subrubros;
    this.getProductsByFilter(true);
  }
  isSelected(val: string, type: ProductFieldTypeEnum){
    switch(type){
      case ProductFieldTypeEnum.Marca:
        return this.marcas.includes(val);
      case ProductFieldTypeEnum.Proveedor:
        return this.proveedores.includes(val);
      default:
        return this.proveedores.includes(val);
      case ProductFieldTypeEnum.Subrubro:
        return this.subrubros.includes(val);
    }
  }
  updateUrl(index: number){
    this.errorImages[index] = true;
  }
  insertBreadcrumb(){
    this.localStorageService.setBreadcrumbs(new Breadcrumb('Listado de productos', `customer-products/0/0`));
    this.breadcrumbs = this.localStorageService.getBreadcrumbs();
    this.eventService.onShowBreadcrumbs.emit(this.breadcrumbs);
  }
  checkResolution(){
    if(window.innerWidth < 821) this.mobile = true;
    else this.mobile = false;
  }
  showCleanFilter(){
    return this.filter?.marcas?.length > 0 || this.filter?.proveedores?.length > 0 || this.filter?.subrubros?.length > 0;
  }
}
