import { Component, inject } from '@angular/core';
import { HomeSliderService } from '../../../_services/UI/bannerSliderServices/home-slider.service';
import { BucketService } from '../../../_services/bucket/bucket.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { UpdateHomeSliderFileComponent } from './update-home-slider-file/update-home-slider-file.component';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrl: './home-slider.component.css'
})
export class HomeSliderComponent {

  constructor(
        private homeSliderService:HomeSliderService ,
        private bucket:BucketService,
        private toast:NgToastService ,
        private spinner: NgxSpinnerService
      )
      {}
  
       
    progressBarShow:any = false;
    bannerList:any = "";
  
    //form Hide and show for update and save user
    viceVersaForm:boolean = false;
  
    //To show to image
    fileRendor:boolean = false;
    imageSrc: string = '';
    file:any;
  
    ngOnInit(): void { 
      this.getHomeSliderList();
    }
    
    getHomeSliderList()
    {
      this.spinner.show();
      this.homeSliderService.getHomeSliderListService().subscribe({
        next:(res:any)=> {
          this.bannerList = res.data;
          this.spinner.hide();
        },
        error:(err:any)=>  {
          this.spinner.hide();
          this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
          
        }
      }
    );
    }
  
    form: any = {
      id: 0,
      categoryId: null,
      categoryName: null,
      fileUrl:null,
      slug: null,
      status: null,
      title: null,
    };
  
    updateform: any = {
      id: 0,
      categoryId: null,
      categoryName: null,
      fileUrl:null,
      slug: null,
      status: null,
      title: null,
    };
   
  
    parentdata:any;
    getHomeSliderById(parentCategoryId:any)
    {
      //to show update form
      this.viceVersaForm = true;
  
      this.homeSliderService.getHomeSliderByIdService(parentCategoryId).subscribe({
        next:(res:any)=> {
          this.updateform = res.data;
          this.fileRendor = false;
          this.toast.success({detail:"Success",summary:"Data Fetch Success", position:"bottomRight",duration:3000});
          
        },
        error:(err:any)=>  {
          this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
          this.spinner.hide();
            }
          }
        );
  
    }
  
    onSubmit()
    {
      if(this.file == null)
      {
        this.toast.error({detail:"Error",summary:"please Select File", position:"bottomRight",duration:3000});
      }else{
  
        //show Spinner
        this.spinner.show();
  
        //upload File
        this.bucket.uploadFile(this.file).subscribe({
          next:(res:any)=> {
            this.form.fileUrl = res.bucketUrl;
            this.toast.success({detail:"Success",summary:"File Upload Success", position:"bottomRight",duration:1000});
            //save Parent data
            this.saveBannerSlider();
          },
          error:(err:any)=>  {
            this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
            return;
          }
        }
      );
       
        }
      }
  
  
      saveBannerSlider()
      {
         //save File
         this.homeSliderService.saveHomeSliderService(this.form).subscribe({
           next:(res:any)=> {
             this.toast.success({detail:"Success",summary:"data Saved Success", position:"bottomRight",duration:3000});
             
             //get Parent Category List
             this.getHomeSliderList();
             
             this.spinner.hide();
           },
           error:(err:any)=>  {
             this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
             this.spinner.hide();
               }
             }
           );
      }
  
    deleteHomeSliderByid(homeSliderId:any)
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
            this.homeSliderService.deleteHomeSliderByIdService(homeSliderId).subscribe({
              next:(res:any)=> {
                this.toast.success({detail:"Success",summary:"Delete Success", position:"bottomRight",duration:3000});
                
                //get Home Slider List
                this.getHomeSliderList();
                
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
  
  
        
      updateParentCategory()
      {
         //save File
         this.homeSliderService.updateHomeSliderService(this.updateform).subscribe({
           next:(res:any)=> {
             this.toast.success({detail:"Success",summary:"data Update Success", position:"bottomRight",duration:3000});
             
             //get Home Slider List
             this.getHomeSliderList();
             
             this.spinner.hide();
           },
           error:(err:any)=>  {
             this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
             this.spinner.hide();
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
  
     readonly dialog = inject(MatDialog);
        openDialog(enterAnimationDuration: string, exitAnimationDuration: string,homeSliderId:any): void {
          const dialogRef = this.dialog.open(UpdateHomeSliderFileComponent, {
            width: '400px',
            enterAnimationDuration,
            exitAnimationDuration,
            data: { homeSliderId: homeSliderId },
            
          });
    
          dialogRef.afterClosed().subscribe(result => {
            this.getHomeSliderList();
          });
          
        }


        createSlider(){
          this.viceVersaForm = false;
          this.form ={};
          this.updateform ={};
        }
}
