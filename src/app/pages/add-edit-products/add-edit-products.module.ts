import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditProductsComponent } from './add-edit-products.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AddEditProductsComponent
  }
];

@NgModule({
  declarations: [
    AddEditProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AddEditProductsModule { }
