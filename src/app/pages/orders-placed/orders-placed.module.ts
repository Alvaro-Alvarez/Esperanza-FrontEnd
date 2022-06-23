import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersPlacedComponent } from './orders-placed.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: OrdersPlacedComponent
  }
];

@NgModule({
  declarations: [
    OrdersPlacedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class OrdersPlacedModule { }
