import { Component, OnInit } from '@angular/core';
import { BasService } from 'src/app/modules/shared/services/bas.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';

export class History{
  saleNumber?: string;
  date?: string;
  prefix?: string;
  state?: string;
  products?: ProducHistory[];
}
export class ProducHistory{
  code?: string;
  cant?: string;
  description?: string;
}

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  noUserClientCode = '001';
  productsBas: any[] = [];
  products: any[] = [];
  histories: History[] = [];

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
    const clientCode: string = clientBas ? clientBas.Codigo : this.noUserClientCode;
    this.basService.GetEstadoPedidos(clientCode).subscribe(res => {
      this.spinner.hide();
      if(res){
        res.map((item: any) => {
          if (this.histories.some(h => h.saleNumber == item.NUMERO)){
            const history = this.histories.find(h => h.saleNumber == item.NUMERO)
            const index = this.histories.indexOf(history!)
            const prod = new ProducHistory();
            prod.code = item.CODITM;
            prod.cant = item.CANTIDAD;
            prod.description = item.DESCRIPCION;
            this.histories[index].products?.push(prod);
          }
          else{
            const newHistory = new History();
            const prod = new ProducHistory();
            newHistory.saleNumber = item.NUMERO;
            newHistory.date = item.FECHA;
            newHistory.prefix = item.PREFIJO;
            newHistory.state = item.ESTADO;
            newHistory.products = [];
            prod.code = item.CODITM;
            prod.cant = item.CANTIDAD;
            prod.description = item.DESCRIPCION;
            newHistory.products.push(prod);
            this.histories.push(newHistory);
          }
        });
      }
      console.log(res);
      this.productsBas = res;
    }, err =>{
      this.spinner.hide();
      console.log(err);
      this.alert.error('Ocurrió un error al obtener estado de pedidos.');
    })
  }
}
