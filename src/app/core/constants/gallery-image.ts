import { Validators } from "@angular/forms";
import { Form } from "../models/form";

export class GalleryImageConstant {
  public static form: Form = {
    controls: [
      { name: 'productGuid', type: 'FormControl', Validators: [] },
      { name: 'imagePath', type: 'FormControl', Validators: [] },
      { name: 'imageName', type: 'FormControl', Validators: [] },
      { name: 'fullName', type: 'FormControl', Validators: [] },
      { name: 'extension', type: 'FormControl', Validators: [] },
      { name: 'base64Image', type: 'FormControl', Validators: [] }
    ]
  };
}
