import { TestBed } from '@angular/core/testing';

import { AppngHttpClientModuleHttpClientModuleService } from './appng-http-client-module-http-client-module.service';

describe('AppngHttpClientModuleHttpClientModuleService', () => {
  let service: AppngHttpClientModuleHttpClientModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppngHttpClientModuleHttpClientModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
