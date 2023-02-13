import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaboratoryComponent } from './laboratory.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: LaboratoryComponent
  }
];

@NgModule({
  declarations: [
    LaboratoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class LaboratoryModule { }
