import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FormService } from '../../services/form.service';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  @Input() parentForm?: FormGroup;
  @Input() formServiceMethodName?: 'getFormCarouselSlide';
  @Input() keyArray!: string;
  @Input() parentFormName!: string;
  @Input() titleDragAndDrop!: string;
  @Input() multipleFile: boolean = true;
  @Input() document: boolean = false;
  @Input() clarifications?: string;
  @Input() limit: number = 50;
  
  constructor(
    private sanitizer: DomSanitizer,
    private formService: FormService,
    private alert: SweetAlertService
  ) { }

  ngOnInit(): void { }
  handleUpload(event: any) {
    let files: any[] = event.target.files;
    for(let i = 0; i < files.length; i++){
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        this.addToForm(reader.result as string);
      };
    }
  }
  transformImage(base64Image: any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }
  addToForm(base64Image: string){
    if (this.keyArray){
      const imgFormArr = this.parentForm?.get(this.keyArray) as FormArray;
      if (imgFormArr.length < this.limit){
        const imgForm = this.formService[this.formServiceMethodName!]();
        imgForm.patchValue(this.newImage(base64Image));
        imgFormArr.push(imgForm);
      }
    }
    else{
      this.parentForm?.get('base64Image')?.setValue(base64Image);
    }
  }
  newImage(base64Image: string): any{
    return { base64Image: base64Image }
  }
  askRemove(row: any, arr: boolean, index: number = 0){
    this.alert.warning('Eliminar', 'Estas seguro que desea eliminar esta imagen?', ()=>{this.remove(row, arr, index)})
  }
  remove(row: any, arr: boolean, index: number){
    if(arr){
      if(row.id){
        row.base64Image = null;
        row.deleted = true;
      }
      else{
        let imgFormArr = this.parentForm?.get(this.keyArray) as FormArray;
        imgFormArr.removeAt(index);
      }
    }
    else this.parentForm?.get('base64Image')?.reset();
  }
}
