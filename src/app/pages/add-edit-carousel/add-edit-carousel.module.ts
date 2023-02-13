import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditCarouselComponent } from './add-edit-carousel.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselSlideComponent } from './carousel-slide/carousel-slide.component';

const routes: Routes = [
  {
    path: '',
    component: AddEditCarouselComponent
  }
];

@NgModule({
  declarations: [
    AddEditCarouselComponent,
    CarouselSlideComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AddEditCarouselModule { }
