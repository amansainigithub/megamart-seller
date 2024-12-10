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
 
}
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {
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


// productFormBuilder: FormGroup = this.fb.group({});
  productFieldsBuilder: any[] = [];
  variationConfig:any[] = [];
  sizeFieldBuilder:any[] = [];
  productDetailsBuilder:any[]=[];
  productDescAndOtherBuilder:any[]=[];
  isLoading = true;


  form!: FormGroup;
  rowsData: any[] = [];  // To store rows from the form
  tableFieldBuilder:any[] = [];



get productRows(): FormArray {
  return this.form.get('productRows') as FormArray;
}
get checkboxesControl(): FormArray {
  return this.form.get('productSize') as FormArray;
}

  ngOnInit() {
        this.form = this.fb.group({
          productRows: this.fb.array([]),
          productSize: this.fb.array([])
        });

        this.productService.getFormBuilders().subscribe((data: any) => {
        this.productFieldsBuilder = data.productDataBuilderList;
        this.tableFieldBuilder = data.tableDataBuilderList;
        this.sizeFieldBuilder = data.sizeDataBuilderList;
        this.productDetailsBuilder = data.productDetailsBuilderList;
        this.productDescAndOtherBuilder = data.productDescAndOtherBuilderList;
        console.log(data);
        this.productFieldsForm();
        this.tableDatabuildForm();
        this.sizeBuildForm();
        this.productDetailsForm();
        this.productDescAndOtherForm();
      });
    }

    productFieldsForm() {
    this.productFieldsBuilder.forEach((field) => {
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

  tableDatabuildForm() {
    this.tableFieldBuilder.forEach((field) => {
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
      }
    });
  }

    sizeBuildForm() {
    this.sizeFieldBuilder.forEach((field) => {
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

  productDetailsForm() {
    this.productDetailsBuilder.forEach((field) => {
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

  productDescAndOtherForm() {
    this.productDescAndOtherBuilder.forEach((field) => {
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


checkBawal:any[] = [];
onCheckboxChange(event: any, field: any) {
  // Ensure the FormArray exists, or initialize it if missing
  let formArray: FormArray = this.form.get(field.identifier) as FormArray;
  if (!formArray) {
    formArray = this.fb.array([]);
    this.form.addControl(field.identifier, formArray); // Dynamically add if not present
  }
  
  const option = event.target.value;
  if (event.target.checked) {
    formArray.push(this.fb.control(event.target.value));
    this.addTableRow({ variantSize: option }); // Add row for checked option
  } else {
    const index = formArray.controls.findIndex((control) => control.value === event.target.value);
    if (index !== -1) {
      formArray.removeAt(index);
      this.removeRowByCategory(option); // Remove row for unchecked option
    }
  }
  // Optional: Track the current state
  this.checkBawal = formArray.value;
  console.log(this.checkBawal.length);
}



// Add new row
addTableRow(data: any = {}) {
  const row = this.fb.group({});
  this.tableFieldBuilder.forEach(col => {
    if (col.type === 'dropdown') {
      row.addControl(col.identifier, this.fb.control(data[col.identifier] || col[0], Validators.required));
      console.log(row);
      
    } else if(col.type === 'text') {
      row.addControl(col.identifier, this.fb.control(data[col.identifier] || '', Validators.required));
    }
  });
  this.productRows.push(row);
}

// Remove row by category
removeRowByCategory(variantSize: string) {
  console.log("removeRowByCategory:: " + variantSize);
  const index = this.productRows.controls.findIndex(row => row.value.variantSize === variantSize);
  console.log("index:: " + index);
  if (index !== -1) {
    this.productRows.removeAt(index);
  }
}

// Remove row by index
removeRow(index: number) {
  this.productRows.removeAt(index);
}

// Submit form/ Handle form submission
  loadTableData:any[] = [];
onSubmit() {
  console.log(this.form.value);
  
  if (this.form.valid) {
    this.loadTableData =  this.form.value.rows
     console.log('Form submitted with values:', this.form.value.rows);
     // Process the form data here (e.g., send it to a server or handle it as needed)

     this.productService.saveRows(this.form.value).subscribe(
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
     this.form.markAllAsTouched();
   }
}


  loadData(){
    this.productService.getrows().subscribe(
      (data:any) => {
        console.log(data);

        //Patching the Data
        this.form.patchValue(data);
        
        //Creating Rows
        this.productRows.clear();  // Clear existing rows in the form array
        data.productRows.forEach((row: any) => {
          console.log(row);
          this.addTableRow(row);  // Add rows to the form from the fetched data
        }); 


        //Creating Multise-selection Box
        Object.keys(data).forEach((key) => {
          const control = this.form.get(key);
          console.log(control);
          
          console.log(key);
          if(key === "productSize"){
            if (control instanceof FormArray) {
              // Populate FormArray for multi-select fields
              const values: any[] = data[key];
              values.forEach((value) => {
                if (!control.value.includes(value)) {
                  control.push(this.fb.control(value));
                }
              });
            }
          }
          
        });




      },
      (error) => {
        console.error('Error fetching rows:', error);
      }


    );
  } 

    















  
}

