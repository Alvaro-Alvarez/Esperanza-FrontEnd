import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsCtacteComponent } from './documents-ctacte.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: DocumentsCtacteComponent
  }
];

@NgModule({
  declarations: [
    DocumentsCtacteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class DocumentsCtacteModule { }
