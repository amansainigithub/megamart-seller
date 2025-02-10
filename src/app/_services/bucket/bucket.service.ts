import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_AUTHORIZA_URL } from '../../constants/Constants';

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  
  constructor( 
    private http: HttpClient) { }

    uploadFile(file:any)
    {
      const formData: FormData = new FormData();
      formData.append('file', file);
      return this.http.post(API_AUTHORIZA_URL +"uploadFile",formData);
    }
}
