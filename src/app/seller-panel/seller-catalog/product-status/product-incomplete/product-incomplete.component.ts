import { Component } from '@angular/core';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { ProductServiceService } from '../../../../_services/productServices/product-service.service';
import { ProductStatusServiceService } from '../../../../_services/productStatusService/product-status-service.service';

@Component({
  selector: 'app-product-incomplete',
  templateUrl: './product-incomplete.component.html',
  styleUrl: './product-incomplete.component.css'
})
export class ProductIncompleteComponent {


   constructor(private tokenStorage: TokenStorageService, 
               private toast:NgToastService,
               private activateRoute: ActivatedRoute,
               private router: Router,
               private spinner: NgxSpinnerService,
               private http: HttpClient,
               private productService:ProductServiceService,
              private productStatusService:ProductStatusServiceService) {    
               }

  ngOnInit(): void 
  {
   this.getAllIncompleteProduct() ;
  }


  toggleRow(row: any): void {
    row.isExpanded = !row.isExpanded;
  }

  dataCaptured:any;
  capturedResult:any =false;

  getAllIncompleteProduct(){
    this.productStatusService.getAllIncompleteProduct().subscribe((res: any) => {
      
      this.dataCaptured = res.data;
      console.log("========================");
      console.log(res);
      this.capturedResult = true;
  });
}


variantComplete(variantId:any){
  console.log(variantId);

  if(variantId !== null || variantId !== ""){

    this.router.navigate(['seller/dashboard/home/variantComplete', variantId]); 

  }else{
    alert("please Enter a Valid Varinat ID :: " + variantId);
  }
}


}