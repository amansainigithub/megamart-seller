import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductStatusServiceService } from '../../../../_services/productStatusService/product-status-service.service';

@Component({
  selector: 'app-product-variant-complete',
  templateUrl: './product-variant-complete.component.html',
  styleUrl: './product-variant-complete.component.css'
})
export class ProductVariantCompleteComponent {
  variantId: any;
  dataCaptured:any;

  constructor(private route: ActivatedRoute,
              private pss:ProductStatusServiceService){}

  ngOnInit(): void {
    this.variantId = this.route.snapshot.paramMap.get('variantId');
    console.log("Routing Successfully :: " + this.variantId);
    this.getProductVariantById(this.variantId);
  }

  getProductVariantById(variantId:any){
    console.log("Variant ID Catured Success :: " + variantId);
    
    this.pss.getProductVariantByVariantId(variantId).subscribe((res: any) => {
      this.dataCaptured = res.data;
      console.log("========================");
      console.log(this.dataCaptured);
  });
  }






}
