import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SellerGuardService } from './sellerGuard/seller-guard.service';
import { SellerDashComponent } from './seller-panel/seller-dash/seller-dash.component';
import { HomeComponent } from './home/home/home.component';
import { SellerHomeComponent } from './seller-panel/seller-home/seller-home.component';
import { CatalogsAreaComponent } from './seller-panel/seller-catalog/catalogs/catalogs-area/catalogs-area.component';
import { SingleProductListingComponent } from './seller-panel/seller-catalog/sellerSingleCatalog/single-product-listing/single-product-listing.component';
import { ProductIncompleteComponent } from './seller-panel/seller-catalog/product-status/product-incomplete/product-incomplete.component';
import { ProductVariantCompleteComponent } from './seller-panel/seller-catalog/product-status/product-variant-complete/product-variant-complete.component';
import { ProductUnderReviewComponent } from './seller-panel/seller-catalog/product-status/product-under-review/product-under-review.component';
import { ProductApprovedComponent } from './seller-panel/seller-catalog/product-status/product-approved/product-approved.component';
import { ProductSuccessPageComponent } from './seller-panel/product-success-page/product-success-page.component';
import { ParentCategoryComponent } from './categories/parent-category/parent-category.component';
import { ChildCategoryComponent } from './categories/child-category/child-category.component';
import { UpdateParentFileComponent } from './categories/parent-category/updateParentFile/update-parent-file/update-parent-file.component';
import { BabyCategoryComponent } from './categories/baby-category/baby-category.component';
import { BornCategoryComponent } from './categories/born-category/born-category.component';

const routes: Routes = [
{ path: '', component:LoginComponent },

{
  path: 'seller/dashboard/home',canActivate:[SellerGuardService] ,
      children: [

                  { path: 'parent-category', component: ParentCategoryComponent , pathMatch:'full' },
                  { path: 'child-category', component: ChildCategoryComponent , pathMatch:'full' ,  },
                  { path: 'update-parent-file', component: UpdateParentFileComponent , pathMatch:'full' },
                  { path: 'baby-category', component: BabyCategoryComponent , pathMatch:'full' },
                  { path: 'born-category', component: BornCategoryComponent , pathMatch:'full' },
                 
                    { path: '', component: SellerHomeComponent },
                    { path: 'seller-dashboard', component:SellerDashComponent },
                    { path: 'catalog-Area', component:CatalogsAreaComponent },
                    { path: 'product-Incomplete', component:ProductIncompleteComponent },
                    { path: 'singleProductListing', component:SingleProductListingComponent},
                    { path: 'variantComplete/:variantId', component:ProductVariantCompleteComponent},
                    { path: 'product-Under-Review', component:ProductUnderReviewComponent},
                    { path: 'product-Approved', component:ProductApprovedComponent},
                    { path: 'product-submitted/:productId', component:ProductSuccessPageComponent},
                  
      ],
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
