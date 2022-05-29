import { Form } from "../models/form";

export class BaseConstant {
  public static form: Form = {
    controls: [
      { name: 'guid', type: 'FormControl' },
      { name: 'deleted', type: 'FormControl' },
      { name: 'createdAt', type: 'FormControl' },
      { name: 'updatedAt', type: 'FormControl' },
      { name: 'createdBy', type: 'FormControl' },
      { name: 'updatedBy', type: 'FormControl' }
    ]
  };
}
