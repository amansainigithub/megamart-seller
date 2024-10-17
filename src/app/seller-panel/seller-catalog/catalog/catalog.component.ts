import { Component } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';
import { UserService } from '../../../_services/user.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CatalogService } from '../../../_services/catalogService/catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {

  constructor(private authService: AuthService , 
    private UserService:UserService ,  
    private toast:NgToastService,
    private router: Router,
    private spinner: NgxSpinnerService ,
    private catalogService:CatalogService) { }

    ngOnInit(): void {
      this.getParentCategory();      
    }

  // Define the selected category and subcategory
  selectedSubcategory: string | null = null;

  // Function to select a subcategory
  selectSubcategory(subcategory: string) {
    this.selectedSubcategory = subcategory;
  }

  parentList:any;
  getParentCategory()
  {
    this.spinner.show();

    this.catalogService.getParentCategoryService().subscribe(res => {
      this.parentList = res.data;
      this.spinner.hide();
    },
        err=>{
        console.log(err);
        this.spinner.hide();
  })
  }


//Get Parent Id and Prent Id get to babay Category Data 
childList:any;
sendParentId(parentId:any) {
    this.spinner.show();

    this.catalogService.getChildCategoryService(parentId).subscribe(res => {
      this.childList = res.data;
      this.spinner.hide();
    },
        err=>{
        console.log(err);
        this.spinner.hide();
  })
}




//Get Parent Id and Prent Id get to babay Category Data 
babyList:any;
sendChildId(childId:any) {
    this.spinner.show();

    this.catalogService.getBabyCategoryService(childId).subscribe(res => {
      this.babyList = res.data;
      this.spinner.hide();
    },
    err=>{
        console.log(err);
        this.spinner.hide();
  })
}


//Get Parent Id and Prent Id get to babay Category Data 
bornList:any;
sendBabyId(babyId:any) {
    this.spinner.show();

    this.catalogService.getBornCategoryService(babyId).subscribe(res => {
      this.bornList = res.data;
      this.spinner.hide();
    },
    err=>{
        console.log(err);
        this.spinner.hide();
  })
}



//Last Category Selected
bornData:any;
getBornCategoryById(bornId:any)
{

        this.spinner.show();

        this.catalogService.getBornById(bornId).subscribe(res => {

          console.log(res);
          console.log(res.data);
          console.log(res.data.categoryFile);

          this.bornData = res.data;

          this.spinner.hide();
        },
        err=>{
            console.log(err);
            this.spinner.hide();
      })

}


}
