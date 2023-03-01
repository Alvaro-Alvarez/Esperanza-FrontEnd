import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CustomerProductsComponent } from './customer-products.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CustomerSemaphoreStockComponent } from './customer-semaphore-stock/customer-semaphore-stock.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: CustomerProductsComponent
  }
];

@NgModule({
  declarations: [
    CustomerProductsComponent,
    CustomerSemaphoreStockComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbModule
  ],
  providers: [
    CurrencyPipe
  ]
})
export class CustomerProductsModule { }
