// `.env.ts` is generated by the `npm run env` command
// `npm run env` exposes environment variables as JSON for any usage you might
// want, like displaying the version or getting extra config from your CI bot, etc.
// This is useful for granularity you might need beyond just the environment.
// Note that as usual, any environment variables you expose through it will end up in your
// bundle, and you should not use it for any sensitive information like passwords or keys.

/* MSAL properties
   These proerties are read from the environment variables created in the Helm charts.
   For local development, the properties are created in /assets/env.js
*/

export const environment = {
  production: true,
  version: '1.2.0',
  msalApplicationId: window['env']['MSAL_APPLICATION_ID'],
  msalRedirectUri: window['env']['MSAL_REDIRECT_URI'],
  msalAuthority: window['env']['MSAL_AUTHORITY'],
  msalGraphURL: 'https://graph.microsoft.com/v1.0/me',
  apiBackendUrl: window['env']['API_BACKEND_URL'],
};
