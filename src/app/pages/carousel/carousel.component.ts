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
      console.log(this.carouselPages);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de obtener carruseles');
    });
  }
  getPageTypes(){
    this.spinner.show();
    this.masterDataService.getPageTypes().subscribe(res => {
      this.pagesType = res;
      console.log(this.pagesType);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de obtener los tipos de paginas');
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
      this.alert.error('Ocurrió un error al tratar de eliminar el carusel');
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
