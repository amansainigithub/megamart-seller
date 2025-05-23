import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageEvent } from '@angular/material/paginator';
import { OrdersService } from '../../../_services/orderService/orders.service';
import { ReturnOrderService } from '../../../_services/orderService/return-order.service';

@Component({
  selector: 'app-exchange-orders',
  templateUrl: './exchange-orders.component.html',
  styleUrl: './exchange-orders.component.css'
})
export class ExchangeOrdersComponent {

  
    exchangeOrders:any[]=[];
  
    totalElements: number = 0;
    currentPage: number = 1;
    itemsPerPage: number = 50;
  
  
  ngOnInit(): void { 
       this.getExchangeOrders({ page: "0", size: "50" });
   
     }
     
     constructor(
                private router:Router, 
                private toast:NgToastService ,
                private orderService:OrdersService,
                private spinner: NgxSpinnerService,
                private returnOrder:ReturnOrderService)
              {}
  
  
  
              getExchangeOrders(request:any)
              {
                this.spinner.show();
                this.orderService.getExchangeOrderDataService(request)
                .subscribe(
                  {
                      next:(res:any)=> {
                      this.exchangeOrders = res.data['content']
            
                      this.totalElements = res.data['totalElements'];
                      this.spinner.hide();
                    },
                    error:(err:any)=>  {
                      this.spinner.hide();
                      this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
            
                    }
                  }
                );
              }
  
  
  
  
                nextPage(event: PageEvent) {
                  const request:any = {};
                  request['page'] = event.pageIndex.toString();
                  request['size'] = event.pageSize.toString();
                  this.getExchangeOrders(request);
              }
  
  
  
  
  
              exchangePickupDateTime(id:any ,pickupDateTime: any) {
                this.returnOrder.exchangePickupDateTimeService(id,pickupDateTime)
                .subscribe({
                  next: (res: any) => {
                    this.spinner.hide();
                    this.toast.success({detail: 'Success',summary: 'Exchange Status Update Success',position: 'bottomRight',duration: 3000,});
                    this.getExchangeOrders({ page: "0", size: "50" });
                  },
                  error: (err: any) => {
                    this.toast.error({detail: 'Error',summary: 'Delivery Status Not Updated!',position: 'bottomRight',duration: 3000,});
                  },
                });
                
              }
              


              
              updateExchangeDeliveryStatus(id:any , exchangeDeliveryStatus:any){
                // Ya yahan koi aur logic daal sakte hain
                this.returnOrder.updateExchangeDeliveryStatusService(id,exchangeDeliveryStatus)
                .subscribe({
                  next: (res: any) => {
                    this.spinner.hide();
                    this.toast.success({detail: 'Success',summary: 'Exchange Status Update Success',position: 'bottomRight',duration: 3000,});
                    this.getExchangeOrders({ page: "0", size: "50" });
                  },
                  error: (err: any) => {
                    this.toast.error({detail: 'Error',summary: 'Delivery Status Not Updated!',position: 'bottomRight',duration: 3000,});
                  },
                });
  
              }

}
