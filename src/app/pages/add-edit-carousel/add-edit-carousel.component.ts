import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, of } from 'rxjs';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { MasterDataService } from 'src/app/modules/shared/services/master-data.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { CarruselService } from '../../modules/shared/services/carrusel.service';
import { CarouselSlideComponent } from './carousel-slide/carousel-slide.component';

@Component({
  selector: 'app-add-edit-carousel',
  templateUrl: './add-edit-carousel.component.html',
  styleUrls: ['./add-edit-carousel.component.scss']
})
export class AddEditCarouselComponent implements OnInit {

  title: string;
  carouselPages: any[] = [];
  newPagesType: any[] = [];
  pagesType: any[] = [];
  carousel!: any;
  form: FormGroup;
  id: string;
  isEdit = false;

  constructor(
    private formService: FormService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private routingService: RoutingService,
    private route: ActivatedRoute,
    private carruselService: CarruselService,
    private masterDataService: MasterDataService,
    private modalService: NgbModal,
  ) {
    this.id = this.route.snapshot.params['id'];
    this.isEdit = this.id !== '0'
    this.form = this.formService.getFormCarousel();
    this.title = this.isEdit ? 'Editar carrusel' : 'Nuevo carrusel';
  }

  ngOnInit(): void {
    this.loadOptions();
    if (this.isEdit) this.getCarousel();
    if (!this.isEdit) this.form.get('enable')?.setValue(true);
  }
  addOrUpdateCarousel(){
    if (this.isEdit) this.updateCarousel();
    else this.addNewCarousel();
  }
  getForm(control: AbstractControl): FormGroup { 
    return control as FormGroup;
   }
   getCarousel(){
    this.spinner.show();
    this.carruselService.getById(this.id).subscribe(res => {
      this.carousel = res;
      this.patchValue(res);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar obtener el carrusel');
    });
  }
  addNewCarousel(){
    this.spinner.show();
    const carousel: any = this.form.value;
    this.carruselService.post(carousel).subscribe(res => {
      this.spinner.hide();
      this.alert.successful('Exito!', 'Carrusel registrado correctamente', ()=>{this.routingService.goToCarousels()})
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de dar de alta el nuevo carrusel');
    });
  }
  updateCarousel(){
    this.spinner.show();
    const carousel: any = this.form.value;
    this.carruselService.put(carousel).subscribe(res => {
      this.spinner.hide();
      this.alert.successful('Exito!', 'Carrusel actualizado!', ()=>{this.routingService.goToCarousels()})
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de dar de actualizar el carrusel');
    });
  }
  loadOptions(){
    this.spinner.show();
    let promCarouselPages = of(this.carouselPages);
    let promPagesType = of(this.pagesType);
    if (this.carouselPages.length === 0 || this.pagesType.length === 0){
      promCarouselPages = this.carruselService.getAll();
      promPagesType = this.masterDataService.getPageTypes();
    }
    forkJoin([promCarouselPages, promPagesType]).subscribe(arrOptions => {
      this.spinner.hide();
      this.carouselPages = arrOptions[0];
      const newP: any = [];
      arrOptions[1].forEach(pageType => {
        const pagCarousel = this.carouselPages.find(c => c.idPageType === pageType.guid);
        if (!pagCarousel || this.isEdit) newP.push(pageType);
      });
      this.newPagesType = newP;
    }, err =>{
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de obtener las opciones');
    });
  }
  newSlide(){
    const modalRef = this.modalService.open(CarouselSlideComponent, { centered: true, backdrop: 'static', size: 'lg' });
    modalRef.componentInstance.slides = this.form.get('slides')?.value;
    modalRef.componentInstance.isEdit = false;
    modalRef.componentInstance.complete.subscribe((res: any) => {
      this.modalService.dismissAll();
      const slides = this.form.get('slides') as FormArray;
      const newFormSlide = this.formService.getFormCarouselSlide();
      newFormSlide.patchValue(res);
      slides.push(newFormSlide);
    })
  }
  updateSlide(slide: any, index: number){
    const modalRef = this.modalService.open(CarouselSlideComponent, { centered: true, backdrop: 'static', size: 'lg' });
    modalRef.componentInstance.slide = slide;
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.complete.subscribe((res: any) => {
      this.modalService.dismissAll();
      const slides = this.form.get('slides') as FormArray;
      const slide = slides.at(index);
      slide.patchValue(res);
    })
  }
  askAction(index: number){
    this.alert.warning('Cuidado!', 'Estas por eliminar una diapositiva, estás de acuerdo?', ()=>{this.removeSlide(index)})
  }
  removeSlide(index: number){
    if (!this.isEdit){
      const slides = this.form.get('slides') as FormArray;
      slides.removeAt(index)
    }
    else{
      const slides = this.form.get('slides') as FormArray;
      const slide = slides.at(index);
      const guid = slide.get('guid')?.value;
      if (guid) slide.get('deleted')?.setValue(true);
      else slides.removeAt(index);
    }
  }
  private patchValue(page: any){
    const slides = this.form.get('slides') as FormArray;
    slides.clear();
    this.form.patchValue(page);
    page.slides?.map((slide: any) => {
      const slideForm = this.formService.getFormCarouselSlide();
      slideForm.patchValue(slide);
      slides.push(slideForm);
    });
    console.log(this.form.value);
  }
  get slides(): any { return this.form.get('slides'); }
}
