## Installation

This section describes how to setup the Baloise Design System with an basic web application.

### Node Modules

This is the recommended setup for HTML5 applications or server-side-rendering application, because it is under version control with the help of npm.

First lets create a node project to manage the dependencies versions. Open the terminal and navigate into your project folder. Then run `npm init` to setup the `package.json` file.

```
npm init
```

Now lets install the Baloise Design System.

```
npm install @baloise/design-system-components --save
```

After that we create a `index.html` file and add the following 2 references to your `<head></head>`.

Add the `bal-app` to your root element. Within this component we are able to use the defined css classes.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Baloise Design System</title>
    <link rel="stylesheet" href="node_modules/@baloise/design-system-css/css/baloise-design-system.css" />
    <script
      type="module"
      src="node_modules/@baloise/design-system-components/dist/design-system-components/design-system-components.esm.js"
    ></script>
    <script
      nomodule
      src="node_modules/@baloise/design-system-components/dist/design-system-components/design-system-components.js"
    ></script>
  </head>
  <body>
    <bal-app>
      <main class="container mt-normal">
        <bal-heading>Hello World</bal-heading>
        <bal-button>Button</bal-button>
      </main>
    </bal-app>
  </body>
</html>
```

> **HTTP-Server**
> To run the HTML5 application you need a proper HTTP-Server. However, if there is none we recommend to install
>
> ```
> npm add -D http-server
> ```
>
> After that add define the start script with the http-server package.
>
> ```json
>   "scripts": {
>      "start": "http-server"
>   }
> ```
>
> Now you can run your server with `npm start` and the server is available under http://127.0.0.1:8080/.

## Provide the assets

The Design System provides custom fonts and favicons.

To add them to your application follow those guides:

- [Font Installation](../?path=/docs/foundation-typography-development--heading-and-display#installation)
- [Favicons Installation](../?path=/docs/foundation-brand-assets-development--logo#favicons)

### CDN

As part of our design system, we offer [CDN](https://www.jsdelivr.com/) (Content Delivery Network) integration.

While we provide CDN integration as part of our design system, it is essential to note that it is not recommended for use in production applications.
The reason for this recommendation is that we rely on a third-party service to host and distribute the assets through the CDN.

> **TIP**
> To avoid potential breaking changes, it is recommended to use a specific version directly rather than relying on the latest version.
> Like => `https://cdn.jsdelivr.net/npm/@baloise/design-system-css@10/css/baloise-design-system.css`

Add the following 4 references to your `<head></head>`

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@baloise/design-system-css/css/baloise-design-system.css" />
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@baloise/design-system-components/dist/design-system-components/design-system-components.esm.js"
></script>
<script
  nomodule
  src="https://cdn.jsdelivr.net/npm/@baloise/design-system-components/dist/design-system-components/design-system-components.js"
></script>
```

Here is how you can integrate it into your project.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>CDN Template</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@baloise/design-system-css/css/baloise-design-system.css"
    />
    <script
      type="module"
      src="https://cdn.jsdelivr.net/npm/@baloise/design-system-components/dist/design-system-components/design-system-components.esm.js"
    ></script>
    <script
      nomodule
      src="https://cdn.jsdelivr.net/npm/@baloise/design-system-components/dist/design-system-components/design-system-components.js"
    ></script>
  </head>
  <body>
    <bal-app class="has-sticky-footer">
      <header>
        <bal-navbar>
          <bal-navbar-brand href="/" target="_blank">Design System</bal-navbar-brand>
        </bal-navbar>
      </header>
      <bal-stage color="green" size="small">
        <bal-stage-body>
          <bal-heading>Welcome to the</bal-heading>
          <bal-heading subtitle>Baloise Design System</bal-heading>
        </bal-stage-body>
      </bal-stage>
      <main class="container mt-xx-large">
        <p>
          The Baloise Design System consists of UI components and a clearly defined visual style, released as both code
          implementations and design artifacts to build any number of web applications.
        </p>
        <bal-button href="https://baloise-design-system.vercel.app" target="_blank">
          Check out the Documentation</bal-button
        >
      </main>
      <bal-footer>
        <!-- Footer content -->
      </bal-footer>
    </bal-app>
  </body>
</html>
```

Here you can try it online.

<bal-button target="_blank" href="https://codesandbox.io/s/baloise-design-system-cdn-qn7ffg?file=/index.html">Try Online</bal-button>
