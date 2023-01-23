import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { ProductFilter } from 'src/app/core/models/product-filter';
import { Product } from 'src/app/core/models/product';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/modules/shared/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  // products?: Product[] = [];
  totalRows?: number = 0;
  filterForm!: FormGroup;
  updatingFilters = false;
  userLogged = false;
  loginSub: Subscription;
  products: any[] = [];
  // products: any[] = [
  //   {path: 'assets/images/pruebas/prueba1.png'},
  //   {path: 'assets/images/pruebas/prueba2.png'},
  //   {path: 'assets/images/pruebas/prueba3.png'},
  //   {path: 'assets/images/pruebas/prueba4.png'},
  //   {path: 'assets/images/pruebas/prueba5.png'}
  // ]

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
    private localStorageService: LocalStorageService,
    private eventService: EventService,
  ) { 
    this.filterForm = this.formSerivce.getFormProductFilter();
    this.fillUserLogged();
    this.loginSub = this.eventService.onLogIn.subscribe(val => {
      this.fillUserLogged();
    });
  }

  ngOnDestroy(): void {
    if (this.loginSub) this.loginSub.unsubscribe();
  }
  ngOnInit(): void {
    // this.initFilters();
    this.getProducts();
  }
  fillUserLogged(){
    debugger
    const basClient = this.localStorageService.getBasClient();
    this.userLogged = basClient != null;
  }
  getProducts(){
    this.spinner.show();
    const filter: ProductFilter = this.filterForm.value;
    filter.start = 0;
    this.productService.getAllByFilter(filter).subscribe(res => {
      this.spinner.hide();
      // debugger
      this.products = res.products.length > 5 ? res.products.slice(0, 5) : res.products;
      this.totalRows = res.rows;
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar obtener los productos');
    });
  }
  // initFilters(){
  //   this.updatingFilter(true);
  //   this.filterForm.get('start')?.setValue(0);
  //   this.filterForm.get('end')?.setValue(8);
  //   this.updatingFilter(false);
  //   this.getProducts();
  // }
  // reSearchItemsPagination(event: any){
  //   this.updatingFilter(true);
  //   this.filterForm.get('start')?.setValue(event[0]);
  //   this.filterForm.get('end')?.setValue(event[1]);
  //   this.updatingFilter(false);
  //   this.getProducts();
  // }
  updatingFilter(value: boolean){
    this.updatingFilters = value;
  }
  goToAllOffers(){
    console.log("Ofertas");
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
    if (this.userLogged) this.routing.goToProductDescription(code);
    else this.alert.info('No logueado', 'Necesitas estar logueado para ver la información del producto', ()=>{  })
    console.log("Producto");
  }
  goToVideos(){
    console.log("Videos");
  }
}
