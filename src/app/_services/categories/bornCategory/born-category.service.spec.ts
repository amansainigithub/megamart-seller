import { TestBed } from '@angular/core/testing';

import { BornCategoryService } from './born-category.service';

describe('BornCategoryService', () => {
  let service: BornCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BornCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
