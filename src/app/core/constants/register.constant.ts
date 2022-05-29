import { Validators } from "@angular/forms";
import { Form } from "../models/form";

export class RegisterConstant {
    public static form: Form = {
      controls: [
        { name: 'name', type: 'FormControl', Validators: [Validators.required] },
        { name: 'surname', type: 'FormControl', Validators: [Validators.required] },
        // { name: 'username', type: 'FormControl', Validators: [Validators.required] },
        { name: 'username', type: 'FormControl', Validators: [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] },
        { name: 'password', type: 'FormControl', Validators: [Validators.required] },
        { name: 'repeatPassword', type: 'FormControl', Validators: [Validators.required] },
      ]
    };
  }
  