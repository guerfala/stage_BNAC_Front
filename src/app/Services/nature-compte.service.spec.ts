import { TestBed } from '@angular/core/testing';

import { NatureCompteService } from './nature-compte.service';

describe('NatureCompteService', () => {
  let service: NatureCompteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NatureCompteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
