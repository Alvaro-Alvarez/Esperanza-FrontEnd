import { Component, HostListener, OnInit } from '@angular/core';
import { BasService } from 'src/app/modules/shared/services/bas.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { ProductService } from '../../modules/shared/services/product.service';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs';
import { EventService } from '../../modules/shared/services/event.service';

export class History{
  saleNumber?: string;
  date?: Date;
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

  addStickyClass = false;
  stickyOffSet = 0;
  navHeight = 0;
  noUserClientCode = '001';
  productsBas: any[] = [];
  products: any[] = [];
  histories: History[] = [];
  images: string[] = [];
  prodCodes: string[] = [];
  breadcrumbs: Breadcrumb[]= [];

  constructor(
    private alert: SweetAlertService,
    private basService: BasService,
    private spinner: SpinnerService,
    private localStorageService: LocalStorageService,
    private productService: ProductService,
    private eventService: EventService
  ) {
    this.insertBreadcrumb();
  }

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
            this.prodCodes.push(prod.code?.trim()!);
            this.histories[index].products?.push(prod);
          }
          else{
            const date = item.FECHA.split('/');
            const newHistory = new History();
            const prod = new ProducHistory();
            newHistory.saleNumber = item.NUMERO;
            newHistory.date = new Date(Number(date[2]), Number(date[1]-1), Number(date[0]));
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
      this.histories.map(history => {
        history.products?.map(product => {
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
  insertBreadcrumb(){
    this.localStorageService.setBreadcrumbs(new Breadcrumb('Mis compras', `my-orders`));
    this.breadcrumbs = this.localStorageService.getBreadcrumbs();
    this.eventService.onShowBreadcrumbs.emit(this.breadcrumbs);
  }
}
