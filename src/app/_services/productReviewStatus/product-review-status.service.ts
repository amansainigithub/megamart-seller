import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { API_AUTHORIZA_URL } from '../../constants/Constants';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ProductReviewStatusService {

    constructor(private http: HttpClient , private toast:NgToastService) { }


    saveProductReviewStatus(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "adminProductReviewStatusController/" + 'saveProductReviewStatus',data, httpOptions);
  }


    
    getProductReviewStatus(request:any) {
     return this.http.get(API_AUTHORIZA_URL + "sellerProductVerifyController/"+ 'getProductReviews?page='+request.page + '&size=' +request.size, httpOptions);
    }

   
    deleteReviewStatusService(id:any): Observable<any> {
       return this.http.post(API_AUTHORIZA_URL + "adminProductReviewStatusController/" + 'deleteProductReviewStatus/'+id, httpOptions);
       }

       getReviewStatusByIdService(id:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "adminProductReviewStatusController/" + 'getProductReviewStatusById/'+id, httpOptions);
    }

    updateMaterial(data:any): Observable<any> {
        return this.http.post(API_AUTHORIZA_URL + "adminProductReviewStatusController/" + 'updateProductReviewStatus',data, httpOptions);
    }

    
     
}
