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

### Import fonts

The font package is included in the `@baloise/design-system-components` package and also in the proxy libraries.

After installing our copyfiles dependency we need to define the copy command in our package.json file. Add a new script called copy:fonts and adjust the second path to your application.

```json
"scripts": {
  "postinstall": "npm run copy:fonts",
  "copy:fonts": "copyfiles --flat node_modules/@baloise/design-system-fonts/lib/* public/assets/fonts"
}
```

To copy the fonts run the following command.

```
npm run copy:fonts
```

> **TIP**
>
> - Add the generated files to the `.gitignore` file.
> - It could be that inside the docker container the `postinstall` gets not executed. Therefore, use `npm run ci --unsafe-perm` to execute postinstall after the install script.

### Import styles

Then create a new file called `main.scss` in the `src` folder.

Import the `global.sass` Sass file of the Design System into the `main.scss` file.

```scss
// change variable before the import

@import '@baloise/design-system-components/src/styles/global';

// add custom styles below
```

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
