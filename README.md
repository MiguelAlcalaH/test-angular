# Verisure Angular SPA Quickstart

This project was generated with [Verisure Code Generator](TBD)

Version: 1.3.0
Angular version: 14.2.0

# Getting started

1. Go to project folder and install dependencies:
 ```sh
 npm install
 ```

2. Launch development server, and open `localhost:4200` in your browser:
 ```sh
 npm start -> When i18n is disabled
 npm run start:es -> When i18n is enabled (spanish language)
 npm run start:en -> When i18n is enabled (english language)
 ```

# What's in the box

The Angular SPA quickstart includes a basic demonstration of the use of the framework adapted to the company's needs. Navigation between modules, path securization, data access services and asset management, according to Angular's recommendations.

Also includes a demonstration of how to use MSAL with a PKCE authorization code flow to login, logout and acquire an access token for a protected resource such as Microsoft Graph and API backend. In order to authenticate to this application you must have an application registered and properly configured in Verisure Microsoft Azure AD tenant. If this is not yet the case, you can use a default configuration, which connects to a test application in the development tenant "securitassp.onmicrosoft.com". The only requirement is to have a valid user on the development AD tenant.

This quickstart also includes role management from Azure AD. The "Settings" route is only accessible if the user is logged in and has the "Administrator" role for the application in Azure AD.

Quickstart implements MSAL authentication PKCE flow service directly, but you can create your own authentication service using MSAL.js 2.x. 

The app template is based on [HTML5](http://whatwg.org/html), [TypeScript](http://www.typescriptlang.org) and
[Sass](http://sass-lang.com). The translation files use the common [JSON](http://www.json.org) format.

# Angular Built-in i18n functionality

Angular manages translations at compile-time through the Angular i18n @angular/localize library.

This quickstart uses this approach documented in https://angular.io/guide/i18n-overview.

How to use:

1) Use of the "i18n" tag in HTML to mark literals or attributes to be translated. We can indicate an id, description and meaning for each one of them.
2) Execute "npm run extract:i18n" to generate default translation file in XLIFF format.
3) If you want to create internationalization files for other languages, you must copy the default translation file and replace the file name with unicode language ID. For example "messages.es.xlf" or "messages.es_ES.xlf" in the spanish language. In each translation unit we will include the tag with the translation "<target>Translation</target>" after the "source" tag.
4) At this point the application can be run locally to check the translation in a specific language by indicating the specific locale in the start command "npm run start:en". What it actually does is internally run the command "ng serve --proxy-config proxy.conf.js --configuration=en". It applies the language configuration defined in angular.json. In locale only one locale per build is allowed. So it becomes mandatory in local to start the application specifying a locale.

In Production distribution package all languages are included.

# Proxy in the development environment

To avoid problems during development, a proxy has been configured to allow http requests from the SPA to another domain:port avoiding CORS issues while working on the local server.
The proxy is configured in the file "proxy.cong.js" and the requests are filtered with the context "/dev-api" to the target that has been indicated in the Yeoman code generator as API Backend (by default "http:localhost:8080").

# Project structure

```
dist/                        Web app production build
docker/                      Application Dockerfile
docs/                        Project docs and coding guides
helm/                        Helm template for Kubernetes deployment
nginx/                       Reverse proxy configuration (Nginx)
src/                         Source files for the root-level application project.
|- app/                      Contains the component files in which your application logic and data are defined.
|  |- @core/                 Core module (singleton services and single-use components, guards, interceptors, mocks...)
|  |- @shared/               Shared module  (common components, directives and pipes)
|  |- app.component.*        App root component (shell)
|  |- app.module.ts          App root module definition
|  |- app-routing.module.ts  App routes
|  +- ...                    Additional modules and components
|- assets/                   Contains image and other asset files to be copied as-is when you build your application.
|- environments/             Contains build configuration options for particular target environments.
|- theme/                    App global scss variables and theme
|- index.html                The main HTML page that is served when someone visits your site.
|- main.scss                 Global style entry point
|- main.ts                   The main entry point for your application.
|- polyfills.ts              Provides polyfill scripts for browser support.
+- test.ts                   The main entry point for your unit tests, with some Angular-specific configuration
reports/                     Test and coverage reports
.browserslist                BrowsersList configuration file.
.editorconfig                Defines code editor config settings.
.eslintrc.json               Defines config settings for Eslint tool.
.gitignore                   Specifies intentionally untracked files that Git should ignore.
.stylelintrc                 Defines config for styles lint rules.
angular.json                 CLI configuration defaults for all projects in the workspace, including configuration options for build, serve, and test tools that the CLI uses.
karma.conf.js                Configuration for the karma test runner.
package.json                 Configures npm package dependencies that are available to all projects in the workspace.
package-lock.json            Provides version information for all packages installed into node_modules by the npm client.
proxy.conf.js                Backend proxy configuration
README.md                    Introductory documentation for the root app.
tsconfig.app.json            TypeScript configuration file. Code editors and TypeScript’s language server use this file to improve development experience. 
tsconfig.spec.json           TypeScript configuration spec file.
tslint.js                    Default TSLint configuration for projects in the workspace.
```

