import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParentCategoryService } from '../../../_services/categories/parentCategory/parent-category.service';
import { NgToastService } from 'ng-angular-popup';
import { BucketService } from '../../../_services/bucket/bucket.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HotDealEngineService } from '../../../_services/hotDealsService/hotDealsEngineService/hot-deal-engine.service';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hot-deals-engine',
  templateUrl: './hot-deals-engine.component.html',
  styleUrl: './hot-deals-engine.component.css'
})
export class HotDealsEngineComponent {

  //Filter List For Searching
  filteredItems:any = [];

   //form Hide and show for update and save user
   viceVersaForm:boolean = false;

  hotDealEngineList:any[]=[];
  
  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  //SearchList
  searchText: string = '';

  form: any = {
    dealName: null,
    description: null,
  };

  updateform: any = {
    dealName: null,
   description: null,
   status: false,
 };

 
   ngOnInit(): void { 
     this.getHotDealsEngine({ page: "0", size: "10" });
 
   }
   
   constructor(
              private router:Router, 
              private parentCategoryService:ParentCategoryService ,
              private hotDealsEngineService:HotDealEngineService,
              private toast:NgToastService ,
              private bucket:BucketService,
              private spinner: NgxSpinnerService)
            {}
 
 
  
 //GET HOT DEAL ENGINE PAGINATION START
   getHotDealsEngine(request:any)
  {
    this.spinner.show();
    this.hotDealsEngineService.getHotDealsEngine(request)
    .subscribe(
      {
          next:(res:any)=> {
            console.log(res);
            
          this.hotDealEngineList = res.data['content']
          this.filteredItems  = this.hotDealEngineList;

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
  //GET HOT DEAL ENGINE PAGINATION ENDING

  nextPage(event: PageEvent) {
    console.log(event);
    const request:any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getHotDealsEngine(request);
}

 //SAVE HOT DEAL ENGINE START
   saveHotDealEngine()
   {
    console.log(this.form);
    this.hotDealsEngineService.saveHotDealsEngineService(this.form).subscribe({
      next:(res:any)=> {
        this.toast.success({detail:"Success",summary:"HOT DEAL ENGINE Saved Success", position:"bottomRight",duration:3000});
        this.spinner.hide();

         //get Hot Deals Engine Fetching
         this.getHotDealsEngine({ page: "0", size: "10" });
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
   //SAVE HOT DEAL ENGINE ENDING
 
  
 //Delete HOT DEAL ENGINE START
   deleteHotDealsEngine(engineId:any)
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
 
 
         //Delete HOT DEAL ENGINE
       this.hotDealsEngineService.deletehotDealEngineService(engineId).subscribe({
         next:(res:any)=> {
           this.toast.success({detail:"Success",summary:"Delete Success", position:"bottomRight",duration:3000});
           
           //get HOT DEAL ENGINE List
           this.getHotDealsEngine({ page: "0", size: "10" });
           
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
   //DELETE HOT DEAL ENGINE END
 
  
   //Get HOT DEAL ENGINE Code By Id Start
   getHotDealsEngineById(engineId: any) {
     //to show update form
     this.viceVersaForm = true;
 
     this.hotDealsEngineService.getHoteDealEngineByIdService(engineId).subscribe({
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
   //GetHot Deal Engine By Id Ending
     
     //Update Hot Deal Engine Start
updateDealEngine()
     {
       console.log(this.updateform);
        this.hotDealsEngineService.updateHotDealEngineService(this.updateform).subscribe({
          next:(res:any)=> {
            this.toast.success({detail:"Success",summary:"Data Update Success", position:"bottomRight",duration:3000});
            
            //get Hot Deal Engine List
           this.getHotDealsEngine({ page: "0", size: "10" });
            
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
 //Update Hot Deal Engine Ending

     
   //Search Starting
     onSearch() {
      const searchQuery = this.searchText.trim().toLowerCase();
  
      if (searchQuery) {
        this.filteredItems = this.hotDealEngineList.filter(item => 
          item.dealName.toLowerCase().includes(searchQuery)
        );
      } else {
        this.filteredItems = this.hotDealEngineList;
      }
    }
  //Search Ending



  
  createHotDealEngine(){
    this.viceVersaForm = false;
    this.form ={};
    this.updateform ={};
  }

  
 
}
