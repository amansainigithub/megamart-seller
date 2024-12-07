import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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
// Define the ProductDataBuilder class
class ProductDataBuilder {
  constructor(
    public id: string,
    public identifier: string,
    public name: string,
    public type: string,
    public required: boolean,
    public description: string,
    public min: string,
    public max: string,
    public values: string[]
  ) {}
}
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {


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

  confirmAction(){

  }


 


productFormBuilder: FormGroup = this.fb.group({});
  formConfig: any[] = [];
  variationConfig:any[] = [];
  sizeConfig:any[] = [];
  tableConfig:any[] = [];
  isLoading = true;

//  ngOnInit(): void {
//     this.productService.getFormBuilders().subscribe((data: any) => {

//       console.log(data);
      
//       console.log("========");
//       this.formConfig = data.productDataBuilderList;
//       this.variationConfig = data.variationsDataBuilderList;
//       this.sizeConfig = data.sizeDataBuilderList;
//       console.log(data);
//       this.buildForm();
//       this.variationBuildForm();
//       this.sizeBuildForm();
//     });
//   }

//     buildForm() {
//     this.formConfig.forEach((field) => {
//       if (field.type === 'multi-select') {
//         this.productFormBuilder.addControl(
//           field.identifier,
//           this.fb.array([]) // Use FormArray for multi-select
//         );
//       } else {
//         const validators = [];
//         if (field.required) validators.push(Validators.required);
//         if (field.min !== undefined) validators.push(Validators.min(field.min));
//         if (field.max !== undefined) validators.push(Validators.max(field.max));

//         this.productFormBuilder.addControl(field.identifier, this.fb.control('', validators));
//       }
//     });
//   }

//   variationBuildForm() {
//     this.variationConfig.forEach((field) => {
//       if (field.type === 'multi-select') {
//         this.productFormBuilder.addControl(
//           field.identifier,
//           this.fb.array([]) // Use FormArray for multi-select
//         );
//       } else {
//         const validators = [];
//         if (field.required) validators.push(Validators.required);
//         if (field.min !== undefined) validators.push(Validators.min(field.min));
//         if (field.max !== undefined) validators.push(Validators.max(field.max));

//         this.productFormBuilder.addControl(field.identifier, this.fb.control('', validators));
//       }
//     });
//   }

//   sizeBuildForm() {
//     this.sizeConfig.forEach((field) => {
//       if (field.type === 'multi-select') {
//         this.productFormBuilder.addControl(
//           field.identifier,
//           this.fb.array([]) // Use FormArray for multi-select
//         );
//       } else {
//         const validators = [];
//         if (field.required) validators.push(Validators.required);
//         if (field.min !== undefined) validators.push(Validators.min(field.min));
//         if (field.max !== undefined) validators.push(Validators.max(field.max));

//         this.productFormBuilder.addControl(field.identifier, this.fb.control('', validators));
//       }
//     });
//   }

    
//     checkBawal:any[] = [];
//     onCheckboxChange(event: any, field: any) {
//     const formArray: FormArray = this.productFormBuilder.get(field.identifier) as FormArray;
//     this.checkBawal = formArray.value;

//     if (event.target.checked) {
//       formArray.push(this.fb.control(event.target.value));
//       this.checkBawal = formArray.value;
//     } else {
//       const index = formArray.controls.findIndex((control) => control.value === event.target.value);
//       formArray.removeAt(index);
//       this.checkBawal = formArray.value;
//     }

//     console.log(this.checkBawal.length);
    

//   }



//   removeOption(identifier: string, index: number) {
//     const formArray: FormArray = this.productFormBuilder.get(identifier) as FormArray;
//     formArray.removeAt(index); // Remove the specific index from FormArray
//   }
  
 

// onSubmit() {

//   console.log("---------------------------------------------------------");
  
//  console.log( this.productFormBuilder);
 

//         if (this.productFormBuilder.valid) {
//       console.log(this.productFormBuilder.value);
//       this.productService.saveProductData(this.productFormBuilder.value).subscribe({
//         next: (response) => console.log('Form submitted successfully', response),
//         error: (error) => console.error('Error submitting form', error),
//       });
//     } else {
     
//       this.productFormBuilder.markAllAsTouched();
//     }
// }



// loadProductData() {
//     this.productService.getSavedData().subscribe((savedData: any) => {

//       Object.keys(savedData).forEach((key) => {
//         const control = this.productFormBuilder.get(key);
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
//           this.productFormBuilder.patchValue(savedData);
//         }
//       });
//     });
// }





// =================================================
// form!: FormGroup;
//   rowsData: any[] = [];  // To store rows from the form

//   // Checkbox Options for table rows
// checkboxOptions = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL', '5XL'];

// // Dropdown options for each row
// dropdownOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

// selectedOptions = new Set<string>(); // Store selected checkboxes

// columns = [
//   { key: 'name', label: 'Name', type: 'text' },
//   { key: 'age', label: 'Age', type: 'number' },
//   { key: 'email', label: 'Email', type: 'email' },
//   { key: 'category', label: 'Category', type: 'text' }, // For checkbox selection
//   { key: 'dropdown', label: 'Dropdown', type: 'dropdown' } // Dropdown column
// ];

// ngOnInit() {
//   this.form = this.fb.group({
//     rows: this.fb.array([])
//   });
  
// }

// get rows(): FormArray {
//   return this.form.get('rows') as FormArray;
// }

// // Add or remove rows based on checkbox state
// onCheckboxChange(event: any) {
//   const option = event.target.value;
//   if (event.target.checked) {
//     this.selectedOptions.add(option);
//     this.addRow({ category: option }); // Add row for checked option
//   } else {
//     this.selectedOptions.delete(option);
//     this.removeRowByCategory(option); // Remove row for unchecked option
//   }
// }

// // Add new row
// addRow(data: any = {}) {
//   const row = this.fb.group({});
//   this.columns.forEach(col => {
//     if (col.type === 'dropdown') {
//       row.addControl(col.key, this.fb.control(data[col.key] || this.dropdownOptions[0], Validators.required));
//     } else {
//       row.addControl(col.key, this.fb.control(data[col.key] || '', Validators.required));
//     }
//   });
//   this.rows.push(row);
// }

// // Remove row by category
// removeRowByCategory(category: string) {
//   const index = this.rows.controls.findIndex(row => row.value.category === category);
//   if (index !== -1) {
//     this.rows.removeAt(index);
//   }
// }

// // Remove row by index
// removeRow(index: number) {
//   this.rows.removeAt(index);
// }

// // Submit form/ Handle form submission
//   loadTableData:any[] = [];
// onSubmit() {
//   if (this.form.valid) {
//     this.loadTableData =  this.form.value.rows
//      console.log('Form submitted with values:', this.form.value.rows);
//      // Process the form data here (e.g., send it to a server or handle it as needed)

//      this.productService.saveRows(this.form.value.rows).subscribe(
//        response => {
//          console.log('Data saved successfully:', response);
//          // Optionally reset the form or show a success message
//        },
//        error => {
//          console.error('Error saving data:', error);
//        }
//      );

//    } else {
//      console.log('Form is invalid!');
//    }
// }


//   loadData(){
//     this.productService.getrows().subscribe(
//       (data:any) => {
//         this.rowsData = data;  // Store the fetched rows in a variable
//         this.rows.clear();  // Clear existing rows in the form array
//         data.forEach((row: any) => {
//           this.addRow(row);  // Add rows to the form from the fetched data
//         });
//       },
//       (error) => {
//         console.error('Error fetching rows:', error);
//       }
//     );

//   } 







form!: FormGroup;
  rowsData: any[] = [];  // To store rows from the form

  // Checkbox Options for table rows
checkboxOptions = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL', '5XL'];

// Dropdown options for each row
dropdownOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

selectedOptions = new Set<string>(); // Store selected checkboxes
// columns = [
//   { key: 'name', label: 'Name', type: 'text' },
//   { key: 'age', label: 'Age', type: 'number' },
//   { key: 'email', label: 'Email', type: 'email' },
//   { key: 'category', label: 'Category', type: 'text' }, // For checkbox selection
//   { key: 'dropdown', label: 'Dropdown', type: 'dropdown' } // Dropdown column
// ];
columns:any[] = [];

ngOnInit() {
  this.form = this.fb.group({
    rows: this.fb.array([])
  });
  
    this.productService.getFormBuilders().subscribe((data: any) => {
      console.log(data);
      console.log("========");
      this.tableConfig = data.tableDataBuilderList;
      console.log(data.tableDataBuilderList);
      this.columns = data.tableDataBuilderList;

      this.formConfig = data.productDataBuilderList;
      console.log(this.formConfig);
      this.buildForm();
    });
  
  }


get rows(): FormArray {
  return this.form.get('rows') as FormArray;
}

// Add or remove rows based on checkbox state
onCheckboxChange(event: any) {
  const option = event.target.value;
  console.log(" Option "+  option);
  
  if (event.target.checked) {
    this.selectedOptions.add(option);
    this.addRow({ category: option }); // Add row for checked option
  } else {
    this.selectedOptions.delete(option);
    this.removeRowByCategory(option); // Remove row for unchecked option
  }
}

// Add new row
addRow(data: any = {}) {
  const row = this.fb.group({});
  this.columns.forEach(col => {
    if (col.type === 'dropdown') {
      row.addControl(col.identifier, this.fb.control(data[col.identifier] || this.dropdownOptions[0], Validators.required));
    } else if(col.type === 'text') {
      row.addControl(col.identifier, this.fb.control(data[col.identifier] || '', Validators.required));
    }
  });
  this.rows.push(row);
}

// Remove row by category
removeRowByCategory(category: string) {
  console.log("removeRowByCategory:: " + category);
  
  const index = this.rows.controls.findIndex(row => row.value.category === category);
  console.log("index:: " + index);
  if (index !== -1) {
    this.rows.removeAt(index);
  }
}

// Remove row by index
removeRow(index: number) {
  this.rows.removeAt(index);
}

// Submit form/ Handle form submission
  loadTableData:any[] = [];
onSubmit() {
  if (this.form.valid) {
    this.loadTableData =  this.form.value.rows
     console.log('Form submitted with values:', this.form.value.rows);
     // Process the form data here (e.g., send it to a server or handle it as needed)

     this.productService.saveRows(this.form.value.rows).subscribe(
       response => {
         console.log('Data saved successfully:', response);
         // Optionally reset the form or show a success message
       },
       error => {
         console.error('Error saving data:', error);
       }
     );

   } else {
     console.log('Form is invalid!');
   }
}


  loadData(){
    this.productService.getrows().subscribe(
      (data:any) => {
        this.rowsData = data;  // Store the fetched rows in a variable
        this.rows.clear();  // Clear existing rows in the form array
        data.forEach((row: any) => {
          this.addRow(row);  // Add rows to the form from the fetched data
        });
      },
      (error) => {
        console.error('Error fetching rows:', error);
      }
    );

  } 

    checkBawal:any[] = [];
    onCheckboxChangeFormConfig(event: any, field: any) {
    const formArray: FormArray = this.productFormBuilder.get(field.identifier) as FormArray;
    this.checkBawal = formArray.value;

    if (event.target.checked) {
      formArray.push(this.fb.control(event.target.value));
      this.checkBawal = formArray.value;
    } else {
      const index = formArray.controls.findIndex((control) => control.value === event.target.value);
      formArray.removeAt(index);
      this.checkBawal = formArray.value;
    }
    console.log(this.checkBawal.length);
  }

    buildForm() {
    this.formConfig.forEach((field) => {
      if (field.type === 'multi-select') {
        this.form.addControl(
          field.identifier,
          this.fb.array([]) // Use FormArray for multi-select
        );
      } else {
        const validators = [];
        if (field.required) validators.push(Validators.required);
        if (field.min !== undefined) validators.push(Validators.min(field.min));
        if (field.max !== undefined) validators.push(Validators.max(field.max));

        this.form.addControl(field.identifier, this.fb.control('', validators));
      }
    });
  }
}

