# Theming

For the Baloise Design System theme you need to provide the typography and stylesheets.

This project is built on top of the [Bulma CSS framework](https://bulma.io/).

:::tip
If the font is yet not installed please check out [the font install documentation](/design/typography.html#install-web-font)
:::

## Sass (recommended)

We recommand to use dart-sass and not node-sass.

### Install Sass Stylesheets

Import the `global.scss` Sass file into the main `.scss` file of your application.

```scss
@import 'node_modules/@baloise/design-system-components/src/styles/global.scss';
```

### Variables

To access the scss variables like [colors](/guide/styles/colors.html) or [responsiveness helpers](/guide/styles/responsiveness.html) import the `global.utilities.scss`.

::: tip
Use the variables and helpers of the Design System whereever you can in your application.
:::

#### Usage

```scss
// Only imports variables and mixins
@import 'node_modules/@baloise/design-system-components/src/styles/global.utilities.scss';

// mobile first
p {
  color: $blue;
}

@include desktop() {
  p {
    color: $danger;
  }
}
```

### Add global styles

#### CDN

Put the link tag into your main html file.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@baloise/design-system-components/dist/design-system-components/design-system-components.css"
/>
```

#### Webpack

Import the css directly into your main TypeScript or JavaScript file.

```typescript
import '@baloise/design-system-components/dist/design-system-components/design-system-components.css'
```
