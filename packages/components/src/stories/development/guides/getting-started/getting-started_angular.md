## Prerequisite

If you do not have an Angular app yet create one with the [Angular CLI](https://angular.io/guide/setup-local).

> **Recommendations**
>
> - We recommend to use **SCSS** as stylesheet format.
> - We recommend to use the package [@ngx-translate](https://github.com/ngx-translate/core) for the translations.
> - We recommend to install our [utility libraries](https://github.com/baloise/web-app-utils) for validations and pipes.

### Setting up Zone.js

To improve the performance of the web components we need to configure zone.js.

> Check out the official Angular Documentation to [Setting up Zone.js](https://angular.io/guide/zone#setting-up-zonejs).

1. To make these changes, you need to create a **zone-flags.ts** file, such as the following.

```javascript
// disable patching requestAnimationFrame
(window as any).__Zone_disable_requestAnimationFrame = true;

// disable patching custom elements (our web components)
(window as any).__Zone_disable_customElements = true;

```

2. Next, import zone-flags before you import zone.js in the **polyfills.ts**:

```typescript
/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import './zone-flags'
import 'zone.js' // Included with Angular CLI.
```

3. In the `angular.json` file at the path `projects.architect.build.options.polyfills` change value to `["src/polyfills.ts"]`.
4. List the `src/polyfills.ts` as a file in the `tsconfig.app.json`.

## Installation

This section describes how to setup the Baloise Design System with an basic Angular applications.

### Install Design System

Lets install the latest Angular components.

```
npm install @baloise/design-system-components-angular

```

> **TIP**
>
> - The font, tokens, css and component package are included.
> - It could be that inside the docker container the `postinstall` gets not executed. Therefore, use `npm run ci --unsafe-perm` to execute postinstall after the install script.

### Import Styles

To include the necessary CSS in a project, add the following to the root App component or a global stylesheet.

```scss
// SASS mixins and variables
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
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    // Enables the usage of ngModel on form components
    FormsModule,
    ReactiveFormsModule,
    // Add all components to you application
    BaloiseDesignSystemModule.forRoot(),
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

## Start the app

Now everything is ready to be used. Add some Baloise components and start the app with:

```
npm start
```

> **TIP** Your app gets served under [http://localhost:4200](http://localhost:4200).

## Provide the assets

The Design System provides custom fonts and favicons.

To add them to your application follow those guides:

- [Font Installation](../?path=/docs/foundation-typography-development--heading-and-display#installation)
- [Favicons Installation](../?path=/docs/foundation-brand-assets-development--logo#favicons)
