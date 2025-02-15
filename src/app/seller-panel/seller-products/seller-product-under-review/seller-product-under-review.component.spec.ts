import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductUnderReviewComponent } from './seller-product-under-review.component';

describe('SellerProductUnderReviewComponent', () => {
  let component: SellerProductUnderReviewComponent;
  let fixture: ComponentFixture<SellerProductUnderReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerProductUnderReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerProductUnderReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
