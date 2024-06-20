import { TestBed } from '@angular/core/testing';

import { TeneurCompteService } from './teneur-compte.service';

describe('TeneurCompteService', () => {
  let service: TeneurCompteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeneurCompteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
