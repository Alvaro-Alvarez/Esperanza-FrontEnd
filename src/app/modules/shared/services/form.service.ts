import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BaseConstant } from 'src/app/core/constants/base.constant';
import { LoginConstant } from 'src/app/core/constants/login.constant';
import { RegisterConstant } from 'src/app/core/constants/register.constant';
import { Control, Form } from 'src/app/core/models/form';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  getFormLogin(addFormBase?: boolean): FormGroup {
    return this.create(LoginConstant.form, false);
  }

  getFormRegister(addFormBase?: boolean): FormGroup {
    return this.create(RegisterConstant.form, false);
  }

  private create(form: Form, addFormBase: boolean = true): FormGroup {
    const result: FormGroup = new FormGroup({});
    if (addFormBase){
      form.controls = BaseConstant.form.controls.concat(form.controls);
    }
    form.controls.forEach((control: Control) => {
      if (control.subForm){
        result.addControl(control.subForm.name, this.create(control.subForm.form));
      }
      else{
        const value = control.valueDefault || null;
        if (control.type === 'FormArray'){
          result.addControl(control.name!, new FormArray(value, control.Validators));
        }
        else if (control.type === 'FormControl'){
          result.addControl(control.name!, new FormControl(value, control.Validators));
        }
        else{
          throw new Error('control.type not implement');
        }
      }
    });
    return result;
  }
}
