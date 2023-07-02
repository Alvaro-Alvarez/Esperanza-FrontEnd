import { Validators } from "@angular/forms";
import { Form } from "../models/form";

export class LaboratoryConstant {
  public static form: Form = {
    controls: [
      { name: 'laboratoryTitle', type: 'FormControl', Validators: [Validators.required] },
      { name: 'laboratoryDescription', type: 'FormControl', Validators: [] },
      { name: 'laboratoryOrder', type: 'FormControl', Validators: [Validators.required] },
      { name: 'idImage', type: 'FormControl', Validators: [] },
      {
        subForm: {
          name: 'image',
          form: {
            controls: [
              { name: 'fullName', type: 'FormControl', Validators: [] },
              { name: 'extension', type: 'FormControl', Validators: [] },
              { name: 'base64Image', type: 'FormControl', Validators: [Validators.required] }
            ]
          }
        }
      }
    ]
  };
}
