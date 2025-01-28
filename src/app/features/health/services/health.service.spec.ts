import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HealthService } from './health.service';

describe('HealthService', () => {
  let healthService: HealthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HealthService],
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
