import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { InformationComponent } from './information/information.component';
import { DescriptionComponent } from './description/description.component';
import { UpSellingComponent } from './up-selling/up-selling.component';
import { CrossSellingComponent } from './cross-selling/cross-selling.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  }
];

@NgModule({
  declarations: [
    ProductComponent,
    GalleryComponent,
    InformationComponent,
    DescriptionComponent,
    UpSellingComponent,
    CrossSellingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProductModule { }
