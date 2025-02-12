import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNetQuantityComponent } from './product-net-quantity.component';

describe('ProductNetQuantityComponent', () => {
  let component: ProductNetQuantityComponent;
  let fixture: ComponentFixture<ProductNetQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductNetQuantityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductNetQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
