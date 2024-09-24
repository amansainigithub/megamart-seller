import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDataFormComponent } from './seller-data-form.component';

describe('SellerDataFormComponent', () => {
  let component: SellerDataFormComponent;
  let fixture: ComponentFixture<SellerDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerDataFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
