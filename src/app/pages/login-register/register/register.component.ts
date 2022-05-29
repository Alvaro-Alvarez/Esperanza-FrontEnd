import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/modules/shared/services/form.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  validPass = true;

  constructor(
    private formService: FormService
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
