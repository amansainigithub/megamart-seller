import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ProductVerifierServiceService } from '../../../_services/product-service/productVerifierService/product-verifier-service.service';
import { ProductReviewDecisionService } from '../../../_services/productReviewDecision/product-review-decision.service';
import { ProductReviewStatusService } from '../../../_services/productReviewStatus/product-review-status.service';

declare var bootstrap: any;

interface FileUpload {
  previewUrl: string | null;
  uploadProgress: number | null;
  file: File | null;
}

@Component({
  selector: 'app-product-checking',
  templateUrl: './product-checking.component.html',
  styleUrl: './product-checking.component.css',
})
export class ProductCheckingComponent {
  productForm: any = FormGroup;
  @ViewChildren('fileInput') fileInputRefs!: QueryList<ElementRef>;
  showError = false; // Flag to track validation errors for File Upload (Main)
  productSizeError = false; // Product Size (Main)
  files: FileUpload[] = [];

  productId: any;
  dataCaptured: any;

  bornCategoryId: any;
  productIdentityListFromMaker: any[] = [];
  productSizesFormMaker: any[] = [];
  tableRowsFormMaker: any[] = [];
  productDetailsFormMaker: any[] = [];
  productOtherDetailsFormMaker: any[] = [];
  sampleProductImages: any[] = [];

  //Variant Creation Product Data (Model)
  VariantTableRowsFormMaker: any[] = [];
  makerColorAndSize: any[] = [];

  //Tax and Charges Criteria
  taxAndChargesCriteria: any;

  constructor(
    // private pss:ProductStatusServiceService,
    private tokenStorage: TokenStorageService,
    private toast: NgToastService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    // private sharedDataService:SharedDataService,
    private http: HttpClient,
    private productVerifierService: ProductVerifierServiceService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public productReviewService:ProductReviewStatusService,
    public productDecisionService:ProductReviewDecisionService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    this.bornCategoryId = 17;

    this.productForm = this.formBuilder.group({
      productSizes: this.formBuilder.array([]),
      tableRows: this.formBuilder.array([]),
    });

    //Calling Form Buider to make Form
    this.productVerifierService
      .formBuilderFlying(this.bornCategoryId)
      .subscribe((response: any) => {
        //Tax and Charges Criteria
        console.log(response);
        this.taxAndChargesCriteria = response.data;

        //creating 5 file Object to file Upload Dummy
        this.uploadFileObjectCreatin();

        //Sample Product Images or Files
        const formBuilderJson = JSON.parse(
          response.data.formBuilderModel.formBuilder
        );

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

        //Form Builder Processing and calling to create dynamically Keys
        this.dynamicallykeysAndValidationBuilder(
          formBuilderJson.productIdentityList
        );
        this.dynamicallykeysAndValidationBuilder(
          formBuilderJson.productDetails
        );
        this.dynamicallykeysAndValidationBuilder(
          formBuilderJson.productOtherDetails
        );

        //Calling The Data
        this.productId = this.route.snapshot.paramMap.get('productId');
        this.getSellerProductByIdAdmin(this.productId);
        console.log('==============FORM BUILDER STARTING====================');
      });
  }

