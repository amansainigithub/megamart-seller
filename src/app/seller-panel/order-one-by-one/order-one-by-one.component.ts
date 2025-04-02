import { Component } from '@angular/core';
import { OrdersService } from '../../_services/orderService/orders.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DeliveryStatusService } from '../../_services/deliveryService/delivery-status.service';
import { FormControl } from '@angular/forms';

declare var bootstrap: any; // Import Bootstrap JavaScript

@Component({
  selector: 'app-order-one-by-one',
  templateUrl: './order-one-by-one.component.html',
  styleUrl: './order-one-by-one.component.css'
})
export class OrderOneByOneComponent {


   //UPDATE ORDER STATUS STARTING [PENDING]
   deliveryForm: any = {
    deliveryStatus: '',
    deliveryDateTime: '',
    courierName:'',
    tackerId: '',
    orderItemId: '',
  };

  deliveryStatusFormData:any={
    updateDeliveryStatus: '',
    orderItemId: '',
  }

  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  // model Properties
  pendingDeliveryModel: any;

  // model Properties
  shippedAndNextDeliveryModel:any;

  //Tab Index
  tabIndex:any = 0;

  //Pagaination Size
  paginationSize: any = { page: '0', size: '10' };

  constructor(
    private orderService: OrdersService,
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private router: Router,
    private deliveryStatusService: DeliveryStatusService
  ) {}

  ngOnInit(): void {
    this.getPendingOrderOneByOneBySeller(this.paginationSize);
  }


  onTabChange(event: MatTabChangeEvent) {
    this.tabIndex = event.index;
    switch (event.index) {
      case 0:
        this.firstTabFunction();
        break;
      case 1:
        this.secondTabFunction();
        break;
      case 2:
        this.thirdTabFunction();
        break;
      case 3:
        this.fourthTabFunction();
        break;
    }
  }





  // ====================FIRST TAB STARTING=======================
  orders: any;
  filteredItems:any;

  firstTabFunction() {
    this.getPendingOrderOneByOneBySeller(this.paginationSize);
  }

  getPendingOrderOneByOneBySeller(request: any) {
    this.spinner.show();
    this.orderService.getPendingOrderOneByOneBySellerService(request).subscribe({
      next: (res: any) => {
        this.orders = res.data.content;
        this.filteredItems = res.data.content;


        this.totalElements = res.data['totalElements'];
        this.spinner.hide();
      },
      error: (err: any) => {
        console.error('Error fetching in Order:', err);
        this.spinner.hide();
      },
    });
  }


  // Pagination Starting
  nextPagePending(event: PageEvent) {
    console.log(event);
    const request: any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getPendingOrderOneByOneBySeller(request);
  }
  // Pagination Ending


  //SEARCH 

  
  searchControl = new FormControl('');
  onSearch() {
    const searchQuery = this.searchControl.value?.toLowerCase() || '';
    if (searchQuery) {
      this.orders = this.orders.filter((od:any) => 
        od.orderTrackingId.toLowerCase().includes(searchQuery) ||
        od.productName.toLowerCase().includes(searchQuery) ||
        od.customOrderNumber.toLowerCase().includes(searchQuery)
      );
    } else {
      this.orders = this.filteredItems;
    }
  }

  // ====================FIRST TAB ENDING=======================




  // ====================SECOND TAB EXECUTE=======================
  shippedData: any;
  secondTabFunction() {
    console.log('Second tab clicked!');
    this.getShippedOrderOneByOne({ page: '0', size: '10' });
  }
  getShippedOrderOneByOne(request: any) {
    this.spinner.show();
    this.orderService.getShippedOrderOneByOneService(request).subscribe({
      next: (res: any) => {
        console.log('=====================');
        console.log('DATA ', res);
        this.shippedData = res.data.content;
        console.log(this.shippedData);

        this.totalElements = res.data['totalElements'];
        this.spinner.hide();
      },
      error: (err: any) => {
        console.error('shoppedData fetching Errors:', err);
        this.spinner.hide();
      },
    });
  }

