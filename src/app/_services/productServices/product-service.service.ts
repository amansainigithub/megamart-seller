import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_AUTHORIZA_URL } from '../../constants/Constants';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  
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



// ========================================================================================================

  //getProductMasters
  getProductMasters(){
    return this.http.get(API_AUTHORIZA_URL + 'sellerProductController/getProductMasters');
  }


  getproductById(catalogId:any):any {
    return this.http.get(API_AUTHORIZA_URL + 'sellerCatalogController/getSellerCatalog/' + catalogId );
  }

  //save Catalog Service
  saveCatalogService(catalogData:any,formData:any) {
    return this.http.post(API_AUTHORIZA_URL + 'sellerCatalogController/uploadMultiFiles/'+27
      , formData)
  }

  
  getAllCatalogByUsername(request:any) {
    return this.http.post(API_AUTHORIZA_URL + 'sellerCatalogController/getAllCatalogByUsername?page='+request.page + '&size=' +request.size,"");
  }

  getProgressCatalogListService(request:any) {
    return this.http.post(API_AUTHORIZA_URL + 'sellerCatalogController/getAllCatalogByQcProgress?page='+request.page + '&size=' +request.size,"");
  }

  getDraftCatalogListService(request:any) {
    return this.http.post(API_AUTHORIZA_URL + 'sellerCatalogController/getAllCatalogByDraft?page='+request.page + '&size=' +request.size,"");
  }

  getErrorCatalogListService(request:any) {
    return this.http.post(API_AUTHORIZA_URL + 'sellerCatalogController/getAllCatalogByError?page='+request.page + '&size=' +request.size,"");
  }

  getQCPassCatalogListService(request:any) {
    return this.http.post(API_AUTHORIZA_URL + 'sellerCatalogController/getAllCatalogByQcPass?page='+request.page + '&size=' +request.size,"");
  }


  // dynamicFormCreation(){
  //   return this.http.get(API_AUTHORIZA_URL + 'sellerProductController/manufacturer-details');
  // }

  // // Save form data (POST request)
  // saveFormData(data: any): Observable<any> {
  //   return this.http.post(API_AUTHORIZA_URL + 'sellerProductController/save', data);
  // }

  // // Fetch a single manufacturer detail by ID (GET request)
  // getManufacturerDetailsById(id: number): Observable<any> {
  //   return this.http.get(API_AUTHORIZA_URL + `sellerProductController/get/${id}`);
  // }

  // ==========
  dynamicFormCreation(){
    return this.http.get(API_AUTHORIZA_URL + 'sellerProductController/formConfig');
  }

  // Save form data (POST request)
  saveFormData(data: any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + 'sellerProductController/submitForm', data);
  }

  getSavedData() {
    return this.http.get(API_AUTHORIZA_URL + `sellerProductController/getSavedData`);
  }



   getFormBuilders(bornCategoryId:any) {
    return this.http.get(API_AUTHORIZA_URL + `sellerProductController/getProductDataFormBuilder/${bornCategoryId}`);
  }

  // Save form data (POST request)
  saveProductData(data: any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + 'sellerProductController/saveProductData', data);
  }

  getProductData() {
    return this.http.get(API_AUTHORIZA_URL + `sellerProductController/api/product-data`);
  }


  // Save form data (POST request)
  saveSellerProduct(data: any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + 'sellerProductController/saveSellerProduct', data);
  }


  getrows() {
    return this.http.get(API_AUTHORIZA_URL + `sellerProductController/getRows`);
  }

}
