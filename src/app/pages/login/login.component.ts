import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReCaptcha2Component } from 'ngx-captcha';
import { Credentials } from 'src/app/core/models/credentials';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  recapchaKey: string;
  carouselSlides: any[] = [];
  @ViewChild('captchaElem', { static: false }) captchaElem!: ReCaptcha2Component;

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
    this.loginForm = this.formService.getFormLogin();
    this.recapchaKey = environment.recapchaSiteKey;
  }

  ngOnInit(): void {
  }
  login(){
    this.spinner.show();
    const credentials: Credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe(res => {
      this.authService.setToken(res);
      this.getUser();
    }, err => {
      this.spinner.hide();
      this.resetRecaptcha();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de iniciar sesión';
      this.alert.error(error);
    });
  }
  getUser(){
    const userId = this.authService.getUserId();
    this.userService.GetByGuid(userId).subscribe(res => {
      this.getBasUser(res.basClientCode!);
    }, err => {
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de obtener el usuario';
      this.alert.error(error);
    });
  }
  getBasUser(clientCode: string){
    this.basService.getClient(clientCode).subscribe(res => {
      this.spinner.hide();
      this.localStorageService.setBasClient(res);
      this.eventService.onLogIn.emit(true);
      this.nav.goToAccount();
    }, err => {
      this.spinner.hide();
      const error = err?.error ? err.error : 'Ocurrió un error al tratar de obtener el usuario BAS';
      this.alert.error(error);
    });
  }
  resetRecaptcha(){
    this.captchaElem.resetCaptcha();
  }
}