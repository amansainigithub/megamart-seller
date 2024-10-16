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
    this.catalogService.getParentCategoryService().subscribe(res => {
      this.parentList = res.data;
    },
        err=>{
        console.log(err);
  })
  }



  parentCategory() {
    this.catalogService.getParentCategoryService().subscribe(res => {
      this.parentList = res.data;
    },
        err=>{
        console.log(err);
  })
    }

}
