import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductVariantComponent } from './single-product-variant.component';

describe('SingleProductVariantComponent', () => {
  let component: SingleProductVariantComponent;
  let fixture: ComponentFixture<SingleProductVariantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleProductVariantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleProductVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
