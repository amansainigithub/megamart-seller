import { Component } from '@angular/core';
import { AuthService } from '../../../../_services/auth.service';
import { UserService } from '../../../../_services/user.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CatalogService } from '../../../../_services/catalogService/catalog.service';
import { SharedDataService } from '../../../../_services/sharedService/shared-data.service';
import { SaveCatalogService } from '../../../../_services/catalog/saveCatalogService/save-catalog.service';
import { PageEvent } from '@angular/material/paginator';


declare var bootstrap: any; // Declare bootstrap for accessing modal methods
@Component({
  selector: 'app-catalog-all',
  templateUrl: './catalog-all.component.html',
  styleUrl: './catalog-all.component.css'
})
export class CatalogAllComponent {

babyFlag = true;
bornFlag = true;
fileFlag = false;
isButtonDisabled = true; 

totalElements: number = 0;
currentPage: number = 1;
itemsPerPage: number = 10;

 //Filter List For Searching
  filteredItems:any = [];

//SearchList
searchText: string = '';

  constructor(private authService: AuthService , 
    private UserService:UserService ,  
    private toast:NgToastService,
    private router: Router,
    private spinner: NgxSpinnerService ,
    private catalogService:CatalogService,
    private sharedDataService:SharedDataService,
    private saveCatalogService:SaveCatalogService) { }


    ngOnInit(): void {
      //All Catalog List
      this.getAllCatalogListByUsername({ page: "0", size: "10" });
    }



    //Get Catalog All Starting
  allCatalog:any[]=[];
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
          this.filteredItems  = this.allCatalog;

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
//Progress Catalog Ending



nextPageProgress(event: PageEvent) {
  console.log(event);
  const request:any = {};
  request['page'] = event.pageIndex.toString();
  request['size'] = event.pageSize.toString();
  this.getAllCatalogListByUsername(request);
}


//Search Starting
onSearch() {
  const searchQuery = this.searchText.trim().toLowerCase();

  if (searchQuery) {
    this.filteredItems = this.allCatalog.filter(item => 
      item.catalogId.toLowerCase().includes(searchQuery)
    );
  } else {
    this.filteredItems = this.allCatalog;
  }
}
//Search Ending

}
