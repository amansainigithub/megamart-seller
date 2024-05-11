import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerGuardService implements CanActivate{

  TOKEN_KEY = 'seller-auth-token';
  
  constructor(private tokenStorage: TokenStorageService,private _router:Router)
  {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      if(window.localStorage.getItem(this.TOKEN_KEY) == null || window.localStorage.getItem(this.TOKEN_KEY) == undefined)
      {
        //Return False if localStorage is Empty
        return false;
      }
      else{
        //Return False if localStorage is !Empty
        return true;
      }
  }
}
