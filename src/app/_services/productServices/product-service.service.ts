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


  // getproductById(catalogId:any):any {
  //   return this.http.get(API_AUTHORIZA_URL + 'sellerCatalogController/getSellerCatalog/' + catalogId );
  // }

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

  formBuilderFlying(bornCategoryId:any) {
    return this.http.get(API_AUTHORIZA_URL + `sellerProductController/formBuilderFlying/${bornCategoryId}`);
  }

   // Save form data (POST request)
   saveSellerProduct(data: any,bornCategoryId:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + 'sellerProductController/saveSellerProduct/'+bornCategoryId, data);
  }



  uploadProductFiles(formData: FormData,productId:any) {
    return this.http.post(API_AUTHORIZA_URL  + `sellerProductController/uploadProductFiles/${productId}`, formData);
  }

  getproductById(productId:any):any {
    return this.http.get(API_AUTHORIZA_URL + 'sellerProductController/getProductById/'+216);
  }

    // Save Product Variant
    saveProductVariant(data: any,productId:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + 'sellerProductController/saveProductVariant/'+10, data);
    }


}
