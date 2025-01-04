import { Component, ElementRef, ViewChild } from '@angular/core';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { ProductServiceService } from '../../../../_services/productServices/product-service.service';
import { ProductStatusServiceService } from '../../../../_services/productStatusService/product-status-service.service';

// Import Bootstrap's Modal class
declare var bootstrap: any;


@Component({
  selector: 'app-product-incomplete',
  templateUrl: './product-incomplete.component.html',
  styleUrl: './product-incomplete.component.css'
})
export class ProductIncompleteComponent {
  @ViewChild('proccedBox') proceedBox!: ElementRef;

  dataCaptured:any;
  capturedResult:any =false;

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

  getAllIncompleteProduct(){
    this.productStatusService.getAllIncompleteProduct().subscribe((res: any) => {
      this.dataCaptured = res.data;
      this.capturedResult = true;
  });
}

// Logic to open the modal
cVariantId:any
variantProceedBoxOpen(variantId:any): void {
  this.cVariantId = variantId;

  const modal = new bootstrap .Modal(this.proceedBox.nativeElement);
  modal.show(); // Open the modal
}

variantEditModeProceed(){
  if( this.cVariantId !== null ||  this.cVariantId !== ""){
    this.router.navigate(['seller/dashboard/home/variantComplete', this.cVariantId]); 
  }else{
    alert("please Enter a Valid Varinat ID :: " +  this.cVariantId);
  }
}



// this.cashfree = (window as any).Cashfree({
//   mode: 'sandbox',
// });

// cashfree: any;
// this.onPayNow();

  // onPayNow(): void {
  //   const checkoutOptions = {
  //     paymentSessionId: 'session_eQTXrZcP3MxbgXLCMQMuU_2q7iaeGXsIfjjJn0IzAxBCmCcpTGByIUrfUWMenP5Sa3jJ-31ifNj8mJqlw_o-uUkCOrJbihBg3gODuY3mjtJLq_nLQaRPDRaSGwpaymentpayment',
  //     redirectTarget: '_modal',
  //   };

  //   this.cashfree.checkout(checkoutOptions).then((result: any) => {
  //     if (result.error) {
  //       // Handle errors or user closing the popup
  //       console.log('User has closed the popup or there is some payment error, Check for Payment Status');
  //       console.log(result.error);
  //     }
  //     if (result.redirect) {
  //       // Handle cases where the payment redirection couldn't open in the same window
  //       console.log('Payment will be redirected');
  //     }
  //     if (result.paymentDetails) {
  //       // Handle completed payments
  //       console.log('Payment has been completed, Check for Payment Status');
  //       console.log(result.paymentDetails.paymentMessage);
  //     }
  //   });
  // }

}