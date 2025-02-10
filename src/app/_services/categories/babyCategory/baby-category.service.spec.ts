import { TestBed } from '@angular/core/testing';

import { BabyCategoryService } from './baby-category.service';

describe('BabyCategoryService', () => {
  let service: BabyCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BabyCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
