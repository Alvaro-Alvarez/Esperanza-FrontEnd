import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { RouterModule, Routes } from '@angular/router';
import { CartItemComponent } from './cart-item/cart-item.component';
import { DescriptionAndTotalComponent } from './description-and-total/description-and-total.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CompletePurchaseComponent } from './complete-purchase/complete-purchase.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PromotionInformationComponent } from './promotion-information/promotion-information.component';
import { DiscountComponent } from './discount/discount.component';

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
    DescriptionAndTotalComponent,
    CompletePurchaseComponent,
    PromotionInformationComponent,
    DiscountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CartModule { }
