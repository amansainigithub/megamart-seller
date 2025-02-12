import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BucketService } from '../../../_services/bucket/bucket.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { SizeService } from '../../../_services/catalogMetaDataServices/sizeService/size.service';

@Component({
  selector: 'app-product-size',
  templateUrl: './product-size.component.html',
  styleUrl: './product-size.component.css'
})
export class ProductSizeComponent {

  //Filter List For Searching
  filteredItems:any = [];

   //form Hide and show for update and save user
   viceVersaForm:boolean = false;

  sizeList:any[]=[];
  
  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  //SearchList
  searchText: string = '';

  form: any = {
    size: null,
    defaultName: null,
    description: null,
  };

  updateform: any = {
   size: null,
   defaultName: null,
   description: null,
   isActive: false,
 };

 
   ngOnInit(): void { 
     this.getSizeByPagination({ page: "0", size: "10" });
 
   }
   
   constructor(
              private router:Router, 
              private sizeService:SizeService,
              private toast:NgToastService ,
              private bucket:BucketService,
              private spinner: NgxSpinnerService)
            {}
 
 
  
 //GET SIZE PAGINATION START
   getSizeByPagination(request:any)
  {
    this.spinner.show();
    this.sizeService.getSizeByPagination(request)
    .subscribe(
      {
          next:(res:any)=> {
          this.sizeList = res.data['content']
          this.filteredItems  = this.sizeList;

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
  //GET SIZE PAGINATION ENDING

  nextPage(event: PageEvent) {
    console.log(event);
    const request:any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getSizeByPagination(request);
}

 //SAVE SIZE START
   saveSize()
   {
    console.log(this.form);
    this.sizeService.saveCatalogSizeService(this.form).subscribe({
      next:(res:any)=> {
        this.toast.success({detail:"Success",summary:"SIZE Saved Success", position:"bottomRight",duration:3000});
        this.spinner.hide();

         //get SIZE Category List
         this.getSizeByPagination({ page: "0", size: "10" });
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
   //SAVE SIZE ENDING
 
  
 //Delete SIZE START
   deleteSizeByid(sizeId:any)
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
 
 
         //Delete SIZE
       this.sizeService.deleteSizeByIdService(sizeId).subscribe({
         next:(res:any)=> {
           this.toast.success({detail:"Success",summary:"Delete Success", position:"bottomRight",duration:3000});
           
           //get SIZE List
           this.getSizeByPagination({ page: "0", size: "10" });
           
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
   //DELETE SIZE END
 
  
   //Get SIZE By Id Start
   getSizeById(sizeId: any) {
     //to show update form
     this.viceVersaForm = true;
 
     this.sizeService.getSizeByIdService(sizeId).subscribe({
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
   //Get SIZE By Id Ending
     
     //Update SIZE Start
updateSize()
     {
       console.log(this.updateform);
        //save File
        this.sizeService.updateSizeCode(this.updateform).subscribe({
          next:(res:any)=> {
            this.toast.success({detail:"Success",summary:"Data Update Success", position:"bottomRight",duration:3000});
            
            //get SIZE Category List
           this.getSizeByPagination({ page: "0", size: "10" });
            
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
 //Update SIZE Ending

     
   //Search Starting
     onSearch() {
      const searchQuery = this.searchText.trim().toLowerCase();
  
      if (searchQuery) {
        this.filteredItems = this.sizeList.filter(item => 
          item.size.toLowerCase().includes(searchQuery)
        );
      } else {
        this.filteredItems = this.sizeList;
      }
    }
  //Search Ending
 
}
