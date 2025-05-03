import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_AUTHORIZA_URL } from '../../constants/Constants';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ReturnOrderService {

    constructor(private http: HttpClient) {}


    returnPaymentInitiated(id:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + 
       "returnExchangeOrderController/" + 'returnPaymentInitiated/'+id , httpOptions);
    }


    changeReturnDeliveryStatus(id:any , returnDeliveryStatus:any): Observable<any> {
           return this.http.post(API_AUTHORIZA_URL + 
            "returnExchangeOrderController/" + 'changeReturnDeliveryStatus/'+id +"/"+returnDeliveryStatus, httpOptions);
         }


    changeReturnPickupDateTimeService(id:any , pickupDateTime:any): Observable<any> {
          return this.http.post(API_AUTHORIZA_URL + 
           "returnExchangeOrderController/" + 'changeReturnPickUpDateTime/'+id +"/"+pickupDateTime, httpOptions);
        }


        //EXCHANGE DATA
        updateExchangeDeliveryStatusService(id:any , pickupDateTime:any): Observable<any> {
          return this.http.post(API_AUTHORIZA_URL + 
           "returnExchangeOrderController/" + 'exchangeDeliveryStatus/'+id +"/"+pickupDateTime, httpOptions);
        }

        exchangePickupDateTimeService(id:any , pickupDateTime:any): Observable<any> {
          return this.http.post(API_AUTHORIZA_URL + 
           "returnExchangeOrderController/" + 'exchangePickupDateTime/'+id +"/"+pickupDateTime, httpOptions);
        }

    
}
