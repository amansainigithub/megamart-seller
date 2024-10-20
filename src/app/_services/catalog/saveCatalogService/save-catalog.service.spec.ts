import { TestBed } from '@angular/core/testing';

import { SaveCatalogService } from './save-catalog.service';

describe('SaveCatalogService', () => {
  let service: SaveCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
