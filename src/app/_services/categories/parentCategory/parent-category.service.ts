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
export class ParentCategoryService {

  constructor(private http: HttpClient , private toast:NgToastService) { }


  saveParentCategory(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "parentController/" + 'createParentCategory',data, httpOptions);
  }

  getParentCategoryListService(): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + "parentController/" + 'getParentCategoryList1', httpOptions);
  }

  deleteParentCategoryByIdService(parentCategoryId:any): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + "parentController/" + 'deleteCategoryById/'+parentCategoryId, httpOptions);
  }

  getParentCategoryByIdService(parentCategoryId:any): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + "parentController/" + 'getParentCategoryById/'+parentCategoryId, httpOptions);
  }

  updateParentCategory(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "parentController/" + 'updateParentCategory',data, httpOptions);
  }


  //Update File Parent
  updateParentFile(file:any,parentCategoryid:any)
  {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(API_AUTHORIZA_URL + "parentController/" + "updateParentCategoryFile/"+ parentCategoryid,formData);
  }




}
