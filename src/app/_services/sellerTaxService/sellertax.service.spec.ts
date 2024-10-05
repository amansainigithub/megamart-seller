import { TestBed } from '@angular/core/testing';

import { SellertaxService } from './sellertax.service';

describe('SellertaxService', () => {
  let service: SellertaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellertaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
