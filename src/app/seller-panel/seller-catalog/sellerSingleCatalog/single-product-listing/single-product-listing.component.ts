import { Component, ElementRef, Optional, QueryList, ViewChildren } from '@angular/core';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from '../../../../_services/sharedService/shared-data.service';
import { HttpClient } from '@angular/common/http';
import { ProductServiceService } from '../../../../_services/productServices/product-service.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  FormControl } from '@angular/forms';
declare var bootstrap: any;

interface FileUpload {
  previewUrl: string | null;
  uploadProgress: number | null;
  file: File | null;
}
@Component({
  selector: 'app-single-product-listing',
  templateUrl: './single-product-listing.component.html',
  styleUrl: './single-product-listing.component.css'
})
export class SingleProductListingComponent {

  productForm:any = FormGroup;
   @ViewChildren('fileInput') fileInputRefs!: QueryList<ElementRef>;
    showError = false; // Flag to track validation errors
    files: FileUpload[] = [];

   constructor( 
      private tokenStorage: TokenStorageService, 
      private toast:NgToastService,
      private route: ActivatedRoute,
      private router: Router,
      private spinner: NgxSpinnerService,
      private sharedDataService:SharedDataService,
      private http: HttpClient,
      private productService:ProductServiceService,
      private formBuilder: FormBuilder,) {    
      }

      bornCategoryId:any;
      productIdentityListFromMaker:any[]=[];
      productSizesFormMaker:any[]=[];
      tableRowsFormMaker:any[]=[];
      productDetailsFormMaker:any[]=[];
      productOtherDetailsFormMaker:any[]=[];
      sampleProductImages:any[]=[];

      //Bank Settlement Amount and Calculation for GST and Shipping Charges
      priceActual:any;
      gstAmount:any;
      bankSettlementAmount:any;


      ngOnInit() {
          //creating 5 file Object to file Upload Dummy
          this.uploadFileObjectCreatin(); 
          console.log(this.files[0].previewUrl );
          
        this.bornCategoryId = 2;
        this.productForm = this.formBuilder.group({
                                                    productSizes: this.formBuilder.array([]),
                                                    tableRows:this.formBuilder.array([])
                                                  });

        this.productService.formBuilderFlying(this.bornCategoryId).subscribe((response: any) => {

          console.log(response);
          console.log("==============================================");
          this.sampleProductImages = response.data.bornCategorySampleFilesModels;
          console.log(this.sampleProductImages);
          
          const formBuilderJson = JSON.parse(response.data.formBuilderModel.formBuilder);

          this.productIdentityListFromMaker = formBuilderJson.productIdentityList;
          this.productSizesFormMaker = formBuilderJson.productSizes;
          this.tableRowsFormMaker = formBuilderJson.productVariants;
          this.productDetailsFormMaker = formBuilderJson.productDetails;
          this.productOtherDetailsFormMaker = formBuilderJson.productOtherDetails;
          //calling to create dynamically Keys
          this.dynamicallykeysAndValidationBuilder(formBuilderJson.productIdentityList);
          this.dynamicallykeysAndValidationBuilder(formBuilderJson.productDetails);
          this.dynamicallykeysAndValidationBuilder(formBuilderJson.productOtherDetails);
        });
      }


      dynamicallykeysAndValidationBuilder(dataReceiver:any[]){
        dataReceiver.forEach((formKeys)=>{

          if(formKeys.type === 'TEXT'){
            const validators = [];
            if(formKeys.required) validators.push(Validators.required); 
            if(formKeys.minLength !== undefined) validators.push(Validators.minLength(formKeys.minLength));
            if(formKeys.maxLength !== undefined) validators.push(Validators.maxLength(formKeys.maxLength));
            this.productForm.addControl(formKeys.identifier, new FormControl('', validators));
          }else if(formKeys.type === 'TEXTBOX'){
            const validators = [];
            if(formKeys.required) validators.push(Validators.required); 
            if(formKeys.minLength !== undefined) validators.push(Validators.minLength(formKeys.minLength));
            if(formKeys.maxLength !== undefined) validators.push(Validators.maxLength(formKeys.maxLength));
            this.productForm.addControl(formKeys.identifier, new FormControl('', validators));
          }
          else if(formKeys.type === 'DROPDOWN'){
            const validators = [];
            if(formKeys.required) validators.push(Validators.required); 
            this.productForm.addControl(formKeys.identifier, new FormControl('', validators));
          }
        })
        console.log(this.productForm);
      }


