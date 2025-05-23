import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import {  Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { ProductVerifierServiceService } from '../../../_services/product-service/productVerifierService/product-verifier-service.service';
import { PageEvent } from '@angular/material/paginator';

// Import Bootstrap's Modal class
declare var bootstrap: any;


@Component({
  selector: 'app-seller-product-under-review',
  templateUrl: './seller-product-under-review.component.html',
  styleUrl: './seller-product-under-review.component.css',
})
export class SellerProductUnderReviewComponent {
  @ViewChild('proccedBox') proceedBox!: ElementRef;

  constructor(
    private toast: NgToastService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private productVerifierService: ProductVerifierServiceService
  ) {}

  ngOnInit(): void {
    this.getproductsUnderReview({ page: '0', size: '10' });
  }

  pendingDataCaptured: any[] = [];
  filteredItems: any;
  totalElements: any;
  //SearchList
  searchText: string = '';

  getproductsUnderReview(request: any) {
    //Show Loading
    this.spinner.show();
    this.productVerifierService
      .getUnderReviewNoVariantProductList(request)
      .subscribe({
        next: (res: any) => {
          // console.log(res);
          this.pendingDataCaptured = res.data['content'];
          this.filteredItems = this.pendingDataCaptured;
          this.totalElements = res.data['totalElements'];
          this.spinner.hide();
        },
        error: (err: any) => {
          // console.log(err)
          this.spinner.hide();
          this.toast.error({
            detail: 'Error',
            summary: err.error.data.message,
            position: 'bottomRight',
            duration: 3000,
          });
        },
      });
  }

  nextPagePending(event: PageEvent) {
    // console.log(event);
    const request: any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getproductsUnderReview(request);
  }

  // Logic to open the modal
  productId: any;
  proceedBoxOpen(productId: any): void {
    this.productId = productId;

    const modal = new bootstrap.Modal(this.proceedBox.nativeElement);
    modal.show(); // Open the modal
  }

  variantEditModeProceed() {
    if (this.productId !== null || this.productId !== '') {
      this.router.navigate([
        'seller/dashboard/home/product-checking',
        this.productId,
      ]);
    } else {
      alert('please Enter a Valid Varinat ID :: ' + this.productId);
    }
  }

  //Search Starting
  onSearch() {
    const searchQuery = this.searchText.trim().toLowerCase();
    if (searchQuery) {
      this.filteredItems = this.pendingDataCaptured.filter((item) =>
        String(item.productCode).toLowerCase().includes(searchQuery)
      );
    } else {
      this.filteredItems = this.pendingDataCaptured;
    }
  }
  //Search Ending
}
