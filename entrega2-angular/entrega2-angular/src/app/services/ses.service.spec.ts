import { TestBed } from '@angular/core/testing';

import { SesService } from './ses.service';

describe('SesService', () => {
  let service: SesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
