import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { RoleService } from 'src/app/modules/shared/services/role.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { Option } from '../../core/models/option';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.scss']
})
export class AddEditRoleComponent implements OnInit {

  title: string;
  role!: Option;
  roleForm: FormGroup;
  id: string;
  isEdit = false;

  constructor(
    private formService: FormService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private routingService: RoutingService,
    private route: ActivatedRoute,
    private roleService: RoleService,
  ) {
    this.id = this.route.snapshot.params['id'];
    this.isEdit = this.id !== '0'
    this.roleForm = this.formService.getFormRole();
    this.title = this.isEdit ? 'Editar Rol' : 'Nuevo Rol';
  }

  ngOnInit(): void {
    if (this.isEdit) this.getRole();
  }
  getRole(){
    this.spinner.show();
    this.roleService.GetByGuid(this.id).subscribe(res => {
      this.role = res;
      this.roleForm.patchValue(res);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar obtener el rol');
    });
  }
  addOrUpdate(){
    if (this.isEdit) this.update();
    else this.insert();
  }
  insert(){
    this.spinner.show();
    const role: Option = this.roleForm.value;
    this.roleService.post(role).subscribe(res => {
      this.spinner.hide();
      this.alert.successful('Exito!', 'Rol registrado correctamente', ()=>{this.routingService.goToRoles()})
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de dar de alta el nuevo rol');
    });
  }
  update(){
    this.spinner.show();
    const role: Option = this.roleForm.value;
    this.roleService.put(role).subscribe(res => {
      this.spinner.hide();
      this.alert.successful('Exito!', 'Rol actualizado!', ()=>{this.routingService.goToRoles()})
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de dar de actualizar el rol');
    });
  }
}
