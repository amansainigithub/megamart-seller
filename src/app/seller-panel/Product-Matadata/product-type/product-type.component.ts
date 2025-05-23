import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { TypeServiceService } from '../../../_services/catalogMetaDataServices/typeService/type-service.service';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrl: './product-type.component.css'
})
export class ProductTypeComponent {

  //Filter List For Searching
  filteredItems:any = [];

   //form Hide and show for update and save user
   viceVersaForm:boolean = false;

  typeList:any[]=[];
  
  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  //SearchList
  searchText: string = '';

  form: any = {
    catalogType: null,
    defaultName: null,
    description: null,
  };

  updateform: any = {
    catalogType: null,
   defaultName: null,
   description: null,
   isActive: false,
 };

 
   ngOnInit(): void { 
     this.getTypeByPagination({ page: "0", size: "10" });
 
   }
   
   constructor(
              private typeService:TypeServiceService,
              private toast:NgToastService ,
              private spinner: NgxSpinnerService)
            {}
 
 
  
 //GET TYPE PAGINATION START
   getTypeByPagination(request:any)
  {
    this.spinner.show();
    this.typeService.getTypeByPagination(request)
    .subscribe(
      {
          next:(res:any)=> {
          this.typeList = res.data['content']
          this.filteredItems  = this.typeList;

          this.totalElements = res.data['totalElements'];
          this.toast.success({detail:"Success",summary:"Data Fetch Success", position:"bottomRight",duration:3000});
          this.spinner.hide();
        },
        error:(err:any)=>  {
          this.spinner.hide();
          this.toast.error({detail:"Error",summary:err.error. data.message, position:"bottomRight",duration:3000});

        }
      }
    );
  }
  //GET TYPE PAGINATION ENDING

  nextPage(event: PageEvent) {
    const request:any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getTypeByPagination(request);
}

 //SAVE TYPE START
   saveType()
   {
    this.typeService.saveTypeService(this.form).subscribe({
      next:(res:any)=> {
        this.toast.success({detail:"Success",summary:"Type Saved Success", position:"bottomRight",duration:3000});
        this.spinner.hide();

         //get TYPE Code Category List
         this.getTypeByPagination({ page: "0", size: "10" });
      },
      error:(err:any)=>  {
        //this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
        this.toast.error({detail:"Error",summary:"Data Not Saved", position:"bottomRight",duration:3000});

        this.spinner.hide();
      }
    }
  );
   }
   //SAVE TYPE ENDING
 
  
 //Delete TYPE START
 deleteTypeByid(typeId:any)
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
 
 
         //Delete TYPE
       this.typeService.deleteTypeByIdService(typeId).subscribe({
         next:(res:any)=> {
           this.toast.success({detail:"Success",summary:"Delete Success", position:"bottomRight",duration:3000});
           
           //get TYPE List
           this.getTypeByPagination({ page: "0", size: "10" });
           
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
   //DELETE TYPE END
 
  
   //Get TYPE By Id Start
   getTypeById(typeId: any) {
     //to show update form
     this.viceVersaForm = true;
 
     this.typeService.getTypeByIdService(typeId).subscribe({
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
   //Get TYPE By Id Ending
     
     //Update TYPE Start
updateType()
     {
        //save File
        this.typeService.updateType(this.updateform).subscribe({
          next:(res:any)=> {
            this.toast.success({detail:"Success",summary:"Data Update Success", position:"bottomRight",duration:3000});
            
            //get TYPE Category List
           this.getTypeByPagination({ page: "0", size: "10" });
            
            this.spinner.hide();
          },
          error:(err:any)=>  {
            this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
            this.spinner.hide();
              }
            }
          );
     }
 //Update TYPE Ending

     
   //Search Starting
     onSearch() {
      const searchQuery = this.searchText.trim().toLowerCase();
  
      if (searchQuery) {
        this.filteredItems = this.typeList.filter(item => 
          item.catalogType.toLowerCase().includes(searchQuery)
        );
      } else {
        this.filteredItems = this.typeList;
      }
    }
  //Search Ending
 

      addNew(){
      window.location.reload();

    }

}
