import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { UpdateParentFileComponent } from './updateParentFile/update-parent-file/update-parent-file.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ParentCategoryService } from '../../_services/categories/parentCategory/parent-category.service';
import { BucketService } from '../../_services/bucket/bucket.service';


@Component({
  selector: 'app-parent-category',
  templateUrl: './parent-category.component.html',
  styleUrl: './parent-category.component.css'
})
export class ParentCategoryComponent {
  
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
    isActive: false,
  };
 
  progressBarShow:any = false;
  parentList:any = "";

  //form Hide and show for update and save user
  viceVersaForm:boolean = false;

  //To show to image
  fileRendor:boolean = false;
  imageSrc: string = '';
  file:any;

  constructor(
    private router:Router, 
    private parentCategoryService:ParentCategoryService ,
    private bucket:BucketService,
    private toast:NgToastService ,
    private spinner: NgxSpinnerService
  )
  {}

  ngOnInit(): void { 
    this.getParentCategoryList();
  }
  

  
  getParentCategoryList()
  {
    this.spinner.show();
    this.parentCategoryService.getParentCategoryListService().subscribe({
      next:(res:any)=> {
        this.parentList = res.data;
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
    }else{

      //show Spinner
      this.spinner.show();

      //upload File
      this.bucket.uploadFile(this.file).subscribe({
        next:(res:any)=> {
          this.form.categoryFile = res.bucketUrl;
          this.toast.success({detail:"Success",summary:"File Upload Success", position:"bottomRight",duration:1000});
          //save Parent data
          this.saveparentCategory();

          console.log(res);
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


    saveparentCategory()
    {
       //save File
       this.parentCategoryService.saveParentCategory(this.form).subscribe({
         next:(res:any)=> {
           this.toast.success({detail:"Success",summary:"data Saved Success", position:"bottomRight",duration:3000});
           
           //get Parent Category List
           this.getParentCategoryList();
           
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

    deleteParentCategoryByid(parentCategoryId:any)
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
        this.parentCategoryService.deleteParentCategoryByIdService(parentCategoryId).subscribe({
          next:(res:any)=> {
            this.toast.success({detail:"Success",summary:"Delete Success", position:"bottomRight",duration:3000});
            
            //get Parent Category List
            this.getParentCategoryList();
            
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
   

    parentdata:any;
    getParentCategoryById(parentCategoryId:any)
    {
      //to show update form
      this.viceVersaForm = true;

      this.parentCategoryService.getParentCategoryByIdService(parentCategoryId).subscribe({
        next:(res:any)=> {
          this.updateform = res.data;
          this.fileRendor = false;
          console.log(res)
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


    updateParentCategory()
    {
      console.log(this.updateform);
       //save File
       this.parentCategoryService.updateParentCategory(this.updateform).subscribe({
         next:(res:any)=> {
           this.toast.success({detail:"Success",summary:"data Update Success", position:"bottomRight",duration:3000});
           
           //get Parent Category List
           this.getParentCategoryList();
           
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


    readonly dialog = inject(MatDialog);
    openDialog(enterAnimationDuration: string, exitAnimationDuration: string,parentCategoryId:any): void {
      const dialogRef = this.dialog.open(UpdateParentFileComponent, {
        width: '400px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: { parentCategoryId: parentCategoryId },
        
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log("Dialog result: " + result);
        this.getParentCategoryList();
      });
      
    }

  }
