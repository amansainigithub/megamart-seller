import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageEvent } from '@angular/material/paginator';
import { OrdersService } from '../../../_services/orderService/orders.service';
import { ReturnOrderService } from '../../../_services/orderService/return-order.service';

@Component({
  selector: 'app-return-orders',
  templateUrl: './return-orders.component.html',
  styleUrl: './return-orders.component.css'
})
export class ReturnOrdersComponent {

  returnOrders:any[]=[];

  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 50;


ngOnInit(): void { 
     this.getReturnOrders({ page: "0", size: "50" });
 
   }
   
   constructor(
              private toast:NgToastService ,
              private orderService:OrdersService,
              private spinner: NgxSpinnerService,
              private returnOrder:ReturnOrderService)
            {}



            getReturnOrders(request:any)
            {
              this.spinner.show();
              this.orderService.getReturnOrderDataService(request)
              .subscribe(
                {
                    next:(res:any)=> {
                    this.returnOrders = res.data['content']
          
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
                this.getReturnOrders(request);
            }




          

            returnPaymentInitiated(id: any) {
              // Ya yahan koi aur logic daal sakte hain
              this.returnOrder.returnPaymentInitiated(id)
              .subscribe({
                next: (res: any) => {
                  this.spinner.hide();
                  this.toast.success({detail: 'Success',summary: 'Return Status Update Success',position: 'bottomRight',duration: 3000,});
                  this.getReturnOrders({ page: "0", size: "50" });
                },
                error: (err: any) => {
                  this.toast.error({detail: 'Error',summary: err.error.data ,position: 'bottomRight',duration: 3000,});
                },
              });
            }








            changeReturnDeliveryStatus(id:any , returnDeliveryStatus:any){
              // Ya yahan koi aur logic daal sakte hain
              this.returnOrder.changeReturnDeliveryStatus(id,returnDeliveryStatus)
              .subscribe({
                next: (res: any) => {
                  this.spinner.hide();
                  this.toast.success({detail: 'Success',summary: 'Return Status Update Success',position: 'bottomRight',duration: 3000,});
                  this.getReturnOrders({ page: "0", size: "50" });
                },
                error: (err: any) => {
                  this.toast.error({detail: 'Error',summary: 'Delivery Status Not Updated!',position: 'bottomRight',duration: 3000,});
                },
              });

            }









            changeReturnPickupDateTime(id:any ,pickupDateTime: any) {
              // Ya yahan koi aur logic daal sakte hain
              this.returnOrder.changeReturnPickupDateTimeService(id,pickupDateTime)
              .subscribe({
                next: (res: any) => {
                  this.spinner.hide();
                  this.toast.success({detail: 'Success',summary: 'Return Status Update Success',position: 'bottomRight',duration: 3000,});
                  this.getReturnOrders({ page: "0", size: "50" });
                },
                error: (err: any) => {
                  this.toast.error({detail: 'Error',summary: 'Delivery Status Not Updated!',position: 'bottomRight',duration: 3000,});
                },
              });
              
            }
            
            
}
