import { Validators } from "@angular/forms";
import { Form } from "../models/form";

export class UserConstant {
  public static form: Form = {
    controls: [
      { name: 'personGuid', type: 'FormControl', Validators: [] },
      { name: 'roleGuid', type: 'FormControl', Validators: [Validators.required] },
      { name: 'email', type: 'FormControl', Validators: [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")] },
      { name: 'pass', type: 'FormControl', Validators: [Validators.required] },
      { name: 'verified', type: 'FormControl', Validators: [] },
      { name: 'basClientCode', type: 'FormControl', Validators: [Validators.required] },
      {
        subForm: {
          name: 'person',
          form: {
            controls: [
              { name: 'documentTypeGuid', type: 'FormControl', Validators: [] },
              { name: 'phoneGuid', type: 'FormControl', Validators: [] },
              { name: 'sexGuid', type: 'FormControl', Validators: [] },
              { name: 'names', type: 'FormControl', Validators: [Validators.required] },
              { name: 'surnames', type: 'FormControl', Validators: [Validators.required] },
              { name: 'dateOfBirth', type: 'FormControl', Validators: [] },
              { name: 'age', type: 'FormControl', Validators: [] },
              { name: 'documentNumber', type: 'FormControl', Validators: [] },
              {
                subForm: {
                  name: 'phone',
                  form: {
                    controls: [
                      { name: 'countryCode', type: 'FormControl', Validators: [] },
                      { name: 'cityCode', type: 'FormControl', Validators: [] },
                      { name: 'phoneNumber', type: 'FormControl', Validators: [] }
                    ]
                  }
                }
              }
            ]
          }
        }
      }
    ]
  };
}
