import { Component, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Logger } from '@core/services/logger.service';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, EventMessage, EventType, RedirectRequest } from '@azure/msal-browser';
import { AuthService } from '@app/@core/services/auth.service';
const log = new Logger('Verisure Angular Quickstart - MSAL Auth');

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() sidenav!: MatSidenav;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private breakpoint: BreakpointObserver,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    // Check that no other interaction is in progress before invoking loginRedirect
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.isAdmin = this.authService.isAdmin();
        this.setLoginDisplay();
      });

    // MSAL broadcast allows us to receive MSAL events (like a login success event)
    // MSAL events: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/events.md
    this.msalBroadcastService.msalSubject$
      .pipe(filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS))
      .subscribe((result: EventMessage) => {
        log.debug(result);
        const payload = result.payload as AuthenticationResult;
        this.msalService.instance.setActiveAccount(payload.account);
        this.isAdmin = this.authService.isAdmin();
        this.setLoginDisplay();
      });

    this.isAdmin = this.authService.isAdmin();
    this.setLoginDisplay();
  }

  // Redirect the user to the login page.
  login() {
    this.authService.login();
  }

  // Redirect the user to the logout page.
  logout() {
    this.authService.logout();
  }

  // Login and logout button display
  setLoginDisplay() {
    this.loginDisplay = this.authService.isAuthenticated();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
