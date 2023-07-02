import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { LaboratoryService } from '../../modules/shared/services/laboratory.service';

@Component({
  selector: 'app-add-edit-laboratory',
  templateUrl: './add-edit-laboratory.component.html',
  styleUrls: ['./add-edit-laboratory.component.scss']
})
export class AddEditLaboratoryComponent implements OnInit {

  title: string;
  laboratory!: any;
  form: FormGroup;
  id: string;
  isEdit = false;

  constructor(
    private formService: FormService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private routingService: RoutingService,
    private route: ActivatedRoute,
    private laboratoryService: LaboratoryService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.isEdit = this.id !== '0'
    this.form = this.formService.getFormLab();
    this.title = this.isEdit ? 'Editar Laboratorio' : 'Nuevo Laboratorio';
  }

  ngOnInit(): void {
    if (this.isEdit) this.getLab();
  }
  addOrUpdateLab(){
    if (this.isEdit) this.updateLab();
    else this.addNewLab();
  }
  getForm(control: AbstractControl): FormGroup { 
    return control as FormGroup;
   }
  getLab(){
    this.spinner.show();
    this.laboratoryService.getById(this.id).subscribe(res => {
      this.laboratory = res;
      this.form.patchValue(res);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  addNewLab(){
    this.spinner.show();
    const laboratory: any = this.form.value;
    this.laboratoryService.post(laboratory).subscribe(res => {
      this.spinner.hide();
      this.alert.successful('Exito!', 'Laboratorio registrado correctamente', ()=>{this.routingService.goToLabs()})
    }, err => {
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  updateLab(){
    this.spinner.show();
    const laboratory: any = this.form.value;
    this.laboratoryService.put(laboratory).subscribe(res => {
      this.spinner.hide();
      this.alert.successful('Exito!', 'Laboratorio actualizado!', ()=>{this.routingService.goToLabs()})
    }, err => {
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  get imageForm(): any { return this.form.get('image'); }
}
