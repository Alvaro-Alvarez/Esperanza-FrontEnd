import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EssaysAndServicesComponent } from './essays-and-services.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: EssaysAndServicesComponent
  }
];

@NgModule({
  declarations: [
    EssaysAndServicesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class EssaysAndServicesModule { }
