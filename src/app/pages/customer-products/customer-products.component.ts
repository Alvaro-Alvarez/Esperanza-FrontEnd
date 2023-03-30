import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductFieldTypeEnum } from 'src/app/core/enums/product-field-type.enum';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { EventService } from 'src/app/modules/shared/services/event.service';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';

@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.scss']
})
export class CustomerProductsComponent implements OnInit, OnDestroy {

  search: string;
  condition: string;
  lastSearch?: string;
  searchSub: Subscription;
  isUserLogged: boolean = false;
  products: any[] = [];
  filters: any;
  collapsed = false;
  totalRows: number = 0;
  isFiltered = false;
  filter: any = {};
  pageActive: number = 1;
  productFieldTypes = ProductFieldTypeEnum;

  marcas: string[] = [];
  proveedores: string[] = [];
  subrubros: string[] = [];
  vademecums: string[] = [];
  tipos: string[] = [];
  laboratorios: string[] = [];
  categorias: string[] = [];
  drogas: string[] = [];
  acciones: string[] = [];
  especies: string[] = [];
  viaAdministraciones: string[] = [];
  condiciones: string[] = [];

  showMoreMarcas = false;
  showMoreProveedores = false;
  showMoreSubrubros = false;
  showMoreVademecums = false;
  showMoreTipos = false;
  showMoreLaboratorios = false;
  showMoreCategorias = false;
  showMoreDrogas = false;
  showMoreEspecies = false;
  showMoreViaAdministraciones = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private productService: ProductService,
    private currencyPipe: CurrencyPipe,
    public routing: RoutingService,
    private authService: AuthService
  ) {
    this.isUserLogged = authService.activeUser();
    this.search = this.route.snapshot.params['search'];
    this.condition = this.route.snapshot.params['condition'];
    this. searchSub = this.eventService.onSearchProduct.subscribe(val => {
      this.search = val;
      this.searching();
    });
    if (this.condition == '0'){
      this.condiciones.push('CCM');
      this.condiciones.push('CCB');
    }
    else this.condiciones.push(this.condition);
  }
  
  ngOnDestroy(): void {
    if (this.searchSub) this.searchSub.unsubscribe();
  }
  ngOnInit(): void {
    this.filter.condiciones = this.condiciones;
    this.initFilters();
    this.searching();
  }
  getProductsByFilter(restartPagination: boolean = false){
    this.spinner.show();
    console.log(this.filter.start);
    debugger
    this.productService.getAllByFilter(this.filter).subscribe(res => {
      if (res){
        // console.log("Productos ->: ", res);
        this.products = res.products!;
        this.totalRows = res.rows;
        this.filters = res.valuesToFilter;
        if (restartPagination) this.eventService.onNewSearchProduct.emit({rows: res.rows});
        this.lastSearch = this.search;
      }
      this.spinner.hide();
    }, err => {
      console.log(err);
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar obtener los productos');
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
  // cleanFilters(){
  //   this.filter = {};
  //   this.filter.start = 0;
  //   this.filter.withSemaphore = true;
  // }
  getPrice(price: string){
    if (price){
      price = price.replace(',', '.');
      let money = Number(price);
      let moneyConverted = this.currencyPipe.transform(money, '$');
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
      case ProductFieldTypeEnum.Vademecum:
        index = this.vademecums.indexOf(val);
        if (index == -1)this.vademecums.push(val);
        else this.vademecums.splice(index, 1);
      break;
      case ProductFieldTypeEnum.Tipo:
        index = this.tipos.indexOf(val);
        if (index == -1)this.tipos.push(val);
        else this.tipos.splice(index, 1);
      break;
      case ProductFieldTypeEnum.Laboratorio:
        index = this.laboratorios.indexOf(val);
        if (index == -1)this.laboratorios.push(val);
        else this.laboratorios.splice(index, 1);
      break;
      case ProductFieldTypeEnum.Categoria:
        index = this.categorias.indexOf(val);
        if (index == -1)this.categorias.push(val);
        else this.categorias.splice(index, 1);
      break;
      case ProductFieldTypeEnum.Droga:
        index = this.drogas.indexOf(val);
        if (index == -1)this.drogas.push(val);
        else this.drogas.splice(index, 1);
      break;
      case ProductFieldTypeEnum.Accion:
        index = this.acciones.indexOf(val);
        if (index == -1)this.acciones.push(val);
        else this.acciones.splice(index, 1);
      break;
      case ProductFieldTypeEnum.Especie:
        index = this.especies.indexOf(val);
        if (index == -1)this.especies.push(val);
        else this.especies.splice(index, 1);
      break;
      case ProductFieldTypeEnum.ViaAdministracion:
        index = this.viaAdministraciones.indexOf(val);
        if (index == -1)this.viaAdministraciones.push(val);
        else this.viaAdministraciones.splice(index, 1);
      break;
    }
    this.reSearch();
  }
  reSearch(){
    this.filter.start = 0;
    this.filter.marcas = this.marcas;
    this.filter.proveedores = this.proveedores;
    this.filter.subrubros = this.subrubros;
    this.filter.vademecums = this.vademecums;
    this.filter.tipos = this.tipos;
    this.filter.laboratorios = this.laboratorios;
    this.filter.categorias = this.categorias;
    this.filter.drogas = this.drogas;
    this.filter.acciones = this.acciones;
    this.filter.especies = this.especies;
    this.filter.viaAdministraciones = this.viaAdministraciones;
    this.getProductsByFilter(true);
  }
  isSelected(val: string, type: ProductFieldTypeEnum){
    switch(type){
      case ProductFieldTypeEnum.Marca:
        return this.marcas.includes(val);
      case ProductFieldTypeEnum.Proveedor:
        return this.proveedores.includes(val);
      case ProductFieldTypeEnum.Subrubro:
        return this.subrubros.includes(val);
      case ProductFieldTypeEnum.Vademecum:
        return this.vademecums.includes(val);
      case ProductFieldTypeEnum.Tipo:
        return this.tipos.includes(val);
      case ProductFieldTypeEnum.Laboratorio:
        return this.laboratorios.includes(val);
      case ProductFieldTypeEnum.Categoria:
        return this.categorias.includes(val);
      case ProductFieldTypeEnum.Droga:
        return this.drogas.includes(val);
      case ProductFieldTypeEnum.Accion:
        return this.acciones.includes(val);
      case ProductFieldTypeEnum.Especie:
        return this.especies.includes(val);
      case ProductFieldTypeEnum.ViaAdministracion:
        return this.viaAdministraciones.includes(val);
    }
  }
}
