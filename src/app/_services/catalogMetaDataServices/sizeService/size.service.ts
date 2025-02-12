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
export class SizeService {

  constructor(private http: HttpClient , private toast:NgToastService) { }

  saveCatalogSizeService(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "productSizeVariantController/" + 'saveSize',data, httpOptions);
  }

    //ADMIN
    getSizeByPagination(request:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "productSizeVariantController/"+ 'getSize?page='+request.page + '&size=' +request.size, httpOptions);
    }

    getSizeByIdService(sizeId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "productSizeVariantController/" + 'getSizeById/'+sizeId, httpOptions);
    }

    updateSizeCode(data:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "productSizeVariantController/" + 'updateSize',data, httpOptions);
    }

    deleteSizeByIdService(sizeId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "productSizeVariantController/" + 'deleteSize/'+sizeId, httpOptions);
    }
  
}
