import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ParentCategoryService } from '../../../_services/categories/parentCategory/parent-category.service';
import { BucketService } from '../../../_services/bucket/bucket.service';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { HsnService } from '../../../_services/catalogMetaDataServices/HsnService/hsn.service';

@Component({
  selector: 'app-hsn-codes',
  templateUrl: './hsn-codes.component.html',
  styleUrl: './hsn-codes.component.css'
})
export class HsnCodesComponent {

  //Filter List For Searching
  filteredItems:any = [];

   //form Hide and show for update and save user
   viceVersaForm:boolean = false;

  hsnList:any[]=[];
  hsnListClone:any[]=[];
  
  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  //SearchList
  searchText: string = '';

  form: any = {
    hsn: null,
    defaultName: null,
    description: null,
  };

  updateform: any = {
   hsn: null,
   defaultName: null,
   description: null,
   isActive: false,
 };

 
   ngOnInit(): void { 
     this.getHsnByPagination({ page: "0", size: "10" });
 
   }
   
   constructor(
              private router:Router, 
              private parentCategoryService:ParentCategoryService ,
              private hsnService:HsnService,
              private toast:NgToastService ,
              private bucket:BucketService,
              private spinner: NgxSpinnerService)
            {}
 
 
  
 //GET HSN PAGINATION START
   getHsnByPagination(request:any)
  {
    this.spinner.show();
    this.hsnService.getHsnByPagination(request)
    .subscribe(
      {
          next:(res:any)=> {
          this.hsnList = res.data['content']
          this.filteredItems  = this.hsnList;

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
  //GET HSN PAGINATION ENDING

  nextPage(event: PageEvent) {
    console.log(event);
    const request:any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getHsnByPagination(request);
}

 //SAVE HSN START
   saveHsn()
   {
    console.log(this.form);
    this.hsnService.saveHsnCodesService(this.form).subscribe({
      next:(res:any)=> {
        this.toast.success({detail:"Success",summary:"HSN Saved Success", position:"bottomRight",duration:3000});
        this.spinner.hide();

         //get HSN Code Category List
         this.getHsnByPagination({ page: "0", size: "10" });
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
   //SAVE HSN ENDING
 
  
 //Delete HSN Code START
   deleteHsnCodeByid(hsnCode:any)
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
 
 
         //Delete HSN
       this.hsnService.deleteHsnCodeByIdService(hsnCode).subscribe({
         next:(res:any)=> {
           this.toast.success({detail:"Success",summary:"Delete Success", position:"bottomRight",duration:3000});
           
           //get HSN Code List
           this.getHsnByPagination({ page: "0", size: "10" });
           
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
   //DELETE HSN CODE END
 
  
   //Get HSN Code By Id Start
   getHsnCodeById(hsnId: any) {
     //to show update form
     this.viceVersaForm = true;
 
     this.hsnService.getHsnCodeByIdService(hsnId).subscribe({
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
   //Get HSN Code By Id Ending
     
     //Update HSN Code Start
updateHsnCode()
     {
       console.log(this.updateform);
        //save File
        this.hsnService.updateHsnCode(this.updateform).subscribe({
          next:(res:any)=> {
            this.toast.success({detail:"Success",summary:"Data Update Success", position:"bottomRight",duration:3000});
            
            //get HSN Code Category List
           this.getHsnByPagination({ page: "0", size: "10" });
            
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
 //Update HSN Code Ending

     
   //Search Starting
     onSearch() {
      const searchQuery = this.searchText.trim().toLowerCase();
  
      if (searchQuery) {
        this.filteredItems = this.hsnList.filter(item => 
          item.hsn.toLowerCase().includes(searchQuery)
        );
      } else {
        this.filteredItems = this.hsnList;
      }
    }
  //Search Ending
 
 
}
