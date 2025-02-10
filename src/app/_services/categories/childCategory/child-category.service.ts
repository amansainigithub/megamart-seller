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
export class ChildCategoryService {


  constructor(private http: HttpClient , private toast:NgToastService) { }

  saveChildCategoryService(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL +"childController/"+  'saveChildCategory',data, httpOptions);
  }

  getChildCategoryListService(): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL +"childController/"+ 'getChildCategoryList', httpOptions);
  }


  deleteChildCategoryByIdService(parentCategoryId:any): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL +"childController/"+ 'deleteChildCategoryById/'+parentCategoryId, httpOptions);
  }

  getChildCategoryByIdService(childCategoryId:any): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL +"childController/"+ 'getChildCategoryById/'+childCategoryId, httpOptions);
  }


  updateChildCategory(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL +"childController/"+ 'updateChildCategory',data, httpOptions);
  }


  //Update File Parent
  updateChildFile(file:any,childCategoryId:any)
  {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(API_AUTHORIZA_URL  +"childController/"+   "updateChildCategoryFile/"+ childCategoryId,formData);
  }

}
