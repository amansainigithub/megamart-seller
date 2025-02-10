import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BornCategoryComponent } from './born-category.component';

describe('BornCategoryComponent', () => {
  let component: BornCategoryComponent;
  let fixture: ComponentFixture<BornCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BornCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BornCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
