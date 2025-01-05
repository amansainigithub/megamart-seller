import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductApprovedComponent } from './product-approved.component';

describe('ProductApprovedComponent', () => {
  let component: ProductApprovedComponent;
  let fixture: ComponentFixture<ProductApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductApprovedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
