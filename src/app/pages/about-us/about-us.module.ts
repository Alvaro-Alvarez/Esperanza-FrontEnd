import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AboutUsCardsComponent } from './about-us-cards/about-us-cards.component';

const routes: Routes = [
  {
    path: '',
    component: AboutUsComponent
  }
];


@NgModule({
  declarations: [
    AboutUsComponent,
    AboutUsCardsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class AboutUsModule { }
