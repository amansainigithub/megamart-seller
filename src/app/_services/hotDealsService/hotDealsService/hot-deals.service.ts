import { Injectable } from '@angular/core';
import { API_AUTHORIZA_URL } from '../../../constants/Constants';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class HotDealsService {
  constructor(private http: HttpClient) {}

  getHotDealListService(): Observable<any> {
    return this.http.get(
      API_AUTHORIZA_URL + 'hotDealsController/' + 'getHotDeals',
      httpOptions
    );
  }

  saveHotDealService(data: any): Observable<any> {
    return this.http.post(
      API_AUTHORIZA_URL + 'hotDealsController/' + 'saveHotDeals',
      data,
      httpOptions
    );
  }

  getHotDealByIdService(id: any): Observable<any> {
    return this.http.get(
      API_AUTHORIZA_URL + 'hotDealsController/' + 'getHotDeal/' + id,
      httpOptions
    );
  }

  updateHotDeals(data: any): Observable<any> {
    return this.http.post(
      API_AUTHORIZA_URL + 'hotDealsController/' + 'updateHotDeals',
      data,
      httpOptions
    );
  }

    deleteHotDealsByIdService(id:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL +"hotDealsController/"+ 'deleteHotDeals/'+id, httpOptions);
    }


    
  //Update File Parent
  updateHotDealFileService(file:any,dealId:any)
  {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(API_AUTHORIZA_URL  +"hotDealsController/"+   "updateHotDealFile/"+ dealId,formData);
  }
}
