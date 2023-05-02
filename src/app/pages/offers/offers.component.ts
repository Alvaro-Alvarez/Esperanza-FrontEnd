import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { BasService } from '../../modules/shared/services/bas.service';
import { LocalStorageService } from '../../modules/shared/services/local-storage.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  promotions : any[] = [];
  noUserClientCode = '001';

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
              this.promotions.push(opt);
            }
          });
        });
        // console.log(this.promotions);
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
}
