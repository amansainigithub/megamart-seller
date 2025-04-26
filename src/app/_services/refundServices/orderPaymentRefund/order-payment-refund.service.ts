import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { API_AUTHORIZA_URL } from '../../../constants/Constants';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class OrderPaymentRefundService {

 constructor(private http: HttpClient , private toast:NgToastService) { }

   getCancelOrderList(request:any) {
      return this.http.get(API_AUTHORIZA_URL + "sellerCancelOrderController/"+ 'sellerCancelOrdersFetch?page='+request.page + '&size=' +request.size, httpOptions);
     }


  refundAmountInitiated(data:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "sellerCancelOrderController/" + 'sellerOrderRefundRequest',data, httpOptions);
  }


}
