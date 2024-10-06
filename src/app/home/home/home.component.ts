import { Component } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  isLoggedIn = false;
  roles: string[] = [];

   
  constructor( 
              private tokenStorage: TokenStorageService, 
              private toast:NgToastService,
              private router: Router,
              private spinner: NgxSpinnerService,) { }


  ngOnInit(): void {
    this.spinner.show();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.spinner.hide();
      window.location.href = '/seller/dashboard';
    }
    this.spinner.hide();
  }


}
