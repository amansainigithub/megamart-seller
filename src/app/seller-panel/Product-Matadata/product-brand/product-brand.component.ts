import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
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
              private brandService:BrandService,
              private toast:NgToastService ,
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
          this.spinner.hide();
          this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});

        }
      }
    );
  }
  //GET BRAND PAGINATION ENDING

  nextPage(event: PageEvent) {
    const request:any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getBrandByPagination(request);
}

 //SAVE BRAND START
   saveBrand()
   {
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
         this.toast.success({detail:"Success",summary:"Data Fetch Success", position:"bottomRight",duration:3000});
         
       },
       error:(err:any)=>  {
         this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
         this.spinner.hide();
           }
         }
       );
     }
   //Get BRAND Code By Id Ending
     
     //Update BRAND Code Start
     updateBrand()
     {
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


      addNew(){
      window.location.reload();

    }
 
}
