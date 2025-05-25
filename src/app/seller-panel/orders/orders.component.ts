import { Component, inject } from '@angular/core';
import { OrdersService } from '../../_services/orderService/orders.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DeliveryStatusService } from '../../_services/deliveryService/delivery-status.service';

declare var bootstrap: any; // Import Bootstrap JavaScript

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {

   //UPDATE ORDER STATUS STARTING [PENDING]
   deliveryForm: any = {
    productLength: '',
    productBreadth: '',
    productHeight:'',
    productWeight:'',
    orderItemId:""
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
    this.getPendingOrderList(this.paginationSize);
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
  firstTabFunction() {
    this.getPendingOrderList(this.paginationSize);
  }

  getPendingOrderList(request: any) {
    this.spinner.show();
    this.orderService.getPendingOrderBySellerService(request).subscribe({
      next: (res: any) => {
        this.orders = res.data.content;
        this.totalElements = res.data['totalElements'];
        this.spinner.hide();
      },
      error: (err: any) => {
        this.spinner.hide();
      },
    });
  }


   
  //UPDATE TRACKER STATUS
  updateTrackerData(data: any) {
    
    //DELIVERY FORM BLANK...
    this.deliveryForm.productLength = '';
    this.deliveryForm.productBreadth = '';
    this.deliveryForm.productHeight = '';
    this.deliveryForm.productWeight = '';

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
            this.getPendingOrderList(this.paginationSize);
          } 
          else if (this.tabIndex === 1) {
            this.getShippedStatusOrders(this.paginationSize);
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

  AWB_Mapping(orderItemId:any){
    this.spinner.show();
    this.deliveryStatusService.AWB_MappingService(orderItemId)
      .subscribe({
        next: (res: any) => {
          this.toast.success({
            detail: 'Success',
            summary: 'AWB Number Mapped Success | Product Move to SHIPPED TAB',
            position: 'bottomRight',
            duration: 3000,
          });
          this.spinner.hide();
          this.getPendingOrderList(this.paginationSize);
        },
        error: (err: any) => {
          this.spinner.hide();
          this.toast.error({
            detail: 'Error',
            summary: 'AWB Number Not Mapped | Failed ',
            position: 'bottomRight',
            duration: 3000,
          });
        },
      });
  }



  // ORDER CANCELLED
  
  OrderCancelled(orderItemId:any){
    this.spinner.show();
  
    this.deliveryStatusService.orderCancelled(orderItemId)
      .subscribe({
        next: (res: any) => {
          this.toast.success({
            detail: 'Success',
            summary: 'ORDER CANCELLED SUCCESS',
            position: 'bottomRight',
            duration: 3000,
          });
          this.spinner.hide();
          this.getPendingOrderList(this.paginationSize);
        },
        error: (err: any) => {
          this.spinner.hide();
          this.toast.error({
            detail: 'Error',
            summary: 'ORDER CANCELLED FAILED',
            position: 'bottomRight',
            duration: 3000,
          });
        },
      });
  }

  labelDownload(srShipmentId:any){
    alert(srShipmentId);
    this.deliveryStatusService.downloadShippingLabel(srShipmentId)
      .subscribe({
        next: (res: any) => {
          // Assuming the response is a binary PDF file
          const blob = new Blob([res], { type: 'application/pdf' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `Shipping-Label-${srShipmentId}.pdf`;
          link.click();


          this.toast.success({detail: 'Success',summary: 'LABEL DOWNLOAD SUCCESS', position: 'bottomRight',duration: 3000,});
          this.spinner.hide();
        },
        error: (err: any) => {
          this.spinner.hide();
          this.toast.error({detail: 'Error',summary: 'LABEL NOT DOWNLOAD',position: 'bottomRight', duration: 3000,});
        },
      });
  }
    

  // Pagination Starting
  nextPagePending(event: PageEvent) {
    const request: any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getPendingOrderList(request);
  }
  // Pagination Ending

  // ====================FIRST TAB ENDING=======================




  // ====================SECOND TAB EXECUTE=======================
  shippedData: any;
  secondTabFunction() {
    this.getShippedStatusOrders({ page: '0', size: '10' });
  }
  getShippedStatusOrders(request: any) {
    this.spinner.show();
    this.orderService.getShippedStatusOrdersService(request).subscribe({
      next: (res: any) => {
        //console.log(res.data);
        
        this.shippedData = res.data.content;

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
        this.deliveryForm = res.data;
      },
      error: (err: any) => {
        this.closePendingModel();
        this.spinner.hide();
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
    const request: any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getPendingOrderList(request);
  }

  // ====================SECOND TAB ENDING=======================



  // ====================THIRD TAB SATRTING=======================

  outOfDeliveryData: any;
  thirdTabFunction() {
    // Your logic here
    this.getOutOfDelivereyStatusOrders({ page: '0', size: '10' });
  }

  getOutOfDelivereyStatusOrders(request: any) {
    this.spinner.show();
    this.orderService.getOutofDeliveryStatusOrdersService(request).subscribe({
      next: (res: any) => {
        this.outOfDeliveryData = res.data.content;
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
    const request: any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getOutOfDelivereyStatusOrders(request);
  }

  // ====================THIRD TAB ENDING=======================




  // ====================FOURTH TAB STARTING=======================

  deliveredData: any;
  fourthTabFunction() {
    // Your logic here
    this.getDeliveredStatusOrders({ page: '0', size: '10' });
  }

  getDeliveredStatusOrders(request: any) {
    this.spinner.show();
    this.orderService.getDeliveredStatusOrdersService(request).subscribe({
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





// ===========PENDING AND SHIPPED AND OTHER  MODEL STARTING OBJECT CREATION===========

    ngAfterViewInit() {
      this.pendingDeliveryModel = new bootstrap.Modal(
        document.getElementById('pendingDeliveryModel')
      );
    }
    closePendingModel() {
      this.pendingDeliveryModel.hide();
    }
    // ===========PENDING Model ENDING  OBJECT CREATION===========




}
