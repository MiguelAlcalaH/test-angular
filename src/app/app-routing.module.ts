import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/@core/services/shell.service';
import { MsalGuard } from '@azure/msal-angular';
import { RoleGuard } from './@core/guards/role.guard';

const routes: Routes = [
  Shell.childRoutes([
    {
      // Protected route with MSAL Guard
      path: 'profile',
      loadChildren: () => import('./features/profile/profile.module').then((m) => m.ProfileModule),
      canActivate: [MsalGuard],
    },
    {
      path: 'api-health',
      loadChildren: () => import('./features/health/health.module').then((m) => m.HealthModule),
      canActivate: [MsalGuard],
    },
    {
      path: 'settings',
      loadChildren: () => import('./features/settings/settings.module').then((m) => m.SettingsModule),
      canActivate: [MsalGuard, RoleGuard],
      data: { roles: ['Admin'] },
    },
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
