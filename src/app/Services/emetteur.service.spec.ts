import { TestBed } from '@angular/core/testing';

import { EmetteurService } from './emetteur.service';

describe('EmetteurService', () => {
  let service: EmetteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmetteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
