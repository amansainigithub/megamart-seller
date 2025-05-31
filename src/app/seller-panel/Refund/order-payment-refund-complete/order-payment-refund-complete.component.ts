import { Component } from '@angular/core';
import { OrderPaymentRefundService } from '../../../_services/refundServices/orderPaymentRefund/order-payment-refund.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-order-payment-refund-complete',
  templateUrl: './order-payment-refund-complete.component.html',
  styleUrl: './order-payment-refund-complete.component.css'
})
export class OrderPaymentRefundCompleteComponent {
 totalElements: number = 0;
  itemsPerPage: number = 100;

  calcenOrdersData:any[]=[];
  
    ngOnInit(): void {
      this.getCancelOrders({ page: "0", size: "50" });
    }
  
    constructor(
      private oprs: OrderPaymentRefundService,
      private toast: NgToastService,
      private spinner: NgxSpinnerService
    ) {}
  
    getCancelOrders(request:any) {
      this.spinner.show();
      this.oprs.getCancelOrderButPaymentCompleteList(request).subscribe({
        next: (res: any) => {
          this.calcenOrdersData = res.data['content'];
  
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



      nextPage(event: PageEvent) {
        const request:any = {};
        request['page'] = event.pageIndex.toString();
        request['size'] = event.pageSize.toString();
        this.getCancelOrders(request);
    }


    orderObject= {
      id:'',
      refundAmount :'',
      userId:''
    }
    refundRequestInitiate(order:any)
    {
      this.orderObject.id = order.id;
      this.orderObject.refundAmount = order.razorpayFinalAmt;
      this.orderObject.userId = order.userId;
    this.oprs.refundAmountInitiated(this.orderObject).subscribe({
      next:(res:any)=> {
        this.toast.success({detail:"Success",summary:"Refund Payment Initiated Success", position:"bottomRight",duration:3000});
        this.spinner.hide();

         this.getCancelOrders({ page: "0", size: "100" });
      },
      error:(err:any)=>  {
        //this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
        this.toast.error({detail:"Error",summary:"Refund Fayment Initated Failed !!!", position:"bottomRight",duration:3000});

        this.spinner.hide();
      }
    });
    }
}
