import { Component, Optional } from '@angular/core';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from '../../../../_services/sharedService/shared-data.service';
import { HttpClient } from '@angular/common/http';
import { ProductServiceService } from '../../../../_services/productServices/product-service.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  FormControl } from '@angular/forms';

@Component({
  selector: 'app-single-product-listing',
  templateUrl: './single-product-listing.component.html',
  styleUrl: './single-product-listing.component.css'
})
export class SingleProductListingComponent {

  productForm:any = FormGroup;

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

      ngOnInit() {
        this.bornCategoryId = 2;
        this.productForm = this.formBuilder.group({
                                                    productSizes: this.formBuilder.array([]),
                                                    tableRows:this.formBuilder.array([])
                                                  });

        this.productService.formBuilderFlying(this.bornCategoryId).subscribe((data: any) => {
          console.log(data);
          this.productIdentityListFromMaker = data.productIdentityList;
          this.productSizesFormMaker = data.productSizes;
          this.tableRowsFormMaker = data.productVariants;

          console.log("==========================================================");       
          console.log(this.tableRowsFormMaker);  
          //calling to create dynamically Keys
          this.dynamicallykeysAndValidationBuilder(data.productIdentityList);
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

    addTableRow(optionValue:any) {

     console.log(optionValue);
     
      
      const row = this.formBuilder.group({}); // Create a new FormGroup for the row

      this.tableRowsFormMaker.forEach(col => {
        if (col.type === 'DROPDOWN') {
          // row.addControl(col.identifier, this.formBuilder.control(data[col.identifier] || col[0], Validators.required));
        } else if(col.type === 'TEXT') {
          row.addControl(col.identifier, this.formBuilder.control(optionValue[col.identifier] ||'', Validators.required));
        }else if(col.type === 'LABEL' )
        {
          row.addControl(col.identifier, this.formBuilder.control(optionValue[col.identifier] ||optionValue, Validators.required));
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
  }


      submitProduct()
      {
        console.log("data");
        this.productForm.markAllAsTouched();
      }







      // Helper to get FormArray
      get productSizesArray(): FormArray {
        return this.productForm.get('productSizes') as FormArray;
      }
      // Load data with pre-selected options
      loadData() {

        this.productForm.patchValue({productName:"Jackets",gst:"10 %",hsn:"133014"})

        const preSelectedOptions = ['S', 'M'];
        // Clear existing values in FormArray
        this.productSizesArray.clear();
        // Add pre-selected options
        preSelectedOptions.forEach((checkBoxSelected) =>
          this.productSizesArray.push(new FormControl(checkBoxSelected))
        );

        const arrayLoaded = [ { productLabel: "S", productPrice: "2121" }, { productLabel: "M", productPrice: "21" } ]

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
