import { Component } from '@angular/core';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { ProductServiceService } from '../../../../_services/productServices/product-service.service';

@Component({
  selector: 'app-product-incomplete',
  templateUrl: './product-incomplete.component.html',
  styleUrl: './product-incomplete.component.css'
})
export class ProductIncompleteComponent {


   constructor(private tokenStorage: TokenStorageService, 
               private toast:NgToastService,
               private route: ActivatedRoute,
               private router: Router,
               private spinner: NgxSpinnerService,
               private http: HttpClient,
               private productService:ProductServiceService) {    
               }

  ngOnInit(): void 
  {
   this.getAllIncompleteProduct() ;
  }







  tableData = [
    {
      id: 1,
      name: 'John Doe',
      age: 28,
      details: {
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: '123 Main St, Anytown, USA'
      },
      isExpanded: false
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 34,
      details: {
        email: 'jane.smith@example.com',
        phone: '987-654-3210',
        address: '456 Elm St, Othertown, USA'
      },
      isExpanded: false
    }
  ];


  toggleRow(row: any): void {
    row.isExpanded = true;
  }

  dataCaptured:any;

  getAllIncompleteProduct(){
    this.productService.getAllIncompleteProduct().subscribe((res: any) => {
      
      this.dataCaptured = res.data;
      console.log("========================");
      console.log(res);
  });


}


}