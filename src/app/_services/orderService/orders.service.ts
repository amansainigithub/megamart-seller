import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_AUTHORIZA_URL } from '../../constants/Constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getPendingOrderBySellerService(request: any): Observable<any> {
    return this.http.get(
      API_AUTHORIZA_URL +
        'sellerOrderController/' +
        'getPendingOrderBySeller?page=' +
        request.page +
        '&size=' +
        request.size,
      httpOptions
    );
  }

  getShippedStatusOrdersService(request: any): Observable<any> {
    return this.http.get(
      API_AUTHORIZA_URL +
        'sellerOrderController/' +
        'getShippedOrderBySeller?page=' +
        request.page +
        '&size=' +
        request.size,
      httpOptions
    );
  }

  getOutofDeliveryStatusOrdersService(request: any): Observable<any> {
    return this.http.get(
      API_AUTHORIZA_URL +
        'sellerOrderController/' +
        'getOutOfDeliveryOrderBySeller?page=' +
        request.page +
        '&size=' +
        request.size,
      httpOptions
    );
  }

  getDeliveredStatusOrdersService(request: any): Observable<any> {
    return this.http.get(
      API_AUTHORIZA_URL +
        'sellerOrderController/' +
        'getDeliveredOrderBySeller?page=' +
        request.page +
        '&size=' +
        request.size,
      httpOptions
    );
  }
}
