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
  <body class="bal-body">
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

An other way to easily use the library is via [CDN](https://www.jsdelivr.com/).

> **TIP**
> It is recommended to use the version directly and not the latest version to avoid incoming breaking changes.
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
