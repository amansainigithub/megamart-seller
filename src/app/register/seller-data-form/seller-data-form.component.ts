import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-data-form',
  templateUrl: './seller-data-form.component.html',
  styleUrl: './seller-data-form.component.css'
})
export class SellerDataFormComponent {
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  readonly panelOpenState = signal(false);



  
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  gstForm:any={
    gst:null
  }
  
  receivedData: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.receivedData = history.state.data;

    if(this.receivedData == "" || this.receivedData == null || this.receivedData == undefined 
    )
    {
      this.router.navigateByUrl("/login");
    }
  }





}
