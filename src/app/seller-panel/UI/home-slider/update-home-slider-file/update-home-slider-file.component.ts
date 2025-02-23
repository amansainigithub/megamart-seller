import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { HomeSliderService } from '../../../../_services/UI/bannerSliderServices/home-slider.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-home-slider-file',
  templateUrl: './update-home-slider-file.component.html',
  styleUrl: './update-home-slider-file.component.css'
})
export class UpdateHomeSliderFileComponent {
imageSrc: string = '';
  file:any;
  id:any;
  category:any;

  constructor( 
  @Inject(MAT_DIALOG_DATA) public data: any ,
  private toast:NgToastService ,
  private homeSliderService:HomeSliderService,
  private spinner: NgxSpinnerService,
  private route:ActivatedRoute,
  private dialogRef: MatDialogRef<UpdateHomeSliderFileComponent>) { }

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
        this.homeSliderService.updateHomeSliderFile(this.file,this.data.homeSliderId).subscribe({
          next:(res:any)=>{
            this.toast.success({detail:"Success",summary:"File Update success", position:"bottomRight",duration:3000});
            this.dialogRef.close();

          },error:(err:any)=>{
            console.log(err.roor.message);
          }
        })
      }
    }
}
