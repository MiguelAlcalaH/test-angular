import { TestBed } from '@angular/core/testing';
import { MsalService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionType, RedirectRequest } from '@azure/msal-browser';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let msalServiceSpy: jasmine.SpyObj<MsalService>;
  const msalGuardConfigMock: MsalGuardConfiguration = {
    interactionType: InteractionType.Redirect,
  };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MsalService', ['loginRedirect', 'logoutRedirect'], {
      instance: jasmine.createSpyObj('PublicClientApplication', ['getAllAccounts']),
    });

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: MsalService, useValue: spy },
        { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigMock },
      ],
    });

    authService = TestBed.inject(AuthService);
    msalServiceSpy = TestBed.inject(MsalService) as jasmine.SpyObj<MsalService>;
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should redirect to login page', () => {
    const authRequest = { scopes: ['openid', 'profile'] } as RedirectRequest;
    msalGuardConfigMock.authRequest = authRequest;
    authService.login();
    expect(msalServiceSpy.loginRedirect).toHaveBeenCalledWith(authRequest);
  });

  it('should redirect to logout page', () => {
    authService.logout();
    expect(msalServiceSpy.logoutRedirect).toHaveBeenCalledWith({ postLogoutRedirectUri: '/' });
  });

  it('should return false when not authenticated', () => {
    const getAllAccountsSpy = jasmine.createSpy('getAllAccounts').and.returnValue([]);
    msalServiceSpy.instance.getAllAccounts = getAllAccountsSpy;
    expect(authService.isAuthenticated()).toBe(false);
  });

  it('should return true when authenticated', () => {
    const getAllAccountsSpy = jasmine.createSpy('getAllAccounts').and.returnValue([{ accountIdentifier: '123' }]);
    msalServiceSpy.instance.getAllAccounts = getAllAccountsSpy;
    expect(authService.isAuthenticated()).toBe(true);
  });

  it('should return empty array when not authenticated', () => {
    const getAllAccountsSpy = jasmine.createSpy('getAllAccounts').and.returnValue([]);
    msalServiceSpy.instance.getAllAccounts = getAllAccountsSpy;
    expect(authService.getRoles()).toEqual([]);
  });

  it('should return user roles from ID token claims', () => {
    const idTokenClaims = { roles: ['Admin', 'User'] };
    const getAllAccountsSpy = jasmine.createSpy('getAllAccounts').and.returnValue([{ idTokenClaims }]);
    msalServiceSpy.instance.getAllAccounts = getAllAccountsSpy;
    expect(authService.getRoles()).toEqual(['Admin', 'User']);
  });

  it('should return true when user has Admin role', () => {
    spyOn(authService, 'getRoles').and.returnValue(['Admin']);
    expect(authService.isAdmin()).toBe(true);
  });

  it('should return false when user does not have Admin role', () => {
    spyOn(authService, 'getRoles').and.returnValue(['User']);
    expect(authService.isAdmin()).toBe(false);
  });
});
