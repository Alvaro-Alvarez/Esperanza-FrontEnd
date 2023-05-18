import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { BasService } from 'src/app/modules/shared/services/bas.service';
import { EventService } from 'src/app/modules/shared/services/event.service';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  confirmResetForm: FormGroup;
  recapchaKey: string;
  carouselSlides: any[] = [];
  secondStep = false;
  email: string = '';

  constructor(
    private formService: FormService,
    private authService: AuthService,
    private userService: UserService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private eventService: EventService,
    public nav :RoutingService,
    private basService: BasService,
    private localStorageService: LocalStorageService
  ) {
    this.resetForm = this.formService.getFormResetPassword();
    this.confirmResetForm = this.formService.getFormConfirmResetPassword();
    this.recapchaKey = environment.recapchaSiteKey;
  }

  ngOnInit(): void {
  }
  resetPassword(){
    this.spinner.show();
    const data = this.resetForm.value;
    this.email = data.email;
    this.authService.resetPassword(data).subscribe(res => {
      this.spinner.hide();
      this.secondStep = true;
    }, err => {
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de enviar el código de verificación';
      this.alert.error(error);
    })
  }
  confirmResetPassword(){
    this.spinner.show();
    const data = this.confirmResetForm.value;
    data.email = this.email;
    this.authService.confirmResetPassword(data).subscribe(res => {
      this.spinner.hide();
      this.alert.successful('Exito!', 'Tu contraseña se cambió correctametne', ()=>{this.nav.goToLogin()})
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar de recuperar la contraseña, revise el código de verificación');
    })
  }
}
