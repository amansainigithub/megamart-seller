import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderPaymentRefundService } from '../../../_services/refundServices/orderPaymentRefund/order-payment-refund.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-order-payment-refunds',
  templateUrl: './order-payment-refunds.component.html',
  styleUrl: './order-payment-refunds.component.css'
})
export class OrderPaymentRefundsComponent {
  totalElements: number = 0;
  itemsPerPage: number = 100;

  calcenOrdersData:any[]=[];
  
    ngOnInit(): void {
      this.getCancelOrders({ page: "0", size: "50" });
    }
  
    constructor(
      private router: Router,
      private oprs: OrderPaymentRefundService,
      private toast: NgToastService,
      private spinner: NgxSpinnerService
    ) {}
  
    getCancelOrders(request:any) {
      this.spinner.show();
      this.oprs.getCancelOrderList(request).subscribe({
        next: (res: any) => {

          console.log(res);
          
          this.calcenOrdersData = res.data['content'];
  
          this.totalElements = res.data['totalElements'];
          this.spinner.hide();
        },
        error: (err: any) => {
          console.log(err);
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
        console.log(event);
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

        console.log(this.orderObject);

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
        console.log(err);
      }
    });
    }
}
