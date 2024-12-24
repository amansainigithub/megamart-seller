import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SingleProductListingComponent } from '../single-product-listing/single-product-listing.component';

@Component({
  selector: 'app-single-product-variant',
  templateUrl: './single-product-variant.component.html',
  styleUrl: './single-product-variant.component.css'
})
export class SingleProductVariantComponent {

  constructor() {
  }


  ngOnInit(): void {
   alert("Working")

  }




}
