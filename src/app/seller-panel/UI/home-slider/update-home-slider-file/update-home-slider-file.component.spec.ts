import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHomeSliderFileComponent } from './update-home-slider-file.component';

describe('UpdateHomeSliderFileComponent', () => {
  let component: UpdateHomeSliderFileComponent;
  let fixture: ComponentFixture<UpdateHomeSliderFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateHomeSliderFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateHomeSliderFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
