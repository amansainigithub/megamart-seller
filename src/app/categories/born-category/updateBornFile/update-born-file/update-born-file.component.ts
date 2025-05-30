import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { BornCategoryService } from '../../../../_services/categories/bornCategory/born-category.service';

@Component({
  selector: 'app-update-born-file',
  templateUrl: './update-born-file.component.html',
  styleUrl: './update-born-file.component.css'
})
export class UpdateBornFileComponent {

  imageSrc: string = '';
  file:any;
  id:any;
  category:any;


  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private toast:NgToastService ,
    private bornCategoryService:BornCategoryService,
    private spinner: NgxSpinnerService,
    private route:ActivatedRoute,
    private dialogRef: MatDialogRef<UpdateBornFileComponent>) { }
  
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
          this.bornCategoryService.updateBornFile(this.file,this.data.bornCategoryId).subscribe({
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
