import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../constants/Constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PincodeService {

  constructor(private http: HttpClient) { }


  verifyPincode(pincode:any): Observable<any> {
    return this.http.get(API_URL + 'stateCityPincodeController/'+ 'stateCityPincode/' + pincode );
  }
}
