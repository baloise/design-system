# Styling

## Fonts

Download the 2 used fonts of our Baloise style guide.

- MetaStd-Normal
  - [woff2](https://github.com/baloise/ui-library/raw/master/packages/library/src/assets/fonts/MetaStd-Normal.woff2)
  - [woff](https://github.com/baloise/ui-library/raw/master/packages/library/src/assets/fonts/MetaStd-Normal.woff)
  - [truetype](https://github.com/baloise/ui-library/raw/master/packages/library/src/assets/fonts/MetaStd-Normal.ttf)
- MetaStd-Medium
  - [woff2](https://github.com/baloise/ui-library/raw/master/packages/library/src/assets/fonts/MetaStd-Medium.woff2)
  - [woff](https://github.com/baloise/ui-library/raw/master/packages/library/src/assets/fonts/MetaStd-Medium.woff)
  - [truetype](https://github.com/baloise/ui-library/raw/master/packages/library/src/assets/fonts/MetaStd-Medium.ttf)

Create a folders in the public space like `assets/fonts` and place the donwloaded fonts in there.
To use the fonts in the css styles import it with the following snippet.

## Sass (recommended)

### Install

Place the download fonts into a folder in the public area. Configure the path with the Sass variable `$font-path` or use the default `assets/fonts`.

Import `ui-library.scss` Sass file into the main `.scss` file of your application.

```scss
@import 'node_modules/@baloise/ui-library/src/styles/ui-library.scss';
```

### Variables

To access the scss variables like [colors](essentials/colors.md) or [responsiveness helpers](essentials/responsiveness) import the `ui-library.utilities.scss`.

> Use the variables and helpers of the UI-Library where ever you can in your application.

#### Usage

```scss
// Only imports variables and mixins
@import 'node_modules/@baloise/ui-library/src/styles/ui-library.utilities.scss';

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

## Css

Configure the fonts in a css file.

```css
@font-face {
  font-family: 'MetaPro';
  font-style: normal;
  font-weight: 400;
  font-display: fallback;
  src: local('MetaPro'), local('MetaStd-Normal'), url('/assets/fonts/MetaStd-Normal.woff2') format('woff2'), url('/assets/fonts/MetaStd-Normal.woff')
      format('woff'), url('/assets/fonts/MetaStd-Normal.ttf') format('truetype');
}

@font-face {
  font-family: 'MetaPro';
  font-style: normal;
  font-weight: 700;
  font-display: fallback;
  src: local('MetaStd-Medium'), url('/assets/fonts/MetaStd-Medium.woff2') format('woff2'), url('/assets/fonts/MetaStd-Medium.woff')
      format('woff'), url('/assets/fonts/MetaStd-Medium.ttf') format('truetype');
}
```

### Add global styles

#### CDN

Put the link tag into your main html file.

```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@baloise/ui-library/dist/ui-library/ui-library.css" />
```

#### Webpack

Import the css directly into your main TypeScript or JavaScript file.

```typescript
import '@baloise/ui-library/dist/ui-library/ui-library.css'
```
