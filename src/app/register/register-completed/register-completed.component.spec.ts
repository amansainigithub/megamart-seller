import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCompletedComponent } from './register-completed.component';

describe('RegisterCompletedComponent', () => {
  let component: RegisterCompletedComponent;
  let fixture: ComponentFixture<RegisterCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterCompletedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
