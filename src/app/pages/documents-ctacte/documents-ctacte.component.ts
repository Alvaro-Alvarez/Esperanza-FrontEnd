import { Component, OnInit } from '@angular/core';
import { BasService } from 'src/app/modules/shared/services/bas.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { LocalStorageService } from '../../modules/shared/services/local-storage.service';

@Component({
  selector: 'app-documents-ctacte',
  templateUrl: './documents-ctacte.component.html',
  styleUrls: ['./documents-ctacte.component.scss']
})
export class DocumentsCtacteComponent implements OnInit {

  docs: any[] = [];
  rows: number = 0;

  constructor(
    private basService: BasService,
    private spinnerService: SpinnerService,
    private alertService: SweetAlertService,
    private localStorageService: LocalStorageService,
  ) { }

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
    }, err => {
      this.spinnerService.hide();
      this.alertService.error('Error al obtener los documentos');
    })
  }
}
