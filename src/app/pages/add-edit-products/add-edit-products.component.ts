import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { MasterDataService } from 'src/app/modules/shared/services/master-data.service';
import { RoutingService } from 'src/app/modules/shared/services/routing.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { SweetAlertService } from 'src/app/modules/shared/services/sweet-alert.service';
import { Option } from '../../core/models/option';
import { forkJoin, of } from 'rxjs';
import { ProductService } from 'src/app/modules/shared/services/product.service';

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
    private spinner: SpinnerService,
    private alert: SweetAlertService,
    private routingService: RoutingService,
    private route: ActivatedRoute,
    private masterDataService: MasterDataService,
    private productService: ProductService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.isEdit = this.id !== '0'
    this.productForm = this.formService.getFormProduct();
    this.title = this.isEdit ? 'Editar Producto' : 'Nuevo Producto';
  }

  ngOnInit(): void {
    // this.loadOptions();
    // if (this.isEdit) this.getProduct();
  }
  addOrUpdateUser(){
    // if (this.isEdit) this.update();
    // else this.insert();
  }
  getForm(control: AbstractControl): FormGroup { 
    return control as FormGroup;
   }
  getProduct(){
    // this.spinner.show();
    // this.productService.getByGuid(this.id).subscribe(res => {
    //   this.product = res;
    //   this.productForm.patchValue(res);
    //   this.spinner.hide();
    // }, err => {
    //   this.spinner.hide();
    //   this.alert.error('Ocurrió un error al tratar obtener el producto');
    // });
  }
  // insert(){
  //   this.spinner.show();
  //   const product: Product = this.productForm.value;
  //   this.productService.post(product).subscribe(res => {
  //     this.spinner.hide();
  //     this.alert.successful('Exito!', 'Producto registrado correctamente', ()=>{this.routingService.goToUsers()})
  //   }, err => {
  //     this.spinner.hide();
  //     this.alert.error('Ocurrió un error al tratar de dar de alta el nuevo producto');
  //   });
  // }
  // update(){
  //   this.spinner.show();
  //   const product: Product = this.productForm.value;
  //   this.productService.put(product).subscribe(res => {
  //     this.spinner.hide();
  //     this.alert.successful('Exito!', 'Producto actualizado!', ()=>{this.routingService.goToUsers()})
  //   }, err => {
  //     this.spinner.hide();
  //     this.alert.error('Ocurrió un error al tratar de dar de actualizar el producto');
  //   });
  // }
  // private loadOptions(){
  //   this.spinner.show();
  //   let promVademecums = of(this.optionsVademecums);
  //   let promSubCategories = of(this.optionsSubCategories);
  //   let promLists = of(this.optionsLists);
  //   let promSupplierItems = of(this.optionsSupplierItems);
  //   let promLines = of(this.optionsLines);
  //   let promKinds = of(this.optionsKinds);
  //   let promCategories = of(this.optionsCategories);
  //   if (this.optionsVademecums.length === 0 || this.optionsSubCategories.length === 0 || this.optionsLists.length === 0
  //     || this.optionsSupplierItems.length === 0 || this.optionsLines.length === 0 || this.optionsKinds.length === 0
  //     || this.optionsCategories.length === 0){
  //     promVademecums = this.masterDataService.getVademecums();
  //     promSubCategories = this.masterDataService.getCategories();
  //     promLists = this.masterDataService.getLists();
  //     promSupplierItems = this.masterDataService.getSupplierItems();
  //     promLines = this.masterDataService.getLines();
  //     promKinds = this.masterDataService.getKinds();
  //     promCategories = this.masterDataService.getCategories();
  //   }
  //   forkJoin([promVademecums, promSubCategories, promLists,
  //             promSupplierItems, promLines, promKinds,
  //             promCategories]).subscribe(arrOptions => {
  //     this.spinner.hide();
  //     this.optionsVademecums = arrOptions[0];
  //     this.optionsSubCategories = arrOptions[1];
  //     this.optionsLists = arrOptions[2];
  //     this.optionsSupplierItems = arrOptions[3];
  //     this.optionsLines = arrOptions[4];
  //     this.optionsKinds = arrOptions[5];
  //     this.optionsCategories = arrOptions[6];
  //   }, err =>{
  //     this.spinner.hide();
  //     this.alert.error('Ocurrió un error al tratar de obtener las opciones');
  //   });
  // }
}
