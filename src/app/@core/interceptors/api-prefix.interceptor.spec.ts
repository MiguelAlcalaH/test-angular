import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { ApiPrefixInterceptor } from './api-prefix.interceptor';

describe('ApiPrefixInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiPrefixInterceptor,
          multi: true,
        },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should prepend environment.apiBackendUrl to the request url', () => {
    // Act
    http.get('/test').subscribe();

    // Assert
    httpMock.expectOne({ url: environment.apiBackendUrl + '/test' });
  });

  it('should not prepend environment.apiBackendUrl to request url', () => {
    // Act
    http.get('hTtPs://domain.com/test').subscribe();

    // Assert
    httpMock.expectOne({ url: 'hTtPs://domain.com/test' });
  });
});
