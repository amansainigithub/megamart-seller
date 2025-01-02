import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVariantCompleteComponent } from './product-variant-complete.component';

describe('ProductVariantCompleteComponent', () => {
  let component: ProductVariantCompleteComponent;
  let fixture: ComponentFixture<ProductVariantCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductVariantCompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductVariantCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
