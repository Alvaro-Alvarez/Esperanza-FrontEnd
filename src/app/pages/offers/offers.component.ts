import { CurrencyPipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { BasService } from '../../modules/shared/services/bas.service';
import { LocalStorageService } from '../../modules/shared/services/local-storage.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs';
import { EventService } from 'src/app/modules/shared/services/event.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkResolution();
  }
  
  promotions : any[] = [];
  noUserClientCode = '001';
  breadcrumbs: Breadcrumb[]= [];
  mobile = false;

  constructor(
    private basService: BasService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private localStorageService: LocalStorageService,
    private eventService: EventService,
    private routingService: RoutingService
  ) {
    this.checkResolution();
    this.insertBreadcrumb();
  }

  ngOnInit(): void {
    this.getPromotions();
  }
  getPromotions(){
    this.spinner.show();
    const conditions = [];
    const obs: Observable<any>[] = [];
    if (this.localStorageService.canCcb()) conditions.push('CCB');
    if (this.localStorageService.canCcm()) conditions.push('CCM');
    const clientBas = JSON.parse(this.localStorageService.getBasClient()!);
    const clientCode: string = clientBas?.Codigo ? clientBas?.Codigo : this.noUserClientCode;
    if (clientCode === this.noUserClientCode){
      conditions.push('CCB');
      conditions.push('CCM');
    }
    conditions.map(condition => {
      obs.push(this.basService.getAllPromotions(clientCode, condition))
    });
    if (obs.length > 0){
      forkJoin(obs).subscribe(arrOptions => {
        this.spinner.hide();
        arrOptions.map(opts => {
          opts.map((opt: any) => {
            const currentDate = new Date();
            const to = new Date(opt?.VigenciaDesde);
            const from = new Date(opt?.VigenciaHasta);
  
            if (currentDate >= to && currentDate <= from){
              this.promotions.push(opt);
            }
          });
        });
      }, err =>{
        this.spinner.hide();
        const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
        this.alert.error(error);
      });
    }
    else this.spinner.hide();
  }
  getImgName(promotion: any): string{
    let name: string = promotion?.Codigo;;
    return name + '.jpeg';
  }
  goToOffer(promotion: any){
    this.routingService.goToOfferDescription(promotion?.Categoria, promotion?.Codigo);
  }
  insertBreadcrumb(){
    this.localStorageService.setBreadcrumbs(new Breadcrumb('Ofertas', `offers`));
    this.breadcrumbs = this.localStorageService.getBreadcrumbs();
    this.eventService.onShowBreadcrumbs.emit(this.breadcrumbs);
  }
  checkResolution(){
    if(window.innerWidth < 821) this.mobile = true;
    else this.mobile = false;
  }
}
