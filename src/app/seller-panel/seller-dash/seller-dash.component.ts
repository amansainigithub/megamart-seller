import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-seller-dash',
  templateUrl: './seller-dash.component.html',
  styleUrl: './seller-dash.component.css'
})
export class SellerDashComponent {


  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private toast:NgToastService,
    private router: Router,
    private spinner: NgxSpinnerService,) { 

  }

  ngOnInit(): void {
   
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }


  loadparent() {
    }
}
