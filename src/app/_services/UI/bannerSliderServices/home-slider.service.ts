import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_AUTHORIZA_URL } from '../../../constants/Constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HomeSliderService {

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
 
   updateHomeSliderService(data:any): Observable<any> {
        return this.http.post(API_AUTHORIZA_URL + "homeSliderController/" + 'updateHomeSlider',data, httpOptions);
     }


      //Update File Home Slider
  updateHomeSliderFile(file:any,homeSliderId:any)
  {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(API_AUTHORIZA_URL  + "homeSliderController/" +  "updateHomeSliderFile/"+ homeSliderId,formData);
  }

}