  getDeliveryStatusById(data: any) {
    this.spinner.show();

    this.deliveryStatusService.getDeliveryDetailsById(data).subscribe({
      next: (res: any) => {
        this.toast.success({
          detail: 'Success',
          summary: 'Get Delivery Status Data',
          position: 'bottomRight',
          duration: 3000,
        });
        this.spinner.hide();
        console.log(res);
        this.deliveryForm = res.data;
      },
      error: (err: any) => {
        this.closePendingModel();
        this.spinner.hide();
        console.log(err);
        this.toast.error({
          detail: 'Error',
          summary: 'Delivery Data Failed to Fetch !!',
          position: 'bottomRight',
          duration: 3000,
        });
      },
    });
  }

  nextPageShipping(event: PageEvent) {
    console.log(event);
    const request: any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getPendingOrderOneByOneBySeller(request);
  }

  // ====================SECOND TAB ENDING=======================



  // ====================THIRD TAB SATRTING=======================

  outOfDeliveryData: any;
  thirdTabFunction() {
    console.log('Third tab clicked!');
    // Your logic here
    this.getOutOfDelivereyStatusOrders({ page: '0', size: '10' });
  }

  getOutOfDelivereyStatusOrders(request: any) {
    this.spinner.show();
    this.orderService.getOutofDeliveryOrderOneBYOneService(request).subscribe({
      next: (res: any) => {
        console.log('=====================');
        console.log('DATA ', res);
        this.outOfDeliveryData = res.data.content;
        console.log(this.outOfDeliveryData);

        this.totalElements = res.data['totalElements'];
        this.spinner.hide();
      },
      error: (err: any) => {
        console.error('outOfDeliveryData fetching Errors:', err);
        this.spinner.hide();
      },
    });
  }

  nextPageOutofDelivery(event: PageEvent) {
    console.log(event);
    const request: any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getOutOfDelivereyStatusOrders(request);
  }

  // ====================THIRD TAB ENDING=======================




  // ====================FOURTH TAB STARTING=======================

  deliveredData: any;
  fourthTabFunction() {
    console.log('Third tab clicked!');
    // Your logic here
    this.getDeliveredStatusOrders({ page: '0', size: '10' });
  }

  getDeliveredStatusOrders(request: any) {
    this.spinner.show();
    this.orderService.getDeliveryOrderOneBYOneService(request).subscribe({
      next: (res: any) => {
        this.deliveredData = res.data.content;

        this.totalElements = res.data['totalElements'];
        this.spinner.hide();
      },
      error: (err: any) => {
        console.error('getDeliveredStatusOrders fetching Errors:', err);
        this.spinner.hide();
      },
    });
  }

  nextPageDelivered(event: PageEvent) {
    console.log(event);
    const request: any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getDeliveredStatusOrders(request);
  }

  // ====================FOURTH TAB ENDING=======================








  

  //TRACKING SATEPPER STARTING
  statuses = ['PENDING', 'SHIPPED', 'OUT_OF_DELIVERY', 'DELIVERED'];
  getStatusIndex(status: string): number {
    return this.statuses.indexOf(status);
  }

  copyTrackerId(trackerId: number) {
    navigator.clipboard
      .writeText(trackerId.toString())
      .then(() => {
        this.toast.success({
          detail: 'Success',
          summary: 'Tracker ID copied !',
          position: 'bottomRight',
          duration: 2000,
        });
      })
      .catch((err) => {
        console.error('Failed to copy tracker ID:', err);
      });
  }
  //TRACKING STEPPER ENDING





// ===============================UPDATE CALLS==============================

  //UPDATE TRACKER STATUS
  updateTrackerData(data: any) {
    //DELIVERY FORM BLANK...
    this.deliveryForm.deliveryStatus = '';
    this.deliveryForm.deliveryDateTime = '';
    this.deliveryForm.tackerId = '';
    this.deliveryForm.orderItemId = '';

    //ORDER ITEM ID
    this.deliveryForm.orderItemId = data;
    this.pendingDeliveryModel.show();
  }



