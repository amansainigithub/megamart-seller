import { Component, Inject } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
     this.spinner.show();

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
        this.toast.success({ detail: 'Success', summary: 'Files uploaded successfully!', duration: 3000 });
         this.spinner.hide();
      },
      (error) => {
        console.error('Upload failed:', error);
        this.toast.error({ detail: 'Error', summary: 'File upload failed', duration: 3000 });
         this.spinner.hide();
      }
    );
  }
  }
