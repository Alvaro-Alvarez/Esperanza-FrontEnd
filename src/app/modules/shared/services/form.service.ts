import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BaseConstant } from 'src/app/core/constants/base.constant';
import { CarouselConstant } from 'src/app/core/constants/carousel.constant';
import { ContactConstant } from 'src/app/core/constants/contact.constant';
import { LaboratoryConstant } from 'src/app/core/constants/laboratory.constant';
import { LoginConstant } from 'src/app/core/constants/login.constant';
import { ProductFilterConstant } from 'src/app/core/constants/product-filter.constant';
import { ProductConstant } from 'src/app/core/constants/product.constant';
import { RegisterConstant } from 'src/app/core/constants/register.constant';
import { RoleConstant } from 'src/app/core/constants/role.constant';
import { CarouselSlideConstant } from 'src/app/core/constants/slide.constant';
import { UserConstant } from 'src/app/core/constants/user.constant';
import { VideoConstant } from 'src/app/core/constants/video..constant';
import { Control, Form } from 'src/app/core/models/form';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  getFormLogin(): FormGroup {
    return this.create(LoginConstant.form, false);
  }
  getFormRegister(): FormGroup {
    return this.create(RegisterConstant.form, false);
  }
  getFormContact(): FormGroup {
    return this.create(ContactConstant.form, false);
  }
  getFormUser(): FormGroup {
    return this.create(UserConstant.form);
  }
  getFormRole(): FormGroup {
    return this.create(RoleConstant.form);
  }
  getFormProduct(): FormGroup {
    return this.create(ProductConstant.form);
  }
  getFormProductFilter(): FormGroup {
    return this.create(ProductFilterConstant.form, false);
  }

  getFormLab(): FormGroup {
    return this.create(LaboratoryConstant.form);
  }
  getFormVideo(): FormGroup {
    return this.create(VideoConstant.form);
  }
  getFormCarousel(): FormGroup {
    return this.create(CarouselConstant.form);
  }
  getFormCarouselSlide(): FormGroup {
    return this.create(CarouselSlideConstant.form);
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
