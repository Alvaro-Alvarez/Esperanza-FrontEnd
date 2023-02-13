import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditVideoComponent } from './add-edit-video.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AddEditVideoComponent
  }
];

@NgModule({
  declarations: [
    AddEditVideoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AddEditVideoModule { }
