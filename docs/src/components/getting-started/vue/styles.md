# Styles

For the Baloise Design System styles you need to provide the typography and stylesheets.

This project is built on top of the [Bulma CSS framework](https://bulma.io/).

Add the `bal-app` to your root element. Within this component we are able to use the defined css classes.

```html
...
<body>
  <bal-app>
    <!-- Use helpers & elements here -->
  </bal-app>
</body>
...
```

## Install Typography

Next step is to provide the fonts to our web application. To do so we recommand the tool [copyfiles](https://www.npmjs.com/package/copyfiles) to copy the font files into your asset folder.

```bash
npm install copyfiles --save-dev
```

After installing the copyfiles dependency we need to define the copy command in our **package.json** file. Add a new script called `copy:fonts` and adjust the second path to your application.

:::tip
For angular apps the default path would be **src/assets/fonts** instead of **public/assets/fonts**
:::

```json{2}
"scripts": {
  "copy:fonts": "copyfiles --flat node_modules/@baloise/design-system-fonts/lib/* public/assets/fonts"
}
```

Then we add the defined script `copy:fonts` in our `postinstall` script. Every time we install dependencies the `copy:fonts` script gets executed at the end.

```json{2}
"scripts": {
  "postinstall": "npm run copy:fonts",
  "copy:fonts": "copyfiles --flat node_modules/@baloise/design-system-fonts/lib/* public/assets/fonts"
}
```

## Sass (recommended)

We recommand to use dart-sass and not node-sass.

### Install Sass Stylesheets

Place the downloaded fonts into a folder in the public area. Configure the path with the Sass variable `$font-path` or use the default `assets/fonts`.

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

## CSS

Configure the fonts in a css file.

The package `@baloise/design-system-fonts` also delivers a css file with the config for the typography.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@baloise/design-system-fonts/lib/fonts.css" />
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
import '@baloise/design-system-components/dist/design-system-fonts/lib/fonts.css'
import '@baloise/design-system-components/dist/design-system-components/design-system-components.css'
```
