import { TestBed } from '@angular/core/testing';

import { ParentCategoryService } from './parent-category.service';

describe('ParentCategoryService', () => {
  let service: ParentCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
