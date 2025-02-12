import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BucketService } from '../../../_services/bucket/bucket.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { BrandService } from '../../../_services/catalogMetaDataServices/brandService/brand.service';

@Component({
  selector: 'app-product-brand',
  templateUrl: './product-brand.component.html',
  styleUrl: './product-brand.component.css'
})
export class ProductBrandComponent {

  //Filter List For Searching
  filteredItems:any = [];

   //form Hide and show for update and save user
   viceVersaForm:boolean = false;

  brandList:any[]=[];
  
  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  //SearchList
  searchText: string = '';

  form: any = {
    brand: null,
    defaultName: null,
    description: null,
  };

  updateform: any = {
    brand: null,
   defaultName: null,
   description: null,
   isActive: false,
 };

 
   ngOnInit(): void { 
     this.getBrandByPagination({ page: "0", size: "10" });
 
   }
   
   constructor(
              private router:Router, 
              private brandService:BrandService,
              private toast:NgToastService ,
              private bucket:BucketService,
              private spinner: NgxSpinnerService)
            {}
 
 
  
 //GET BRAND PAGINATION START
   getBrandByPagination(request:any)
  {
    this.spinner.show();
    this.brandService.getBrandByPagination(request)
    .subscribe(
      {
          next:(res:any)=> {
          this.brandList = res.data['content']
          this.filteredItems  = this.brandList;

          this.totalElements = res.data['totalElements'];
          this.toast.success({detail:"Success",summary:"Data Fetch Success", position:"bottomRight",duration:3000});
          this.spinner.hide();
        },
        error:(err:any)=>  {
          console.log(err)
          this.spinner.hide();
          this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});

        }
      }
    );
  }
  //GET BRAND PAGINATION ENDING

  nextPage(event: PageEvent) {
    console.log(event);
    const request:any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getBrandByPagination(request);
}

 //SAVE BRAND START
   saveBrand()
   {
    console.log(this.form);
    this.brandService.saveBrandService(this.form).subscribe({
      next:(res:any)=> {
        this.toast.success({detail:"Success",summary:"Brand Saved Success", position:"bottomRight",duration:3000});
        this.spinner.hide();

         //get BRAND List
         this.getBrandByPagination({ page: "0", size: "10" });
      },
      error:(err:any)=>  {
        //this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
        this.toast.error({detail:"Error",summary:"Data Not Saved", position:"bottomRight",duration:3000});

        this.spinner.hide();
        console.log(err);
      }
    }
  );
   }
   //SAVE BRAND ENDING
 
  
 //Delete BRAND START
 deleteBrandByid(brandId:any)
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
 
 
         //Delete BRAND
       this.brandService.deleteBrandByIdService(brandId).subscribe({
         next:(res:any)=> {
           this.toast.success({detail:"Success",summary:"Delete Success", position:"bottomRight",duration:3000});
           
           //get BRAND Code List
           this.getBrandByPagination({ page: "0", size: "10" });
           
           this.updateform = {};

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
   //DELETE BRAND CODE END
 
  
   //Get BRAND By Id Start
   getBrandeById(brandId: any) {
     //to show update form
     this.viceVersaForm = true;
 
     this.brandService.getBrandByIdService(brandId).subscribe({
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
   //Get BRAND Code By Id Ending
     
     //Update BRAND Code Start
     updateBrand()
     {
       console.log(this.updateform);
        //save File
        this.brandService.updateBrand(this.updateform).subscribe({
          next:(res:any)=> {
            this.toast.success({detail:"Success",summary:"Data Update Success", position:"bottomRight",duration:3000});
            
            //get BRAND Code Category List
           this.getBrandByPagination({ page: "0", size: "10" });
            
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
 //Update BRAND Ending

     
   //Search Starting
     onSearch() {
      const searchQuery = this.searchText.trim().toLowerCase();
  
      if (searchQuery) {
        this.filteredItems = this.brandList.filter(item => 
          item.brand.toLowerCase().includes(searchQuery)
        );
      } else {
        this.filteredItems = this.brandList;
      }
    }
  //Search Ending
 
}
