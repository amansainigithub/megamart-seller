import { Component } from '@angular/core';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from '../../../_services/sharedService/shared-data.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { CatalogService } from '../../../_services/catalogService/catalog.service';
import { API_AUTHORIZA_URL } from '../../../constants/Constants';
import { first } from 'rxjs';

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

  constructor( 
    private tokenStorage: TokenStorageService, 
    private toast:NgToastService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private sharedDataService:SharedDataService,
    private http: HttpClient,
    private catalogService:CatalogService) {    }

    receivedData:any;
      ngOnInit(): void {
      this.receivedData =  this.sharedDataService.getData();
      this.receivedData = {catalogId : 32}
      if(this.receivedData === "" || this.receivedData=== undefined ||  this.receivedData === null ||  this.receivedData === "")
      {
          this.toast.error({detail:"Category is Null or Empty",summary:"Error", position:"topRight",duration:3000});
      }else{
        this.toast.success({detail:this.receivedData.catalogId , summary:"Data Fetching", position:"topRight",duration:3000});
        
        //calling current Catalog By Id
        this.getCatalogById(this.receivedData.catalogId);
      }

      //get Masters 
      this.getCatalogMasters();
    }

    //Get Current Catalog By Id
    catalogResponse : any ;
    getCatalogById(catalogId:any)
    {
      this.spinner.show();

      //save Catalog Form Data
      this.catalogService.getCatalogById(catalogId).subscribe(res => {
        
        this.catalogResponse = res.data;
        console.log(this.catalogResponse);
        this.toast.success({detail:"Success",summary:"Get Catalog By Id Success: " + res.data.id, position:"topRight",duration:3000});
 
        this.spinner.hide();
       },
       err=>{
           this.toast.error({detail:"Category Not Fetched Because id is Hardcoded",summary:"Error", position:"topRight",duration:3000});
           console.log(err);
           this.spinner.hide();
     })
    }



// ============================================FILES PROCESS START=====================================================    
//Additional File Starting
 // Additional file handling for the second upload
 additionalFile: any = null;
 additionalFileProgress: number = 0;
 firstFile:any = "";
 onAdditionalFileSelected(event: any) {
  const file = event.target.files[0];
  this.firstFile = event.target.files[0];
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
  // Simulate file upload for the second file
  const progressInterval = setInterval(() => {
    this.additionalFileProgress += 100;
    if (this.additionalFileProgress >= 100) {
      clearInterval(progressInterval);
    }
  }, 100); // Simulating upload progress
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
filesNew: (File | null)[] = [null, null, null, null, null];
uploadProgress: number[] = [0, 0, 0, 0]; // Track progress for each file

// Controls visibility for each upload slot, initially only the first slot is visible
catalogFileVisible: boolean[] = [true, false, false, false];

// Method to handle file selection
onFileSelected(event: any, index: number) {
  const file = event.target.files[0];
  if (file) {
    this.filesNew[index] = file; // Store the selected file at the specific index

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
}

// Method to simulate file upload
uploadFile(file: File, index: number) {
  // Simulate file upload with progress
  const progressInterval = setInterval(() => {
    this.uploadProgress[index] += 10; // Increase progress by 10% increments
    if (this.uploadProgress[index] >= 100) {
      clearInterval(progressInterval);

      // After the upload completes, make the next upload slot visible if it exists
      if (index + 1 < this.catalogFileVisible.length) {
        this.catalogFileVisible[index + 1] = true;
      }
    }
  }, 100); // Simulating upload progress with a 100ms interval
}


    removeFile(index: number) {
      // Remove the file at the specified index
      this.files.splice(index, 1);
      this.filesNew.splice(index, 1);
      this.uploadProgress.splice(index, 1);
      
      // Add empty slots at the end to maintain array length
      this.files.push(null);
      this.filesNew.push(null);
      this.uploadProgress.push(0);
    
      // Adjust visibility for each upload slot
      this.catalogFileVisible = this.files.map((file, i) => file !== null || i === 0 || this.files[i - 1] !== null);
    }
    


  
// ============================================FILES PROCESS ENDING=====================================================    

  updateform: any = {
    username :null,
    categoryId :null,
    categoryName:null,
    sellerStoreName:null,
    catalogName:null,
    catalogSubTitle:null,
    catalogFrontFile:null,
    catalogThumbnail:null,
    file_1:null,
    file_2:null,
    file_3:null,
    file_4:null,
    catalogStatus:null,
    gst:null,
    hsnCode:null,
    size:null,
    weight:null,
    styleCode:null,
    netQuantity:null,
    catalogLength:null,
    catalogBreath:null,
    catalogHeight:null,
    material:null,
    catalogType:null,
    catalogClr:"Red", 
    manufactureDetails:null,
    packerDetails:null,
    tags:null,
    description:null,
    sku:null,
    identifier:null,
    searchKey:null,
    sellActualPrice:null,
    defectiveReturnPrice:null,
    mrp:null,
    inventory:null
  };

  parentList = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    // Add more categories as needed
  ];


  hsnCodeList:any="";
  sizeList:any="";
  netQuantityList:any="";
  materialList:any="";
  catalogTypeList:any="";

  getCatalogMasters(){
    this.spinner.show();
    ///save Catalog Form Data
    this.catalogService.getCatalogMasters().subscribe(
      {
          next:(res:any)=> {
          console.log(res);

          //Hsn List
          this.hsnCodeList = res.data.hsn;
          
          //Size List  
          this.sizeList = res.data.catalogSize;

          //Size List  
          this.netQuantityList = res.data.netQuantityList;

          //Material List  
          this.materialList = res.data.materialList;

          //Material List  
          this.catalogTypeList = res.data.typeList;

          this.spinner.hide();
        },
        error:(err:any)=>  {
          console.log(err)
          this.spinner.hide();
          this.toast.error({detail:"Error",summary:"Error in fetching Masters", position:"bottomRight",duration:3000});
        }
      }
    );
  }



  isModalOpen = false;
  // Function to open the modal
  openModal() {
    this.isModalOpen = true;
  }

  // Function to close the modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Function to handle confirm action
  confirmAction() {

    this.saveCatalog();

  }


///Upload Files on Button Click All Files
saveCatalog() {

  //Show Spinner
  this.spinner.show();

  const formData = new FormData();

  // Upload First File Main Catalog Image
  formData.append(`files`, this.firstFile);
  formData.append(`indexes`, '00'); // Append the index of each file

  this.filesNew.forEach((file, index) => {
    if (file) {
      formData.append(`files`, file); // Append each file if it's selected
    }
  });

  const catalogData = JSON.stringify(this.updateform);

  // Add catalogData as JSON blob
  formData.append('catalogData', new Blob([catalogData], { type: 'application/json' }));

  // Wait for 3 seconds before calling the service
  setTimeout(() => {
    this.catalogService.saveCatalogService(catalogData, formData).subscribe({
      next: (response) => { 
        this.toast.success({ detail: "Success", summary: "Catalog Saved Success", position: "bottomRight", duration: 3000 });
        
        //close the Model
        this.closeModal();

        //Hide the Spinner
        this.spinner.hide();

        //redirect to Catalog
        this.router.navigateByUrl("/seller/dashboard/home/catalog")
      },
      error: (error) => {
        console.error('Failed | Catalog Not Saved ', error);
        this.spinner.hide();
      }
    });
  }, 3000); // 3000 milliseconds = 3 seconds

}


}
