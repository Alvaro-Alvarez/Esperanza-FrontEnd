import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaboratoriesComponent } from './laboratories.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: LaboratoriesComponent
  }
];

@NgModule({
  declarations: [
    LaboratoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class LaboratoriesModule { }
