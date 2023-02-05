import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { ProductFilter } from 'src/app/core/models/product-filter';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { RoleEnum } from 'src/app/core/helpers/role-helper';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalRows?: number = 0;
  filterForm!: FormGroup;
  updatingFilters = false;
  isUserAdmin = false;
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private formSerivce: FormService,
    public routing: RoutingService,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {
    this.isUserAdmin = this.authService.getRole() === RoleEnum.admin;
    this.filterForm = this.formSerivce.getFormProductFilter();
  }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.spinner.show();
    const filter: ProductFilter = this.filterForm.value;
    filter.start = 0;
    this.productService.getAllByFilter(filter).subscribe(res => {
      this.spinner.hide();
      this.products = res.products.length > 5 ? res.products.slice(0, 5) : res.products;
      this.totalRows = res.rows;
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.alert.error('Ocurrió un error al tratar obtener los productos');
    });
  }
  updatingFilter(value: boolean){
    this.updatingFilters = value;
  }
  goToAllOffers(){
    const condition = this.localStorageService.getConditionToRouting();
    this.routing.goCustomerToProducs('0', condition!);
  }
  goToMoreSeelers(){
    console.log("Más vendidos");
  }
  goToLaboratories(){
    console.log("Laboratorios");
  }
  goToLaboratory(){
    console.log("Laboratorio");
  }
  goToProduct(code: string){
    this.routing.goToProductDescription(code);
  }
  goToVideos(){
    console.log("Videos");
  }
}
