import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SellerGuardService } from './sellerGuard/seller-guard.service';
import { SellerDashComponent } from './seller-panel/seller-dash/seller-dash.component';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
{ path: 'register', component: RegisterComponent },
{ path: '', component:HomeComponent },
{ path: 'login', component: LoginComponent },

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
