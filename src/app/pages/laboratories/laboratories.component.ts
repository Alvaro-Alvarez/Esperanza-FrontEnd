import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LaboratoryModalComponent } from 'src/app/modules/shared/components/laboratory-card/laboratory-modal/laboratory-modal.component';
import { LaboratoryService } from 'src/app/modules/shared/services/laboratory.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';

@Component({
  selector: 'app-laboratories',
  templateUrl: './laboratories.component.html',
  styleUrls: ['./laboratories.component.scss']
})
export class LaboratoriesComponent implements OnInit {

  laboratories: any[] = [];
  rows: number = 0;

  constructor(
    private laboratoryService: LaboratoryService,
    private spinnerService: SpinnerService,
    private alertService: SweetAlertService,
    public routing: RoutingService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getLabs(0);
  }
  getLabs(pag: number){
    this.spinnerService.show();
    this.laboratoryService.getAllWithPagination({start: pag}).subscribe(res => {
      this.spinnerService.hide();
      this.laboratories = res;
      // console.log(this.laboratories);
      this.rows = res.length > 0 ? res[0].rows : 0;
    }, err => {
      this.spinnerService.hide();
      this.alertService.error('Error al obtener los laboratorios');
    })
  }
  reSearchItemsPagination(eve :any){
    this.getLabs(eve[0]);
  }
  showLab(lab: any){
    const modalRef = this.modalService.open(LaboratoryModalComponent, { size: 'lg' });
    modalRef.componentInstance.laboratory = lab;
  }
}
