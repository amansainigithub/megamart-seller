import { Component } from '@angular/core';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from '../../../../_services/sharedService/shared-data.service';
import { HttpClient } from '@angular/common/http';
import { ProductServiceService } from '../../../../_services/productServices/product-service.service';
import { filter } from 'rxjs';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { FormBuilder, FormControl } from '@angular/forms';
interface Field {
  identifier: string; // This must match the type used as keys in formControls
  mandatory: boolean;
}

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})




export class SingleProductComponent {


  formData: any = {
    username :null,
    sellerStoreName:null,
    categoryId :null,
    productName:null,
    productSubTitle:null,
    sizeVarient:null,
    gst:null,
    hsnCode:null,
    productWeight:null,
    styleCode:null,
    netQuantity:null,
    productLength:null,
    productBreath:null,
    productHeight:null,
    material:null,
    productType:null,
    manufactureDetails:null,
    packerDetails:null,
    tags:null,
    description:null,
    sku:null,
    identifier:null,
    searchKey:null,
    sellActualPrice:null,
    defectiveReturnPrice:null,
    mrp:null,
    inventory:null,
    productColor:'Red',
    pVariants:[],
  };

  hsnCodeList:any="";
  sizeList:any="";
  netQuantityList:any="";
  materialList:any="";
  catalogTypeList:any="";
  gstList:any;
  weightList:any;
  lengthList:any;
  breathList:any;
  heightList:any;

  receivedData:any;

  constructor( 
    private tokenStorage: TokenStorageService, 
    private toast:NgToastService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private sharedDataService:SharedDataService,
    private http: HttpClient,
    private productService:ProductServiceService,
    private fb: FormBuilder,) {    }

      

  isModalOpen = false;
  // Function to open the modal
  openModal() {
    this.isModalOpen = true;
  }

  // Function to close the modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Save Catalog
  confirmAction() {
    this.saveCatalog();
  }
  clickMe(){
    alert("seconds")
  }

  singleProduct(){
    alert("first")
  }

  saveCatalog() {
    console.log("=================================");
    console.log(this.formData);
    console.log("=================================");
  
  }


  // ========================================================================
  // dynamicForm: FormGroup = this.fb.group({});
  // formConfig: any[] = [];
  // isLoading = true;


  // ngOnInit(): void {
  //   // this.productService.dynamicFormCreation().subscribe((data: any) => {
  //   //   this.formConfig = data.product_data;
  //   //   console.log(data);
      
  //   //   this.buildForm();
  //   //   this.isLoading = false;
  //   // });

  //   this.setDummyData()

  // }

  // setDummyData() {
  //   this.productService.setDummy().subscribe((data: any) => {
  //     this.formConfig = data;
  //     console.log(data);
      
  //     this.buildForm();
  //     alert('Dummy data set successfully!');
  //   });
  // }

  // buildForm() {
  //   const formControls: any = {};
  //   this.formConfig.forEach((field) => {
  //     const control = this.fb.control(
  //       field.type === 'text' ? '' : null,
  //       field.mandatory ? Validators.required : []
  //     );

  //     if (field.min !== null && field.max !== null) {
  //       control.addValidators([Validators.min(field.min), Validators.max(field.max)]);
  //     }
  //     formControls[field.identifier] = control;
  //   });
  //   this.dynamicForm = this.fb.group(formControls);
  // }

  // onSubmit() {
  //   if (this.dynamicForm.valid) {
  //     console.log(this.dynamicForm);
      
