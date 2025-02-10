import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChildFileComponent } from './update-child-file.component';

describe('UpdateChildFileComponent', () => {
  let component: UpdateChildFileComponent;
  let fixture: ComponentFixture<UpdateChildFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateChildFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateChildFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
