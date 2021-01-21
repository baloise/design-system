# Styling

## Css

### Install Fonts

Download the 2 used fonts of our Baloise style guide.

- [MetaStd-Normal](https://github.com/baloise/ui-library/raw/feat/icons/packages/library/src/assets/fonts/MetaStd-Normal.woff2)
- [MetaStd-Medium](https://github.com/baloise/ui-library/raw/feat/icons/packages/library/src/assets/fonts/MetaStd-Medium.woff2)

Create a folders in the public space like `assets/fonts` and place the donwloaded fonts in there.
To use the fonts in the css styles import it with the following snippet.

```css
@font-face {
  font-family: 'MetaPro';
  font-style: normal;
  font-weight: 300;
  src: local('MetaPro'), local('MetaStd-Normal'), url('/assets/fonts/MetaStd-Normal.woff2') format('woff2');
}

@font-face {
  font-family: 'MetaPro';
  font-style: normal;
  font-weight: 700;
  src: local('MetaPro'), local('MetaStd-Medium'), url('/assets/fonts/MetaStd-Medium.woff2') format('woff2');
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

## Advanced Styling with Sass

### Install fonts

Download the 2 used fonts of our Baloise style guide.

- [MetaStd-Normal](https://github.com/baloise/ui-library/raw/feat/icons/packages/library/src/assets/fonts/MetaStd-Normal.woff2)
- [MetaStd-Medium](https://github.com/baloise/ui-library/raw/feat/icons/packages/library/src/assets/fonts/MetaStd-Medium.woff2)

Place the two donwloaded fonts into a folder in the public area. Configure the path with the Sass variable `$font-path` or use the default `assets/fonts`.

Import `ui-library.scss` Sass file into the main `.scss` file of your application.

```scss
// Imports all the global styles of the library
@import 'node_modules/@baloise/ui-library/src/styles/ui-library.scss';
```

To access the scss variables like [colors](essentials/colors.md) or [responsiveness helpers](essentials/responsiveness) import the `ui-library.utilities.scss`.

```scss
// Only imports variables and mixins
@import 'node_modules/@baloise/ui-library/src/styles/ui-library.utilities.scss';
```

> Use the variables and helpers of the UI-Library where ever you can in your application. 
