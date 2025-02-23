import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHotDealFileComponent } from './update-hot-deal-file.component';

describe('UpdateHotDealFileComponent', () => {
  let component: UpdateHotDealFileComponent;
  let fixture: ComponentFixture<UpdateHotDealFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateHotDealFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateHotDealFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
