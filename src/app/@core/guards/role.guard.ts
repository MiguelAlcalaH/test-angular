import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard {
  constructor(private msalGuard: MsalGuard, private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles = this.authService.getRoles();
    const requiredRoles = route.data['roles'] as string[];

    // Check if the user has the required role
    for (var requiredRole of requiredRoles) {
      if (roles.some((role) => role === requiredRole)) {
        return true;
      }
    }
    // No permissions, redirect to home. You can redirect to an error page as well.
    this.router.navigate(['/']);
    return false;
  }
}
