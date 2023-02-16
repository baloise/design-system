# @baloise/design-system-components-table

## 12.7.1

### Patch Changes

- Updated dependencies [[`d53ea8a46`](https://github.com/baloise-incubator/design-system/commit/d53ea8a46196415d856c090f1a1258a64e23cc12), [`22389ae9b`](https://github.com/baloise-incubator/design-system/commit/22389ae9bdab2d65d68d77b6e65ef24793bfca2f)]:
  - @baloise/design-system-components@12.7.1
  - @baloise/design-system-css@12.7.1

## 12.7.0

### Patch Changes

- Updated dependencies [[`b28384b99`](https://github.com/baloise-incubator/design-system/commit/b28384b99c5831d592aeadbaf2888850946cfb8a), [`f944a0729`](https://github.com/baloise-incubator/design-system/commit/f944a0729daeb96ee9a36affecf572a7955c1e24), [`297d9c08b`](https://github.com/baloise-incubator/design-system/commit/297d9c08b3b08c4dbcd4b12fa5e28e587168dc25)]:
  - @baloise/design-system-components@12.7.0
  - @baloise/design-system-css@12.7.0

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

- Updated dependencies [[`0819f32ee`](https://github.com/baloise-incubator/design-system/commit/0819f32eeb69d5c34bfdd8b70f2bbc7cac960276), [`a2258fd83`](https://github.com/baloise-incubator/design-system/commit/a2258fd8395160b3733af6e048e731b5ec52b02c), [`a899f8102`](https://github.com/baloise-incubator/design-system/commit/a899f8102e0e8f4dc6c0f2ce8ce155357de80f32), [`af1560a6e`](https://github.com/baloise-incubator/design-system/commit/af1560a6e5ed5abb3bc8ae0f4e7cb1507464634d), [`8bd20ac03`](https://github.com/baloise-incubator/design-system/commit/8bd20ac0313f799b0f98d5a029b62ba22bbf1929), [`76e3abe72`](https://github.com/baloise-incubator/design-system/commit/76e3abe726614424ad9fffaefe872dd8683b7b9d), [`78ce9869c`](https://github.com/baloise-incubator/design-system/commit/78ce9869c1e071905ef11add4db3c30846a451cd), [`26b23997c`](https://github.com/baloise-incubator/design-system/commit/26b23997c9c4fc72824a60fdf2928b1b82b62f26), [`d2819d0cf`](https://github.com/baloise-incubator/design-system/commit/d2819d0cf3394a4d2e52b677ebbedde1670ebb1a)]:
  - @baloise/design-system-components@12.6.0
  - @baloise/design-system-css@12.6.0

## 12.5.0

### Patch Changes

- Updated dependencies [[`1c76e1de0`](https://github.com/baloise-incubator/design-system/commit/1c76e1de09388d16ee50fee89e4611b36096860c), [`355fc4f3c`](https://github.com/baloise-incubator/design-system/commit/355fc4f3cd13f4708b4d1a0f219658c3214df253), [`5fdb9402f`](https://github.com/baloise-incubator/design-system/commit/5fdb9402fb1fc7105077144745311916c604892a), [`9f47b318c`](https://github.com/baloise-incubator/design-system/commit/9f47b318ca24af8de8dfc8c9ae1e612c231a1625), [`7bc33b76f`](https://github.com/baloise-incubator/design-system/commit/7bc33b76f9c8cf9a1fc028a638679e8eb77ac3d4), [`30409ba0d`](https://github.com/baloise-incubator/design-system/commit/30409ba0d883f0e129480287bf741554cd61391a), [`bb9c2c08b`](https://github.com/baloise-incubator/design-system/commit/bb9c2c08b799eb79a7a90ff0bfa3da448f5deb0c), [`b105c394d`](https://github.com/baloise-incubator/design-system/commit/b105c394d300f3f166c1d60effef3f737b34338b), [`7f6f171bc`](https://github.com/baloise-incubator/design-system/commit/7f6f171bc558ea1fdbb9abb90ecb2f8e6da28692)]:
  - @baloise/design-system-components@12.5.0
  - @baloise/design-system-css@12.5.0

## 12.4.1

### Patch Changes

- Updated dependencies [[`f98e22ae0`](https://github.com/baloise-incubator/design-system/commit/f98e22ae0db80f3b2ff911b101323e5f2c4e9cab)]:
  - @baloise/design-system-components@12.4.1
  - @baloise/design-system-css@12.4.1

## 12.4.0

### Patch Changes

- Updated dependencies [[`2ecc85d08`](https://github.com/baloise-incubator/design-system/commit/2ecc85d0862020d55d77c3b92eeb77891d82f4c2), [`a5e161045`](https://github.com/baloise-incubator/design-system/commit/a5e161045ffc22fc928ede080426f8fe36c7c006), [`a17ed35cf`](https://github.com/baloise-incubator/design-system/commit/a17ed35cfefa3dace356b0768ed9fb0fc405cb64), [`282355d61`](https://github.com/baloise-incubator/design-system/commit/282355d61f9e07882fca65a02b0108fc9e712397), [`2222bc3c4`](https://github.com/baloise-incubator/design-system/commit/2222bc3c483aed8af5b5d7c3d380626ce2d4ca99), [`2ecc85d08`](https://github.com/baloise-incubator/design-system/commit/2ecc85d0862020d55d77c3b92eeb77891d82f4c2)]:
  - @baloise/design-system-components@12.4.0
  - @baloise/design-system-css@12.4.0

## 12.3.0

### Minor Changes

- [#1047](https://github.com/baloise-incubator/design-system/pull/1047) [`d1316e075`](https://github.com/baloise-incubator/design-system/commit/d1316e075239ba9b5cac65f3368d47e4df1b17bd) Thanks [@hirsch88](https://github.com/hirsch88)! - rebrand ag-grid theme

### Patch Changes

- Updated dependencies [[`378807722`](https://github.com/baloise-incubator/design-system/commit/378807722525e73c38d0d50bca2c2850490b4ab7), [`e3e9e91fd`](https://github.com/baloise-incubator/design-system/commit/e3e9e91fd51f43511c64f1519998c12da237ce45), [`bb3cde835`](https://github.com/baloise-incubator/design-system/commit/bb3cde835680edad13c2e9520408b33fd5d33cc6), [`3b99a82c6`](https://github.com/baloise-incubator/design-system/commit/3b99a82c6e5e9ddfc1d89bbd3a4754dfb1cf6a1c), [`16cf1e903`](https://github.com/baloise-incubator/design-system/commit/16cf1e90337861aca94a3b55dff6781647bc8757)]:
  - @baloise/design-system-components@12.3.0
  - @baloise/design-system-css@12.3.0

## 12.2.0

### Patch Changes

- Updated dependencies [[`4d5021d82`](https://github.com/baloise-incubator/design-system/commit/4d5021d82549ee336b964e05720fd08fefc55c8f), [`cc51ab42e`](https://github.com/baloise-incubator/design-system/commit/cc51ab42ef8601929612ca9fd6af5b096b27c500), [`c403bbb36`](https://github.com/baloise-incubator/design-system/commit/c403bbb36f77a2a42722e7ba650568b87539e1f2)]:
  - @baloise/design-system-components@12.2.0
  - @baloise/design-system-css@12.2.0

## Previous Versions

- [Older versions](https://github.com/baloise-incubator/design-system/blob/next/CHANGELOG_v12.md)
- [Rebranding versions](https://github.com/baloise-incubator/design-system/blob/next/CHANGELOG_NEXT.md)
