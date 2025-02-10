import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBornFileComponent } from './update-born-file.component';

describe('UpdateBornFileComponent', () => {
  let component: UpdateBornFileComponent;
  let fixture: ComponentFixture<UpdateBornFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateBornFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateBornFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
