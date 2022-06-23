import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditProductsComponent } from './add-edit-products.component';
import { RouterModule, Routes } from '@angular/router';

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
  ]
})
export class AddEditProductsModule { }
