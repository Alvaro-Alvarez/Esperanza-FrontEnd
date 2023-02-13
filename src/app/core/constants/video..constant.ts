import { Validators } from "@angular/forms";
import { Form } from "../models/form";

export class VideoConstant {
    public static form: Form = {
        controls: [
          { name: 'videoTitle', type: 'FormControl', Validators: [Validators.required] },
          { name: 'videoDescription', type: 'FormControl', Validators: [] },
          { name: 'externalVideo', type: 'FormControl', Validators: [Validators.required] },
          { name: 'externalLink', type: 'FormControl', Validators: [] },
          { name: 'idVideo', type: 'FormControl', Validators: [] },
          { name: 'idThumbnail', type: 'FormControl', Validators: [] },
          {
            subForm: {
              name: 'video',
              form: {
                controls: [
                  { name: 'fullName', type: 'FormControl', Validators: [] },
                  { name: 'extension', type: 'FormControl', Validators: [] },
                  { name: 'base64Image', type: 'FormControl', Validators: [Validators.required] }
                ]
              }
            }
          },
          {
            subForm: {
              name: 'thumbnail',
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
