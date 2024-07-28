import { TestBed } from '@angular/core/testing';

import { AssembleeService } from './assemblee.service';

describe('AssembleeService', () => {
  let service: AssembleeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssembleeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
