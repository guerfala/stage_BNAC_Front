import { TestBed } from '@angular/core/testing';

import { TypeAssembleeService } from './type-assemblee.service';

describe('TypeAssembleeService', () => {
  let service: TypeAssembleeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeAssembleeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
