<bal-doc-lead>
This section describes how to setup the Baloise Design System with an basic Angular applications.
</bal-doc-lead>

## Prerequisite Angular

If you do not have an Angular app yet create one with the [Angular CLI](https://angular.io/guide/setup-local).

Before we can add the Baloise Design System to your angular application we need to setup the basics.

> **Recommendations**
>
> - We recommend to install our [utility libraries](https://github.com/baloise/web-app-utils) for validations and pipes.
> - We recommend to use the package [@ngx-translate](https://github.com/ngx-translate/core) for the translations.

### Deep import config

To use/ignore deep imports in an Angular applications create a file called `ngcc.config.js` in the root folder and add the following content.

```javascript
module.exports = {
  packages: {
    '@baloise/design-system-components-angular': {
      ignorableDeepImportMatchers: [/@baloise\//],
    },
  },
}
```

## Install fonts

The font package is included in the @baloise/design-system-components package and also in the proxy libraries.

Next step is to provide the fonts to our web application. To do so we recommend the tool copyfiles (opens new window) to copy the font files into your asset folder.

```
npm install copyfiles --save-dev
```

After installing our copyfiles dependency we need to define the copy command in our package.json file. Add a new script called copy:fonts and adjust the second path to your application.

```json
"scripts": {
  "postinstall": "npm run copy:fonts",
  "copy:fonts": "copyfiles --flat node_modules/@baloise/design-system-fonts/lib/* src/assets/fonts"
}
```

To copy the fonts run the following command.

```bash
npm run copy:fonts
```

> **TIP**
>
> - Add the generated files to the `.gitignore` file.
> - It could be that inside the docker container the `postinstall` gets not executed. Therefore, use `npm run ci --unsafe-perm` to execute postinstall after the install script.

## Import styles

Import the `global.sass` Sass file into the main `.sass` file of your application.

```scss
// change variable before the import
$font-path: '~assets/fonts';

@import '@baloise/design-system-components/src/styles/global';

// add custom styles below
```

## Import the ngModule

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

> **Internationalization** To run the Design System in a different region then `CH` or to change the language to `fr` follow the documentation of [internationalization](https://baloise-design-system.vercel.app/?path=/docs/development-guides-internationalization--page).

## HTML Structure

Add the `bal-app` to your `app.component.html` root element. Within this component we are able to use the defined css classes.

```html
...
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
...
```

## Improve initial page load

The browser needs some time to load the web-components, because of that when the page is loaded we see some unfinished layout.
To avoid that set the below style tag into your head of the `index.html`. This will hide the app content until the web-components are ready.

```html
<style>
  .bal-body {
    visibility: hidden;
  }
</style>
```

Next set the class `.bal-body` to your app container. In the most cases it is the body element of your `index.html`.

# Start the app

Now everything is ready to be used. Add some Baloise components and start the app with:

```bash
npm start
```

> **TIP**
> Your app gets served under [http://localhost:4200](http://localhost:4200).
