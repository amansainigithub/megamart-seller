import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_AUTHORIZA_URL } from '../../constants/Constants';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }


  getParentCategoryService(): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + 'sellerProductCategoryController/getParentCategory');
  }


  getChildCategoryService(parentId:any): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + 'sellerProductCategoryController/getChildCategoryListById/'+parentId);
  }


  getBabyCategoryService(childId:any): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + 'sellerProductCategoryController/getBabyCategoryListChildById/'+childId);
  }


  
  getBornCategoryService(babyId:any): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + 'sellerProductCategoryController/getBornCategoryListByBabyId/'+babyId);
  }


   
  getBornById(babyId:any): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + 'sellerProductCategoryController/getBornById/'+babyId);
  }

  getCatalogById(catalogId:any): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + 'sellerCatalogController/getSellerCatalog/' + catalogId );
  }

  //HSN Codes 
  getCatalogMasters(){
    return this.http.get(API_AUTHORIZA_URL + 'sellerCatalogController/getCatalogMasters');
  }

  //save Catalog Service
  saveCatalogService(catalogData:any,formData:any) {
    return this.http.post(API_AUTHORIZA_URL + 'sellerCatalogController/uploadMultiFiles/'+27
      , formData)
  }

  
  getAllCatalogByUsername(): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + 'sellerCatalogController/getAllCatalogByUsername');
  }

  getProgressCatalogListService(): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + 'sellerCatalogController/getAllCatalogByQcProgress');
  }

  getDraftCatalogListService(): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + 'sellerCatalogController/getAllCatalogByDraft');
  }

}

