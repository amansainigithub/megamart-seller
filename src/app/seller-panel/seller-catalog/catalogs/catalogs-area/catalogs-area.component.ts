import { Component } from '@angular/core';
import { AuthService } from '../../../../_services/auth.service';
import { UserService } from '../../../../_services/user.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CatalogService } from '../../../../_services/catalogService/catalog.service';
import { SharedDataService } from '../../../../_services/sharedService/shared-data.service';
import { SaveCatalogService } from '../../../../_services/catalog/saveCatalogService/save-catalog.service';


class FileUpload {
  selectedFile: File | null = null;
  selectedImage: string | ArrayBuffer | null = null;
  uploadProgress: number = 0;
  isUploading: boolean = false;
}

declare var bootstrap: any; // Declare bootstrap for accessing modal methods
@Component({
  selector: 'app-catalogs-area',
  templateUrl: './catalogs-area.component.html',
  styleUrl: './catalogs-area.component.css'
})
export class CatalogsAreaComponent {

  babyFlag = true;
  bornFlag = true;
  fileFlag = false;
  isButtonDisabled = true; 
  
  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  
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
        
        //All Catalog List
        this.getAllCatalogListByUsername({ page: "0", size: "10" });


        this.fetchData();
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
         this.sharedDataService.setData({bornCategoryId:this.bornCategoryId});
         
         this.router.navigate(['/seller/dashboard/home/singleProductListing']);
  
         this.spinner.hide();
       
    }
  }


  
    //Get Catalog All Starting
    allCatalog:any=null;
    catalogsCount:any;
    draftCount:any;
    errorCount:any;
    progressCount:any;
    qcPassCount:any;
    getAllCatalogListByUsername(request:any)
    { 
      //Show Loading
      this.spinner.show();
  
      this.catalogService.getAllCatalogByUsername(request)
      .subscribe(
        {
          next:(res:any)=> {
            this.allCatalog = res.data.catalogPage['content']
            this.totalElements = res.data.catalogPage['totalElements'];
            this.catalogsCount = res.data.catalogPage['totalElements'];
            this.errorCount = res.data['errorCount'];
            this.qcPassCount = res.data['qcPassCount'];
            this.progressCount = res.data['progressCount'];
            this.draftCount = res.data['draftCount'];
            this.spinner.hide();
          },
          error:(err:any)=>  {
            console.log(err)
            this.spinner.hide();
            this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
  
          }
        }
      )
    }
    //Get Catalog All Ending

    
    //Open Model When Catalog Upload Success Working only Once Time Starting
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
    //Open Model When Catalog Upload Success Working only Once Time Ending
  








    chartType: string = 'line';  // Set the chart type (can be 'line', 'pie', etc.)

  // Dynamic data coming from the backend or defined elsewhere
  rawData = [
    { count: 2, Date: '2024-07-10' },
    { count: 1, Date: '2024-11-10' },
    { count: 2, Date: '2024-11-15' },
    { count: 2, Date: '2024-11-21' },
    { count: 3, Date: '2024-11-22' },
    { count: 16, Date: '2024-11-18' },
    { count: 10, Date: '2024-10-10' },
    { count: 17, Date: '2024-01-06' },
    { count: 18, Date: '2024-01-05' },

  ];

  chartData: any[] = [];
  chartLabels: string[] = [];

  chartOptions:any;

    
fetchData() {
// Populate chartData and chartLabels dynamically based on the rawData
    const counts = this.rawData.map(item => item.count); // Extract count values
    const dates = this.rawData.map(item => item.Date); // Extract Date values

    this.chartData = [
      {
        data: counts,  // Set the dynamic counts
        label: 'Series A',  // You can change this if needed
        backgroundColor: 'rgba(193, 254, 182, 0.8)',  // Fill color for the area under the line
        tension: 0.5,  // Smooth the line
        fill: true,  // Fill the area under the line
      }
    ];

    this.chartLabels = dates;  // Set dynamic labels
    this.chartOptions = {responsive: true };
}


}