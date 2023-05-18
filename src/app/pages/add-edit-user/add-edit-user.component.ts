import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { Option } from '../../core/models/option';
import { UserService } from '../../modules/shared/services/user.service';
import { User } from '../../core/models/user';
import { forkJoin, of } from 'rxjs';
import { MasterDataService } from 'src/app/modules/shared/services/master-data.service';
import { DateService } from '../../modules/shared/services/date.service';
import { DatepickerComponent } from 'src/app/modules/shared/form-components/datepicker/datepicker.component';
import { RoleIdEnum } from 'src/app/core/enums/role-id.enum';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {

  optionsRoles: Option[] = [];
  optionsSexs: Option[] = [];
  optionsDocuments: Option[] = [];
  title: string;
  user!: User;
  userForm: FormGroup;
  id: string;
  isEdit = false;
  hiddenCode = false;
  minYear!: string;
  maxYear!: string;
  roleEnum = RoleIdEnum;

  constructor(
    private formService: FormService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private routingService: RoutingService,
    private route: ActivatedRoute,
    private userService: UserService,
    private masterDataService: MasterDataService,
    private dateService: DateService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.isEdit = this.id !== '0'
    this.userForm = this.formService.getFormUser();
    this.title = this.isEdit ? 'Editar Usuario' : 'Nuevo Usuario';
  }

  ngOnInit(): void {
    this.loadOptions();
    this.minYear = DatepickerComponent.getMinDate().substr(0, 4);
    this.maxYear = DatepickerComponent.getMaxDate().substr(0, 4);
    if (this.isEdit) this.getUser();
    if (!this.isEdit){
      this.userForm.get('enabled')?.setValue(true);
    }
    this.userForm.get('person')?.get('dateOfBirth')?.valueChanges.subscribe(val => {
      this.getAge();
    });
  }
  addOrUpdateUser(){
    if (this.isEdit) this.updateUser();
    else this.addNewUser();
  }
  getForm(control: AbstractControl): FormGroup { 
    return control as FormGroup;
   }
  getUser(){
    this.spinner.show();
    this.userService.GetByGuid(this.id).subscribe(res => {
      this.user = res;
      this.userForm.patchValue(res);
      this.validateCode();
      this.userForm.get('person')?.get('dateOfBirth')?.setValue(this.dateService.setDate(res.person?.dateOfBirth));
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      // this.alert.error('Ocurrió un error al tratar obtener el usuario');
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  addNewUser(){
    this.spinner.show();
    const user: User = this.userForm.value;
    if (user.roleGuid === this.roleEnum.admin.toLowerCase()) delete user.basClientCode;
    this.userService.post(user).subscribe(res => {
      this.spinner.hide();
      this.alert.successful('Exito!', 'Usuario registrado correctamente', ()=>{this.routingService.goToUsers()})
    }, err => {
      this.spinner.hide();
      // this.alert.error('Ocurrió un error al tratar de dar de alta el nuevo usuario');
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  updateUser(){
    this.spinner.show();
    const user: User = this.userForm.value;
    this.userService.put(user).subscribe(res => {
      this.spinner.hide();
      this.alert.successful('Exito!', 'Usuario actualizado!', ()=>{this.routingService.goToUsers()})
    }, err => {
      this.spinner.hide();
      // this.alert.error('Ocurrió un error al tratar de dar de actualizar el usuario');
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  private loadOptions(){
    this.spinner.show();
    let promRoles = of(this.optionsRoles);
    let promSexs = of(this.optionsSexs);
    let promDocuments = of(this.optionsDocuments);
    if (this.optionsRoles.length === 0 || this.optionsSexs.length === 0 || this.optionsDocuments.length === 0){
      promRoles = this.masterDataService.getRoles();
      promSexs = this.masterDataService.getSexs();
      promDocuments = this.masterDataService.getDocuments();
    }
    forkJoin([promRoles, promSexs, promDocuments]).subscribe(arrOptions => {
      this.spinner.hide();
      this.optionsRoles = arrOptions[0];
      this.optionsSexs = arrOptions[1];
      this.optionsDocuments = arrOptions[2];
    }, err =>{
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  getAge() {
    const dateSelected: string = this.userForm.get('person')?.get('dateOfBirth')?.value;
    if (dateSelected){
      const dates = dateSelected.split("-");
      if (dates.length == 3) {
        if(Number(dates[0]) >= Number(this.minYear) && Number(dates[0]) <= Number(this.maxYear)){
          const today = new Date();
          const birthDate = new Date(dateSelected);
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
              age--;
          }
          this.userForm.get('person')?.get('age')?.setValue(age);
        }
      }
    }
  }
  validateCode(){
    const role = this.userForm.get('roleGuid')?.value;
    if (role){
      if (role === this.roleEnum.client.toLowerCase()){
        this.hiddenCode = false;
        this.userForm.get('basClientCode')?.setValidators([Validators.required]);
        this.userForm.get('basClientCode')?.updateValueAndValidity();
      }
      else{
        this.hiddenCode = true;
        this.userForm.get('basClientCode')?.setValidators(null);
        this.userForm.get('basClientCode')?.updateValueAndValidity();
      }
    }
    else{
      this.hiddenCode = true;
      this.userForm.get('basClientCode')?.setValidators(null);
      this.userForm.get('basClientCode')?.updateValueAndValidity();
    }
  }
}
