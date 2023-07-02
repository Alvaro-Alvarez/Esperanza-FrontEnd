import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { BasService } from 'src/app/modules/shared/services/bas.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { LocalStorageService } from '../../modules/shared/services/local-storage.service';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs';
import { EventService } from 'src/app/modules/shared/services/event.service';

@Component({
  selector: 'app-documents-ctacte',
  templateUrl: './documents-ctacte.component.html',
  styleUrls: ['./documents-ctacte.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }]
})
export class DocumentsCtacteComponent implements OnInit {

  docs: any[] = [];
  rows: number = 0;
  breadcrumbs: Breadcrumb[]= [];

  constructor(
    private basService: BasService,
    private spinnerService: SpinnerService,
    private alertService: SweetAlertService,
    private localStorageService: LocalStorageService,
    private eventService: EventService,
  ) {
    this.insertBreadcrumb();
  }

  ngOnInit(): void {
    this.getDocs();
  }
  getDocs(){
    this.spinnerService.show();
    const code: any = JSON.parse(this.localStorageService.getBasClient()!);
    this.basService.GetDocumentosCtacte(code?.Codigo).subscribe(res => {
      this.spinnerService.hide();
      this.docs = res;
      this.rows = res.length > 0 ? res[0].rows : 0;
      this.docs = this.docs.sort((d1, d2) => new Date(d2.Emision!).getTime() - new Date(d1.Emision!).getTime());
    }, err => {
      this.spinnerService.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alertService.error(error);
    })
  }
  insertBreadcrumb(){
    this.localStorageService.setBreadcrumbs(new Breadcrumb('Mi cuenta corriente', `documents-ctacte`));
    this.breadcrumbs = this.localStorageService.getBreadcrumbs();
    this.eventService.onShowBreadcrumbs.emit(this.breadcrumbs);
  }
}
