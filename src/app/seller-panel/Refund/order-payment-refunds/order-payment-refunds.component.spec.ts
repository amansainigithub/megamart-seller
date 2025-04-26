import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPaymentRefundsComponent } from './order-payment-refunds.component';

describe('OrderPaymentRefundsComponent', () => {
  let component: OrderPaymentRefundsComponent;
  let fixture: ComponentFixture<OrderPaymentRefundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderPaymentRefundsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderPaymentRefundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
