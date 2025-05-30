import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChildCategoryService } from '../../../../_services/categories/childCategory/child-category.service';

@Component({
  selector: 'app-update-child-file',
  templateUrl: './update-child-file.component.html',
  styleUrl: './update-child-file.component.css'
})
export class UpdateChildFileComponent {

  
  imageSrc: string = '';
  file:any;
  id:any;
  category:any;

  constructor( 
  @Inject(MAT_DIALOG_DATA) public data: any ,
  private toast:NgToastService ,
  private childCategoryService:ChildCategoryService,
  private spinner: NgxSpinnerService,
  private route:ActivatedRoute,
  private dialogRef: MatDialogRef<UpdateChildFileComponent>) { }

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
       this.spinner.show();
      if(this.file == null)
      {
       this.toast.error({detail:"Error",summary:"Error : File is Empty", position:"bottomRight",duration:3000});
      }
      else{
        this.childCategoryService.updateChildFile(this.file,this.data.childCategoryId).subscribe({
          next:(res:any)=>{
            this.toast.success({detail:"Success",summary:"File Update success", position:"bottomRight",duration:3000});
            this.dialogRef.close();
            this.spinner.hide();
          },error:(err:any)=>{
            console.log(err.roor.message);
             this.spinner.hide();
          }
        })
      }
    }


}
