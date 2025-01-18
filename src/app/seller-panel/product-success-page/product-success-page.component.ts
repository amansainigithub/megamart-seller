import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-success-page',
  templateUrl: './product-success-page.component.html',
  styleUrl: './product-success-page.component.css',
})
export class ProductSuccessPageComponent {
  constructor(
    private router: Router, 
    private route: ActivatedRoute) {}

  showSuccessPage:any= false;  
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('productId');
    if(productId !== null || productId !== "")
    {
      this.showSuccessPage = true;
    }else
    {
      this.router.navigateByUrl("/seller/dashboard/home")
    }
  }
}
