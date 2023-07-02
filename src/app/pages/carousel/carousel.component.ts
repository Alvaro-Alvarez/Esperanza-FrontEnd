import { Component, OnInit } from '@angular/core';
import { CarruselService } from 'src/app/modules/shared/services/carrusel.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { MasterDataService } from '../../modules/shared/services/master-data.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  carouselPages: any[] = [];
  pagesType: any[] = [];

  constructor(
    private carruselService: CarruselService,
    private masterDataService: MasterDataService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    public routingService: RoutingService
  ) { }

  ngOnInit(): void {
    this.getCarousels();
    this.getPageTypes();
  }
  getCarousels(){
    this.spinner.show();
    this.carruselService.getAll().subscribe(res => {
      this.carouselPages = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  getPageTypes(){
    this.spinner.show();
    this.masterDataService.getPageTypes().subscribe(res => {
      this.pagesType = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  askAction(id: string){
    this.alert.warning('Cuidado!', 'Estas por eliminar un carrusel, estás de acuerdo?', ()=>{this.deleteCarousel(id)})
  }
  deleteCarousel(id: string){
    this.spinner.show();
    this.carruselService.delete(id).subscribe(res => {
      this.spinner.hide();
      this.getCarousels();
    }, err => {
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  newCarousel(){
    if (this.pagesType.length === this.carouselPages.length){
      this.alert.warning('No se puede agregar', 'Todas las páginas ya tienen imagenes, debe eliminar ulguno para poder continuar');
      return;
    }
    this.routingService.goToAddEditCarousel('0')
  }
}
