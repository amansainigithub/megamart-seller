import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_AUTHORIZA_URL, API_URL } from '../../../constants/Constants';

@Injectable({
  providedIn: 'root'
})
export class SaveCatalogService {

  constructor(private http: HttpClient) { }

  saveCatalogService(catalogForm:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + 'sellerCatalogController/sellerSaveCatalog', catalogForm);
  }

  getCatalogById(catalogId:any): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + 'sellerCatalogController/getSellerCatalog/' + catalogId );
  }
}
