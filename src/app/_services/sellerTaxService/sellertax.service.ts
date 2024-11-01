import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SELLER_PUBLIC_URL } from '../../constants/Constants';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SellertaxService {

  constructor(private http: HttpClient) { }

  verifySellerTaxService(sellerTaxData:any): Observable<any> {
    return this.http.post(SELLER_PUBLIC_URL + 'sellerTaxController/'+ 'sellerTax', sellerTaxData);
  }

}
