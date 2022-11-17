# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