# Main tasks

Task automation is based on [NPM scripts](https://docs.npmjs.com/misc/scripts).

Task                            | Description
--------------------------------|--------------------------------------------------------------------------------------
`npm start`                     | Run development server on `http://localhost:4200/`
`npm run build [-- --configuration=production]` | Lint code and build web app for production (with [AOT](https://angular.io/guide/aot-compiler)) in `dist/` folder
`npm test`                      | Run unit tests via [Karma](https://karma-runner.github.io) in watch mode
`npm run test:ci`               | Lint code and run unit tests once for continuous integration
`npm run lint`                  | Lint code
`npm run prettier`              | Automatically format all `.ts`, `.js` & `.scss` files

When building the application, you can specify the target configuration using the additional flag
`--configuration <name>` (do not forget to prepend `--` to pass arguments to npm scripts).

The default build configuration is `prod`.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.
You should not use `ng serve` directly, as it does not use the backend proxy configuration by default.

## Code scaffolding

Run `npm run generate -- component <name>` to generate a new component. You can also use
`npm run generate -- directive|pipe|service|class|module`.

If you have installed [angular-cli](https://github.com/angular/angular-cli) globally with `npm install -g @angular/cli`,
you can also use the command `ng generate` directly.

## Additional tools

Tasks are mostly based on the `angular-cli` tool. Use `ng help` to get more help or go check out the
[Angular-CLI README](https://github.com/angular/angular-cli).

## Code formatting

All `.ts`, `.js` & `.scss` files in this project are formatted automatically using [Prettier](https://prettier.io),
and enforced via the `test:ci` script.

A pre-commit git hook has been configured on this project to automatically format staged files, using
(pretty-quick)[https://github.com/azz/pretty-quick], so you don't have to care for it.

You can also force code formatting by running the command `npm run prettier`.

#### Tools

Development, build and quality processes are based on [angular-cli](https://github.com/angular/angular-cli) and
[NPM scripts](https://docs.npmjs.com/misc/scripts), which includes:

- Optimized build and bundling process with [Webpack](https://webpack.github.io)
- [Development server](https://webpack.github.io/docs/webpack-dev-server.html) with backend proxy and live reload
- Cross-browser CSS with [autoprefixer](https://github.com/postcss/autoprefixer) and
  [browserslist](https://github.com/ai/browserslist)
- Asset revisioning for [better cache management](https://webpack.github.io/docs/long-term-caching.html)
- Unit tests using [Jasmine](http://jasmine.github.io) and [Karma](https://karma-runner.github.io)
- Static code analysis: [TSLint](https://github.com/palantir/tslint), [Codelyzer](https://github.com/mgechev/codelyzer),
  [Stylelint](http://stylelint.io) and [HTMLHint](http://htmlhint.com/)
- Automatic code formatting with [Prettier](https://prettier.io)

#### Libraries

- [Angular](https://angular.io)
- [Angular Material](https://material.angular.io)
- [Material Icons](https://material.io/icons/)
- [RxJS](http://reactivex.io/rxjs)
- [Moment.js](https://momentjs.com)
- [MSAL.js](https://github.com/AzureAD/microsoft-authentication-library-for-js) 

#### Coding guides

- [Angular](docs/coding-guides/angular.md)
- [TypeScript](docs/coding-guides/typescript.md)
- [Sass](docs/coding-guides/sass.md)
- [HTML](docs/coding-guides/html.md)
- [Unit tests](docs/coding-guides/unit-tests.md)
- [End-to-end tests](docs/coding-guides/e2e-tests.md)

#### Other documentation

- [Working behind a corporate proxy](docs/corporate-proxy.md)
- [Updating dependencies and tools](docs/updating.md)
- [Using a backend proxy for development](docs/backend-proxy.md)
- [Browser routing](docs/routing.md)

#### Vulnerabilities

The libraries imported into the project have been audited and no vulnerabilities have been reported.