import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { BasService } from 'src/app/modules/shared/services/bas.service';
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

  promotions : any[] = [];
  noUserClientCode = '001';
  daysToExpiring = 10;

  constructor(
    private basService: BasService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private localStorageService: LocalStorageService,
    private routingService: RoutingService
  ) { }

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
    conditions.forEach(condition => {
      obs.push(this.basService.getAllPromotions(clientCode, condition))
    });
    if (obs.length > 0){
      forkJoin(obs).subscribe(arrOptions => {
        this.spinner.hide();
        arrOptions.forEach(opts => {
          opts.forEach((opt: any) => {
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
        this.alert.error('Ocurrió un error al tratar de obtener las promociones');
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
}