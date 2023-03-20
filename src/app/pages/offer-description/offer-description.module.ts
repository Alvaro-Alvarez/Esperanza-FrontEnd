import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { OfferDescriptionComponent } from './offer-description.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { DiscountComponent } from './discount/discount.component';

const routes: Routes = [
  {
    path: '',
    component: OfferDescriptionComponent
  }
];

@NgModule({
  declarations: [
    OfferDescriptionComponent,
    DiscountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    CurrencyPipe
  ]
})
export class OfferDescriptionModule { }