  // Method to handle selection change
  toggleSelection(optionValue: string) {
      const productSizes: string[] = this.productForm.value.productSizes;

      if (productSizes.includes(optionValue)) {
      // If the option is already selected, remove it
         const index = productSizes.indexOf(optionValue);
         productSizes.splice(index, 1);
         this.removeRowByCategory(optionValue);
         } else {
         // Otherwise, add the option
         productSizes.push(optionValue);
         this.addTableRow(optionValue);
        }
    }
   

    removeRowByCategory(variantSize: string) {
      console.log("removeRowByCategory:: " + variantSize);
      const index = this.tableRows.controls.findIndex(row => row.value.productLabel === variantSize);
      console.log("index:: " + index);
      if (index !== -1) {
        this.tableRows.removeAt(index);
      }
    }




    addTableRow(optionValue: any) {
      console.log(optionValue);
    
      const row = this.formBuilder.group({}); // Create a new FormGroup for the row
    
      this.tableRowsFormMaker.forEach(col => {
        if (col.type === 'DROPDOWN') {
          row.addControl(
            col.identifier,
            this.formBuilder.control(
              optionValue[col.identifier] || col[0],
              Validators.required
            )
          );
        } else if (col.type === 'TEXT') {
          if(col.required){
            row.addControl(
              col.identifier,
              this.formBuilder.control(
                optionValue[col.identifier] || '',
                Validators.compose([
                  Validators.required,
                  Validators.minLength(col.minLength),
                  Validators.maxLength(col.maxLength)
                ])
              )
            );
          }else{
            row.addControl(
              col.identifier,
              this.formBuilder.control(
                optionValue[col.identifier] || '',
                Validators.compose([
                  Validators.minLength(col.minLength),
                  Validators.maxLength(col.maxLength)
                ])
              )
            );
          }
        } else if (col.type === 'LABEL') {
          row.addControl(
            col.identifier,
            this.formBuilder.control(
              optionValue[col.identifier] || optionValue,
              Validators.required
            )
          );
        }
      });
    
      this.tableRows.push(row);
    }
  
  get tableRows(): FormArray {
      return this.productForm.get('tableRows') as FormArray; // Retrieve the FormArray
  }
   
  // Remove a row from the table
  removeRow(index: number) {

    
    this.tableRows.removeAt(index);

    
    //cliing to Product Mrp Price Change
    this.onMrpInputChange(index);
  }   

  // Helper to get FormArray
  get productSizesArray(): FormArray {
    return this.productForm.get('productSizes') as FormArray;
  }

  
  


  submitProduct()
      {
        if (this.productForm.valid) {
          this.productService.saveSellerProductNew(this.productForm.value).subscribe(
            (response:any) => {
              this.toast.success({detail:"Success",summary:"Data Saved Success", position:"bottomRight",duration:3000});
              console.log(response);
                
              //upload File 
              this.uploadProductFiles(response.data);
            },
            (error:any) => {
             this.toast.error({detail:"Error",summary:"Data not saved", position:"bottomRight",duration:3000});
            }
          );
        } else {
          console.log('Form is invalid!');
          this.productForm.markAllAsTouched();
        }

      }
      


//Calculation For GST and Other Charges
  onMrpInputChange(rowIndex: number): void {

      if(rowIndex === 0){
          this.priceActual = 0;
        }

      this.productForm.value.tableRows.forEach((row:any, index:any) => {
        this.priceActual = row.productPrice; 
      });
      console.log(this.productForm.value.tableRows.size);

      const gstWithPercentage = this.productForm.value.gst; 
      // Calculate the GST Amount
      
      if(this.priceActual > 0 || this.priceActual === undefined || this.priceActual !== null)
      {
        this.gstAmount = (this.priceActual * parseFloat(gstWithPercentage.replace('%', ''))) / 100;
        console.log("gstAmount :: " + this.gstAmount);

      // Calculate the total price including GST
      const bankSettleAmount = parseFloat(this.priceActual)  - this.gstAmount;
      this.bankSettlementAmount =  this.formatToTwoDecimal(bankSettleAmount);
      console.log("bankSettlementAmount :: " + this.bankSettlementAmount);

      if(this.gstAmount === 'NaN' || this.bankSettlementAmount === 'NaN'){
        this.gstAmount =0;
        this.bankSettlementAmount = 0;
      }
    
      
      }
  }

  onGstChange(gstValue: string): void {
    console.log('GST value changed to:', gstValue);
    // You can also perform other operations here, like updating other form fields based on the GST value
    this.onMrpInputChange(0);
  }
  

