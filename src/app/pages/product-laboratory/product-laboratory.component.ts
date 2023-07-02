import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs';
import { EventService } from 'src/app/modules/shared/services/event.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';

@Component({
  selector: 'app-product-laboratory',
  templateUrl: './product-laboratory.component.html',
  styleUrls: ['./product-laboratory.component.scss']
})
export class ProductLaboratoryComponent implements OnInit {

  laboratory: string;
  products: any[] = [];
  rows: number = 0;
  breadcrumbs: Breadcrumb[]= [];

  constructor(
    private productService: ProductService,
    private spinnerService: SpinnerService,
    private alertService: SweetAlertService,
    private route: ActivatedRoute,
    public routing: RoutingService,
    private localStorageService: LocalStorageService,
    private eventService: EventService,
  ) {
    this.laboratory = this.route.snapshot.params['laboratory'];
    this.insertBreadcrumb();
  }

  ngOnInit(): void {
    this.getProducts(0);
  }
  getProducts(pag: number){
    this.spinnerService.show();
    this.productService.getAllByLaboratory({start: pag, laboratory: this.laboratory}).subscribe(res => {
      this.spinnerService.hide();
      this.products = res.products;
      this.rows = res.rows;
    }, err => {
      this.spinnerService.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alertService.error(error);
    })
  }
  reSearchItemsPagination(eve :any){
    this.getProducts(eve[0]);
  }
  goToProduct(code: string){
    this.routing.goToProductDescription(code);
  }
  insertBreadcrumb(){
    this.localStorageService.setBreadcrumbs(new Breadcrumb(`Laboratorio ${this.laboratory.toUpperCase()}`, `/product-laboratory/${this.laboratory}`));
    this.breadcrumbs = this.localStorageService.getBreadcrumbs();
    this.eventService.onShowBreadcrumbs.emit(this.breadcrumbs);
  }
}
