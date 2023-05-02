import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PageTypeEnum } from 'src/app/core/enums/page-type.enum';
import { CarruselService } from 'src/app/modules/shared/services/carrusel.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';

@Component({
  selector: 'app-essays-and-services',
  templateUrl: './essays-and-services.component.html',
  styleUrls: ['./essays-and-services.component.scss']
})
export class EssaysAndServicesComponent implements OnInit {

  carouselSlides: any[] = [];
  enableCarousel = false;

  constructor(
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private carruselService: CarruselService,
  ) { }

  ngOnInit(): void {
    this.loadPagesSlides();
  }
  loadPagesSlides(){
    this.spinner.show();
    let obs = [];
    obs.push(this.carruselService.getByPageType(PageTypeEnum.Default));
    forkJoin(obs).subscribe(arrOptions => {
      this.spinner.hide();
      this.carouselSlides.push(...arrOptions[0].slides);
      this.enableCarousel = arrOptions[0].enable;
    }, err =>{
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
}
