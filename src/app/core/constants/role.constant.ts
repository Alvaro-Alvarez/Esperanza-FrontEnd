import { Validators } from "@angular/forms";
import { Form } from "../models/form";

export class RoleConstant {
  public static form: Form = {
    controls: [
      { name: 'name', type: 'FormControl', Validators: [Validators.required] }
    ]
  };
}
