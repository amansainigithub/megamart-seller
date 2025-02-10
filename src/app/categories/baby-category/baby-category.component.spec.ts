import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyCategoryComponent } from './baby-category.component';

describe('BabyCategoryComponent', () => {
  let component: BabyCategoryComponent;
  let fixture: ComponentFixture<BabyCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BabyCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BabyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
