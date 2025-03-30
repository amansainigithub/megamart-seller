import { TestBed } from '@angular/core/testing';

import { DeliveryStatusService } from './delivery-status.service';

describe('DeliveryStatusService', () => {
  let service: DeliveryStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
