import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDeliveryProcessComponent } from './order-delivery-process.component';

describe('OrderDeliveryProcessComponent', () => {
  let component: OrderDeliveryProcessComponent;
  let fixture: ComponentFixture<OrderDeliveryProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDeliveryProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderDeliveryProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
