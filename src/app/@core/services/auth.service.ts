import { Injectable, Inject } from '@angular/core';
import { MsalService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { RedirectRequest } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private msalService: MsalService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration
  ) {}

  // Redirect the user to the login page.
  login(): void {
    const authRequest = this.msalGuardConfig.authRequest as RedirectRequest;
    this.msalService.loginRedirect(authRequest);
  }

  // Redirect the user to the logout page.
  logout(): void {
    this.msalService.logoutRedirect({ postLogoutRedirectUri: '/' });
  }

  // Check if the user is authenticated.
  isAuthenticated(): boolean {
    return this.msalService.instance.getAllAccounts().length > 0;
  }

  // Get the user's roles from the ID token claims.
  getRoles(): string[] {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length === 0) {
      return [];
    }
    const claims = accounts[0].idTokenClaims as { [key: string]: any };
    const roles = claims['roles'] as string[];
    return roles || [];
  }

  // Check if the user has the 'Admin' role.
  isAdmin(): boolean {
    const roles = this.getRoles();
    return roles.some((role) => role === 'Admin');
  }
}
