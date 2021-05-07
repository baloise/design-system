# HTML5

<img style="width: 128px;" src="https://cdn.iconscout.com/icon/free/png-512/html5-10-569380.png" data-origin="https://cdn.iconscout.com/icon/free/png-512/html5-10-569380.png" alt="HTML5">

This section explains how the Baloise UI Library can be included in to your HTML5 Application.

## CDN

The easiest way to use the library is via CDN.

Add the following 2 references to your `<head></head>`

::: warning
The CDN script does not run in the IE11 Browser. To get IE11 up and running use the [Javascript](/) integration;
:::

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@baloise/design-system-components/dist/ui-library/ui-library.css"
/>
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@baloise/design-system-components/dist/ui-library/ui-library.esm.js"
></script>
```

## Node Modules

Open the terminal and run the following command to install the Baloise UI Library.

```bash
npm install @baloise/design-system-components --save
```

Add the following 2 references to your `<head></head>`

```html
<link rel="stylesheet" href="node_modules/@baloise/design-system-components/dist/ui-library/ui-library.css" />
<script type="module" src="node_modules/@baloise/design-system-components/dist/ui-library/ui-library.esm.js"></script>
```

## Server-Side

There is also the possible to just include the styles with the css or scss file.

```html
<link rel="stylesheet" href="node_modules/@baloise/design-system-components/dist/ui-library/ui-library.css" />
```

::: warning
However, without the javascript the components like datepicker or toast cannot be used.
:::
