import { Component, inject } from '@angular/core';
import { OrdersService } from '../../_services/orderService/orders.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { OrderDeliveryProcessComponent } from '../order-delivery-process/order-delivery-process.component';

declare var bootstrap: any; // Import Bootstrap JavaScript

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  orders:any;

  // model Properties
  modal: any;
  successModel:any;
  
  constructor(
    private orderService: OrdersService,
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPendingOrderList({ page: "0", size: "10" });
  }


    onTabChange(event: MatTabChangeEvent) {
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
    }
  }

  firstTabFunction() {
    this.getPendingOrderList({ page: "0", size: "10" });
  }

  secondTabFunction() {
    console.log("Second tab clicked!");
    // Your logic here
  }

  thirdTabFunction() {
    console.log("Third tab clicked!");
    // Your logic here
  }
 
  getPendingOrderList(request:any) {
    this.spinner.show();
    this.orderService.getOrdersListService(request).subscribe({
      next: (res: any) => {
        console.log("=====================");
        console.log("DATA " , res);
       this.orders =  res.data.content;
        console.log(this.orders);
        
        this.totalElements = res.data['totalElements'];
        this.spinner.hide();
      },
      error: (err: any) => {
        console.error('Error fetching in Order:', err);
        this.spinner.hide();
      },
    });
  }


   nextPage(event: PageEvent) {
      console.log(event);
      const request:any = {};
      request['page'] = event.pageIndex.toString();
      request['size'] = event.pageSize.toString();
      this.getPendingOrderList(request);
  }
  



  //TRACKING SATEPPER STARTING
  statuses = ['PENDING', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED'];
  getStatusIndex(status: string): number {
    return this.statuses.indexOf(status);
  }

  copyTrackerId(trackerId: number) {
    navigator.clipboard.writeText(trackerId.toString()).then(() => {
      this.toast.success({detail: "Success", summary: "Tracker ID copied !", position: "bottomRight", duration: 2000});
    }).catch(err => {
      console.error('Failed to copy tracker ID:', err);
    });
  }
  //TRACKING STEPPER ENDING



  deliveryForm:any = {
    deliveryStatus : "",
    expectedDate:"",
    tackerId:""

  }
  //UPDATE TRACKER STATUS
  updateTrackerData(data:any)
  {
      this.successModel.show();
  }

  updateOrderDeliveryDetails(){
    console.log(this.deliveryForm);
    
  }





  



 // ===========MODEL STARTING===========
 ngAfterViewInit() {
  this.successModel = new bootstrap.Modal(document.getElementById('successModal'));
}
closeModal() {
  this.modal.hide();
}
closeSuccessModel(){
  this.successModel.hide();
}
// ===========Model ENDING===========

}
