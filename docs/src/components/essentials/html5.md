# HTML5

<img style="width: 128px;" src="https://cdn.iconscout.com/icon/free/png-512/html5-10-569380.png" data-origin="https://cdn.iconscout.com/icon/free/png-512/html5-10-569380.png" alt="HTML5">

This section explains how the Baloise Design System can be included in to your HTML5 Application.

## CDN

The easiest way to use the library is via CDN.

Add the following 4 references to your `<head></head>`

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@baloise/design-system-fonts/lib/baloise-fonts.cdn.css" />
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

## Node Modules

Open the terminal and run the following command to install the Baloise Design System.

```bash
npm install @baloise/design-system-fonts --save
npm install @baloise/design-system-components --save
```

Add the following 2 references to your `<head></head>`

```html
<link rel="stylesheet" href="node_modules/@baloise/design-system-fonts/lib/baloise-fonts.cdn.css" />
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
