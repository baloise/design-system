<bal-doc-lead>
This section describes how to setup the Baloise Design System with an basic React applications.
</bal-doc-lead>

## Prerequisite

Before we can add the Baloise Design System we need to setup the basics.

Create an React project with the [React Create App CLI](https://create-react-app.dev/) and set Sass as default.

> **Recommendations**
>
> - Choose **SCSS** as the stylesheet format, because it gives access to the internal Baloise Design System variables like colors and much more.
> - We recommend to install our [utility libraries](https://github.com/baloise/web-app-utils) for validations and pipes.

## Install Baloise Design System

Use npm to install the React proxy library.

```
npm install @baloise/design-system-components-react
```

## Install Fonts

The font package is included in the `@baloise/design-system-components` package and also in the proxy libraries.

Next step is to provide the fonts to our web application. To do so we recommend the tool [copyfiles](https://www.npmjs.com/package/copyfiles) (opens new window) to copy the font files into your asset folder.

```
npm install copyfiles --save-dev
```

After installing our copyfiles dependency we need to define the copy command in our package.json file. Add a new script called `copy:fonts` and adjust the second path to your application.

Place the downloaded fonts into a folder in the public area. Configure the path with the Sass variable `$font-path` or use the default `assets/fonts`.

```scss
// change scss variable before importing the design system

@import '@baloise/design-system-components/src/styles/global';

// add custom application styles here after the design system
```

> **CSS**
> If you use the styles with css than just put the fonts into a public/static folder with the path `assets/fonts`.

Then we add the defined script copy:fonts in our postinstall script. Every time we install dependencies the copy:fonts script gets executed at the end.

```json
"scripts": {
  "postinstall": "npm run copy:fonts",
  "copy:fonts": "copyfiles --flat node_modules/@baloise/design-system-fonts/lib/* public/assets/fonts"
}
```

> **TIP**
> It could be that inside the docker container the `postinstall` gets not executed. Therefore, use `npm run ci --unsafe-perm` to execute postinstall after the install script.

## HTML Structure

Add the `BalApp` to your root element. Within this component we are able to use the defined css classes.

```typescript
import React from 'react'
import { BalApp, useBaloiseDesignSystem } from '@baloise/design-system-components-react'
import './App.scss'

function App() {
  useBaloiseDesignSystem()

  return (
    <BalApp className="has-sticky-footer">
      <main className="container">...</main>
    </BalApp>
  )
}
```

> **Internationalization** To run the Design System in a different region then `CH` or to change the language to `fr` follow the documentation of [internationalization](?path=/docs/development-getting-started-internationalization--page).

### Improve initial page load

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
