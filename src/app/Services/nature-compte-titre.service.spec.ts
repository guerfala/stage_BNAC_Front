import { TestBed } from '@angular/core/testing';

import { NatureCompteTitreService } from './nature-compte-titre.service';

describe('NatureCompteTitreService', () => {
  let service: NatureCompteTitreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NatureCompteTitreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
