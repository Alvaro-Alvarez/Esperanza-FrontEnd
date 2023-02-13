import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductLaboratoryComponent } from './product-laboratory.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ProductLaboratoryComponent
  }
];

@NgModule({
  declarations: [
    ProductLaboratoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProductLaboratoryModule { }
