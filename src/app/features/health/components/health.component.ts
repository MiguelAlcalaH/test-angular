import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { HealthService } from '../services/health.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss'],
})
export class HealthComponent implements OnInit {
  health: string | undefined;
  isLoading = false;
  apiBackendUrl = environment.apiBackendUrl;

  constructor(private healthService: HealthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.healthService
      .getHealthStatus()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((health: string) => {
        this.health = health;
      });
  }
}
