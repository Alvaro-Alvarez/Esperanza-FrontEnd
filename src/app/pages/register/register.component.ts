import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { PageTypeEnum } from 'src/app/core/enums/page-type.enum';
import { Person } from 'src/app/core/models/person';
import { User } from 'src/app/core/models/user';
import { CarruselService } from 'src/app/modules/shared/services/carrusel.service';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  carouselSlides: any[] = [];
  enableCarousel = false;
  validPass = true;
  @Output() complete: EventEmitter<any> = new EventEmitter();

  constructor(
    private formService: FormService,
    private userService: UserService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private carruselService: CarruselService,
    public nav :RoutingService
  ) {
    this.registerForm = this.formService.getFormRegister();
  }

  ngOnInit(): void {
    this.loadPagesSlides();
    this.registerForm.get('password')?.valueChanges.subscribe(val => {
      this.validatePass();
    })
    this.registerForm.get('repeatPassword')?.valueChanges.subscribe(val => {
      this.validatePass();
    })
  }
  register(){
    this.spinner.show();
    let user: User = new User()
    user.person = new Person();
    user.email = this.registerForm.get('username')?.value;
    user.pass = this.registerForm.get('password')?.value;
    user.basClientCode = this.registerForm.get('basClientCode')?.value;
    user.person.names = this.registerForm.get('name')?.value;
    user.person.surnames = this.registerForm.get('surname')?.value;
    user.person.cuit = this.registerForm.get('cuit')?.value;
    this.userService.post(user).subscribe(res => {
      this.spinner.hide();
      this.alert.successful('Exito!', 'Usuario registrado correctamente', ()=>{this.onComplete()})
    },err =>{
      debugger
      console.error(err);
      this.spinner.hide();
      this.alert.error(err.error);
    });
  }
  onComplete(){
    this.complete.emit();
    this.nav.goToLogin();
  }
  validatePass(){
    const pass = this.registerForm.get('password')?.value;
    const rPass = this.registerForm.get('repeatPassword')?.value;
    if (!rPass) return;
    this.validPass = pass === rPass;
    if (!this.validPass) this.registerForm.get('repeatPassword')?.setErrors([true]);
    else this.registerForm.get('repeatPassword')?.setErrors(null);
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
}
