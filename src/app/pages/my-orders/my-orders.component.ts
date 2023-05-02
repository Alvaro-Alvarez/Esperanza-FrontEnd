import { Component, OnInit } from '@angular/core';
import { BasService } from 'src/app/modules/shared/services/bas.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { ProductService } from '../../modules/shared/services/product.service';

export class History{
  saleNumber?: string;
  date?: string;
  prefix?: string;
  state?: string;
  partialShipment?: boolean;
  products?: ProducHistory[];
}
export class ProducHistory{
  code?: string;
  cant?: string;
  description?: string;
  image?: string;
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
  images: string[] = [];
  prodCodes: string[] = [];

  constructor(
    private alert: SweetAlertService,
    private basService: BasService,
    private spinner: SpinnerService,
    private localStorageService: LocalStorageService,
    private productService: ProductService
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
          // debugger
          if (this.histories.some(h => h.saleNumber == item.NUMERO)){
            const history = this.histories.find(h => h.saleNumber == item.NUMERO)
            const index = this.histories.indexOf(history!)
            const prod = new ProducHistory();
            prod.code = item.CODITM;
            prod.cant = item.CANTIDAD;
            prod.description = item.DESCRIPCION;
            this.prodCodes.push(prod.code?.trim()!);
            this.histories[index].products?.push(prod);
          }
          else{
            const newHistory = new History();
            const prod = new ProducHistory();
            newHistory.saleNumber = item.NUMERO;
            newHistory.date = item.FECHA;
            newHistory.prefix = item.PREFIJO;
            newHistory.state = item.ESTADO;
            newHistory.partialShipment = item.CANTIDAD != item.CANTIDADASIGNADA;
            newHistory.products = [];
            prod.code = item.CODITM;
            prod.cant = item.CANTIDAD;
            prod.description = item.DESCRIPCION;
            this.prodCodes.push(prod.code?.trim()!);
            newHistory.products.push(prod);
            this.histories.push(newHistory);
          }
        });
      }
      console.log(res);
      this.histories = this.histories.reverse();
      // debugger
      console.log(this.histories);
      this.getImages();
      this.productsBas = res;
    }, err =>{
      this.spinner.hide();
      console.log(err);
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    })
  }
  getImages(){
    this.spinner.show();
    this.productService.getImagesByCodes({productCodes: this.prodCodes}).subscribe(res =>{
      this.spinner.hide();
      this.images = res;
      this.histories.forEach(history => {
        history.products?.forEach(product => {
          const prodImage = this.images.filter(img => img.includes(product.code?.trim()!))
          product.image = prodImage[0];
        });
      });
    },err => {
      this.spinner.hide();
      console.log(err);
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
}
