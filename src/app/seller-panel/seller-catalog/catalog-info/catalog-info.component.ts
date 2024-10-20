import { Component } from '@angular/core';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from '../../../_services/sharedService/shared-data.service';
import { SaveCatalogService } from '../../../_services/catalog/saveCatalogService/save-catalog.service';

class FileUpload {
  selectedFile: File | null = null;
  selectedImage: string | ArrayBuffer | null = null;
  uploadProgress: number = 0;
  isUploading: boolean = false;
}


@Component({
  selector: 'app-catalog-info',
  templateUrl: './catalog-info.component.html',
  styleUrl: './catalog-info.component.css'
})
export class CatalogInfoComponent {

//Catalog Form
catalogForm = {
  sellerStoreName:"Sumit Singh",
  categoryName :"",
  categoryId:""
}


  constructor( 
    private tokenStorage: TokenStorageService, 
    private toast:NgToastService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private sharedDataService:SharedDataService,
    private saveCatalogService:SaveCatalogService) {    }

    receivedData:any;
      ngOnInit(): void {
      this.receivedData =  this.sharedDataService.getData();
      this.receivedData = {catalogId : 32}

      if(this.receivedData === "" || this.receivedData=== undefined ||  this.receivedData === null ||  this.receivedData === "")
      {
          this.toast.error({detail:"Category is Null or Empty",summary:"Error", position:"topRight",duration:3000});
      }else{
        this.toast.success({detail:this.receivedData.catalogId , summary:"Data Fetching", position:"topRight",duration:3000});
        
        //calling current Catalog
        this.getCatalogById(this.receivedData.catalogId);
      }

    }


    //Get Current Catalog By Id
    catalogResponse : any ;
    getCatalogById(catalogId:any)
    {
      this.spinner.show();

      //save Catalog Form Data
      this.saveCatalogService.getCatalogById(catalogId).subscribe(res => {
        
        this.catalogResponse = res.data;
        console.log(this.catalogResponse);
        this.toast.success({detail:"Success",summary:"Get Catalog By Id Success: " + res.data.id, position:"topRight",duration:3000});
 
        this.spinner.hide();
       },
       err=>{
           this.toast.error({detail:"Something went Wrong",summary:"Error", position:"topRight",duration:3000});
           console.log(err);
           this.spinner.hide();
     })
    }


//Additional File Starting
 // Additional file handling for the second upload
 additionalFile: any = null;
 additionalFileProgress: number = 0;
 onAdditionalFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.additionalFile = {
        file: file,
        preview: reader.result as string
      };
      this.uploadAdditionalFile(file); // Upload the second file
    };
    reader.readAsDataURL(file);

    // Clear the input value to allow selecting the same file again
    event.target.value = '';
  }
}


uploadAdditionalFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  // Simulate file upload for the second file
  const progressInterval = setInterval(() => {
    this.additionalFileProgress += 10;
    if (this.additionalFileProgress >= 100) {
      clearInterval(progressInterval);
    }
  }, 300); // Simulating upload progress
}


removeAdditionalFile() {
  this.additionalFile = null;
  this.additionalFileProgress = 0;
}
// Additional File Ending


// ================================================================
// upload Catalog Multiple Files Start
storeFiles: any[] = []; // Array to store files
files: any[] = [null, null, null, null]; // Multiple upload slots
uploadProgress: number[] = [0, 0, 0, 0]; // Track progress for each file

  onFileSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.files[index] = {
          file: file,
          preview: reader.result as string
        };
        this.uploadFile(file, index); // Upload file after selecting
      };
      reader.readAsDataURL(file);

      // Clear the input value to allow selecting the same file again
      event.target.value = '';
    }

    console.log(this.files);
  }

  uploadFile(file: File, index: number) {
    const formData = new FormData();
    formData.append('file', file);

    // Simulate file upload
    const progressInterval = setInterval(() => {
      this.uploadProgress[index] += 10;
      if (this.uploadProgress[index] >= 100) {
        clearInterval(progressInterval);
      }
    }, 300); // Simulating upload progress
  }

  removeFile(index: number) {
    this.files[index] = null;
    this.uploadProgress[index] = 0;
  }

  // upload Catalog Multiple Files Ending



  //when Catalog Submitted
  uploadFilesToBoot() {
    for (let i = 0; i < this.files.length; i++) {
      this.uploadFileToServer(this.files[i].file, i);
    }
  }


  //Files Uploaded To server
  uploadFileToServer(file: File, index: number) {
    const formData = new FormData();
    formData.append('file', file);

    // Replace 'http://localhost:8080/upload' with your actual endpoint
    // this.http.post('http://localhost:8080/upload', formData, {
    //   reportProgress: true,
    //   observe: 'events'
    // }).subscribe(event => {
    //   if (event.type === HttpEventType.UploadProgress) {
    //     if (event.total) {
    //       this.uploadProgress[index] = Math.round((event.loaded / event.total) * 100);
    //     }
    //   } else if (event.type === HttpEventType.Response) {
    //     console.log('File uploaded successfully!', event.body);
    //   }
    // }, error => {
    //   console.error('Upload failed:', error);
    // });
  }




}
