import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { VademecumsComponent } from './vademecums.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SemaphoreVademecumComponent } from './semaphore-vademecum/semaphore-vademecum.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: VademecumsComponent
  }
];

@NgModule({
  declarations: [
    VademecumsComponent,
    SemaphoreVademecumComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    CurrencyPipe
  ]
})
export class VademecumsModule { }
