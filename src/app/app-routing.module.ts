import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SellerGuardService } from './sellerGuard/seller-guard.service';
import { SellerDashComponent } from './seller-panel/seller-dash/seller-dash.component';
import { HomeComponent } from './home/home/home.component';
import { SellerDataFormComponent } from './register/seller-data-form/seller-data-form.component';
import { RegisterCompletedComponent } from './register/register-completed/register-completed.component';

const routes: Routes = [
{ path: 'register', component: RegisterComponent },
{ path: '', component:HomeComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register/seller-information', component: SellerDataFormComponent },

{ path: 'register/register-completed', component: RegisterCompletedComponent },

{
  path: 'seller/dashboard',canActivate:[SellerGuardService] ,
      children: [
                  //ADMIN PANEL
                  { path: '', component: SellerDashComponent},
      ],
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
