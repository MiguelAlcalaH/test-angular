import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { HealthService } from './health.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HealthService', () => {
  let healthService: HealthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [HealthService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
    });

    healthService = TestBed.inject(HealthService);
    httpMock = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getHealthStatus', () => {
    it('should return a health', () => {
      // Arrange
      const mockHealth = { status: 'UP' };

      // Act
      const healthStatusSubscription = healthService.getHealthStatus();

      // Assert
      healthStatusSubscription.subscribe((status: string) => {
        expect(status).toEqual(mockHealth.status);
      });
      httpMock.expectOne({}).flush(mockHealth);
    });

    it('should return a string in case of error', () => {
      // Act
      const healthStatusSubscription = healthService.getHealthStatus();

      // Assert
      healthStatusSubscription.subscribe((status: string) => {
        expect(typeof status).toEqual('string');
        expect(status).toContain('Error');
      });
      httpMock.expectOne({}).flush(null, {
        status: 500,
        statusText: 'error',
      });
    });
  });
});
