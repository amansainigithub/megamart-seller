import { Component } from '@angular/core';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from '../../../../_services/sharedService/shared-data.service';
import { HttpClient } from '@angular/common/http';
import { CatalogService } from '../../../../_services/catalogService/catalog.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {

  activeTab: number = 0; // Keeps track of the active tab index.
  
  formArray:any = FormArray;

  forms: any[] = []; // Array to hold form data objects
  sizeList = [
    { size: 'S' },
    { size: 'M' },
    { size: 'L' },
    { size: 'XL' },
  ]; // Size options

  activeTabIndex: number = 0; // Track the active tab index


  constructor( 
    private tokenStorage: TokenStorageService, 
    private toast:NgToastService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private sharedDataService:SharedDataService,
    private http: HttpClient,
    private fb: FormBuilder,
    private catalogService:CatalogService) {  

    this.addForm(); // Initialize with one form

      }


    //sharedDataService
    receivedData:any;

    //getCatalogById
    catalogResponse : any ;

    //Master Data
    hsnCodeList:any="";
    // sizeList:any="";
    netQuantityList:any="";
    materialList:any="";
    catalogTypeList:any="";
    gstList:any;
    weightList:any;
    lengthList:any;
    breathList:any;
    heightList:any;


    ngOnInit(): void {
    this.receivedData =  this.sharedDataService.getData();
    this.receivedData = {catalogId : 32}
    if(this.receivedData === "" || this.receivedData=== undefined ||  this.receivedData === null ||  this.receivedData === "")
    {
        this.toast.error({detail:"Category is Null or Empty",summary:"Error", position:"topRight",duration:3000});
    }else{
      this.toast.success({detail:this.receivedData.catalogId , summary:"Data Fetching", position:"topRight",duration:3000});
      
      //calling current Catalog By Id
      this.getCatalogById(this.receivedData.catalogId);
    }

    //get Masters 
    this.getCatalogMasters();
  }


  //Get Current Catalog By Id

  getCatalogById(catalogId:any)
  {
    this.spinner.show();

    //save Catalog Form Data
    this.catalogService.getCatalogById(catalogId).subscribe(res => {
      
      this.catalogResponse = res.data;
      console.log(this.catalogResponse);
      this.toast.success({detail:"Success",summary:"Get Catalog By Id Success: " + res.data.id, position:"topRight",duration:3000});

      this.spinner.hide();
     },
     err=>{
         this.toast.error({detail:"Category Not Fetched Because id is Hardcoded",summary:"Error", position:"topRight",duration:3000});
         console.log(err);
         this.spinner.hide();
   })
  }

  
  getCatalogMasters(){
    this.spinner.show();
    ///save Catalog Form Data
    this.catalogService.getCatalogMasters().subscribe(
      {
          next:(res:any)=> {
          console.log(res);

          //Hsn List
          this.hsnCodeList = res.data.hsn;
          
          //Size List  
          this.sizeList = res.data.catalogSize;

          //Size List  
          this.netQuantityList = res.data.netQuantityList;

          //Material List  
          this.materialList = res.data.materialList;

          //Material List  
          this.catalogTypeList = res.data.typeList;

          //gstList List  
          this.gstList = res.data.gstPercentageList;

          //Weight List  
          this.weightList = res.data.catalogWeightList;

          //length List  
          this.lengthList = res.data.lengthList;

          //Breath List  
          this.breathList = res.data.catalogBreathList;

          //Height List  
          this.heightList = res.data.heightLists;

          this.spinner.hide();
        },
        error:(err:any)=>  {
          console.log(err)
          this.spinner.hide();
          this.toast.error({detail:"Error",summary:"Error in fetching Masters", position:"bottomRight",duration:3000});
        }
      }
    );
  }








  


  // createForm(): FormGroup {
  //   return this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', Validators.required],
  //     check: [false]
  //   });
  // }

  // addForm(): void {
  //   if (this.formArray.length < 5) {
  //     this.formArray.push(this.createForm());
  //     this.activeTab = this.formArray.length - 1; // Automatically switch to the new tab.
  //   } else {
  //     alert('You can only add up to 5 forms.');
  //   }
  // }

  // removeForm(index: number): void {
  //   if (index === 0) {
  //     alert('The first form cannot be removed.');
  //     return;
  //   }
  //   this.formArray.removeAt(index);
  //   // Adjust active tab index after removal
  //   if (this.activeTab >= this.formArray.length) {
  //     this.activeTab = this.formArray.length - 1; // Focus on the last remaining tab.
  //   }
  // }

  // onSubmit(): void {
  //   const allFormData = this.formArray.value;
  //   console.log('Submitted Data:', JSON.stringify(allFormData));
  //   // Handle the submitted data (e.g., send to API)
  // }

  addForm() {
    if (this.forms.length < 5) {
      this.forms.push({
        catalogName: '',
        size: ''
      });
      this.activeTabIndex = this.forms.length - 1; // Set the newly added form as the active tab
    } else {
      alert('You can only create up to 5 tabs.');
    }
  }

  removeForm(index: number) {
    // Prevent removal of the first tab
    if (index === 0) {
      alert('The first tab cannot be removed.');
      return;
    }

    // Remove the form
    this.forms.splice(index, 1);

    // Adjust the active tab if needed
    if (this.activeTabIndex >= this.forms.length) {
      this.activeTabIndex = this.forms.length - 1; // If the last tab is removed, go to the previous one
    }
  }

  submitAllForms() {
    const validForms = this.forms.filter(form => form.catalogName && form.size); // Ensure the form is valid (both fields are filled)
    
    if (validForms.length === this.forms.length) {
      const formData = JSON.stringify(validForms); // Convert to JSON
      console.log('All Form Data:', formData);
      // You can now send `formData` to your backend API via an HTTP request
    } else {
      alert('Some forms are incomplete. Please fill all fields.');
    }
  }

































}



