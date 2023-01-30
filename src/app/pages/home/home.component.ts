import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { ProductFilter } from 'src/app/core/models/product-filter';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalRows?: number = 0;
  filterForm!: FormGroup;
  updatingFilters = false;
  products: any[] = [];

  labs: any[] = [
    {path: 'assets/images/pruebas/lab1.png'},
    {path: 'assets/images/pruebas/lab2.png'},
    {path: 'assets/images/pruebas/lab3.png'},
    {path: 'assets/images/pruebas/lab4.png'},
    {path: 'assets/images/pruebas/lab5.png'}
  ]

  imagesLabs: any[] = [
    {path: 'assets/images/pruebas/prueba1.png'},
    {path: 'assets/images/pruebas/prueba2.png'},
    {path: 'assets/images/pruebas/prueba3.png'},
    {path: 'assets/images/pruebas/prueba4.png'},
    {path: 'assets/images/pruebas/prueba5.png'}
  ]

  videos: any[] = [
    {path: 'assets/videos/1.mp4', thumbnail: 'assets/thumbnail1.jpg'},
    {path: 'assets/videos/1.mp4', thumbnail: 'assets/thumbnail1.jpg'},
    {path: 'assets/videos/1.mp4', thumbnail: 'assets/thumbnail1.jpg'},
    {path: 'assets/videos/1.mp4', thumbnail: 'assets/thumbnail1.jpg'},
    {path: 'assets/videos/1.mp4', thumbnail: 'assets/thumbnail1.jpg'},
  ]

  constructor(
    private productService: ProductService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private formSerivce: FormService,
    public routing: RoutingService,
    private localStorageService: LocalStorageService
  ) { 
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
