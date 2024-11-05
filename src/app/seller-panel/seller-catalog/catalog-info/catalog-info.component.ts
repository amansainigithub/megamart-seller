import { Component } from '@angular/core';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from '../../../_services/sharedService/shared-data.service';
import { SaveCatalogService } from '../../../_services/catalog/saveCatalogService/save-catalog.service';
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

  onFileSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.filesNew[index] = file; // Store the selected file at the specific index
    }

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

  }

  uploadFile(file: File, index: number) {
    // Simulate file upload
    const progressInterval = setInterval(() => {
      this.uploadProgress[index] += 100;
      if (this.uploadProgress[index] >= 100) {
        clearInterval(progressInterval);
      }
    }, 100); // Simulating upload progress
  }

  removeFile(index: number) {
    this.files[index] = null;
    this.uploadProgress[index] = 0;
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



   ///Upload Files on Button Click All Files
  uploadAllFiles() {

     const formData = new FormData();

     //Upload First File Main Catalog Image
     formData.append(`files`,this.firstFile);
     formData.append(`indexes`, '00'); // Append the index of each file

    this.filesNew.forEach((file, index) => {
      if (file) {
        formData.append(`files`, file); // Append each file if it's selected
        formData.append(`indexes`, String(index)); // Append the index of each file
      }
    });

   

    const catalogData =  JSON.stringify(this.updateform);

    console.log(catalogData);

    this.http.post(API_AUTHORIZA_URL + 'sellerCatalogController/uploadMultiFiles/'+100 +"/"+"index"+"/"+catalogData
      , formData).subscribe({
      next: (response) => console.log('Files uploaded successfully', response),
      error: (error) => console.error('Error uploading files', error),
    });
  }


  // saveCatalog(){
  //   console.log("********************************")
  //   console.log(this.updateform);

  //   this.updateform.categoryId = this.receivedData.catalogId;

  //   this.catalogService.saveCatalogService(this.updateform).subscribe(
  //     {
  //         next:(res:any)=> {
  //           this.toast.success({detail:"Success",summary:"Product Saved Success", position:"topRight",duration:3000});
  //       },
  //       error:(err:any)=>  {
  //         console.log(err)
  //         this.spinner.hide();
  //         this.toast.error({detail:"Error",summary:"Failed to saved", position:"topRight",duration:3000});
  //       }
  //     }
  //   );
  // }








  items: string[] = ['Loveya', 'Manodhiruva', 'MansiyaOrange', 'Marselite'];
  searchTerm: string = '';
  selectedItem: string | null = null;
  dropdownOpen: boolean = false;

  get filteredItems() {
    return this.items.filter(item =>
      item.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectItem(item: string) {
    this.selectedItem = item;
    this.dropdownOpen = false;
    this.searchTerm = ''; // Clear search term after selection
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
    alert('Confirmed!');
    this.closeModal();
  }







}
