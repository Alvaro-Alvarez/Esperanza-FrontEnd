import { Validators } from "@angular/forms";
import { Form } from "../models/form";

export class ContactConstant {
    public static form: Form = {
      controls: [
        { name: 'businessName', type: 'FormControl', Validators: [Validators.required] },
        { name: 'email', type: 'FormControl', Validators: [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] },
        { name: 'phonenNumber', type: 'FormControl', Validators: [Validators.required] },
        { name: 'location', type: 'FormControl', Validators: [Validators.required] },
        { name: 'address', type: 'FormControl', Validators: [Validators.required] },
        { name: 'activity', type: 'FormControl', Validators: [Validators.required] },
        { name: 'subjet', type: 'FormControl', Validators: [Validators.required] },
        { name: 'message', type: 'FormControl', Validators: [Validators.required] },
        { name: 'reCaptchaToken', type: 'FormControl', Validators: [Validators.required] },
      ]
    };
  }
  