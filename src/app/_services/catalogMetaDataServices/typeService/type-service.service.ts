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
export class TypeServiceService {


  constructor(private http: HttpClient , private toast:NgToastService) { }

  saveTypeService(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "productTypeController/" + 'saveType',data, httpOptions);
  }

    getTypeByPagination(request:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "productTypeController/"+ 'getType?page='+request.page + '&size=' +request.size, httpOptions);
    }

    getTypeByIdService(typeId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "productTypeController/" + 'getTypeById/'+typeId, httpOptions);
    }

    updateType(data:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "productTypeController/" + 'updateType',data, httpOptions);
    }

    deleteTypeByIdService(typeId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "productTypeController/" + 'deleteType/'+typeId, httpOptions);
    }
}
