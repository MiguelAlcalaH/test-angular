import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoleGuard } from './role.guard';
import { MsalGuard } from '@azure/msal-angular';
import { AuthService } from '../services/auth.service';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let msalGuard: jasmine.SpyObj<MsalGuard>;
  let router: any;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getRoles']);
    const msalSpy = jasmine.createSpyObj('MsalGuard', ['canActivate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [RoleGuard, { provide: AuthService, useValue: authSpy }, { provide: MsalGuard, useValue: msalSpy }],
    });
    guard = TestBed.inject(RoleGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    msalGuard = TestBed.inject(MsalGuard) as jasmine.SpyObj<MsalGuard>;
    router = {
      navigate: jasmine.createSpy('navigate'),
    };
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow users with the correct role', () => {
    authService.getRoles.and.returnValue(['Admin']);
    const mockActivatedRouteSnapshot = {
      data: { roles: ['Admin'] },
    } as any;
    const mockRouterStateSnapshot = {} as any;

    const result = guard.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot);

    expect(result).toBeTrue();
  });

  it('should not allow users without the correct role', () => {
    authService.getRoles.and.returnValue(['User']);
    const mockActivatedRouteSnapshot = {
      data: { roles: ['Admin'] },
    } as any;
    const mockRouterStateSnapshot = {} as any;

    const result = guard.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot);

    expect(result).toBeFalse();
  });
});
