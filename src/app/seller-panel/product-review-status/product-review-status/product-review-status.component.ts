import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BrandService } from '../../../_services/catalogMetaDataServices/brandService/brand.service';
import { NgToastService } from 'ng-angular-popup';
import { BucketService } from '../../../_services/bucket/bucket.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductReviewStatusService } from '../../../_services/productReviewStatus/product-review-status.service';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-review-status',
  templateUrl: './product-review-status.component.html',
  styleUrl: './product-review-status.component.css',
})
export class ProductReviewStatusComponent {
  //Filter List For Searching
  cloneProductReviewList: any[] = [];

  //form Hide and show for update and save user
  viceVersaForm: boolean = false;

  productReviewList: any[] = [];

  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  //SearchList
  searchText: string = '';

  form: any = {
    productStatus: null,
    productStatusValue: null,
    description: null,
  };

  updateform: any = {
    productStatus: null,
    productStatusValue: null,
    description: null,
    isActive: false,
 };

  ngOnInit(): void {
    this.getProductReviewStatus({ page: '0', size: '10' });
  }

  constructor(
    private router: Router,
    private prs: ProductReviewStatusService,
    private toast: NgToastService,
    private bucket: BucketService,
    private spinner: NgxSpinnerService
  ) {}

  getProductReviewStatus(request: any) {
    this.spinner.show();
    this.prs.getProductReviewStatus(request).subscribe({
      next: (res: any) => {
        this.productReviewList = res.data['content'];
        this.cloneProductReviewList = this.productReviewList;

        this.totalElements = res.data['totalElements'];
        this.toast.success({
          detail: 'Success',
          summary: 'Data Fetch Success',
          position: 'bottomRight',
          duration: 3000,
        });
        this.spinner.hide();
      },
      error: (err: any) => {
        console.log(err);
        this.spinner.hide();
        this.toast.error({
          detail: 'Error',
          summary: err.error.data.message,
          position: 'bottomRight',
          duration: 3000,
        });
      },
    });
  }

  //Delete MATERIAL Code START
  deleteStatusReview(statusId:any)
     { 
       Swal.fire({
             title: 'Are you sure?',
             text: "You won't to delete this",
             icon: 'warning',
             showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             confirmButtonText: 'Yes, delete it!'
           }).then((result) => {
             if (result.isConfirmed) {
   
   
           //Delete MATERIAL
         this.prs.deleteReviewStatusService(statusId).subscribe({
           next:(res:any)=> {
             this.toast.success({detail:"Success",summary:"Delete Success", position:"bottomRight",duration:3000});
             
             //get MATERIAL Code List
             this.getProductReviewStatus({ page: "0", size: "10" });
             
             //this.updateform = {};
  
             this.spinner.hide();
           },
           error:(err:any)=>  {
             this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
             this.spinner.hide();
             console.log(err);
               }
             }
           );
           
         }
       })
     }
     //DELETE Material CODE END



     //SAVE Material START
  saveProductReviewStatus()
  {
    console.log(this.form);
    this.prs.saveProductReviewStatus(this.form).subscribe({
      next:(res:any)=> {
        this.toast.success({detail:"Success",summary:"Product Review Status Saved Success", position:"bottomRight",duration:3000});
        this.spinner.hide();

        //get MATERIAL Code Category List
        this.getProductReviewStatus({ page: "0", size: "10" });
      },
      error:(err:any)=>  {
        this.toast.error({detail:"Error",summary:"Data Not Saved", position:"bottomRight",duration:3000});

        this.spinner.hide();
        console.log(err);
      }
    }
  );
  }
 //SAVE MATERIAL ENDING


 
   //Get Material Code By Id Start
   getProductReviewStatusById(id: any) {
    //to show update form
    this.viceVersaForm = true;

    this.prs.getReviewStatusByIdService(id).subscribe({
      next:(res:any)=> {
        this.updateform = res.data;
        console.log(res);
        this.toast.success({detail:"Success",summary:"Data Fetch Success", position:"bottomRight",duration:3000});
        
      },
      error:(err:any)=>  {
        this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
        this.spinner.hide();
        console.log(err);
          }
        }
      );
    }
  //Get MATERIAL Code By Id Ending


   //Update MATERIAL Code Start
updateProductReviewsStatus()
{
  console.log(this.updateform);
   //save File
   this.prs.updateMaterial(this.updateform).subscribe({
     next:(res:any)=> {
       this.toast.success({detail:"Success",summary:"Data Update Success", position:"bottomRight",duration:3000});
       
       //get MATERIAL Code Category List
      this.getProductReviewStatus({ page: "0", size: "10" });
       
       this.spinner.hide();
     },
     error:(err:any)=>  {
       this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
       this.spinner.hide();
       console.log(err);
         }
       }
     );
}
//Update MATERIAL Code Ending



  nextPage(event: PageEvent) {
    console.log(event);
    const request: any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getProductReviewStatus(request);
  }

  //Search Starting
  onSearch() {
    const searchQuery = this.searchText.trim().toLowerCase();

    if (searchQuery) {
      this.productReviewList = this.cloneProductReviewList.filter((item) =>
        item.productStatus.toLowerCase().includes(searchQuery)
      );
    } else {
      this.productReviewList = this.cloneProductReviewList;
    }
  }
  //Search Ending

  
}
