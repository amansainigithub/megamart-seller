import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductSliceComponent } from './single-product-slice.component';

describe('SingleProductSliceComponent', () => {
  let component: SingleProductSliceComponent;
  let fixture: ComponentFixture<SingleProductSliceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleProductSliceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleProductSliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
