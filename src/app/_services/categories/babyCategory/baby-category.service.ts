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
export class BabyCategoryService {

  constructor(private http: HttpClient , private toast:NgToastService) { }


  getBabyCategoryListService(): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + "babyController/" + 'getBabyCategoryList', httpOptions);
  }

  deletebabyCategoryByIdService(babyCategoryId:any): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + "babyController/" +'deleteBabyCategoryById/'+babyCategoryId, httpOptions);
  }

  saveBabyCategoryService(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "babyController/" + 'saveBabyCategory',data, httpOptions);
  }

  updatebabyCategory(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "babyController/" + 'updateBabyCategory',data, httpOptions);
  }

  updatebabyCategoryNew(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "babyController/" + 'updateBabyCategoryNew',data, httpOptions);
  }

  getBabyCategoryByIdService(babyCategoryId:any): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + "babyController/" + 'getBabyCategoryById/'+babyCategoryId, httpOptions);
  }


  //Update File Parent
  updateBabyFile(file:any,babyCategoryId:any)
  {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(API_AUTHORIZA_URL  + "babyController/" +  "updateBabyCategoryFile/"+ babyCategoryId,formData);
  }

}
