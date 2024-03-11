# Changelog

## 0.0.7

### Patch Changes

- **devkit**: update ( [`fa635d1`](https://github.com/baloise-incubator/ds-playground/commit/fa635d1ef97f67d577141dde4e916214f8fbb933))

## 0.0.6

### Patch Changes

- **badge**: add new color prop `pink` ( [`b807211`](https://github.com/baloise-incubator/ds-playground/commit/b807211b86b1275b84aa22b77cf4f528f12ff280))

## 0.0.5

### Patch Changes

- **core**: bubu ( [`9b17049`](https://github.com/baloise-incubator/ds-playground/commit/9b170496c2bd80dd20d2115ea398287fd2154472))

## 0.0.4

### Patch Changes

- **angular**: new fix ( [`df7d208`](https://github.com/baloise-incubator/ds-playground/commit/df7d208b6596225edeb413add51755a1b6247357))

## 0.0.3

### Patch Changes

- **core**: bubu ( [`37c7bb8`](https://github.com/baloise-incubator/ds-playground/commit/37c7bb8baa52aaedbec9a53814ed0acfa710a2d9))

## 0.0.2

### Patch Changes

- **core**: little change ( [`dd71551`](https://github.com/baloise-incubator/ds-playground/commit/dd71551bf06b632af147ae938146b36a4c6dd672))

## 0.0.1

### Patch Changes

- **cli**: 3rd change ( [`f5c8d70`](https://github.com/baloise-incubator/ds-playground/commit/f5c8d70b26b6c263a2141e87533d842dc2072f70))

- **cli**: second change ( [`66cd140`](https://github.com/baloise-incubator/ds-playground/commit/66cd140f09e4ef4354fb544e8713ebe87cd56775))

- **cli**: first release test ( [`94f44d0`](https://github.com/baloise-incubator/ds-playground/commit/94f44d048af92dabc31f0c256a84dbc7ba5f0afe))

## 15.2.3

### Patch Changes

- **maps**: fix image inline svg urls for the legacy marker api. ( [#1324](https://github.com/baloise/design-system/pull/1324))

## 15.2.2

### Patch Changes

- **field-hint**: Ensure proper alignment of field hint by adjusting its position to the end of the label text. ( [#1229](https://github.com/baloise/design-system/pull/1229))

- **styles**: Decouple components from css utility classes ( [#1304](https://github.com/baloise/design-system/pull/1304))

- **deps**: Update stencil to 4.11.0 ( [#1307](https://github.com/baloise/design-system/pull/1307))

- **vue**: change location of stencil components ( [#1310](https://github.com/baloise/design-system/pull/1310))

- **date**: due to an android keyboard bug the input mode is switched to decimal. ( [#1312](https://github.com/baloise/design-system/pull/1312))

## 15.2.1

### Patch Changes

- **date**: disabled years or months in the selection list cannot be selected anymore. ([#1298](https://github.com/baloise/design-system/pull/1298))
- **field**: links A11y information only for direct controls, labels and messages. ([#1299](https://github.com/baloise/design-system/pull/1299))
- **carousel**: movement for large controls variant on mobile is optimized. ([#1298](https://github.com/baloise/design-system/pull/1298))

## 15.2.0

### Minor Changes

- **angular**: schematic to seamlessly integrate the design system into your existing project. ([#1277](https://github.com/baloise/design-system/pull/1277))

### Patch Changes

- **date**: rerenders the calendar grid when min or max property was changed. ([#1282](https://github.com/baloise/design-system/pull/1282))

## 15.1.1

### Patch Changes

- **nav**: only renders the arrow symbol if link is valid ([#1275](https://github.com/baloise/design-system/pull/1275))

## 15.1.0

### Minor Changes

- **forms**: Introduce a new property `auto-invalid-off` to exclude a form control in Angular reactive forms from being visibly set as invalid. ([#1271](https://github.com/baloise/design-system/pull/1271))

### Patch Changes

- **a11y**: The term `hidden` is a reserved accessibility (a11y) value. Consequently, we found it necessary to rename our hidden properties for checkboxes, radio buttons, tabs, and steps. ([#1266](https://github.com/baloise/design-system/pull/1266))
  The attribute remains in place for now, ensuring no breaking changes at this time.

  The `hidden` property for the checkbox and radio has been updated and renamed to `non-submit.`
  The `hidden` property for the tabs and steps has been updated and renamed to `invisible.`

- **radio-group & checkbox-group**: component now updates its children when there are changes in the disabled or invalid status. ([#1264](https://github.com/baloise/design-system/pull/1264) )
- **field**: in horizontal layout now lacks right padding, and the label is aligned to the right. ([#1260](https://github.com/baloise/design-system/pull/1260))
- **carousel**: corrected the z-index value for sticky controls. ([#1265](https://github.com/baloise/design-system/pull/1265))
- **nav**: now provides enhanced support for colored service cards on mobile resolutions. ([#1261](https://github.com/baloise/design-system/pull/1261) )
- **carousel**: has vertical scrolling with tab controls on mobile devices. ([#1269](https://github.com/baloise/design-system/pull/1269))
- **angular**: `bal-ng-error` is now more synchronized with Angular lifecycles, ensuring improved visibility and hiding of validation messages. ([#1263](https://github.com/baloise/design-system/pull/1263))
- **brand-icons**: Merges styles from `<style>` elements to the style attribute of matching elements. ([#1262](https://github.com/baloise/design-system/pull/1262))

## 15.0.2

### Patch Changes

- **tooltip & popup**: Adjust shadow value to normal. ([#1240](https://github.com/baloise/design-system/pull/1240))
- **file-upload**: Trigger the `balFilesAdded` event after files have been added. ([#1236](https://github.com/baloise/design-system/pull/1236))
- **nav**: Add missing `➞` sign to the overview links in the `bal-nav` component and adjust padding and height of the `bal-popup` component in fullscreen variant. ([#1242](https://github.com/baloise/design-system/pull/1242))
- **carousel**: Reduce padding tab buttons to allow longer labels. ([#1239](https://github.com/baloise/design-system/pull/1239))

## 15.0.1

### Patch Changes

- **logo, spinner & nav**: Fix animation issue. ([#1233](https://github.com/baloise/design-system/pull/1233))
- **nav**: Fix the scrolling behavior of the `bal-nav` component on Safari browsers for touch devices. ([#1233](https://github.com/baloise/design-system/pull/1233))
- **nav**: Enhance the functionality of the `bal-nav` accordion on touch devices to ensure that when a link is activated, it behaves as an accordion. ([#1235](https://github.com/baloise/design-system/pull/1235))

## 15.0.0

### Major Changes

- **styles**: Removed the deprecated option of component styles with SASS. Instead, for customizing the component design, use CSS Variables. ([#1127](https://github.com/baloise/design-system/pull/1127))
- **angular**: The option to `applyPolyfills` for outdated browsers such as IE11 and legacy Edge has been deprecated, as the current design system no longer provides support for these versions. ([#1127](https://github.com/baloise/design-system/pull/1127))
- **angular**: Now by default the Baloise Design System will mark a form control as invalid when it's been touched and is indeed invalid. ([#1127](https://github.com/baloise/design-system/pull/1127))
  To disable this feature, set setInvalid to false in the design system configuration.

  ```ts
  BaloiseDesignSystemModule.forRoot({
    defaults: { ... },
    forms: {
      setInvalid: false, // to deactivate it
    },
  })
  ```

### Minor Changes

- **components** are now available as standalone elements for Angular v17. [#1127](https://github.com/baloise/design-system/pull/1127)

  Use the `provideBaloiseDesignSystem` provider within the app.config.ts file, where Angular providers are typically defined.

  **app.config.ts**

  ```ts
  import { ApplicationConfig, importProvidersFrom } from "@angular/core";

  import { provideBaloiseDesignSystem } from "@baloise/design-system-components-angular/standalone";

  export const appConfig: ApplicationConfig = {
    providers: [provideBaloiseDesignSystem()],
  };
  ```

  In each app component, import the necessary Baloise Design System components or a bundled set.

  **app.component.ts**

  ```ts
  import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
  import { CommonModule } from "@angular/common";
  import {
    BalApp,
    BalButton,
  } from "@baloise/design-system-components-angular/standalone";

  export interface UpdateControl {
    name: string;
    value: any;
  }

  @Component({
    selector: "app-root",
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [CommonModule, BalApp, BalButton],
    template: `
      <bal-app>
        <main class="container py-normal">
          <bal-button>My Button</bal-button>
        </main>
      </bal-app>
    `,
  })
  export class AppComponent {}
  ```

#### Webpack builder

For projects based on the builder `@angular-devkit/build-angular:browser` use the `@baloise/design-system-components-angular/legacy`.

## Previous Versions

- [Previous versions](https://github.com/baloise/design-system/blob/main/CHANGELOG_OLD.md)
