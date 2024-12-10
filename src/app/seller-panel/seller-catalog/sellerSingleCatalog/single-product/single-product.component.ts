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


 


// productFormBuilder: FormGroup = this.fb.group({});
  formConfig: any[] = [];
  variationConfig:any[] = [];
  sizeConfig:any[] = [];
  tableConfig:any[] = [];
  isLoading = true;


form!: FormGroup;
rowsData: any[] = [];  // To store rows from the form
columns:any[] = [];



get rows(): FormArray {
  return this.form.get('rows') as FormArray;
}
get checkboxesControl(): FormArray {
  return this.form.get('size') as FormArray;
}

  ngOnInit() {
        this.form = this.fb.group({
          rows: this.fb.array([]),
          size: this.fb.array([])
        });

        this.productService.getFormBuilders().subscribe((data: any) => {
        this.formConfig = data.productDataBuilderList;
        this.columns = data.tableDataBuilderList;
       
        this.sizeConfig = data.sizeDataBuilderList;
        console.log(data);
        this.buildForm();
        this.tableDatabuildForm();
        this.sizeBuildForm();
      });
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

  tableDatabuildForm() {
    this.columns.forEach((field) => {
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

        this.form.value.rows.addControl(field.identifier, this.fb.control('', validators));
      }
    });
  }

    sizeBuildForm() {
    this.sizeConfig.forEach((field) => {
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
    this.addRow({ category: option }); // Add row for checked option
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
addRow(data: any = {}) {
  const row = this.fb.group({});
  this.columns.forEach(col => {
    if (col.type === 'dropdown') {
      row.addControl(col.identifier, this.fb.control(data[col.identifier] || col[0], Validators.required));
      console.log(row);
      
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
  console.log(this.form);
  
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
     this.form.markAllAsTouched();
   }
}


  loadData(){
    this.productService.getrows().subscribe(
      (data:any) => {
        console.log(data);
        this.form.patchValue(data);
        this.rowsData = data.rowData;  // Store the fetched rows in a variable
        console.log(this.rowsData);
        

        //Creating Rows
        this.rows.clear();  // Clear existing rows in the form array
        data.rowData.forEach((row: any) => {
          console.log(row);
          this.addRow(row);  // Add rows to the form from the fetched data
        }); 

        //Creating Multise-selection Box
        Object.keys(data).forEach((key) => {
          const control = this.form.get(key);
          console.log(key);
          if (control instanceof FormArray) {
            // Populate FormArray for multi-select fields
            const values: any[] = data[key];
            values.forEach((value) => {
              if (!control.value.includes(value)) {
                control.push(this.fb.control(value));
              }
            });
          }
        });




      },
      (error) => {
        console.error('Error fetching rows:', error);
      }
    );
  } 

    















  
}

