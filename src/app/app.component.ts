import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { environment } from '@env/environment';
import { Logger, UntilDestroy } from '@core';

const log = new Logger('Angular Quickstart');

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {}

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('Init Angular SPA Quickstart.');
  }

  ngOnDestroy() {}
}
