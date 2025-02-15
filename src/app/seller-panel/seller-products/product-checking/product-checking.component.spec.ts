import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCheckingComponent } from './product-checking.component';

describe('ProductCheckingComponent', () => {
  let component: ProductCheckingComponent;
  let fixture: ComponentFixture<ProductCheckingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCheckingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductCheckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