  progressValue: number = 0;
  progressInterval: any;
  updatPendingDeliveryStatus() {
    this.progressValue = 0;
    this.spinner.show();
  
    // Smoothly increase progress while waiting for the API response
    this.progressInterval = setInterval(() => {
      if (this.progressValue < 90) {
        this.progressValue += 5; // Increment in steps of 5
      }
    }, 200); // Update every 200ms
  
    console.log(this.deliveryForm);
  
    this.deliveryStatusService
      .updatePendingDeliveryStatusService(this.deliveryForm)
      .subscribe({
        next: (res: any) => {
          clearInterval(this.progressInterval); // Stop progress update
          this.progressValue = 100; // Set to full on success


          this.toast.success({
            detail: 'Success',
            summary: 'Delivery and Time, Courier Status Update Success',
            position: 'bottomRight',
            duration: 3000,
          });
          this.spinner.hide();
  
          if (this.tabIndex === 0) {
            this.getPendingOrderOneByOneBySeller(this.paginationSize);
          } else if (this.tabIndex === 1) {
            this.getShippedOrderOneByOne(this.paginationSize);
          } else if (this.tabIndex === 2) {
            this.getOutOfDelivereyStatusOrders(this.paginationSize);
          } else if (this.tabIndex === 3) {
            this.getDeliveredStatusOrders(this.paginationSize);
          }
  
          this.closePendingModel();
          this.progressValue = 0; 
        },
        error: (err: any) => {
          clearInterval(this.progressInterval); // Stop progress update
          this.progressValue = 0; // Reset progress on error
          this.closePendingModel();
          this.spinner.hide();
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Delivery Status Not Updated!',
            position: 'bottomRight',
            duration: 3000,
          });
        },
      });
  }
  
    //UPDATE ORDER STATUS ENDING...  [PENDING]



    // OUT OF DELIVERY , DELIVERED STATUS UPDATE STARTING
    updateDeliveryStatusN(data: any) {
      this.deliveryStatusFormData.orderItemId = data;
      this.shippedAndNextDeliveryModel.show();
    }

    updateAfterPendingDeliveryStatus() {
      // this.spinner.show();
      console.log(this.deliveryStatusFormData);
      this.deliveryStatusService
      .updateDeliveryStatusService(this.deliveryStatusFormData)
      .subscribe({
        next: (res: any) => {
          this.toast.success({
            detail: 'Success',
            summary: 'Delivery Status Update Success',
            position: 'bottomRight',
            duration: 3000,
          });
          this.spinner.hide();
          
          if(this.tabIndex === 1){
            this.getShippedOrderOneByOne(this.paginationSize);
          }
          else if(this.tabIndex === 2){
            this.getOutOfDelivereyStatusOrders(this.paginationSize);
          }
          else if(this.tabIndex === 3){
            this.getDeliveredStatusOrders(this.paginationSize);
          }

          this.closeShippedAndNextDeliveryModel();
          this.spinner.hide();
        },
        error: (err: any) => {
          this.closeShippedAndNextDeliveryModel();
          this.spinner.hide();
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Delivery Status Not Updat !!',
            position: 'bottomRight',
            duration: 3000,
          });
        },
      });
      this.spinner.hide();
    }
        //SHIPPED , OUT OF DELIVERY , DELIVERED STATUS UPDATE STARTING


    


    // ===========PENDING AND SHIPPED AND OTHER  MODEL STARTING OBJECT CREATION===========

    ngAfterViewInit() {
      this.pendingDeliveryModel = new bootstrap.Modal(
        document.getElementById('pendingDeliveryModel')
      );

      this.shippedAndNextDeliveryModel = new bootstrap.Modal(
        document.getElementById('shippedAndNextDeliveryModel')
      );
    }
    closePendingModel() {
      this.pendingDeliveryModel.hide();
    }

    closeShippedAndNextDeliveryModel() {
      this.shippedAndNextDeliveryModel.hide();
    }
    // ===========PENDING Model ENDING  OBJECT CREATION===========








//TRACKING ID COPIED STARTING
    copied = false;
  copyToClipboard(text: string) {
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 5000);
    }).catch(err => console.error('Error copying text: ', err));
  }
  //TRACKING ID COPIED ENDING...
}
