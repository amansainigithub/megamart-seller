import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { ProductServiceService } from '../../../../_services/productServices/product-service.service';
import { ProductStatusServiceService } from '../../../../_services/productStatusService/product-status-service.service';

@Component({
  selector: 'app-product-approved',
  templateUrl: './product-approved.component.html',
  styleUrl: './product-approved.component.css'
})
export class ProductApprovedComponent {

   constructor(private tokenStorage: TokenStorageService, 
               private toast:NgToastService ,
               private activateRoute: ActivatedRoute,
               private router: Router,
               private spinner: NgxSpinnerService,
               private http: HttpClient,
               private productService:ProductServiceService,
              private productStatusService:ProductStatusServiceService) {    
               }

               
  ngOnInit(): void 
  {
   this.getApprovedProductList({ page: "0", size: "10" }) ;
  }


pendingDataCaptured:any[]=[];
filteredItems:any;
totalElements:any;
 //SearchList
searchText: string = '';

getApprovedProductList(request:any)
  { 
      //Show Loading
      this.spinner.show();
      this.productStatusService.getApprovedProductList(request).subscribe({
        next:(res:any)=> {
          console.log(res);
          
          this.pendingDataCaptured = res.data['content'];
          this.filteredItems  = this.pendingDataCaptured;
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





  nextPagePending(event: PageEvent) {
    console.log(event);
    const request:any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getApprovedProductList(request);
  }



//Search Starting
onSearch() {
  const searchQuery = this.searchText.trim().toLowerCase();
  if (searchQuery) {
    this.filteredItems = this.pendingDataCaptured.filter(item => 
      String(item.productCode).toLowerCase().includes(searchQuery)
    );
  } else {
    this.filteredItems = this.pendingDataCaptured;
  }
}
//Search Ending
}