  // Method to format a number to two decimal places
  formatToTwoDecimal(value: number): number {
  return parseFloat(value.toFixed(2));
  }

////////////////////////////////UPLOAD PRODUCT FILE STARTING/////////////////////////////


uploadProductFiles(productLockerNumber:any){

  console.log(productLockerNumber);

        if (!this.files[0].file) {
          // Show error if the first file is not uploaded
          this.showError = true;
          alert("Please Upload Main Image")
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
        
            // Send the FormData to the Spring Boot backend
        this.productService.uploadProductFiles(formData,productLockerNumber).subscribe({
          next: (response) => {
          console.log('Upload successful', response);
            },
            error: (error) => {
              console.error('Upload failed', error);
            }
          });
}



// onFileSelected(event: Event, index: number): void {
//   const file = (event.target as HTMLInputElement).files?.[0];
//   if (file) {
//         const fileObj = this.files[index];
//         fileObj.file = file;
//         fileObj.previewUrl = URL.createObjectURL(file);
      
//         // Clear error if the first file is uploaded
//         if (index === 0) {
//           this.showError = false;
//         }
//         //Simulate progress for each file
//         this.simulateProgress(index);
//       }
//   }
  

  onFileSelected(event: Event, index: number): void {
    const file = (event.target as HTMLInputElement).files?.[0];
  
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];  // Allowed MIME types for JPEG and PNG
  
      // Check if the file type is allowed
      if (allowedTypes.includes(file.type)) {
        const fileObj = this.files[index];
        fileObj.file = file;
        fileObj.previewUrl = URL.createObjectURL(file);
  
        // Clear error if the first file is uploaded
        if (index === 0) {
          this.showError = false;
        }
  
        // Simulate progress for each file
        this.simulateProgress(index);
      } else {
        // If the file type is not allowed, show an error
        this.showError = true;
        alert('Only JPEG and PNG files are allowed.');
      }
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


  uploadFileObjectCreatin(){
    // Initialize with 5 empty file slots
    this.files = Array(5).fill(null).map(() => ({
      previewUrl: null,
      uploadProgress: null,
      file: null,
    }));
  }

  getAllImages(){
    console.log(this.files);
    this.files[0].previewUrl = "https://plus.unsplash.com/premium_photo-1731329153355-1015daf2cb92?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    this.files[1].previewUrl = "https://images.unsplash.com/photo-1734000402740-dc480cbbaeb6?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    this.files[2].previewUrl = "https://images.unsplash.com/photo-1719937050792-a6a15d899281?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    this.files[3].previewUrl = "https://images.unsplash.com/photo-1714070700737-24acfe6b957c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    this.files[4].previewUrl = "https://plus.unsplash.com/premium_photo-1684952850890-08b775d7bc2e?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    
    }



 // Load data with pre-selected options/////////////////////////////////////////////////////////
  loadData(){

        this.productForm.patchValue({productName:"Jackets",gst:"10 %",hsn:"133014"})


        //Multiple Check BOX
        const preSelectedOptions = ['S', 'M'];
        // Clear existing values in FormArray
        this.productSizesArray.clear();
        // Add pre-selected options
        preSelectedOptions.forEach((checkBoxSelected) =>
          this.productSizesArray.push(new FormControl(checkBoxSelected))
        );

        // Table Data
      const arrayLoaded = [ { productLabel: "S", productPrice: "2121",productLength :"10",productMrp:"100",skuId:"500" },
         { productLabel: "M", productPrice: "21" ,productLength :"400",productMrp:"200",skuId:"600" } ]
      //  Creating Rows
       this.tableRows.clear();  // Clear existing rows in the form array
       arrayLoaded.forEach((row: any) => {
         this.addTableRow(row);  // Add rows to the form from the fetched data
       }); 



       // Loop through each row in the array
      //   arrayLoaded.forEach((data) => {
      //     // Create a form group for each row and add controls dynamically
      //     this.tableRows.push(this.formBuilder.group(data));
      //   });

      //   console.log(this.productForm.value); // To verify loaded values
      // }

      // Loop through each row in the array
      // Loop through arrayLoaded
          // arrayLoaded.forEach((data:any) => {
          //   // Create a form group dynamically for each row
          //   const currentRow = this.formBuilder.group({});

          //   // Loop through each key-value pair in the current row and create form controls
          //   Object.keys(data).forEach((key) => {
          //     currentRow.addControl(key, new FormControl(data[key],Validators.required)); // Dynamically add form control
          //   });

          //   // Push the dynamically created form group to the table rows
          //   this.tableRows.push(currentRow);
          // });


      }



}
