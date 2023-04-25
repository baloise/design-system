# @baloise/design-system-components

## 12.13.0

### Minor Changes

- [#808](https://github.com/baloise/design-system/pull/808) [`69115d725`](https://github.com/baloise/design-system/commit/69115d725815663c12a65e92d8f0f40f10c7eafe) Thanks [@github-actions](https://github.com/apps/github-actions)! - more space values are available for the bal-stack component

- [#779](https://github.com/baloise/design-system/pull/779) [`14990cf12`](https://github.com/baloise/design-system/commit/14990cf12e7925544d758ff77493488dba84a0b9) Thanks [@github-actions](https://github.com/apps/github-actions)! - badge supports theming

- [#808](https://github.com/baloise/design-system/pull/808) [`69115d725`](https://github.com/baloise/design-system/commit/69115d725815663c12a65e92d8f0f40f10c7eafe) Thanks [@github-actions](https://github.com/apps/github-actions)! - bal-popover has new property `auto-trigger`, which automatically opens the popover content on a click on the trigger element.

### Patch Changes

- [#808](https://github.com/baloise/design-system/pull/808) [`69115d725`](https://github.com/baloise/design-system/commit/69115d725815663c12a65e92d8f0f40f10c7eafe) Thanks [@github-actions](https://github.com/apps/github-actions)! - typography elements inherit default color from parent element

- [#808](https://github.com/baloise/design-system/pull/808) [`69115d725`](https://github.com/baloise/design-system/commit/69115d725815663c12a65e92d8f0f40f10c7eafe) Thanks [@github-actions](https://github.com/apps/github-actions)! - footer improve loading links only in idle mode

- [#808](https://github.com/baloise/design-system/pull/808) [`69115d725`](https://github.com/baloise/design-system/commit/69115d725815663c12a65e92d8f0f40f10c7eafe) Thanks [@github-actions](https://github.com/apps/github-actions)! - bal-accordion updates state after value was changed

- [#808](https://github.com/baloise/design-system/pull/808) [`69115d725`](https://github.com/baloise/design-system/commit/69115d725815663c12a65e92d8f0f40f10c7eafe) Thanks [@github-actions](https://github.com/apps/github-actions)! - bal-stack normalizes margins of the child elements and expands over the whole width

- Updated dependencies [[`69115d725`](https://github.com/baloise/design-system/commit/69115d725815663c12a65e92d8f0f40f10c7eafe), [`69115d725`](https://github.com/baloise/design-system/commit/69115d725815663c12a65e92d8f0f40f10c7eafe)]:
  - @baloise/design-system-css@12.13.0
  - @baloise/design-system-fonts@12.13.0
  - @baloise/design-system-icons@12.13.0
  - @baloise/design-system-tokens@12.13.0

## 12.12.0

### Minor Changes

- [#1253](https://github.com/baloise-incubator/design-system/pull/1253) [`b0992bdc5`](https://github.com/baloise-incubator/design-system/commit/b0992bdc55f4ba98f770745546b770bcebde9056) Thanks [@hirsch88](https://github.com/hirsch88)! - Use JavaScript to prevent scrolling instead of CSS to remember to user scroll position.

- [#1240](https://github.com/baloise-incubator/design-system/pull/1240) [`bf9634662`](https://github.com/baloise-incubator/design-system/commit/bf963466275cfaeffba82c2310c9b2ff690eb2ef) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - add missing selectors with data-testid in testing library

- [#1252](https://github.com/baloise-incubator/design-system/pull/1252) [`302c0f7c4`](https://github.com/baloise-incubator/design-system/commit/302c0f7c46d3fdf4da730a5f5ff8f22e9ee74267) Thanks [@hirsch88](https://github.com/hirsch88)! - improve accordion structure to a more flexible solution.

  **old**

  The old button accordion solution is still active.

  ```html
  <bal-accordion>
    <p class="py-medium">Hidden content</p>
  </bal-accordion>
  ```

  **new**

  In the new structure the header of the accordion can be designed as the situation demands it.

  ```html
  <bal-accordion>
    <bal-accordion-details>
      <p class="py-medium">Hidden content</p>
    </bal-accordion-details>
    <bal-accordion-summary>
      My custom header
      <bal-accordion-trigger></bal-accordion-trigger>
    </bal-accordion-summary>
  </bal-accordion>
  ```

- [#1245](https://github.com/baloise-incubator/design-system/pull/1245) [`f9144f085`](https://github.com/baloise-incubator/design-system/commit/f9144f08528edd3dc58a17366a4426198b42410f) Thanks [@hirsch88](https://github.com/hirsch88)! - add new components bal-content, bal-stack and add new styles for radio and checkbox.

  New components:

  - [bal-content](https://baloise-design-system.vercel.app/?path=/docs/components-layout-content--basic)
  - [bal-stack](https://baloise-design-system.vercel.app/?path=/docs/components-layout-stack--basic)

  New radio and checkbox style:

  - [bal-checkbox button](https://baloise-design-system.vercel.app/?path=/docs/components-form-checkbox--basic#checkbox-button)
  - [bal-radio button](https://baloise-design-system.vercel.app/?path=/docs/components-form-radio--basic#radio-button)

  Updated bal-icon component. New colors, sizes are added and state properties invalid and disabled. Moreover, the color `auto` can
  be used to leave the color as it is.

  Check out the updated [documentation](https://baloise-design-system.vercel.app/?path=/docs/components-icon--basic) for the bal-icon.

### Patch Changes

- [#1249](https://github.com/baloise-incubator/design-system/pull/1249) [`c0b500bf7`](https://github.com/baloise-incubator/design-system/commit/c0b500bf7f48cc3a81041c0ccd8aec60d546c04a) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - trigger balChange on empty value when min and max props are set

  enable dates who are in the range when switching the year and min and max prop are set

- [#1244](https://github.com/baloise-incubator/design-system/pull/1244) [`73bb7e173`](https://github.com/baloise-incubator/design-system/commit/73bb7e1738bfd215cb8b47fce04fdaba5ba26e09) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - fix the datepicker by allowing the separators to be entered even when day or month which are 0-9 are entered without the 0 in front (e.g 2/2/2022)

- Updated dependencies [[`f9144f085`](https://github.com/baloise-incubator/design-system/commit/f9144f08528edd3dc58a17366a4426198b42410f)]:
  - @baloise/design-system-tokens@12.12.0
  - @baloise/design-system-css@12.12.0
  - @baloise/design-system-fonts@12.12.0
  - @baloise/design-system-icons@12.12.0

## 12.11.0

### Minor Changes

- [#1232](https://github.com/baloise/design-system/pull/1232) [`2e3437cca`](https://github.com/baloise/design-system/commit/2e3437ccadcb52774266d43085488d28a72783b6) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - improve datepicker user input by automatically adding the date separators between day and month and month and a year

### Patch Changes

- [#1230](https://github.com/baloise/design-system/pull/1230) [`0952e9121`](https://github.com/baloise/design-system/commit/0952e9121d45dffb7697995a3fa9ad14fff5e173) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - enable dot(.) as a decimal separator for a BE region

- [#1225](https://github.com/baloise/design-system/pull/1225) [`f167ba3a6`](https://github.com/baloise/design-system/commit/f167ba3a648c8a26b1554baee0ed5ff4def044f3) Thanks [@hirsch88](https://github.com/hirsch88)! - reduce payload by providing tslib import helpers

- [#1235](https://github.com/baloise/design-system/pull/1235) [`74b7736bb`](https://github.com/baloise/design-system/commit/74b7736bbc5a8a37b4871f5184216cb3cd6f6a5c) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - enable bal-time-input to be able to use for angular reactive forms

- Updated dependencies [[`884b91285`](https://github.com/baloise/design-system/commit/884b91285953a2f8b078b0e4a69b43649bc3af3e)]:
  - @baloise/design-system-css@12.11.0
  - @baloise/design-system-fonts@12.11.0
  - @baloise/design-system-icons@12.11.0
  - @baloise/design-system-tokens@12.11.0

## 12.10.0

### Patch Changes

- [#1222](https://github.com/baloise/design-system/pull/1222) [`9fdf176ac`](https://github.com/baloise/design-system/commit/9fdf176ac82e6ac378200cf83928c98e61a3fe9e) Thanks [@hirsch88](https://github.com/hirsch88)! - fix waitForDesignSystem helper for unit testing

- [#1221](https://github.com/baloise/design-system/pull/1221) [`ee0a5094d`](https://github.com/baloise/design-system/commit/ee0a5094d700197f6e110ded0607964a1bb8646f) Thanks [@hirsch88](https://github.com/hirsch88)! - inherit color for link elements

- [#1219](https://github.com/baloise/design-system/pull/1219) [`2d3ade3e5`](https://github.com/baloise/design-system/commit/2d3ade3e54cf919f4f2ad9323b5be8cd683a1c64) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - fix error on clearing input with claim-number mask

- Updated dependencies [[`ee0a5094d`](https://github.com/baloise/design-system/commit/ee0a5094d700197f6e110ded0607964a1bb8646f)]:
  - @baloise/design-system-css@12.10.0
  - @baloise/design-system-fonts@12.10.0
  - @baloise/design-system-icons@12.10.0
  - @baloise/design-system-tokens@12.10.0

## 12.9.0

### Minor Changes

- [#1206](https://github.com/baloise/design-system/pull/1206) [`47c1e79a2`](https://github.com/baloise/design-system/commit/47c1e79a2cf955948a08acf6fbae936a08d44479) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - add social media links in footer component

- [#1167](https://github.com/baloise/design-system/pull/1167) [`855e6cbf5`](https://github.com/baloise/design-system/commit/855e6cbf5f23a822ac6c3e59a528154730ae6913) Thanks [@JasperDeLanghe](https://github.com/JasperDeLanghe)! - new form component bal-time-input added

- [#1192](https://github.com/baloise/design-system/pull/1192) [`8a0dbc5af`](https://github.com/baloise/design-system/commit/8a0dbc5af1347904a6d79e317408ebea056aac1a) Thanks [@hirsch88](https://github.com/hirsch88)! - We introduced a new way of adding a options to the bal-radio-group and bal-checkbox-group
  by introducing the `options` property in which options can be passed using a Javascript.

  **bal-radio-group**

  ```html
  <bal-radio-group [options]="options"></bal-radio-group>
  ```

  ```typescript
  import { newBalRadioOption } from '@baloise/design-system-components'

  @Component({
    selector: 'app-example-component',
    templateUrl: './example-component.component.html',
  })
  export class ExampleComponent {
    options = [
      newBalRadioOption({ label: 'Label 1', value: '1' }),
      newBalRadioOption({
        label: () => 'Label with <a class="is-link" href="http://baloise.com">Link</a>',
        value: '2',
      }),
    ]
  }
  ```

  **bal-checkbox-group**

  To use the `bal-checkbox-group` with options we also need to set `control` attribute to true.

  ```html
  <bal-checkbox-group control [options]="options"></bal-checkbox-group>
  ```

  ```typescript
  import { newBalCheckboxOption } from '@baloise/design-system-components'

  @Component({
    selector: 'app-example-component',
    templateUrl: './example-component.component.html',
  })
  export class ExampleComponent {
    options = [
      newBalCheckboxOption({ value: '1', label: 'Label 1' }),
      newBalCheckboxOption({
        value: '2',
        label: () => 'Label with <a class="is-link" href="http://baloise.com">Link</a>',
      }),
    ]
  }
  ```

- [#1185](https://github.com/baloise/design-system/pull/1185) [`fff4c722a`](https://github.com/baloise/design-system/commit/fff4c722a0993ef59c088157286ec1114fc1fde1) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - added modal property backdropDismiss so the user can decide if modal can be closed on backdrop click or not

### Patch Changes

- [#1203](https://github.com/baloise/design-system/pull/1203) [`c89fd1312`](https://github.com/baloise/design-system/commit/c89fd13125a928195442e6ee22e28632d66dd95d) Thanks [@hirsch88](https://github.com/hirsch88)! - improve build config to support stackblitz with angular

- [#1195](https://github.com/baloise/design-system/pull/1195) [`c2db6927d`](https://github.com/baloise/design-system/commit/c2db6927dfe29c2942d6dacb78a39d8930364064) Thanks [@hirsch88](https://github.com/hirsch88)! - fix for bal-select usage in modal with selectionOptional

- Updated dependencies [[`78b00ba20`](https://github.com/baloise/design-system/commit/78b00ba2042172ea23fe8827a60292c167d38e4c), [`78b00ba20`](https://github.com/baloise/design-system/commit/78b00ba2042172ea23fe8827a60292c167d38e4c), [`78b00ba20`](https://github.com/baloise/design-system/commit/78b00ba2042172ea23fe8827a60292c167d38e4c), [`78b00ba20`](https://github.com/baloise/design-system/commit/78b00ba2042172ea23fe8827a60292c167d38e4c)]:
  - @baloise/design-system-tokens@12.9.0
  - @baloise/design-system-css@12.9.0
  - @baloise/design-system-fonts@12.9.0
  - @baloise/design-system-icons@12.9.0

## 12.8.2

### Patch Changes

- [`ab352d875`](https://github.com/baloise/design-system/commit/ab352d8755332f0c8adc4801e3d5c7c391bb8f27) Thanks [@hirsch88](https://github.com/hirsch88)! - alert colors synchronized in bal-badge, bal-card, bal-tag and bal-button to fix accessibility issues.

- Updated dependencies [[`ab352d875`](https://github.com/baloise/design-system/commit/ab352d8755332f0c8adc4801e3d5c7c391bb8f27)]:
  - @baloise/design-system-tokens@12.8.2
  - @baloise/design-system-css@12.8.2
  - @baloise/design-system-fonts@12.8.2
  - @baloise/design-system-icons@12.8.2

## 12.8.1

### Patch Changes

- [#1182](https://github.com/baloise/design-system/pull/1182) [`38f0a7fd4`](https://github.com/baloise/design-system/commit/38f0a7fd492927a49e811e1b0461ed39ebe057d4) Thanks [@hirsch88](https://github.com/hirsch88)! - adjust package.json to npm workspace structure and move contact.js to components dependencies

- Updated dependencies [[`38f0a7fd4`](https://github.com/baloise/design-system/commit/38f0a7fd492927a49e811e1b0461ed39ebe057d4)]:
  - @baloise/design-system-tokens@12.8.1
  - @baloise/design-system-fonts@12.8.1
  - @baloise/design-system-icons@12.8.1
  - @baloise/design-system-css@12.8.1

## 12.8.0

### Minor Changes

- [#1153](https://github.com/baloise/design-system/pull/1153) [`b230a279d`](https://github.com/baloise/design-system/commit/b230a279d61c5928570b39e537c0a7ba18df8677) Thanks [@hirsch88](https://github.com/hirsch88)! - add `waitForComponent` util function for component testing. This waits until the web-component tree has fully rendered.

  ```typescript
  import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
  import { TestBed } from '@angular/core/testing'
  import { BrowserModule, By } from '@angular/platform-browser'
  import { BalCoreModule, BalInputModule } from '@baloise/design-system-components-angular'
  import { waitForComponent } from '@baloise/design-system-components'
  import { AppComponent } from './app.component'

  describe('AppComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [AppComponent],
        imports: [BrowserModule, BalCoreModule.forRoot(), BalInputModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents()
    })

    it(`should render input value`, async () => {
      const fixture = TestBed.createComponent(AppComponent)
      fixture.detectChanges()
      await waitForComponent(fixture.nativeElement)
      const input = fixture.debugElement.query(By.css('[data-testid="input"]'))
      expect(input.nativeElement.value).toContain('My Value')
    })
  })
  ```

### Patch Changes

- [#1172](https://github.com/baloise/design-system/pull/1172) [`6f99084d9`](https://github.com/baloise/design-system/commit/6f99084d946491231bc8b4fe7d479f5dd3c86c8d) Thanks [@hirsch88](https://github.com/hirsch88)! - claimnumber accepts small x

- [#1174](https://github.com/baloise/design-system/pull/1174) [`d3ab0905d`](https://github.com/baloise/design-system/commit/d3ab0905d868e9a32a69d028efb544b28bbd5796) Thanks [@hirsch88](https://github.com/hirsch88)! - fix carousel items-per-view if not set to auto

- [#1174](https://github.com/baloise/design-system/pull/1174) [`a3a7c5f8f`](https://github.com/baloise/design-system/commit/a3a7c5f8f5953d3344fec22f63484e9cc6515b8f) Thanks [@hirsch88](https://github.com/hirsch88)! - add autoprefixer for css files to solve hyphen issue

- Updated dependencies [[`a3a7c5f8f`](https://github.com/baloise/design-system/commit/a3a7c5f8f5953d3344fec22f63484e9cc6515b8f)]:
  - @baloise/design-system-css@12.8.0
  - @baloise/design-system-fonts@12.8.0
  - @baloise/design-system-icons@12.8.0
  - @baloise/design-system-tokens@12.8.0

## 12.7.1

### Patch Changes

- [#1141](https://github.com/baloise/design-system/pull/1141) [`d53ea8a46`](https://github.com/baloise/design-system/commit/d53ea8a46196415d856c090f1a1258a64e23cc12) Thanks [@hirsch88](https://github.com/hirsch88)! - fix globalscripts for stackblitz

- [#1136](https://github.com/baloise/design-system/pull/1136) [`22389ae9b`](https://github.com/baloise/design-system/commit/22389ae9bdab2d65d68d77b6e65ef24793bfca2f) Thanks [@hirsch88](https://github.com/hirsch88)! - adjust deprecation warning with a better path

- Updated dependencies []:
  - @baloise/design-system-css@12.7.1
  - @baloise/design-system-fonts@12.7.1
  - @baloise/design-system-icons@12.7.1
  - @baloise/design-system-tokens@12.7.1

## 12.7.0

### Minor Changes

- [#1126](https://github.com/baloise/design-system/pull/1126) [`f944a0729`](https://github.com/baloise/design-system/commit/f944a0729daeb96ee9a36affecf572a7955c1e24) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - add yellow, red, purple and green colors to the navigation level block

### Patch Changes

- [#1128](https://github.com/baloise/design-system/pull/1128) [`a47518315`](https://github.com/baloise/design-system/commit/b28384b99c5831d592aeadbaf2888850946cfb8a) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - update @baloise/web-app-utils to 3.10.0

- [#1127](https://github.com/baloise/design-system/pull/1127) [`297d9c08b`](https://github.com/baloise/design-system/commit/297d9c08b3b08c4dbcd4b12fa5e28e587168dc25) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - fix focus and blur events in bal-checkbox

- Updated dependencies []:
  - @baloise/design-system-css@12.7.0
  - @baloise/design-system-fonts@12.7.0
  - @baloise/design-system-icons@12.7.0
  - @baloise/design-system-tokens@12.7.0

## 12.6.0

### Minor Changes

- [#1098](https://github.com/baloise/design-system/pull/1098) [`78ce9869c`](https://github.com/baloise/design-system/commit/78ce9869c1e071905ef11add4db3c30846a451cd) Thanks [@hirsch88](https://github.com/hirsch88)! - add vscode support for html elements and remove docs components from the build

  - [Configuring VS Code](https://stenciljs.com/docs/docs-vscode#configuring-vs-code)

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

- [#1102](https://github.com/baloise/design-system/pull/1102) [`0819f32ee`](https://github.com/baloise/design-system/commit/0819f32eeb69d5c34bfdd8b70f2bbc7cac960276) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - replace hammerjs lib with contactjs

- [#1084](https://github.com/baloise/design-system/pull/1084) [`a2258fd83`](https://github.com/baloise/design-system/commit/a2258fd8395160b3733af6e048e731b5ec52b02c) Thanks [@hirsch88](https://github.com/hirsch88)! - refactor global styles and move them to the components

- [#1101](https://github.com/baloise/design-system/pull/1101) [`af1560a6e`](https://github.com/baloise/design-system/commit/af1560a6e5ed5abb3bc8ae0f4e7cb1507464634d) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - use tokens in the components instead of hard coded css values

- [#1109](https://github.com/baloise/design-system/pull/1109) [`8bd20ac03`](https://github.com/baloise/design-system/commit/8bd20ac0313f799b0f98d5a029b62ba22bbf1929) Thanks [@hirsch88](https://github.com/hirsch88)! - add deepReady support to check all nested child elements

- [#1110](https://github.com/baloise/design-system/pull/1110) [`76e3abe72`](https://github.com/baloise/design-system/commit/76e3abe726614424ad9fffaefe872dd8683b7b9d) Thanks [@hirsch88](https://github.com/hirsch88)! - add lazy loading to all image elements

- [#1114](https://github.com/baloise/design-system/pull/1114) [`d2819d0cf`](https://github.com/baloise/design-system/commit/d2819d0cf3394a4d2e52b677ebbedde1670ebb1a) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - fix select typeahead closing on click

- Updated dependencies [[`a899f8102`](https://github.com/baloise/design-system/commit/a899f8102e0e8f4dc6c0f2ce8ce155357de80f32), [`af1560a6e`](https://github.com/baloise/design-system/commit/af1560a6e5ed5abb3bc8ae0f4e7cb1507464634d), [`26b23997c`](https://github.com/baloise/design-system/commit/26b23997c9c4fc72824a60fdf2928b1b82b62f26)]:
  - @baloise/design-system-css@12.6.0
  - @baloise/design-system-tokens@12.6.0
  - @baloise/design-system-fonts@12.6.0
  - @baloise/design-system-icons@12.6.0

## 12.5.0

### Minor Changes

- [#1050](https://github.com/baloise/design-system/pull/1050) [`355fc4f3c`](https://github.com/baloise/design-system/commit/355fc4f3cd13f4708b4d1a0f219658c3214df253) Thanks [@hirsch88](https://github.com/hirsch88)! - add container design tokens

- [#1096](https://github.com/baloise/design-system/pull/1096) [`b105c394d`](https://github.com/baloise/design-system/commit/b105c394d300f3f166c1d60effef3f737b34338b) Thanks [@hirsch88](https://github.com/hirsch88)! - activate Germany for the bal-footer

### Patch Changes

- [#1095](https://github.com/baloise/design-system/pull/1095) [`1c76e1de0`](https://github.com/baloise/design-system/commit/1c76e1de09388d16ee50fee89e4611b36096860c) Thanks [@hirsch88](https://github.com/hirsch88)! - enable form data submitting for bal-file-upload

- [#1066](https://github.com/baloise/design-system/pull/1066) [`5fdb9402f`](https://github.com/baloise/design-system/commit/5fdb9402fb1fc7105077144745311916c604892a) Thanks [@hirsch88](https://github.com/hirsch88)! - fix esm paths in package.json

- [#1086](https://github.com/baloise/design-system/pull/1086) [`7bc33b76f`](https://github.com/baloise/design-system/commit/7bc33b76f9c8cf9a1fc028a638679e8eb77ac3d4) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - adjust value and placeholder color contrast for disabled fields

- [#1069](https://github.com/baloise/design-system/pull/1069) [`30409ba0d`](https://github.com/baloise/design-system/commit/30409ba0d883f0e129480287bf741554cd61391a) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - close modal on click outside of it

- [#1071](https://github.com/baloise/design-system/pull/1071) [`bb9c2c08b`](https://github.com/baloise/design-system/commit/bb9c2c08b799eb79a7a90ff0bfa3da448f5deb0c) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - align box to the top when there is a long text in the checkbox

- [#1092](https://github.com/baloise/design-system/pull/1092) [`7f6f171bc`](https://github.com/baloise/design-system/commit/7f6f171bc558ea1fdbb9abb90ecb2f8e6da28692) Thanks [@hirsch88](https://github.com/hirsch88)! - bal-select only validate input when leaving the component

- Updated dependencies [[`355fc4f3c`](https://github.com/baloise/design-system/commit/355fc4f3cd13f4708b4d1a0f219658c3214df253), [`9f47b318c`](https://github.com/baloise/design-system/commit/9f47b318ca24af8de8dfc8c9ae1e612c231a1625), [`7bc33b76f`](https://github.com/baloise/design-system/commit/7bc33b76f9c8cf9a1fc028a638679e8eb77ac3d4)]:
  - @baloise/design-system-tokens@12.5.0
  - @baloise/design-system-css@12.5.0
  - @baloise/design-system-fonts@12.5.0
  - @baloise/design-system-icons@12.5.0

## 12.4.1

### Patch Changes

- [#1064](https://github.com/baloise/design-system/pull/1064) [`f98e22ae0`](https://github.com/baloise/design-system/commit/f98e22ae0db80f3b2ff911b101323e5f2c4e9cab) Thanks [@hirsch88](https://github.com/hirsch88)! - fix ESM global script file

- Updated dependencies []:
  - @baloise/design-system-css@12.4.1
  - @baloise/design-system-fonts@12.4.1
  - @baloise/design-system-icons@12.4.1
  - @baloise/design-system-tokens@12.4.1

## 12.4.0

### Minor Changes

- [#1057](https://github.com/baloise/design-system/pull/1057) [`2ecc85d08`](https://github.com/baloise/design-system/commit/2ecc85d0862020d55d77c3b92eeb77891d82f4c2) Thanks [@hirsch88](https://github.com/hirsch88)! - add prop contentSpace to bal-list-item-accordion-body to set space normal or none

### Patch Changes

- [#1057](https://github.com/baloise/design-system/pull/1057) [`2ecc85d08`](https://github.com/baloise/design-system/commit/2ecc85d0862020d55d77c3b92eeb77891d82f4c2) Thanks [@hirsch88](https://github.com/hirsch88)! - fix border color issue on list accordion

- [#1055](https://github.com/baloise/design-system/pull/1055) [`a5e161045`](https://github.com/baloise/design-system/commit/a5e161045ffc22fc928ede080426f8fe36c7c006) Thanks [@hirsch88](https://github.com/hirsch88)! - bal-radio style updates. Centering dot, expand on mobile & on expanded adjust height of items to the biggest item.

- [#1058](https://github.com/baloise/design-system/pull/1058) [`a17ed35cf`](https://github.com/baloise/design-system/commit/a17ed35cfefa3dace356b0768ed9fb0fc405cb64) Thanks [@hirsch88](https://github.com/hirsch88)! - fix to set bal-body to ready to avoid a white webpage on page load

- [#1058](https://github.com/baloise/design-system/pull/1058) [`282355d61`](https://github.com/baloise/design-system/commit/282355d61f9e07882fca65a02b0108fc9e712397) Thanks [@hirsch88](https://github.com/hirsch88)! - set focus primary border on invalid form controls

- [#1049](https://github.com/baloise/design-system/pull/1049) [`2222bc3c4`](https://github.com/baloise/design-system/commit/2222bc3c483aed8af5b5d7c3d380626ce2d4ca99) Thanks [@hirsch88](https://github.com/hirsch88)! - resolve duplicated identifiers on stackblitz

- Updated dependencies [[`282355d61`](https://github.com/baloise/design-system/commit/282355d61f9e07882fca65a02b0108fc9e712397)]:
  - @baloise/design-system-css@12.4.0
  - @baloise/design-system-fonts@12.4.0
  - @baloise/design-system-icons@12.4.0
  - @baloise/design-system-tokens@12.4.0

## 12.3.0

### Minor Changes

- [#1040](https://github.com/baloise/design-system/pull/1040) [`e3e9e91fd`](https://github.com/baloise/design-system/commit/e3e9e91fd51f43511c64f1519998c12da237ce45) Thanks [@hirsch88](https://github.com/hirsch88)! - add min and max to bal-number-input

- [#973](https://github.com/baloise/design-system/pull/973) [`16cf1e903`](https://github.com/baloise/design-system/commit/16cf1e90337861aca94a3b55dff6781647bc8757) Thanks [@hirsch88](https://github.com/hirsch88)! - add missing t-shirt sizes to bal-heading

### Patch Changes

- [#973](https://github.com/baloise/design-system/pull/973) [`378807722`](https://github.com/baloise/design-system/commit/378807722525e73c38d0d50bca2c2850490b4ab7) Thanks [@hirsch88](https://github.com/hirsch88)! - refactoring of the bal-list and the bal-accordion

- [#1048](https://github.com/baloise/design-system/pull/1048) [`bb3cde835`](https://github.com/baloise/design-system/commit/bb3cde835680edad13c2e9520408b33fd5d33cc6) Thanks [@hirsch88](https://github.com/hirsch88)! - fix tab link on mobile select

- [#1032](https://github.com/baloise/design-system/pull/1032) [`3b99a82c6`](https://github.com/baloise/design-system/commit/3b99a82c6e5e9ddfc1d89bbd3a4754dfb1cf6a1c) Thanks [@hirsch88](https://github.com/hirsch88)! - to avoid global duplicated identifiers the global script gets loaded by the bal-app component

- Updated dependencies [[`89f87f6b2`](https://github.com/baloise/design-system/commit/89f87f6b2e2030558b284d94ced1f1d4d602becc)]:
  - @baloise/design-system-icons@12.3.0
  - @baloise/design-system-css@12.3.0
  - @baloise/design-system-fonts@12.3.0
  - @baloise/design-system-tokens@12.3.0

## 12.2.0

### Minor Changes

- [#1031](https://github.com/baloise/design-system/pull/1031) [`cc51ab42e`](https://github.com/baloise/design-system/commit/cc51ab42ef8601929612ca9fd6af5b096b27c500) Thanks [@hirsch88](https://github.com/hirsch88)! - use static file server as default for the custom font faces

### Patch Changes

- [#1001](https://github.com/baloise/design-system/pull/1001) [`4d5021d82`](https://github.com/baloise/design-system/commit/4d5021d82549ee336b964e05720fd08fefc55c8f) Thanks [@hirsch88](https://github.com/hirsch88)! - bal-spinner only load animated svg ones

- [#1023](https://github.com/baloise/design-system/pull/1023) [`c403bbb36`](https://github.com/baloise/design-system/commit/c403bbb36f77a2a42722e7ba650568b87539e1f2) Thanks [@mladenplaninicic](https://github.com/mladenplaninicic)! - radio and checkbox label change link color when disabled

- Updated dependencies [[`424f8dbb7`](https://github.com/baloise/design-system/commit/424f8dbb73be578684e085d35bec4c7774bb8dba), [`cc51ab42e`](https://github.com/baloise/design-system/commit/cc51ab42ef8601929612ca9fd6af5b096b27c500)]:
  - @baloise/design-system-icons@12.2.0
  - @baloise/design-system-fonts@12.2.0
  - @baloise/design-system-css@12.2.0
  - @baloise/design-system-tokens@12.2.0

## Previous Versions

- [Older versions](https://github.com/baloise/design-system/blob/main/CHANGELOG_v12.md)
- [Rebranding versions](https://github.com/baloise/design-system/blob/main/CHANGELOG_NEXT.md)
