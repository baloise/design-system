# @baloise/design-system-components-table

## 13.4.2

### Patch Changes

- Updated dependencies [[`66df512c5`](https://github.com/baloise/design-system/commit/66df512c5096f298a64dc38281abc8d00b519ce2)]:
  - @baloise/design-system-components@13.4.2
  - @baloise/design-system-css@13.4.2

## 13.4.1

### Patch Changes

- Updated dependencies [[`84dde1d96`](https://github.com/baloise/design-system/commit/84dde1d969ab8950014d08cee97d1dab1e9814c7), [`6860ebde0`](https://github.com/baloise/design-system/commit/6860ebde07f0f70bcfe333fe30f54a3bc4275766)]:
  - @baloise/design-system-components@13.4.1
  - @baloise/design-system-css@13.4.1

## 13.4.0

### Patch Changes

- Updated dependencies [[`b694c1b2a`](https://github.com/baloise/design-system/commit/b694c1b2ad21411ee630786bf8e25ea79622a3ae), [`f2a2b08f7`](https://github.com/baloise/design-system/commit/f2a2b08f724db69d6176746c12d7fad8f5869e36), [`f2a2b08f7`](https://github.com/baloise/design-system/commit/f2a2b08f724db69d6176746c12d7fad8f5869e36)]:
  - @baloise/design-system-components@13.4.0
  - @baloise/design-system-css@13.4.0

## 13.3.1

### Patch Changes

- Updated dependencies [[`25ed36e30`](https://github.com/baloise/design-system/commit/25ed36e30b28abd09724d29f1105b513006ec820), [`c8f5f769c`](https://github.com/baloise/design-system/commit/c8f5f769ca4deea96e81b2c29081ede241e6e971), [`c411fa37d`](https://github.com/baloise/design-system/commit/c411fa37da6d838f74d0a30b1807713a5109b9b4), [`e98005687`](https://github.com/baloise/design-system/commit/e9800568788a0066afd07dfe29056e6034768da4), [`907587a5b`](https://github.com/baloise/design-system/commit/907587a5bc7d3d7ad65210973bd71043c47e483f)]:
  - @baloise/design-system-components@13.3.1
  - @baloise/design-system-css@13.3.1

## 13.3.0

### Patch Changes

- Updated dependencies [[`d22e42d50`](https://github.com/baloise/design-system/commit/d22e42d5036b454d19159f8b5652b9b13613e824), [`040bea29e`](https://github.com/baloise/design-system/commit/040bea29e64dbd5a86cd528da486489c6581ecb3)]:
  - @baloise/design-system-components@13.3.0
  - @baloise/design-system-css@13.3.0

## 13.2.1

### Patch Changes

- Updated dependencies [[`d15d31f84`](https://github.com/baloise/design-system/commit/d15d31f847dd7dfd3b1d2e083cba058df1b37229), [`3daa7fd9e`](https://github.com/baloise/design-system/commit/3daa7fd9e13985bf731da4e65ac70775f388b97f)]:
  - @baloise/design-system-components@13.2.1
  - @baloise/design-system-css@13.2.1

## 13.2.0

### Patch Changes

- Updated dependencies [[`458564b23`](https://github.com/baloise/design-system/commit/458564b235adec25efd819a46ec4a0c6034d2221), [`33a99a667`](https://github.com/baloise/design-system/commit/33a99a667cb312e3bdc000baf3068a8f9f1b2b1c)]:
  - @baloise/design-system-components@13.2.0
  - @baloise/design-system-css@13.2.0

## 13.1.0

### Patch Changes

- Updated dependencies [[`8aba416f2`](https://github.com/baloise/design-system/commit/8aba416f22901fb8eb3cfb5d751ef1d144caa820), [`31fe21972`](https://github.com/baloise/design-system/commit/31fe219724109af104e02cba89d11166e6dc67cf), [`da3782269`](https://github.com/baloise/design-system/commit/da3782269b79a4524e897b82116fb64cd588b6ea), [`eb7c79c62`](https://github.com/baloise/design-system/commit/eb7c79c62554cdffaa781e77e85371899d01ed25)]:
  - @baloise/design-system-components@13.1.0
  - @baloise/design-system-css@13.1.0

## 13.0.0

### Major Changes

- [#806](https://github.com/baloise/design-system/pull/806) [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c) Thanks [@hirsch88](https://github.com/hirsch88)! - upgrade to `AG-Grid` v29. Breaking changes are the theming that changed from SASS variables to CSS variables.
  Moreover, our styles are just an extension to the `AG-Grid` styles.
  Therefor please import them before the Baloise styles also check out our [documentation](https://design.baloise.dev/?path=/docs/components-table--basic#aggrid)

  **before**

  ```scss
  @import '@baloise/design-system-components-table/scss';
  ```

  **after**

  ```scss
  @import 'ag-grid-community/styles/ag-grid';
  @import 'ag-grid-community/styles/ag-theme-alpine';
  @import '@baloise/design-system-components-table/css/design-system-table';
  ```

### Patch Changes

- Updated dependencies [[`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c), [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c), [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c), [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c), [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c), [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c), [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c), [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c), [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c), [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c), [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c), [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c), [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c)]:
  - @baloise/design-system-components@13.0.0
  - @baloise/design-system-css@13.0.0

## 12.13.1

### Patch Changes

- Updated dependencies [[`55e69fdf0`](https://github.com/baloise/design-system/commit/55e69fdf07a37c32a0f85c8f0a9bd492c0629f74), [`55e69fdf0`](https://github.com/baloise/design-system/commit/55e69fdf07a37c32a0f85c8f0a9bd492c0629f74)]:
  - @baloise/design-system-components@12.13.1
  - @baloise/design-system-css@12.13.1

## 12.13.0

### Patch Changes

- Updated dependencies [[`69115d725`](https://github.com/baloise/design-system/commit/69115d725815663c12a65e92d8f0f40f10c7eafe), [`69115d725`](https://github.com/baloise/design-system/commit/69115d725815663c12a65e92d8f0f40f10c7eafe), [`14990cf12`](https://github.com/baloise/design-system/commit/14990cf12e7925544d758ff77493488dba84a0b9), [`69115d725`](https://github.com/baloise/design-system/commit/69115d725815663c12a65e92d8f0f40f10c7eafe), [`69115d725`](https://github.com/baloise/design-system/commit/69115d725815663c12a65e92d8f0f40f10c7eafe), [`69115d725`](https://github.com/baloise/design-system/commit/69115d725815663c12a65e92d8f0f40f10c7eafe), [`69115d725`](https://github.com/baloise/design-system/commit/69115d725815663c12a65e92d8f0f40f10c7eafe), [`69115d725`](https://github.com/baloise/design-system/commit/69115d725815663c12a65e92d8f0f40f10c7eafe)]:
  - @baloise/design-system-components@12.13.0
  - @baloise/design-system-css@12.13.0

## 12.12.0

### Patch Changes

- Updated dependencies [[`c0b500bf7`](https://github.com/baloise-incubator/design-system/commit/c0b500bf7f48cc3a81041c0ccd8aec60d546c04a), [`b0992bdc5`](https://github.com/baloise-incubator/design-system/commit/b0992bdc55f4ba98f770745546b770bcebde9056), [`bf9634662`](https://github.com/baloise-incubator/design-system/commit/bf963466275cfaeffba82c2310c9b2ff690eb2ef), [`302c0f7c4`](https://github.com/baloise-incubator/design-system/commit/302c0f7c46d3fdf4da730a5f5ff8f22e9ee74267), [`73bb7e173`](https://github.com/baloise-incubator/design-system/commit/73bb7e1738bfd215cb8b47fce04fdaba5ba26e09), [`f9144f085`](https://github.com/baloise-incubator/design-system/commit/f9144f08528edd3dc58a17366a4426198b42410f)]:
  - @baloise/design-system-components@12.12.0
  - @baloise/design-system-css@12.12.0

## 12.11.0

### Patch Changes

- Updated dependencies [[`0952e9121`](https://github.com/baloise/design-system/commit/0952e9121d45dffb7697995a3fa9ad14fff5e173), [`2e3437cca`](https://github.com/baloise/design-system/commit/2e3437ccadcb52774266d43085488d28a72783b6), [`f167ba3a6`](https://github.com/baloise/design-system/commit/f167ba3a648c8a26b1554baee0ed5ff4def044f3), [`884b91285`](https://github.com/baloise/design-system/commit/884b91285953a2f8b078b0e4a69b43649bc3af3e), [`74b7736bb`](https://github.com/baloise/design-system/commit/74b7736bbc5a8a37b4871f5184216cb3cd6f6a5c)]:
  - @baloise/design-system-components@12.11.0
  - @baloise/design-system-css@12.11.0

## 12.10.0

### Patch Changes

- [#1224](https://github.com/baloise/design-system/pull/1224) [`a95bddbf7`](https://github.com/baloise/design-system/commit/a95bddbf7c19fcf36f43828f4348e2a8ae77914c) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - handle rendering of the empty values in AgGrid cells

- Updated dependencies [[`9fdf176ac`](https://github.com/baloise/design-system/commit/9fdf176ac82e6ac378200cf83928c98e61a3fe9e), [`ee0a5094d`](https://github.com/baloise/design-system/commit/ee0a5094d700197f6e110ded0607964a1bb8646f), [`2d3ade3e5`](https://github.com/baloise/design-system/commit/2d3ade3e54cf919f4f2ad9323b5be8cd683a1c64)]:
  - @baloise/design-system-components@12.10.0
  - @baloise/design-system-css@12.10.0

## 12.9.0

### Patch Changes

- Updated dependencies [[`78b00ba20`](https://github.com/baloise/design-system/commit/78b00ba2042172ea23fe8827a60292c167d38e4c), [`47c1e79a2`](https://github.com/baloise/design-system/commit/47c1e79a2cf955948a08acf6fbae936a08d44479), [`78b00ba20`](https://github.com/baloise/design-system/commit/78b00ba2042172ea23fe8827a60292c167d38e4c), [`c89fd1312`](https://github.com/baloise/design-system/commit/c89fd13125a928195442e6ee22e28632d66dd95d), [`c2db6927d`](https://github.com/baloise/design-system/commit/c2db6927dfe29c2942d6dacb78a39d8930364064), [`855e6cbf5`](https://github.com/baloise/design-system/commit/855e6cbf5f23a822ac6c3e59a528154730ae6913), [`78b00ba20`](https://github.com/baloise/design-system/commit/78b00ba2042172ea23fe8827a60292c167d38e4c), [`8a0dbc5af`](https://github.com/baloise/design-system/commit/8a0dbc5af1347904a6d79e317408ebea056aac1a), [`fff4c722a`](https://github.com/baloise/design-system/commit/fff4c722a0993ef59c088157286ec1114fc1fde1), [`78b00ba20`](https://github.com/baloise/design-system/commit/78b00ba2042172ea23fe8827a60292c167d38e4c)]:
  - @baloise/design-system-css@12.9.0
  - @baloise/design-system-components@12.9.0

## 12.8.2

### Patch Changes

- Updated dependencies [[`ab352d875`](https://github.com/baloise/design-system/commit/ab352d8755332f0c8adc4801e3d5c7c391bb8f27)]:
  - @baloise/design-system-components@12.8.2
  - @baloise/design-system-css@12.8.2

## 12.8.1

### Patch Changes

- [#1182](https://github.com/baloise/design-system/pull/1182) [`38f0a7fd4`](https://github.com/baloise/design-system/commit/38f0a7fd492927a49e811e1b0461ed39ebe057d4) Thanks [@hirsch88](https://github.com/hirsch88)! - adjust package.json to npm workspace structure and move contact.js to components dependencies

- Updated dependencies [[`38f0a7fd4`](https://github.com/baloise/design-system/commit/38f0a7fd492927a49e811e1b0461ed39ebe057d4)]:
  - @baloise/design-system-components@12.8.1
  - @baloise/design-system-css@12.8.1

## 12.8.0

### Patch Changes

- Updated dependencies [[`6f99084d9`](https://github.com/baloise/design-system/commit/6f99084d946491231bc8b4fe7d479f5dd3c86c8d), [`d3ab0905d`](https://github.com/baloise/design-system/commit/d3ab0905d868e9a32a69d028efb544b28bbd5796), [`a3a7c5f8f`](https://github.com/baloise/design-system/commit/a3a7c5f8f5953d3344fec22f63484e9cc6515b8f), [`b230a279d`](https://github.com/baloise/design-system/commit/b230a279d61c5928570b39e537c0a7ba18df8677)]:
  - @baloise/design-system-components@12.8.0
  - @baloise/design-system-css@12.8.0

## 12.7.1

### Patch Changes

- Updated dependencies [[`d53ea8a46`](https://github.com/baloise/design-system/commit/d53ea8a46196415d856c090f1a1258a64e23cc12), [`22389ae9b`](https://github.com/baloise/design-system/commit/22389ae9bdab2d65d68d77b6e65ef24793bfca2f)]:
  - @baloise/design-system-components@12.7.1
  - @baloise/design-system-css@12.7.1

## 12.7.0

### Patch Changes

- Updated dependencies [[`b28384b99`](https://github.com/baloise/design-system/commit/b28384b99c5831d592aeadbaf2888850946cfb8a), [`f944a0729`](https://github.com/baloise/design-system/commit/f944a0729daeb96ee9a36affecf572a7955c1e24), [`297d9c08b`](https://github.com/baloise/design-system/commit/297d9c08b3b08c4dbcd4b12fa5e28e587168dc25)]:
  - @baloise/design-system-components@12.7.0
  - @baloise/design-system-css@12.7.0

## 12.6.0

### Minor Changes

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

- Updated dependencies [[`0819f32ee`](https://github.com/baloise/design-system/commit/0819f32eeb69d5c34bfdd8b70f2bbc7cac960276), [`a2258fd83`](https://github.com/baloise/design-system/commit/a2258fd8395160b3733af6e048e731b5ec52b02c), [`a899f8102`](https://github.com/baloise/design-system/commit/a899f8102e0e8f4dc6c0f2ce8ce155357de80f32), [`af1560a6e`](https://github.com/baloise/design-system/commit/af1560a6e5ed5abb3bc8ae0f4e7cb1507464634d), [`8bd20ac03`](https://github.com/baloise/design-system/commit/8bd20ac0313f799b0f98d5a029b62ba22bbf1929), [`76e3abe72`](https://github.com/baloise/design-system/commit/76e3abe726614424ad9fffaefe872dd8683b7b9d), [`78ce9869c`](https://github.com/baloise/design-system/commit/78ce9869c1e071905ef11add4db3c30846a451cd), [`26b23997c`](https://github.com/baloise/design-system/commit/26b23997c9c4fc72824a60fdf2928b1b82b62f26), [`d2819d0cf`](https://github.com/baloise/design-system/commit/d2819d0cf3394a4d2e52b677ebbedde1670ebb1a)]:
  - @baloise/design-system-components@12.6.0
  - @baloise/design-system-css@12.6.0

## 12.5.0

### Patch Changes

- Updated dependencies [[`1c76e1de0`](https://github.com/baloise/design-system/commit/1c76e1de09388d16ee50fee89e4611b36096860c), [`355fc4f3c`](https://github.com/baloise/design-system/commit/355fc4f3cd13f4708b4d1a0f219658c3214df253), [`5fdb9402f`](https://github.com/baloise/design-system/commit/5fdb9402fb1fc7105077144745311916c604892a), [`9f47b318c`](https://github.com/baloise/design-system/commit/9f47b318ca24af8de8dfc8c9ae1e612c231a1625), [`7bc33b76f`](https://github.com/baloise/design-system/commit/7bc33b76f9c8cf9a1fc028a638679e8eb77ac3d4), [`30409ba0d`](https://github.com/baloise/design-system/commit/30409ba0d883f0e129480287bf741554cd61391a), [`bb9c2c08b`](https://github.com/baloise/design-system/commit/bb9c2c08b799eb79a7a90ff0bfa3da448f5deb0c), [`b105c394d`](https://github.com/baloise/design-system/commit/b105c394d300f3f166c1d60effef3f737b34338b), [`7f6f171bc`](https://github.com/baloise/design-system/commit/7f6f171bc558ea1fdbb9abb90ecb2f8e6da28692)]:
  - @baloise/design-system-components@12.5.0
  - @baloise/design-system-css@12.5.0

## 12.4.1

### Patch Changes

- Updated dependencies [[`f98e22ae0`](https://github.com/baloise/design-system/commit/f98e22ae0db80f3b2ff911b101323e5f2c4e9cab)]:
  - @baloise/design-system-components@12.4.1
  - @baloise/design-system-css@12.4.1

## 12.4.0

### Patch Changes

- Updated dependencies [[`2ecc85d08`](https://github.com/baloise/design-system/commit/2ecc85d0862020d55d77c3b92eeb77891d82f4c2), [`a5e161045`](https://github.com/baloise/design-system/commit/a5e161045ffc22fc928ede080426f8fe36c7c006), [`a17ed35cf`](https://github.com/baloise/design-system/commit/a17ed35cfefa3dace356b0768ed9fb0fc405cb64), [`282355d61`](https://github.com/baloise/design-system/commit/282355d61f9e07882fca65a02b0108fc9e712397), [`2222bc3c4`](https://github.com/baloise/design-system/commit/2222bc3c483aed8af5b5d7c3d380626ce2d4ca99), [`2ecc85d08`](https://github.com/baloise/design-system/commit/2ecc85d0862020d55d77c3b92eeb77891d82f4c2)]:
  - @baloise/design-system-components@12.4.0
  - @baloise/design-system-css@12.4.0

## 12.3.0

### Minor Changes

- [#1047](https://github.com/baloise/design-system/pull/1047) [`d1316e075`](https://github.com/baloise/design-system/commit/d1316e075239ba9b5cac65f3368d47e4df1b17bd) Thanks [@hirsch88](https://github.com/hirsch88)! - rebrand ag-grid theme

### Patch Changes

- Updated dependencies [[`378807722`](https://github.com/baloise/design-system/commit/378807722525e73c38d0d50bca2c2850490b4ab7), [`e3e9e91fd`](https://github.com/baloise/design-system/commit/e3e9e91fd51f43511c64f1519998c12da237ce45), [`bb3cde835`](https://github.com/baloise/design-system/commit/bb3cde835680edad13c2e9520408b33fd5d33cc6), [`3b99a82c6`](https://github.com/baloise/design-system/commit/3b99a82c6e5e9ddfc1d89bbd3a4754dfb1cf6a1c), [`16cf1e903`](https://github.com/baloise/design-system/commit/16cf1e90337861aca94a3b55dff6781647bc8757)]:
  - @baloise/design-system-components@12.3.0
  - @baloise/design-system-css@12.3.0

## 12.2.0

### Patch Changes

- Updated dependencies [[`4d5021d82`](https://github.com/baloise/design-system/commit/4d5021d82549ee336b964e05720fd08fefc55c8f), [`cc51ab42e`](https://github.com/baloise/design-system/commit/cc51ab42ef8601929612ca9fd6af5b096b27c500), [`c403bbb36`](https://github.com/baloise/design-system/commit/c403bbb36f77a2a42722e7ba650568b87539e1f2)]:
  - @baloise/design-system-components@12.2.0
  - @baloise/design-system-css@12.2.0

## Previous Versions

- [Older versions](https://github.com/baloise/design-system/blob/main/CHANGELOG_v12.md)
- [Rebranding versions](https://github.com/baloise/design-system/blob/main/CHANGELOG_NEXT.md)
