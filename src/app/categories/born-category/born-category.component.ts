import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { UpdateBornFileComponent } from './updateBornFile/update-born-file/update-born-file.component';
import { MappedSampleFilesComponent } from './bornMappedFiles/mapped-sample-files/mapped-sample-files.component';
import { BabyCategoryService } from '../../_services/categories/babyCategory/baby-category.service';
import { BornCategoryService } from '../../_services/categories/bornCategory/born-category.service';
import { BucketService } from '../../_services/bucket/bucket.service';

@Component({
  selector: 'app-born-category',
  templateUrl: './born-category.component.html',
  styleUrl: './born-category.component.css'
})
export class BornCategoryComponent {

  //form Hide and show for update and save user
  viceVersaForm:boolean = false;

  progressBarShow:any = false;

  parentList: any[] = [];
  imageSrc: string = '';
  file:any;
  fileRendor:boolean = false;
  bornList:any;
  babyList:any;


  form: any = {
    categoryName: null,
    defaultName: null,
    slug: null,
    description: null,
    metaDescription: null,
    featuredStatus: null,
    categoryFile: null,
    permalink: null,
    user: null,
    babyCategoryId: null,
  };

  ngOnInit(): void { 

    //Baby List
    this.getbabyCategoryList();

    // Born List
    this.getbornCategoryList();
  }

  constructor(
    private router:Router, 
    private babyCategoryService:BabyCategoryService,
    private bornCategoryService:BornCategoryService,
    private toast:NgToastService ,
    private bucket:BucketService,
    private spinner: NgxSpinnerService)
  {}


  getbabyCategoryList()
  {
    this.spinner.show();
    this.babyCategoryService.getBabyCategoryListService().subscribe({
      next:(res:any)=> {
        this.babyList = res.data;
        this.spinner.hide();
      },
      error:(err:any)=>  {
        console.log(err);
        this.spinner.hide();
        this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
        
      }
    }
  );
  }

 getbornCategoryList()
      {
              this.spinner.show();
              this.bornCategoryService.getBornCategoryListService().subscribe({
                next:(res:any)=> {
                  this.bornList = res.data;
                  this.spinner.hide();
                },
                error:(err:any)=>  {
                  console.log(err);
                  this.spinner.hide();
                  this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
                }
              }
            );
      }


  deleteBornCategoryByid(bornCategoryId:any){
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
            this.bornCategoryService.deletebornCategoryByIdService(bornCategoryId).subscribe({
              next:(res:any)=> {
                this.toast.success({detail:"Success",summary:"Delete Success", position:"bottomRight",duration:3000});
                
                //get Born Category List
                this.getbornCategoryList();
                
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
                this.form.categoryFile = res.bucketUrl;
                this.toast.success({detail:"Success",summary:"File Upload Success", position:"bottomRight",duration:3000});
                //save Parent data
                this.saveBornCategory();
              },
              error:(err:any)=>  {
                this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
                console.log(err);
                return;
              }
            }
          );
       
        }
  }

  //Save Data Born
  saveBornCategory()
  {
      this.bornCategoryService.saveBornCategoryService(this.form).subscribe({
        next:(res:any)=> {
          this.toast.success({detail:"Success",summary:"Born Saved Success", position:"bottomRight",duration:3000});
          this.spinner.hide();

          //getBornList
          this.getbornCategoryList();
        },
        error:(err:any)=>  {
          this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
          this.spinner.hide();
          console.log(err);
        }
      }
    );
  }


  updateform: any = {
    id: 0,
    categoryName: null,
    defaultName: null,
    slug: null,
    description: null,
    metaDescription: null,
    featuredStatus: null,
    categoryFile: null,
    permalink: null,
    user: null,
    isActive: false,
  };


  
  updateBornCategory()
  {
    console.log(this.updateform);
     //save File
    const data ={id:"100",productName:"AMan saini"}
     this.bornCategoryService.updatebornCategoryNew(data).subscribe({
      next:(res:any)=> {
        this.toast.success({detail:"Success",summary:"data Update Success", position:"bottomRight",duration:3000});
        this.spinner.hide();
      },
      error:(err:any)=>  {
        this.toast.error({detail:"Error",summary:err, position:"bottomRight",duration:3000});
        this.spinner.hide();
        console.log(err);
          }
        }
      );


     this.bornCategoryService.updatebornCategory(this.updateform).subscribe({
       next:(res:any)=> {
         this.toast.success({detail:"Success",summary:"data Update Success", position:"bottomRight",duration:3000});
         
         //get Child Category List
         this.getbornCategoryList();
         
         this.spinner.hide();
       },
       error:(err:any)=>  {
         this.toast.error({detail:"Error",summary:err, position:"bottomRight",duration:3000});
         this.spinner.hide();
         console.log(err);
           }
         }
       );
  }

  getBornCategoryById(bornCategoryid: any) {
    //to show update form
    this.viceVersaForm = true;
    bornCategoryid
    this.bornCategoryService.getBornCategoryByIdService(bornCategoryid).subscribe({
      next:(res:any)=> {
        this.updateform = res.data;
        this.fileRendor = false;
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


     //Update File
     readonly dialog = inject(MatDialog);
     openDialog(enterAnimationDuration: string, exitAnimationDuration: string,bornCategoryId:any): void {
       const dialogRef = this.dialog.open(UpdateBornFileComponent, {
         width: '400px',
         enterAnimationDuration,
         exitAnimationDuration,
         data: { bornCategoryId: bornCategoryId },
         
       });
 
       dialogRef.afterClosed().subscribe(result => {
         console.log("Dialog result: " + result);
         this.getbornCategoryList();
       });
       
     }


     //Update File
     readonly bornMappedSampleFiesDialog = inject(MatDialog);
     bornMappedSampleFies(enterAnimationDuration: string, exitAnimationDuration: string,bornCategoryId:any): void {
       const dialogRef = this.bornMappedSampleFiesDialog.open(MappedSampleFilesComponent, {
         width: '700px',
         height:'500px',
         enterAnimationDuration,
         exitAnimationDuration,
         data: { bornCategoryId: bornCategoryId },
         
       });
 
       dialogRef.afterClosed().subscribe(result => {
         console.log("Dialog result: " + result);
         this.getbornCategoryList();
       });
       
     }




}
