import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { NgToastService } from 'ng-angular-popup';
import { TokenStorageService } from '../../_services/token-storage.service';
import { SellerDataService } from '../seller-data.service';

@Component({
  selector: 'app-seller-data-form',
  templateUrl: './seller-data-form.component.html',
  styleUrl: './seller-data-form.component.css'
})
export class SellerDataFormComponent {
  
  isLoggedIn = false;

  sellerTaxData:any={
    gstNumber:null,
    username:null,
    password:null
  }
  receivedData: any;

  isProvideDetailsLater:any;

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


  //Stepper Starting 
  // Define the step labels
  steps: string[] = ['Seller Tax', 'Step 2', 'Step 3'];
  currentStep: number = 0;
  completedStep: number = 0;

  // Move to the next step
  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.completedStep = Math.max(this.completedStep, this.currentStep);
    } else {
      alert('Form Submitted!');
      // You can handle the final form submission here
    }
  }

  // Move to the previous step
  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  // Navigate to a specific step (used by the nav pills)
  goToStep(step: number) {
    if (step <= this.completedStep) {
      this.currentStep = step;
    }
  }
  //Stepper Ending 



  //Seller Verified Start
  isSellerVerified:any=false;
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
              this.isSellerVerified = true;
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


  

   //save Data Without Seller Other Details Gst,bank.Pickup,Seller Supplier
  regisCompletedSuccess:any = false;
  provideDetailsLater(){
    this.regisCompletedSuccess = true;

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
 //save Data Without Seller Other Details Gst,bank.Pickup,Seller Supplier Ending

    
  













}
