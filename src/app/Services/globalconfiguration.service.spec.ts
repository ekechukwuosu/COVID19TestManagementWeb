import { TestBed } from '@angular/core/testing';

import { GlobalconfigurationService } from './globalconfiguration.service';

describe('GlobalconfigurationService', () => {
  let service: GlobalconfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalconfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
