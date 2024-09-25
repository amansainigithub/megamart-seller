import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


//For Local
const AUTH_API = 'http://localhost:8080/shopping/api/seller/v1/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string, userrole :String): Observable<any> {
    return this.http.post(AUTH_API + 'sellerAuthController/' +'sellerSignIn', {
      username,
      password,
      userrole,
    }, httpOptions);
  }


  sellerSendOtpService(mobileForm: any) {
    return this.http.post(AUTH_API + 'sellerAuthController/' + 'sellerSendOtp', mobileForm);
  }



  validateSellerOtp(mobileForm: any) {
    return this.http.post(AUTH_API + 'sellerAuthController/'+ 'validateSellerOtp', mobileForm);
  }



  register(seller:any): Observable<any> {
    console.log("seller Data");
    console.log(seller)
    return this.http.post(AUTH_API + 'sellerAuthController/' + 'sellerSignup', seller);
  }

  

  verifySellerService(sellerTaxData:any): Observable<any> {
    return this.http.post(AUTH_API + 'sellerAuthController/'+ 'sellerTax', sellerTaxData);

    
  }


}
