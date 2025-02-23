import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_AUTHORIZA_URL } from '../../../constants/Constants';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BannerSliderService {

  constructor(private http: HttpClient) { }

   saveHomeSliderService(data:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "homeSliderController/" + 'saveHomeSlider',data, httpOptions);
    }
  
  getHomeSliderListService(): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "homeSliderController/" + 'getHomeSliderList', httpOptions);
    }

  getHomeSliderByIdService(homeSliderId:any): Observable<any> {
        return this.http.get(API_AUTHORIZA_URL + "homeSliderController/" + 'getHomeSliderById/'+homeSliderId, httpOptions);
    }

  deleteHomeSliderByIdService(homeSliderId:any): Observable<any> {
          return this.http.get(API_AUTHORIZA_URL + "homeSliderController/" + 'deleteHomeSlider/'+homeSliderId, httpOptions);
     }

  updateParentCategory(data:any): Observable<any> {
       return this.http.post(API_AUTHORIZA_URL + "homeSliderController/" + 'updateHomeSlider',data, httpOptions);
    }
        
      
}
