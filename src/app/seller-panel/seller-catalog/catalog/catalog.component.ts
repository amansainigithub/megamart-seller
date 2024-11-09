import { Component } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';
import { UserService } from '../../../_services/user.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CatalogService } from '../../../_services/catalogService/catalog.service';
import { SharedDataService } from '../../../_services/sharedService/shared-data.service';
import { SaveCatalogService } from '../../../_services/catalog/saveCatalogService/save-catalog.service';
import { ElementRef, ViewChild } from '@angular/core';


declare var bootstrap: any; // Declare bootstrap for accessing modal methods
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {

//Model properties  
@ViewChild('myModal', { static: false }) myModal!: ElementRef;

babyFlag = true;
bornFlag = true;
fileFlag = false;
isButtonDisabled = true; 

  constructor(private authService: AuthService , 
    private UserService:UserService ,  
    private toast:NgToastService,
    private router: Router,
    private spinner: NgxSpinnerService ,
    private catalogService:CatalogService,
    private sharedDataService:SharedDataService,
    private saveCatalogService:SaveCatalogService) { }

 
    ngOnInit(): void {
      this.getParentCategory();    
      
      if(localStorage.getItem("CUS") === "SUCCESS")
      {
        //model is Open 
        this.openModal();

        // remove CUS Value
        localStorage.removeItem("CUS");
      }         
    }

  // Define the selected category and subcategory
  selectedParentcategory: string | null = null;
  // Function to select a subcategory
  selectParentcategory(subcategory: string) {
    this.selectedParentcategory = subcategory;
  }

 // Define the selected category and subcategory
 selectChildCategory: string | null = null;
  selectChildcategory(childCategory: string){
    this.selectChildCategory = childCategory;
  }

   // Define the selected category and subcategory
 selectBabyCategory: string | null = null;
 selectBabycategory(babyCategory: string){
   this.selectBabyCategory = babyCategory;
 }

  // Define the selected category and subcategory
  selctBornCategory: string | null = null;
  selectBornCategory(bornCategory: string){
    this.selctBornCategory = bornCategory;
  }

  parentList:any;
  getParentCategory()
  {
    this.spinner.show();

    //file Show and Hide Flag
    this.fileFlag = false;

    this.catalogService.getParentCategoryService().subscribe(res => {
      this.parentList = res.data;
      this.spinner.hide();
    },
        err=>{
        console.log(err);
        this.spinner.hide();
  })
  }


//Get Parent Id and Prent Id get to babay Category Data
childList:any;
sendParentId(parentId:any) {

    this.babyFlag = false;
    this.bornFlag = false;

    //file Show and Hide Flag
    this.fileFlag = false;

    // button disabled
    this.isButtonDisabled  =true;


    this.spinner.show();
    this.catalogService.getChildCategoryService(parentId).subscribe(res => {
      this.childList = res.data;
      this.spinner.hide();
    },
        err=>{
        console.log(err);
        this.spinner.hide();
  })
}




//Get Parent Id and Prent Id get to babay Category Data 
babyList:any;
sendChildId(childId:any) {
    this.spinner.show();

    this.babyFlag = true;
    this.bornFlag = false;

    //file Show and Hide Flag
    this.fileFlag = false;

    // button disabled
    this.isButtonDisabled  =true;

    this.catalogService.getBabyCategoryService(childId).subscribe(res => {
      this.babyList = res.data;
      this.spinner.hide();
    },
    err=>{
        console.log(err);
        this.spinner.hide();
  })
}


//Get Parent Id and Prent Id get to babay Category Data 
bornList:any;
sendBabyId(babyId:any) {
    this.spinner.show();

    this.bornFlag = true;
    //file Show and Hide Flag
    this.fileFlag = false;

    // button disabled
    this.isButtonDisabled  =true;

    this.catalogService.getBornCategoryService(babyId).subscribe(res => {
      this.bornList = res.data;
      this.spinner.hide();
    },
    err=>{
        console.log(err);
        this.spinner.hide();
  })
}



//Last Category Selected
bornData:any;
categoryBreadCrumb:any;
bornCategoryId:any;
bornCategoryName :any;
getBornCategoryById(bornId:any , bornCategoryName:any)
{
          this.spinner.show();
          this.fileFlag = true;
          this.isButtonDisabled  =false;

          //Set Born Category Id
          this.bornCategoryId = bornId
          this.bornCategoryName = bornCategoryName;

          this.catalogService.getBornById(bornId).subscribe(res => {            

            this.bornData = res.data.node;
            this.categoryBreadCrumb = res.data.categoryBreadCrumb;
           
            this.categoryBreadCrumb = this.categoryBreadCrumb.split('/').reverse().join('/');
            console.log(this.categoryBreadCrumb);
            this.spinner.hide();
          },
          err=>{
              console.log(err);
              this.spinner.hide();
        });
}


//Catalog Form
catalogForm = {
  sellerStoreName:"Sumit Singh",
  categoryName :"",
  categoryId:""
}

continueCatalogProcess(){
  const modalElement = document.getElementById('termsModal');
  const modalInstance = bootstrap.Modal.getInstance(modalElement); // Get the Bootstrap modal instance
  if (modalInstance) {
    modalInstance.hide();  // Close the modal programmatically
  }
  if(this.bornCategoryId != null)
  {
      this.catalogForm.categoryName = this.bornCategoryName;
      this.catalogForm.categoryId = this.bornCategoryId;

       //Set Catalog Id to shared Service 
       this.sharedDataService.setData({catalogId:"100"});
       
       this.router.navigate(['/seller/dashboard/home/catalog-info']);

       this.spinner.hide();
     
  }
}


//Open Model Starting
  openModal(): void {
    const modalElement = document.getElementById('myModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show(); // Show the modal programmatically
  }
  //Open Model Ending

   // Close model Ending
   closeModal(): void {
    const modalElement = document.getElementById('myModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide(); // Hide the modal programmatically
  }
  //Close model Ending



  //Tab Change Starting
  onRootTabChange(index: number): void {
    if (index === 0) {
      console.log("Buil Uploads tab selected");
      // Call your specific function for the first tab
      this.firstTabFunction();
    } else if (index === 1) {
      console.log("Single Catalogs tab selected");
      // Call your specific function for the second tab
      this.secondTabFunction();
    }
  }
  
  firstTabFunction(): void {
    // Add code for actions to perform when the first tab is selected
  }
  
  secondTabFunction(): void {
    // Add code for actions to perform when the second tab is selected
    this.getAllCatalogListByUsername();
  }
  //Tab Change Ending




  catalogStatusChecker(index: number): void{
    if (index === 0) {
      // Add code for actions to perform when the second tab is selected
      this.getAllCatalogListByUsername();
    } 
    else if (index === 1) {
      this.getProgressCatalogList();
    }
    else if (index === 2) {
    }
    else if (index === 3) {
    }
    else if (index === 4) {
      this.getDraftCatalogList();
    }
  }

  

  //Get Catalog All Starting
  allCatalog:any=null;
  getAllCatalogListByUsername()
  { 
    //Show Loading
    this.spinner.show();

    this.catalogService.getAllCatalogByUsername().subscribe(res => {     
      this.allCatalog =  res.data;

      console.log(this.allCatalog);

      //Hide Loading
      this.spinner.hide();
    },
    err=>{
        console.log(err);
        this.toast.error({ detail: "Failed", summary: "All Catalog Loaded Failed", position: "bottomRight", duration: 3000 });

        //Hide Loading
        this.spinner.hide();
  })
  }
  //Get Catalog All Ending



  //Progress Catalog
  progressCatalogList:any=null;
  getProgressCatalogList()
  { 
      //Show Loading
      this.spinner.show();

      this.catalogService.getProgressCatalogListService().subscribe(res => {     
        this.progressCatalogList =  res.data;

        console.log("Progress Data List")
        console.log(this.progressCatalogList);
        //Hide Loading
        this.spinner.hide();
      },
      err=>{
          console.log(err);
          this.toast.error({ detail: "Failed", summary: "Progress Catalog Loaded Failed", position: "bottomRight", duration: 3000 });

          //Hide Loading
          this.spinner.hide();
    })
  }
   //Progress Catalog Ending

  
  //Draft Catalog Starting
  draftCatalogList:any=null;
  getDraftCatalogList()
  { 
      //Show Loading
      this.spinner.show();

      this.catalogService.getDraftCatalogListService().subscribe(res => {     
        this.draftCatalogList =  res.data;

        console.log("Draft Data List")
        console.log(this.draftCatalogList);
        //Hide Loading
        this.spinner.hide();
      },
      err=>{
          console.log(err);
          this.toast.error({ detail: "Failed", summary: "Draft Catalog Loaded Failed", position: "bottomRight", duration: 3000 });

          //Hide Loading
          this.spinner.hide();
    })
  }
  //Draft Catalog Ending

}
