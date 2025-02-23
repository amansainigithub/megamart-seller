import { TestBed } from '@angular/core/testing';

import { BannerSliderService } from './banner-slider.service';

describe('BannerSliderService', () => {
  let service: BannerSliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannerSliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
