import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOneByOneComponent } from './order-one-by-one.component';

describe('OrderOneByOneComponent', () => {
  let component: OrderOneByOneComponent;
  let fixture: ComponentFixture<OrderOneByOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderOneByOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderOneByOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
