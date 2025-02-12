import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { API_AUTHORIZA_URL } from '../../../constants/Constants';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class NetQuantityService {

  

  constructor(private http: HttpClient , private toast:NgToastService) { }

  saveNetQuantity(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "productNetQuantityController/" + 'saveNetQuantity',data, httpOptions);
  }

    getNetQuantityByPagination(request:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "productNetQuantityController/"+ 'getNetQuantity?page='+request.page + '&size=' +request.size, httpOptions);
    }

    getNetQuantityByIdService(netQuantityId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "productNetQuantityController/" + 'getNetQuantityById/'+netQuantityId, httpOptions);
    }

    updateNetQuantity(data:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "productNetQuantityController/" + 'updateNetQuantity',data, httpOptions);
    }

    deleteNetQuantityByIdService(bornCategoryId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "productNetQuantityController/" + 'deleteNetQuantity/'+bornCategoryId, httpOptions);
    }
}
