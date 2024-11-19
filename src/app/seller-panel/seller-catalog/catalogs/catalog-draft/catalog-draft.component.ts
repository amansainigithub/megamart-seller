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
  selector: 'app-catalog-draft',
  templateUrl: './catalog-draft.component.html',
  styleUrl: './catalog-draft.component.css'
})
export class CatalogDraftComponent {

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
        //All Draft List
        this.getDraftCatalogList({ page: "0", size: "10" });
      }


      
  
  //Draft Catalog Starting
  draftCatalogList:any=null;
  getDraftCatalogList(request:any)
  { 
      //Show Loading
      this.spinner.show();

      this.catalogService.getDraftCatalogListService(request).subscribe({
        next:(res:any)=> {
          this.draftCatalogList = res.data['content'];
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
  //Draft Catalog Ending


  nextPagedraft(event: PageEvent) {
    console.log(event);
    const request:any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getDraftCatalogList(request);
  }
  
}
