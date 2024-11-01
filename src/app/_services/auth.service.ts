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


  sellerSendOtpService(mobileForm: any) {
    return this.http.post(SELLER_PUBLIC_URL + 'sellerAuthController/' + 'sellerSendOtp', mobileForm);
  }



  validateSellerOtp(mobileForm: any) {
    return this.http.post(SELLER_PUBLIC_URL + 'sellerAuthController/'+ 'validateSellerOtp', mobileForm);
  }



  register(seller:any): Observable<any> {
    console.log("seller Data");
    console.log(seller)
    return this.http.post(SELLER_PUBLIC_URL + 'sellerAuthController/' + 'sellerSignup', seller);
  }

  

  // savePickup(pickUp:any): Observable<any> {
  //   return this.http.post(AUTH_API + 'sellerAuthController/'+ 'sellerPickup', pickUp);
  // }

  // savebankDetails(bankForm:any): Observable<any> {
  //   return this.http.post(AUTH_API + 'sellerAuthController/'+ 'sellerBank', bankForm);
  // }

  // saveStoreDetails(storeForm:any): Observable<any> {
  //   return this.http.post(AUTH_API + 'sellerAuthController/'+ 'sellerStore', storeForm);
  // }


  


}
