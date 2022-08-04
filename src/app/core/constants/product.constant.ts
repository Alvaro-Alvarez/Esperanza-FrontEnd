import { Validators } from "@angular/forms";
import { Form } from "../models/form";

export class ProductConstant {
  public static form: Form = {
    controls: [
        { name: 'galleryImages', type: 'FormArray', valueDefault: [], Validators: [] },
      { name: 'principalImageGuid', type: 'FormControl', Validators: [] },
      { name: 'name', type: 'FormControl', Validators: [] },
      { name: 'description', type: 'FormControl', Validators: [] },
      { name: 'stock', type: 'FormControl', Validators: [] },
      { name: 'minimumStock', type: 'FormControl', Validators: [] },
      { name: 'unitPrice', type: 'FormControl', Validators: [] },
      { name: 'brand', type: 'FormControl', Validators: [] },
      { name: 'crossSellingGuid', type: 'FormControl', Validators: [] },
      { name: 'upSellingGuid', type: 'FormControl', Validators: [] },
      { name: 'vademecumGuid', type: 'FormControl', Validators: [] },
      { name: 'subCategoryGuid', type: 'FormControl', Validators: [] },
      { name: 'listGuid', type: 'FormControl', Validators: [] },
      { name: 'supplierItemGuid', type: 'FormControl', Validators: [] },
      { name: 'totalPrice', type: 'FormControl', Validators: [] },
      {
        subForm: {
          name: 'principalImage',
          form: {
            controls: [
              { name: 'imagePath', type: 'FormControl', Validators: [] },
              { name: 'imageName', type: 'FormControl', Validators: [] },
              { name: 'fullName', type: 'FormControl', Validators: [] },
              { name: 'extension', type: 'FormControl', Validators: [] },
              { name: 'base64Image', type: 'FormControl', Validators: [] }
            ]
          }
        }
      },
      {
        subForm: {
          name: 'vademecum',
          form: {
            controls: [
              { name: 'code', type: 'FormControl', Validators: [] },
              { name: 'description', type: 'FormControl', Validators: [] },
              { name: 'value', type: 'FormControl', Validators: [] }
            ]
          }
        }
      },
      {
        subForm: {
          name: 'subCategory',
          form: {
            controls: [
                { name: 'code', type: 'FormControl', Validators: [] },
                { name: 'description', type: 'FormControl', Validators: [] },
                { name: 'value', type: 'FormControl', Validators: [] }
            ]
          }
        }
      },
      {
        subForm: {
          name: 'list',
          form: {
            controls: [
                { name: 'code', type: 'FormControl', Validators: [] },
                { name: 'description', type: 'FormControl', Validators: [] },
                { name: 'value', type: 'FormControl', Validators: [] }
            ]
          }
        }
      },
      {
        subForm: {
          name: 'supplierItem',
          form: {
            controls: [
                { name: 'code', type: 'FormControl', Validators: [] },
                { name: 'description', type: 'FormControl', Validators: [] },
                { name: 'value', type: 'FormControl', Validators: [] }
            ]
          }
        }
      },
      {
        subForm: {
          name: 'crossSelling',
          form: {
            controls: [
                { name: 'products', type: 'FormArray', valueDefault: [], Validators: [] },
                { name: 'withAlgorithm', type: 'FormControl', Validators: [] },
                { name: 'priorityInAlgorithm', type: 'FormControl', Validators: [] },
                { name: 'productsToShow', type: 'FormControl', Validators: [] }
            ]
          }
        }
      },
      {
        subForm: {
          name: 'upSelling',
          form: {
            controls: [
                { name: 'products', type: 'FormArray', valueDefault: [], Validators: [] },
                { name: 'withAlgorithm', type: 'FormControl', Validators: [] },
                { name: 'priorityInAlgorithm', type: 'FormControl', Validators: [] },
                { name: 'productsToShow', type: 'FormControl', Validators: [] }
            ]
          }
        }
      }
    ]
  };
}
