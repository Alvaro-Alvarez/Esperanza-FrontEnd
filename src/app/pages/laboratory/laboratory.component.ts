import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { LaboratoryService } from '../../modules/shared/services/laboratory.service';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.scss']
})
export class LaboratoryComponent implements OnInit {

  labs: any[] = [];

  constructor(
    private laboratoryService: LaboratoryService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    public routingService: RoutingService
  ) { }

  ngOnInit(): void {
    this.getLabs();
  }
  getLabs(){
    this.spinner.show();
    this.laboratoryService.getAll().subscribe(res => {
      this.labs = res;
      console.log(this.labs);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de obtener los laboratorios');
    });
  }
  askAction(id: string){
    this.alert.warning('Cuidado!', 'Estas por eliminar un laboratorio, estás de acuerdo?', ()=>{this.deleteLab(id)})
  }
  deleteLab(id: string){
    this.spinner.show();
    this.laboratoryService.delete(id).subscribe(res => {
      this.spinner.hide();
      this.getLabs();
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de eliminar el laboratorio');
    });
  }
}