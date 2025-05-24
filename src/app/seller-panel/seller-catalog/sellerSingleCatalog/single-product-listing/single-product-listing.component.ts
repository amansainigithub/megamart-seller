import { Component, ElementRef, Optional, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from '../../../../_services/sharedService/shared-data.service';
import { HttpClient } from '@angular/common/http';
import { ProductServiceService } from '../../../../_services/productServices/product-service.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';

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
  showError = false; // Flag to track validation errors for File Upload (Main)
  productSizeError = false; // Product Size (Main)
  files: FileUpload[] = [];

  bornCategoryId:any;
  productIdentityListFromMaker:any[]=[];
  productSizesFormMaker:any[]=[];
  tableRowsFormMaker:any[]=[];
  productDetailsFormMaker:any[]=[];
  productOtherDetailsFormMaker:any[]=[];
  sampleProductImages:any[]=[];

  //Variant Creation Product Data (Model)
  VariantTableRowsFormMaker:any[]=[];
  makerColorAndSize:any[]=[];

  //Tax and Charges Criteria
  taxAndChargesCriteria:any;

   constructor( 
                private toast:NgToastService,
                private router: Router,
                private sharedDataService:SharedDataService,
                private productService:ProductServiceService,
                private formBuilder: FormBuilder,
                public dialog: MatDialog) {    
                }


      ngOnInit() {
        // Get Born Category Id
      const data =   this.sharedDataService.getData();

      if(data === undefined || data === null || data === ""){
        this.router.navigateByUrl("/seller/dashboard/home");
      }

      this.bornCategoryId = data.bornCategoryId;

        this.productForm = this.formBuilder.group({
                                                    productSizes: this.formBuilder.array([]),
                                                    tableRows:this.formBuilder.array([])
                                                  });
        //  for Variant Table Rows                                                  
         this.productVariantForm = this.formBuilder.group({
                                                    variantTableRows:this.formBuilder.array([])
                                                  });                 

          //Calling Form Buider to make Form                                         
          this.productService.formBuilderFlying(this.bornCategoryId).subscribe((response: any) => {

          this.taxAndChargesCriteria = response.data;
        

          //creating 5 file Object to file Upload Dummy
          this.uploadFileObjectCreatin(); 

          //Sample Product Images or Files
          const formBuilderJson = JSON.parse(response.data.formBuilderModel.formBuilder);
          
          //Product Sample Image to Show hoow to Upload Product Images
          this.sampleProductImages = response.data.bornCategorySampleFilesModels;

          //Form Builder Processing
          this.productIdentityListFromMaker = formBuilderJson.productIdentityList;
          this.productSizesFormMaker = formBuilderJson.productSizes;
          this.tableRowsFormMaker = formBuilderJson.productVariants;
          this.productDetailsFormMaker = formBuilderJson.productDetails;
          this.productOtherDetailsFormMaker = formBuilderJson.productOtherDetails;

          //Variant Creation Product Data (Model)
          this.makerColorAndSize = formBuilderJson.makerColorAndSize;
          this.VariantTableRowsFormMaker = formBuilderJson.makerAddVariantData;

          //Product Variant Builder
          this.addProductVariantForm(); 
          
          //Form Builder Processing and calling to create dynamically Keys
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
    const index = this.tableRows.controls.findIndex(row => row.value.productLabel === variantSize);
    if (index !== -1) {
      this.tableRows.removeAt(index);
    }
  }
      
  //only type number
  removeNonNumericCharacters(event: Event): void {
        const input = event.target as HTMLInputElement;
        input.value = input.value.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
        this.productForm.get(input.id)?.setValue(input.value); // Update the form control value
      }

    addTableRow(optionValue: any) {
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
    this.onPriceChange(index);
  }   

  // Helper to get FormArray
  get productSizesArray(): FormArray {
    return this.productForm.get('productSizes') as FormArray;
  }

//  UPLOAD PRODUCT FILE STARTING---------------------------------------------------

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
        const allowedTypes = ['image/jpeg', 'image/png'];  // Allowed MIME types for JPEG and PNG
        const maxSize = 2 * 1024 * 1024;  // 2MB in bytes

        // Check if the file type is allowed
        if (allowedTypes.includes(file.type)) {
            // Check if the file size is less than 2MB
            if (file.size <= maxSize) {
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
                // If the file size exceeds 2MB, show an error
                this.showError = true;
                alert('The file size must be less than 2MB.');
            }
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



 



    //Add Variant Model Working STARTING--------------------------------------------------------------------------------
      @ViewChild('modal') modalElement!: ElementRef;

      openModal() {
        const modal = new bootstrap.Modal(this.modalElement.nativeElement);
        modal.show();
      }
    
      closeModal() {
        const modal = bootstrap.Modal.getInstance(this.modalElement.nativeElement);
        modal?.hide();
      }

      productVariantForm:any=FormGroup;       
      addProductVariantForm(){
       this.variantFiedValidations(this.makerColorAndSize);
      }

      variantFiedValidations(dataReceiver:any[]){
        dataReceiver.forEach((formKeys)=>{
          if(formKeys.type === 'DROPDOWN'){ 
            const validators = [];
            if(formKeys.required) validators.push(Validators.required); 
            this.productVariantForm.addControl(formKeys.identifier, new FormControl('', validators));
          }
          else if(formKeys.type === 'MULTISELECT'){
            const validators = [];
            if(formKeys.required) validators.push(Validators.required); 
            this.productVariantForm.addControl(formKeys.identifier, new FormControl('', validators));
          }
        })
      }



      showVariantError:any = false;
      addVariant(){
        if (!this.productVariantForm.value.productColor || !this.productVariantForm.value.productSize) {
          alert('Please select both color and size before adding the variant.');
          return;  // Stop the function if either value is empty
        }
      let exists = false;
      for (const control of this.variantTableRows.controls) {
              if (control.value.colorVariant === this.productVariantForm.value.productColor 
                  && control.value.productLabel === this.productVariantForm.value.productSize) {
                exists = true;
                break;
              }
              }
              if (exists) {
                // alert('The selected color and size already exist in the variant table.');
                this.showVariantError = true;
                return;
              } else {
                this.addVarinatTableRow(this.productVariantForm.value); 
                this.showVariantError = false;
              }
      }


      addVarinatTableRow(optionValue: any) {
        const row = this.formBuilder.group({}); // Create a new FormGroup for the row
      
        this.VariantTableRowsFormMaker.forEach(col => {
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

            if(col.identifier === "colorVariant"){
              row.addControl(
                col.identifier,
                this.formBuilder.control(
                  optionValue[col.identifier] ||optionValue.productColor,  //optionValue
                  Validators.required
                )
              );
            }else if(col.identifier === "productLabel"){
              row.addControl(
                col.identifier,
                this.formBuilder.control(
                  optionValue[col.identifier] ||optionValue.productSize,  //optionValue
                  Validators.required
                )
              );
            }
          }
        });
        this.variantTableRows.push(row);
      }
    
    get variantTableRows(): FormArray {
        return this.productVariantForm.get('variantTableRows') as FormArray; // Retrieve the FormArray
    }

    removeAddVariantRow(index: number){
      this.variantTableRows.removeAt(index);
    }

    groupedData: { productColor: string; products: any[] }[] = [];
    transformData(data: any[]): { productColor: string; products: any[] }[] {
      const grouped = data.reduce((result, current) => {
        const color = current.colorVariant;
        if (!result[color]) {
          result[color] = [];
        }
        result[color].push(current);
        return result;
      }, {});
  
      return Object.keys(grouped).map((key) => ({
        productColor: key,
        products: grouped[key],
      }));
    }

  // Method to check if the form is invalid or any field is not selected
      saveChangesProductVariant(){
        if(this.productVariantForm.valid){
          //Calling Function
          this.groupedData =  this.transformData(this.productVariantForm.value.variantTableRows);
          // console.log('Product Form Value:', this.groupedData);
          this.toast.success({detail:"Success",summary:"Variant Saved Success", position:"bottomRight",duration:3000});
        }else{
          this.productVariantForm.markAllAsTouched();
          // this.toast.error({detail:"Error",summary:"Model Fix all the Errors ", position:"bottomRight",duration:3000});
        }
      }
//Add Variant Model Working ENDING--------------------------------------------------------------------------------



//Calculation For GST and Other Charges and Validation

//Bank Settlement Amount and Calculation for GST and Shipping Charges
priceActual:any;
gstAmount:any;
tcsAmount:any;
tdsAmount:any;
bankSettlementAmount:any;


onPriceChange(rowIndex: number): void {
          if (rowIndex === 0) {
            this.priceActual = 0;
          }
        
          // Calculate total priceActual
          this.priceActual = 0;
          this.productForm.value.tableRows.forEach((row: any) => {
            this.priceActual += parseFloat(row.productPrice || 0);
          });
        
          const gstPercentage = this.productForm.value.gst || 0;
        
          // Calculate GST, TCS, and TDS
          if(gstPercentage !== "" || gstPercentage !== null || gstPercentage !== undefined ){
            this.gstAmount = this.calculateGST(this.priceActual, gstPercentage);
            this.tcsAmount = this.calculateTCS(this.priceActual, gstPercentage);
            this.tdsAmount = this.calculateTDS(this.priceActual);            
            this.bankSettlementAmount = this.roundToTwo(this.priceActual -
                                        (this.gstAmount + this.tcsAmount + this.tdsAmount + 
                                         parseFloat(this.taxAndChargesCriteria.commissionFeesCharge)));                    
          }
  }

  
onMrpChanged(rowIndex: number){
  const row = this.productForm.value.tableRows.at(rowIndex);
  
  const productPrice = parseFloat(row.productPrice || '0');
  const productMrp = parseFloat(row.productMrp || '0');

  // Get the specific form group for the current row
  const rowFormGroup = this.productForm.get('tableRows').at(rowIndex);

  if (productMrp < productPrice) {
    rowFormGroup.get('productMrp').setErrors({ lessThanPrice: true });
  } else {
    // console.log("Correct Price");
  }

}
      
      // Method to calculate GST
      calculateGST(price: number, gstPercentage: string | number): number {
        // If gstPercentage is a string and contains a '%', remove it
        if (typeof gstPercentage === 'string') {
          gstPercentage = parseFloat(gstPercentage.replace('%', ''));
        }
        return this.roundToTwo((price * gstPercentage) / 100);
      }
      
      
      // Method to calculate TCS (Tax Collected at Source) (example: 1%)
    calculateTCS(price: number, gstPercentage:string | number): number {
      const gstAmount = this.calculateGST(price, gstPercentage);
      const totalPrice = price + gstAmount;
      const tcsRate = this.taxAndChargesCriteria.tcsCharge; // TCS rate in percentage (1% in this example)
      return this.roundToTwo((totalPrice * tcsRate) / 100);
    }
      
      // Method to calculate TDS (example: 2%)
      calculateTDS(price: number): number {
        const tdsRate = this.taxAndChargesCriteria.tdsCharge; // TDS rate in percentage
        return this.roundToTwo((price * tdsRate) / 100);
      }
      
      // Utility method to round numbers to two decimal places
      roundToTwo(value: number): number {
        return Math.round(value * 100) / 100;
      }

  onGstChange(gstValue: string): void {
    // console.log('GST value changed to:', gstValue);
    // You can also perform other operations here, like updating other form fields based on the GST value
    this.onPriceChange(0);
  }








//Submit The Data in the DB-------------------------------------------------------------------------------------


@ViewChild('proceedModel') proceedModel!: ElementRef;
productProceedModelShow() {
    const modal = new bootstrap.Modal(this.proceedModel.nativeElement);
    modal.show();
}
proceedModelClose() {
  const modal = bootstrap.Modal.getInstance(this.proceedModel.nativeElement);
  modal?.hide();
}


public productProcess() { 
    if (!this.files[0].file) {
      // Show error if the first file is not uploaded
      this.showError = true;
      this.productSizeError = true;
      this.productForm.markAllAsTouched();
      this.toast.error({detail:"Error",summary:"Fix all the Errors", position:"bottomRight",duration:3000});
      return;
    }

   if(this.productForm.value.productSizes.length <= 0){
      this.productSizeError = true;
      this.productForm.markAllAsTouched();
      this.toast.error({detail:"Error",summary:"Please Select Size", position:"bottomRight",duration:3000});
      return;
   }

    if (this.productForm.valid ) {
      this.productProceedModelShow();
      } else {
        this.productForm.markAllAsTouched();
        this.toast.error({detail:"Error",summary:"Please Fix all the Errors", position:"bottomRight",duration:3000});
      }
  }

  cloneProductForm:any;
  progressBar:any =false;
  submitProduct(){
    if (this.productForm.valid ) {
      this.progressBar = true;

      this.cloneProductForm = this.productForm.value;
      this.cloneProductForm["productVariants"] = this.productVariantForm.value.variantTableRows;

        this.productService.saveSellerProduct(this.cloneProductForm,this.bornCategoryId).subscribe(
          (response:any) => {
            
            this.toast.success({detail:"Success",summary:"Data Saved Success", position:"bottomRight",duration:3000});

            //upload File 
            this.uploadProductFiles(response.data);

            this.progressBar = false;
            this.proceedModelClose();

            //Route to Navigate By URL
            this.router.navigateByUrl('/seller/dashboard/home/product-submitted/' + response.data);
          },
          (error:any) => {
            this.progressBar = false;
          this.toast.error({detail:"Error",summary:"Data not saved", position:"bottomRight",duration:3000});
          }
        );
      } else {
        // console.log('Form is invalid!');
        this.productForm.markAllAsTouched();
      }
  }

   uploadProductFiles(productLockerNumber:any){
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
          // console.log('Files Upload successful', response);
            },
            error: (error) => {
              console.error('Upload failed', error);
            }
          });
      }



      getProductById(){
        this.productService.getproductById(29).subscribe(
          (response:any) => {
            this.productForm.patchValue(response.data.productData);
    
            this.productSizesArray.clear();
            // Add pre-selected options
            response.data.productData.productSizes.forEach((checkBoxSelected:any) =>
              this.productSizesArray.push(new FormControl(checkBoxSelected))
            );
    
            this.tableRows.clear();  // Clear existing rows in the form array
            response.data.productData.tableRows.forEach((row: any) => {
              this.addTableRow(row);  // Add rows to the form from the fetched data
            }); 
    
            response.data.productFiles.forEach((file:any, index:any) =>{
            this.files[index].previewUrl = file.fileUrl;
            })
            this.toast.success({detail:"Success",summary:"Data Fetching Success", position:"bottomRight",duration:3000});
          },
          (error:any) => {
           this.toast.error({detail:"Error",summary:"Data Fetching Failed", position:"bottomRight",duration:3000});
          }
        );
      }




        htmlContent:any;
        config: AngularEditorConfig = {
          editable: true,
          spellcheck: true,
          height: '15rem',
          minHeight: '5rem',
          placeholder: 'Enter text here...',
          translate: 'no',
          defaultParagraphSeparator: 'p',
          defaultFontName: 'Arial',
          toolbarHiddenButtons: [
            ['bold']
            ],
          customClasses: [
            {
              name: "quote",
              class: "quote",
            },
            {
              name: 'redText',
              class: 'redText'
            },
            {
              name: "titleText",
              class: "titleText",
              tag: "h1",
            },
          ]
        };
      

    }
    