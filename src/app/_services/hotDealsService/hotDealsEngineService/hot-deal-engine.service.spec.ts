import { TestBed } from '@angular/core/testing';

import { HotDealEngineService } from './hot-deal-engine.service';

describe('HotDealEngineService', () => {
  let service: HotDealEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotDealEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
