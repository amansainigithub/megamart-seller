import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNextFormComponent } from './register-next-form.component';

describe('RegisterNextFormComponent', () => {
  let component: RegisterNextFormComponent;
  let fixture: ComponentFixture<RegisterNextFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterNextFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterNextFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
