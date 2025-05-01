import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageEvent } from '@angular/material/paginator';
import { OrdersService } from '../../../_services/orderService/orders.service';

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
              private router:Router, 
              private toast:NgToastService ,
              private orderService:OrdersService,
              private spinner: NgxSpinnerService)
            {}



            getReturnOrders(request:any)
            {
              this.spinner.show();
              this.orderService.getReturnOrderDataService(request)
              .subscribe(
                {
                    next:(res:any)=> {
                      console.log(res.data);
                      
                    this.returnOrders = res.data['content']
          
                    this.totalElements = res.data['totalElements'];
                    this.toast.success({detail:"Success",summary:"Data Fetch Success", position:"bottomRight",duration:3000});
                    this.spinner.hide();
                  },
                  error:(err:any)=>  {
                    console.log(err)
                    this.spinner.hide();
                    this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
          
                  }
                }
              );
            }




              nextPage(event: PageEvent) {
                console.log(event);
                const request:any = {};
                request['page'] = event.pageIndex.toString();
                request['size'] = event.pageSize.toString();
                this.getReturnOrders(request);
            }




            updateCodReturnStatus(){
              
            }
}
