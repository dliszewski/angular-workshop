import { TestBed } from '@angular/core/testing';

import { CustomerDataResolverService } from './customer-data-resolver.service';

describe('CustomerDataResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerDataResolverService = TestBed.get(CustomerDataResolverService);
    expect(service).toBeTruthy();
  });
});
