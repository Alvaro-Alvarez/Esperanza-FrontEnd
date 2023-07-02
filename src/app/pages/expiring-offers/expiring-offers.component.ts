import { Component, HostListener, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs';
import { BasService } from 'src/app/modules/shared/services/bas.service';
import { EventService } from 'src/app/modules/shared/services/event.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';

@Component({
  selector: 'app-expiring-offers',
  templateUrl: './expiring-offers.component.html',
  styleUrls: ['./expiring-offers.component.scss']
})
export class ExpiringOffersComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkResolution();
  }

  mobile = false;
  promotions : any[] = [];
  noUserClientCode = '001';
  daysToExpiring = 10;
  breadcrumbs: Breadcrumb[]= [];

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
              const daysDiff = this.getDaysDiff(new Date(), new Date(opt?.VigenciaHasta));
              if (daysDiff <= this.daysToExpiring){
                this.promotions.push(opt);
              }
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
  getDaysDiff(to: Date, from: Date): number{
    const date1: any = to;
    const date2: any = from;
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  goToOffer(promotion: any){
    this.routingService.goToOfferDescription(promotion?.Categoria, promotion?.Codigo);
  }
  insertBreadcrumb(){
    this.localStorageService.setBreadcrumbs(new Breadcrumb('Ofertas por vencer', `expiring-offers`));
    this.breadcrumbs = this.localStorageService.getBreadcrumbs();
    this.eventService.onShowBreadcrumbs.emit(this.breadcrumbs);
  }
  checkResolution(){
    if(window.innerWidth < 821) this.mobile = true;
    else this.mobile = false;
  }
}
