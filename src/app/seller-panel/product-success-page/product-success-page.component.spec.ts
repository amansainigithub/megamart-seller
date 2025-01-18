import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSuccessPageComponent } from './product-success-page.component';

describe('ProductSuccessPageComponent', () => {
  let component: ProductSuccessPageComponent;
  let fixture: ComponentFixture<ProductSuccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductSuccessPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductSuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
