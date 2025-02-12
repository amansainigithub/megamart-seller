import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { API_AUTHORIZA_URL } from '../../../constants/Constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HsnService {

  constructor(private http: HttpClient , private toast:NgToastService) { }

  saveHsnCodesService(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "productHsnController/" + 'saveHsn',data, httpOptions);
  }


    getHsnByPagination(request:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "productHsnController/"+ 'getHsnListByPagination?page='+request.page + '&size=' +request.size, httpOptions);
    }

    getHsnCodeByIdService(hsnCodeId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "productHsnController/" + 'getHsnCodeById/'+hsnCodeId, httpOptions);
    }

    updateHsnCode(data:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "productHsnController/" + 'updateHsnCode',data, httpOptions);
    }

    deleteHsnCodeByIdService(bornCategoryId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "productHsnController/" + 'deleteHsnCode/'+bornCategoryId, httpOptions);
    }
  
}
