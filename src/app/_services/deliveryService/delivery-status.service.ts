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
export class DeliveryStatusService {

    constructor(private http: HttpClient) {}
  

  
    updatePendingDeliveryStatusService(data:any): Observable<any> {
       return this.http.post(API_AUTHORIZA_URL + "deliveryStatusController/" + 'updatePendingDeliveryStatus',data, httpOptions);
     }

     
    updateDeliveryStatusService(data:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "deliveryStatusController/" + 'updateDeliveryStatus',data, httpOptions);
    }

     getDeliveryDetailsById(id:any): Observable<any> {
         return this.http.get(
           API_AUTHORIZA_URL + 'deliveryStatusController/' + 'getDeliveryDetailsById/'+id,
           httpOptions
         );
       }
}
