import { TestBed } from '@angular/core/testing';

import { NetQuantityService } from './net-quantity.service';

describe('NetQuantityService', () => {
  let service: NetQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetQuantityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
