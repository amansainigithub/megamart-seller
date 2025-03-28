import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { UpdateHomeSliderFileComponent } from '../../../UI/home-slider/update-home-slider-file/update-home-slider-file.component';
import { HotDealsService } from '../../../../_services/hotDealsService/hotDealsService/hot-deals.service';

@Component({
  selector: 'app-update-hot-deal-file',
  templateUrl: './update-hot-deal-file.component.html',
  styleUrl: './update-hot-deal-file.component.css'
})
export class UpdateHotDealFileComponent {

  
    imageSrc: string = '';
    file:any;
    id:any;
    category:any;
  
    constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private toast:NgToastService ,
    private hotDealService:HotDealsService,
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
      updateHotDealFile(){
        if(this.file == null)
        {
         this.toast.error({detail:"Error",summary:"Error : File is Empty", position:"bottomRight",duration:3000});
        }
        else{
          this.hotDealService.updateHotDealFileService(this.file,this.data.dealId).subscribe({
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
