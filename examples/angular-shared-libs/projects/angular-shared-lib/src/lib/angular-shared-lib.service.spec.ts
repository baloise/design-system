import { TestBed } from '@angular/core/testing';

import { AngularSharedLibService } from './angular-shared-lib.service';

describe('AngularSharedLibService', () => {
  let service: AngularSharedLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularSharedLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
