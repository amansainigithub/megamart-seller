import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { NgToastService } from 'ng-angular-popup';
import { TokenStorageService } from '../../_services/token-storage.service';
import { SellerDataService } from '../seller-data.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-seller-data-form',
  templateUrl: './seller-data-form.component.html',
  styleUrl: './seller-data-form.component.css'
})
export class SellerDataFormComponent {
  
  isLoggedIn = false;
  receivedData: any;
  isProvideDetailsLater:any;
  checkBox:any;

  
  sellerTaxData:any={
    gstNumber:null,
    username:null,
    password:null
  }

  constructor(private authService: AuthService , 
    private UserService:UserService ,  
    private toast:NgToastService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private sellerDataService:SellerDataService) { }

  ngOnInit() {

    //Get seller Data jo set Kiya tha
    this.receivedData = this.sellerDataService.getData();

    //Check if any condition user directly access to this Page
    if(this.receivedData == null || this.receivedData == undefined || this.receivedData == "")
      {
       this.router.navigateByUrl("/login");
       return;
      }

    //Set satate Data to sellerTaxData Object
    this.sellerTaxData.username = this.receivedData.mobile;
    this.sellerTaxData.password = this.receivedData.password;
  }

  accordianFirst:boolean = true;
  accordianSecond:boolean = false;
  accordianThird:boolean = false;
  accordianFourth:boolean = false;


// Event handler for tab change
onTabChange(event: MatTabChangeEvent) {
  console.log('Selected tab: ', event.tab.textLabel);
  // You can add more functionality here based on the selected tab
  // For example, updating content, tracking analytics, etc.

  if(event.tab.textLabel === "First")
  {
    this.accordianFirst = true;
    this.accordianSecond = false;
    this.accordianThird = false;
    this.accordianFourth = false;
  }

  if(event.tab.textLabel === "Second")
    {
      this.accordianFirst = false;
      this.accordianSecond = true;
      this.accordianThird = false;
      this.accordianFourth = false;
    }
  if(event.tab.textLabel === "Third")
    {
      this.accordianFirst = false;
      this.accordianSecond = false;
      this.accordianThird = true;
      this.accordianFourth = false;
    }  
  if(event.tab.textLabel === "Fourth")
    {
       this.accordianSecond = false;
       this.accordianThird = false;
       this.accordianFourth = false;
       this.accordianFourth = true;
   }  

    
}


  verfiySeller()
  {
          //show Sprinner
          this.spinner.show();

          console.log("Verify Gst Process Starting...");
          console.log(this.sellerTaxData);

          this.authService.verifySellerService(this.sellerTaxData).subscribe(data => {
            const jsonObject = JSON.parse(JSON.stringify(data));

            // seller is already Verified
            if(jsonObject.data.message === "Seller is Already Verified")
            {
              this.toast.error({detail:"Invalid Gst Number",summary:"Error", position:"topRight",duration:3000});
            }

            //GST Verified Successfully
            if(jsonObject.data.message === "GST_VERIFIED")
            {
              this.toast.success({detail:"Gst Verified Success",summary:"Success", position:"topRight",duration:3000});
            }
            //Hide Sprinner
            this.spinner.hide();

          },
              err=>{
                const jsonObject = JSON.parse(JSON.stringify(err));
                this.toast.success({detail:"Error",summary:"something Went Wrong", position:"topRight",duration:3000});
                //Hide Sprinner
                this.spinner.hide();
        })

  }
   //Seller Verified Ending


  skipSellerData:any = false;
 skipSellerDetails(){
    this.skipSellerData = true;

    //Clear Seller Data to Seller Object
    this.sellerDataService.clearData();

    setTimeout(() => {
        //Hide Spinner
          this.spinner.hide();

          // this.router.navigateByUrl("/login");
          this.router.navigate(['/login']).then(() => {
            window.location.reload()
          })
        }, 5000);
   }

}
