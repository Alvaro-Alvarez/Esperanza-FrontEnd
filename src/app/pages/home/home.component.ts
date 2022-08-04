import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { ProductFilter } from 'src/app/core/models/product-filter';
import { Product } from 'src/app/core/models/product';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/modules/shared/services/form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products?: Product[] = [];
  totalRows?: number = 0;
  filterForm!: FormGroup;
  updatingFilters = false;

  constructor(
    private productService: ProductService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private formSerivce: FormService,
  ) { 
    this.filterForm = this.formSerivce.getFormProductFilter();
  }

  ngOnInit(): void {
    // this.initFilters();
  }
  getProducts(){
    this.spinner.show();
    const filter: ProductFilter = this.filterForm.value;
    this.productService.getAllByFilter(filter).subscribe(res => {
      this.spinner.hide();
      debugger
      this.products = res.products;
      this.totalRows = res.rows;
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar obtener los productos');
    });
  }
  initFilters(){
    this.updatingFilter(true);
    this.filterForm.get('start')?.setValue(0);
    this.filterForm.get('end')?.setValue(8);
    this.updatingFilter(false);
    this.getProducts();
  }
  reSearchItemsPagination(event: any){
    this.updatingFilter(true);
    this.filterForm.get('start')?.setValue(event[0]);
    this.filterForm.get('end')?.setValue(event[1]);
    this.updatingFilter(false);
    this.getProducts();
  }
  updatingFilter(value: boolean){
    this.updatingFilters = value;
  }
}
