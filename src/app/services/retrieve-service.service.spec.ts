/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RetrieveServiceService } from './retrieve-service.service';

describe('Service: RetrieveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RetrieveServiceService]
    });
  });

  it('should ...', inject([RetrieveServiceService], (service: RetrieveServiceService) => {
    expect(service).toBeTruthy();
  }));
});
