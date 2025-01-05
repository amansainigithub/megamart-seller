import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUnderReviewComponent } from './product-under-review.component';

describe('ProductUnderReviewComponent', () => {
  let component: ProductUnderReviewComponent;
  let fixture: ComponentFixture<ProductUnderReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductUnderReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductUnderReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
