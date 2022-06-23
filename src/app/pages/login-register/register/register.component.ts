import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { User } from '../../../core/models/user';
import { Person } from '../../../core/models/person';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  validPass = true;
  @Output() complete: EventEmitter<any> = new EventEmitter();

  constructor(
    private formService: FormService,
    private userService: UserService,
    private spinner: SpinnerService,
    private alert: SweetAlertService
  ) {
    this.registerForm = this.formService.getFormRegister();
  }

  ngOnInit(): void {
    this.registerForm.get('password')?.valueChanges.subscribe(val => {
      this.validatePass();
    })
    this.registerForm.get('repeatPassword')?.valueChanges.subscribe(val => {
      this.validatePass();
    })
  }
  register(){
    this.spinner.show();
    let user: User = new User()
    user.person = new Person();
    user.email = this.registerForm.get('username')?.value;
    user.pass = this.registerForm.get('password')?.value;
    user.person.names = this.registerForm.get('name')?.value;
    user.person.surnames = this.registerForm.get('surname')?.value;
    this.userService.post(user).subscribe(res => {
      this.spinner.hide();
      this.alert.successful('Exito!', 'Usuario registrado correctamente', ()=>{this.onComplete()})
    },err =>{
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de registrar el usuario');
    });
  }
  onComplete(){
    this.complete.emit();
    console.log('se logea');
  }
  validatePass(){
    const pass = this.registerForm.get('password')?.value;
    const rPass = this.registerForm.get('repeatPassword')?.value;
    if (!rPass) return;
    this.validPass = pass === rPass;
    if (!this.validPass) this.registerForm.get('repeatPassword')?.setErrors([true]);
    else this.registerForm.get('repeatPassword')?.setErrors(null);
  }
}
