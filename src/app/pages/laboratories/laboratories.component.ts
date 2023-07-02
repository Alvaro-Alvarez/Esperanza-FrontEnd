import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs';
import { LaboratoryModalComponent } from 'src/app/modules/shared/components/laboratory-card/laboratory-modal/laboratory-modal.component';
import { EventService } from 'src/app/modules/shared/services/event.service';
import { LaboratoryService } from 'src/app/modules/shared/services/laboratory.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';

@Component({
  selector: 'app-laboratories',
  templateUrl: './laboratories.component.html',
  styleUrls: ['./laboratories.component.scss']
})
export class LaboratoriesComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkResolution();
  }
  
  laboratories: any[] = [];
  rows: number = 0;
  breadcrumbs: Breadcrumb[]= [];
  mobile = false;

  constructor(
    private laboratoryService: LaboratoryService,
    private spinnerService: SpinnerService,
    private alertService: SweetAlertService,
    public routing: RoutingService,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private eventService: EventService,
  ) {
    this.checkResolution();
    this.insertBreadcrumb();
  }

  ngOnInit(): void {
    this.getLabs(0);
  }
  getLabs(pag: number){
    this.spinnerService.show();
    this.laboratoryService.getAllWithPagination({start: pag}).subscribe(res => {
      this.spinnerService.hide();
      this.laboratories = res;
      this.rows = res.length > 0 ? res[0].rows : 0;
      this.laboratories.sort((a,b) => a.order - b.order);
    }, err => {
      this.spinnerService.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alertService.error(error);
    })
  }
  reSearchItemsPagination(eve :any){
    this.getLabs(eve[0]);
  }
  // showLab(lab: any){
  //   const modalRef = this.modalService.open(LaboratoryModalComponent, { size: 'lg' });
  //   modalRef.componentInstance.laboratory = lab;
  // }
  showProductLab(lab: any){
    this.routing.goToProductLaboratory(lab?.laboratoryTitle?.toLowerCase());
  }
  insertBreadcrumb(){
    this.localStorageService.setBreadcrumbs(new Breadcrumb('Laboratorios', `laboratories`));
    this.breadcrumbs = this.localStorageService.getBreadcrumbs();
    this.eventService.onShowBreadcrumbs.emit(this.breadcrumbs);
  }
  checkResolution(){
    if(window.innerWidth < 821) this.mobile = true;
    else this.mobile = false;
  }
}
