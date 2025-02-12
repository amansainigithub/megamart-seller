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
export class BrandService {

  
  constructor(private http: HttpClient , private toast:NgToastService) { }

   saveBrandService(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "productBrandController/" + 'saveBrand',data, httpOptions);
   }

    //ADMIN
    getBrandByPagination(request:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "productBrandController/"+ 'getBrand?page='+request.page + '&size=' +request.size, httpOptions);
    }

    getBrandByIdService(brandId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "productBrandController/" + 'getBrandById/' + brandId, httpOptions);
    }

    updateBrand(data:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "productBrandController/" + 'updateBrand',data, httpOptions);
    }

    deleteBrandByIdService(brandId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "productBrandController/" + 'deleteBrand/'+brandId, httpOptions);
    }
}
