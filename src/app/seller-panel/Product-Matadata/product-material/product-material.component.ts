import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BucketService } from '../../../_services/bucket/bucket.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MaterialService } from '../../../_services/catalogMetaDataServices/materialService/material.service';

@Component({
  selector: 'app-product-material',
  templateUrl: './product-material.component.html',
  styleUrl: './product-material.component.css'
})
export class ProductMaterialComponent {

  //Filter List For Searching
  filteredItems:any = [];

   //form Hide and show for update and save user
   viceVersaForm:boolean = false;

  materialList:any[]=[];
  
  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  //SearchList
  searchText: string = '';

  form: any = {
    material: null,
    defaultName: null,
    description: null,
  };

  updateform: any = {
    material: null,
   defaultName: null,
   description: null,
   isActive: false,
 };

 
   ngOnInit(): void { 
     this.getMaterialByPagination({ page: "0", size: "10" });
 
   }
   
   constructor(
              private router:Router, 
              private materialService:MaterialService,
              private toast:NgToastService ,
              private bucket:BucketService,
              private spinner: NgxSpinnerService)
            {}
 
 
  
 //GET MATERIAL PAGINATION START
   getMaterialByPagination(request:any)
  {
    this.spinner.show();
    this.materialService.getMaterialByPagination(request)
    .subscribe(
      {
          next:(res:any)=> {
          this.materialList = res.data['content']
          this.filteredItems  = this.materialList;

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
  //GET MATERIAL PAGINATION ENDING

  nextPage(event: PageEvent) {
    console.log(event);
    const request:any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getMaterialByPagination(request);
}

 //SAVE Material START
   saveMaterial()
   {
    console.log(this.form);
    this.materialService.saveMaterialService(this.form).subscribe({
      next:(res:any)=> {
        this.toast.success({detail:"Success",summary:"Material Saved Success", position:"bottomRight",duration:3000});
        this.spinner.hide();

         //get MATERIAL Code Category List
         this.getMaterialByPagination({ page: "0", size: "10" });
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
   //SAVE MATERIAL ENDING
 
  
 //Delete MATERIAL Code START
   deleteMaterial(materialId:any)
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
       this.materialService.deleteMaterialByIdService(materialId).subscribe({
         next:(res:any)=> {
           this.toast.success({detail:"Success",summary:"Delete Success", position:"bottomRight",duration:3000});
           
           //get MATERIAL Code List
           this.getMaterialByPagination({ page: "0", size: "10" });
           
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
   //DELETE Material CODE END
 
  
   //Get Material Code By Id Start
   getMaterialById(materialId: any) {
     //to show update form
     this.viceVersaForm = true;
 
     this.materialService.getMaterialByIdService(materialId).subscribe({
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
updateMaterial()
     {
       console.log(this.updateform);
        //save File
        this.materialService.updateMaterial(this.updateform).subscribe({
          next:(res:any)=> {
            this.toast.success({detail:"Success",summary:"Data Update Success", position:"bottomRight",duration:3000});
            
            //get MATERIAL Code Category List
           this.getMaterialByPagination({ page: "0", size: "10" });
            
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

     
   //Search Starting
     onSearch() {
      const searchQuery = this.searchText.trim().toLowerCase();
  
      if (searchQuery) {
        this.filteredItems = this.materialList.filter(item => 
          item.material.toLowerCase().includes(searchQuery)
        );
      } else {
        this.filteredItems = this.materialList;
      }
    }
  //Search Ending
 
}
