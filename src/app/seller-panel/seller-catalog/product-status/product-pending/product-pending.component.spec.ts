import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPendingComponent } from './product-pending.component';

describe('ProductPendingComponent', () => {
  let component: ProductPendingComponent;
  let fixture: ComponentFixture<ProductPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductPendingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
