# Installation

## Node Modules

Open the terminal and run the following commands to install the Baloise Design System.

::: tip
This is the recommanded setup for HTML5 applications or server-side-rendering application, because it is under version control with the help of npm.
:::

```bash
npm install @baloise/design-system-fonts --save
npm install @baloise/design-system-components --save
```

Add the following 2 references to your `<head></head>`

```html
<link rel="stylesheet" href="node_modules/@baloise/design-system-fonts/lib/fonts.cdn.css" />
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

A way to easily use the library is via CDN. However we do not recommand this for production usage.

Add the following 4 references to your `<head></head>`

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@baloise/design-system-fonts/lib/fonts.cdn.css" />
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

## Apply styles

To apply the Baloise Design System styles and typography follow [the instruction on the page styling documentation](/components/getting-started/html5/styles.html).

::: warning
Do not forget to apply the style, otherwise you components will not look like in this documentation ;-)
:::

### HTML Files

Set the `bal-app` component into the body of the `src/index.html` file.

```xml
<body>
  <bal-app>
    <!-- Your application content -->
  </bal-app>
</body>
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
