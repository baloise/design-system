## Prerequisite

If you do not have an Angular app yet create one with the [Angular CLI](https://angular.io/guide/setup-local).

> **Recommendations**
>
> - We recommend to use **SCSS** as stylesheet format.
> - We recommend to use the package [@ngx-translate](https://github.com/ngx-translate/core) for the translations.
> - We recommend to install our [utility libraries](https://github.com/baloise/web-app-utils) for validations and pipes.

<!-- ### Deep import config

To use/ignore deep imports in an Angular applications create a file called `ngcc.config.js` in the root folder and add the following content.

```javascript
module.exports = {
  packages: {
    '@baloise/design-system-components-angular': {
      ignorableDeepImportMatchers: [/@baloise\//],
    },
  },
}
``` -->

### Setting up Zone.js

To improve the performance of the web components we need to configure zone.js.

To make these changes, you need to create a ´zone-flags.ts´ file, such as the following.

```javascript
// disable patching requestAnimationFrame
(window as any).__Zone_disable_requestAnimationFrame = true;

// disable patching custom elements (our web components)
(window as any).__Zone_disable_customElements = true;
```

Next, import zone-flags before you import zone.js in the ´polyfills.ts´:

```typescript
/***************************************************************************************************
 * Zone JS is required by default for Angular.
 */
import './zone-flags'
import 'zone.js' // Included with Angular CLI.
```

> **TIP**
>
> Check out the official Angular Documentation to [Setting up Zone.js](https://angular.io/guide/zone#setting-up-zonejs).

## Installation

This section describes how to setup the Baloise Design System with an basic Angular applications.

### Install Design System

Lets install the latest Angular components.

```
npm install @baloise/design-system-components-angular
```

> **TIP**
>
> - The font, tokens and component package are included.
> - It could be that inside the docker container the `postinstall` gets not executed. Therefore, use `npm run ci --unsafe-perm` to execute postinstall after the install script.

### Import Fonts

The font package is included in the `@baloise/design-system-components-angular` package.

Next step is to provide the fonts to our web application.
To do so we recommend the tool copyfiles to copy the font files into your assets folder.

```
npm install copyfiles --save-dev
```

After installing our copyfiles dependency we need to define the copy command in our **package.json** file.
Add a new script called **copy:fonts** and adjust the second path to your application.

```json
"scripts": {
  "postinstall": "npm run copy:fonts",
  "copy:fonts": "copyfiles --flat node_modules/@baloise/design-system-fonts/lib/* src/assets/fonts"
}
```

To copy the fonts run the following command.

```
npm run copy:fonts
```

> **TIP**
>
> - Add the generated files to the `.gitignore` file.

### Import Styles

To include the necessary CSS in a project, add the following to the root App component or a global stylesheet.

```scss
// change variable before the import
$font-path: '~assets/fonts';

// SASS mixins and variables (optional)
@import '@baloise/design-system-css/sass/mixins';

// Resets CSS for all browser
@import '@baloise/design-system-css/css/normalize';
@import '@baloise/design-system-css/css/structure';

// Custom font faces
@import '@baloise/design-system-css/sass/font';

// Core CSS, always required
@import '@baloise/design-system-css/css/core';

// Deprecated styles will be removed with the next breaking version (optional)
@import '@baloise/design-system-css/sass/legacy';

// CSS utilities classes (optional)
@import '@baloise/design-system-css/css/border';
@import '@baloise/design-system-css/css/color';
@import '@baloise/design-system-css/css/display';
@import '@baloise/design-system-css/css/flex';
@import '@baloise/design-system-css/css/grid';
@import '@baloise/design-system-css/css/opacity';
@import '@baloise/design-system-css/css/radius';
@import '@baloise/design-system-css/css/shadow';
@import '@baloise/design-system-css/css/spacing';
@import '@baloise/design-system-css/css/typography';
```

> **TIP**
>
> - The CSS Framework provides CSS files and SASS files, just change the root folder `/css/` to `/sass/`.
> - Import `@baloise/design-system-css/sass/baloise-design-system` to use the whole CSS Framework.
> - Use `@import '@baloise/design-system-css/sass/mixins';` in the component stylesheets to use our provided SASS mixins.

### Import the ngModule

Import the `BalCoreModule.forRoot()` and add it to your angular root module. To use the custom web components add the schema `CUSTOM_ELEMENTS_SCHEMA` to your root angular module.
Import each angular module of the components you need one by one.

**app.module.ts**

```typescript
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import {
  BalCoreModule,
  BalButtonModule,
  BalHeadingModule,
  BalFooterModule,
} from '@baloise/design-system-components-angular'

import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    // Enables the usage of ngModel on form components
    FormsModule,
    ReactiveFormsModule,
    // Enables the Design System globally for your application
    BalCoreModule.forRoot(),
    // Import the Design System components
    BalButtonModule,
    BalHeadingModule,
    BalFooterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  // To enable the usage of Web Components inside the Angular templates.
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

> **Internationalization**
>
> To run the Design System in a different region then `CH` or to change the language to `fr` follow this [documentation](https://baloise-design-system.vercel.app/?path=/docs/development-guides-internationalization--page).

### HTML Structure

Add the `bal-app` to your `app.component.html` root element. Within this component we are able to use the defined css classes.

```html
<bal-app class="has-sticky-footer">
  <header>
    <!-- Header content -->
  </header>
  <main class="container">
    <!-- Your application content -->
    <bal-heading>Hello World!</bal-heading>
    <bal-button>Button</bal-button>
  </main>
  <bal-footer>
    <!-- Footer content -->
  </bal-footer>
</bal-app>
```

<!-- ### Improve initial page load

The browser needs some time to load the web-components, because of that when the page is loaded we see some unfinished layout.
To avoid that set the below style tag into your head of the `index.html`. This will hide the app content until the web-components are ready.

```html
<style>
  .bal-body {
    visibility: hidden;
  }
</style>
```

Next set the class `.bal-body` to your app container. In the most cases it is the body element of your `index.html`. -->

## Start the app

Now everything is ready to be used. Add some Baloise components and start the app with:

```
npm start
```

> **TIP**
>
> Your app gets served under [http://localhost:4200](http://localhost:4200).
