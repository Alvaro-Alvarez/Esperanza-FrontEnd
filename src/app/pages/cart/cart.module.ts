import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { RouterModule, Routes } from '@angular/router';
import { CartItemComponent } from './cart-item/cart-item.component';
import { DescriptionAndTotalComponent } from './description-and-total/description-and-total.component';

const routes: Routes = [
  {
    path: '',
    component: CartComponent
  }
];

@NgModule({
  declarations: [
    CartComponent,
    CartItemComponent,
    DescriptionAndTotalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CartModule { }
