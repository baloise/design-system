# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [12.1.0](https://github.com/baloise-incubator/design-system/compare/v12.0.0...v12.1.0) (2022-12-20)

### Features

* add static file server for fonts ([40eb3ef](https://github.com/baloise-incubator/design-system/commit/40eb3ef0003da73f2215055539dfb938fbc3aaea))
* **icons:** add location-target icon ([41eb766](https://github.com/baloise-incubator/design-system/commit/41eb7665e0acd1135b9eb5b78c46672789a78dae))

### Bug Fixes

* **angular:** only listen to host balChanges ([ecd3e2a](https://github.com/baloise-incubator/design-system/commit/ecd3e2aa7f56eef27ef6472800b4ad2d3a6f35cf))
* **angular:** only listen to host balChanges ([b444de8](https://github.com/baloise-incubator/design-system/commit/b444de84422fd635209fc79f67b536051cea6fee))
* **bal-input-slider:** round value for line drawing ([693f5a4](https://github.com/baloise-incubator/design-system/commit/693f5a41e38ed82da283f76244a30ffafa9e4078))
* **bal-number-input:** allow decimal point for de, be and lu ([ae9cf13](https://github.com/baloise-incubator/design-system/commit/ae9cf1384e54ad82547f0606df94162e7f6918f8))
* **bal-number-input:** allow negative numbers ([fa100bb](https://github.com/baloise-incubator/design-system/commit/fa100bb853a17746127a9e56587e9756ae9d52ce))
* **datepicker:** next mont calculation. Closes [#995](https://github.com/baloise-incubator/design-system/issues/995) ([40ddca3](https://github.com/baloise-incubator/design-system/commit/40ddca376c62e043286ce97c5c86cbc549fcbbd1))
* fixes [#952](https://github.com/baloise-incubator/design-system/issues/952) bal-card-title with bal-tag in bal-card aligned ([2894f00](https://github.com/baloise-incubator/design-system/commit/2894f00137ca0e6b5406941a01e1a1848a339243))
* **navbar:** adjust min padding for mobile ([28e429d](https://github.com/baloise-incubator/design-system/commit/28e429ded7fa7f06ca7d1e1807240cbfb86f9efd))
* **navbar:** adjust position of content ([4c9a880](https://github.com/baloise-incubator/design-system/commit/4c9a8804788984de0c5f3432a0930575c332834d))
* **select:** if empty string value set empty array for the rawValue ([595e110](https://github.com/baloise-incubator/design-system/commit/595e11002ae9d8b3a28d50c11fac92a6e33206ce))
* **select:** improve hover style ([4ce3676](https://github.com/baloise-incubator/design-system/commit/4ce3676dc0c4edbef20608bc4dae72a170ab1e99))

### Performance Improvements

* **popover:** reduce rendering by using componentWillLoad ([a99648f](https://github.com/baloise-incubator/design-system/commit/a99648fcc35f0683785266f87c6d2b66ba6950b9))


## [12.0.0](https://github.com/baloise-incubator/design-system/compare/v11.0.18...v12.0.0) (2022-12-12)

Follow the migration guide [Migration from 11.x to 12.x](https://baloise-design-system.vercel.app/?path=/story/development-migration-migration-from-11-x-to-12-x--page)

### ⚠ BREAKING CHANGES

- Stencil update to v2.20.0
- Cypress update to v11.2.0
- Load Custom Icons
- Lazy Loading Component Styles
- Design Token Reduction
- CSS-Helper Reduction
- Separation of bal-number-input & bal-input

### Features

* **carousel:** new component, which replaces the slider components
* **icons:** add location-target icon ([41eb766](https://github.com/baloise-incubator/design-system/commit/41eb7665e0acd1135b9eb5b78c46672789a78dae))

### Bug Fixes

* **accordion:** not remove hidden content from the DOM ([1f52f95](https://github.com/baloise-incubator/design-system/commit/1f52f95fe38b845cce866025653c9183cbf61c5b))

## [11.0.17](https://github.com/baloise-incubator/design-system/compare/v11.0.16...v11.0.17) (2022-12-01)


### Bug Fixes

* **select:** remote do not validate and return input value on blur ([5618faa](https://github.com/baloise-incubator/design-system/commit/5618faa7c8f6e7cfdc6fca7ae7796dbe82333bcb))
* **select:** remote typeahead display initial value ([3e61a90](https://github.com/baloise-incubator/design-system/commit/3e61a902848ebed392f00dc1085e6e76498280c2))
* **tabs:** adjust label for steps to start at 1 ([600260e](https://github.com/baloise-incubator/design-system/commit/600260ea5eb2111ddfe2f3bedf297f0344ba13fd))

## [11.0.16](https://github.com/baloise-incubator/design-system/compare/v11.0.15...v11.0.16) (2022-11-30)

## [11.0.15](https://github.com/baloise-incubator/design-system/compare/v11.0.14...v11.0.15) (2022-11-29)


### Bug Fixes

* **bal-radio:** change link color to inverted when selected ([f1068ed](https://github.com/baloise-incubator/design-system/commit/f1068edeb069c048853a32e73a1f0e8db215ccec))
* **bal-tabs:** scope bal-tab-items ([67f1fd6](https://github.com/baloise-incubator/design-system/commit/67f1fd6ed27dfd32a4af91d1551aacf4d6230f3a))
* **bal-upload:** duplicate file message not showing ([ad0a617](https://github.com/baloise-incubator/design-system/commit/ad0a617a39fe73a16922cb126c665d38545e21b5))
* **datepicker:** disable next month button if max is reached ([86bd195](https://github.com/baloise-incubator/design-system/commit/86bd19568c562c913bed6cbafaab968af6e17cd0))
* fix depracted fields in navbar,stage and bal-list ([6607cdd](https://github.com/baloise-incubator/design-system/commit/6607cddf6978bc0c1a3462119bbe58933e522549))
* **html:** remove duplicated overflow settings ([3bb9e2f](https://github.com/baloise-incubator/design-system/commit/3bb9e2ff6fff255693246c34f6bfa66792fbfde7))
* **html:** set overflow to overflow-x:hidden only ([3a801b0](https://github.com/baloise-incubator/design-system/commit/3a801b04b52fc0ddab07086ad7836c868acac8f1))
* **list:** ignore inverted when it is undefined ([d1046b7](https://github.com/baloise-incubator/design-system/commit/d1046b7da955e0909581e495dcc38efcf2777d6e))
* **sass:** remove ~ of the imports. Closes [#895](https://github.com/baloise-incubator/design-system/issues/895) ([d55ea5b](https://github.com/baloise-incubator/design-system/commit/d55ea5be1152f9afde6fe73424580db920b69061))
* **tabs:** set index ([2abe233](https://github.com/baloise-incubator/design-system/commit/2abe23315b4b214e5f67a5c25cc745c170229483))

## [11.0.14](https://github.com/baloise-incubator/design-system/compare/v11.0.13...v11.0.14) (2022-11-22)


### Bug Fixes

* fixes [#787](https://github.com/baloise-incubator/design-system/issues/787) add visualLevel for bal-list-item-title ([f157772](https://github.com/baloise-incubator/design-system/commit/f157772bddf32f611e93a6942cf799b9d7dd927d))
* isEmpty handler of bal-radio to work with false value as well ([c09b68c](https://github.com/baloise-incubator/design-system/commit/c09b68c3dc6d89ed7173f0a2906332ecd76cdaf6))

## [11.0.13](https://github.com/baloise-incubator/design-system/compare/v11.0.12...v11.0.13) (2022-11-17)


### Bug Fixes

* **angular-focus-directive:** call setFocus method and update docs ([8b7a858](https://github.com/baloise-incubator/design-system/commit/8b7a8589c7a380f7122dd4e66df144a399fd7367))
* **bal-upload:** show duplicated file message ([9c32892](https://github.com/baloise-incubator/design-system/commit/9c32892a14d015f0da951a6e56afd77b7474f287))
* fix stroy book of radio boxes to use labbel-hidden property instead of depricated is-empty ([f051f47](https://github.com/baloise-incubator/design-system/commit/f051f474f535ed58305b306d0bb5d40303d0d8cd))
* fix usage of depricated is-empty to work in bal-radio ([910a5ef](https://github.com/baloise-incubator/design-system/commit/910a5ef5fec9956fe5fd6b154d4595336f6aebc0))
* **logo:** load svg on resize ([6e6cc3d](https://github.com/baloise-incubator/design-system/commit/6e6cc3dd4cd7bd9e45f112cecc09df46b69b11dc))
* **select:** initial value update. Closes [#872](https://github.com/baloise-incubator/design-system/issues/872) ([6139bb3](https://github.com/baloise-incubator/design-system/commit/6139bb3d488567cc3e9774d1677d94d56110fcde))
* update @baloise/web-app-utils to solve safari 13 issues ([cecc461](https://github.com/baloise-incubator/design-system/commit/cecc4611ebe2344a83305d56c74aaf5ca48f0533))
* update @baloise/web-app-utils to solve safari 13 issues ([04f0da0](https://github.com/baloise-incubator/design-system/commit/04f0da0b696a3eac6686f43458e1c2c41753d386))
* update @baloise/web-app-utils to solve safari 13 issues ([43c5b13](https://github.com/baloise-incubator/design-system/commit/43c5b132b4089346a132dbbda34c15b86860735a))


### Performance Improvements

* exclude unused tokens and splitted helpers form base style ([4e4710e](https://github.com/baloise-incubator/design-system/commit/4e4710e28cb77e2cb25bddab3cbfc8a91207d81e))
* reduce web-app-utils imports ([7c3a21f](https://github.com/baloise-incubator/design-system/commit/7c3a21f3d995c3096c0ef23498936ddd6d9b9e3b))

## [11.0.12](https://github.com/baloise-incubator/design-system/compare/v11.0.11...v11.0.12) (2022-11-03)

## [11.0.11](https://github.com/baloise-incubator/design-system/compare/v11.0.10...v11.0.11) (2022-11-03)

### Performance Improvements

* lazy load component styles ([53ea546](https://github.com/baloise-incubator/design-system/commit/53ea5460bd46e1a4525fccccdd5c039cad8938eb))

## [11.0.10](https://github.com/baloise-incubator/design-system/compare/v11.0.9...v11.0.10) (2022-10-31)


### Bug Fixes

* remove source maps ([9ac37b1](https://github.com/baloise-incubator/design-system/commit/9ac37b13e4d634d43b51c4467e7174249f542c31))

### Performance Improvements

* lazy load component styles ([2f90efe](https://github.com/baloise-incubator/design-system/commit/2f90efe0d920c2bb9ab4db54ca2b89b43f6ea33c))
* load css when needed ([87a739e](https://github.com/baloise-incubator/design-system/commit/87a739ec5f68c92f4294f80052e8ff5748ae4e13))

## [11.0.9](https://github.com/baloise-incubator/design-system/compare/v11.0.5...v11.0.9) (2022-10-28)


### Features

* **carousel:** add controls small & large ([75e9bea](https://github.com/baloise-incubator/design-system/commit/75e9bea99737fddfc52cec31cc455e0a568853cd))
* **carousel:** add new component ([80596ca](https://github.com/baloise-incubator/design-system/commit/80596cae323c6d46d4cf6ee8a4a94738fea144c9))

## [11.0.5](https://github.com/baloise-incubator/design-system/compare/v11.0.3...v11.0.5) (2022-10-25)

## [11.0.3](https://github.com/baloise-incubator/design-system/compare/v11.0.1...v11.0.3) (2022-10-24)


### Performance Improvements

* **icons:** only import the icons of the DS ([9f6bb59](https://github.com/baloise-incubator/design-system/commit/9f6bb59d225a72409a82b212853745436ed93716))

## [11.0.1](https://github.com/baloise-incubator/design-system/compare/v10.24.10...v11.0.1) (2022-10-20)


### Bug Fixes

* **cart:** empty color will not add a css class ([e69b4a3](https://github.com/baloise-incubator/design-system/commit/e69b4a3d56543fe60ec806336d10c61a6fc65074))
* change to visibility instead of display ([54efef5](https://github.com/baloise-incubator/design-system/commit/54efef5e2028cbda55c6e6b50648f405781d99c4))
* load used DS icons as default ([e8a139f](https://github.com/baloise-incubator/design-system/commit/e8a139ff9d3d453eba6d3ffcff61e2a4be65588f))
* **navbar:** add target prop to navbar-brand. Closes [#769](https://github.com/baloise-incubator/design-system/issues/769) ([d0b3555](https://github.com/baloise-incubator/design-system/commit/d0b3555294c3c296ca5d15d4c021bb03dc043054))
* **navbar:** update touch view. Closes [#770](https://github.com/baloise-incubator/design-system/issues/770) ([24a87c3](https://github.com/baloise-incubator/design-system/commit/24a87c3e00b32d51085ae90e2ebfa9b247c5be48))
* **navigation:** add missing tracking ([20815a7](https://github.com/baloise-incubator/design-system/commit/20815a7c130ab5c9fe2aaf4d2381293e29c1e214))
* update stencil config to solve angular issue ([189b62c](https://github.com/baloise-incubator/design-system/commit/189b62c969a4f29365c3c80b68137969f5e15f84))


### Performance Improvements

* use custom bundles and do not ship doc components ([b5da0b6](https://github.com/baloise-incubator/design-system/commit/b5da0b676aa467b22754233a748ba83a986eb284))

## [10.24.10](https://github.com/baloise-incubator/design-system/compare/v10.24.9...v10.24.10) (2022-10-17)


### Bug Fixes

* **icons:** add missing tiktok icon ([7c04896](https://github.com/baloise-incubator/design-system/commit/7c048963a7a42863409f573e09e2a5f72fbf31a6))
* remove padding of the fieldset ([6390d75](https://github.com/baloise-incubator/design-system/commit/6390d75a01a7770ea5a05a23f2f23b16d7bd217c))

### Performance Improvements

* **icons:** don't load all icons. let the user decide ([3357e78](https://github.com/baloise-incubator/design-system/commit/3357e7842781363a89df67576c570172306fe8a3))

## [10.24.9](https://github.com/baloise-incubator/design-system/compare/v10.24.7...v10.24.9) (2022-10-11)


### Features

* **bal-navigation-menu-list-item:** added the target attr for grey menu list headline ([ddc8339](https://github.com/baloise-incubator/design-system/commit/ddc8339de57fd27bae24d41f3a2bac022b0ab08c))
* **bal-navigation-menu-list-item:** added the target attribute for items from grey lists ([773362e](https://github.com/baloise-incubator/design-system/commit/773362e2f1face1585ecbeae0c41ab0413900030))


### Bug Fixes

* adjust small spacing value to 0.75rem. Closes [#706](https://github.com/baloise-incubator/design-system/issues/706) ([2bdc29a](https://github.com/baloise-incubator/design-system/commit/2bdc29af2ed232d871a73ec5f754c49f77dceb97))
* **angular:** add dismissAll method to the toast and snackbar service. Closes [#703](https://github.com/baloise-incubator/design-system/issues/703) ([4e9070a](https://github.com/baloise-incubator/design-system/commit/4e9070ad37e6a441c045cc39f7e91bfb09ea26cb))
* **bal-stage:** adjusted content width mobile to full-width ([#684](https://github.com/baloise-incubator/design-system/issues/684)) ([65bcec9](https://github.com/baloise-incubator/design-system/commit/65bcec9c9c3835b3253151906f12d6b12fa18c1f))
* **bal-tabs:** create separate numberation for o-tabs based on independent varaiable ([461b5f9](https://github.com/baloise-incubator/design-system/commit/461b5f9eca198e66929d27ee1cbdd7ed173ef0fd))
* improve migration guide ([6eae447](https://github.com/baloise-incubator/design-system/commit/6eae4478450e1aefe3ddc497b632f806bce01a84))
* improve notification toast and snackbar stories ([5d684ca](https://github.com/baloise-incubator/design-system/commit/5d684ca17032136ba3f5bce7cf2bb5663ad9765e))
* **tabs:** add missing target prop. Closes [#700](https://github.com/baloise-incubator/design-system/issues/700) ([808d52e](https://github.com/baloise-incubator/design-system/commit/808d52e02bdf51bbf87dbd14e10ef184a1a93080))
* **tabs:** adjust the numbering of the steps. Closes [#586](https://github.com/baloise-incubator/design-system/issues/586) ([dda1799](https://github.com/baloise-incubator/design-system/commit/dda1799b6f7adde17ac36e6fd62a2f60e338b43d))
* **tabs:** break tab label on vertical. Closes [#688](https://github.com/baloise-incubator/design-system/issues/688) ([1f62ddf](https://github.com/baloise-incubator/design-system/commit/1f62ddfecd781ab912c2c70839248b85a9c9393b))

## [10.24.7](https://github.com/baloise-incubator/design-system/compare/v10.24.5...v10.24.7) (2022-10-06)

## 10.24.5 (2022-10-05)



## [11.0.18](https://github.com/baloise-incubator/design-system/compare/v11.0.17...v11.0.18) (2022-12-05)


### Bug Fixes

* adjust nested package versions ([ab25072](https://github.com/baloise-incubator/design-system/commit/ab250724bad392d031d3750f1633e659932047bc))



## [11.0.17](https://github.com/baloise-incubator/design-system/compare/v11.0.16...v11.0.17) (2022-12-01)


### Bug Fixes

* **select:** remote do not validate and return input value on blur ([5618faa](https://github.com/baloise-incubator/design-system/commit/5618faa7c8f6e7cfdc6fca7ae7796dbe82333bcb))
* **select:** remote typeahead display initial value ([3e61a90](https://github.com/baloise-incubator/design-system/commit/3e61a902848ebed392f00dc1085e6e76498280c2))
* **tabs:** adjust label for steps to start at 1 ([600260e](https://github.com/baloise-incubator/design-system/commit/600260ea5eb2111ddfe2f3bedf297f0344ba13fd))



## [11.0.16](https://github.com/baloise-incubator/design-system/compare/v11.0.15...v11.0.16) (2022-11-30)

**Note:** Version bump only for package root





## [11.0.15](https://github.com/baloise-incubator/design-system/compare/v11.0.14...v11.0.15) (2022-11-29)


### Bug Fixes

* **bal-radio:** change link color to inverted when selected ([f1068ed](https://github.com/baloise-incubator/design-system/commit/f1068edeb069c048853a32e73a1f0e8db215ccec))
* **bal-tabs:** scope bal-tab-items ([67f1fd6](https://github.com/baloise-incubator/design-system/commit/67f1fd6ed27dfd32a4af91d1551aacf4d6230f3a))
* **bal-upload:** duplicate file message not showing ([ad0a617](https://github.com/baloise-incubator/design-system/commit/ad0a617a39fe73a16922cb126c665d38545e21b5))
* **datepicker:** disable next month button if max is reached ([86bd195](https://github.com/baloise-incubator/design-system/commit/86bd19568c562c913bed6cbafaab968af6e17cd0))
* fix depracted fields in navbar,stage and bal-list ([6607cdd](https://github.com/baloise-incubator/design-system/commit/6607cddf6978bc0c1a3462119bbe58933e522549))
* fixes [#787](https://github.com/baloise-incubator/design-system/issues/787) add visualLevel for bal-list-item-title ([f157772](https://github.com/baloise-incubator/design-system/commit/f157772bddf32f611e93a6942cf799b9d7dd927d))
* **html:** remove duplicated overflow settings ([3bb9e2f](https://github.com/baloise-incubator/design-system/commit/3bb9e2ff6fff255693246c34f6bfa66792fbfde7))
* **html:** set overflow to overflow-x:hidden only ([3a801b0](https://github.com/baloise-incubator/design-system/commit/3a801b04b52fc0ddab07086ad7836c868acac8f1))
* isEmpty handler of bal-radio to work with false value as well ([c09b68c](https://github.com/baloise-incubator/design-system/commit/c09b68c3dc6d89ed7173f0a2906332ecd76cdaf6))
* **list:** ignore inverted when it is undefined ([d1046b7](https://github.com/baloise-incubator/design-system/commit/d1046b7da955e0909581e495dcc38efcf2777d6e))
* **sass:** remove ~ of the imports. Closes [#895](https://github.com/baloise-incubator/design-system/issues/895) ([d55ea5b](https://github.com/baloise-incubator/design-system/commit/d55ea5be1152f9afde6fe73424580db920b69061))
* **tabs:** set index ([2abe233](https://github.com/baloise-incubator/design-system/commit/2abe23315b4b214e5f67a5c25cc745c170229483))

## [11.0.13](https://github.com/baloise-incubator/design-system/compare/v11.0.12...v11.0.13) (2022-11-17)

### Bug Fixes

* **angular-focus-directive:** call setFocus method and update docs ([8b7a858](https://github.com/baloise-incubator/design-system/commit/8b7a8589c7a380f7122dd4e66df144a399fd7367))
* **bal-upload:** show duplicated file message ([9c32892](https://github.com/baloise-incubator/design-system/commit/9c32892a14d015f0da951a6e56afd77b7474f287))
* fix stroy book of radio boxes to use labbel-hidden property instead of depricated is-empty ([f051f47](https://github.com/baloise-incubator/design-system/commit/f051f474f535ed58305b306d0bb5d40303d0d8cd))
* fix usage of depricated is-empty to work in bal-radio ([910a5ef](https://github.com/baloise-incubator/design-system/commit/910a5ef5fec9956fe5fd6b154d4595336f6aebc0))
* **logo:** load svg on resize ([6e6cc3d](https://github.com/baloise-incubator/design-system/commit/6e6cc3dd4cd7bd9e45f112cecc09df46b69b11dc))
* **select:** initial value update. Closes [#872](https://github.com/baloise-incubator/design-system/issues/872) ([6139bb3](https://github.com/baloise-incubator/design-system/commit/6139bb3d488567cc3e9774d1677d94d56110fcde))
* update @baloise/web-app-utils to solve safari 13 issues ([cecc461](https://github.com/baloise-incubator/design-system/commit/cecc4611ebe2344a83305d56c74aaf5ca48f0533))
* update @baloise/web-app-utils to solve safari 13 issues ([04f0da0](https://github.com/baloise-incubator/design-system/commit/04f0da0b696a3eac6686f43458e1c2c41753d386))
* update @baloise/web-app-utils to solve safari 13 issues ([43c5b13](https://github.com/baloise-incubator/design-system/commit/43c5b132b4089346a132dbbda34c15b86860735a))


### Performance Improvements

* reduce web-app-utils imports ([7c3a21f](https://github.com/baloise-incubator/design-system/commit/7c3a21f3d995c3096c0ef23498936ddd6d9b9e3b))

## [11.0.12](https://github.com/baloise-incubator/design-system/compare/v11.0.10...v11.0.12) (2022-11-03)

## [11.0.10](https://github.com/baloise-incubator/design-system/compare/v11.0.5...v11.0.10) (2022-10-31)

## [11.0.5](https://github.com/baloise-incubator/design-system/compare/v11.0.1...v11.0.5) (2022-10-25)

## [11.0.1](https://github.com/baloise-incubator/design-system/compare/v10.24.10...v11.0.1) (2022-10-20)


### Bug Fixes

* **cart:** empty color will not add a css class ([e69b4a3](https://github.com/baloise-incubator/design-system/commit/e69b4a3d56543fe60ec806336d10c61a6fc65074))
* change to visibility instead of display ([54efef5](https://github.com/baloise-incubator/design-system/commit/54efef5e2028cbda55c6e6b50648f405781d99c4))
* **navbar:** add target prop to navbar-brand. Closes [#769](https://github.com/baloise-incubator/design-system/issues/769) ([d0b3555](https://github.com/baloise-incubator/design-system/commit/d0b3555294c3c296ca5d15d4c021bb03dc043054))
* **navbar:** update touch view. Closes [#770](https://github.com/baloise-incubator/design-system/issues/770) ([24a87c3](https://github.com/baloise-incubator/design-system/commit/24a87c3e00b32d51085ae90e2ebfa9b247c5be48))
* **navigation:** add missing tracking ([20815a7](https://github.com/baloise-incubator/design-system/commit/20815a7c130ab5c9fe2aaf4d2381293e29c1e214))
* update stencil config to solve angular issue ([189b62c](https://github.com/baloise-incubator/design-system/commit/189b62c969a4f29365c3c80b68137969f5e15f84))


### Performance Improvements

* use custom bundles and do not ship doc components ([b5da0b6](https://github.com/baloise-incubator/design-system/commit/b5da0b676aa467b22754233a748ba83a986eb284))


## [11.0.14](https://github.com/baloise-incubator/design-system/compare/v11.0.13...v11.0.14) (2022-11-22)

### Bug Fixes

* **angular-focus-directive:** call setFocus method and update docs ([8b7a858](https://github.com/baloise-incubator/design-system/commit/8b7a8589c7a380f7122dd4e66df144a399fd7367))
* **bal-upload:** show duplicated file message ([9c32892](https://github.com/baloise-incubator/design-system/commit/9c32892a14d015f0da951a6e56afd77b7474f287))
* fix stroy book of radio boxes to use labbel-hidden property instead of depricated is-empty ([f051f47](https://github.com/baloise-incubator/design-system/commit/f051f474f535ed58305b306d0bb5d40303d0d8cd))
* fix usage of depricated is-empty to work in bal-radio ([910a5ef](https://github.com/baloise-incubator/design-system/commit/910a5ef5fec9956fe5fd6b154d4595336f6aebc0))
* fixes [#787](https://github.com/baloise-incubator/design-system/issues/787) add visualLevel for bal-list-item-title ([f157772](https://github.com/baloise-incubator/design-system/commit/f157772bddf32f611e93a6942cf799b9d7dd927d))
* **logo:** load svg on resize ([6e6cc3d](https://github.com/baloise-incubator/design-system/commit/6e6cc3dd4cd7bd9e45f112cecc09df46b69b11dc))
* **select:** initial value update. Closes [#872](https://github.com/baloise-incubator/design-system/issues/872) ([6139bb3](https://github.com/baloise-incubator/design-system/commit/6139bb3d488567cc3e9774d1677d94d56110fcde))
* update @baloise/web-app-utils to solve safari 13 issues ([cecc461](https://github.com/baloise-incubator/design-system/commit/cecc4611ebe2344a83305d56c74aaf5ca48f0533))
* update @baloise/web-app-utils to solve safari 13 issues ([04f0da0](https://github.com/baloise-incubator/design-system/commit/04f0da0b696a3eac6686f43458e1c2c41753d386))
* update @baloise/web-app-utils to solve safari 13 issues ([43c5b13](https://github.com/baloise-incubator/design-system/commit/43c5b132b4089346a132dbbda34c15b86860735a))
* update web-app-utils ([c1dc7e3](https://github.com/baloise-incubator/design-system/commit/c1dc7e35250293a9f55fabbcb2ff33507e13b7f7))


### Performance Improvements

* reduce web-app-utils imports ([7c3a21f](https://github.com/baloise-incubator/design-system/commit/7c3a21f3d995c3096c0ef23498936ddd6d9b9e3b))

## [11.0.12](https://github.com/baloise-incubator/design-system/compare/v11.0.10...v11.0.12) (2022-11-03)

## 11.0.10 (2022-10-31)



## [11.0.13](https://github.com/baloise-incubator/design-system/compare/v11.0.12...v11.0.13) (2022-11-17)


### Bug Fixes

* **angular-focus-directive:** call setFocus method and update docs ([8b7a858](https://github.com/baloise-incubator/design-system/commit/8b7a8589c7a380f7122dd4e66df144a399fd7367))
* **bal-upload:** show duplicated file message ([9c32892](https://github.com/baloise-incubator/design-system/commit/9c32892a14d015f0da951a6e56afd77b7474f287))
* **logo:** load svg on resize ([6e6cc3d](https://github.com/baloise-incubator/design-system/commit/6e6cc3dd4cd7bd9e45f112cecc09df46b69b11dc))
* **select:** initial value update. Closes [#872](https://github.com/baloise-incubator/design-system/issues/872) ([6139bb3](https://github.com/baloise-incubator/design-system/commit/6139bb3d488567cc3e9774d1677d94d56110fcde))
* update @baloise/web-app-utils to solve safari 13 issues ([cecc461](https://github.com/baloise-incubator/design-system/commit/cecc4611ebe2344a83305d56c74aaf5ca48f0533))
* update @baloise/web-app-utils to solve safari 13 issues ([04f0da0](https://github.com/baloise-incubator/design-system/commit/04f0da0b696a3eac6686f43458e1c2c41753d386))
* update @baloise/web-app-utils to solve safari 13 issues ([43c5b13](https://github.com/baloise-incubator/design-system/commit/43c5b132b4089346a132dbbda34c15b86860735a))


### Performance Improvements

* reduce web-app-utils imports ([7c3a21f](https://github.com/baloise-incubator/design-system/commit/7c3a21f3d995c3096c0ef23498936ddd6d9b9e3b))

## 11.0.10 (2022-10-31)



## [11.0.12](https://github.com/baloise-incubator/design-system/compare/v11.0.11...v11.0.12) (2022-11-03)

### Bug Fixes

* **logo:** animated is shown once ([db310b6](https://github.com/baloise-incubator/design-system/commit/db310b67f5de37603500a0be3f4ccf2e8bc6cb83))

## [11.0.11](https://github.com/baloise-incubator/design-system/compare/v11.0.10...v11.0.11) (2022-11-03)

### Bug Fixes

* add missing configs to the BalConfig ([6cec2d6](https://github.com/baloise-incubator/design-system/commit/6cec2d62904ca1cbb84c9535a9aea80c16c307f8))
* **bal-tabs:** call move line function when accordion with tabs in it opens ([c79b71e](https://github.com/baloise-incubator/design-system/commit/c79b71efc083da4d9dd3204e3af96a355d611c57))
* **icons:** add missing arrow icons ([d430cb4](https://github.com/baloise-incubator/design-system/commit/d430cb4d6b7ac3daf096b326799cd872b9bbfb9b))
* **radio:** group elements sends focus and blur event. Closes [#623](https://github.com/baloise-incubator/design-system/issues/623) ([d044693](https://github.com/baloise-incubator/design-system/commit/d0446935804b88b765d2c1c0879519b2e909fbb7))
* **select:** typeahead + remote accept initial value. Closes [#603](https://github.com/baloise-incubator/design-system/issues/603), [#819](https://github.com/baloise-incubator/design-system/issues/819) ([5f11bb9](https://github.com/baloise-incubator/design-system/commit/5f11bb9dd8a9d93b09f48bba5fed4280ee7d3078))


### Performance Improvements

* **logo:** add lazy loading ([d4d7820](https://github.com/baloise-incubator/design-system/commit/d4d78201bdb85464b5f7450d8feb590ab3224d62))
* **spinner:** load animation date after first render ([f928030](https://github.com/baloise-incubator/design-system/commit/f92803014b9fc3cc9477953b1b08ca6ef39927b0))

## [11.0.10](https://github.com/baloise-incubator/design-system/compare/v11.0.9...v11.0.10) (2022-10-31)

### Bug Fixes

* bal-modal isClosable now hides close on top, fixes [#806](https://github.com/baloise-incubator/design-system/issues/806) ([122e90a](https://github.com/baloise-incubator/design-system/commit/122e90ade7fbe36ae80cdd552e05837063ad417c))
* change length of chucks ([6e7ebb2](https://github.com/baloise-incubator/design-system/commit/6e7ebb297314efe386d66fde7d0ff6d7878a9b0c))
* use conditional rendering instead of css ([e866e14](https://github.com/baloise-incubator/design-system/commit/e866e141c58ba7bb75275bfca4eff01b621dec4a))

## [11.0.1](https://github.com/baloise-incubator/design-system/compare/v10.24.10...v11.0.1) (2022-10-20)

### Bug Fixes

* **cart:** empty color will not add a css class ([e69b4a3](https://github.com/baloise-incubator/design-system/commit/e69b4a3d56543fe60ec806336d10c61a6fc65074))
* change to visibility instead of display ([54efef5](https://github.com/baloise-incubator/design-system/commit/54efef5e2028cbda55c6e6b50648f405781d99c4))
* check if window, document or navigator are existing ([37ecc10](https://github.com/baloise-incubator/design-system/commit/37ecc104dba6bd5f041e194a0112cd45371b7384))
* **navbar:** add target prop to navbar-brand. Closes [#769](https://github.com/baloise-incubator/design-system/issues/769) ([d0b3555](https://github.com/baloise-incubator/design-system/commit/d0b3555294c3c296ca5d15d4c021bb03dc043054))
* **navbar:** update touch view. Closes [#770](https://github.com/baloise-incubator/design-system/issues/770) ([24a87c3](https://github.com/baloise-incubator/design-system/commit/24a87c3e00b32d51085ae90e2ebfa9b247c5be48))
* **navigation:** add missing tracking ([20815a7](https://github.com/baloise-incubator/design-system/commit/20815a7c130ab5c9fe2aaf4d2381293e29c1e214))
* update stencil config to solve angular issue ([189b62c](https://github.com/baloise-incubator/design-system/commit/189b62c969a4f29365c3c80b68137969f5e15f84))

### Performance Improvements

* use custom bundles and do not ship doc components ([b5da0b6](https://github.com/baloise-incubator/design-system/commit/b5da0b676aa467b22754233a748ba83a986eb284))

## [10.24.10](https://github.com/baloise-incubator/design-system/compare/v10.24.9...v10.24.10) (2022-10-17)

### Bug Fixes

* **icons:** add missing tiktok icon ([7c04896](https://github.com/baloise-incubator/design-system/commit/7c048963a7a42863409f573e09e2a5f72fbf31a6))
* remove padding of the fieldset ([6390d75](https://github.com/baloise-incubator/design-system/commit/6390d75a01a7770ea5a05a23f2f23b16d7bd217c))

## [10.24.9](https://github.com/baloise-incubator/design-system/compare/v10.24.7...v10.24.9) (2022-10-11)

### Features

* **bal-navigation-menu-list-item:** added the target attr for grey menu list headline ([ddc8339](https://github.com/baloise-incubator/design-system/commit/ddc8339de57fd27bae24d41f3a2bac022b0ab08c))
* **bal-navigation-menu-list-item:** added the target attribute for items from grey lists ([773362e](https://github.com/baloise-incubator/design-system/commit/773362e2f1face1585ecbeae0c41ab0413900030))

### Bug Fixes

* adjust small spacing value to 0.75rem. Closes [#706](https://github.com/baloise-incubator/design-system/issues/706) ([2bdc29a](https://github.com/baloise-incubator/design-system/commit/2bdc29af2ed232d871a73ec5f754c49f77dceb97))
* **angular:** add dismissAll method to the toast and snackbar service. Closes [#703](https://github.com/baloise-incubator/design-system/issues/703) ([4e9070a](https://github.com/baloise-incubator/design-system/commit/4e9070ad37e6a441c045cc39f7e91bfb09ea26cb))
* **bal-stage:** adjusted content width mobile to full-width ([#684](https://github.com/baloise-incubator/design-system/issues/684)) ([65bcec9](https://github.com/baloise-incubator/design-system/commit/65bcec9c9c3835b3253151906f12d6b12fa18c1f))
* **bal-tabs:** create separate numberation for o-tabs based on independent varaiable ([461b5f9](https://github.com/baloise-incubator/design-system/commit/461b5f9eca198e66929d27ee1cbdd7ed173ef0fd))
* improve migration guide ([6eae447](https://github.com/baloise-incubator/design-system/commit/6eae4478450e1aefe3ddc497b632f806bce01a84))
* improve notification toast and snackbar stories ([5d684ca](https://github.com/baloise-incubator/design-system/commit/5d684ca17032136ba3f5bce7cf2bb5663ad9765e))
* **tabs:** add missing target prop. Closes [#700](https://github.com/baloise-incubator/design-system/issues/700) ([808d52e](https://github.com/baloise-incubator/design-system/commit/808d52e02bdf51bbf87dbd14e10ef184a1a93080))
* **tabs:** adjust the numbering of the steps. Closes [#586](https://github.com/baloise-incubator/design-system/issues/586) ([dda1799](https://github.com/baloise-incubator/design-system/commit/dda1799b6f7adde17ac36e6fd62a2f60e338b43d))
* **tabs:** break tab label on vertical. Closes [#688](https://github.com/baloise-incubator/design-system/issues/688) ([1f62ddf](https://github.com/baloise-incubator/design-system/commit/1f62ddfecd781ab912c2c70839248b85a9c9393b))

## [10.24.7](https://github.com/baloise-incubator/design-system/compare/v10.24.5...v10.24.7) (2022-10-06)

## 10.24.5 (2022-10-05)


## [11.0.9](https://github.com/baloise-incubator/design-system/compare/v11.0.8...v11.0.9) (2022-10-28)


### Bug Fixes

* **icons:** add missing arrow icons ([d430cb4](https://github.com/baloise-incubator/design-system/commit/d430cb4d6b7ac3daf096b326799cd872b9bbfb9b))

## [11.0.8](https://github.com/baloise-incubator/design-system/compare/v11.0.7...v11.0.8) (2022-10-27)


### Bug Fixes

* **bal-modal:** emit willDismiss and didDismiss in close method ([9f4dc3c](https://github.com/baloise-incubator/design-system/commit/9f4dc3cf01fc57a4338c13336a9b5658231a9283))



## [11.0.7](https://github.com/baloise-incubator/design-system/compare/v11.0.6...v11.0.7) (2022-10-26)


### Bug Fixes

* enable clicking on the page if notice is turned on, [#817](https://github.com/baloise-incubator/design-system/issues/817) ([05ba93b](https://github.com/baloise-incubator/design-system/commit/05ba93b2b3ab73ed5f164fa905e2167420cb7ad6))



## [11.0.6](https://github.com/baloise-incubator/design-system/compare/v11.0.5...v11.0.6) (2022-10-26)


### Bug Fixes

* closes [#817](https://github.com/baloise-incubator/design-system/issues/817) snackbar is not clickable ([68528de](https://github.com/baloise-incubator/design-system/commit/68528decba390dfeedce960fddce9e4b9bb1ff9a))
* remove bal-notice container in case no notices are displated anymore ([0f44e33](https://github.com/baloise-incubator/design-system/commit/0f44e33cc5fa5b33f9438ba0316325b9641cc9cd))



## [11.0.5](https://github.com/baloise-incubator/design-system/compare/v11.0.4...v11.0.5) (2022-10-25)


### Bug Fixes

* rise version of web-app-utils to use latest fix ([ff48e9f](https://github.com/baloise-incubator/design-system/commit/ff48e9fcf724898a15425c61d9c20075a9a90adc))



## [11.0.4](https://github.com/baloise-incubator/design-system/compare/v11.0.3...v11.0.4) (2022-10-25)

**Note:** Version bump only for package root





## [11.0.3](https://github.com/baloise-incubator/design-system/compare/v11.0.2...v11.0.3) (2022-10-24)


### Bug Fixes

* add hammerjs as a dep of the core lib ([a57c060](https://github.com/baloise-incubator/design-system/commit/a57c06050b56d98e92a2294e77b967dc64b62e64))
* **select:** sync native input also when remote is set . Closes [#603](https://github.com/baloise-incubator/design-system/issues/603) ([92086fc](https://github.com/baloise-incubator/design-system/commit/92086fca85245205da6f53277dcb904dd7e1d1d3))



## [11.0.2](https://github.com/baloise-incubator/design-system/compare/v11.0.1...v11.0.2) (2022-10-24)


### Bug Fixes

* add correct log in number-value-accessor ([07d514f](https://github.com/baloise-incubator/design-system/commit/07d514f6b3d45e8ae17c429b750a44d955f03ac9))
* add log in number-value-accessor ([f887955](https://github.com/baloise-incubator/design-system/commit/f88795561bbd82a020a6ae458fa56b485dddb3eb))
* export hasTouchSupport ([7a27bc6](https://github.com/baloise-incubator/design-system/commit/7a27bc6b41a390501c91046d6b9e113315b4ab27))
* fix angular autofocus directive ([e36d9a0](https://github.com/baloise-incubator/design-system/commit/e36d9a019e390564295e016bdb21ad8e6a6f26ee))
* rename angular autofucs directive to BalAutoFocus ([fbf2eb4](https://github.com/baloise-incubator/design-system/commit/fbf2eb43cd3b6c7d83c602a4a64113de55db9ad6))



## [11.0.1](https://github.com/baloise-incubator/design-system/compare/v10.24.10...v11.0.1) (2022-10-20)


### Bug Fixes

* **cart:** empty color will not add a css class ([e69b4a3](https://github.com/baloise-incubator/design-system/commit/e69b4a3d56543fe60ec806336d10c61a6fc65074))
* change to visibility instead of display ([54efef5](https://github.com/baloise-incubator/design-system/commit/54efef5e2028cbda55c6e6b50648f405781d99c4))
* check if window, document or navigator are existing ([37ecc10](https://github.com/baloise-incubator/design-system/commit/37ecc104dba6bd5f041e194a0112cd45371b7384))
* **icons:** add missing tiktok icon ([7c04896](https://github.com/baloise-incubator/design-system/commit/7c048963a7a42863409f573e09e2a5f72fbf31a6))
* **navbar:** add target prop to navbar-brand. Closes [#769](https://github.com/baloise-incubator/design-system/issues/769) ([d0b3555](https://github.com/baloise-incubator/design-system/commit/d0b3555294c3c296ca5d15d4c021bb03dc043054))
* **navbar:** update touch view. Closes [#770](https://github.com/baloise-incubator/design-system/issues/770) ([24a87c3](https://github.com/baloise-incubator/design-system/commit/24a87c3e00b32d51085ae90e2ebfa9b247c5be48))
* **navigation:** add missing tracking ([20815a7](https://github.com/baloise-incubator/design-system/commit/20815a7c130ab5c9fe2aaf4d2381293e29c1e214))
* remove padding of the fieldset ([6390d75](https://github.com/baloise-incubator/design-system/commit/6390d75a01a7770ea5a05a23f2f23b16d7bd217c))
* update stencil config to solve angular issue ([189b62c](https://github.com/baloise-incubator/design-system/commit/189b62c969a4f29365c3c80b68137969f5e15f84))


### Performance Improvements

* use custom bundles and do not ship doc components ([b5da0b6](https://github.com/baloise-incubator/design-system/commit/b5da0b676aa467b22754233a748ba83a986eb284))

## [10.24.9](https://github.com/baloise-incubator/design-system/compare/v10.24.7...v10.24.9) (2022-10-11)


### Features

* **bal-navigation-menu-list-item:** added the target attr for grey menu list headline ([ddc8339](https://github.com/baloise-incubator/design-system/commit/ddc8339de57fd27bae24d41f3a2bac022b0ab08c))
* **bal-navigation-menu-list-item:** added the target attribute for items from grey lists ([773362e](https://github.com/baloise-incubator/design-system/commit/773362e2f1face1585ecbeae0c41ab0413900030))


### Bug Fixes

* adjust small spacing value to 0.75rem. Closes [#706](https://github.com/baloise-incubator/design-system/issues/706) ([2bdc29a](https://github.com/baloise-incubator/design-system/commit/2bdc29af2ed232d871a73ec5f754c49f77dceb97))
* **angular:** add dismissAll method to the toast and snackbar service. Closes [#703](https://github.com/baloise-incubator/design-system/issues/703) ([4e9070a](https://github.com/baloise-incubator/design-system/commit/4e9070ad37e6a441c045cc39f7e91bfb09ea26cb))
* **bal-stage:** adjusted content width mobile to full-width ([#684](https://github.com/baloise-incubator/design-system/issues/684)) ([65bcec9](https://github.com/baloise-incubator/design-system/commit/65bcec9c9c3835b3253151906f12d6b12fa18c1f))
* **bal-tabs:** create separate numberation for o-tabs based on independent varaiable ([461b5f9](https://github.com/baloise-incubator/design-system/commit/461b5f9eca198e66929d27ee1cbdd7ed173ef0fd))
* improve migration guide ([6eae447](https://github.com/baloise-incubator/design-system/commit/6eae4478450e1aefe3ddc497b632f806bce01a84))
* improve notification toast and snackbar stories ([5d684ca](https://github.com/baloise-incubator/design-system/commit/5d684ca17032136ba3f5bce7cf2bb5663ad9765e))
* **tabs:** add missing target prop. Closes [#700](https://github.com/baloise-incubator/design-system/issues/700) ([808d52e](https://github.com/baloise-incubator/design-system/commit/808d52e02bdf51bbf87dbd14e10ef184a1a93080))
* **tabs:** adjust the numbering of the steps. Closes [#586](https://github.com/baloise-incubator/design-system/issues/586) ([dda1799](https://github.com/baloise-incubator/design-system/commit/dda1799b6f7adde17ac36e6fd62a2f60e338b43d))
* **tabs:** break tab label on vertical. Closes [#688](https://github.com/baloise-incubator/design-system/issues/688) ([1f62ddf](https://github.com/baloise-incubator/design-system/commit/1f62ddfecd781ab912c2c70839248b85a9c9393b))

## [10.24.7](https://github.com/baloise-incubator/design-system/compare/v10.24.5...v10.24.7) (2022-10-06)

## 10.24.5 (2022-10-05)



There are 2 other changelogs for previous states of the Design System

- [Older versions](https://github.com/baloise-incubator/design-system/blob/next/CHANGELOG_OLD.md)
- [Rebranding versions](https://github.com/baloise-incubator/design-system/blob/next/CHANGELOG_NEXT.md)

# [11.0.0](https://github.com/baloise-incubator/design-system/compare/v10.24.10...v11.0.0) (2022-10-17)

Follow the migration guide [Migration from 10.x to 11.x](https://baloise-design.vercel.app/?path=/story/migration-migration-from-10-x-to-11-x--page)

### ⚠ BREAKING CHANGES

- Rebranded components
- New breakpoint high-definition
- bal-input pattern