  //     console.log('Form Data:', this.dynamicForm.value);
  //     alert('Form submitted successfully!');
  //   } else {
  //     this.dynamicForm.markAllAsTouched();
  //   }
  // }

//  manufacturerForm:any= FormGroup;
//   fieldConfig: any;
//   currentId: number | null = null;

//   ngOnInit(): void {
//     this.manufacturerForm = this.fb.group({});
//     this.loadFormConfig();
//   }

//   loadFormConfig(): void {
//     this.productService.dynamicFormCreation().subscribe((config:any) => {
//       this.fieldConfig = config;
//       console.log(config);
      
//       this.createForm(config.fields);
//     });
//   }

// // Create form dynamically based on the config
// createForm(fields: any[]): void {
//   fields.forEach(field => {
//     const validators = field.mandatory ? [Validators.required] : [];
//     console.log(validators);
    
//     if (field.type === 'text') {
//       this.manufacturerForm.addControl(field.identifier, this.fb.control('', validators));
//     }
//     if (field.type === 'dropdown') {
//       this.manufacturerForm.addControl(field.identifier, this.fb.control('', validators));
//     }
//     // You can add more types (e.g., select, checkbox) here
//   });
// }



// save(): void {
//   if (this.manufacturerForm.valid) {
//     const formData = this.manufacturerForm  ;
//     console.log("=========save the Data ================");
    
//     console.log(formData);
    
//       this.productService.saveFormData(formData).subscribe(response => {
//         console.log('Saved successfully', response);
//       });
    
//   }
// }


// loadManufacturerDetails(id: number): void {
//   this.productService.getManufacturerDetailsById(id).subscribe(data => {
//     this.manufacturerForm.patchValue(data); // Populate the form with existing data
//   });
// }


// getControl(name: string) {
//   return this.manufacturerForm.get(name);
// }

// ===========================================================================
// ===========================================================================
// ===========================================================================


// dynamicForm: FormGroup = this.fb.group({});
//   formConfig: any[] = [];


//   ngOnInit(): void {
//     this.dynamicForm = this.fb.group({});
//     this.loadFormConfig();
//   }

//   loadFormConfig() {
//     this.productService.dynamicFormCreation().subscribe((config:any) => {
//       this.formConfig = config;
//       this.buildForm();
//     });
//   }

//   buildForm() {
//     this.formConfig.forEach((field) => {
//       if (field.type === 'multi-select') {
//         this.dynamicForm.addControl(
//           field.identifier,
//           this.fb.array([]) // Use FormArray for multi-select
//         );
//       } else {
//         const validators = [];
//         if (field.required) validators.push(Validators.required);
//         if (field.min !== undefined) validators.push(Validators.min(field.min));
//         if (field.max !== undefined) validators.push(Validators.max(field.max));

//         this.dynamicForm.addControl(field.identifier, this.fb.control('', validators));
//       }
//     });
//   }

//   onCheckboxChange(event: any, field: any) {
//     const formArray: FormArray = this.dynamicForm.get(field.identifier) as FormArray;
//     if (event.target.checked) {
//       formArray.push(this.fb.control(event.target.value));
//     } else {
//       const index = formArray.controls.findIndex((control) => control.value === event.target.value);
//       formArray.removeAt(index);
//     }
//   }

//   onSubmit() {
//     if (this.dynamicForm.valid) {

//       console.log(this.dynamicForm);
      

//       this.productService.saveFormData(this.dynamicForm.value).subscribe({
//         next: (response) => console.log('Form submitted successfully', response),
//         error: (error) => console.error('Error submitting form', error),
//       });
//     } else {
//       console.error('Form is invalid');
//     }
//   }


//   loadSavedData() {
//     this.productService.getSavedData().subscribe((savedData: any) => {

//       Object.keys(savedData).forEach((key) => {
//         const control = this.dynamicForm.get(key);
//         console.log(key);
        
  
//         if (control instanceof FormArray) {
//           // Populate FormArray for multi-select fields
//           const values: any[] = savedData[key];
//           values.forEach((value) => {
//             if (!control.value.includes(value)) {
//               control.push(this.fb.control(value));
//             }
//           });
//         } else {
//           // Populate regular form controls
//           //control?.setValue(savedData[key]);
//           this.dynamicForm.patchValue(savedData);
//         }
//       });
//     });
// }


productFormBuilder: FormGroup = this.fb.group({});
  formConfig: any[] = [];
  isLoading = true;

 ngOnInit(): void {
    this.productService.getFormBuilders().subscribe((data: any) => {
      console.log(data.productData);
      console.log("========");
      this.formConfig = data;
      console.log(data);
      this.buildForm();
    });
  }

    buildForm() {
    this.formConfig.forEach((field) => {
      if (field.type === 'multi-select') {
        this.productFormBuilder.addControl(
          field.identifier,
          this.fb.array([]) // Use FormArray for multi-select
        );
      } else {
        const validators = [];
        if (field.required) validators.push(Validators.required);
        if (field.min !== undefined) validators.push(Validators.min(field.min));
        if (field.max !== undefined) validators.push(Validators.max(field.max));

        this.productFormBuilder.addControl(field.identifier, this.fb.control('', validators));
      }
    });
  }

    onCheckboxChange(event: any, field: any) {
    const formArray: FormArray = this.productFormBuilder.get(field.identifier) as FormArray;
    if (event.target.checked) {
      formArray.push(this.fb.control(event.target.value));
    } else {
      const index = formArray.controls.findIndex((control) => control.value === event.target.value);
      formArray.removeAt(index);
    }
  }

onSubmit() {
        if (this.productFormBuilder.valid) {
      console.log(this.productFormBuilder.value);
      this.productService.saveProductData(this.productFormBuilder.value).subscribe({
        next: (response) => console.log('Form submitted successfully', response),
        error: (error) => console.error('Error submitting form', error),
      });
    } else {
     
      this.productFormBuilder.markAllAsTouched();
    }
}



loadProductData() {
    this.productService.getSavedData().subscribe((savedData: any) => {

      Object.keys(savedData).forEach((key) => {
        const control = this.productFormBuilder.get(key);
        console.log(key);
        
  
        if (control instanceof FormArray) {
          // Populate FormArray for multi-select fields
          const values: any[] = savedData[key];
          values.forEach((value) => {
            if (!control.value.includes(value)) {
              control.push(this.fb.control(value));
            }
          });
        } else {
          // Populate regular form controls
          //control?.setValue(savedData[key]);
          this.productFormBuilder.patchValue(savedData);
        }
      });
    });
}




}

