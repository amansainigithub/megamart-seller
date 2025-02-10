import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SELLER_PUBLIC_URL } from '../constants/Constants';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string, userrole :String): Observable<any> {
    return this.http.post(SELLER_PUBLIC_URL + 'sellerAuthController/' +'sellerSignIn', {
      username,
      password,
      userrole,
    }, httpOptions);
  }

}
