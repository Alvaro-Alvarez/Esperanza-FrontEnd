import { Validators } from "@angular/forms";
import { Form } from "../models/form";

export class ResetPasswordConstant {
  public static form: Form = {
    controls: [
      { name: 'email', type: 'FormControl', Validators: [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] },
      { name: 'reCaptchaToken', type: 'FormControl', Validators: [Validators.required] }
    ]
  };
}
