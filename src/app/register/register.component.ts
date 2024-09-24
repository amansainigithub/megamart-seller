import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from '../_services/user.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  mobileForm:any={
    mobile:null,
    isVerified:false
  }

  otpForm:any={
    otp:null,
    mobile:null
  }

  //Validation Key
  nextRegisterForm:any = false;

  //USER ALREADY VERIFIED
  isUserVerified:any = false;
 
  constructor(private authService: AuthService , 
              private UserService:UserService ,  
              private toast:NgToastService,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  mobilePattern:any = /^\d{10}$/;
  signUpWithMobile(){
   
      if (!this.mobilePattern.test(this.mobileForm.mobile)) {
        this.toast.success({detail:"Please Enter a Valid mobile number",summary:"Error", position:"topRight",duration:3000});
        return;
    }

    this.authService.sellerSendOtpService(this.mobileForm).subscribe(data => {

            const jsonObject = JSON.parse(JSON.stringify(data));

            //Set Mobile Data To OTP FORM JSON OBJECT
            this.otpForm.mobile =  this.mobileForm.mobile;

              if(jsonObject.data.message === 'ALREADY_VERIFIED')
              {
                this.toast.success({detail:"User Already Verified",summary:"success", position:"topRight",duration:3000});
                this.isUserVerified = true;
              }else{
                this.toast.success({detail:"OTP Sent to Your mobile Number",summary:"success", position:"topRight",duration:3000});
                this.isUserVerified = false;
              }
             
           },
              err=>{
                const jsonObject = JSON.parse(JSON.stringify(err));
                this.toast.success({detail:"Errorr",summary:"error", position:"topRight",duration:3000});
        })
  }


  isDisabled = false; // Track if the button is disabled
  countdown = 60; // Countdown time in seconds
  startCountdown() {
    this.isDisabled = true; // Disable the button
    this.countdown = 60; // Reset countdown

    // Use RxJS timer to handle the countdown
    const countdownTimer = timer(0, 1000).subscribe(() => {
      this.countdown--;

      // When countdown reaches zero, reset the button state
      if (this.countdown <= 0) {
        this.isDisabled = false;
        countdownTimer.unsubscribe(); // Unsubscribe to prevent memory leaks
      }
    });
  }


//Validate Seller OTP
  isOtpValid:any = false;
  validateOtp(): void {
    if(this.otpForm.otp.length == 6)
    {

      if(this.otpForm.otp == '' || this.otpForm.otp === undefined || this.otpForm.otp == null)
        {
          this.toast.error({detail:"Please Enter a Valid OTP",summary:"Error", position:"topRight",duration:3000});
          return;
        }
        
        this.otpForm.mobile = this.mobileForm.mobile;
  
          this.authService.validateSellerOtp(this.otpForm).subscribe(resp => {
  
            const jsonObject = JSON.parse(JSON.stringify(resp));
            this.toast.success({detail:jsonObject.data.message,summary:"success", position:"topRight",duration:3000});
            
            this.isOtpValid = true;
            //this.nextRegisterForm = true;
              },
              err=>{
                const jsonObject = JSON.parse(JSON.stringify(err));
                this.toast.error({detail:"invalid OTP or Expired",summary:"Error", position:"topRight",duration:3000});
          })

    }
  }


  sellerForm:any={
    email:null,
    password:null,
    mobile:null
  }

  submitSellerDetails(){
    console.log(this.sellerForm);

    this.sellerForm.mobile = this.mobileForm.mobile;
    console.log(this.sellerForm);

    this.authService.register(this.sellerForm).subscribe(data=>{
      this.toast.success({detail:"Registration completed",summary:"success", position:"topRight",duration:3000});

      //Redirect To Seller information Page
      const selllerData = { mobile: this.sellerForm.mobile,registerCompleted:'Y' };
      this.router.navigate(['/register/seller-information'], { state: { data: selllerData } });
    },error=>{
      this.toast.error({detail:"Registration Failed | Something went wrong",summary:"Error", position:"topRight",duration:3000});
    })
  }





  



}
