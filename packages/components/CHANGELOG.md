# @baloise/design-system-components

## 12.7.1

### Patch Changes

- [#1141](https://github.com/baloise-incubator/design-system/pull/1141) [`d53ea8a46`](https://github.com/baloise-incubator/design-system/commit/d53ea8a46196415d856c090f1a1258a64e23cc12) Thanks [@hirsch88](https://github.com/hirsch88)! - fix globalscripts for stackblitz

- [#1136](https://github.com/baloise-incubator/design-system/pull/1136) [`22389ae9b`](https://github.com/baloise-incubator/design-system/commit/22389ae9bdab2d65d68d77b6e65ef24793bfca2f) Thanks [@hirsch88](https://github.com/hirsch88)! - adjust deprecation warning with a better path

- Updated dependencies []:
  - @baloise/design-system-css@12.7.1
  - @baloise/design-system-fonts@12.7.1
  - @baloise/design-system-icons@12.7.1
  - @baloise/design-system-tokens@12.7.1

## 12.7.0

### Minor Changes

- [#1126](https://github.com/baloise-incubator/design-system/pull/1126) [`f944a0729`](https://github.com/baloise-incubator/design-system/commit/f944a0729daeb96ee9a36affecf572a7955c1e24) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - add yellow, red, purple and green colors to the navigation level block

### Patch Changes

- [#1128](https://github.com/baloise-incubator/design-system/pull/1128) [`a47518315`](https://github.com/baloise-incubator/design-system/commit/b28384b99c5831d592aeadbaf2888850946cfb8a) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - update @baloise/web-app-utils to 3.10.0

- [#1127](https://github.com/baloise-incubator/design-system/pull/1127) [`297d9c08b`](https://github.com/baloise-incubator/design-system/commit/297d9c08b3b08c4dbcd4b12fa5e28e587168dc25) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - fix focus and blur events in bal-checkbox

- Updated dependencies []:
  - @baloise/design-system-css@12.7.0
  - @baloise/design-system-fonts@12.7.0
  - @baloise/design-system-icons@12.7.0
  - @baloise/design-system-tokens@12.7.0

## 12.6.0

### Minor Changes

- [#1098](https://github.com/baloise-incubator/design-system/pull/1098) [`78ce9869c`](https://github.com/baloise-incubator/design-system/commit/78ce9869c1e071905ef11add4db3c30846a451cd) Thanks [@hirsch88](https://github.com/hirsch88)! - add vscode support for html elements and remove docs components from the build

  - [Configuring VS Code](https://stenciljs.com/docs/docs-vscode#configuring-vs-code)

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

- [#1102](https://github.com/baloise-incubator/design-system/pull/1102) [`0819f32ee`](https://github.com/baloise-incubator/design-system/commit/0819f32eeb69d5c34bfdd8b70f2bbc7cac960276) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - replace hammerjs lib with contactjs

- [#1084](https://github.com/baloise-incubator/design-system/pull/1084) [`a2258fd83`](https://github.com/baloise-incubator/design-system/commit/a2258fd8395160b3733af6e048e731b5ec52b02c) Thanks [@hirsch88](https://github.com/hirsch88)! - refactor global styles and move them to the components

- [#1101](https://github.com/baloise-incubator/design-system/pull/1101) [`af1560a6e`](https://github.com/baloise-incubator/design-system/commit/af1560a6e5ed5abb3bc8ae0f4e7cb1507464634d) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - use tokens in the components instead of hard coded css values

- [#1109](https://github.com/baloise-incubator/design-system/pull/1109) [`8bd20ac03`](https://github.com/baloise-incubator/design-system/commit/8bd20ac0313f799b0f98d5a029b62ba22bbf1929) Thanks [@hirsch88](https://github.com/hirsch88)! - add deepReady support to check all nested child elements

- [#1110](https://github.com/baloise-incubator/design-system/pull/1110) [`76e3abe72`](https://github.com/baloise-incubator/design-system/commit/76e3abe726614424ad9fffaefe872dd8683b7b9d) Thanks [@hirsch88](https://github.com/hirsch88)! - add lazy loading to all image elements

- [#1114](https://github.com/baloise-incubator/design-system/pull/1114) [`d2819d0cf`](https://github.com/baloise-incubator/design-system/commit/d2819d0cf3394a4d2e52b677ebbedde1670ebb1a) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - fix select typeahead closing on click

- Updated dependencies [[`a899f8102`](https://github.com/baloise-incubator/design-system/commit/a899f8102e0e8f4dc6c0f2ce8ce155357de80f32), [`af1560a6e`](https://github.com/baloise-incubator/design-system/commit/af1560a6e5ed5abb3bc8ae0f4e7cb1507464634d), [`26b23997c`](https://github.com/baloise-incubator/design-system/commit/26b23997c9c4fc72824a60fdf2928b1b82b62f26)]:
  - @baloise/design-system-css@12.6.0
  - @baloise/design-system-tokens@12.6.0
  - @baloise/design-system-fonts@12.6.0
  - @baloise/design-system-icons@12.6.0

## 12.5.0

### Minor Changes

- [#1050](https://github.com/baloise-incubator/design-system/pull/1050) [`355fc4f3c`](https://github.com/baloise-incubator/design-system/commit/355fc4f3cd13f4708b4d1a0f219658c3214df253) Thanks [@hirsch88](https://github.com/hirsch88)! - add container design tokens

- [#1096](https://github.com/baloise-incubator/design-system/pull/1096) [`b105c394d`](https://github.com/baloise-incubator/design-system/commit/b105c394d300f3f166c1d60effef3f737b34338b) Thanks [@hirsch88](https://github.com/hirsch88)! - activate Germany for the bal-footer

### Patch Changes

- [#1095](https://github.com/baloise-incubator/design-system/pull/1095) [`1c76e1de0`](https://github.com/baloise-incubator/design-system/commit/1c76e1de09388d16ee50fee89e4611b36096860c) Thanks [@hirsch88](https://github.com/hirsch88)! - enable form data submitting for bal-file-upload

- [#1066](https://github.com/baloise-incubator/design-system/pull/1066) [`5fdb9402f`](https://github.com/baloise-incubator/design-system/commit/5fdb9402fb1fc7105077144745311916c604892a) Thanks [@hirsch88](https://github.com/hirsch88)! - fix esm paths in package.json

- [#1086](https://github.com/baloise-incubator/design-system/pull/1086) [`7bc33b76f`](https://github.com/baloise-incubator/design-system/commit/7bc33b76f9c8cf9a1fc028a638679e8eb77ac3d4) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - adjust value and placeholder color contrast for disabled fields

- [#1069](https://github.com/baloise-incubator/design-system/pull/1069) [`30409ba0d`](https://github.com/baloise-incubator/design-system/commit/30409ba0d883f0e129480287bf741554cd61391a) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - close modal on click outside of it

- [#1071](https://github.com/baloise-incubator/design-system/pull/1071) [`bb9c2c08b`](https://github.com/baloise-incubator/design-system/commit/bb9c2c08b799eb79a7a90ff0bfa3da448f5deb0c) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - align box to the top when there is a long text in the checkbox

- [#1092](https://github.com/baloise-incubator/design-system/pull/1092) [`7f6f171bc`](https://github.com/baloise-incubator/design-system/commit/7f6f171bc558ea1fdbb9abb90ecb2f8e6da28692) Thanks [@hirsch88](https://github.com/hirsch88)! - bal-select only validate input when leaving the component

- Updated dependencies [[`355fc4f3c`](https://github.com/baloise-incubator/design-system/commit/355fc4f3cd13f4708b4d1a0f219658c3214df253), [`9f47b318c`](https://github.com/baloise-incubator/design-system/commit/9f47b318ca24af8de8dfc8c9ae1e612c231a1625), [`7bc33b76f`](https://github.com/baloise-incubator/design-system/commit/7bc33b76f9c8cf9a1fc028a638679e8eb77ac3d4)]:
  - @baloise/design-system-tokens@12.5.0
  - @baloise/design-system-css@12.5.0
  - @baloise/design-system-fonts@12.5.0
  - @baloise/design-system-icons@12.5.0

## 12.4.1

### Patch Changes

- [#1064](https://github.com/baloise-incubator/design-system/pull/1064) [`f98e22ae0`](https://github.com/baloise-incubator/design-system/commit/f98e22ae0db80f3b2ff911b101323e5f2c4e9cab) Thanks [@hirsch88](https://github.com/hirsch88)! - fix ESM global script file

- Updated dependencies []:
  - @baloise/design-system-css@12.4.1
  - @baloise/design-system-fonts@12.4.1
  - @baloise/design-system-icons@12.4.1
  - @baloise/design-system-tokens@12.4.1

## 12.4.0

### Minor Changes

- [#1057](https://github.com/baloise-incubator/design-system/pull/1057) [`2ecc85d08`](https://github.com/baloise-incubator/design-system/commit/2ecc85d0862020d55d77c3b92eeb77891d82f4c2) Thanks [@hirsch88](https://github.com/hirsch88)! - add prop contentSpace to bal-list-item-accordion-body to set space normal or none

### Patch Changes

- [#1057](https://github.com/baloise-incubator/design-system/pull/1057) [`2ecc85d08`](https://github.com/baloise-incubator/design-system/commit/2ecc85d0862020d55d77c3b92eeb77891d82f4c2) Thanks [@hirsch88](https://github.com/hirsch88)! - fix border color issue on list accordion

- [#1055](https://github.com/baloise-incubator/design-system/pull/1055) [`a5e161045`](https://github.com/baloise-incubator/design-system/commit/a5e161045ffc22fc928ede080426f8fe36c7c006) Thanks [@hirsch88](https://github.com/hirsch88)! - bal-radio style updates. Centering dot, expand on mobile & on expanded adjust height of items to the biggest item.

- [#1058](https://github.com/baloise-incubator/design-system/pull/1058) [`a17ed35cf`](https://github.com/baloise-incubator/design-system/commit/a17ed35cfefa3dace356b0768ed9fb0fc405cb64) Thanks [@hirsch88](https://github.com/hirsch88)! - fix to set bal-body to ready to avoid a white webpage on page load

- [#1058](https://github.com/baloise-incubator/design-system/pull/1058) [`282355d61`](https://github.com/baloise-incubator/design-system/commit/282355d61f9e07882fca65a02b0108fc9e712397) Thanks [@hirsch88](https://github.com/hirsch88)! - set focus primary border on invalid form controls

- [#1049](https://github.com/baloise-incubator/design-system/pull/1049) [`2222bc3c4`](https://github.com/baloise-incubator/design-system/commit/2222bc3c483aed8af5b5d7c3d380626ce2d4ca99) Thanks [@hirsch88](https://github.com/hirsch88)! - resolve duplicated identifiers on stackblitz

- Updated dependencies [[`282355d61`](https://github.com/baloise-incubator/design-system/commit/282355d61f9e07882fca65a02b0108fc9e712397)]:
  - @baloise/design-system-css@12.4.0
  - @baloise/design-system-fonts@12.4.0
  - @baloise/design-system-icons@12.4.0
  - @baloise/design-system-tokens@12.4.0

## 12.3.0

### Minor Changes

- [#1040](https://github.com/baloise-incubator/design-system/pull/1040) [`e3e9e91fd`](https://github.com/baloise-incubator/design-system/commit/e3e9e91fd51f43511c64f1519998c12da237ce45) Thanks [@hirsch88](https://github.com/hirsch88)! - add min and max to bal-number-input

- [#973](https://github.com/baloise-incubator/design-system/pull/973) [`16cf1e903`](https://github.com/baloise-incubator/design-system/commit/16cf1e90337861aca94a3b55dff6781647bc8757) Thanks [@hirsch88](https://github.com/hirsch88)! - add missing t-shirt sizes to bal-heading

### Patch Changes

- [#973](https://github.com/baloise-incubator/design-system/pull/973) [`378807722`](https://github.com/baloise-incubator/design-system/commit/378807722525e73c38d0d50bca2c2850490b4ab7) Thanks [@hirsch88](https://github.com/hirsch88)! - refactoring of the bal-list and the bal-accordion

- [#1048](https://github.com/baloise-incubator/design-system/pull/1048) [`bb3cde835`](https://github.com/baloise-incubator/design-system/commit/bb3cde835680edad13c2e9520408b33fd5d33cc6) Thanks [@hirsch88](https://github.com/hirsch88)! - fix tab link on mobile select

- [#1032](https://github.com/baloise-incubator/design-system/pull/1032) [`3b99a82c6`](https://github.com/baloise-incubator/design-system/commit/3b99a82c6e5e9ddfc1d89bbd3a4754dfb1cf6a1c) Thanks [@hirsch88](https://github.com/hirsch88)! - to avoid global duplicated identifiers the global script gets loaded by the bal-app component

- Updated dependencies [[`89f87f6b2`](https://github.com/baloise-incubator/design-system/commit/89f87f6b2e2030558b284d94ced1f1d4d602becc)]:
  - @baloise/design-system-icons@12.3.0
  - @baloise/design-system-css@12.3.0
  - @baloise/design-system-fonts@12.3.0
  - @baloise/design-system-tokens@12.3.0

## 12.2.0

### Minor Changes

- [#1031](https://github.com/baloise-incubator/design-system/pull/1031) [`cc51ab42e`](https://github.com/baloise-incubator/design-system/commit/cc51ab42ef8601929612ca9fd6af5b096b27c500) Thanks [@hirsch88](https://github.com/hirsch88)! - use static file server as default for the custom font faces

### Patch Changes

- [#1001](https://github.com/baloise-incubator/design-system/pull/1001) [`4d5021d82`](https://github.com/baloise-incubator/design-system/commit/4d5021d82549ee336b964e05720fd08fefc55c8f) Thanks [@hirsch88](https://github.com/hirsch88)! - bal-spinner only load animated svg ones

- [#1023](https://github.com/baloise-incubator/design-system/pull/1023) [`c403bbb36`](https://github.com/baloise-incubator/design-system/commit/c403bbb36f77a2a42722e7ba650568b87539e1f2) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - radio and checkbox label change link color when disabled

- Updated dependencies [[`424f8dbb7`](https://github.com/baloise-incubator/design-system/commit/424f8dbb73be578684e085d35bec4c7774bb8dba), [`cc51ab42e`](https://github.com/baloise-incubator/design-system/commit/cc51ab42ef8601929612ca9fd6af5b096b27c500)]:
  - @baloise/design-system-icons@12.2.0
  - @baloise/design-system-fonts@12.2.0
  - @baloise/design-system-css@12.2.0
  - @baloise/design-system-tokens@12.2.0

## Previous Versions

- [Older versions](https://github.com/baloise-incubator/design-system/blob/next/CHANGELOG_v12.md)
- [Rebranding versions](https://github.com/baloise-incubator/design-system/blob/next/CHANGELOG_NEXT.md)