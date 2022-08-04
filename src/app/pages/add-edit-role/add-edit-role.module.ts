import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditRoleComponent } from './add-edit-role.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AddEditRoleComponent
  }
];

@NgModule({
  declarations: [
    AddEditRoleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AddEditRoleModule { }
