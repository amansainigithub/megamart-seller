import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPaymentRefundCompleteComponent } from './order-payment-refund-complete.component';

describe('OrderPaymentRefundCompleteComponent', () => {
  let component: OrderPaymentRefundCompleteComponent;
  let fixture: ComponentFixture<OrderPaymentRefundCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderPaymentRefundCompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderPaymentRefundCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
