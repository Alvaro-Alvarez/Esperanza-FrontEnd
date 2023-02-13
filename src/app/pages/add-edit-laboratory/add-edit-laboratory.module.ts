import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditLaboratoryComponent } from './add-edit-laboratory.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AddEditLaboratoryComponent
  }
];

@NgModule({
  declarations: [
    AddEditLaboratoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AddEditLaboratoryModule { }
