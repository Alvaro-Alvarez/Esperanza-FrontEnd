import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { VideoService } from '../../modules/shared/services/video.service';

@Component({
  selector: 'app-add-edit-video',
  templateUrl: './add-edit-video.component.html',
  styleUrls: ['./add-edit-video.component.scss']
})
export class AddEditVideoComponent implements OnInit {

  title: string;
  video!: any;
  form: FormGroup;
  id: string;
  isEdit = false;

  constructor(
    private formService: FormService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private routingService: RoutingService,
    private route: ActivatedRoute,
    private vdeoService: VideoService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.isEdit = this.id !== '0'
    this.form = this.formService.getFormVideo();
    this.title = this.isEdit ? 'Editar video' : 'Nuevo video';
  }

  ngOnInit(): void {
    if (this.isEdit) this.getVideo();
    else this.form.get('externalVideo')?.setValue(false);
  }
  addOrUpdateVideo(){
    if (this.isEdit) this.updateVideo();
    else this.addNewVideo();
  }
  getForm(control: AbstractControl): FormGroup { 
    return control as FormGroup;
   }
  getVideo(){
    this.spinner.show();
    this.vdeoService.getById(this.id).subscribe(res => {
      this.video = res;
      this.form.patchValue(res);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      // this.alert.error('Ocurrió un error al tratar obtener el video');
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  addNewVideo(){
    this.spinner.show();
    const video: any = this.form.value;
    this.vdeoService.post(video).subscribe(res => {
      this.spinner.hide();
      this.alert.successful('Exito!', 'Video registrado correctamente', ()=>{this.routingService.goToVideosAdmin()})
    }, err => {
      this.spinner.hide();
      // this.alert.error('Ocurrió un error al tratar de dar de alta el nuevo video');
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  updateVideo(){
    this.spinner.show();
    const video: any = this.form.value;
    this.vdeoService.put(video).subscribe(res => {
      this.spinner.hide();
      this.alert.successful('Exito!', 'Video actualizado!', ()=>{this.routingService.goToVideosAdmin()})
    }, err => {
      this.spinner.hide();
      // this.alert.error('Ocurrió un error al tratar de dar de actualizar el video');
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  get videoForm(): any { return this.form.get('video'); }
  get imageForm(): any { return this.form.get('thumbnail'); }
}
