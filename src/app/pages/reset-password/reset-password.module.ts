import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxCaptchaModule } from 'ngx-captcha';
import { SharedModule } from 'src/app/modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordComponent
  }
];

@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ]
})
export class ResetPasswordModule { }
