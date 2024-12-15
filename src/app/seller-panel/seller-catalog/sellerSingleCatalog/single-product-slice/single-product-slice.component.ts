import { Component } from '@angular/core';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from '../../../../_services/sharedService/shared-data.service';
import { HttpClient } from '@angular/common/http';
import { ProductServiceService } from '../../../../_services/productServices/product-service.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-product-slice',
  templateUrl: './single-product-slice.component.html',
  styleUrl: './single-product-slice.component.css'
})
export class SingleProductSliceComponent {

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

    customerData:any = FormGroup;

    ngOnInit() {

     this.customerData =  this.formBuilder.group({
                          firstName: new FormControl({ value: '', disabled: true },[Validators.required,Validators.minLength(5)]),
                          lastName: new FormControl(''),
                          address: new FormControl(''),
                          mobile: new FormControl(''),
                          customerSizes: new FormControl('',[Validators.required,]),
                          tableRows:this.formBuilder.array([]),
                          selectedOptions:[[]], // Array to store selected options
                          })

                           // Disable the firstName field
    this.customerData.get('firstName')?.disable();


    }
    toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
    toppings = new FormControl('');
    addTableRows(){
          const shirtValue = "GG";
           const rowsData =    this.formBuilder.group({
                                        tshirSizes:new FormControl(shirtValue), // Default value
                                        length: new FormControl('',[Validators.required,Validators.minLength(5)]),
                                    });
                  this.tableRows.push(rowsData);                                    
                  }

    get tableRows():FormArray{  
      return this.customerData.get("tableRows") as FormArray;
    }                
    
      // Remove a row from the table
  removeRow(index: number) {
    this.tableRows.removeAt(index);
  }


    onSubmit(){
      this.customerData.markAllAsTouched();
      console.log(this.customerData.value);
    }

    LoadData() {

      console.log(this.toppings);
      

      
      const normalData = {
        firstName: "Test 400", 
        lastName: " Test 300",
         address: "Test 200", 
         mobile: "Test 100",
         customerSizes: "3"}

         this.customerData.patchValue(normalData)

      const initialData = [
        { length: '4', tshirSizes: 'GG', tSizes: '' },
        { length: 'A', tshirSizes: 'ML', tSizes: '' },
      ];
    
      initialData.forEach((data) => {
        const currentRows = this.formBuilder.group({
          tshirSizes: new FormControl(data.tshirSizes), // Preset value, no validator needed
          length: new FormControl(data.length, [Validators.required,Validators.minLength(2)]), // Required validator
        });
        this.tableRows.push(currentRows);
      });
      
      this.loadSelectedOptions();
     
    }

// Method to load pre-selected options
// Method to load pre-selected options
loadSelectedOptions() {
  const preSelectedOptions = ['Option 1', 'Option 4']; // Example: options to pre-select
  this.customerData.patchValue({ selectedOptions: preSelectedOptions }); // Update form control
  alert('Load Data Success');
}
    
options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

// Method to handle selection change
toggleSelection(optionValue: string) {
  const selectedOptions: string[] = this.customerData.value.selectedOptions;

  if (selectedOptions.includes(optionValue)) {
    // If the option is already selected, remove it
    const index = selectedOptions.indexOf(optionValue);
    selectedOptions.splice(index, 1);
  } else {
    // Otherwise, add the option
    selectedOptions.push(optionValue);
  }

}




}
