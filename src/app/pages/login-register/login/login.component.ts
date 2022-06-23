import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { Credentials } from 'src/app/core/models/credentials';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { EventService } from '../../../modules/shared/services/event.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  recapchaKey: string;
  @Output() complete: EventEmitter<any> = new EventEmitter();

  constructor(
    private formService: FormService,
    private authService: AuthService,
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private eventService: EventService
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
      this.spinner.hide();
      this.authService.setToken(res);
      this.eventService.onLogIn.emit(true);
      this.complete.emit();
    }, err => {
      this.spinner.hide();
      this.alert.error('Ocurrió un error al tratar iniciar sesión');
    });
  }
}
