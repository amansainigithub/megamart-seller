import { Component } from '@angular/core';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { ProductServiceService } from '../../../../_services/productServices/product-service.service';
import { ProductStatusServiceService } from '../../../../_services/productStatusService/product-status-service.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-pending',
  templateUrl: './product-pending.component.html',
  styleUrl: './product-pending.component.css'
})
export class ProductPendingComponent {

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
   this.getAllPendingProduct({ page: "0", size: "10" }) ;
  }


pendingDataCaptured:any[]=[];
filteredItems:any;
totalElements:any;
 //SearchList
searchText: string = '';

getAllPendingProduct(request:any)
  { 
      //Show Loading
      this.spinner.show();
      this.productStatusService.getPendingProductList(request).subscribe({
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
    this.getAllPendingProduct(request);
  }



//Search Starting
onSearch() {
  const searchQuery = this.searchText.trim().toLowerCase();
  if (searchQuery) {
    this.filteredItems = this.pendingDataCaptured.filter(item => 
      String(item.id).toLowerCase().includes(searchQuery)
    );
  } else {
    this.filteredItems = this.pendingDataCaptured;
  }
}
//Search Ending




}
