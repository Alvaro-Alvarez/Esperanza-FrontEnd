import { Validators } from "@angular/forms";
import { Form } from "../models/form";

export class CarouselSlideConstant {
  public static form: Form = {
    controls: [
      { name: 'slideText', type: 'FormControl', Validators: [] },
      { name: 'slideOrder', type: 'FormControl', Validators: [Validators.required] },
      { name: 'isPhoneDimension', type: 'FormControl', Validators: [Validators.required] },
      { name: 'idCarouselPage', type: 'FormControl', Validators: [] },
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
