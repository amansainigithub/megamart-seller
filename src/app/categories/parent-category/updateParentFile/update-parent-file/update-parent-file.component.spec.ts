import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateParentFileComponent } from './update-parent-file.component';

describe('UpdateParentFileComponent', () => {
  let component: UpdateParentFileComponent;
  let fixture: ComponentFixture<UpdateParentFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateParentFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateParentFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
