import { TestBed } from '@angular/core/testing';

import { BasService } from './bas.service';

describe('BasService', () => {
  let service: BasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
