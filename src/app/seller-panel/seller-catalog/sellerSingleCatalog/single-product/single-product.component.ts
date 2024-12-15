import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from '../../../../_services/sharedService/shared-data.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ProductServiceService } from '../../../../_services/productServices/product-service.service';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { FormBuilder, FormControl } from '@angular/forms';
import { API_AUTHORIZA_URL } from '../../../../constants/Constants';


declare var bootstrap: any;

interface FileUpload {
  previewUrl: string | null;
  uploadProgress: number | null;
  file: File | null;
}

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {

  @ViewChildren('fileInput') fileInputRefs!: QueryList<ElementRef>;
  showError = false; // Flag to track validation errors
  files: FileUpload[] = [];

  
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

  //Model Variant Data
  productVariantsGroup:any;


  constructor( 
    private tokenStorage: TokenStorageService, 
    private toast:NgToastService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private sharedDataService:SharedDataService,
    private http: HttpClient,
    private productService:ProductServiceService,
    private fb: FormBuilder,) {    
    }




  get productRows(): FormArray {
    return this.form.get('productRows') as FormArray;
  }
  get checkboxesControl(): FormArray {
    return this.form.get('productSize') as FormArray;
  }
  bornCategoryId:any;
  ngOnInit() {
        this.bornCategoryId = 2;

        //creating 5 file Object to file Upload Dummy
        this.uploadFileObjectCreatin(); 
       //creating 5 file Object to file Upload Dummy ENDIN
       
        this.form = this.fb.group({
          productRows: this.fb.array([]),
          productSize: this.fb.array([])
        });

        this.productService.getFormBuilders(this.bornCategoryId).subscribe((data: any) => {
        console.log(data);
        
        this.productFieldsBuilder = data.productDataBuilderList;
        this.tableFieldBuilder = data.tableDataBuilderList;
        this.sizeFieldBuilder = data.sizeDataBuilderList;
        this.productDetailsBuilder = data.productDetailsBuilderList;
        this.productDescAndOtherBuilder = data.productDescAndOtherBuilderList;
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





onSubmit() {
  
  if (this.form.valid) {
     this.productService.saveSellerProduct(this.form.value).subscribe(
       (response:any) => {

        //Upload Product Files
        this.uploadProductFiles(response);

         this.toast.success({detail:"Success",summary:"Data Saved Success", position:"bottomRight",duration:3000});
       },
       (error:any) => {
        this.toast.error({detail:"Error",summary:"Data not saved", position:"bottomRight",duration:3000});
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
        //Patching the Data
        this.form.patchValue(data);
        
        //Creating Rows
        this.productRows.clear();  // Clear existing rows in the form array
        data.productRows.forEach((row: any) => {
          this.addTableRow(row);  // Add rows to the form from the fetched data
        }); 

        //Creating Multise-selection Box
        Object.keys(data).forEach((key) => {
          const control = this.form.get(key);
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
        this.toast.success({detail:"Success",summary:"Data Fetch Success", position:"topRight",duration:3000});
      },
      (error) => {
        this.toast.error({detail:"Error",summary:"Form Data Not Loaded", position:"bottomRight",duration:3000});
      }
    );
  } 

    





// ===========================FILE UPLOAD PROCESS STARTING================================================



 //Creating File Objecting Creation
 uploadFileObjectCreatin(){
  // Initialize with 5 empty file slots
  this.files = Array(5).fill(null).map(() => ({
    previewUrl: null,
    uploadProgress: null,
    file: null,
  }));
}


onFileSelected(event: Event, index: number): void {
const file = (event.target as HTMLInputElement).files?.[0];
if (file) {
  const fileObj = this.files[index];
  fileObj.file = file;
  fileObj.previewUrl = URL.createObjectURL(file);

  // Clear error if the first file is uploaded
  if (index === 0) {
    this.showError = false;
  }
  //Simulate progress for each file
  this.simulateProgress(index);

}
}

simulateProgress(index: number): void {
const fileObj = this.files[index];
fileObj.uploadProgress = 0; // Reset progress
const progressStep = 5; // Step in percentage increments
const intervalDuration = 100; // Time in ms for each step

const interval = setInterval(() => {
  if (fileObj.uploadProgress !== null && fileObj.uploadProgress < 100) {
    fileObj.uploadProgress += progressStep;
  } else {
    clearInterval(interval);
  }
}, intervalDuration);
}

removeFile(index: number): void {
this.files[index] = {
  previewUrl: null,
  uploadProgress: null,
  file: null,
};

const fileInput = this.fileInputRefs.toArray()[index];
if (fileInput) {
  fileInput.nativeElement.value = ''; // Clear the input value
}
}




uploadProductFiles(productLockerNumber:any){

  console.log(productLockerNumber);

        if (!this.files[0].file) {
          // Show error if the first file is not uploaded
          this.showError = true;
          return;
        }
        this.showError = false; // Reset error state if validation passes
        
        const formData = new FormData();
        // Append all files to FormData
        this.files.forEach((fileObj, index) => {
          if (fileObj.file) {
            formData.append(`file${index}`, fileObj.file);
          }else{
            formData.append(`file${index}`, "");
          }
        });
        
        console.log("==========--------======----------===========-----");
        
            // Send the FormData to the Spring Boot backend
          this.productService.uploadProductFiles(formData,productLockerNumber.data.productId).subscribe({
            next: (response) => {
              console.log('Upload successful', response);
            },
            error: (error) => {
              console.error('Upload failed', error);
            }
          });
}



getAllImages(){
  console.log(this.files);
  this.files[0].previewUrl = "https://plus.unsplash.com/premium_photo-1731329153355-1015daf2cb92?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  this.files[1].previewUrl = "https://images.unsplash.com/photo-1734000402740-dc480cbbaeb6?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  this.files[2].previewUrl = "https://images.unsplash.com/photo-1719937050792-a6a15d899281?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  this.files[3].previewUrl = "https://images.unsplash.com/photo-1714070700737-24acfe6b957c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  this.files[4].previewUrl = "https://plus.unsplash.com/premium_photo-1684952850890-08b775d7bc2e?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  
  }
  
// ===========================FILE UPLOAD PROCESS ENDING================================================












































































  //PRODUCT VARINAT BUILDER STARTING ===========================================================================================


   productVariantBuilder:any[]=[];
  //Starting new code
  openModal() {

    this.productVariantBuilder = this.tableFieldBuilder;

    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();
  }

  closeModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('myModal'));
    modal.hide();
  }

  colors: string[] = ['Red', 'Blue', 'Green', 'Black', 'White'];
  sizes: string[] = ['S', 'M', 'L', 'XL', 'XXL'];
  // Extra JSON data

  selectedColor: string = '';
  selectedSize: string = '';
  rows: any[] = [];
  alertMessage: string = ''; // For showing alert message
  formSubmitted: boolean = false; // Flag to trigger validation on submit

  // Add a new row to the table with selected values
  
addRow() {
  this.formSubmitted = true;

  // Check if the color and size combination already exists
  const exists = this.rows.some(row => 
    row.color === this.selectedColor && 
    row.size === this.selectedSize
  );

  if (exists) {
    this.alertMessage = `The combination of color: ${this.selectedColor} and size: ${this.selectedSize} already exists!`;
    
  } else {
    // Add the row to the table with additional fields
    const newRow = {
      color: this.selectedColor,
      size: this.selectedSize,
      productVariantList: this.tableFieldBuilder.reduce((acc, field) => {
        acc[field.identifier] = field.type === 'dropdown' ? field.values[0] : ''; // Default value for text or dropdown
        return acc;
      }, {})
    };
  
    this.rows.push(newRow);

    // Reset dropdowns after adding the row
    this.selectedColor = '';
    this.selectedSize = '';

    // Clear the alert message after 3 seconds
    setTimeout(() => {
      this.alertMessage = '';
    }, 3000);
  }
}

  // Remove a specific row from the table
  removeRow1(index: number) {
    this.rows.splice(index, 1);
  }

  transFormJson: any[]=[];
  transformJson() {
    const groupedData: { [key: string]: any } = {};

    this.rows.forEach(item => {
      const variantColor = item.color;
      const variant = {
        size: item.size,
        productColor:item.color,
        variantSize: item.productVariantList.variantSize,
        price: item.productVariantList.price,
        mrp: item.productVariantList.mrp,
        skuId: item.productVariantList.skuId,
        length: item.productVariantList.productLength,
        breadth: item.productVariantList.productBreath,
        height: item.productVariantList.productHeight
        // dimensions: {
        //   length: item.productVariantList.productLength,
        //   breadth: item.productVariantList.productBreath,
        //   height: item.productVariantList.productHeight
        // }
      };

      if (!groupedData[variantColor]) {
        groupedData[variantColor] = { variantColor, productVariantsData: [] };
      }
      groupedData[variantColor].productVariantsData.push(variant);
    });

    this.transFormJson = Object.values(groupedData);
  }


  //productColor:any;
  // Submit the form (for demonstration purposes, just logging the rows)
  onSubmit1(form: any) {
    this.formSubmitted = true;
    this.transformJson();
    if (form.valid) {

      console.log(this.transFormJson);
    }
    else {
     console.log('Form invalid, cannot submit.');
   }
 }

      // Validate MRP and Price
          // const invalidMRP = this.rows.some(row => 
          //   row.extraFields['price'] !== undefined &&
          //   row.extraFields['mrp'] !== undefined &&
          //   row.extraFields['mrp'] < row.extraFields['price']
          // );
          // if (invalidMRP) {
          //   alert('Some MRP values are less than their respective Price. Please correct them.');
          //   return;
          // }q


         // Grouping by productColor and collecting sizes for each color
      // const groupedByColor:any = {};

      // this.rows.forEach(product => {
      //   if (!groupedByColor[product.color]) {
      //     groupedByColor[product.color] = {
      //       sizes: [],
      //       products: []
      //     };
      //   }

      //   // Add the size (now renamed to productSize) to the sizes array (ensure it's unique)
      //   if (product.size && !groupedByColor[product.color].sizes.includes(product.size)) {
      //     groupedByColor[product.color].sizes.push(product.size);
      //   }

      //   // Add the productColor and productSize to the product's extraFields
      //   const productWithUpdatedFields = {
      //     ...product,
      //     extraFields: {
      //       ...product.extraFields,
      //       productSize: product.size, // Replacing 'size' with 'productSize' in extraFields
      //       productColor: product.color // Adding 'productColor' to extraFields
      //     }
      //   };

        // Remove the original color, size, and length fields from the product object
        // delete productWithUpdatedFields.color;
        // delete productWithUpdatedFields.size;
        // delete productWithUpdatedFields.length;

        // Push the product with the updated extraFields into the color group
      //   groupedByColor[product.color].products.push(productWithUpdatedFields);
      // });

      // const groupedJson = groupedByColor;

      // this.productVariantsGroup = groupedJson;
      // console.log('Grouped products :', groupedJson);
   
  



  // isModalOpen = false;
  // // Function to open the modal
  // openModal() {
  //   this.isModalOpen = true;
  // }

  // // Function to close the modal
  // closeModal() {
  //   this.isModalOpen = false;
  // }

  // confirmAction(){
  // }


//PRODUCT VARINAT BUILDER ENDING============================================================================================== 












  }