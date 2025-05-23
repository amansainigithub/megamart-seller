import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { OutOfStockService } from '../../../_services/outOfStockService/out-of-stock.service';
import { PageEvent } from '@angular/material/paginator';

declare var bootstrap: any; // Import Bootstrap JavaScript

@Component({
  selector: 'app-out-of-stock',
  templateUrl: './out-of-stock.component.html',
  styleUrl: './out-of-stock.component.css',
})
export class OutOfStockComponent {
  outofStockData: any;

  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  ngOnInit(): void {
    this.getOutOfStockProductService({ page: '0', size: '10' });
  }

  constructor(
    private outOfStockService: OutOfStockService,
    private toast: NgToastService,
    private spinner: NgxSpinnerService
  ) {}


  //Get OutofProduct List Starting
  getOutOfStockProductService(request: any) {
    this.spinner.show();
    this.outOfStockService.getOutOfStockProductService(request).subscribe({
      next: (res: any) => {
        this.outofStockData = res.data['content'];
        this.totalElements = res.data['totalElements'];
        this.spinner.hide();
      },
      error: (err: any) => {
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
  //Get OutofProduct List Ending




  //Update OutofProduct List Starting
  productInventory: any = '';
  saveOutOfStocke() {
    if (
      !this.productInventory ||
      this.productInventory.trim() === '' ||
      this.productInventory === '0'
    ) {
      this.toast.error({
        detail: 'Error',
        summary: 'Please enter correct Value',
        position: 'bottomRight',
        duration: 3000,
      });
      return;
    }

    this.outOfStockService
      .updateOutOfStocksService(this.outOfStockId, this.productInventory)
      .subscribe({
        next: (res: any) => {
          this.getOutOfStockProductService({ page: '0', size: '10' });
          this.stockFillerModelclose();
          this.toast.success({detail: 'Success',summary: 'Inventory Updated ',position: 'bottomRight',duration: 3000,});
          this.productInventory = "";
          this.spinner.hide();
        },
        error: (err: any) => {
          this.spinner.hide();
          this.toast.error({
            detail: 'Error',
            summary: 'Inventory Updated Failed',
            position: 'bottomRight',
            duration: 3000,
          });
        },
      });
  }
  //Update OutofProduct List Ending...





  // model Properties Starting
  stockFillerModel: any;
  ngAfterViewInit() {
    this.stockFillerModel = new bootstrap.Modal(
      document.getElementById('stockFillerModel')
    );
  }

  outOfStockId: any;
  stockFillerModelOpen(id: any) {
    this.outOfStockId = id;
    this.stockFillerModel.show();
  }

  stockFillerModelclose() {
    this.stockFillerModel.hide();
  }
    // model Properties Ending...



  nextPage(event: PageEvent) {
    const request: any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getOutOfStockProductService(request);
  }

}

