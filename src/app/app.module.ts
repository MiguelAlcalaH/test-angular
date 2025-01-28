import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RouteReusableStrategy, ApiPrefixInterceptor, ErrorHandlerInterceptor, CoreModule } from '@core';
import { HomeModule } from './features/home/home.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Logger } from '@core/services/logger.service';
import { environment } from '../environments/environment';
import { PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
import {
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
  MsalModule,
  MsalService,
  MsalRedirectComponent,
} from '@azure/msal-angular';
import { RoleGuard } from './@core/guards/role.guard';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
const log = new Logger('Angular Quickstart');

// Logger callback
export function loggerCallback(logLevel: LogLevel, message: string) {
  log.debug(message);
}

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent, MsalRedirectComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    HomeModule,
    AppRoutingModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        // MSAL Configuration
        auth: {
          clientId: environment.msalApplicationId,
          authority: environment.msalAuthority,
          redirectUri: environment.msalRedirectUri,
        },
        cache: {
          cacheLocation: BrowserCacheLocation.LocalStorage,
          storeAuthStateInCookie: isIE, // set to true for IE 11
        },
        system: {
          loggerOptions: {
            loggerCallback,
            logLevel: LogLevel.Info,
            piiLoggingEnabled: false,
          },
        },
      }),
      {
        interactionType: InteractionType.Redirect, // MSAL Guard Configuration
      },
      {
        // The MsalInterceptor will obtain tokens and add them to all our Http requests in API calls
        // based on the protectedResourceMap. In this example is used for Microsoft Graph API and Application API Backend (API Edge)
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          [environment.msalGraphURL, ['user.read']],
          [environment.apiBackendUrl, ['api://' + environment.msalApplicationId + '/backend.api']],
        ]),
      }
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    MsalService,
    MsalGuard,
    RoleGuard,
    MsalBroadcastService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
