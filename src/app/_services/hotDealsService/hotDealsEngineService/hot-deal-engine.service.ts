import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { API_AUTHORIZA_URL } from '../../../constants/Constants';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HotDealEngineService {

 constructor(private http: HttpClient , private toast:NgToastService) { }


   saveHotDealsEngineService(data:any): Observable<any> {
     return this.http.post(API_AUTHORIZA_URL + "hotDealsEngineController/" + 'saveHotDealsEngine',data, httpOptions);
   }

 getHotDealsEngine(request:any): Observable<any> {
        return this.http.get(API_AUTHORIZA_URL + "hotDealsEngineController/"+ 'getHotDealsEngines?page='+request.page + '&size=' +request.size, httpOptions);
      }

 getHoteDealEngineByIdService(engineId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "hotDealsEngineController/" + 'getHotDealsEngine/'+engineId, httpOptions);
   }

   updateHotDealEngineService(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "hotDealsEngineController/" + 'updateHotDealsEngine',data, httpOptions);
  }
      
   deletehotDealEngineService(engineId:any): Observable<any> {
        return this.http.get(API_AUTHORIZA_URL + "hotDealsEngineController/" + 'deleteHotDealsEngine/'+engineId, httpOptions);
      }
}
