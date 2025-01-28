import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  health: () => `/actuator/health`,
};

@Injectable({
  providedIn: 'root',
})
export class HealthService {
  constructor(private httpClient: HttpClient) {}

  getHealthStatus(): Observable<string> {
    return this.httpClient.get(routes.health()).pipe(
      map((body: any) => body.status),
      catchError(() =>
        of(
          'Error, API is down. Please, check that the service is up, check CORS configuratons and check API backend URL.'
        )
      )
    );
  }
}
