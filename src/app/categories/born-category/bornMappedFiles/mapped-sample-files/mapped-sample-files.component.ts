import { Component, Inject } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BabyCategoryService } from '../../../../_services/categories/babyCategory/baby-category.service';
import { BornCategoryService } from '../../../../_services/categories/bornCategory/born-category.service';
import { BucketService } from '../../../../_services/bucket/bucket.service';

@Component({
  selector: 'app-mapped-sample-files',
  templateUrl: './mapped-sample-files.component.html',
  styleUrl: './mapped-sample-files.component.css'
})
export class MappedSampleFilesComponent {
  fileItems = [
    { title: '', description: '', file: null },
    { title: '', description: '', file: null },
    { title: '', description: '', file: null },
    { title: '', description: '', file: null }
  ];

   constructor(
    @Inject(MAT_DIALOG_DATA) public data: any ,
      private router:Router, 
      private babyCategoryService:BabyCategoryService,
      private bornCategoryService:BornCategoryService,
      private toast:NgToastService ,
      private bucket:BucketService,
      private spinner: NgxSpinnerService)
    {}
  

  onFileSelect(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.fileItems[index].file = file;
    }
  }

  

  submitForm(): void {
    const formData = new FormData();
  this.fileItems.forEach((item, index) => {
    if (item.file) { // Ensure the file is not null
      const metadata = JSON.stringify({
        title: item.title,
        description: item.description,
      });
      formData.append(`files`, item.file); // All files use the same key 'files'
      formData.append(`metadata`, metadata); // Metadata array
    }
  });
  
    

    // Call the service to upload the form data
    this.bornCategoryService.uploadSampleFiles(formData,this.data.bornCategoryId).subscribe(
      (response: any) => {
        console.log('Upload successful:', response);
        this.toast.success({ detail: 'Success', summary: 'Files uploaded successfully!', duration: 5000 });
      },
      (error) => {
        console.error('Upload failed:', error);
        this.toast.error({ detail: 'Error', summary: 'File upload failed', duration: 5000 });
      }
    );
  }
  



    // Send data to Spring Boot backend
    // this.httpClient.post('http://localhost:8080/api/upload', formData).subscribe(
    //   (response) => {
    //     console.log('Upload successful:', response);
    //     alert('Files uploaded successfully!');
    //   },
    //   (error) => {
    //     console.error('Upload failed:', error);
    //     alert('File upload failed');
    //   }
    // );
  }
// }
  
      //  onChange(event:any){
      //   const reader = new FileReader();
      //   if(event.target.files && event.target.files.length) {
      //     const [file] = event.target.files;
      //     reader.readAsDataURL(file);
      //     reader.onload = () => {
      //       this.imageSrc = reader.result as string;
      //     };
      //     this.file=event.target.files[0];
      //   }
      // }
  
  
      // //UPDATE FILE CATEGORY
      // updateCategoryFile(){

      //   console.log(this.file);

      //   console.log(this.data.bornCategoryId);

      //   console.log("=======================")

      //   if(this.file == null)
      //   {
      //    this.toast.error({detail:"Error",summary:"Error : File is Empty", position:"bottomRight",duration:3000});
      //   }
      //   else{
      //     this.bornCategoryService.updateBornFile(this.file,this.data.bornCategoryId).subscribe({
      //       next:(res:any)=>{
      //         this.toast.success({detail:"Success",summary:"File Update success", position:"bottomRight",duration:3000});
      //         this.dialogRef.close();
  
      //       },error:(err:any)=>{
      //         console.log(err.roor.message);
      //       }
      //     })
      //   }
      // }

