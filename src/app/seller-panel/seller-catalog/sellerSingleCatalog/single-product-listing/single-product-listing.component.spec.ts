import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductListingComponent } from './single-product-listing.component';

describe('SingleProductListingComponent', () => {
  let component: SingleProductListingComponent;
  let fixture: ComponentFixture<SingleProductListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleProductListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleProductListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
