import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotDealsEngineComponent } from './hot-deals-engine.component';

describe('HotDealsEngineComponent', () => {
  let component: HotDealsEngineComponent;
  let fixture: ComponentFixture<HotDealsEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotDealsEngineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotDealsEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
