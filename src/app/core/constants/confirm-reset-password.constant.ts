import { Validators } from "@angular/forms";
import { Form } from "../models/form";

export class ConfirmResetPasswordConstant {
  public static form: Form = {
    controls: [
      { name: 'email', type: 'FormControl', Validators: [] },
      { name: 'verificationCode', type: 'FormControl', Validators: [Validators.required] },
      { name: 'newPassword', type: 'FormControl', Validators: [Validators.required] }
    ]
  };
}
