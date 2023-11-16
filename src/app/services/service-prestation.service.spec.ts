import { TestBed } from '@angular/core/testing';

import { ServicePrestationService } from './service-prestation.service';

describe('ServicePrestationService', () => {
  let service: ServicePrestationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePrestationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
