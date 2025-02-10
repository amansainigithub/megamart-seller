import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBabyFileComponent } from './update-baby-file.component';

describe('UpdateBabyFileComponent', () => {
  let component: UpdateBabyFileComponent;
  let fixture: ComponentFixture<UpdateBabyFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateBabyFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateBabyFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
