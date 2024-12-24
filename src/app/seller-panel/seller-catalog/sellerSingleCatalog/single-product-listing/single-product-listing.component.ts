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
import { SingleProductVariantComponent } from '../single-product-variant/single-product-variant.component';
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

   constructor( 
                private tokenStorage: TokenStorageService, 
                private toast:NgToastService,
                private route: ActivatedRoute,
                private router: Router,
                private spinner: NgxSpinnerService,
                private sharedDataService:SharedDataService,
                private http: HttpClient,
                private productService:ProductServiceService,
                private formBuilder: FormBuilder,
                public dialog: MatDialog) {    
                }

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

      //Bank Settlement Amount and Calculation for GST and Shipping Charges
      priceActual:any;
      gstAmount:any;
      bankSettlementAmount:any;


      ngOnInit() {
        this.bornCategoryId = 2;
        
        this.productForm = this.formBuilder.group({
                                                    productSizes: this.formBuilder.array([]),
                                                    tableRows:this.formBuilder.array([])
                                                  });

                                                         


         //Calling Form Buider to make Form                                         
        this.productService.formBuilderFlying(this.bornCategoryId).subscribe((response: any) => {

          // this.sampleProductImages = response.data.bornCategorySampleFilesModels;
          // console.log(response);
          //  this.productIdentityListFromMaker = response.productIdentityList;
          // this.productSizesFormMaker = response.productSizes;
          // this.tableRowsFormMaker = response.productVariants;
          // this.productDetailsFormMaker = response.productDetails;
          // this.productOtherDetailsFormMaker = response.productOtherDetails;
          // //calling to create dynamically Keys
          // this.dynamicallykeysAndValidationBuilder(response.productIdentityList);
          // this.dynamicallykeysAndValidationBuilder(response.productDetails);
          // this.dynamicallykeysAndValidationBuilder(response.productOtherDetails);
          // this.makerProductVariant = response.productVariants;

         
          
          
          //===========================================================================

          //creating 5 file Object to file Upload Dummy
          this.uploadFileObjectCreatin(); 

          //Sample Product Images or Files
          const formBuilderJson = JSON.parse(response.data.formBuilderModel.formBuilder);

          console.log(formBuilderJson);
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
    this.onMrpInputChange(index);
  }   

  // Helper to get FormArray
  get productSizesArray(): FormArray {
    return this.productForm.get('productSizes') as FormArray;
  }


//Calculation For GST and Other Charges and Validation

  //Validation Form
  removeRowByCategory(variantSize: string) {
    console.log("removeRowByCategory:: " + variantSize);
    const index = this.tableRows.controls.findIndex(row => row.value.productLabel === variantSize);
    if (index !== -1) {
      this.tableRows.removeAt(index);
    }
  }



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

      if (isNaN(this.gstAmount) || isNaN(this.bankSettlementAmount)) {
        this.gstAmount = 0;
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



  getProductById(){
    this.productService.getproductById(1).subscribe(
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
        }).
        this.toast.success({detail:"Success",summary:"Data Fetching Success", position:"bottomRight",duration:3000});
      },
      (error:any) => {
       this.toast.error({detail:"Error",summary:"Data Fetching Failed", position:"bottomRight",duration:3000});
      }
    );
  }




  //Submit The Data in the DB-------------------------------------------------------------------------------------
  public submitProduct()
  {

    if (!this.files[0].file) {
      // Show error if the first file is not uploaded
      this.showError = true;
      this.productSizeError = true;
      this.productForm.markAllAsTouched();
      this.toast.error({detail:"Error",summary:"Fix all the Errors", position:"bottomRight",duration:3000});
      return;
    }
    console.log(this.productForm.valid);
    
   if(this.productForm.value.productSizes.length <= 0){
      this.productSizeError = true;
      this.productForm.markAllAsTouched();
      this.toast.error({detail:"Error",summary:"Please Select Size", position:"bottomRight",duration:3000});
      return;
   }
    

    if (this.productForm.valid) {

      this.productService.saveSellerProductNew(this.productForm.value).subscribe(
        (response:any) => {
          this.toast.success({detail:"Success",summary:"Data Saved Success", position:"bottomRight",duration:3000});
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
      console.log('Upload successful', response);
        },
        error: (error) => {
          console.error('Upload failed', error);
        }
      });
  }







    //Add Variant Model Working--------------------------------------------------------------------------------
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
      
      async addProductVariantForm(){
      this.productVariantForm = this.formBuilder.group({
                                                  variantTableRows:this.formBuilder.array([])
                                                });
      
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

      addVariant(){
       console.log("productVariantForm");
       console.log(this.productVariantForm.value);

       let exists = false;
        for (const control of this.variantTableRows.controls) {
          if (control.value.ColorVariant === this.productVariantForm.value.productColor && control.value.productLabel === this.productVariantForm.value.productSize) {
            exists = true;
            break;
          }
        }

          if (exists) {
            alert('The selected color and size already exist in the variant table.');
          } else {
            alert('The selected color and size do not exist in the variant table.');
            this.addVarinatTableRow(this.productVariantForm.value);
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

            if(col.identifier === "ColorVariant"){
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




  // Method to check if the form is invalid or any field is not selected
  

      submitProductVariant(){
      }


    }
      








  























        // colors = ['Red', 'Green', 'Blue'];
        // sizes = ['Small', 'Medium', 'Large'];
        // productLengths = ['10', '20', '40', '80', '200', '300', '400'];
        // selectedColor = '';
        // selectedSize = '';
        // rows: any[] = [];
        // errorMessage = '';

        // addRow() {
        //   // Check for duplicate color-size combination
        //   const exists = this.rows.some(row => row.color === this.selectedColor && row.size === this.selectedSize);

        //   if (exists) {
        //     this.errorMessage = 'This combination of color and size already exists.';
        //   } else {
        //     this.errorMessage = '';
        //     this.rows.push({
        //       color: this.selectedColor,
        //       size: this.selectedSize,
        //       price: '',
        //       productMrp: '',
        //       productLength: '',
        //       skuId: ''
        //     });
        //     this.selectedColor = '';
        //     this.selectedSize = '';
        //   }
        // }

