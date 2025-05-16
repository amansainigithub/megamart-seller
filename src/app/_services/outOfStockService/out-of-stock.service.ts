import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_AUTHORIZA_URL } from '../../constants/Constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OutOfStockService {

  constructor(private http: HttpClient) { }

   getOutOfStockProductService(request:any): Observable<any> {
          return this.http.get(API_AUTHORIZA_URL + "outOfStockProductsController/"+ 
                            'getOutOfStockProducts?page='+request.page + '&size=' +request.size, httpOptions);
        }


  updateOutOfStocksService(id: any,productInventory:any): Observable<any> {
            return this.http.post(
              API_AUTHORIZA_URL +  'outOfStockProductsController/'+'updateOutOfStocksProducts/' + id + "/"+productInventory,"",httpOptions);
          }
}
