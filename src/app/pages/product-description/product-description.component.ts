import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { ProductFilter } from 'src/app/core/models/product-filter';
import { BasService } from 'src/app/modules/shared/services/bas.service';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { LocalStorageService } from '../../modules/shared/services/local-storage.service';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {

  isFav: boolean = false;
  code: string;
  product: any;
  productBas: any;

  constructor(
    private productService: ProductService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private route: ActivatedRoute,
    private basService: BasService,
    private localStorageService: LocalStorageService
  ) {
    this.code = this.route.snapshot.params['code'];
  }

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct(){
    this.spinner.show();
    this.productService.getByCode(this.code).subscribe(res => {
      this.product = res;
      this.getProductBas();
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar obtener los productos');
    });
  }
  getProductBas(){
    const clientBas = JSON.parse(this.localStorageService.getBasClient()!);
    debugger
    this.basService.getProduct(clientBas.Codigo, this.code, this.product.condicion).subscribe(res => {
      this.spinner.hide();
      debugger
      this.productBas = res;
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar obtener los productos');
    });
  }
  markFavorite(isMarked: boolean){
    this.isFav = isMarked;
  }

  buyNow(){
    console.log("buyNow");
  }

  addToCart(){
    console.log("addToCart");
  }

}
