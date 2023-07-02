import { Validators } from "@angular/forms";
import { Form } from "../models/form";

export class ProductFilterConstant {
  public static form: Form = {
    controls: [
      { name: 'start', type: 'FormControl', Validators: [Validators.required] },
      { name: 'end', type: 'FormControl', Validators: [Validators.required] }
    ]
  };
}
