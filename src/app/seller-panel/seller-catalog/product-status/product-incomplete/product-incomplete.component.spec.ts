import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIncompleteComponent } from './product-incomplete.component';

describe('ProductIncompleteComponent', () => {
  let component: ProductIncompleteComponent;
  let fixture: ComponentFixture<ProductIncompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductIncompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductIncompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
