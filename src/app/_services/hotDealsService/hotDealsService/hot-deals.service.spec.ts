import { TestBed } from '@angular/core/testing';

import { HotDealsService } from './hot-deals.service';

describe('HotDealsService', () => {
  let service: HotDealsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotDealsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
