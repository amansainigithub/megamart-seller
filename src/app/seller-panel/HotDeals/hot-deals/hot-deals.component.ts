import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ParentCategoryService } from '../../../_services/categories/parentCategory/parent-category.service';
import { ChildCategoryService } from '../../../_services/categories/childCategory/child-category.service';
import { NgToastService } from 'ng-angular-popup';
import { BucketService } from '../../../_services/bucket/bucket.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { UpdateChildFileComponent } from '../../../categories/child-category/updateChildFile/update-child-file/update-child-file.component';
import { HotDealEngineService } from '../../../_services/hotDealsService/hotDealsEngineService/hot-deal-engine.service';
import { HotDealsService } from '../../../_services/hotDealsService/hotDealsService/hot-deals.service';
import { UpdateHotDealFileComponent } from './update-hot-deal-file/update-hot-deal-file.component';
import { BabyCategoryService } from '../../../_services/categories/babyCategory/baby-category.service';

@Component({
  selector: 'app-hot-deals',
  templateUrl: './hot-deals.component.html',
  styleUrl: './hot-deals.component.css'
})
export class HotDealsComponent {

   //form Hide and show for update and save user
  viceVersaForm:boolean = false;

  progressBarShow:any = false;

  hotDealEngineList: any[] = [];
  imageSrc: string = '';
  file:any;
  fileRendor:boolean = false;
  hotDealList:any;
  babyCategoryList:any;


  form: any = {
    name: null,
    engineId:null,
    categoryId: null,
    offerName: null,
    dealColor:null,
    fileUrl:null,
    redirectUrl: null,
    status: null,
  };

  constructor(
    private hotDealsEngineService:HotDealEngineService ,
    private hotDealsService:HotDealsService ,
    private babyCategoryService:BabyCategoryService,
    private toast:NgToastService ,
    private bucket:BucketService,
    private spinner: NgxSpinnerService)
  {}

  ngOnInit(): void { 
    // Parent List
    this.getHotDealsEngineList();

    this.getbabyCategoryList();

    // Child List
    this.getHotDealsList();
  }

  getHotDealsEngineList()
  {
      this.spinner.show();
      this.hotDealsEngineService.getHotDealsEngine({ page: "0", size: "10" }).subscribe({
        next:(res:any)=> {
          this.hotDealEngineList = res.data.content;
          this.spinner.hide();
        },
        error:(err:any)=>  {
          this.spinner.hide();
          this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
          
        }
      }
    );
  }


  getbabyCategoryList()
  {
    this.spinner.show();
    this.babyCategoryService.getBabyCategoryListService().subscribe({
      next:(res:any)=> {
        this.babyCategoryList = res.data;
        this.spinner.hide();
      },
      error:(err:any)=>  {
        this.spinner.hide();
        this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
        
      }
    }
  );
  }


  onChange(event:any){
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileRendor = true;
        this.imageSrc = reader.result as string;
      };
      this.file=event.target.files[0];
    }
  }


  onSubmit()
  {
    if(this.file == null)
      {
        this.toast.error({detail:"Error",summary:"please Select File", position:"bottomRight",duration:3000});
      }
      else{
            this.spinner.show();
            //upload File
            this.bucket.uploadFile(this.file).subscribe({
              next:(res:any)=> {
                this.form.fileUrl = res.bucketUrl;
                this.toast.success({detail:"Success",summary:"File Upload Success", position:"bottomRight",duration:3000});
                //save Hot Deal data
                this.saveHotDeal();
              },
              error:(err:any)=>  {
                this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
                return;
              }
            }
          );
       
        }
  }

  saveHotDeal()
  {
    this.hotDealsService.saveHotDealService(this.form).subscribe({
      next:(res:any)=> {
        this.toast.success({detail:"Success",summary:"saved Hot Deals Success", position:"bottomRight",duration:3000});
        this.spinner.hide();

        //getChildList
        this.getHotDealsList();
      },
      error:(err:any)=>  {
        this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
        this.spinner.hide();
      }
    }
  );
  }


  getHotDealsList()
  {
    this.spinner.show();
    this.hotDealsService.getHotDealListService().subscribe({
      next:(res:any)=> {
        this.hotDealList = res.data;
        this.spinner.hide();
      },
      error:(err:any)=>  {
        this.spinner.hide();
        this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
        
      }
    }
  );
  }

 

  deleteHotDealsByid(id:any)
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


        //save File
      this.hotDealsService.deleteHotDealsByIdService(id).subscribe({
        next:(res:any)=> {
          this.toast.success({detail:"Success",summary:"Delete Success", position:"bottomRight",duration:3000});
          
          //get Parent Category List
          this.getHotDealsList();
          
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

  updateform: any = {
    id: 0,
    name: null,
    engineId:null,
    categoryId: null,
    offerName: null,
    dealColor:null,
    fileUrl:null,
    redirectUrl: null,
    status: null,
  };


  getHotDealById(id: any) {
    //to show update form
    this.viceVersaForm = true;

    this.hotDealsService.getHotDealByIdService(id).subscribe({
      next:(res:any)=> {
        this.updateform = res.data;
        this.fileRendor = res.fileUrl;
        this.toast.success({detail:"Success",summary:"Data Fetch Success", position:"bottomRight",duration:3000});
        
      },
      error:(err:any)=>  {
        this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
        this.spinner.hide();
          }
        }
      );
    }

    updateHotDeal()
    {
       this.hotDealsService.updateHotDeals(this.updateform).subscribe({
         next:(res:any)=> {
           this.toast.success({detail:"Success",summary:"data Update Success", position:"bottomRight",duration:3000});
           
           //get Hot Deal List
           this.getHotDealsList();
           
           this.spinner.hide();
         },
         error:(err:any)=>  {
           this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
           this.spinner.hide();
             }
           }
         );
    }



    readonly dialog = inject(MatDialog);
    openDialog(enterAnimationDuration: string, exitAnimationDuration: string,dealId:any): void {
      const dialogRef = this.dialog.open(UpdateHotDealFileComponent, {
        width: '400px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: { dealId: dealId },
        
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getHotDealsList();
      });
      
    }

   
  
}
