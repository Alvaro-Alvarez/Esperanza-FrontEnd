import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { NgxCaptchaModule } from 'ngx-captcha';

const routes: Routes = [
  {
    path: '',
    component: ContactComponent
  }
];

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ]
})
export class ContactModule { }
