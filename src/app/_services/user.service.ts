import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SELLER_PUBLIC_URL } from '../constants/Constants';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(SELLER_PUBLIC_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(SELLER_PUBLIC_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(SELLER_PUBLIC_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(SELLER_PUBLIC_URL + 'admin', { responseType: 'text' });
  }

  registerMobile(mobileForm: any) {
    return this.http.post(SELLER_PUBLIC_URL + 'sellerMobileChecker', mobileForm);
  }

}
