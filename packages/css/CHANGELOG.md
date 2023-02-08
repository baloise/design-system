# @baloise/design-system-css

## 12.6.0

### Minor Changes

- [#1084](https://github.com/baloise-incubator/design-system/pull/1084) [`a899f8102`](https://github.com/baloise-incubator/design-system/commit/a899f8102e0e8f4dc6c0f2ce8ce155357de80f32) Thanks [@hirsch88](https://github.com/hirsch88)! - new styles for the Thematic Break (Horizontal Rule) element

  ```html
  <hr />
  // or without the @baloise/desing-system-css/css/structure
  <hr class="is-divider" />
  ```

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

- Updated dependencies [[`af1560a6e`](https://github.com/baloise-incubator/design-system/commit/af1560a6e5ed5abb3bc8ae0f4e7cb1507464634d), [`26b23997c`](https://github.com/baloise-incubator/design-system/commit/26b23997c9c4fc72824a60fdf2928b1b82b62f26)]:
  - @baloise/design-system-tokens@12.6.0
  - @baloise/design-system-fonts@12.6.0

## 12.5.0

### Minor Changes

- [#1050](https://github.com/baloise-incubator/design-system/pull/1050) [`355fc4f3c`](https://github.com/baloise-incubator/design-system/commit/355fc4f3cd13f4708b4d1a0f219658c3214df253) Thanks [@hirsch88](https://github.com/hirsch88)! - add container design tokens

### Patch Changes

- [#1081](https://github.com/baloise-incubator/design-system/pull/1081) [`9f47b318c`](https://github.com/baloise-incubator/design-system/commit/9f47b318ca24af8de8dfc8c9ae1e612c231a1625) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - add css styles for success, danger and warning state to the select and file upload

- [#1086](https://github.com/baloise-incubator/design-system/pull/1086) [`7bc33b76f`](https://github.com/baloise-incubator/design-system/commit/7bc33b76f9c8cf9a1fc028a638679e8eb77ac3d4) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - adjust value and placeholder color contrast for disabled fields

- Updated dependencies [[`355fc4f3c`](https://github.com/baloise-incubator/design-system/commit/355fc4f3cd13f4708b4d1a0f219658c3214df253)]:
  - @baloise/design-system-tokens@12.5.0
  - @baloise/design-system-fonts@12.5.0

## 12.4.1

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-fonts@12.4.1
  - @baloise/design-system-tokens@12.4.1

## 12.4.0

### Patch Changes

- [#1058](https://github.com/baloise-incubator/design-system/pull/1058) [`282355d61`](https://github.com/baloise-incubator/design-system/commit/282355d61f9e07882fca65a02b0108fc9e712397) Thanks [@hirsch88](https://github.com/hirsch88)! - set focus primary border on invalid form controls

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

- Updated dependencies [[`cc51ab42e`](https://github.com/baloise-incubator/design-system/commit/cc51ab42ef8601929612ca9fd6af5b096b27c500)]:
  - @baloise/design-system-fonts@12.2.0
  - @baloise/design-system-tokens@12.2.0

## Previous Versions

- [Older versions](https://github.com/baloise-incubator/design-system/blob/next/CHANGELOG_v12.md)
- [Rebranding versions](https://github.com/baloise-incubator/design-system/blob/next/CHANGELOG_NEXT.md)
