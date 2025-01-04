import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_AUTHORIZA_URL } from '../../constants/Constants';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductStatusServiceService {

   constructor(private http: HttpClient) { }

   
   getAllIncompleteProduct() {
    return this.http.get(API_AUTHORIZA_URL + `sellerProductStatusController/getAllIncompleteProduct`);
  }

  getProductVariantByVariantId(variantId:any) {
    return this.http.get(API_AUTHORIZA_URL + 'sellerProductStatusController/getProductVariantByVariantId/'+variantId);
  }

  getPendingProductList(request:any) {
    return this.http.get(API_AUTHORIZA_URL + 'sellerProductStatusController/getPendingProductList/'+"username"+"?page="+request.page +"&size="+request.size);
  }
}
