import { Validators } from "@angular/forms";
import { Form } from "../models/form";

export class LoginConstant {
  public static form: Form = {
    controls: [
      { name: 'username', type: 'FormControl', Validators: [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] },
      { name: 'password', type: 'FormControl', Validators: [Validators.required] },
      { name: 'remember', type: 'FormControl', Validators: [Validators.required] },
      { name: 'reCaptchaToken', type: 'FormControl', Validators: null! },
      // { name: 'reCaptchaToken', type: 'FormControl', Validators: [Validators.required] },
    ]
  };
}
