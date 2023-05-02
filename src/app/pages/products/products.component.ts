import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { Product } from '../../core/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  // producst: Product[] = [];

  constructor(
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    public routingService: RoutingService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.spinner.show();
    this.productService.getAll().subscribe(res => {
      this.products = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      // this.alert.error('Ocurrió un error al tratar de obtener los productos');
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  askAction(id: string){
    this.alert.warning('Cuidado!', 'Estas por eliminar un producto, estás de acuerdo?', ()=>{this.deleteProduct(id)})
  }
  deleteProduct(id: string){
    this.spinner.show();
    this.productService.delete(id).subscribe(res => {
      this.spinner.hide();
      this.getProducts();
    }, err => {
      this.spinner.hide();
      // this.alert.error('Ocurrió un error al tratar de eliminar el producto');
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
}
