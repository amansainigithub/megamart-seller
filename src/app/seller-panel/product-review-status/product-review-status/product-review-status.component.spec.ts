import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewStatusComponent } from './product-review-status.component';

describe('ProductReviewStatusComponent', () => {
  let component: ProductReviewStatusComponent;
  let fixture: ComponentFixture<ProductReviewStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductReviewStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductReviewStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
