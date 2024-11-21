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


@Component({
  selector: 'app-catalog-pass',
  templateUrl: './catalog-pass.component.html',
  styleUrl: './catalog-pass.component.css'
})
export class CatalogPassComponent {
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
        this.getQcPassCatalogList({ page: "0", size: "10" });
      }



      //Error Catalog Starting
  qcPassCatalogList:any[]=[];
  getQcPassCatalogList(request:any)
  { 
      //Show Loading
      this.spinner.show(request);

      this.catalogService.getQCPassCatalogListService(request).subscribe({
        next:(res:any)=> {
          this.qcPassCatalogList = res.data['content'];
          this.filteredItems  = this.qcPassCatalogList;

          this.totalElements = res.data['totalElements'];
          this.spinner.hide();
        },
        error:(err:any)=>  {
          console.log(err)
          this.spinner.hide();
          this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});

        }
      })
  }
  //Error Catalog Ending
  


  nextPagePass(event: PageEvent) {
    console.log(event);
    const request:any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getQcPassCatalogList(request);
  }



  //Search Starting
onSearch() {
  const searchQuery = this.searchText.trim().toLowerCase();

  if (searchQuery) {
    this.filteredItems = this.qcPassCatalogList.filter(item => 
      item.catalogId.toLowerCase().includes(searchQuery)
    );
  } else {
    this.filteredItems = this.qcPassCatalogList;
  }
}
//Search Ending
  
}
