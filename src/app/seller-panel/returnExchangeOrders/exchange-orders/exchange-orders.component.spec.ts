import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeOrdersComponent } from './exchange-orders.component';

describe('ExchangeOrdersComponent', () => {
  let component: ExchangeOrdersComponent;
  let fixture: ComponentFixture<ExchangeOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExchangeOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExchangeOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
