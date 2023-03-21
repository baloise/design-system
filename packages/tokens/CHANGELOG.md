# @baloise/design-system-tokens

## 12.10.0

## 12.9.0

### Patch Changes

- [#1198](https://github.com/baloise-incubator/design-system/pull/1198) [`78b00ba20`](https://github.com/baloise-incubator/design-system/commit/78b00ba2042172ea23fe8827a60292c167d38e4c) Thanks [@hirsch88](https://github.com/hirsch88)! - deprecated radius token **small** and **x-large**. Please use normal for small and use rounded for x-large.

- [#1198](https://github.com/baloise-incubator/design-system/pull/1198) [`78b00ba20`](https://github.com/baloise-incubator/design-system/commit/78b00ba2042172ea23fe8827a60292c167d38e4c) Thanks [@hirsch88](https://github.com/hirsch88)! - deprecate container blog-page. Please use default container size.

  Just use `<div class="container"></div>` instead of `<div class="container is-blog-page"></div>`

- [#1198](https://github.com/baloise-incubator/design-system/pull/1198) [`78b00ba20`](https://github.com/baloise-incubator/design-system/commit/78b00ba2042172ea23fe8827a60292c167d38e4c) Thanks [@hirsch88](https://github.com/hirsch88)! - adding missing inverted text and border color tokens.

  - `primary-light` was added for disabled text on dark background
  - `primary-light` was added for disabled border lines on dark background
  - `white` was added as a primary border line color on dark background

## 12.8.2

### Patch Changes

- [`ab352d875`](https://github.com/baloise-incubator/design-system/commit/ab352d8755332f0c8adc4801e3d5c7c391bb8f27) Thanks [@hirsch88](https://github.com/hirsch88)! - adjust colors due to contrast issues

## 12.8.1

### Patch Changes

- [#1182](https://github.com/baloise-incubator/design-system/pull/1182) [`38f0a7fd4`](https://github.com/baloise-incubator/design-system/commit/38f0a7fd492927a49e811e1b0461ed39ebe057d4) Thanks [@hirsch88](https://github.com/hirsch88)! - adjust package.json to npm workspace structure and move contact.js to components dependencies

## 12.8.0

## 12.7.1

## 12.7.0

## 12.6.0

### Minor Changes

- [#1084](https://github.com/baloise-incubator/design-system/pull/1084) [`26b23997c`](https://github.com/baloise-incubator/design-system/commit/26b23997c9c4fc72824a60fdf2928b1b82b62f26) Thanks [@hirsch88](https://github.com/hirsch88)! - split CSS-Package into smaller exports and moved to CSS-Variables.

  Replace the import of the `global` SASS file with the CSS-Package.

  **Before**

  ```scss
  @import '@baloise/design-system-components/src/styles/global';
  ```

  **After**

  ```scss
  @import '@baloise/design-system-css/sass/baloise-design-system';
  ```

  To be more flexible the new CSS exports can be used directly like that:

  ```scss
  // Resets CSS for all browser
  @import '@baloise/design-system-css/css/normalize';
  @import '@baloise/design-system-css/css/structure';
  // Custom font faces
  @import '@baloise/design-system-css/sass/font';
  // Core CSS, always required
  @import '@baloise/design-system-css/css/core';
  // Deprecated styles will be removed with the next breaking version (optional)
  @import '@baloise/design-system-css/sass/legacy';

  // CSS utilities classes (optional)
  @import '@baloise/design-system-css/css/border';
  @import '@baloise/design-system-css/css/color';
  @import '@baloise/design-system-css/css/display';
  @import '@baloise/design-system-css/css/flex';
  @import '@baloise/design-system-css/css/grid';
  @import '@baloise/design-system-css/css/opacity';
  @import '@baloise/design-system-css/css/radius';
  @import '@baloise/design-system-css/css/shadow';
  @import '@baloise/design-system-css/css/spacing';
  @import '@baloise/design-system-css/css/typography';
  ```

### Patch Changes

- [#1101](https://github.com/baloise-incubator/design-system/pull/1101) [`af1560a6e`](https://github.com/baloise-incubator/design-system/commit/af1560a6e5ed5abb3bc8ae0f4e7cb1507464634d) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - use tokens in the components instead of hard coded css values

## 12.5.0

### Minor Changes

- [#1050](https://github.com/baloise-incubator/design-system/pull/1050) [`355fc4f3c`](https://github.com/baloise-incubator/design-system/commit/355fc4f3cd13f4708b4d1a0f219658c3214df253) Thanks [@hirsch88](https://github.com/hirsch88)! - add container design tokens

## 12.4.1

## 12.4.0

## 12.3.0

## 12.2.0

## Previous Versions

- [Older versions](https://github.com/baloise-incubator/design-system/blob/next/CHANGELOG_v12.md)
- [Rebranding versions](https://github.com/baloise-incubator/design-system/blob/next/CHANGELOG_NEXT.md)
