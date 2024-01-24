# @baloise/design-system-components

## 15.2.1

### Patch Changes

- [#1298](https://github.com/baloise/design-system/pull/1298) - Disabled years or months in the selection list cannot be selected anymore.

- [#1299](https://github.com/baloise/design-system/pull/1299) - Field component links A11y information only for direct controls, labels and messages.

- [#1298](https://github.com/baloise/design-system/pull/1298) - Carousel movement for large controls variant on mobile is optimized.

## 15.2.0

### Minor Changes

- [#1277](https://github.com/baloise/design-system/pull/1277) - Add an Angular schematic to seamlessly integrate the design system into your existing project.

### Patch Changes

- [#1282](https://github.com/baloise/design-system/pull/1282) - The date component rerenders the calendar grid when min or max property was changed.

## 15.1.1

### Patch Changes

- [#1275](https://github.com/baloise/design-system/pull/1275) - In the navigation component the arrow symbol for overview links will only be rendered if the link is valid

## 15.1.0

### Minor Changes

- [#1271](https://github.com/baloise/design-system/pull/1271) - Introduce a new property `auto-invalid-off` to exclude a form control in Angular reactive forms from being visibly set as invalid.

### Patch Changes

- [#1266](https://github.com/baloise/design-system/pull/1266) - The term `hidden` is a reserved accessibility (a11y) value. Consequently, we found it necessary to rename our hidden properties for checkboxes, radio buttons, tabs, and steps.
  The attribute remains in place for now, ensuring no breaking changes at this time.

  The `hidden` property for the checkbox and radio has been updated and renamed to `non-submit.`
  The `hidden` property for the tabs and steps has been updated and renamed to `invisible.`

- [#1264](https://github.com/baloise/design-system/pull/1264) - The radio and checkbox group component now updates its children when there are changes in the disabled or invalid status.

- [#1260](https://github.com/baloise/design-system/pull/1260) - The horizontal form field now lacks right padding, and the label is aligned to the right.

- [#1265](https://github.com/baloise/design-system/pull/1265) - Corrected the z-index value for the carousel component with sticky controls.

- [#1261](https://github.com/baloise/design-system/pull/1261) - The navigation component now provides enhanced support for colored service cards on mobile resolutions.

- [#1269](https://github.com/baloise/design-system/pull/1269) - Enable vertical scrolling for the `carousel` with tab controls on mobile devices.

- [#1263](https://github.com/baloise/design-system/pull/1263) - The Angular component `bal-ng-error` is now more synchronized with Angular lifecycles, ensuring improved visibility and hiding of validation messages.

- [#1262](https://github.com/baloise/design-system/pull/1262) - Merges styles from `<style>` elements to the style attribute of matching elements.

## 15.0.2

### Patch Changes

- [#1240](https://github.com/baloise/design-system/pull/1240) - Adjust shadow value to normal for the components `bal-tooltip` & `bal-popup`.

- [#1236](https://github.com/baloise/design-system/pull/1236) - Trigger the `balFilesAdded` event of the `bal-file-upload` component after files have been added.

- [#1242](https://github.com/baloise/design-system/pull/1242) - Add missing `➞` sign to the overview links in the `bal-nav` component and adjust padding and height of the `bal-popup` component in fullscreen variant.

- [#1239](https://github.com/baloise/design-system/pull/1239) - Reduce padding for the `bal-carousel` tab buttons to allow longer labels.

## 15.0.1

### Patch Changes

- [#1233](https://github.com/baloise/design-system/pull/1233) - Fix the animation issue affecting the `bal-logo`, `bal-spinner`, and `bal-nav` component.

- [#1233](https://github.com/baloise/design-system/pull/1233) - Fix the scrolling behavior of the `bal-nav` component on Safari browsers for touch devices.

- [#1235](https://github.com/baloise/design-system/pull/1235) - Enhance the functionality of the `bal-nav` accordion on touch devices to ensure that when a link is activated, it behaves as an accordion.

## 15.0.0

### Major Changes

- [#1127](https://github.com/baloise/design-system/pull/1127) - Removed the deprecated option of component styles with SASS. Instead, for customizing the component design, use CSS Variables.

- [#1127](https://github.com/baloise/design-system/pull/1127) - The option to `applyPolyfills` for outdated browsers such as IE11 and legacy Edge has been deprecated, as the current design system no longer provides support for these versions.

- [#1127](https://github.com/baloise/design-system/pull/1127) - Now by default the Baloise Design System will mark a form control as invalid when it's been touched and is indeed invalid.
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

- [#1127](https://github.com/baloise/design-system/pull/1127) - All components are now available as standalone elements for Angular v17.

  Use the `provideBaloiseDesignSystem` provider within the app.config.ts file, where Angular providers are typically defined.

  **app.config.ts**

  ```ts
  import { ApplicationConfig, importProvidersFrom } from '@angular/core'

  import { provideBaloiseDesignSystem } from '@baloise/design-system-components-angular/standalone'

  export const appConfig: ApplicationConfig = {
    providers: [provideBaloiseDesignSystem()],
  }
  ```

  In each app component, import the necessary Baloise Design System components or a bundled set.

  **app.component.ts**

  ```ts
  import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
  import { CommonModule } from '@angular/common'
  import { BalApp, BalButton } from '@baloise/design-system-components-angular/standalone'

  export interface UpdateControl {
    name: string
    value: any
  }

  @Component({
    selector: 'app-root',
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
