import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { UpdateChildFileComponent } from './updateChildFile/update-child-file/update-child-file.component';
import { BucketService } from '../../_services/bucket/bucket.service';
import { ChildCategoryService } from '../../_services/categories/childCategory/child-category.service';
import { ParentCategoryService } from '../../_services/categories/parentCategory/parent-category.service';

@Component({
  selector: 'app-child-category',
  templateUrl: './child-category.component.html',
  styleUrl: './child-category.component.css'
})
export class ChildCategoryComponent {

   //form Hide and show for update and save user
  viceVersaForm:boolean = false;

  progressBarShow:any = false;

  parentList: any[] = [];
  imageSrc: string = '';
  file:any;
  fileRendor:boolean = false;
  childList:any;


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
    parentCategoryId: null,
  };


  ngOnInit(): void { 
    // Parent List
    this.getParentCategoryList();

    // Child List
    this.getChildCategoryList();
  }
  

  constructor(
    private router:Router, 
    private parentCategoryService:ParentCategoryService ,
    private childCategoryService:ChildCategoryService,
    private toast:NgToastService ,
    private bucket:BucketService,
    private spinner: NgxSpinnerService)
  {}


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


  getParentCategoryList()
  {
      this.spinner.show();
      this.parentCategoryService.getParentCategoryListService().subscribe({
        next:(res:any)=> {
          this.parentList = res.data;
          console.log(this.parentList);
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
                this.saveChildCategory();
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

  saveChildCategory()
  {
    this.childCategoryService.saveChildCategoryService(this.form).subscribe({
      next:(res:any)=> {
        this.toast.success({detail:"Success",summary:"child Saved Success", position:"bottomRight",duration:3000});
        this.spinner.hide();

        //getChildList
        this.getChildCategoryList();
      },
      error:(err:any)=>  {
        this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
        this.spinner.hide();
        console.log(err);
      }
    }
  );
  }


  getChildCategoryList()
  {
    this.spinner.show();
    this.childCategoryService.getChildCategoryListService().subscribe({
      next:(res:any)=> {
        this.childList = res.data;
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

 

  deleteChildCategoryByid(parentCategoryId:any)
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
      this.childCategoryService.deleteChildCategoryByIdService(parentCategoryId).subscribe({
        next:(res:any)=> {
          this.toast.success({detail:"Success",summary:"Delete Success", position:"bottomRight",duration:3000});
          
          //get Parent Category List
          this.getChildCategoryList();
          
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


  getChildCategoryById(childCategoryId: any) {
    //to show update form
    this.viceVersaForm = true;

    this.childCategoryService.getChildCategoryByIdService(childCategoryId).subscribe({
      next:(res:any)=> {
        this.updateform = res.data;
        this.fileRendor = false;
        console.log(res);

        //this.getParentCategoryList();

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

    updateChildCategory()
    {
      console.log(this.updateform);
       //save File
       this.childCategoryService.updateChildCategory(this.updateform).subscribe({
         next:(res:any)=> {
           this.toast.success({detail:"Success",summary:"data Update Success", position:"bottomRight",duration:3000});
           
           //get Child Category List
           this.getChildCategoryList();
           
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
    openDialog(enterAnimationDuration: string, exitAnimationDuration: string,childCategoryId:any): void {
      const dialogRef = this.dialog.open(UpdateChildFileComponent, {
        width: '400px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: { childCategoryId: childCategoryId },
        
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log("Dialog result: " + result);
        this.getChildCategoryList();
      });
      
    }

}
