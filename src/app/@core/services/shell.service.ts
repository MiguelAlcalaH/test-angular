import { Routes, Route } from '@angular/router';
import { HeaderComponent } from '@app/@core/components/header/header.component';

/**
 * Provides helper methods to create routes.
 */
export class Shell {
  /**
   * Creates routes using the header component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: HeaderComponent,
      children: routes,
      canActivate: [],
    };
  }
}
