import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


//For Local
const AUTH_API = 'http://localhost:8080/shopping/api/seller/v1/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class SellerPickupService {

  constructor(private http: HttpClient) { }

  
  savePickup(pickUp:any): Observable<any> {
    return this.http.post(AUTH_API + 'sellerPickupController/'+ 'sellerPickup', pickUp);
  }
}
