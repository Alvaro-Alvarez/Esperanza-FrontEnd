import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private productService: ProductService,
    private spinnerService: SpinnerService,
    private alertService: SweetAlertService,
    private route: ActivatedRoute,
    public routing: RoutingService,
  ) {
    this.laboratory = this.route.snapshot.params['laboratory'];
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
      this.alertService.error('Error al obtener los productos');
    })
  }
  reSearchItemsPagination(eve :any){
    this.getProducts(eve[0]);
  }
  goToProduct(code: string){
    this.routing.goToProductDescription(code);
  }
}
