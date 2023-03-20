import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { BestSellersComponent } from './best-sellers.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CustomerSemaphoreStockMoresellersComponent } from './customer-semaphore-stock-moresellers/customer-semaphore-stock-moresellers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: BestSellersComponent
  }
];

@NgModule({
  declarations: [
    BestSellersComponent,
    CustomerSemaphoreStockMoresellersComponent
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
export class BestSellersModule { }
