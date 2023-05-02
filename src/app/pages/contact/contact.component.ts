import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { PageTypeEnum } from 'src/app/core/enums/page-type.enum';
import { CarruselService } from 'src/app/modules/shared/services/carrusel.service';
import { ContactService } from 'src/app/modules/shared/services/contact.service';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  carouselSlides: any[] = [];
  enableCarousel = false;
  recapchaKey: string;

  constructor(
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private carruselService: CarruselService,
    private formService: FormService,
    private routingService: RoutingService,
    private contactService: ContactService
  ) {
    this.contactForm = this.formService.getFormContact();
    this.recapchaKey = environment.recapchaSiteKey;
  }

  ngOnInit(): void {
    this.loadPagesSlides();
  }
  loadPagesSlides(){
    this.spinner.show();
    let obs = [];
    obs.push(this.carruselService.getByPageType(PageTypeEnum.Default));
    forkJoin(obs).subscribe(arrOptions => {
      this.spinner.hide();
      this.carouselSlides.push(...arrOptions[0].slides);
      this.enableCarousel = arrOptions[0].enable;
    }, err =>{
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
  sendMessage(){
    this.spinner.show();
    this.contactService.sendMessage(this.contactForm.value).subscribe(res => {
      this.spinner.hide();
      this.alert.successful('Exito!', 'Tu mensaje se envió correctamente', ()=>{this.routingService.goToHome()})
    }, err =>{
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de realizar el pedido, comuniquese con el administrador';
      this.alert.error(error);
    });
  }
}
