# @baloise/design-system-css

## 14.4.0

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@14.4.0
  - @baloise/design-system-tokens@14.4.0

## 14.3.0

### Patch Changes

- [#1073](https://github.com/baloise/design-system/pull/1073) - The design tokens for line-height values for x-small and small text has been adjusted to ensure compliance with accessibility (a11y) standards.

- Updated dependencies [[`82ebf8d0c`](https://github.com/baloise/design-system/commit/82ebf8d0c7a15c03682f754d904c4bff151c72f0)]:
  - @baloise/design-system-tokens@14.3.0
  - @baloise/design-system-fonts@14.3.0

## 14.2.1

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@14.2.1
  - @baloise/design-system-tokens@14.2.1

## 14.2.0

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@14.2.0
  - @baloise/design-system-tokens@14.2.0

## 14.1.0

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@14.1.0
  - @baloise/design-system-tokens@14.1.0

## 14.0.5

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@14.0.5
  - @baloise/design-system-tokens@14.0.5

## 14.0.4

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@14.0.4
  - @baloise/design-system-tokens@14.0.4

## 14.0.3

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@14.0.3
  - @baloise/design-system-tokens@14.0.3

## 14.0.2

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@14.0.2
  - @baloise/design-system-tokens@14.0.2

## 14.0.1

### Patch Changes

- [`af2c20f52`](https://github.com/baloise/design-system/commit/af2c20f520d1978df0547be5767803ead6d66ed4) - Raise the z-index value of the toast to ensure it overlays a modal.

- Updated dependencies [[`af2c20f52`](https://github.com/baloise/design-system/commit/af2c20f520d1978df0547be5767803ead6d66ed4)]:
  - @baloise/design-system-tokens@14.0.1
  - @baloise/design-system-fonts@14.0.1

## 14.0.0

### Major Changes

- [#940](https://github.com/baloise/design-system/pull/940) - Create z-index design tokens and adjust the components.

In version 14, we've introduced `z-index` values as design tokens. Consequently, adjustments were made to each component.
If you've been using **custom z-index values** in your app, please be aware that this could potentially result in broken layouts.

After upgrading the design system in your app, please take a moment to check if any layouts are affected. If necessary, make adjustments to the z-index accordingly.

| Name       | CSS-Variable               | Value     | Description                                                                                                          |
| ---------- | -------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------- |
| deep       | `--bal-z-index-deep`       | `-999999` | Deep z-index is used to stack something behind everything else.                                                      |
| default    | `--bal-z-index-default`    | `1`       | The default z-index for components and elements inside components.                                                   |
| masked     | `--bal-z-index-masked`     | `100`     | Default z-index for masked interface elements.                                                                       |
| mask       | `--bal-z-index-mask`       | `200`     | Default z-index for masking interface elements.                                                                      |
| sticky     | `--bal-z-index-sticky`     | `300`     | Default z-index for sticky interface elements.                                                                       |
| navigation | `--bal-z-index-navigation` | `400`     | Default z-index for navigation.                                                                                      |
| popup      | `--bal-z-index-popup`      | `1000`    | Default z-index for popups that stacks on top of all other elements.                                                 |
| modal      | `--bal-z-index-modal`      | `1100`    | Default z-index for modals that stacks on top of overlays and other elements, but still allows popups to be visible. |
| toast      | `--bal-z-index-toast`      | `1200`    | Default z-index for toast and snackbar messages.                                                                     |
| tooltip    | `--bal-z-index-tooltip`    | `1300`    | Default z-index for tooltips.                                                                                        |

Have a look at the [Z-Index documentation](https://design.baloise.dev?path=/docs/foundation-elevation-design-tokens--page).

### Minor Changes

- [#1041](https://github.com/baloise/design-system/pull/1041) - Introduce a compact theme option for the dashboard or internal applications.

  The compact theme features a narrower layout with a reduced font size (14px instead of 16px). Additionally, spaces such as margins and paddings are adjusted to align with mobile dimensions, ensuring a more compact appearance.

  To activate the compact theme, import the `theme-compact` stylesheet into the root App component or a global stylesheet.

  It is recommended to import the `theme-compact` file at the end of your stylesheet, after the other imports from the Design System.

  ```scss
  @import '@baloise/design-system-css/css/theme-compact';

  // or for SASS

  @import '@baloise/design-system-css/sass/theme-compact';
  ```

### Patch Changes

- Updated dependencies [[`01cfd5654`](https://github.com/baloise/design-system/commit/01cfd56549b2b602bb684c0b46d26d5262bd183b)]:
  - @baloise/design-system-tokens@14.0.0
  - @baloise/design-system-fonts@14.0.0

## 13.7.1

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@13.7.1
  - @baloise/design-system-tokens@13.7.1

## 13.7.0

### Patch Changes

- [#1007](https://github.com/baloise/design-system/pull/1007) - Relocate sticky footer styles to the core CSS file and update 'bal-app' for Vue applications.

- Updated dependencies []:
  - @baloise/design-system-fonts@13.7.0
  - @baloise/design-system-tokens@13.7.0

## 13.6.2

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@13.6.2
  - @baloise/design-system-tokens@13.6.2

## 13.6.1

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@13.6.1
  - @baloise/design-system-tokens@13.6.1

## 13.6.0

### Minor Changes

- [#976](https://github.com/baloise/design-system/pull/976) - add new tertiary button with a themed option

### Patch Changes

- [#976](https://github.com/baloise/design-system/pull/976) - fix inverted hover style for text and link buttons

- Updated dependencies []:
  - @baloise/design-system-fonts@13.6.0
  - @baloise/design-system-tokens@13.6.0

## 13.5.0

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@13.5.0
  - @baloise/design-system-tokens@13.5.0

## 13.4.4

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@13.4.4
  - @baloise/design-system-tokens@13.4.4

## 13.4.3

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@13.4.3
  - @baloise/design-system-tokens@13.4.3

## 13.4.2

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@13.4.2
  - @baloise/design-system-tokens@13.4.2

## 13.4.1

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@13.4.1
  - @baloise/design-system-tokens@13.4.1

## 13.4.0

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@13.4.0
  - @baloise/design-system-tokens@13.4.0

## 13.3.1

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@13.3.1
  - @baloise/design-system-tokens@13.3.1

## 13.3.0

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@13.3.0
  - @baloise/design-system-tokens@13.3.0

## 13.2.1

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@13.2.1
  - @baloise/design-system-tokens@13.2.1

## 13.2.0

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@13.2.0
  - @baloise/design-system-tokens@13.2.0

## 13.1.0

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@13.1.0
  - @baloise/design-system-tokens@13.1.0

## 13.0.0

### Major Changes

- [#806](https://github.com/baloise/design-system/pull/806) [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c) Thanks [@hirsch88](https://github.com/hirsch88)! - remove deprecated global component styles.
  Component styles will be loaded lazy to optimize the speed of the first render, there for only import the needed CSS files.

  #### Global import

  The global import of the main styles and his utility classes move to the CSS framework.

  **before**

  ```scss
  @import '@baloise/design-system-components/src/styles/global';
  ```

  **after**

  With the solution we are able to add only what we need.

  ```scss
  // SASS mixins and variables
  @import '@baloise/design-system-css/sass/mixins';

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

  #### Component utilities import

  The location of the `variable` & `mixins` has changed to `@baloise/design-system-css/sass/mixins`.

  **before**

  ```scss
  @import '@baloise/design-system-components/src/styles/global.utilities';
  ```

  **after**

  ```scss
  @import '@baloise/design-system-css/sass/mixins';
  ```

- [#806](https://github.com/baloise/design-system/pull/806) [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c) Thanks [@hirsch88](https://github.com/hirsch88)! - .title, bal-heading, bal-text and bal-label inherit default color

### Patch Changes

- Updated dependencies [[`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c)]:
  - @baloise/design-system-tokens@13.0.0
  - @baloise/design-system-fonts@13.0.0

## 12.13.1

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@12.13.1
  - @baloise/design-system-tokens@12.13.1

## 12.13.0

### Patch Changes

- [#808](https://github.com/baloise/design-system/pull/808) [`69115d725`](https://github.com/baloise/design-system/commit/69115d725815663c12a65e92d8f0f40f10c7eafe) Thanks [@github-actions](https://github.com/apps/github-actions)! - typography elements inherit default color from parent element

- [#808](https://github.com/baloise/design-system/pull/808) [`69115d725`](https://github.com/baloise/design-system/commit/69115d725815663c12a65e92d8f0f40f10c7eafe) Thanks [@github-actions](https://github.com/apps/github-actions)! - default button color is set to primary

- Updated dependencies []:
  - @baloise/design-system-fonts@12.13.0
  - @baloise/design-system-tokens@12.13.0

## 12.12.0

### Patch Changes

- Updated dependencies [[`f9144f085`](https://github.com/baloise-incubator/design-system/commit/f9144f08528edd3dc58a17366a4426198b42410f)]:
  - @baloise/design-system-tokens@12.12.0
  - @baloise/design-system-fonts@12.12.0

## 12.11.0

### Patch Changes

- [#1226](https://github.com/baloise/design-system/pull/1226) [`884b91285`](https://github.com/baloise/design-system/commit/884b91285953a2f8b078b0e4a69b43649bc3af3e) Thanks [@hirsch88](https://github.com/hirsch88)! - add missing legacy sass variable

- Updated dependencies []:
  - @baloise/design-system-fonts@12.11.0
  - @baloise/design-system-tokens@12.11.0

## 12.10.0

### Patch Changes

- [#1221](https://github.com/baloise/design-system/pull/1221) [`ee0a5094d`](https://github.com/baloise/design-system/commit/ee0a5094d700197f6e110ded0607964a1bb8646f) Thanks [@hirsch88](https://github.com/hirsch88)! - inherit color for link elements

- Updated dependencies []:
  - @baloise/design-system-fonts@12.10.0
  - @baloise/design-system-tokens@12.10.0

## 12.9.0

### Patch Changes

- [#1198](https://github.com/baloise/design-system/pull/1198) [`78b00ba20`](https://github.com/baloise/design-system/commit/78b00ba2042172ea23fe8827a60292c167d38e4c) Thanks [@hirsch88](https://github.com/hirsch88)! - deprecated radius token **small** and **x-large**. Please use normal for small and use rounded for x-large.

- [#1198](https://github.com/baloise/design-system/pull/1198) [`78b00ba20`](https://github.com/baloise/design-system/commit/78b00ba2042172ea23fe8827a60292c167d38e4c) Thanks [@hirsch88](https://github.com/hirsch88)! - deprecate container blog-page. Please use default container size.

  Just use `<div class="container"></div>` instead of `<div class="container is-blog-page"></div>`

- [#1198](https://github.com/baloise/design-system/pull/1198) [`78b00ba20`](https://github.com/baloise/design-system/commit/78b00ba2042172ea23fe8827a60292c167d38e4c) Thanks [@hirsch88](https://github.com/hirsch88)! - adding missing inverted text and border color tokens.

  - `primary-light` was added for disabled text on dark background
  - `primary-light` was added for disabled border lines on dark background
  - `white` was added as a primary border line color on dark background

- [#1198](https://github.com/baloise/design-system/pull/1198) [`78b00ba20`](https://github.com/baloise/design-system/commit/78b00ba2042172ea23fe8827a60292c167d38e4c) Thanks [@hirsch88](https://github.com/hirsch88)! - paragraphs and links inherit css values from body.

- Updated dependencies [[`78b00ba20`](https://github.com/baloise/design-system/commit/78b00ba2042172ea23fe8827a60292c167d38e4c), [`78b00ba20`](https://github.com/baloise/design-system/commit/78b00ba2042172ea23fe8827a60292c167d38e4c), [`78b00ba20`](https://github.com/baloise/design-system/commit/78b00ba2042172ea23fe8827a60292c167d38e4c)]:
  - @baloise/design-system-tokens@12.9.0
  - @baloise/design-system-fonts@12.9.0

## 12.8.2

### Patch Changes

- [`ab352d875`](https://github.com/baloise/design-system/commit/ab352d8755332f0c8adc4801e3d5c7c391bb8f27) Thanks [@hirsch88](https://github.com/hirsch88)! - adjust colors due to contrast issues

- Updated dependencies [[`ab352d875`](https://github.com/baloise/design-system/commit/ab352d8755332f0c8adc4801e3d5c7c391bb8f27)]:
  - @baloise/design-system-tokens@12.8.2
  - @baloise/design-system-fonts@12.8.2

## 12.8.1

### Patch Changes

- [#1182](https://github.com/baloise/design-system/pull/1182) [`38f0a7fd4`](https://github.com/baloise/design-system/commit/38f0a7fd492927a49e811e1b0461ed39ebe057d4) Thanks [@hirsch88](https://github.com/hirsch88)! - adjust package.json to npm workspace structure and move contact.js to components dependencies

- Updated dependencies [[`38f0a7fd4`](https://github.com/baloise/design-system/commit/38f0a7fd492927a49e811e1b0461ed39ebe057d4)]:
  - @baloise/design-system-tokens@12.8.1
  - @baloise/design-system-fonts@12.8.1

## 12.8.0

### Patch Changes

- [#1174](https://github.com/baloise/design-system/pull/1174) [`a3a7c5f8f`](https://github.com/baloise/design-system/commit/a3a7c5f8f5953d3344fec22f63484e9cc6515b8f) Thanks [@hirsch88](https://github.com/hirsch88)! - add autoprefixer for css files to solve hyphen issue

- Updated dependencies []:
  - @baloise/design-system-fonts@12.8.0
  - @baloise/design-system-tokens@12.8.0

## 12.7.1

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@12.7.1
  - @baloise/design-system-tokens@12.7.1

## 12.7.0

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@12.7.0
  - @baloise/design-system-tokens@12.7.0

## 12.6.0

### Minor Changes

- [#1084](https://github.com/baloise/design-system/pull/1084) [`a899f8102`](https://github.com/baloise/design-system/commit/a899f8102e0e8f4dc6c0f2ce8ce155357de80f32) Thanks [@hirsch88](https://github.com/hirsch88)! - new styles for the Thematic Break (Horizontal Rule) element

  ```html
  <hr />
  // or without the @baloise/desing-system-css/css/structure
  <hr class="is-divider" />
  ```

- [#1084](https://github.com/baloise/design-system/pull/1084) [`26b23997c`](https://github.com/baloise/design-system/commit/26b23997c9c4fc72824a60fdf2928b1b82b62f26) Thanks [@hirsch88](https://github.com/hirsch88)! - split CSS-Package into smaller exports and moved to CSS-Variables.

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

- Updated dependencies [[`af1560a6e`](https://github.com/baloise/design-system/commit/af1560a6e5ed5abb3bc8ae0f4e7cb1507464634d), [`26b23997c`](https://github.com/baloise/design-system/commit/26b23997c9c4fc72824a60fdf2928b1b82b62f26)]:
  - @baloise/design-system-tokens@12.6.0
  - @baloise/design-system-fonts@12.6.0

## 12.5.0

### Minor Changes

- [#1050](https://github.com/baloise/design-system/pull/1050) [`355fc4f3c`](https://github.com/baloise/design-system/commit/355fc4f3cd13f4708b4d1a0f219658c3214df253) Thanks [@hirsch88](https://github.com/hirsch88)! - add container design tokens

### Patch Changes

- [#1081](https://github.com/baloise/design-system/pull/1081) [`9f47b318c`](https://github.com/baloise/design-system/commit/9f47b318ca24af8de8dfc8c9ae1e612c231a1625) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - add css styles for success, danger and warning state to the select and file upload

- [#1086](https://github.com/baloise/design-system/pull/1086) [`7bc33b76f`](https://github.com/baloise/design-system/commit/7bc33b76f9c8cf9a1fc028a638679e8eb77ac3d4) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - adjust value and placeholder color contrast for disabled fields

- Updated dependencies [[`355fc4f3c`](https://github.com/baloise/design-system/commit/355fc4f3cd13f4708b4d1a0f219658c3214df253)]:
  - @baloise/design-system-tokens@12.5.0
  - @baloise/design-system-fonts@12.5.0

## 12.4.1

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@12.4.1
  - @baloise/design-system-tokens@12.4.1

## 12.4.0

### Patch Changes

- [#1058](https://github.com/baloise/design-system/pull/1058) [`282355d61`](https://github.com/baloise/design-system/commit/282355d61f9e07882fca65a02b0108fc9e712397) Thanks [@hirsch88](https://github.com/hirsch88)! - set focus primary border on invalid form controls

- Updated dependencies []:
  - @baloise/design-system-fonts@12.4.0
  - @baloise/design-system-tokens@12.4.0

## 12.3.0

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@12.3.0
  - @baloise/design-system-tokens@12.3.0

## 12.2.0

### Patch Changes

- Updated dependencies [[`cc51ab42e`](https://github.com/baloise/design-system/commit/cc51ab42ef8601929612ca9fd6af5b096b27c500)]:
  - @baloise/design-system-fonts@12.2.0
  - @baloise/design-system-tokens@12.2.0

## Previous Versions

- [Older versions](https://github.com/baloise/design-system/blob/main/CHANGELOG_v12.md)
- [Rebranding versions](https://github.com/baloise/design-system/blob/main/CHANGELOG_NEXT.md)
