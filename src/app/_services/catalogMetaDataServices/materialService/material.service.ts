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
export class MaterialService {

  constructor(private http: HttpClient , private toast:NgToastService) { }

  saveMaterialService(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "productMaterialController/" + 'saveMaterial',data, httpOptions);
  }

    //ADMIN
    getMaterialByPagination(request:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "productMaterialController/"+ 'getMaterial?page='+request.page + '&size=' +request.size, httpOptions);
    }

    getMaterialByIdService(materialId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "productMaterialController/" + 'getMaterialById/'+materialId, httpOptions);
    }

    updateMaterial(data:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "productMaterialController/" + 'updateMaterial',data, httpOptions);
    }

    deleteMaterialByIdService(materialId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "productMaterialController/" + 'deleteMaterial/'+materialId, httpOptions);
    }
  
}
