import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  producst: any[] = [];
  // producst: Product[] = [];

  constructor(
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    public routingService: RoutingService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

}
