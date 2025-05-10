import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SellerDashComponent } from './seller-panel/seller-dash/seller-dash.component';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { HomeComponent } from './home/home/home.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgToastModule } from 'ng-angular-popup';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import { SellerHomeComponent } from './seller-panel/seller-home/seller-home.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CatalogsAreaComponent } from './seller-panel/seller-catalog/catalogs/catalogs-area/catalogs-area.component';
import { NgChartsModule } from 'ng2-charts';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';
import { MatDialogModule} from '@angular/material/dialog';
import { SingleProductListingComponent } from './seller-panel/seller-catalog/sellerSingleCatalog/single-product-listing/single-product-listing.component';
import { ProductVariantCompleteComponent } from './seller-panel/seller-catalog/product-status/product-variant-complete/product-variant-complete.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ProductApprovedComponent } from './seller-panel/seller-catalog/product-status/product-approved/product-approved.component';
import { ProductSuccessPageComponent } from './seller-panel/product-success-page/product-success-page.component';
import { ParentCategoryComponent } from './categories/parent-category/parent-category.component';
import { UpdateParentFileComponent } from './categories/parent-category/updateParentFile/update-parent-file/update-parent-file.component';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ChildCategoryComponent } from './categories/child-category/child-category.component';
import { UpdateChildFileComponent } from './categories/child-category/updateChildFile/update-child-file/update-child-file.component';
import { UpdateBornFileComponent } from './categories/born-category/updateBornFile/update-born-file/update-born-file.component';
import { MappedSampleFilesComponent } from './categories/born-category/bornMappedFiles/mapped-sample-files/mapped-sample-files.component';
import { BornCategoryComponent } from './categories/born-category/born-category.component';
import { UpdateBabyFileComponent } from './categories/baby-category/updateBabyFile/update-baby-file/update-baby-file.component';
import { BabyCategoryComponent } from './categories/baby-category/baby-category.component';
import { ProductTypeComponent } from './seller-panel/Product-Matadata/product-type/product-type.component';
import { ProductSizeComponent } from './seller-panel/Product-Matadata/product-size/product-size.component';
import { ProductBrandComponent } from './seller-panel/Product-Matadata/product-brand/product-brand.component';
import { ProductMaterialComponent } from './seller-panel/Product-Matadata/product-material/product-material.component';
import { ProductNetQuantityComponent } from './seller-panel/Product-Matadata/product-net-quantity/product-net-quantity.component';
import { HsnCodesComponent } from './seller-panel/Product-Matadata/hsn-codes/hsn-codes.component';
import { ProductCheckingComponent } from './seller-panel/seller-products/product-checking/product-checking.component';
import { SellerProductUnderReviewComponent } from './seller-panel/seller-products/seller-product-under-review/seller-product-under-review.component';
import { ProductReviewStatusComponent } from './seller-panel/product-review-status/product-review-status/product-review-status.component';
import { HomeSliderComponent } from './seller-panel/UI/home-slider/home-slider.component';
import { UpdateHomeSliderFileComponent } from './seller-panel/UI/home-slider/update-home-slider-file/update-home-slider-file.component';
import { HotDealsEngineComponent } from './seller-panel/HotDeals/hot-deals-engine/hot-deals-engine.component';
import { HotDealsComponent } from './seller-panel/HotDeals/hot-deals/hot-deals.component';
import { UpdateHotDealFileComponent } from './seller-panel/HotDeals/hot-deals/update-hot-deal-file/update-hot-deal-file.component';
import { NgxEditorModule } from 'ngx-editor';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { OrdersComponent } from './seller-panel/orders/orders.component';
import { OrderPaymentRefundsComponent } from './seller-panel/Refund/order-payment-refunds/order-payment-refunds.component';
import { ReturnOrdersComponent } from './seller-panel/returnExchangeOrders/return-orders/return-orders.component';
import { ExchangeOrdersComponent } from './seller-panel/returnExchangeOrders/exchange-orders/exchange-orders.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SellerDashComponent,
    HomeComponent,
    SellerHomeComponent,
    CatalogsAreaComponent,
    SingleProductListingComponent,
    ProductVariantCompleteComponent,
    ProductApprovedComponent,
    ProductSuccessPageComponent,
    ParentCategoryComponent,
    UpdateParentFileComponent,
    ChildCategoryComponent,
    UpdateChildFileComponent,
    UpdateBornFileComponent,
    MappedSampleFilesComponent,
    BornCategoryComponent,
    UpdateBabyFileComponent,
    BabyCategoryComponent,
    ProductTypeComponent,
    ProductSizeComponent,
    ProductBrandComponent,
    ProductMaterialComponent,
    ProductNetQuantityComponent,
    HsnCodesComponent,
    ProductApprovedComponent,
    ProductCheckingComponent,
    SellerProductUnderReviewComponent,
    ProductReviewStatusComponent,
    HomeSliderComponent,
    UpdateHomeSliderFileComponent,
    HotDealsEngineComponent,
    HotDealsComponent,
    UpdateHotDealFileComponent,
    OrdersComponent,
    OrderPaymentRefundsComponent,
    ReturnOrdersComponent,
    ExchangeOrdersComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    NgToastModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatTabsModule,
    MatPaginatorModule,
    NgChartsModule,
    MatTooltipModule,
    MatSelectModule,
    MatBadgeModule,
    MatDialogModule,
    MatCardModule,
    MatSlideToggleModule,
    NgxEditorModule,
    AngularEditorModule ,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'This item is actually loading...' })
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [authInterceptorProviders,provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
