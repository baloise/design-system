# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.4.0](https://github.com/baloise/design-system/compare/v1.3.2...v1.4.0) (2021-06-23)


### Features

* **select:** add prop to turn off the movement ([7c6c495](https://github.com/baloise/design-system/commit/7c6c495424cb37371d4f8ca72a3bc7c00dbce6c8))
* **select:** add prop to turn off the movement ([abe717d](https://github.com/baloise/design-system/commit/abe717d8f1e15074cd44652c5d81617e70a67bcb))



## 1.3.1 (2021-06-21)





## [1.3.2](https://github.com/baloise/design-system/compare/v1.3.1...v1.3.2) (2021-06-22)


### Bug Fixes

* **radio:** add disabled to radio-group ([5d783b3](https://github.com/baloise/design-system/commit/5d783b3126c1e41b1e12ecf283f6a62ccbc4c51e))



# 1.3.0 (2021-06-16)





## [1.3.1](https://github.com/baloise/design-system/compare/v1.3.0...v1.3.1) (2021-06-21)


### Bug Fixes

* **slider:** add two-way binding ([a5f948d](https://github.com/baloise/design-system/commit/a5f948d36ba6db75cdc52c4a23de317d1d9ead8d))





# [1.3.0](https://github.com/baloise/design-system/compare/v1.2.3...v1.3.0) (2021-06-16)


### Features

* **footer:** add new footer component ([2d4cb02](https://github.com/baloise/design-system/commit/2d4cb02391c2fb4ff741cd83852e2a94fea03fdb))
* **hint:** auto detects the placement ([e83fdd3](https://github.com/baloise/design-system/commit/e83fdd3afbdb73ad427c82478fb96fa6faf914e6))
* **slider:** add new form component range slider ([7b89138](https://github.com/baloise/design-system/commit/7b89138bfea2d4f5a763eeb6c36f16fb75394708))


## [1.2.1](https://github.com/baloise/design-system/compare/v1.2.0...v1.2.1) (2021-06-09)


### Bug Fixes

* **text:** add bold style ([550d7a2](https://github.com/baloise/design-system/commit/550d7a22a1eb553910ca05a0337488e5fa074c0e))





# [1.2.0](https://github.com/baloise/design-system/compare/v1.1.1...v1.2.0) (2021-06-09)


### Features

* **data:** add edit feature ([d05fdae](https://github.com/baloise/design-system/commit/d05fdae977fe90fe0fbcb1ec1de06d385cf08c75))





## [1.1.1](https://github.com/baloise/design-system/compare/v1.1.0...v1.1.1) (2021-06-03)


### Bug Fixes

* **select:** change empty initial value to empty string ([793c9f4](https://github.com/baloise/design-system/commit/793c9f4fe9a10b964f0d7a2d61cc96219f635a98))





# [1.1.0](https://github.com/baloise/design-system/compare/v1.0.2...v1.1.0) (2021-06-02)


### Bug Fixes

* fix checkbox and radio label handling ([c20eba8](https://github.com/baloise/design-system/commit/c20eba824fa3941d30e61e3214956faac017b227))


### Features

* **table:** add new table component with ag-grid ([6c8d5bf](https://github.com/baloise/design-system/commit/6c8d5bfff372dc320ec58d6231e0dabe0a3e17b9))
* **tabs:** add new style o-steps ([0fb6fe4](https://github.com/baloise/design-system/commit/0fb6fe4e051c1de72257a0146651524a677233a7))


## 1.0.0 (2021-05-18)

### BREAKING CHANGES

- renamed to `Design System`
  - package `@baloise/ui-library` renamed to `@baloise/design-system-components`
  - package `@baloise/ui-library-vue` renamed to `@baloise/design-system-components-vue`
    - `baloiseUiLibrary` renamed to `BaloiseDesignSystem`
  - package `@baloise/ui-library-angular` renamed to `@baloise/design-system-components-angular`
    - `BalUiLibraryModule` renamed to `BaloiseDesignSystemModule`
  - package `@baloise/ui-library-testing` renamed to `@baloise/design-system-testing`
- new font package `@baloise/design-system-fonts`
  - follow the new style [instalation guide](https://baloise-design-system.vercel.app/components/essentials/styles.html)
- new icon package `@baloise/design-system-icons`
- removed vue-2 proxy libary
- removed unuesed `bal-teaser-step` component
- dependency updates for all the packages

### Features

- **design:** implement 8pixel spacing
- **bal-heading:** new component with a font cropping fix
- **bal-checkbox:** add new style examples
- **bal-radio:** add new style examples
- **bal-select:** improve focus handling with the keyboard and the cursor

### Bug Fixes

- add design part to the documentation

---

# UI-Library

Package moved to Baloise Design System components starting from Version 1.0.0.

# [4.17.0](https://github.com/baloise/design-system/compare/v4.16.0...v4.17.0) (2021-04-30)

### Bug Fixes

- **checkbox&radio:** remove label prop, use innerHTML instead ([5f9229a](https://github.com/baloise/design-system/commit/5f9229ad785144299bff5048167eb0d41bb29c0d))
- **IE11:** add additional fixes recommended by stencil ([1ed900e](https://github.com/baloise/design-system/commit/1ed900eae846d4c914236ec91fe5ad43c8ddbd72))
- **select:** fix mouse and keyboard selection ([f8cb5af](https://github.com/baloise/design-system/commit/f8cb5af3eef51df23a828ed334839708e217a4e1))

### Features

- **select:** add tags ([70eb8f1](https://github.com/baloise/design-system/commit/70eb8f112e67fc1065150805083ee62d0f4aa6aa))

## 4.15.2 (2021-04-20)

# [4.16.0](https://github.com/baloise/design-system/compare/v4.15.2...v4.16.0) (2021-04-30)

### Bug Fixes

- **checkbox&radio:** remove label prop, use innerHTML instead ([5f9229a](https://github.com/baloise/design-system/commit/5f9229ad785144299bff5048167eb0d41bb29c0d))
- **IE11:** add additional fixes recommended by stencil ([1ed900e](https://github.com/baloise/design-system/commit/1ed900eae846d4c914236ec91fe5ad43c8ddbd72))

### Features

- **select:** add tags ([70eb8f1](https://github.com/baloise/design-system/commit/70eb8f112e67fc1065150805083ee62d0f4aa6aa))

## [4.15.2](https://github.com/baloise/design-system/compare/v4.15.1...v4.15.2) (2021-04-20)

### Bug Fixes

- **select:** show label instead of value ([3856536](https://github.com/baloise/design-system/commit/3856536626e7a2551c9f42a8363aa8c13b1f15ff))

## [4.15.1](https://github.com/baloise/design-system/compare/v4.15.0...v4.15.1) (2021-04-19)

### Bug Fixes

- **select:** add scrollable to dropdown-menu ([7383b03](https://github.com/baloise/design-system/commit/7383b03a4a86f1359e1f8ffd414eccebc3699179))
- **select:** use initial value ([0719d5d](https://github.com/baloise/design-system/commit/0719d5dcd6f00e205929e567364aba20933de0df))

# 4.14.0 (2021-04-19)

# [4.15.0](https://github.com/baloise/design-system/compare/v4.14.0...v4.15.0) (2021-04-19)

### Features

- **button:** fix loading spinner for link and outlined ([45f204d](https://github.com/baloise/design-system/commit/45f204d8d801c72e99fa1af4eefce8dfb7d61058))

# [4.14.0](https://github.com/baloise/design-system/compare/v4.13.0...v4.14.0) (2021-04-19)

### Features

- **bal-button:** add name and value to button for form data ([89030a0](https://github.com/baloise/design-system/commit/89030a091a09608cec30f140b041dd1de912436e))

# 4.11.0 (2021-04-15)

# [4.13.0](https://github.com/baloise/design-system/compare/v4.12.0...v4.13.0) (2021-04-19)

### Features

- **icon:** add bal-icon-eye-closed ([c39cc82](https://github.com/baloise/design-system/commit/c39cc82340049a98370235eba0769fb16bbe640f))

# [4.12.0](https://github.com/baloise/design-system/compare/v4.11.0...v4.12.0) (2021-04-16)

### Bug Fixes

- **field:** removed text prop from the label. Use the slot instead ([acdaa74](https://github.com/baloise/design-system/commit/acdaa7418742ab7911e88ccc6e2eecce9c417236))

### Features

- **sheet:** add sheet component ([d674457](https://github.com/baloise/design-system/commit/d6744572ed24382576e4f9453f2295aff871a86f))
- **sheet:** add sheet component ([e800d76](https://github.com/baloise/design-system/commit/e800d7624d777e36d3d5a950d9b1ede5bcb5c475))
- adjust font size to 16px ([64f85b3](https://github.com/baloise/design-system/commit/64f85b38adfef0cc8fd477757499937f10521f68))
- **card:** add service card styles ([44b8fcd](https://github.com/baloise/design-system/commit/44b8fcd2ade7a2f2a3a682e899107ea56e56e8fc))
- **field:** add special validation style ([5678629](https://github.com/baloise/design-system/commit/5678629897475575f4bd0060bb32ca86a0f53e7a))

# 4.9.0 (2021-04-13)

# [4.11.0](https://github.com/baloise/design-system/compare/v4.10.0...v4.11.0) (2021-04-15)

### Features

- **spinner:** provide styles globally ([c0cb5fb](https://github.com/baloise/design-system/commit/c0cb5fb4a3103bf680e0b88323c554cb10161cd1))

# [4.10.0](https://github.com/baloise/design-system/compare/v4.9.1...v4.10.0) (2021-04-14)

### Bug Fixes

- **field:** removed text prop from the label. Use the slot instead ([acdaa74](https://github.com/baloise/design-system/commit/acdaa7418742ab7911e88ccc6e2eecce9c417236))

### Features

- **card:** add service card styles ([44b8fcd](https://github.com/baloise/design-system/commit/44b8fcd2ade7a2f2a3a682e899107ea56e56e8fc))
- **field:** add special validation style ([5678629](https://github.com/baloise/design-system/commit/5678629897475575f4bd0060bb32ca86a0f53e7a))

# 4.9.0 (2021-04-13)

## [4.9.1](https://github.com/baloise/design-system/compare/v4.9.0...v4.9.1) (2021-04-14)

**Note:** Version bump only for package root

# [4.9.0](https://github.com/baloise/design-system/compare/v4.8.2...v4.9.0) (2021-04-13)

### Features

- **checkbox:** add switch style ([1494552](https://github.com/baloise/design-system/commit/1494552a1a9aea3be5ce238b5e3e660a0f357064))

## [4.8.2](https://github.com/baloise/design-system/compare/v4.8.1...v4.8.2) (2021-04-12)

**Note:** Version bump only for package root

## [4.8.1](https://github.com/baloise/design-system/compare/v4.8.0...v4.8.1) (2021-03-31)

**Note:** Version bump only for package root

# [4.8.0](https://github.com/baloise/design-system/compare/v4.7.0...v4.8.0) (2021-03-29)

### Features

- **vue:** add useValidator helper function ([3ba7c2b](https://github.com/baloise/design-system/commit/3ba7c2b4e54bd2f7715858e0db6a79b8cbe08e07))

# [4.7.0](https://github.com/baloise/design-system/compare/v4.6.9...v4.7.0) (2021-03-29)

### Bug Fixes

- **checkbox:** improve event handling ([ecd0d1e](https://github.com/baloise/design-system/commit/ecd0d1e46a79e5af71f3eb0afdccfb1a0ca4a989))
- **radio:** fix click event on label and adjust focus style ([1dbb0e3](https://github.com/baloise/design-system/commit/1dbb0e3f8a1f0f130a4d044d0f0b0043dfc99ba2))
- **select:** only clear value on blur ([8ad6420](https://github.com/baloise/design-system/commit/8ad6420f19474265418ff0a501b6770988965f03))

### Features

- **vue:** add validation helpers ([8cad249](https://github.com/baloise/design-system/commit/8cad249ef8029fd9443c7301b97d151448b8eab5))

## 4.6.8 (2021-03-26)

## [4.6.9](https://github.com/baloise/design-system/compare/v4.6.8...v4.6.9) (2021-03-27)

**Note:** Version bump only for package root

## [4.6.8](https://github.com/baloise/design-system/compare/v4.6.7...v4.6.8) (2021-03-26)

### Bug Fixes

- **select:** add delay to clear input action ([51b9735](https://github.com/baloise/design-system/commit/51b9735605281412ea77842a8445cb74bad5ee3e))

## [4.6.7](https://github.com/baloise/design-system/compare/v4.6.6...v4.6.7) (2021-03-25)

**Note:** Version bump only for package root

## [4.6.6](https://github.com/baloise/design-system/compare/v4.6.5...v4.6.6) (2021-03-25)

### Bug Fixes

- **vue:** do not add vue 2 components globally ([08b5d89](https://github.com/baloise/design-system/commit/08b5d8915c79a2f77fd734ffdc123b6bb1c9c88c))

## [4.6.5](https://github.com/baloise/design-system/compare/v4.6.4...v4.6.5) (2021-03-25)

### Bug Fixes

- **vue:** improve plugin order ([3be7045](https://github.com/baloise/design-system/commit/3be704521972812230f35cfb780a1432cc828cca))
- **vue:** register components for vue 2 ([1a3c646](https://github.com/baloise/design-system/commit/1a3c646d17104989361666b74c82da2c41adfc71))

## 4.6.3 (2021-03-25)

## [4.6.4](https://github.com/baloise/design-system/compare/v4.6.3...v4.6.4) (2021-03-25)

### Bug Fixes

- **vue:** improve plugin order ([3be7045](https://github.com/baloise/design-system/commit/3be704521972812230f35cfb780a1432cc828cca))

## [4.6.3](https://github.com/baloise/design-system/compare/v4.6.2...v4.6.3) (2021-03-25)

### Bug Fixes

- **vue:** add vite option ([fbacc89](https://github.com/baloise/design-system/commit/fbacc894ca81bbb6f7722a326cd9a8083a566506))
- **vue:** change target & module ([11212bf](https://github.com/baloise/design-system/commit/11212bf715278bbd6da86920d79123ae38c6dfb2))

## 4.6.1 (2021-03-25)

## [4.6.2](https://github.com/baloise/design-system/compare/v4.6.1...v4.6.2) (2021-03-25)

### Bug Fixes

- **vue:** add vite option ([fbacc89](https://github.com/baloise/design-system/commit/fbacc894ca81bbb6f7722a326cd9a8083a566506))

## [4.6.1](https://github.com/baloise/design-system/compare/v4.6.0...v4.6.1) (2021-03-25)

### Bug Fixes

- **vetur:** use the vue component names instead of the web-components ([116d3e5](https://github.com/baloise/design-system/commit/116d3e5a12263e45327bcfd6cc6637d90b882245))
- **vetur:** use the vue component names instead of the web-components ([76074ac](https://github.com/baloise/design-system/commit/76074ac32581fac5c9589a873eca1e42414fccb8))

# [4.6.0](https://github.com/baloise/design-system/compare/v4.5.3...v4.6.0) (2021-03-24)

### Features

- **vue:** components are globally added to the vue app instance ([629c834](https://github.com/baloise/design-system/commit/629c8348bae972257ca56f2103b639020755722a))

## [4.5.3](https://github.com/baloise/design-system/compare/v4.5.2...v4.5.3) (2021-03-22)

### Bug Fixes

- **vue:** only set isCustomElement function if defined in the options ([e7be2f9](https://github.com/baloise/design-system/commit/e7be2f97c604c11653ec5962a3b164eae723f1ac))

## [4.5.2](https://github.com/baloise/design-system/compare/v4.5.1...v4.5.2) (2021-03-22)

### Bug Fixes

- **vue:** only set isCustomElement function if defined in the options ([81526f4](https://github.com/baloise/design-system/commit/81526f44a459be8b4f8f7eb3d38649dd232a4a55))

# [4.5.0](https://github.com/baloise/design-system/compare/v4.4.4...v4.5.0) (2021-03-19)

### Features

- **datepicker:** add default date ([eacc8c9](https://github.com/baloise/design-system/commit/eacc8c9827bbdf947b6e68b6d63056e18d05e1c6))

## [4.4.2](https://github.com/baloise/design-system/compare/v4.4.1...v4.4.2) (2021-03-16)

### Bug Fixes

- **field:** adjust font-size for checkbox & radio ([df4ebf8](https://github.com/baloise/design-system/commit/df4ebf837be7e8f7ef80880ef6b2e1b69c703cff))
- **field:** adjust font-size for label ([b419926](https://github.com/baloise/design-system/commit/b4199261fb3a99404d407d62413b183c71b87695))
- **field:** adjust font-size for the help message ([eed2bdf](https://github.com/baloise/design-system/commit/eed2bdfba3cc4471d23dc375f375799e5bb14d56))
- **field:** adjust font-size of the input field ([c97c54e](https://github.com/baloise/design-system/commit/c97c54ef98106706e4eb1e8ec624963164dbc7f2))

## [4.4.1](https://github.com/baloise/design-system/compare/v4.4.0...v4.4.1) (2021-03-13)

### Bug Fixes

- **vue:** use custom elements for vue 3 ([d43a7a8](https://github.com/baloise/design-system/commit/d43a7a86857e976b58f3a4c3334cc34ce3169298))

# [4.4.0](https://github.com/baloise/design-system/compare/v4.3.0...v4.4.0) (2021-03-13)

### Features

- **card:** add various padding styles ([5f1b732](https://github.com/baloise/design-system/commit/5f1b73247d5718e2510c3201ce4c3218946c5f81))
- **checkbox:** add html label possibility ([20f8b52](https://github.com/baloise/design-system/commit/20f8b5210b892d2c544c5ab906e31bef73e4717c))
- **footer:** add footer styles ([07578cf](https://github.com/baloise/design-system/commit/07578cf7e1b5f947631a16dbc14b989bdc54ca24))
- **footer:** add sticky footer ([de83def](https://github.com/baloise/design-system/commit/de83def3a7f355ba7d914ab6f86e8994da795298))
- **icon:** add baloise logo ([1a86f61](https://github.com/baloise/design-system/commit/1a86f617a06c9a57b3d1540c2f77bd13b98c93ac))
- **radio:** add html label possibility ([ca16d42](https://github.com/baloise/design-system/commit/ca16d427baf063cca6c1ff8cf5547022f7663588))
- **track-line:** add responsiveness and sizes ([a572fd4](https://github.com/baloise/design-system/commit/a572fd43a266d21037f79cd39578c615d0bb6901))

# [4.3.0](https://github.com/baloise/design-system/compare/v4.2.8...v4.3.0) (2021-03-11)

### Bug Fixes

- **dropdown:** close other dropdown when toggeling ([e1ec7b6](https://github.com/baloise/design-system/commit/e1ec7b699dc95478d954d3f2dbc6be355095d5fc))
- **navbar:** adjust brand alignment ([fa27fcf](https://github.com/baloise/design-system/commit/fa27fcfa2b1463d23d59745dcafb3b83ac968958))

### Features

- **utils:** add lodash as util lib ([99c91f6](https://github.com/baloise/design-system/commit/99c91f6a9f42d1354a413c10dee5c828a914eb48))

## [4.2.8](https://github.com/baloise/design-system/compare/v4.2.7...v4.2.8) (2021-03-10)

### Bug Fixes

- **input:** improve style for bottom border ([2bb06ae](https://github.com/baloise/design-system/commit/2bb06aea2fb6460ade0aef7fec1015673d74d3fd))

## [4.2.1](https://github.com/baloise/design-system/compare/v4.2.0...v4.2.1) (2021-03-01)

### Bug Fixes

- **datepicker:** change enter key behaviour ([5b10b70](https://github.com/baloise/design-system/commit/5b10b70609936adeb39a6c2645a5a518eb6fee6b))

# [4.2.0](https://github.com/baloise/design-system/compare/v4.1.2...v4.2.0) (2021-03-01)

### Bug Fixes

- **angular:** remove zone specific init parts ([a89a452](https://github.com/baloise/design-system/commit/a89a452f71a35d315803b78da3c55fb375eeee96))

### Features

- **angular:** add balDidRender event ([8371d19](https://github.com/baloise/design-system/commit/8371d1940837c9ff474cc975bdaa15ef14dc3770))

## [4.0.5](https://github.com/baloise/design-system/compare/v4.0.4...v4.0.5) (2021-02-27)

### Bug Fixes

- **select:** improve event handling ([cd2af28](https://github.com/baloise/design-system/commit/cd2af288ac17d573555e17e4db2cb259cb7fb075))

## [4.0.4](https://github.com/baloise/design-system/compare/v4.0.3...v4.0.4) (2021-02-25)

### Bug Fixes

- **navbar:** check if matchMedia is available ([6d06717](https://github.com/baloise/design-system/commit/6d067174e03dcf39843c9595a787acde3c2b27ab))

# [4.0.0](https://github.com/baloise/design-system/compare/v3.1.11...v4.0.0) (2021-02-23)

### Features

- **datepicker:** use iso date (yyyy-mm-dd) string
- **components:** attribute type was renamed to colors
- **components:** improve form events like balChange and balInput
- **angular:** add app initializer for better component loading
- **angular:** add services for toast and snackbar
- **utils:** remove package utils and move it to the core library
- **angular&vue:** use rollup for building es5 output
- **vue:** add vue 3.x.x support

## [3.1.8](https://github.com/baloise/design-system/compare/v3.1.7...v3.1.8) (2021-02-05)

### Bug Fixes

- **fonts:** add missing commas ([b0ba277](https://github.com/baloise/design-system/commit/b0ba277aeada346ace53d5febe6a928d6e14f3fd))

## [3.1.6](https://github.com/baloise/design-system/compare/v3.1.5...v3.1.6) (2021-02-05)

### Bug Fixes

- **font:** fix font paths ([c00ec32](https://github.com/baloise/design-system/commit/c00ec32254a7affd722db584fff4b50b3125cfd0))
- **input:** return the value with the change event ([c250c4b](https://github.com/baloise/design-system/commit/c250c4b7246473e577b60d8d17b1f9f9abcc5925))

## [3.1.5](https://github.com/baloise/design-system/compare/v3.1.4...v3.1.5) (2021-02-04)

### Bug Fixes

- **navbar:** check for navbar menu element when toggling ([39357b6](https://github.com/baloise/design-system/commit/39357b6bcf8fdc2bf563fbbe09fa740ed6711b7b))

## [3.1.4](https://github.com/baloise/design-system/compare/v3.1.3...v3.1.4) (2021-02-04)

### Bug Fixes

- **checkbox:** improve checked watch condition ([8499507](https://github.com/baloise/design-system/commit/8499507ebda877f4d42a8e8ba41e34878ce8f112))

## [3.1.3](https://github.com/baloise/design-system/compare/v3.1.2...v3.1.3) (2021-02-03)

### Bug Fixes

- **input:** add change event to the bal-input ([ad0f6ea](https://github.com/baloise/design-system/commit/ad0f6eaf81c25996915e76a8e27a302506ae0204))

# [3.1.0](https://github.com/baloise/design-system/compare/v3.0.6...v3.1.0) (2021-02-02)

### Features

- **angular:** change output types and return custom event detail ([8e0e945](https://github.com/baloise/design-system/commit/8e0e9452e78d11e220051ae381fba8a5be5599cf))

## [3.0.5](https://github.com/baloise/design-system/compare/v3.0.4...v3.0.5) (2021-02-02)

### Features

- **angular:** change output types and return custom event detail ([b1615af](https://github.com/baloise/design-system/commit/b1615af2d55568084933d641fccc2b8829af7f78))

## [2.5.1](https://github.com/baloise/design-system/compare/v2.5.0...v2.5.1) (2021-01-14)

### Bug Fixes

- **card:** add responsive styles for the action buttons ([a07ccdf](https://github.com/baloise/design-system/commit/a07ccdf7c9e5c66352f842ca5e9da14ee78a3591))
- **select:** improve search logic ([cf75055](https://github.com/baloise/design-system/commit/cf75055173f2b72d95837f0010930631bae70d9a))

# [2.5.0](https://github.com/baloise/design-system/compare/v2.4.1...v2.5.0) (2021-01-11)

### Bug Fixes

- remove named slots ([bf33511](https://github.com/baloise/design-system/commit/bf3351152b729591d0f91a96d3c5868abbccd0ab))
- some style fixes ([f9731f4](https://github.com/baloise/design-system/commit/f9731f456dd7eeff305914648a8598d73d129eaf))
- **field:** remove named slots to improve warpper lib support ([4ef9636](https://github.com/baloise/design-system/commit/4ef96365ce30fc5a6793ab4aad3e666a97e5a4b7))

### Features

- **table:** add table styles ([6b49a29](https://github.com/baloise/design-system/commit/6b49a297208b5f1682235aab596f9965665b1924))

## [2.4.1](https://github.com/baloise/design-system/compare/v2.4.0...v2.4.1) (2021-01-07)

### Bug Fixes

- **navbar:** remove slots to improve the usage of the wrapper libs ([578669d](https://github.com/baloise/design-system/commit/578669dbbf23366e85f38c5e9eb51d0e40e50943))

# [2.4.0](https://github.com/baloise/design-system/compare/v2.3.5...v2.4.0) (2021-01-05)

### Bug Fixes

- **select.accessor:** add ts-ignore ([e3e567d](https://github.com/baloise/design-system/commit/e3e567d15b7e473def317d2958c2f6fda6ecb0ec))

### Features

- **navbar:** fixed navbar and refactored tests description ([d7ba031](https://github.com/baloise/design-system/commit/d7ba031c0db6caa9d80b63d24906a51fab291a06))

## [2.3.4](https://github.com/baloise/design-system/compare/v2.0.3...v2.3.4) (2021-01-04)

### Features

- **angular:** added home page and improved styling ([11ea4a3](https://github.com/baloise/design-system/commit/11ea4a384003c80507c021a2f8b7baf478edb86c))
- added accessors and tests ([1036e7a](https://github.com/baloise/design-system/commit/1036e7a7e7fcc4e82c7c6c116006162f9880c444))

## [2.3.5](https://github.com/baloise/design-system/compare/v2.3.4...v2.3.5) (2021-01-05)

### Bug Fixes

- **icons:** adjust icon position ([ec5bdcf](https://github.com/baloise/design-system/commit/ec5bdcf48f2ae6aa157bf50ec8795761e56af129))

## [2.3.4](https://github.com/baloise/design-system/compare/v2.3.3...v2.3.4) (2021-01-04)

### Bug Fixes

- **navbar:** fix navbar dropdown colors + add example ([64197bc](https://github.com/baloise/design-system/commit/64197bc5cd50bd21cac1f717a29523ac2d8f51d3))

## [2.1.1](https://github.com/baloise/design-system/compare/v2.1.0...v2.1.1) (2020-12-23)

### Bug Fixes

- **utils:** refactor utils ([de8c21d](https://github.com/baloise/design-system/commit/de8c21d55c9641dc1ff89192011c6bd7bdaf9903))

# [2.1.0](https://github.com/baloise/design-system/compare/v2.0.3...v2.1.0) (2020-12-22)

### Features

- **utils:** add claim-number util ([669683f](https://github.com/baloise/design-system/commit/669683fd6bf1b27d27da0ab5f6983c4f1669c01e))
