import { TestBed } from '@angular/core/testing';

import { OutOfStockService } from './out-of-stock.service';

describe('OutOfStockService', () => {
  let service: OutOfStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutOfStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
