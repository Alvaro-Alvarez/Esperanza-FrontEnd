import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from 'src/app/modules/shared/services/form.service';

@Component({
  selector: 'app-carousel-slide',
  templateUrl: './carousel-slide.component.html',
  styleUrls: ['./carousel-slide.component.scss']
})
export class CarouselSlideComponent implements OnInit {

  @Input() slide: any;
  @Input() isEdit: any;
  @Input() slides: any[] = [];
  formSlide: FormGroup;
  invalidOrder: boolean = false;
  @Output() complete: EventEmitter<any> = new EventEmitter();

  constructor(
    private formService: FormService,
    public modal: NgbActiveModal
    ) {
      this.formSlide = formService.getFormCarouselSlide();
    }

  ngOnInit(): void {
    if(this.isEdit) this.formSlide.patchValue(this.slide);
    this.formSlide.get('slideOrder')?.valueChanges.subscribe(res => {
      const slide = this.slides.find(s => s.slideOrder === res);
      this.invalidOrder = slide != undefined;
    });
    
    const check = this.formSlide.get('isPhoneDimension')?.value;
    if (check === undefined || check === null)
      this.formSlide.get('isPhoneDimension')?.setValue(false);
    const orders = this.slides.map(s => s.slideOrder);
    const max = orders.length > 0 ? Math.max(...orders) : 0;
    this.formSlide.get('slideOrder')?.setValue(max+1);
  }
  close(){
    this.modal.dismiss();
  }
  finish(){
    this.complete.emit(this.formSlide.value);
  }
  get imageForm(): any { return this.formSlide.get('image'); }
}
