import { Validators } from "@angular/forms";
import { Form } from "../models/form";

export class CarouselConstant {
    public static form: Form = {
        controls: [
          { name: 'slides', type: 'FormArray', valueDefault: [], Validators: [] },
          { name: 'idPageType', type: 'FormControl', Validators: [Validators.required] },
          { name: 'enable', type: 'FormControl', Validators: [Validators.required] }
        ]
      };
}
