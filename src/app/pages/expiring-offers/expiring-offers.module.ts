import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpiringOffersComponent } from './expiring-offers.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { DiscountComponent } from './discount/discount.component';

const routes: Routes = [
  {
    path: '',
    component: ExpiringOffersComponent
  }
];

@NgModule({
  declarations: [
    ExpiringOffersComponent,
    DiscountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ExpiringOffersModule { }
