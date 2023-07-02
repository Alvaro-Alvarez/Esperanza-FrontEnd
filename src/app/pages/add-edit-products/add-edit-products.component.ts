import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { Option } from '../../core/models/option';

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.scss']
})
export class AddEditProductsComponent implements OnInit {

  optionsVademecums: Option[] = [];
  optionsSubCategories: Option[] = [];
  optionsLists: Option[] = [];
  optionsSupplierItems: Option[] = [];
  optionsLines: Option[] = [];
  optionsKinds: Option[] = [];
  optionsCategories: Option[] = [];

  title: string;
  product!: Product;
  productForm: FormGroup;
  id: string;
  isEdit = false;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params['id'];
    this.isEdit = this.id !== '0'
    this.productForm = this.formService.getFormProduct();
    this.title = this.isEdit ? 'Editar Producto' : 'Nuevo Producto';
  }

  ngOnInit(): void {
  }
  addOrUpdateUser(){
  }
  getForm(control: AbstractControl): FormGroup { 
    return control as FormGroup;
   }
  getProduct(){
  }
}
