import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ParentCategoryService } from '../../../../_services/categories/parentCategory/parent-category.service';

@Component({
  selector: 'app-update-parent-file',
  templateUrl: './update-parent-file.component.html',
  styleUrl: './update-parent-file.component.css'
})
export class UpdateParentFileComponent {

  imageSrc: string = '';
  file:any;
  id:any;
  category:any;

  constructor( 
  @Inject(MAT_DIALOG_DATA) public data: any ,
  private toast:NgToastService ,
  private parentCategoryService:ParentCategoryService,
  private spinner: NgxSpinnerService,
  private route:ActivatedRoute,
  private dialogRef: MatDialogRef<UpdateParentFileComponent>) { }

    ngOnInit(): void {
     }

     onChange(event:any){
      const reader = new FileReader();
      if(event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc = reader.result as string;
        };
        this.file=event.target.files[0];
      }
    }


    //UPDATE FILE CATEGORY
    updateCategoryFile(){
      if(this.file == null)
      {
       this.toast.error({detail:"Error",summary:"Error : File is Empty", position:"bottomRight",duration:3000});
      }
      else{
        this.parentCategoryService.updateParentFile (this.file,this.data.parentCategoryId).subscribe({
          next:(res:any)=>{
            console.log(res);
            this.toast.success({detail:"Success",summary:"File Update success", position:"bottomRight",duration:3000});
            this.dialogRef.close();

          },error:(err:any)=>{
            console.log(err.roor.message);
          }
        })
      }
    }

}
