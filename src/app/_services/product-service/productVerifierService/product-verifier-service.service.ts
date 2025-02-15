import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_AUTHORIZA_URL } from '../../../constants/Constants';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductVerifierServiceService {

  constructor(private http: HttpClient) { }

  getProductListVerifierService(request:any) {
    return this.http.get(API_AUTHORIZA_URL + 'sellerProductVerifyController/getSellerProductVerifyList/'+"username"+"?page="+request.page +"&size="+request.size);
  }

  
  formBuilderFlying(bornCategoryId:any) {
    return this.http.get(API_AUTHORIZA_URL + `sellerProductVerifyController/formBuilderFlyingByAdmin/${bornCategoryId}`);
  }


  getProductVariantByVariantId(productId:any) {
    return this.http.get(API_AUTHORIZA_URL + 'sellerProductVerifyController/getSellerProductByIdAdmin/'+productId);
  }


  getUnderReviewProductList(request:any) {
    return this.http.get(API_AUTHORIZA_URL + 'sellerProductVerifyController/getSellerProductUnderReviewList/'+"username"+"?page="+request.page +"&size="+request.size);
  }

  
  getUnderReviewNoVariantProductList(request:any) {
    return this.http.get(API_AUTHORIZA_URL + 'sellerProductVerifyController/getSellerProductUnderReviewNoVariantList/'+"username"+"?page="+request.page +"&size="+request.size);
  }

  productApprovedList(request:any) {
    return this.http.get(API_AUTHORIZA_URL + 'sellerProductVerifyController/getSellerProductApprovedList/'+"username"+"?page="+request.page +"&size="+request.size);
  }

  productVariantApprovedList(request:any) {
    return this.http.get(API_AUTHORIZA_URL + 'sellerProductVerifyController/getSellerVariantProductApprovedList/'+"username"+"?page="+request.page +"&size="+request.size);
  }
}
