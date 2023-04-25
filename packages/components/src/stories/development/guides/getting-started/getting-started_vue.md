## Prerequisite

Depending on your use case and preference, you can use Vue setup the application with our template or the cli.

Follow the instructions of the official Vite page [Scaffolding Your First Vite Project](https://vitejs.dev/guide/)

> **Recommendations**
>
> - Install **SASS** as the stylesheet format, because it gives access to the internal Baloise Design System variables like colors and much more.
> - We recommend to install our [utility libraries](https://github.com/baloise/web-app-utils) for validations and pipes.

Install the needed dev dependencies.
To provide the fonts to our web application. To do so we recommend the tool copyfiles (opens new window) to copy the font files into your asset folder.

```
npm install sass copyfiles --save-dev
```

To resolve the node_modules path with the char ~ add the below config to the vite defineConfig function.

```javascript
resolve: {
  alias: [
    {
      // this is required for the SCSS modules
      find: /^~(.*)$/,
      replacement: "$1",
    },
  ],
},
```

## Installation

This section describes how to setup the Baloise Design System with an basic Vue application.

### Install Baloise Design System

The `@baloise/design-system-components-vue` dependency includes the plugin `BaloiseDesignSystem`, which loads by default the polyfills and defines the components.
Moreover, it adds the controllers to your vue instance.

To install the Baloise Design System run the following command.

```
npm install @baloise/design-system-components-vue --save
```

### Import styles

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

### Use Plugin

Inside the `main.ts` file add the created `main.scss` and import the `BaloiseDesignSystem` plugin.

```typescript
import './main.scss'
import { createBaloiseDesignSystem } from '@baloise/design-system-components-vue'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .use(
    createBaloiseDesignSystem({
      defaults: {
        region: 'CH',
        language: 'en',
        allowedLanguages: ['de', 'fr', 'it', 'en'],
      },
    }),
  )
  .mount('#app')
```

> **Internationalization** To run the Design System in a different region then `CH` or to change the language to `fr` follow the documentation of [internationalization](?path=/docs/development-internationalization--page).

### HTML Structure

Add the `BalApp` to your root element (App.vue). Within this component we are able to use the defined css classes.

```html
<script setup lang="ts">
  import { BalApp, BalFooter, BalHeading, BalButton } from '@baloise/design-system-components-vue'
</script>

<template>
  <BalApp class="has-sticky-footer">
    <header>
      <!-- Header content -->
    </header>
    <main class="container">
      <BalHeading>Hello World!</BalHeading>
      <BalButton>Button</BalButton>
      <!-- Page content -->
    </main>
    <BalFooter>
      <div class="container">
        <!-- Footer content -->
        Footer
      </div>
    </BalFooter>
  </BalApp>
</template>
```

<!-- #### Improve initial page load

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
npm run dev
```

> **TIP**
> Your app gets served under [http://localhost:3000](http://localhost:3000).

## Provide the assets

The Design System provides custom fonts and favicons.

To add them to your application follow those guides:

- [Font Installation](../?path=/docs/foundation-typography-development--heading-and-display#installation)
- [Favicons Installation](../?path=/docs/foundation-brand-assets-development--logo#favicons)