  dynamicallykeysAndValidationBuilder(dataReceiver: any[]) {
    dataReceiver.forEach((formKeys) => {
      if (formKeys.type === 'TEXT') {
        const validators = [];
        if (formKeys.required) validators.push(Validators.required);
        if (formKeys.minLength !== undefined)
          validators.push(Validators.minLength(formKeys.minLength));
        if (formKeys.maxLength !== undefined)
          validators.push(Validators.maxLength(formKeys.maxLength));
        this.productForm.addControl(
          formKeys.identifier,
          new FormControl('', validators)
        );
      } else if (formKeys.type === 'TEXTBOX') {
        const validators = [];
        if (formKeys.required) validators.push(Validators.required);
        if (formKeys.minLength !== undefined)
          validators.push(Validators.minLength(formKeys.minLength));
        if (formKeys.maxLength !== undefined)
          validators.push(Validators.maxLength(formKeys.maxLength));
        this.productForm.addControl(
          formKeys.identifier,
          new FormControl('', validators)
        );
      } else if (formKeys.type === 'DROPDOWN') {
        const validators = [];
        if (formKeys.required) validators.push(Validators.required);
        this.productForm.addControl(
          formKeys.identifier,
          new FormControl('', validators)
        );
      }
    });
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
    console.log('removeRowByCategory:: ' + variantSize);
    const index = this.tableRows.controls.findIndex(
      (row) => row.value.productLabel === variantSize
    );
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

    this.tableRowsFormMaker.forEach((col) => {
      if (col.type === 'DROPDOWN') {
        row.addControl(
          col.identifier,
          this.formBuilder.control(
            optionValue[col.identifier] || col[0],
            Validators.required
          )
        );
      } else if (col.type === 'TEXT') {
        if (col.required) {
          row.addControl(
            col.identifier,
            this.formBuilder.control(
              optionValue[col.identifier] || '',
              Validators.compose([
                Validators.required,
                Validators.minLength(col.minLength),
                Validators.maxLength(col.maxLength),
              ])
            )
          );
        } else {
          row.addControl(
            col.identifier,
            this.formBuilder.control(
              optionValue[col.identifier] || '',
              Validators.compose([
                Validators.minLength(col.minLength),
                Validators.maxLength(col.maxLength),
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

  //  UPLOAD PRODUCT FILE STARTING---------------------------------------------------

  uploadFileObjectCreatin() {
    // Initialize with 5 empty file slots
    this.files = Array(5)
      .fill(null)
      .map(() => ({
        previewUrl: null,
        uploadProgress: null,
        file: null,
      }));
  }

  onFileSelected(event: Event, index: number): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png']; // Allowed MIME types for JPEG and PNG
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes

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

  //Calculation For GST and Other Charges and Validation

  //Bank Settlement Amount and Calculation for GST and Shipping Charges
  priceActual: any;
  gstAmount: any;
  tcsAmount: any;
  tdsAmount: any;
  bankSettlementAmount: any;

  onMrpInputChange(rowIndex: number): void {
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
    if (
      gstPercentage !== '' ||
      gstPercentage !== null ||
      gstPercentage !== undefined
    ) {
      this.gstAmount = this.calculateGST(this.priceActual, gstPercentage);
      this.tcsAmount = this.calculateTCS(this.priceActual, gstPercentage);
      this.tdsAmount = this.calculateTDS(this.priceActual);
      console.log('===========================');
      console.log('this.gstAmount:: ' + this.gstAmount);
      console.log('this.tcsAmount:: ' + this.tcsAmount);
      console.log('tdsAmount:: ' + this.tdsAmount);
      console.log(
        'commissionFeesCharge:: ' +
          this.taxAndChargesCriteria.commissionFeesCharge
      );

      this.bankSettlementAmount =
        this.priceActual -
        (this.gstAmount +
          this.tcsAmount +
          this.tdsAmount +
          parseFloat(this.taxAndChargesCriteria.commissionFeesCharge));
      console.log(this.bankSettlementAmount);
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
  calculateTCS(price: number, gstPercentage: string | number): number {
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
    console.log('GST value changed to:', gstValue);
    // You can also perform other operations here, like updating other form fields based on the GST value
    this.onMrpInputChange(0);
  }

  //Submit The Data in the DB-------------------------------------------------------------------------------------
  // cloneProductForm:any;

  // public submitProduct() {

  //     if (!this.files[0].file) {
  //       // Show error if the first file is not uploaded
  //       this.showError = true;
  //       this.productSizeError = true;
  //       this.productForm.markAllAsTouched();
  //       this.toast.error({detail:"Error",summary:"Fix all the Errors", position:"bottomRight",duration:3000});
  //       return;
  //     }

  //    if(this.productForm.value.productSizes.length <= 0){
  //       this.productSizeError = true;
  //       this.productForm.markAllAsTouched();
  //       this.toast.error({detail:"Error",summary:"Please Select Size", position:"bottomRight",duration:3000});
  //       return;
  //    }

  //     if (this.productForm.valid ) {
  //       //Cloning the Object
  //       this.cloneProductForm = this.productForm.value;
  //       console.log(this.cloneProductForm);

  //         this.productVerifierService.updateSellerProduct(this.cloneProductForm,this.variantId).subscribe(
  //           (response:any) => {
  //             this.toast.success({detail:"Success",summary:"Data Saved Success", position:"bottomRight",duration:3000});

  //             //upload File
  //             //this.uploadProductFiles(response.data);
  //           },
  //           (error:any) => {
  //           this.toast.error({detail:"Error",summary:"Data not saved", position:"bottomRight",duration:3000});
  //           }
  //         );
  //       } else {
  //         console.log('Form is invalid!');
  //         this.productForm.markAllAsTouched();
  //       }
  //   }

  // uploadProductFiles(productLockerNumber:any){
  //     console.log("Data ID :: " + productLockerNumber);

  //       const formData = new FormData();
  //       // Append all files to FormData
  //       this.files.forEach((fileObj, index) => {
  //         if (fileObj.file) {
  //           formData.append(`file${index}`, fileObj.file);
  //         }else{
  //           formData.append(`file${index}`, "");
  //         }
  //       });
  //     // Send the FormData to the Spring Boot backend
  //       this.productVerifierService.uploadProductFiles(formData,productLockerNumber).subscribe({
  //         next: (response) => {
  //         console.log('Files Upload successful', response);
  //           },
  //           error: (error) => {
  //             console.error('Upload failed', error);
  //           }
  //         });
  //     }

  async getSellerProductByIdAdmin(productId: any) {
    this.productVerifierService
      .getProductVariantByVariantId(productId)
      .subscribe(
        (res: any) => {
          try {
            this.dataCaptured = res.data;
            console.log('=============DATA RENDERING STARTING==============');
            console.log(this.dataCaptured);

            this.productForm.patchValue(this.dataCaptured);

            // Clear the Checkbox Data and Add Data in the Checkbox
            this.productSizesArray.clear();
            res.data.productSizes.forEach((checkBoxSelected: any) =>
              this.productSizesArray.push(new FormControl(checkBoxSelected))
            );

            this.tableRows.clear(); // Clear existing rows in the form array
            res.data.productRows.forEach((row: any) => {
              this.addTableRow(row); // Add rows to the form from the fetched data
            });

            res.data.productFiles.forEach((file: any, index: any) => {
              this.files[index].previewUrl = file.fileUrl;
            });

            this.spinner.hide();
          } catch (e) {
            console.error('Error while processing data:');
          }
        },
        (error: any) => {
          this.spinner.hide();
          console.error(
            'Error occurred while fetching product variant:',
            error
          );
        }
      );
  }



  // ==============================================================================
  // ==============================================================================
  //Proccess Product To live --------------START----------------------!!
  @ViewChild('proccedBox') proceedBox!: ElementRef;
  reviewList:any;
  proceedBoxOpen(): void {
    const request = {page:0,size:99999}
    this.productReviewService.getProductReviewStatus(request).subscribe(
      (res: any) => {
        console.log(res.data.content);
        this.reviewList = res.data.content;
        const modal = new bootstrap.Modal(this.proceedBox.nativeElement);
        modal.show();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  proceedBoxClose(){
    // Close the modal using Bootstrap's JavaScript API
    const modalElement = this.proceedBox.nativeElement;
    const modalInstance = bootstrap.Modal.getInstance(modalElement) 
                          || new bootstrap.Modal(modalElement);
    modalInstance.hide();
  }

  selectedReviewId:any;
  selectDecision(event: Event): any {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedReviewId = selectElement.value;
  }

  progressValue: number = 0;
  progressBar:any = false;
  proceedToLive():any {
    if (this.selectedReviewId === undefined || this.selectedReviewId === null || this.selectedReviewId === "") {
      alert("Please Select Review");
      return false;
    }
    

   const reviewId  = this.selectedReviewId;
   const id = this.dataCaptured.id; 

   const reviewData = {
     id: id,
     reviewDecisionId: reviewId,
   };
  
  this.productDecisionService.saveProductReviewDecision(reviewData).subscribe(
        (response: any) => {
          console.log(response);
          //Progress bar Starting
          this.progressBarStarting();
        },
        (error) => {
          console.log(error);
        }
      );
  } 

  progressBarStarting(){
    // Progresbar Active
    this.progressBar = true;
    this.progressValue = 0;
    const incrementInterval = 30; // 30ms interval
    const totalDuration = 3000; // 3000ms (3 seconds)
    const step = 100 / (totalDuration / incrementInterval);

    const interval = setInterval(() => {
      this.progressValue += step;
      if (this.progressValue >= 100) {
        this.progressValue = 100;
        clearInterval(interval);
        //Route To Product Under Review list
        this.proceedBoxClose();
        this.router.navigateByUrl("seller/dashboard/home/product-UnderReview");
      }
    }, incrementInterval);
  }

   


}
