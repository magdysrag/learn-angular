import { TestBed } from '@angular/core/testing';

import { PromationAdsService } from './promation-ads.service';

describe('PromationAdsService', () => {
  let service: PromationAdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromationAdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
