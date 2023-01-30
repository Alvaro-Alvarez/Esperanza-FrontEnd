import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductDescriptionComponent } from './product-description.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { BoxDiscountsComponent } from './box-discounts/box-discounts.component';
import { SemaphoreStockComponent } from './semaphore-stock/semaphore-stock.component';

const routes: Routes = [
  {
    path: '',
    component: ProductDescriptionComponent
  }
];

@NgModule({
  declarations: [ProductDescriptionComponent, BoxDiscountsComponent, SemaphoreStockComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    SemaphoreStockComponent
  ],
  providers: [
    CurrencyPipe
  ]
})
export class ProductDescriptionModule { }
