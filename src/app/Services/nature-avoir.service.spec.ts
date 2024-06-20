import { TestBed } from '@angular/core/testing';

import { NatureAvoirService } from './nature-avoir.service';

describe('NatureAvoirService', () => {
  let service: NatureAvoirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NatureAvoirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
