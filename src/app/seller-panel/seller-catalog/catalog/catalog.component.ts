import { Component } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';
import { UserService } from '../../../_services/user.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CatalogService } from '../../../_services/catalogService/catalog.service';
import { SharedDataService } from '../../../_services/sharedService/shared-data.service';
import { SaveCatalogService } from '../../../_services/catalog/saveCatalogService/save-catalog.service';


declare var bootstrap: any; // Declare bootstrap for accessing modal methods
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {

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
        })
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

       //save Catalog Form Data
       this.catalogService.saveCatalogService(this.catalogForm).subscribe(res => {

       this.toast.success({detail:"Success",summary:"Data Saved Success", position:"topRight",duration:3000});

       //Set Catalog Id to shared Service 
       this.sharedDataService.setData({catalogId:res.data.id});
       
       this.router.navigate(['/seller/dashboard/home/catalog-info']);

       this.spinner.hide();
      },
      err=>{
          this.toast.error({detail:"Something went Wrong",summary:"Error", position:"topRight",duration:3000});
          console.log(err);
          this.spinner.hide();
    })
    
    
  }
}


}
