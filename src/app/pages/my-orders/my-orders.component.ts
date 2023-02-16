import { Component, OnInit } from '@angular/core';
import { BasService } from 'src/app/modules/shared/services/bas.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  noUserClientCode = '001';
  productsBas: any[] = [];
  products: any[] = [];

  constructor(
    private alert: SweetAlertService,
    private basService: BasService,
    private spinner: SpinnerService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getStates();
  }
  getStates(){
    this.spinner.show();
    const clientBas = JSON.parse(this.localStorageService.getBasClient()!);
    let clientCode: string = clientBas ? clientBas.Codigo : this.noUserClientCode;
    this.basService.GetEstadoPedidos(clientCode).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.productsBas = res;
    }, err =>{
      this.spinner.hide();
      console.log(err);
      this.alert.error('Ocurrió un error al obtener estado de pedidos.');
    })
  }
}
