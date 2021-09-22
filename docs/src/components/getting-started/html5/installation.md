# Installation

## Node Modules

This is the recommanded setup for HTML5 applications or server-side-rendering application, because it is under version control with the help of npm.

First lets create a node project to manage the dependencie versions. Open the terminal and navigate into your project folder. Then run `npm init` to setup the `package.json` file.

```bash
npm init
```

Now lets install the Baloise Design System.

```bash
npm install @baloise/design-system-components --save
```

Add the following 2 references to your `<head></head>`

```html
<link
  rel="stylesheet"
  href="node_modules/@baloise/design-system-components/dist/design-system-components/design-system-components.css"
/>

<script
  type="module"
  src="node_modules/@baloise/design-system-components/dist/design-system-components/design-system-components.esm.js"
></script>
<script
  nomodule
  src="node_modules/@baloise/design-system-components/dist/design-system-components/design-system-components.js"
></script>
```

## CDN

An other way to easily use the library is via CDN. However we do not recommand this for production usage.

Add the following 4 references to your `<head></head>`

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@baloise/design-system-components/dist/design-system-components/design-system-components.css"
/>

<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@baloise/design-system-components/dist/design-system-components/design-system-components.esm.js"
></script>
<script
  nomodule
  src="https://cdn.jsdelivr.net/npm/@baloise/design-system-components/dist/design-system-components/design-system-components.js"
></script>
```

## Install Typography

To apply the Baloise Design System typography follow [the instruction on the page typography documentation](/design/typography.html#install-web-font).

## Install Theming / Styles

To apply the Baloise Design System theming follow [the instruction on the page styling documentation](/components/getting-started/theming.html).

::: warning
Do not forget to apply the style, otherwise you components will not look like in this documentation ;-)
:::

## HTML Structure

Add the `bal-app` to your root element. Within this component we are able to use the defined css classes.

```html
...
<body>
  <bal-app>
    <header>
      <!-- Header content -->
    </header>
    <main class="container">
      <!-- Your application content -->
    </main>
    <bal-footer>
      <!-- Footer content -->
    </bal-footer>
  </bal-app>
</body>
...
```

::: tip
To have light grey background just add the attribute `background` to the `bal-app` component. Recommended to use with the `bal-card` component.

```xml
<body>
  <bal-app background>
    <bal-card>
      <!-- Your application content -->
    </bal-card>
  </bal-app>
</body>
```

:::
