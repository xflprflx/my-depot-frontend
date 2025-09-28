import { TestBed } from '@angular/core/testing';

import { LogoutFacadeService } from './logout-facade.service';

describe('LogoutFacadeService', () => {
  let service: LogoutFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogoutFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
