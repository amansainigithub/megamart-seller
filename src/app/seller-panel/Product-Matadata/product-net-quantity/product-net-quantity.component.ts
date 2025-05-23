import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { NetQuantityService } from '../../../_services/catalogMetaDataServices/netQuantityService/net-quantity.service';

@Component({
  selector: 'app-product-net-quantity',
  templateUrl: './product-net-quantity.component.html',
  styleUrl: './product-net-quantity.component.css'
})
export class ProductNetQuantityComponent {

  //Filter List For Searching
  filteredItems:any = [];

   //form Hide and show for update and save user
   viceVersaForm:boolean = false;

  netQuantityList:any[]=[];
  
  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  //SearchList
  searchText: string = '';

  form: any = {
    netQuantity: null,
    defaultName: null,
    description: null,
  };

  updateform: any = {
    netQuantity: null,
   defaultName: null,
   description: null,
   isActive: false,
 };

 
   ngOnInit(): void { 
     this.getNetQuantityPagination({ page: "0", size: "10" });
 
   }
   
   constructor(
              private netQuantityService:NetQuantityService,
              private toast:NgToastService ,
              private spinner: NgxSpinnerService)
            {}
 
 
  
 //GET net Quantity PAGINATION START
   getNetQuantityPagination(request:any)
  {
    this.spinner.show();
    this.netQuantityService.getNetQuantityByPagination(request)
    .subscribe(
      {
          next:(res:any)=> {
          this.netQuantityList = res.data['content']
          this.filteredItems  = this.netQuantityList;

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
  //GET NetQuantity PAGINATION ENDING

  nextPage(event: PageEvent) {
    const request:any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getNetQuantityPagination(request);
}

 //SAVE NETQUANTITY START
   saveNetQuantity()
   {
    this.netQuantityService.saveNetQuantity(this.form).subscribe({
      next:(res:any)=> {
        this.toast.success({detail:"Success",summary:"Net Quantity Saved Success", position:"bottomRight",duration:3000});
        this.spinner.hide();

         //get  NetQuantity Category List
         this.getNetQuantityPagination({ page: "0", size: "10" });
      },
      error:(err:any)=>  {
        //this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
        this.toast.error({detail:"Error",summary:"Data Not Saved", position:"bottomRight",duration:3000});

        this.spinner.hide();
      }
    }
  );
   }
   //SAVE NetQuantity ENDING
 
  
 //Delete NetQuantitySTART
   deleteNetQuantityByid(netQuantityId:any)
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
 
 
         //Delete net quantity 
       this.netQuantityService.deleteNetQuantityByIdService(netQuantityId).subscribe({
         next:(res:any)=> {
           this.toast.success({detail:"Success",summary:"Delete Success", position:"bottomRight",duration:3000});
           
           //get net quantity  List
           this.getNetQuantityPagination({ page: "0", size: "10" });
           
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
   //DELETE net quantity END
 
  
   //Get NetQuantity By Id Start
   getNetQuantityById(netQuantityId: any) {
     //to show update form
     this.viceVersaForm = true;
 
     this.netQuantityService.getNetQuantityByIdService(netQuantityId).subscribe({
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
   //Get net quantity  By Id Ending
     
     //Update net quantity  Start
updateNetQuantity()
     {
        //save File
        this.netQuantityService.updateNetQuantity(this.updateform).subscribe({
          next:(res:any)=> {
            this.toast.success({detail:"Success",summary:"Data Update Success", position:"bottomRight",duration:3000});
            
            //get net quantity Category List
           this.getNetQuantityPagination({ page: "0", size: "10" });
            
            this.spinner.hide();
          },
          error:(err:any)=>  {
            this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
            this.spinner.hide();
              }
            }
          );
     }
 //Update net quantity Ending

     
   //Search Starting
     onSearch() {
      const searchQuery = this.searchText.trim().toLowerCase();
  
      if (searchQuery) {
        this.filteredItems = this.netQuantityList.filter(item => 
          item.netQuantity.toLowerCase().includes(searchQuery)
        );
      } else {
        this.filteredItems = this.netQuantityList;
      }
    }
  //Search Ending

      addNew(){
      window.location.reload();

    }
 
}
