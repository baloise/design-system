# Change Log

## 14.6.0

### Minor Changes

- [#1169](https://github.com/baloise/design-system/pull/1169) - Introduce 'horizontal' prop for aligning label and input side by side in Field component, with message displayed below.

  ```html
  <bal-field horizontal>
    <bal-field-label>Firstname</bal-field-label>
    <bal-field-control>
      <bal-input placeholder="Basic"></bal-input>
    </bal-field-control>
    <bal-field-message color="hint">Field Message</bal-field-message>
  </bal-field>
  ```

### Patch Changes

- [#1171](https://github.com/baloise/design-system/pull/1171) - Fix tab navigation functionality for the `bal-input-date` component when a value is set.

- [#1168](https://github.com/baloise/design-system/pull/1168) - Resolve logo animation issue by updating Lottie import

- [#1177](https://github.com/baloise/design-system/pull/1177) - Replace timeout with 'await waitAfterIdleCallback()' in inputSetFocus.

- Updated dependencies []:
  - @baloise/design-system-css@14.6.0
  - @baloise/design-system-fonts@14.6.0
  - @baloise/design-system-icons@14.6.0
  - @baloise/design-system-tokens@14.6.0

## 14.5.1

### Patch Changes

- [#1157](https://github.com/baloise/design-system/pull/1157) - `nav` link items are consistently aligned to the left.

- Updated dependencies []:
  - @baloise/design-system-css@14.5.1
  - @baloise/design-system-fonts@14.5.1
  - @baloise/design-system-icons@14.5.1
  - @baloise/design-system-tokens@14.5.1

## 14.5.0

### Patch Changes

- [#1155](https://github.com/baloise/design-system/pull/1155) - The desktop variant of the `nav` component now features a 1rem gap between its link columns.

- [#1151](https://github.com/baloise/design-system/pull/1151) - The `nav` component detects the device breakpoint during its construction phase.

- Updated dependencies []:
  - @baloise/design-system-css@14.5.0
  - @baloise/design-system-fonts@14.5.0
  - @baloise/design-system-icons@14.5.0
  - @baloise/design-system-tokens@14.5.0

## 14.4.0

### Patch Changes

- [#1125](https://github.com/baloise/design-system/pull/1125) - The meta buttons within the `nav` component now support both the ARIA label and title attributes, enhancing accessibility (a11y).

- [#1125](https://github.com/baloise/design-system/pull/1125) - The accordion functionality in the `nav` component now opens and closes at the touch breakpoint when the library was minified.

- [#1124](https://github.com/baloise/design-system/pull/1124) - Resolve day label formatting to prevent line breaks and update month names on language change.

- [#1120](https://github.com/baloise/design-system/pull/1120) - Resolve carousel product slider color inconsistency during hover on yellow product

- [#1125](https://github.com/baloise/design-system/pull/1125) - With form submission, the date value will be automatically formatted into ISO standard.

- Updated dependencies []:
  - @baloise/design-system-css@14.4.0
  - @baloise/design-system-fonts@14.4.0
  - @baloise/design-system-icons@14.4.0
  - @baloise/design-system-tokens@14.4.0

## 14.3.0

### Minor Changes

- [#1110](https://github.com/baloise/design-system/pull/1110) - A new `WhatsApp` icon has been added to the icons collection.

- [#1073](https://github.com/baloise/design-system/pull/1073) - The icon component now includes support for brand-icons. Additionally, we've removed the padded frame for large icons and bigger sizes, as brand-icons already come with their own frame. Furthermore, we've ensured that the available color list is now complete.

### Patch Changes

- [#1073](https://github.com/baloise/design-system/pull/1073) - The sheet component now has a default white background to address the transparent overlay issue.

- [#1109](https://github.com/baloise/design-system/pull/1109) - The number input component for the German region now supports decimal points with a comma separator.

- [#1073](https://github.com/baloise/design-system/pull/1073) - The design tokens for line-height values for x-small and small text has been adjusted to ensure compliance with accessibility (a11y) standards.

- [#1104](https://github.com/baloise/design-system/pull/1104) - Assign the `name` attribute to the native input element of the `bal-date` component.

- Updated dependencies [[`0613561fb`](https://github.com/baloise/design-system/commit/0613561fb2aeaf4557c1845b2cd9e42f7273542a), [`82ebf8d0c`](https://github.com/baloise/design-system/commit/82ebf8d0c7a15c03682f754d904c4bff151c72f0), [`82ebf8d0c`](https://github.com/baloise/design-system/commit/82ebf8d0c7a15c03682f754d904c4bff151c72f0)]:
  - @baloise/design-system-icons@14.3.0
  - @baloise/design-system-tokens@14.3.0
  - @baloise/design-system-css@14.3.0
  - @baloise/design-system-fonts@14.3.0

## 14.2.1

### Patch Changes

- [#1100](https://github.com/baloise/design-system/pull/1100) - Correct sliding width issue in card carousel for consistent display

- [#1099](https://github.com/baloise/design-system/pull/1099) - Adjusted shifting of the tooltip and popup component. Moreover, adjust scroll position for touch navigation.

- Updated dependencies []:
  - @baloise/design-system-css@14.2.1
  - @baloise/design-system-fonts@14.2.1
  - @baloise/design-system-icons@14.2.1
  - @baloise/design-system-tokens@14.2.1

## 14.2.0

### Minor Changes

- [#1094](https://github.com/baloise/design-system/pull/1094) - Meta links can also be created by simply passing the `href` and `target` attributes along with the `buttons` component property.

  ```ts
  [
    {
      icon: 'web',
      touchPlacement: 'bottom',
      ariaLabel: 'Baloise',
      htmlTitle: 'Baloise',
      href: 'http://www.baloise.ch',
      target: '_blank'
    },
    ...
  ]
  ```

### Patch Changes

- [#1095](https://github.com/baloise/design-system/pull/1095) - The month list in the `date picker` now accurately displays the current month, ensuring precise date selection, and effectively manages disabled states within specified date ranges.

- Updated dependencies []:
  - @baloise/design-system-css@14.2.0
  - @baloise/design-system-fonts@14.2.0
  - @baloise/design-system-icons@14.2.0
  - @baloise/design-system-tokens@14.2.0

## 14.1.0

### Minor Changes

- [#1090](https://github.com/baloise/design-system/pull/1090) - Adjust the font size of `bal-field-label` and explore an expanded range of size variations for `bal-label`, offering increased flexibility in styling options.

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-css@14.1.0
  - @baloise/design-system-fonts@14.1.0
  - @baloise/design-system-icons@14.1.0
  - @baloise/design-system-tokens@14.1.0

## 14.0.5

### Patch Changes

- [#1084](https://github.com/baloise/design-system/pull/1084) - The number input pattern regex no longer returns a pattern mismatch. Additionally, the pattern attribute can be overridden.

- Updated dependencies []:
  - @baloise/design-system-css@14.0.5
  - @baloise/design-system-fonts@14.0.5
  - @baloise/design-system-icons@14.0.5
  - @baloise/design-system-tokens@14.0.5

## 14.0.4

### Patch Changes

- [#1082](https://github.com/baloise/design-system/pull/1082) - The number input pattern regex no longer returns a pattern mismatch. Additionally, the pattern attribute can be overridden.

- Updated dependencies []:
  - @baloise/design-system-css@14.0.4
  - @baloise/design-system-fonts@14.0.4
  - @baloise/design-system-icons@14.0.4
  - @baloise/design-system-tokens@14.0.4

## 14.0.3

### Patch Changes

- Updated dependencies []:
  - @baloise/design-system-css@14.0.3
  - @baloise/design-system-fonts@14.0.3
  - @baloise/design-system-icons@14.0.3
  - @baloise/design-system-tokens@14.0.3

## 14.0.2

### Patch Changes

- [#1055](https://github.com/baloise/design-system/pull/1055) - Adjust the opacity of the modal backdrop color, changing it from 0.8 to 0.6.

- [#1072](https://github.com/baloise/design-system/pull/1072) - The arrow position in the navigation popover has been adjusted, and the CSS utility class 'container' has been removed from the navigation component.

- [#1047](https://github.com/baloise/design-system/pull/1047) - Resize the tags within the input group to align with those of bal-select.

- [#1054](https://github.com/baloise/design-system/pull/1054) - Modify the badge width for extended content length.

- [#1074](https://github.com/baloise/design-system/pull/1074) - The BreakpointService will now only respond to state changes, thereby mitigating the Angular error `NG0101: ApplicationRef.tick is called recursively`. Furthermore, the injection of ngControl has been set as optional to prevent the NullInjector Warning.

- Updated dependencies []:
  - @baloise/design-system-css@14.0.2
  - @baloise/design-system-fonts@14.0.2
  - @baloise/design-system-icons@14.0.2
  - @baloise/design-system-tokens@14.0.2

## 14.0.1

### Patch Changes

- [`af2c20f52`](https://github.com/baloise/design-system/commit/af2c20f520d1978df0547be5767803ead6d66ed4) - Raise the z-index value of the toast to ensure it overlays a modal.

- Updated dependencies [[`af2c20f52`](https://github.com/baloise/design-system/commit/af2c20f520d1978df0547be5767803ead6d66ed4)]:
  - @baloise/design-system-tokens@14.0.1
  - @baloise/design-system-css@14.0.1
  - @baloise/design-system-fonts@14.0.1
  - @baloise/design-system-icons@14.0.1

## 14.0.0

### Major Changes

- [#940](https://github.com/baloise/design-system/pull/940) - Create z-index design tokens and adjust the components.

In version 14, we've introduced `z-index` values as design tokens. Consequently, adjustments were made to each component.
If you've been using **custom z-index values** in your app, please be aware that this could potentially result in broken layouts.

After upgrading the design system in your app, please take a moment to check if any layouts are affected. If necessary, make adjustments to the z-index accordingly.

| Name       | CSS-Variable               | Value     | Description                                                                                                          |
| ---------- | -------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------- |
| deep       | `--bal-z-index-deep`       | `-999999` | Deep z-index is used to stack something behind everything else.                                                      |
| default    | `--bal-z-index-default`    | `1`       | The default z-index for components and elements inside components.                                                   |
| masked     | `--bal-z-index-masked`     | `100`     | Default z-index for masked interface elements.                                                                       |
| mask       | `--bal-z-index-mask`       | `200`     | Default z-index for masking interface elements.                                                                      |
| sticky     | `--bal-z-index-sticky`     | `300`     | Default z-index for sticky interface elements.                                                                       |
| navigation | `--bal-z-index-navigation` | `400`     | Default z-index for navigation.                                                                                      |
| popup      | `--bal-z-index-popup`      | `1000`    | Default z-index for popups that stacks on top of all other elements.                                                 |
| modal      | `--bal-z-index-modal`      | `1100`    | Default z-index for modals that stacks on top of overlays and other elements, but still allows popups to be visible. |
| toast      | `--bal-z-index-toast`      | `1200`    | Default z-index for toast and snackbar messages.                                                                     |
| tooltip    | `--bal-z-index-tooltip`    | `1300`    | Default z-index for tooltips.                                                                                        |

Have a look at the [Z-Index documentation](https://design.baloise.dev?path=/docs/foundation-elevation-design-tokens--page).

### Minor Changes

- [#1041](https://github.com/baloise/design-system/pull/1041) - Introduce a compact theme option for the dashboard or internal applications.

  The compact theme features a narrower layout with a reduced font size (14px instead of 16px). Additionally, spaces such as margins and paddings are adjusted to align with mobile dimensions, ensuring a more compact appearance.

  To activate the compact theme, import the `theme-compact` stylesheet into the root App component or a global stylesheet.

  It is recommended to import the `theme-compact` file at the end of your stylesheet, after the other imports from the Design System.

  ```scss
  @import '@baloise/design-system-css/css/theme-compact';

  // or for SASS

  @import '@baloise/design-system-css/sass/theme-compact';
  ```

- [#940](https://github.com/baloise/design-system/pull/940) - Introducing the new and optimized `bal-nav` component. Designed for enhanced SEO and performance,
  it will replace the `bar-navigation` component in the upcoming breaking version release.

- [#1041](https://github.com/baloise/design-system/pull/1041) - The size of the logo component(in the navbar too) can be manually set to either 'normal' or 'small', allowing for manual adjustment and overriding the automatic responsive selection.

- [#940](https://github.com/baloise/design-system/pull/940) - add new component popup

- [#1040](https://github.com/baloise/design-system/pull/1040) - Introduce a new 'X' icon and replace the existing Twitter icon with the new one (X).

- [#1041](https://github.com/baloise/design-system/pull/1041) - The display of the checkbox component can be switched to 'inline'. This feature proves particularly useful for table integrations.

- [#1041](https://github.com/baloise/design-system/pull/1041) - The pagination component offers alignment options: 'start', 'center' (default), and 'end'. Additionally, the size can be adjusted to 'small' or 'normal' (default).

### Patch Changes

- [#1044](https://github.com/baloise/design-system/pull/1044) - Send the `balBlur` event only when the group of radios or checkboxes is left.

- [#1013](https://github.com/baloise/design-system/pull/1013) - To enhance the user experience during page navigation, the pagination component will now maintain a consistent width.

- [#1050](https://github.com/baloise/design-system/pull/1050) - The scroll handler will now only scroll on disconnection when it is disabled.

- [#940](https://github.com/baloise/design-system/pull/940) - Refine the appearance of disabled small controls on the pagination.

- Updated dependencies [[`01cfd5654`](https://github.com/baloise/design-system/commit/01cfd56549b2b602bb684c0b46d26d5262bd183b), [`c7224e882`](https://github.com/baloise/design-system/commit/c7224e882e0150b6de84772c52bb7c6eb2d724d4), [`0c9eea8ec`](https://github.com/baloise/design-system/commit/0c9eea8ec9492f1eaa0e1ff536fbccb09c56f8fc)]:
  - @baloise/design-system-tokens@14.0.0
  - @baloise/design-system-css@14.0.0
  - @baloise/design-system-icons@14.0.0
  - @baloise/design-system-fonts@14.0.0

## 13.7.1

### Patch Changes

- [#1037](https://github.com/baloise/design-system/pull/1037) - fix types errors

- Updated dependencies []:
  - @baloise/design-system-css@13.7.1
  - @baloise/design-system-fonts@13.7.1
  - @baloise/design-system-icons@13.7.1
  - @baloise/design-system-tokens@13.7.1

## 13.7.0

### Minor Changes

- [#877](https://github.com/baloise/design-system/pull/877) - Enhance the newly refactored `bal-date` components. `bal-datepicker` is marked as deprecated.

- [#999](https://github.com/baloise/design-system/pull/999) - Implement the tooltip component.

- [#1033](https://github.com/baloise/design-system/pull/1033) - Implement a reverse layout option for the stack component.

### Patch Changes

- [#1008](https://github.com/baloise/design-system/pull/1008) - Hide the tab line when no active tab is present.

- [#1007](https://github.com/baloise/design-system/pull/1007) - Relocate sticky footer styles to the core CSS file and update 'bal-app' for Vue applications.

- [#1001](https://github.com/baloise/design-system/pull/1001) - Include accessibility (a11y) labels for both the accordion and pagination components.

- [#1033](https://github.com/baloise/design-system/pull/1033) - The datepicker, select, and number-input components trigger a blur event when they lose focus or when any associated pop-up or dropdown is closed. Additionally, the blur event occurs after the value change.

- [#1025](https://github.com/baloise/design-system/pull/1025) - Implement a 'scroll to top' feature upon toggling the mobile navbar to prevent any space between the navbar brand and the menu.

- [#1033](https://github.com/baloise/design-system/pull/1033) - Addressed event propagation issues and refined the event sequence for the number-input component.

- [#1014](https://github.com/baloise/design-system/pull/1014) - Verify if a checkbox is selected within a group.

- [#881](https://github.com/baloise/design-system/pull/881) - Ensure that `aria-labelledby` is correctly linked to the appropriate label, and that the `for` attribute corresponds to the correct input.

- [#1027](https://github.com/baloise/design-system/pull/1027) - Resolve pattern issue with the number-input component.

- Updated dependencies [[`bfd7493b2`](https://github.com/baloise/design-system/commit/bfd7493b2263cd62929f6e5f1421e914cbe6efbd)]:
  - @baloise/design-system-css@13.7.0
  - @baloise/design-system-fonts@13.7.0
  - @baloise/design-system-icons@13.7.0
  - @baloise/design-system-tokens@13.7.0

## 13.6.2

### Patch Changes

- [#995](https://github.com/baloise/design-system/pull/995) - file-upload input handles every change event to detect duplicated files

- Updated dependencies []:
  - @baloise/design-system-css@13.6.2
  - @baloise/design-system-fonts@13.6.2
  - @baloise/design-system-icons@13.6.2
  - @baloise/design-system-tokens@13.6.2

## 13.6.1

### Patch Changes

- [#990](https://github.com/baloise/design-system/pull/990) - add a11y labels to close component

- [#993](https://github.com/baloise/design-system/pull/993) - radio and checkbox groups update children on runtime

- [#988](https://github.com/baloise/design-system/pull/988) - file-upload input handles every change event to detect duplicated files

- Updated dependencies []:
  - @baloise/design-system-css@13.6.1
  - @baloise/design-system-fonts@13.6.1
  - @baloise/design-system-icons@13.6.1
  - @baloise/design-system-tokens@13.6.1

## 13.6.0

### Minor Changes

- [#984](https://github.com/baloise/design-system/pull/984) - hide svg from screen readers

- [#976](https://github.com/baloise/design-system/pull/976) - add new tertiary button with a themed option

### Patch Changes

- [#984](https://github.com/baloise/design-system/pull/984) - add role progressbar to spinner

- Updated dependencies [[`2742f1175`](https://github.com/baloise/design-system/commit/2742f1175a0758413cc03d01ad9f031c8f92c4dc), [`2742f1175`](https://github.com/baloise/design-system/commit/2742f1175a0758413cc03d01ad9f031c8f92c4dc), [`de4626053`](https://github.com/baloise/design-system/commit/de46260536aa3e53e0aa7cf96796a7566f08177f), [`de4626053`](https://github.com/baloise/design-system/commit/de46260536aa3e53e0aa7cf96796a7566f08177f)]:
  - @baloise/design-system-icons@13.6.0
  - @baloise/design-system-css@13.6.0
  - @baloise/design-system-fonts@13.6.0
  - @baloise/design-system-tokens@13.6.0

## 13.5.0

### Minor Changes

- [#958](https://github.com/baloise/design-system/pull/958) - accordion trigger accepts color and size to set for the button

### Patch Changes

- [#958](https://github.com/baloise/design-system/pull/958) - accordion sets initial active state

- [#959](https://github.com/baloise/design-system/pull/959) - list title and subtitle have text align left

- [#960](https://github.com/baloise/design-system/pull/960) - select validates after blur on button and input

- Updated dependencies []:
  - @baloise/design-system-css@13.5.0
  - @baloise/design-system-fonts@13.5.0
  - @baloise/design-system-icons@13.5.0
  - @baloise/design-system-tokens@13.5.0

## 13.4.4

### Patch Changes

- [#936](https://github.com/baloise/design-system/pull/936) - enable bal-steps item state to be changed dynamically during component life

- [#938](https://github.com/baloise/design-system/pull/938) - number-inputs attribute pattern no longer shows undefined

- Updated dependencies []:
  - @baloise/design-system-css@13.4.4
  - @baloise/design-system-fonts@13.4.4
  - @baloise/design-system-icons@13.4.4
  - @baloise/design-system-tokens@13.4.4

## 13.4.3

### Patch Changes

- [#927](https://github.com/baloise/design-system/pull/927) - create unique ids for tab items

- [#920](https://github.com/baloise/design-system/pull/920) - handle ResizeObserver callback inside a AnimationFrame

- [#922](https://github.com/baloise/design-system/pull/922) - rename event to ev to prevent reference errors

- [#927](https://github.com/baloise/design-system/pull/927) - pass alt tag to stage-image and carousel image

- Updated dependencies []:
  - @baloise/design-system-css@13.4.3
  - @baloise/design-system-fonts@13.4.3
  - @baloise/design-system-icons@13.4.3
  - @baloise/design-system-tokens@13.4.3

## 13.4.2

### Patch Changes

- [#916](https://github.com/baloise/design-system/pull/916) - check if window is defined

- Updated dependencies []:
  - @baloise/design-system-css@13.4.2
  - @baloise/design-system-fonts@13.4.2
  - @baloise/design-system-icons@13.4.2
  - @baloise/design-system-tokens@13.4.2

## 13.4.1

### Patch Changes

- [#912](https://github.com/baloise/design-system/pull/912) - fix steps carousel option for mobile breakpoint

- [#913](https://github.com/baloise/design-system/pull/913) - fix label overflow on vertical tabs

- Updated dependencies []:
  - @baloise/design-system-css@13.4.1
  - @baloise/design-system-fonts@13.4.1
  - @baloise/design-system-icons@13.4.1
  - @baloise/design-system-tokens@13.4.1

## 13.4.0

### Minor Changes

- [#897](https://github.com/baloise/design-system/pull/897) - add free-solo variant to bal-select. hides trigger icon

### Patch Changes

- [#899](https://github.com/baloise/design-system/pull/899) - fix bal-close state background colors and remove unnecessary customization variables

- [#897](https://github.com/baloise/design-system/pull/897) - fix loading state for datepicker and select

- Updated dependencies []:
  - @baloise/design-system-css@13.4.0
  - @baloise/design-system-fonts@13.4.0
  - @baloise/design-system-icons@13.4.0
  - @baloise/design-system-tokens@13.4.0

## 13.3.1

### Patch Changes

- [#891](https://github.com/baloise/design-system/pull/891) - border of the vertical tabs will not be 100% height and content stretches to the whole width.

- [#892](https://github.com/baloise/design-system/pull/892) - heading content can break in bal-file-upload

- [#889](https://github.com/baloise/design-system/pull/889) - label content can break

- [#887](https://github.com/baloise/design-system/pull/887) - carousel uses computed width instead of rounded client width

- [#885](https://github.com/baloise/design-system/pull/885) - fix carousel resize listener, improves tabs overflow option.

- Updated dependencies []:
  - @baloise/design-system-css@13.3.1
  - @baloise/design-system-fonts@13.3.1
  - @baloise/design-system-icons@13.3.1
  - @baloise/design-system-tokens@13.3.1

## 13.3.0

### Minor Changes

- [#834](https://github.com/baloise/design-system/pull/834) - add new css variables for theming to components and css-framework

  - bal-card
  - bal-radio
  - bal-checkbox
  - bal-navbar
  - bal-tag
  - bal-time-input
  - bal-button
  - bal-text
  - bal-heading
  - bal-label
  - bal-datepicker
  - bal-modal
  - bal-hint
  - bal-divider
  - bal-sheet
  - bal-select
  - bal-carousel
  - bal-data
  - bal-list
  - bal-popover
  - bal-stage
  - bal-footer
  - bal-pagination
  - bal-close
  - bal-steps
  - bal-tabs
  - bal-toast
  - bal-snackbar
  - bal-notification

### Patch Changes

- [#849](https://github.com/baloise/design-system/pull/849) - improved performance of the utils

- Updated dependencies []:
  - @baloise/design-system-css@13.3.0
  - @baloise/design-system-fonts@13.3.0
  - @baloise/design-system-icons@13.3.0
  - @baloise/design-system-tokens@13.3.0

## 13.2.1

### Patch Changes

- [#836](https://github.com/baloise/design-system/pull/836) [`d15d31f84`](https://github.com/baloise/design-system/commit/d15d31f847dd7dfd3b1d2e083cba058df1b37229) Thanks [@hirsch88](https://github.com/hirsch88)! - fix gatsby build

- [#841](https://github.com/baloise/design-system/pull/841) [`3daa7fd9e`](https://github.com/baloise/design-system/commit/3daa7fd9e13985bf731da4e65ac70775f388b97f) Thanks [@hirsch88](https://github.com/hirsch88)! - fix accordion active prop watcher

- Updated dependencies []:
  - @baloise/design-system-css@13.2.1
  - @baloise/design-system-fonts@13.2.1
  - @baloise/design-system-icons@13.2.1
  - @baloise/design-system-tokens@13.2.1

## 13.2.0

### Minor Changes

- [#832](https://github.com/baloise/design-system/pull/832) [`33a99a667`](https://github.com/baloise/design-system/commit/33a99a667cb312e3bdc000baf3068a8f9f1b2b1c) Thanks [@github-actions](https://github.com/apps/github-actions)! - add progress-bar component

### Patch Changes

- [#829](https://github.com/baloise/design-system/pull/829) [`458564b23`](https://github.com/baloise/design-system/commit/458564b235adec25efd819a46ec4a0c6034d2221) Thanks [@github-actions](https://github.com/apps/github-actions)! - add theming to the bal-icon

- Updated dependencies []:
  - @baloise/design-system-css@13.2.0
  - @baloise/design-system-fonts@13.2.0
  - @baloise/design-system-icons@13.2.0
  - @baloise/design-system-tokens@13.2.0

## 13.1.0

### Minor Changes

- [`8aba416f2`](https://github.com/baloise/design-system/commit/8aba416f22901fb8eb3cfb5d751ef1d144caa820) Thanks [@hirsch88](https://github.com/hirsch88)! - add new colors to the badge component

- [#831](https://github.com/baloise/design-system/pull/831) [`da3782269`](https://github.com/baloise/design-system/commit/da3782269b79a4524e897b82116fb64cd588b6ea) Thanks [@hirsch88](https://github.com/hirsch88)! - add new orientation utils

- [#828](https://github.com/baloise/design-system/pull/828) [`eb7c79c62`](https://github.com/baloise/design-system/commit/eb7c79c62554cdffaa781e77e85371899d01ed25) Thanks [@hirsch88](https://github.com/hirsch88)! - add auto-level to heading component to shrink the visual level until it fits.

### Patch Changes

- [#782](https://github.com/baloise/design-system/pull/782) [`31fe21972`](https://github.com/baloise/design-system/commit/31fe219724109af104e02cba89d11166e6dc67cf) Thanks [@github-actions](https://github.com/apps/github-actions)! - add visual tests for the css framework

- Updated dependencies []:
  - @baloise/design-system-css@13.1.0
  - @baloise/design-system-fonts@13.1.0
  - @baloise/design-system-icons@13.1.0
  - @baloise/design-system-tokens@13.1.0

## 13.0.0

### Major Changes

- [#806](https://github.com/baloise/design-system/pull/806) [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c) Thanks [@hirsch88](https://github.com/hirsch88)! - improved scroll handler blocks scrolling with only CSS.
  With that we are able to remember the last scroll position of the user.

  **before**

  ```typescript
  const scrollHandler = BodyScrollBlocker()
  this.bodyScrollBlocker.block()
  this.bodyScrollBlocker.allow()
  ```

  **after**

  Rename the handler to `ScrollHandler` and call the `connect` function to
  connect the handler to the target element (Default is document). `block` and `allow` have been
  renamed to `disable` and `enable`. The new function `disconnect` removes all
  the defined event listeners and resets the handler.

  ```typescript
  const scrollHandler = ScrollHandler()

  // can also pass in a custom element instead of using document
  scrollHandler.connect()
  scrollHandler.disable()
  scrollHandler.enable()
  scrollHandler.disconnect()
  ```

- [#806](https://github.com/baloise/design-system/pull/806) [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c) Thanks [@hirsch88](https://github.com/hirsch88)! - The namespaces Props and Events are renamed to BalProps and BalEvents.
  As long as the packages `@baloise/design-system-components` is imported into your project
  you have direct access to the new namespaces.

  #### With Props

  **before**

  ```typescript
  import { Props } from '@baloise/design-system-components'

  const myColor: Props.BalButtonColor = 'primary'
  ```

  **after**

  ```typescript
  const myColor: BalProps.BalButtonColor = 'primary'
  ```

  #### With Events

  **before**

  ```typescript
  import type { Events } from "@baloise/design-system-components"

  const onChange = (event: Events.BalAccordionChange) => {
    const myAccordion = event.target // type => EventTarget
    const myDetail = event.detail // type => boolean
    ...
  }
  ```

  **after**

  ```typescript
  const onChange = (event: BalEvents.BalAccordionChange) => {
    const myAccordion = event.target // type => HTMLBalAccordion
    const myDetail = event.detail // type => boolean
    ...
  }
  ```

  All component types are now located in the component folders `*.interfaces.ts` file.

- [#806](https://github.com/baloise/design-system/pull/806) [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c) Thanks [@hirsch88](https://github.com/hirsch88)! - add new `steps` component with options property and overflow solution

  **before**

  ```html
  <bal-tabs interface="o-steps" value="tab-a">
    <bal-tab-item done value="tab-a" label="Tab A">Content of Tab A</bal-tab-item>
  </bal-tabs>
  ```

  **after**

  The interface of the components are the same as before.
  Only the tag names of the component changed and to pass the `interface` property is not needed anymore.

  ```html
  <bal-steps value="tab-a">
    <bal-step-item done value="tab-a" label="Tab A">Content of Tab A</bal-step-item>
  </bal-steps>
  ```

- [#806](https://github.com/baloise/design-system/pull/806) [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c) Thanks [@hirsch88](https://github.com/hirsch88)! - update dependency stencil to v3.

- [#806](https://github.com/baloise/design-system/pull/806) [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c) Thanks [@hirsch88](https://github.com/hirsch88)! - Remove inverted property from bal-stage, bal-datepicker, bal-input, bal-textarea.

  Inverted property is removed because is not supported in our new rebranded style.

  Components that are affected are:

  | Component        | Property |
  | :--------------- | :------- |
  | `bal-stage`      | inverted |
  | `bal-datepicker` | inverted |
  | `bal-input`      | inverted |
  | `bal-textarea`   | inverted |

- [#806](https://github.com/baloise/design-system/pull/806) [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c) Thanks [@hirsch88](https://github.com/hirsch88)! - accordion & popover renamed property `value` to `active`, since they are not considered as a form control component.

  **before**

  ```html
  <bal-accordion value="true">My hidden Content</bal-accordion>
  ```

  **after**

  ```html
  <bal-accordion active="true">My hidden Content</bal-accordion>
  ```

- [#806](https://github.com/baloise/design-system/pull/806) [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c) Thanks [@hirsch88](https://github.com/hirsch88)! - remove deprecated global component styles.
  Component styles will be loaded lazy to optimize the speed of the first render, there for only import the needed CSS files.

  #### Global import

  The global import of the main styles and his utility classes move to the CSS framework.

  **before**

  ```scss
  @import '@baloise/design-system-components/src/styles/global';
  ```

  **after**

  With the solution we are able to add only what we need.

  ```scss
  // SASS mixins and variables
  @import '@baloise/design-system-css/sass/mixins';

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

  #### Component utilities import

  The location of the `variable` & `mixins` has changed to `@baloise/design-system-css/sass/mixins`.

  **before**

  ```scss
  @import '@baloise/design-system-components/src/styles/global.utilities';
  ```

  **after**

  ```scss
  @import '@baloise/design-system-css/sass/mixins';
  ```

- [#806](https://github.com/baloise/design-system/pull/806) [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c) Thanks [@hirsch88](https://github.com/hirsch88)! - .title, bal-heading, bal-text and bal-label inherit default color

- [#806](https://github.com/baloise/design-system/pull/806) [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c) Thanks [@hirsch88](https://github.com/hirsch88)! - remove deprecated parts

  ### Design Token Removal

  | Component     | Value     | Why                                     |
  | ------------- | --------- | --------------------------------------- |
  | **radius**    | `small`   | Is not supported in the new Style Guide |
  | **radius**    | `x-large` | Is not supported in the new Style Guide |
  | **container** | `is-blog` | Use default container instead           |

  ### Component Property Renaming

  | Component            | Before        | After              |
  | -------------------- | ------------- | ------------------ |
  | **bal-card-actions** | `right`       | `position="right"` |
  | **bal-navbar-brand** | `link-target` | `target`           |
  | **bal-stage**        | `has-shape`   | `shape`            |
  | **bal-radio**        | `is-empty`    | `label-hidden`     |

  ### Component Property Removal

  | Component      | Property       | Why                                                              |
  | -------------- | -------------- | ---------------------------------------------------------------- |
  | **bal-select** | `no-border`    | Left over from the old style guide. Was event not active anymore |
  | **bal-select** | `has-movement` | Left over from the old style guide. Was event not active anymore |

### Minor Changes

- [#806](https://github.com/baloise/design-system/pull/806) [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c) Thanks [@hirsch88](https://github.com/hirsch88)! - add `border` property to bal-carousel to show a light border at the bottom.

- [#806](https://github.com/baloise/design-system/pull/806) [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c) Thanks [@hirsch88](https://github.com/hirsch88)! - add more alignment options and add padding properties to the bal-stack

- [#806](https://github.com/baloise/design-system/pull/806) [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c) Thanks [@hirsch88](https://github.com/hirsch88)! - add no-wrap option to typography components to cut long text with ellipse

- [#806](https://github.com/baloise/design-system/pull/806) [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c) Thanks [@hirsch88](https://github.com/hirsch88)! - add new component divider

### Patch Changes

- Updated dependencies [[`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c), [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c), [`95f127928`](https://github.com/baloise/design-system/commit/95f12792866f62a40ade705316587d475c4aa37c)]:
  - @baloise/design-system-css@13.0.0
  - @baloise/design-system-tokens@13.0.0
  - @baloise/design-system-fonts@13.0.0
  - @baloise/design-system-icons@13.0.0

## 12.13.1

### Patch Changes

- [#815](https://github.com/baloise/design-system/pull/815) [`55e69fdf0`](https://github.com/baloise/design-system/commit/55e69fdf07a37c32a0f85c8f0a9bd492c0629f74) Thanks [@hirsch88](https://github.com/hirsch88)! - fix scroll handler by using css to keep it as smooth as possible

- [#815](https://github.com/baloise/design-system/pull/815) [`55e69fdf0`](https://github.com/baloise/design-system/commit/55e69fdf07a37c32a0f85c8f0a9bd492c0629f74) Thanks [@hirsch88](https://github.com/hirsch88)! - add missing download property to the bal-list-item

- Updated dependencies []:
  - @baloise/design-system-css@12.13.1
  - @baloise/design-system-fonts@12.13.1
  - @baloise/design-system-icons@12.13.1
  - @baloise/design-system-tokens@12.13.1

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

  - [bal-content](https://design.baloise.dev/?path=/docs/components-layout-content--basic)
  - [bal-stack](https://design.baloise.dev/?path=/docs/components-layout-stack--basic)

  New radio and checkbox style:

  - [bal-checkbox button](https://design.baloise.dev/?path=/docs/components-form-checkbox--basic#checkbox-button)
  - [bal-radio button](https://design.baloise.dev/?path=/docs/components-form-radio--basic#radio-button)

  Updated bal-icon component. New colors, sizes are added and state properties invalid and disabled. Moreover, the color `auto` can
  be used to leave the color as it is.

  Check out the updated [documentation](https://design.baloise.dev/?path=/docs/components-icon--basic) for the bal-icon.

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

## [12.1.0](https://github.com/baloise/design-system/compare/v12.0.0...v12.1.0) (2022-12-20)

### Features

- add static file server for fonts ([40eb3ef](https://github.com/baloise/design-system/commit/40eb3ef0003da73f2215055539dfb938fbc3aaea))
- **icons:** add location-target icon ([41eb766](https://github.com/baloise/design-system/commit/41eb7665e0acd1135b9eb5b78c46672789a78dae))

### Bug Fixes

- **angular:** only listen to host balChanges ([ecd3e2a](https://github.com/baloise/design-system/commit/ecd3e2aa7f56eef27ef6472800b4ad2d3a6f35cf))
- **angular:** only listen to host balChanges ([b444de8](https://github.com/baloise/design-system/commit/b444de84422fd635209fc79f67b536051cea6fee))
- **bal-input-slider:** round value for line drawing ([693f5a4](https://github.com/baloise/design-system/commit/693f5a41e38ed82da283f76244a30ffafa9e4078))
- **bal-number-input:** allow decimal point for de, be and lu ([ae9cf13](https://github.com/baloise/design-system/commit/ae9cf1384e54ad82547f0606df94162e7f6918f8))
- **bal-number-input:** allow negative numbers ([fa100bb](https://github.com/baloise/design-system/commit/fa100bb853a17746127a9e56587e9756ae9d52ce))
- **datepicker:** next mont calculation. Closes [#995](https://github.com/baloise/design-system/issues/995) ([40ddca3](https://github.com/baloise/design-system/commit/40ddca376c62e043286ce97c5c86cbc549fcbbd1))
- fixes [#952](https://github.com/baloise/design-system/issues/952) bal-card-title with bal-tag in bal-card aligned ([2894f00](https://github.com/baloise/design-system/commit/2894f00137ca0e6b5406941a01e1a1848a339243))
- **navbar:** adjust min padding for mobile ([28e429d](https://github.com/baloise/design-system/commit/28e429ded7fa7f06ca7d1e1807240cbfb86f9efd))
- **navbar:** adjust position of content ([4c9a880](https://github.com/baloise/design-system/commit/4c9a8804788984de0c5f3432a0930575c332834d))
- **select:** if empty string value set empty array for the rawValue ([595e110](https://github.com/baloise/design-system/commit/595e11002ae9d8b3a28d50c11fac92a6e33206ce))
- **select:** improve hover style ([4ce3676](https://github.com/baloise/design-system/commit/4ce3676dc0c4edbef20608bc4dae72a170ab1e99))

### Performance Improvements

- **popover:** reduce rendering by using componentWillLoad ([a99648f](https://github.com/baloise/design-system/commit/a99648fcc35f0683785266f87c6d2b66ba6950b9))

## [12.0.0](https://github.com/baloise/design-system/compare/v11.0.18...v12.0.0) (2022-12-12)

Follow the migration guide [Migration from 11.x to 12.x](https://design.baloise.dev/?path=/story/development-migration-migration-from-11-x-to-12-x--page)

### ⚠ BREAKING CHANGES

- Stencil update to v2.20.0
- Cypress update to v11.2.0
- Load Custom Icons
- Lazy Loading Component Styles
- Design Token Reduction
- CSS-Helper Reduction
- Separation of bal-number-input & bal-input

### Features

- **carousel:** new component, which replaces the slider components
- **icons:** add location-target icon ([41eb766](https://github.com/baloise/design-system/commit/41eb7665e0acd1135b9eb5b78c46672789a78dae))

### Bug Fixes

- **accordion:** not remove hidden content from the DOM ([1f52f95](https://github.com/baloise/design-system/commit/1f52f95fe38b845cce866025653c9183cbf61c5b))

## [11.0.17](https://github.com/baloise/design-system/compare/v11.0.16...v11.0.17) (2022-12-01)

### Bug Fixes

- **select:** remote do not validate and return input value on blur ([5618faa](https://github.com/baloise/design-system/commit/5618faa7c8f6e7cfdc6fca7ae7796dbe82333bcb))
- **select:** remote typeahead display initial value ([3e61a90](https://github.com/baloise/design-system/commit/3e61a902848ebed392f00dc1085e6e76498280c2))
- **tabs:** adjust label for steps to start at 1 ([600260e](https://github.com/baloise/design-system/commit/600260ea5eb2111ddfe2f3bedf297f0344ba13fd))

## [11.0.16](https://github.com/baloise/design-system/compare/v11.0.15...v11.0.16) (2022-11-30)

## [11.0.15](https://github.com/baloise/design-system/compare/v11.0.14...v11.0.15) (2022-11-29)

### Bug Fixes

- **bal-radio:** change link color to inverted when selected ([f1068ed](https://github.com/baloise/design-system/commit/f1068edeb069c048853a32e73a1f0e8db215ccec))
- **bal-tabs:** scope bal-tab-items ([67f1fd6](https://github.com/baloise/design-system/commit/67f1fd6ed27dfd32a4af91d1551aacf4d6230f3a))
- **bal-upload:** duplicate file message not showing ([ad0a617](https://github.com/baloise/design-system/commit/ad0a617a39fe73a16922cb126c665d38545e21b5))
- **datepicker:** disable next month button if max is reached ([86bd195](https://github.com/baloise/design-system/commit/86bd19568c562c913bed6cbafaab968af6e17cd0))
- fix depracted fields in navbar,stage and bal-list ([6607cdd](https://github.com/baloise/design-system/commit/6607cddf6978bc0c1a3462119bbe58933e522549))
- **html:** remove duplicated overflow settings ([3bb9e2f](https://github.com/baloise/design-system/commit/3bb9e2ff6fff255693246c34f6bfa66792fbfde7))
- **html:** set overflow to overflow-x:hidden only ([3a801b0](https://github.com/baloise/design-system/commit/3a801b04b52fc0ddab07086ad7836c868acac8f1))
- **list:** ignore inverted when it is undefined ([d1046b7](https://github.com/baloise/design-system/commit/d1046b7da955e0909581e495dcc38efcf2777d6e))
- **sass:** remove ~ of the imports. Closes [#895](https://github.com/baloise/design-system/issues/895) ([d55ea5b](https://github.com/baloise/design-system/commit/d55ea5be1152f9afde6fe73424580db920b69061))
- **tabs:** set index ([2abe233](https://github.com/baloise/design-system/commit/2abe23315b4b214e5f67a5c25cc745c170229483))

## [11.0.14](https://github.com/baloise/design-system/compare/v11.0.13...v11.0.14) (2022-11-22)

### Bug Fixes

- fixes [#787](https://github.com/baloise/design-system/issues/787) add visualLevel for bal-list-item-title ([f157772](https://github.com/baloise/design-system/commit/f157772bddf32f611e93a6942cf799b9d7dd927d))
- isEmpty handler of bal-radio to work with false value as well ([c09b68c](https://github.com/baloise/design-system/commit/c09b68c3dc6d89ed7173f0a2906332ecd76cdaf6))

## [11.0.13](https://github.com/baloise/design-system/compare/v11.0.12...v11.0.13) (2022-11-17)

### Bug Fixes

- **angular-focus-directive:** call setFocus method and update docs ([8b7a858](https://github.com/baloise/design-system/commit/8b7a8589c7a380f7122dd4e66df144a399fd7367))
- **bal-upload:** show duplicated file message ([9c32892](https://github.com/baloise/design-system/commit/9c32892a14d015f0da951a6e56afd77b7474f287))
- fix stroy book of radio boxes to use labbel-hidden property instead of depricated is-empty ([f051f47](https://github.com/baloise/design-system/commit/f051f474f535ed58305b306d0bb5d40303d0d8cd))
- fix usage of depricated is-empty to work in bal-radio ([910a5ef](https://github.com/baloise/design-system/commit/910a5ef5fec9956fe5fd6b154d4595336f6aebc0))
- **logo:** load svg on resize ([6e6cc3d](https://github.com/baloise/design-system/commit/6e6cc3dd4cd7bd9e45f112cecc09df46b69b11dc))
- **select:** initial value update. Closes [#872](https://github.com/baloise/design-system/issues/872) ([6139bb3](https://github.com/baloise/design-system/commit/6139bb3d488567cc3e9774d1677d94d56110fcde))
- update @baloise/web-app-utils to solve safari 13 issues ([cecc461](https://github.com/baloise/design-system/commit/cecc4611ebe2344a83305d56c74aaf5ca48f0533))
- update @baloise/web-app-utils to solve safari 13 issues ([04f0da0](https://github.com/baloise/design-system/commit/04f0da0b696a3eac6686f43458e1c2c41753d386))
- update @baloise/web-app-utils to solve safari 13 issues ([43c5b13](https://github.com/baloise/design-system/commit/43c5b132b4089346a132dbbda34c15b86860735a))

### Performance Improvements

- exclude unused tokens and splitted helpers form base style ([4e4710e](https://github.com/baloise/design-system/commit/4e4710e28cb77e2cb25bddab3cbfc8a91207d81e))
- reduce web-app-utils imports ([7c3a21f](https://github.com/baloise/design-system/commit/7c3a21f3d995c3096c0ef23498936ddd6d9b9e3b))

## [11.0.12](https://github.com/baloise/design-system/compare/v11.0.11...v11.0.12) (2022-11-03)

## [11.0.11](https://github.com/baloise/design-system/compare/v11.0.10...v11.0.11) (2022-11-03)

### Performance Improvements

- lazy load component styles ([53ea546](https://github.com/baloise/design-system/commit/53ea5460bd46e1a4525fccccdd5c039cad8938eb))

## [11.0.10](https://github.com/baloise/design-system/compare/v11.0.9...v11.0.10) (2022-10-31)

### Bug Fixes

- remove source maps ([9ac37b1](https://github.com/baloise/design-system/commit/9ac37b13e4d634d43b51c4467e7174249f542c31))

### Performance Improvements

- lazy load component styles ([2f90efe](https://github.com/baloise/design-system/commit/2f90efe0d920c2bb9ab4db54ca2b89b43f6ea33c))
- load css when needed ([87a739e](https://github.com/baloise/design-system/commit/87a739ec5f68c92f4294f80052e8ff5748ae4e13))

## [11.0.9](https://github.com/baloise/design-system/compare/v11.0.5...v11.0.9) (2022-10-28)

### Features

- **carousel:** add controls small & large ([75e9bea](https://github.com/baloise/design-system/commit/75e9bea99737fddfc52cec31cc455e0a568853cd))
- **carousel:** add new component ([80596ca](https://github.com/baloise/design-system/commit/80596cae323c6d46d4cf6ee8a4a94738fea144c9))

## [11.0.5](https://github.com/baloise/design-system/compare/v11.0.3...v11.0.5) (2022-10-25)

## [11.0.3](https://github.com/baloise/design-system/compare/v11.0.1...v11.0.3) (2022-10-24)

### Performance Improvements

- **icons:** only import the icons of the DS ([9f6bb59](https://github.com/baloise/design-system/commit/9f6bb59d225a72409a82b212853745436ed93716))

## [11.0.1](https://github.com/baloise/design-system/compare/v10.24.10...v11.0.1) (2022-10-20)

### Bug Fixes

- **cart:** empty color will not add a css class ([e69b4a3](https://github.com/baloise/design-system/commit/e69b4a3d56543fe60ec806336d10c61a6fc65074))
- change to visibility instead of display ([54efef5](https://github.com/baloise/design-system/commit/54efef5e2028cbda55c6e6b50648f405781d99c4))
- load used DS icons as default ([e8a139f](https://github.com/baloise/design-system/commit/e8a139ff9d3d453eba6d3ffcff61e2a4be65588f))
- **navbar:** add target prop to navbar-brand. Closes [#769](https://github.com/baloise/design-system/issues/769) ([d0b3555](https://github.com/baloise/design-system/commit/d0b3555294c3c296ca5d15d4c021bb03dc043054))
- **navbar:** update touch view. Closes [#770](https://github.com/baloise/design-system/issues/770) ([24a87c3](https://github.com/baloise/design-system/commit/24a87c3e00b32d51085ae90e2ebfa9b247c5be48))
- **navigation:** add missing tracking ([20815a7](https://github.com/baloise/design-system/commit/20815a7c130ab5c9fe2aaf4d2381293e29c1e214))
- update stencil config to solve angular issue ([189b62c](https://github.com/baloise/design-system/commit/189b62c969a4f29365c3c80b68137969f5e15f84))

### Performance Improvements

- use custom bundles and do not ship doc components ([b5da0b6](https://github.com/baloise/design-system/commit/b5da0b676aa467b22754233a748ba83a986eb284))

## [10.24.10](https://github.com/baloise/design-system/compare/v10.24.9...v10.24.10) (2022-10-17)

### Bug Fixes

- **icons:** add missing tiktok icon ([7c04896](https://github.com/baloise/design-system/commit/7c048963a7a42863409f573e09e2a5f72fbf31a6))
- remove padding of the fieldset ([6390d75](https://github.com/baloise/design-system/commit/6390d75a01a7770ea5a05a23f2f23b16d7bd217c))

### Performance Improvements

- **icons:** don't load all icons. let the user decide ([3357e78](https://github.com/baloise/design-system/commit/3357e7842781363a89df67576c570172306fe8a3))

## [10.24.9](https://github.com/baloise/design-system/compare/v10.24.7...v10.24.9) (2022-10-11)

### Features

- **bal-navigation-menu-list-item:** added the target attr for grey menu list headline ([ddc8339](https://github.com/baloise/design-system/commit/ddc8339de57fd27bae24d41f3a2bac022b0ab08c))
- **bal-navigation-menu-list-item:** added the target attribute for items from grey lists ([773362e](https://github.com/baloise/design-system/commit/773362e2f1face1585ecbeae0c41ab0413900030))

### Bug Fixes

- adjust small spacing value to 0.75rem. Closes [#706](https://github.com/baloise/design-system/issues/706) ([2bdc29a](https://github.com/baloise/design-system/commit/2bdc29af2ed232d871a73ec5f754c49f77dceb97))
- **angular:** add dismissAll method to the toast and snackbar service. Closes [#703](https://github.com/baloise/design-system/issues/703) ([4e9070a](https://github.com/baloise/design-system/commit/4e9070ad37e6a441c045cc39f7e91bfb09ea26cb))
- **bal-stage:** adjusted content width mobile to full-width ([#684](https://github.com/baloise/design-system/issues/684)) ([65bcec9](https://github.com/baloise/design-system/commit/65bcec9c9c3835b3253151906f12d6b12fa18c1f))
- **bal-tabs:** create separate numberation for o-tabs based on independent varaiable ([461b5f9](https://github.com/baloise/design-system/commit/461b5f9eca198e66929d27ee1cbdd7ed173ef0fd))
- improve migration guide ([6eae447](https://github.com/baloise/design-system/commit/6eae4478450e1aefe3ddc497b632f806bce01a84))
- improve notification toast and snackbar stories ([5d684ca](https://github.com/baloise/design-system/commit/5d684ca17032136ba3f5bce7cf2bb5663ad9765e))
- **tabs:** add missing target prop. Closes [#700](https://github.com/baloise/design-system/issues/700) ([808d52e](https://github.com/baloise/design-system/commit/808d52e02bdf51bbf87dbd14e10ef184a1a93080))
- **tabs:** adjust the numbering of the steps. Closes [#586](https://github.com/baloise/design-system/issues/586) ([dda1799](https://github.com/baloise/design-system/commit/dda1799b6f7adde17ac36e6fd62a2f60e338b43d))
- **tabs:** break tab label on vertical. Closes [#688](https://github.com/baloise/design-system/issues/688) ([1f62ddf](https://github.com/baloise/design-system/commit/1f62ddfecd781ab912c2c70839248b85a9c9393b))

## [10.24.7](https://github.com/baloise/design-system/compare/v10.24.5...v10.24.7) (2022-10-06)

## 10.24.5 (2022-10-05)

## [11.0.18](https://github.com/baloise/design-system/compare/v11.0.17...v11.0.18) (2022-12-05)

### Bug Fixes

- adjust nested package versions ([ab25072](https://github.com/baloise/design-system/commit/ab250724bad392d031d3750f1633e659932047bc))

## [11.0.17](https://github.com/baloise/design-system/compare/v11.0.16...v11.0.17) (2022-12-01)

### Bug Fixes

- **select:** remote do not validate and return input value on blur ([5618faa](https://github.com/baloise/design-system/commit/5618faa7c8f6e7cfdc6fca7ae7796dbe82333bcb))
- **select:** remote typeahead display initial value ([3e61a90](https://github.com/baloise/design-system/commit/3e61a902848ebed392f00dc1085e6e76498280c2))
- **tabs:** adjust label for steps to start at 1 ([600260e](https://github.com/baloise/design-system/commit/600260ea5eb2111ddfe2f3bedf297f0344ba13fd))

## [11.0.16](https://github.com/baloise/design-system/compare/v11.0.15...v11.0.16) (2022-11-30)

**Note:** Version bump only for package root

## [11.0.15](https://github.com/baloise/design-system/compare/v11.0.14...v11.0.15) (2022-11-29)

### Bug Fixes

- **bal-radio:** change link color to inverted when selected ([f1068ed](https://github.com/baloise/design-system/commit/f1068edeb069c048853a32e73a1f0e8db215ccec))
- **bal-tabs:** scope bal-tab-items ([67f1fd6](https://github.com/baloise/design-system/commit/67f1fd6ed27dfd32a4af91d1551aacf4d6230f3a))
- **bal-upload:** duplicate file message not showing ([ad0a617](https://github.com/baloise/design-system/commit/ad0a617a39fe73a16922cb126c665d38545e21b5))
- **datepicker:** disable next month button if max is reached ([86bd195](https://github.com/baloise/design-system/commit/86bd19568c562c913bed6cbafaab968af6e17cd0))
- fix depracted fields in navbar,stage and bal-list ([6607cdd](https://github.com/baloise/design-system/commit/6607cddf6978bc0c1a3462119bbe58933e522549))
- fixes [#787](https://github.com/baloise/design-system/issues/787) add visualLevel for bal-list-item-title ([f157772](https://github.com/baloise/design-system/commit/f157772bddf32f611e93a6942cf799b9d7dd927d))
- **html:** remove duplicated overflow settings ([3bb9e2f](https://github.com/baloise/design-system/commit/3bb9e2ff6fff255693246c34f6bfa66792fbfde7))
- **html:** set overflow to overflow-x:hidden only ([3a801b0](https://github.com/baloise/design-system/commit/3a801b04b52fc0ddab07086ad7836c868acac8f1))
- isEmpty handler of bal-radio to work with false value as well ([c09b68c](https://github.com/baloise/design-system/commit/c09b68c3dc6d89ed7173f0a2906332ecd76cdaf6))
- **list:** ignore inverted when it is undefined ([d1046b7](https://github.com/baloise/design-system/commit/d1046b7da955e0909581e495dcc38efcf2777d6e))
- **sass:** remove ~ of the imports. Closes [#895](https://github.com/baloise/design-system/issues/895) ([d55ea5b](https://github.com/baloise/design-system/commit/d55ea5be1152f9afde6fe73424580db920b69061))
- **tabs:** set index ([2abe233](https://github.com/baloise/design-system/commit/2abe23315b4b214e5f67a5c25cc745c170229483))

## [11.0.13](https://github.com/baloise/design-system/compare/v11.0.12...v11.0.13) (2022-11-17)

### Bug Fixes

- **angular-focus-directive:** call setFocus method and update docs ([8b7a858](https://github.com/baloise/design-system/commit/8b7a8589c7a380f7122dd4e66df144a399fd7367))
- **bal-upload:** show duplicated file message ([9c32892](https://github.com/baloise/design-system/commit/9c32892a14d015f0da951a6e56afd77b7474f287))
- fix stroy book of radio boxes to use labbel-hidden property instead of depricated is-empty ([f051f47](https://github.com/baloise/design-system/commit/f051f474f535ed58305b306d0bb5d40303d0d8cd))
- fix usage of depricated is-empty to work in bal-radio ([910a5ef](https://github.com/baloise/design-system/commit/910a5ef5fec9956fe5fd6b154d4595336f6aebc0))
- **logo:** load svg on resize ([6e6cc3d](https://github.com/baloise/design-system/commit/6e6cc3dd4cd7bd9e45f112cecc09df46b69b11dc))
- **select:** initial value update. Closes [#872](https://github.com/baloise/design-system/issues/872) ([6139bb3](https://github.com/baloise/design-system/commit/6139bb3d488567cc3e9774d1677d94d56110fcde))
- update @baloise/web-app-utils to solve safari 13 issues ([cecc461](https://github.com/baloise/design-system/commit/cecc4611ebe2344a83305d56c74aaf5ca48f0533))
- update @baloise/web-app-utils to solve safari 13 issues ([04f0da0](https://github.com/baloise/design-system/commit/04f0da0b696a3eac6686f43458e1c2c41753d386))
- update @baloise/web-app-utils to solve safari 13 issues ([43c5b13](https://github.com/baloise/design-system/commit/43c5b132b4089346a132dbbda34c15b86860735a))

### Performance Improvements

- reduce web-app-utils imports ([7c3a21f](https://github.com/baloise/design-system/commit/7c3a21f3d995c3096c0ef23498936ddd6d9b9e3b))

## [11.0.12](https://github.com/baloise/design-system/compare/v11.0.10...v11.0.12) (2022-11-03)

## [11.0.10](https://github.com/baloise/design-system/compare/v11.0.5...v11.0.10) (2022-10-31)

## [11.0.5](https://github.com/baloise/design-system/compare/v11.0.1...v11.0.5) (2022-10-25)

## [11.0.1](https://github.com/baloise/design-system/compare/v10.24.10...v11.0.1) (2022-10-20)

### Bug Fixes

- **cart:** empty color will not add a css class ([e69b4a3](https://github.com/baloise/design-system/commit/e69b4a3d56543fe60ec806336d10c61a6fc65074))
- change to visibility instead of display ([54efef5](https://github.com/baloise/design-system/commit/54efef5e2028cbda55c6e6b50648f405781d99c4))
- **navbar:** add target prop to navbar-brand. Closes [#769](https://github.com/baloise/design-system/issues/769) ([d0b3555](https://github.com/baloise/design-system/commit/d0b3555294c3c296ca5d15d4c021bb03dc043054))
- **navbar:** update touch view. Closes [#770](https://github.com/baloise/design-system/issues/770) ([24a87c3](https://github.com/baloise/design-system/commit/24a87c3e00b32d51085ae90e2ebfa9b247c5be48))
- **navigation:** add missing tracking ([20815a7](https://github.com/baloise/design-system/commit/20815a7c130ab5c9fe2aaf4d2381293e29c1e214))
- update stencil config to solve angular issue ([189b62c](https://github.com/baloise/design-system/commit/189b62c969a4f29365c3c80b68137969f5e15f84))

### Performance Improvements

- use custom bundles and do not ship doc components ([b5da0b6](https://github.com/baloise/design-system/commit/b5da0b676aa467b22754233a748ba83a986eb284))

## [11.0.14](https://github.com/baloise/design-system/compare/v11.0.13...v11.0.14) (2022-11-22)

### Bug Fixes

- **angular-focus-directive:** call setFocus method and update docs ([8b7a858](https://github.com/baloise/design-system/commit/8b7a8589c7a380f7122dd4e66df144a399fd7367))
- **bal-upload:** show duplicated file message ([9c32892](https://github.com/baloise/design-system/commit/9c32892a14d015f0da951a6e56afd77b7474f287))
- fix stroy book of radio boxes to use labbel-hidden property instead of depricated is-empty ([f051f47](https://github.com/baloise/design-system/commit/f051f474f535ed58305b306d0bb5d40303d0d8cd))
- fix usage of depricated is-empty to work in bal-radio ([910a5ef](https://github.com/baloise/design-system/commit/910a5ef5fec9956fe5fd6b154d4595336f6aebc0))
- fixes [#787](https://github.com/baloise/design-system/issues/787) add visualLevel for bal-list-item-title ([f157772](https://github.com/baloise/design-system/commit/f157772bddf32f611e93a6942cf799b9d7dd927d))
- **logo:** load svg on resize ([6e6cc3d](https://github.com/baloise/design-system/commit/6e6cc3dd4cd7bd9e45f112cecc09df46b69b11dc))
- **select:** initial value update. Closes [#872](https://github.com/baloise/design-system/issues/872) ([6139bb3](https://github.com/baloise/design-system/commit/6139bb3d488567cc3e9774d1677d94d56110fcde))
- update @baloise/web-app-utils to solve safari 13 issues ([cecc461](https://github.com/baloise/design-system/commit/cecc4611ebe2344a83305d56c74aaf5ca48f0533))
- update @baloise/web-app-utils to solve safari 13 issues ([04f0da0](https://github.com/baloise/design-system/commit/04f0da0b696a3eac6686f43458e1c2c41753d386))
- update @baloise/web-app-utils to solve safari 13 issues ([43c5b13](https://github.com/baloise/design-system/commit/43c5b132b4089346a132dbbda34c15b86860735a))
- update web-app-utils ([c1dc7e3](https://github.com/baloise/design-system/commit/c1dc7e35250293a9f55fabbcb2ff33507e13b7f7))

### Performance Improvements

- reduce web-app-utils imports ([7c3a21f](https://github.com/baloise/design-system/commit/7c3a21f3d995c3096c0ef23498936ddd6d9b9e3b))

## [11.0.12](https://github.com/baloise/design-system/compare/v11.0.10...v11.0.12) (2022-11-03)

## 11.0.10 (2022-10-31)

## [11.0.13](https://github.com/baloise/design-system/compare/v11.0.12...v11.0.13) (2022-11-17)

### Bug Fixes

- **angular-focus-directive:** call setFocus method and update docs ([8b7a858](https://github.com/baloise/design-system/commit/8b7a8589c7a380f7122dd4e66df144a399fd7367))
- **bal-upload:** show duplicated file message ([9c32892](https://github.com/baloise/design-system/commit/9c32892a14d015f0da951a6e56afd77b7474f287))
- **logo:** load svg on resize ([6e6cc3d](https://github.com/baloise/design-system/commit/6e6cc3dd4cd7bd9e45f112cecc09df46b69b11dc))
- **select:** initial value update. Closes [#872](https://github.com/baloise/design-system/issues/872) ([6139bb3](https://github.com/baloise/design-system/commit/6139bb3d488567cc3e9774d1677d94d56110fcde))
- update @baloise/web-app-utils to solve safari 13 issues ([cecc461](https://github.com/baloise/design-system/commit/cecc4611ebe2344a83305d56c74aaf5ca48f0533))
- update @baloise/web-app-utils to solve safari 13 issues ([04f0da0](https://github.com/baloise/design-system/commit/04f0da0b696a3eac6686f43458e1c2c41753d386))
- update @baloise/web-app-utils to solve safari 13 issues ([43c5b13](https://github.com/baloise/design-system/commit/43c5b132b4089346a132dbbda34c15b86860735a))

### Performance Improvements

- reduce web-app-utils imports ([7c3a21f](https://github.com/baloise/design-system/commit/7c3a21f3d995c3096c0ef23498936ddd6d9b9e3b))

## 11.0.10 (2022-10-31)

## [11.0.12](https://github.com/baloise/design-system/compare/v11.0.11...v11.0.12) (2022-11-03)

### Bug Fixes

- **logo:** animated is shown once ([db310b6](https://github.com/baloise/design-system/commit/db310b67f5de37603500a0be3f4ccf2e8bc6cb83))

## [11.0.11](https://github.com/baloise/design-system/compare/v11.0.10...v11.0.11) (2022-11-03)

### Bug Fixes

- add missing configs to the BalConfig ([6cec2d6](https://github.com/baloise/design-system/commit/6cec2d62904ca1cbb84c9535a9aea80c16c307f8))
- **bal-tabs:** call move line function when accordion with tabs in it opens ([c79b71e](https://github.com/baloise/design-system/commit/c79b71efc083da4d9dd3204e3af96a355d611c57))
- **icons:** add missing arrow icons ([d430cb4](https://github.com/baloise/design-system/commit/d430cb4d6b7ac3daf096b326799cd872b9bbfb9b))
- **radio:** group elements sends focus and blur event. Closes [#623](https://github.com/baloise/design-system/issues/623) ([d044693](https://github.com/baloise/design-system/commit/d0446935804b88b765d2c1c0879519b2e909fbb7))
- **select:** typeahead + remote accept initial value. Closes [#603](https://github.com/baloise/design-system/issues/603), [#819](https://github.com/baloise/design-system/issues/819) ([5f11bb9](https://github.com/baloise/design-system/commit/5f11bb9dd8a9d93b09f48bba5fed4280ee7d3078))

### Performance Improvements

- **logo:** add lazy loading ([d4d7820](https://github.com/baloise/design-system/commit/d4d78201bdb85464b5f7450d8feb590ab3224d62))
- **spinner:** load animation date after first render ([f928030](https://github.com/baloise/design-system/commit/f92803014b9fc3cc9477953b1b08ca6ef39927b0))

## [11.0.10](https://github.com/baloise/design-system/compare/v11.0.9...v11.0.10) (2022-10-31)

### Bug Fixes

- bal-modal isClosable now hides close on top, fixes [#806](https://github.com/baloise/design-system/issues/806) ([122e90a](https://github.com/baloise/design-system/commit/122e90ade7fbe36ae80cdd552e05837063ad417c))
- change length of chucks ([6e7ebb2](https://github.com/baloise/design-system/commit/6e7ebb297314efe386d66fde7d0ff6d7878a9b0c))
- use conditional rendering instead of css ([e866e14](https://github.com/baloise/design-system/commit/e866e141c58ba7bb75275bfca4eff01b621dec4a))

## [11.0.1](https://github.com/baloise/design-system/compare/v10.24.10...v11.0.1) (2022-10-20)

### Bug Fixes

- **cart:** empty color will not add a css class ([e69b4a3](https://github.com/baloise/design-system/commit/e69b4a3d56543fe60ec806336d10c61a6fc65074))
- change to visibility instead of display ([54efef5](https://github.com/baloise/design-system/commit/54efef5e2028cbda55c6e6b50648f405781d99c4))
- check if window, document or navigator are existing ([37ecc10](https://github.com/baloise/design-system/commit/37ecc104dba6bd5f041e194a0112cd45371b7384))
- **navbar:** add target prop to navbar-brand. Closes [#769](https://github.com/baloise/design-system/issues/769) ([d0b3555](https://github.com/baloise/design-system/commit/d0b3555294c3c296ca5d15d4c021bb03dc043054))
- **navbar:** update touch view. Closes [#770](https://github.com/baloise/design-system/issues/770) ([24a87c3](https://github.com/baloise/design-system/commit/24a87c3e00b32d51085ae90e2ebfa9b247c5be48))
- **navigation:** add missing tracking ([20815a7](https://github.com/baloise/design-system/commit/20815a7c130ab5c9fe2aaf4d2381293e29c1e214))
- update stencil config to solve angular issue ([189b62c](https://github.com/baloise/design-system/commit/189b62c969a4f29365c3c80b68137969f5e15f84))

### Performance Improvements

- use custom bundles and do not ship doc components ([b5da0b6](https://github.com/baloise/design-system/commit/b5da0b676aa467b22754233a748ba83a986eb284))

## [10.24.10](https://github.com/baloise/design-system/compare/v10.24.9...v10.24.10) (2022-10-17)

### Bug Fixes

- **icons:** add missing tiktok icon ([7c04896](https://github.com/baloise/design-system/commit/7c048963a7a42863409f573e09e2a5f72fbf31a6))
- remove padding of the fieldset ([6390d75](https://github.com/baloise/design-system/commit/6390d75a01a7770ea5a05a23f2f23b16d7bd217c))

## [10.24.9](https://github.com/baloise/design-system/compare/v10.24.7...v10.24.9) (2022-10-11)

### Features

- **bal-navigation-menu-list-item:** added the target attr for grey menu list headline ([ddc8339](https://github.com/baloise/design-system/commit/ddc8339de57fd27bae24d41f3a2bac022b0ab08c))
- **bal-navigation-menu-list-item:** added the target attribute for items from grey lists ([773362e](https://github.com/baloise/design-system/commit/773362e2f1face1585ecbeae0c41ab0413900030))

### Bug Fixes

- adjust small spacing value to 0.75rem. Closes [#706](https://github.com/baloise/design-system/issues/706) ([2bdc29a](https://github.com/baloise/design-system/commit/2bdc29af2ed232d871a73ec5f754c49f77dceb97))
- **angular:** add dismissAll method to the toast and snackbar service. Closes [#703](https://github.com/baloise/design-system/issues/703) ([4e9070a](https://github.com/baloise/design-system/commit/4e9070ad37e6a441c045cc39f7e91bfb09ea26cb))
- **bal-stage:** adjusted content width mobile to full-width ([#684](https://github.com/baloise/design-system/issues/684)) ([65bcec9](https://github.com/baloise/design-system/commit/65bcec9c9c3835b3253151906f12d6b12fa18c1f))
- **bal-tabs:** create separate numberation for o-tabs based on independent varaiable ([461b5f9](https://github.com/baloise/design-system/commit/461b5f9eca198e66929d27ee1cbdd7ed173ef0fd))
- improve migration guide ([6eae447](https://github.com/baloise/design-system/commit/6eae4478450e1aefe3ddc497b632f806bce01a84))
- improve notification toast and snackbar stories ([5d684ca](https://github.com/baloise/design-system/commit/5d684ca17032136ba3f5bce7cf2bb5663ad9765e))
- **tabs:** add missing target prop. Closes [#700](https://github.com/baloise/design-system/issues/700) ([808d52e](https://github.com/baloise/design-system/commit/808d52e02bdf51bbf87dbd14e10ef184a1a93080))
- **tabs:** adjust the numbering of the steps. Closes [#586](https://github.com/baloise/design-system/issues/586) ([dda1799](https://github.com/baloise/design-system/commit/dda1799b6f7adde17ac36e6fd62a2f60e338b43d))
- **tabs:** break tab label on vertical. Closes [#688](https://github.com/baloise/design-system/issues/688) ([1f62ddf](https://github.com/baloise/design-system/commit/1f62ddfecd781ab912c2c70839248b85a9c9393b))

## [10.24.7](https://github.com/baloise/design-system/compare/v10.24.5...v10.24.7) (2022-10-06)

## 10.24.5 (2022-10-05)

## [11.0.9](https://github.com/baloise/design-system/compare/v11.0.8...v11.0.9) (2022-10-28)

### Bug Fixes

- **icons:** add missing arrow icons ([d430cb4](https://github.com/baloise/design-system/commit/d430cb4d6b7ac3daf096b326799cd872b9bbfb9b))

## [11.0.8](https://github.com/baloise/design-system/compare/v11.0.7...v11.0.8) (2022-10-27)

### Bug Fixes

- **bal-modal:** emit willDismiss and didDismiss in close method ([9f4dc3c](https://github.com/baloise/design-system/commit/9f4dc3cf01fc57a4338c13336a9b5658231a9283))

## [11.0.7](https://github.com/baloise/design-system/compare/v11.0.6...v11.0.7) (2022-10-26)

### Bug Fixes

- enable clicking on the page if notice is turned on, [#817](https://github.com/baloise/design-system/issues/817) ([05ba93b](https://github.com/baloise/design-system/commit/05ba93b2b3ab73ed5f164fa905e2167420cb7ad6))

## [11.0.6](https://github.com/baloise/design-system/compare/v11.0.5...v11.0.6) (2022-10-26)

### Bug Fixes

- closes [#817](https://github.com/baloise/design-system/issues/817) snackbar is not clickable ([68528de](https://github.com/baloise/design-system/commit/68528decba390dfeedce960fddce9e4b9bb1ff9a))
- remove bal-notice container in case no notices are displated anymore ([0f44e33](https://github.com/baloise/design-system/commit/0f44e33cc5fa5b33f9438ba0316325b9641cc9cd))

## [11.0.5](https://github.com/baloise/design-system/compare/v11.0.4...v11.0.5) (2022-10-25)

### Bug Fixes

- rise version of web-app-utils to use latest fix ([ff48e9f](https://github.com/baloise/design-system/commit/ff48e9fcf724898a15425c61d9c20075a9a90adc))

## [11.0.4](https://github.com/baloise/design-system/compare/v11.0.3...v11.0.4) (2022-10-25)

**Note:** Version bump only for package root

## [11.0.3](https://github.com/baloise/design-system/compare/v11.0.2...v11.0.3) (2022-10-24)

### Bug Fixes

- add hammerjs as a dep of the core lib ([a57c060](https://github.com/baloise/design-system/commit/a57c06050b56d98e92a2294e77b967dc64b62e64))
- **select:** sync native input also when remote is set . Closes [#603](https://github.com/baloise/design-system/issues/603) ([92086fc](https://github.com/baloise/design-system/commit/92086fca85245205da6f53277dcb904dd7e1d1d3))

## [11.0.2](https://github.com/baloise/design-system/compare/v11.0.1...v11.0.2) (2022-10-24)

### Bug Fixes

- add correct log in number-value-accessor ([07d514f](https://github.com/baloise/design-system/commit/07d514f6b3d45e8ae17c429b750a44d955f03ac9))
- add log in number-value-accessor ([f887955](https://github.com/baloise/design-system/commit/f88795561bbd82a020a6ae458fa56b485dddb3eb))
- export hasTouchSupport ([7a27bc6](https://github.com/baloise/design-system/commit/7a27bc6b41a390501c91046d6b9e113315b4ab27))
- fix angular autofocus directive ([e36d9a0](https://github.com/baloise/design-system/commit/e36d9a019e390564295e016bdb21ad8e6a6f26ee))
- rename angular autofucs directive to BalAutoFocus ([fbf2eb4](https://github.com/baloise/design-system/commit/fbf2eb43cd3b6c7d83c602a4a64113de55db9ad6))

## [11.0.1](https://github.com/baloise/design-system/compare/v10.24.10...v11.0.1) (2022-10-20)

### Bug Fixes

- **cart:** empty color will not add a css class ([e69b4a3](https://github.com/baloise/design-system/commit/e69b4a3d56543fe60ec806336d10c61a6fc65074))
- change to visibility instead of display ([54efef5](https://github.com/baloise/design-system/commit/54efef5e2028cbda55c6e6b50648f405781d99c4))
- check if window, document or navigator are existing ([37ecc10](https://github.com/baloise/design-system/commit/37ecc104dba6bd5f041e194a0112cd45371b7384))
- **icons:** add missing tiktok icon ([7c04896](https://github.com/baloise/design-system/commit/7c048963a7a42863409f573e09e2a5f72fbf31a6))
- **navbar:** add target prop to navbar-brand. Closes [#769](https://github.com/baloise/design-system/issues/769) ([d0b3555](https://github.com/baloise/design-system/commit/d0b3555294c3c296ca5d15d4c021bb03dc043054))
- **navbar:** update touch view. Closes [#770](https://github.com/baloise/design-system/issues/770) ([24a87c3](https://github.com/baloise/design-system/commit/24a87c3e00b32d51085ae90e2ebfa9b247c5be48))
- **navigation:** add missing tracking ([20815a7](https://github.com/baloise/design-system/commit/20815a7c130ab5c9fe2aaf4d2381293e29c1e214))
- remove padding of the fieldset ([6390d75](https://github.com/baloise/design-system/commit/6390d75a01a7770ea5a05a23f2f23b16d7bd217c))
- update stencil config to solve angular issue ([189b62c](https://github.com/baloise/design-system/commit/189b62c969a4f29365c3c80b68137969f5e15f84))

### Performance Improvements

- use custom bundles and do not ship doc components ([b5da0b6](https://github.com/baloise/design-system/commit/b5da0b676aa467b22754233a748ba83a986eb284))

## [10.24.9](https://github.com/baloise/design-system/compare/v10.24.7...v10.24.9) (2022-10-11)

### Features

- **bal-navigation-menu-list-item:** added the target attr for grey menu list headline ([ddc8339](https://github.com/baloise/design-system/commit/ddc8339de57fd27bae24d41f3a2bac022b0ab08c))
- **bal-navigation-menu-list-item:** added the target attribute for items from grey lists ([773362e](https://github.com/baloise/design-system/commit/773362e2f1face1585ecbeae0c41ab0413900030))

### Bug Fixes

- adjust small spacing value to 0.75rem. Closes [#706](https://github.com/baloise/design-system/issues/706) ([2bdc29a](https://github.com/baloise/design-system/commit/2bdc29af2ed232d871a73ec5f754c49f77dceb97))
- **angular:** add dismissAll method to the toast and snackbar service. Closes [#703](https://github.com/baloise/design-system/issues/703) ([4e9070a](https://github.com/baloise/design-system/commit/4e9070ad37e6a441c045cc39f7e91bfb09ea26cb))
- **bal-stage:** adjusted content width mobile to full-width ([#684](https://github.com/baloise/design-system/issues/684)) ([65bcec9](https://github.com/baloise/design-system/commit/65bcec9c9c3835b3253151906f12d6b12fa18c1f))
- **bal-tabs:** create separate numberation for o-tabs based on independent varaiable ([461b5f9](https://github.com/baloise/design-system/commit/461b5f9eca198e66929d27ee1cbdd7ed173ef0fd))
- improve migration guide ([6eae447](https://github.com/baloise/design-system/commit/6eae4478450e1aefe3ddc497b632f806bce01a84))
- improve notification toast and snackbar stories ([5d684ca](https://github.com/baloise/design-system/commit/5d684ca17032136ba3f5bce7cf2bb5663ad9765e))
- **tabs:** add missing target prop. Closes [#700](https://github.com/baloise/design-system/issues/700) ([808d52e](https://github.com/baloise/design-system/commit/808d52e02bdf51bbf87dbd14e10ef184a1a93080))
- **tabs:** adjust the numbering of the steps. Closes [#586](https://github.com/baloise/design-system/issues/586) ([dda1799](https://github.com/baloise/design-system/commit/dda1799b6f7adde17ac36e6fd62a2f60e338b43d))
- **tabs:** break tab label on vertical. Closes [#688](https://github.com/baloise/design-system/issues/688) ([1f62ddf](https://github.com/baloise/design-system/commit/1f62ddfecd781ab912c2c70839248b85a9c9393b))

## [10.24.7](https://github.com/baloise/design-system/compare/v10.24.5...v10.24.7) (2022-10-06)

## 10.24.5 (2022-10-05)

# [11.0.0](https://github.com/baloise/design-system/compare/v10.24.10...v11.0.0) (2022-10-17)

Follow the migration guide [Migration from 10.x to 11.x](https://design.baloise.dev/?path=/docs/development-upgrade-guides-updating-to-v11--page)

### ⚠ BREAKING CHANGES

- Rebranded components
- New breakpoint high-definition
- bal-input pattern

### [10.15.2](https://github.com/baloise/design-system/compare/v10.15.1...v10.15.2) (2022-09-01)

### Bug Fixes

- closes [#648](https://github.com/baloise/design-system/issues/648), fix error on deleting input with mask ([b4fd476](https://github.com/baloise/design-system/commit/b4fd476895244b8d2e7e62eabed56321493ec1d6))

### [10.15.1](https://github.com/baloise/design-system/compare/v10.15.0...v10.15.1) (2022-08-23)

### Bug Fixes

- **form:** add new form component with scroll to first invalid field ([812e967](https://github.com/baloise/design-system/commit/812e96784ac5e8fd7564e1b15f6ab4f7e32e537a))

## [10.15.0](https://github.com/baloise/design-system/compare/v10.14.0...v10.15.0) (2022-08-22)

### Features

- **form:** add new form component with scroll to first invalid field ([2e8b07a](https://github.com/baloise/design-system/commit/2e8b07acc507bffdefaa0c1e24f5eee3e6455b53))

## [10.14.0](https://github.com/baloise/design-system/compare/v10.13.5...v10.14.0) (2022-08-16)

### Features

- **tabs:** add is-hidden property to bal-tab-item ([c0e7200](https://github.com/baloise/design-system/commit/c0e720064bd12e8c3cc13a0d89141503e9ed73cd))

### Bug Fixes

- **components-react:** Typo in Homepage ([40211a8](https://github.com/baloise/design-system/commit/40211a83d2cf73256f9ab1f2235d9ca65c13c65a))

### 10.13.4 (2022-06-23)

### [10.13.5](https://github.com/baloise/design-system/compare/v10.13.4...v10.13.5) (2022-07-05)

### Bug Fixes

- claim number formatter can accept small x and transfer it uppercase ([4b4b3e7](https://github.com/baloise/design-system/commit/4b4b3e7d43427e41ae39cc185042e5c6680a0c0c))

### [10.13.4](https://github.com/baloise/design-system/compare/v10.13.3...v10.13.4) (2022-06-23)

### Bug Fixes

- **testing:** update deps ([e55e44d](https://github.com/baloise/design-system/commit/e55e44ddc17b503f1a99275dd6070130cfc4bc81))
- **testing:** update deps ([3c55606](https://github.com/baloise/design-system/commit/3c556061cc87f26cd971ee9669a1d46445ebc4dc))
- **testing:** update deps ([9da47f5](https://github.com/baloise/design-system/commit/9da47f588acd266e55d1662b092c48f2e274ba94))

### [10.13.3](https://github.com/baloise/design-system/compare/v10.13.2...v10.13.3) (2022-06-21)

### Bug Fixes

- **#632:** enable X to be entered as last character in claim number ([26606b5](https://github.com/baloise/design-system/commit/26606b5bd19ce72128bbe14df61db53bd81727b7)), closes [#632](https://github.com/baloise/design-system/issues/632)

### [10.13.2](https://github.com/baloise/design-system/compare/v10.13.1...v10.13.2) (2022-06-16)

### Bug Fixes

- **modal:** remove promise rejection when no overlay exists bc promise should only be rejected when an error appears during dismiss of an existing overlay ([15671a3](https://github.com/baloise/design-system/commit/15671a37ab9f99635cf4eedddfac617df78a0d8e))

### [10.13.1](https://github.com/baloise/design-system/compare/v10.13.0...v10.13.1) (2022-06-15)

### Bug Fixes

- **popover:** handlePopoverPrepare uses event now ([aaee8a8](https://github.com/baloise/design-system/commit/aaee8a8a8e59b7d923e560db65275ac462727621))
- **select:** stop click event bubbeling ([df25293](https://github.com/baloise/design-system/commit/df25293c6cd3cf878bda08b8471c0ae77a3ca86e))
- **testing:** do not assume that an element exist when it was used ([d1f516c](https://github.com/baloise/design-system/commit/d1f516cc28bd290b29a7eaeca1edfd27cc96cb92))

## [10.13.0](https://github.com/baloise/design-system/compare/v10.12.0...v10.13.0) (2022-06-07)

### Features

- **form-gird:** add form grid component ([99de015](https://github.com/baloise/design-system/commit/99de015619b13c3dc4af98a41e6599c8c51708d1))
- **input-stepper:** add increase and decrease event ([11a186c](https://github.com/baloise/design-system/commit/11a186c56c2b231a6530e58fff99f4ad58d3d578))

### Bug Fixes

- **vue:** add data-testid prop type ([b2c761a](https://github.com/baloise/design-system/commit/b2c761ad0a60ac75c0889c417e1bac32d216eb8d))

## [10.12.0](https://github.com/baloise/design-system/compare/v10.11.3...v10.12.0) (2022-05-25)

### Features

- add event types for the main events ([fe13251](https://github.com/baloise/design-system/commit/fe1325158592f310def478a319756edd3740d8ac))

### Bug Fixes

- **vue:** pass emitted events ([6287435](https://github.com/baloise/design-system/commit/6287435eb0aa5a4cedcfeec8203a53882514ad35))

### [10.11.3](https://github.com/baloise/design-system/compare/v10.11.2...v10.11.3) (2022-05-24)

### Bug Fixes

- **field:** add css class for messages ([42f8d98](https://github.com/baloise/design-system/commit/42f8d98404af820fb359c6719febe03b599817cb))

### [10.11.2](https://github.com/baloise/design-system/compare/v10.11.1...v10.11.2) (2022-05-24)

### Bug Fixes

- **bal-input:** contract has now 10 digits and for contacts with 9 digits use offer-number mask ([293837b](https://github.com/baloise/design-system/commit/293837bca2a3a352990d8d86a51dd470d559b707))
- **testing:** change visit command to visitBalApp ([348bd4f](https://github.com/baloise/design-system/commit/348bd4f1925c9af100e3dc98cc57a3bcbd3e0415))

### [10.11.1](https://github.com/baloise/design-system/compare/v10.11.0...v10.11.1) (2022-05-18)

### Bug Fixes

- **tag:** add relative position on bal-card element ([064623a](https://github.com/baloise/design-system/commit/064623abb918d1534c62f4c8abfb3d9110e912aa))

## [10.11.0](https://github.com/baloise/design-system/compare/v10.10.8...v10.11.0) (2022-05-10)

### Features

- **field:** add weight prop ([4649a6c](https://github.com/baloise/design-system/commit/4649a6cca223a5d0b083b5742e6d439a57cf088e))
- **modal:** add dismissAll function ([b4e935a](https://github.com/baloise/design-system/commit/b4e935aeab9cb283a68c2f32741b5468c5adf8d6))
- **select:** add remote solution and adds starts with filter ([1db5cd7](https://github.com/baloise/design-system/commit/1db5cd7200072ac9dd3ea9a18cb4176be1d81d9a))

### Bug Fixes

- **button:** set flex 1 for expanded buttons ([1068613](https://github.com/baloise/design-system/commit/10686134f65d592d00be1927aa05710ed16e40e9))
- **field:** only set field props when defined to child components ([117326b](https://github.com/baloise/design-system/commit/117326b5d7ba74a977b9d6601f36df5c2ba66484))
- **form:** wait for next tick when setting focus ([a4d742e](https://github.com/baloise/design-system/commit/a4d742ee3c1611ddc2c1e31a542ba21b510ea123))
- **select:** updateRawValue can handle objects ([33957af](https://github.com/baloise/design-system/commit/33957af3dd89ff3d1a067718fb3e7072a41cb26c))
- **testing:** adjust text and heading contains command ([d8035d3](https://github.com/baloise/design-system/commit/d8035d3c0da6ceb761c893839740b4c9bfb6bccd))
- **testing:** adjust text and heading contains command ([646204c](https://github.com/baloise/design-system/commit/646204c956087861750e08e28685f17a88a1b6be))
- **vue:** reduce payload ([8f36f8d](https://github.com/baloise/design-system/commit/8f36f8d10a7b1af438a7e2bc6e6ece84bedfcb05))
- **vue:** reduce payload ([7a216a2](https://github.com/baloise/design-system/commit/7a216a276c4a061e93c7042724f1ea9a30f15328))
- **vue:** register components ([854c353](https://github.com/baloise/design-system/commit/854c3530718609bbbbdb4bab3e2bc7d4371eca11))
- **vue:** try to reduce payload ([b994637](https://github.com/baloise/design-system/commit/b994637382f3eb164540a217a0a12688ab6bdcac))
- **vue:** use stencil output ([6815b8f](https://github.com/baloise/design-system/commit/6815b8f66645a84335ab34b5ac2f69c9d8a1c67e))
- **vue:** use stencil output ([ab16e1a](https://github.com/baloise/design-system/commit/ab16e1a256e5af8bcc55dd2e274c4afa5a6cc527))

### [10.10.8](https://github.com/baloise/design-system/compare/v10.10.7...v10.10.8) (2022-04-28)

### Bug Fixes

- **testing:** set waitForComponents to optional ([a1e33c7](https://github.com/baloise/design-system/commit/a1e33c79b69f87ff5327eac6218b6f5d28fc082e))

### [10.10.6](https://github.com/baloise/design-system/compare/v10.10.5...v10.10.6) (2022-04-25)

### Bug Fixes

- **slider:** css width calculation and add ticks ([973bb91](https://github.com/baloise/design-system/commit/973bb91d49d65499d107c8e195aa75aee4e78bb7))

### [10.10.5](https://github.com/baloise/design-system/compare/v10.10.2...v10.10.5) (2022-04-22)

### Bug Fixes

- **datepicker:** adjust nl translations ([95a93d9](https://github.com/baloise/design-system/commit/95a93d9620b7dbc56354631a3d6250fde0065333))
- **footer:** the footer links will only load for CH regions ([b86cc2f](https://github.com/baloise/design-system/commit/b86cc2f540cac2b717456844288bb6007080ac0d))
- **footer:** the footer links will only load for CH regions ([cdeca7b](https://github.com/baloise/design-system/commit/cdeca7bf745cf741b8bdd550068c876d563a746e))

### [10.10.2](https://github.com/baloise/design-system/compare/v10.10.1...v10.10.2) (2022-04-21)

### Bug Fixes

- **footer:** fetch links from all domains ([e2e120e](https://github.com/baloise/design-system/commit/e2e120ed6b0939794af85ee313cbfe1eb9e8c052))
- **footer:** version of web-app-utils for fetching the baloise data from the correct URLs ([241f37b](https://github.com/baloise/design-system/commit/241f37b919af594210e0bf293086b923481b3057))
- **integration:** update lock ([12fbb96](https://github.com/baloise/design-system/commit/12fbb964428e51ee0480df7c68589283e03bbfa5))
- **tag:** add group component to BalTagModule ([db1eb99](https://github.com/baloise/design-system/commit/db1eb99ee06fe560cd9a1a43b86714fa041f1245))

### 10.10.1 (2022-04-21)

### [10.10.7](https://github.com/baloise/design-system/compare/v10.10.6...v10.10.7) (2022-04-28)

### Bug Fixes

- initialize for ssr ([b68a1ee](https://github.com/baloise/design-system/commit/b68a1ee694fbd3a5f637be2317900d3b65a4cac9))
- **slider:** css width calculation and add ticks ([973bb91](https://github.com/baloise/design-system/commit/973bb91d49d65499d107c8e195aa75aee4e78bb7))

### [10.10.5](https://github.com/baloise/design-system/compare/v10.10.2...v10.10.5) (2022-04-22)

### Bug Fixes

- **datepicker:** adjust nl translations ([95a93d9](https://github.com/baloise/design-system/commit/95a93d9620b7dbc56354631a3d6250fde0065333))
- **footer:** the footer links will only load for CH regions ([b86cc2f](https://github.com/baloise/design-system/commit/b86cc2f540cac2b717456844288bb6007080ac0d))
- **footer:** the footer links will only load for CH regions ([cdeca7b](https://github.com/baloise/design-system/commit/cdeca7bf745cf741b8bdd550068c876d563a746e))

### [10.10.2](https://github.com/baloise/design-system/compare/v10.10.1...v10.10.2) (2022-04-21)

### Bug Fixes

- **footer:** fetch links from all domains ([e2e120e](https://github.com/baloise/design-system/commit/e2e120ed6b0939794af85ee313cbfe1eb9e8c052))
- **footer:** version of web-app-utils for fetching the baloise data from the correct URLs ([241f37b](https://github.com/baloise/design-system/commit/241f37b919af594210e0bf293086b923481b3057))
- **integration:** update lock ([12fbb96](https://github.com/baloise/design-system/commit/12fbb964428e51ee0480df7c68589283e03bbfa5))
- **tag:** add group component to BalTagModule ([db1eb99](https://github.com/baloise/design-system/commit/db1eb99ee06fe560cd9a1a43b86714fa041f1245))

### 10.10.1 (2022-04-21)

### [10.10.6](https://github.com/baloise/design-system/compare/v10.10.5...v10.10.6) (2022-04-25)

### Bug Fixes

- **datepicker:** adjust nl translations ([95a93d9](https://github.com/baloise/design-system/commit/95a93d9620b7dbc56354631a3d6250fde0065333))
- **footer:** the footer links will only load for CH regions ([b86cc2f](https://github.com/baloise/design-system/commit/b86cc2f540cac2b717456844288bb6007080ac0d))
- **footer:** the footer links will only load for CH regions ([cdeca7b](https://github.com/baloise/design-system/commit/cdeca7bf745cf741b8bdd550068c876d563a746e))
- **slider:** css width calculation and add ticks ([973bb91](https://github.com/baloise/design-system/commit/973bb91d49d65499d107c8e195aa75aee4e78bb7))

### [10.10.2](https://github.com/baloise/design-system/compare/v10.10.1...v10.10.2) (2022-04-21)

### Bug Fixes

- **footer:** fetch links from all domains ([e2e120e](https://github.com/baloise/design-system/commit/e2e120ed6b0939794af85ee313cbfe1eb9e8c052))
- **footer:** version of web-app-utils for fetching the baloise data from the correct URLs ([241f37b](https://github.com/baloise/design-system/commit/241f37b919af594210e0bf293086b923481b3057))
- **integration:** update lock ([12fbb96](https://github.com/baloise/design-system/commit/12fbb964428e51ee0480df7c68589283e03bbfa5))
- **tag:** add group component to BalTagModule ([db1eb99](https://github.com/baloise/design-system/commit/db1eb99ee06fe560cd9a1a43b86714fa041f1245))

### 10.10.1 (2022-04-21)

### [10.10.5](https://github.com/baloise/design-system/compare/v10.10.4...v10.10.5) (2022-04-22)

**Note:** Version bump only for package root

### [10.10.4](https://github.com/baloise/design-system/compare/v10.10.3...v10.10.4) (2022-04-22)

### Bug Fixes

- **footer:** the footer links will only load for CH regions ([b86cc2f](https://github.com/baloise/design-system/commit/b86cc2f540cac2b717456844288bb6007080ac0d))
- **footer:** the footer links will only load for CH regions ([cdeca7b](https://github.com/baloise/design-system/commit/cdeca7bf745cf741b8bdd550068c876d563a746e))

### [10.10.2](https://github.com/baloise/design-system/compare/v10.10.1...v10.10.2) (2022-04-21)

### Bug Fixes

- **footer:** fetch links from all domains ([e2e120e](https://github.com/baloise/design-system/commit/e2e120ed6b0939794af85ee313cbfe1eb9e8c052))
- **footer:** version of web-app-utils for fetching the baloise data from the correct URLs ([241f37b](https://github.com/baloise/design-system/commit/241f37b919af594210e0bf293086b923481b3057))
- **integration:** update lock ([12fbb96](https://github.com/baloise/design-system/commit/12fbb964428e51ee0480df7c68589283e03bbfa5))

### 10.10.1 (2022-04-21)

### [10.10.3](https://github.com/baloise/design-system/compare/v10.10.2...v10.10.3) (2022-04-22)

### Bug Fixes

- **footer:** fetch links from all domains ([e2e120e](https://github.com/baloise/design-system/commit/e2e120ed6b0939794af85ee313cbfe1eb9e8c052))
- **footer:** version of web-app-utils for fetching the baloise data from the correct URLs ([241f37b](https://github.com/baloise/design-system/commit/241f37b919af594210e0bf293086b923481b3057))
- **integration:** update lock ([12fbb96](https://github.com/baloise/design-system/commit/12fbb964428e51ee0480df7c68589283e03bbfa5))

### 10.10.1 (2022-04-21)

### [10.10.2](https://github.com/baloise/design-system/compare/v10.10.1...v10.10.2) (2022-04-21)

### Bug Fixes

- **tag:** add group component to BalTagModule ([db1eb99](https://github.com/baloise/design-system/commit/db1eb99ee06fe560cd9a1a43b86714fa041f1245))

### [10.10.1](https://github.com/baloise/design-system/compare/v10.10.0...v10.10.1) (2022-04-21)

### Bug Fixes

- simplify theme customization ([e90e095](https://github.com/baloise/design-system/commit/e90e09514cfc1164ceb04f1e968ca864da38c2bb))

## [10.10.0](https://github.com/baloise/design-system/compare/v10.9.1...v10.10.0) (2022-04-21)

### Features

- **bal-number-input:** add exactNumber property to define 0 as a default value ([57b3abb](https://github.com/baloise/design-system/commit/57b3abb6b873ee9a0ca9589edecebb7c37b08603))
- **breakpoint:** add isPlatform util ([a213e29](https://github.com/baloise/design-system/commit/a213e295ff0cc9a8c712239d65ef7910b839a296))
- **testing:** add new custom commands and improve logging ([34f1be4](https://github.com/baloise/design-system/commit/34f1be446c2abca0eb7330dd96d665a33ca64c47))
- **testing:** add new cypress commands ([86b05d9](https://github.com/baloise/design-system/commit/86b05d93a37016844c490ea18f7b0b2f0d950dcf))

### Bug Fixes

- **card:** add auto height ([07c8f2d](https://github.com/baloise/design-system/commit/07c8f2d244360b71d638f2926784addf537f841c))
- **card:** alignment for buttons and tags inside the card-title component ([09780bb](https://github.com/baloise/design-system/commit/09780bbb6e891265842906fb4693fe24f80b209f))
- **card:** alignment for buttons and tags inside the card-title component ([a04193f](https://github.com/baloise/design-system/commit/a04193f79f192e4ed84435ddb4123e7c2cd8034a))
- **data:** alignment horizontal ([cdfbf84](https://github.com/baloise/design-system/commit/cdfbf847a733d6925148039539c18453f8c7bb94))
- **i18n:** notify component always ([05217a8](https://github.com/baloise/design-system/commit/05217a8e6213bcb5c98f7ba7581fd384061bf3c5))

### [10.9.1](https://github.com/baloise/design-system/compare/v10.9.0...v10.9.1) (2022-04-13)

### Bug Fixes

- **checkbox-group:** add missing readonly prop ([bd63b9a](https://github.com/baloise/design-system/commit/bd63b9aeb296896119c2788807c90e51aa1b62c0))
- **config:** do not notify after initialize ([521cd21](https://github.com/baloise/design-system/commit/521cd211d50acd712331f850eecfab78f53a233a))
- if readonly do not react on user interactions ([aa844de](https://github.com/baloise/design-system/commit/aa844ded9c413cc806954b58ab3803209e70b9dc))
- **input-group:** add missing prop ([4a821dd](https://github.com/baloise/design-system/commit/4a821dd3041883f7f7e77d26c6b3bc38ebb95dcd))
- **input:** set placeholder color for readonly and disabled ([23606e1](https://github.com/baloise/design-system/commit/23606e1e6dc486da2c4d4781e660a6a8bcddb0b2))
- **radio:** adjust alignment ([8cc37fa](https://github.com/baloise/design-system/commit/8cc37fa55281d1a6f5118f888cae8b22992a380a))
- **table:** set text align default to left and add spacing for buttons ([015a81e](https://github.com/baloise/design-system/commit/015a81e4c86cd9588538de20c0457fa0225d4e22))
- use default cursor for disabled controls ([2668fb5](https://github.com/baloise/design-system/commit/2668fb51d74b8da8c6172e889e6462083ee5a528))
- **viewport:** set tablet breakpoint to 768px ([dd4e0b6](https://github.com/baloise/design-system/commit/dd4e0b618abd6a5d7a501124f03d567167c9ae98))

## [10.9.0](https://github.com/baloise/design-system/compare/v10.8.4...v10.9.0) (2022-04-12)

### Features

- **form:** add prop readonly ([03ff671](https://github.com/baloise/design-system/commit/03ff671b7ca90fa5da388a9554dd51ca8f6e5dcc))
- **icon:** add new icon logout, youtube and web ([ec7bdbf](https://github.com/baloise/design-system/commit/ec7bdbf7a75c5928306d7f79f5e694f26d4db502))
- **popover:** add prop expanded to use the fullwidth ([9b4dfa6](https://github.com/baloise/design-system/commit/9b4dfa607af52402e7758ac0ef38b30224a4e20c))

### [10.8.4](https://github.com/baloise/design-system/compare/v10.8.3...v10.8.4) (2022-04-11)

### Bug Fixes

- attach controllers to the window ([f946e22](https://github.com/baloise/design-system/commit/f946e22ae077ab6068bdce926e46cf56f7b5c3e1))
- change spacing variables to use rem instead of px ([7b4a1b7](https://github.com/baloise/design-system/commit/7b4a1b723f6b98392cca95885379bb44b156babb))
- **modal:** hide close button when modal is not closable ([2c57eb9](https://github.com/baloise/design-system/commit/2c57eb93abd4cd2c8956fa367c8fdf5353def19a))
- trigger globalscript in bal-app ([6d0070a](https://github.com/baloise/design-system/commit/6d0070ac26b957642ae39abc2061507a89733b81))

### [10.8.3](https://github.com/baloise/design-system/compare/v10.8.2...v10.8.3) (2022-04-07)

### Bug Fixes

- **datepicker:** enable locale typing ([2ed6004](https://github.com/baloise/design-system/commit/2ed60043cf32238595b8a7515f75a8176f30f49e))

### [10.8.2](https://github.com/baloise/design-system/compare/v10.8.1...v10.8.2) (2022-04-07)

### Bug Fixes

- **testing:** wait until ce is ready ([a8f7531](https://github.com/baloise/design-system/commit/a8f7531f51938a5ee02eac1706e615e82a63d330))

### [10.8.1](https://github.com/baloise/design-system/compare/v10.8.0...v10.8.1) (2022-04-06)

### Bug Fixes

- add es5 build to support no module scripts ([5daf384](https://github.com/baloise/design-system/commit/5daf38499626f55778c07d214d3dadfcb09b4303))

## [10.8.0](https://github.com/baloise/design-system/compare/v10.7.3...v10.8.0) (2022-04-04)

### Features

- **snackbar:** button can also be a link ([57ba176](https://github.com/baloise/design-system/commit/57ba1763332d54b6d2667ba52a6ffe062b759bef))
- **tabs:** can have a bottom border ([e4e6967](https://github.com/baloise/design-system/commit/e4e69675eba25b354d5d325978df56fd96ac11d4))
- **testing:** add command to find open modal ([7783760](https://github.com/baloise/design-system/commit/778376011042c3c192f0e7e30f551d1a31886d55))

### Bug Fixes

- **modal:** body and header can be used in nested elements ([dbda58b](https://github.com/baloise/design-system/commit/dbda58b47017250fc8b472d7e08e34fd5489861c))
- **modal:** reduce spacing header ([924236d](https://github.com/baloise/design-system/commit/924236d3d1a22fd678702c6d59f30b3bc1fc9bef))
- **select:** basic select opens and closes on input click ([21aa983](https://github.com/baloise/design-system/commit/21aa98386cc74fb93e0dab750f62d438a057521b))
- **testing:** fix input selector for number-inputs ([dc643d7](https://github.com/baloise/design-system/commit/dc643d79d853db66d420db1c8e3ff415db4610fc))

### [10.7.3](https://github.com/baloise/design-system/compare/v10.7.2...v10.7.3) (2022-03-30)

### Bug Fixes

- **datepicker:** adds missing days to february ([31a399a](https://github.com/baloise/design-system/commit/31a399a1f6b0e4b12fb770730e22a5231e4737dd))
- **datepicker:** adjust spacing to level 5 ([ca45062](https://github.com/baloise/design-system/commit/ca45062ec94d84cd9e9bfc22af1a5280263ff0a9))
- **file-upload:** label text breaks if to long ([4c66172](https://github.com/baloise/design-system/commit/4c66172b6a3d525a54b4f4add12939ec61de8c5b))
- **font:** move css files to a css folder ([8e20378](https://github.com/baloise/design-system/commit/8e203782ae556b17b179409f5ca700e17eb32676))
- **hint:** adjust spacing to level 5 ([5bc5f21](https://github.com/baloise/design-system/commit/5bc5f213cf42e5da741309edc00450198800b5bd))
- **hint:** close label is now optional ([04cd2b3](https://github.com/baloise/design-system/commit/04cd2b3dd962086f2ce2a3780d7e9606cc92312c))
- **modal:** adjust spacing to level 5 ([59b8630](https://github.com/baloise/design-system/commit/59b86303fb4cf88a089a2ebe8ce1989d38660b27))
- **notification:** adjust spacing to level 5 ([d61024c](https://github.com/baloise/design-system/commit/d61024c72480948956053878a1363a7c9cad4a46))
- **sheet:** adjust spacing to level 5 ([454ca7e](https://github.com/baloise/design-system/commit/454ca7e4704c32e283f36dfa58e0b2cc34e39032))
- **snackbar:** adjust spacing to level 5 ([bb63127](https://github.com/baloise/design-system/commit/bb63127b7fdb713824659dcad72ad4a200b4830b))

### [10.7.1](https://github.com/baloise/design-system/compare/v10.7.0...v10.7.1) (2022-03-29)

### Bug Fixes

- **modal:** set space as optional ([de62b2d](https://github.com/baloise/design-system/commit/de62b2dcce59e2966bd8e2b352c7f5b2f8e3e186))

## [10.7.0](https://github.com/baloise/design-system/compare/v10.6.3...v10.7.0) (2022-03-29)

### Features

- add contract-number mask in bal-input component ([e4ebdb6](https://github.com/baloise/design-system/commit/e4ebdb68d2dd6d08c37a0f706cc41dc60aee7a3c))
- add format offer option for bal-input ([bec0c3e](https://github.com/baloise/design-system/commit/bec0c3e46fce102299fbef957e6259a782d923a7))
- **modal:** add space property ([103348d](https://github.com/baloise/design-system/commit/103348d01ab1d2f49de73f3d9d042842e2c4f85c))

### Bug Fixes

- **card:** subtitle can have diffrent color and be bold ([be858a8](https://github.com/baloise/design-system/commit/be858a85da35315aba0f4301dd5253bcd5474667))
- **testing:** add missing hint commands ([547f420](https://github.com/baloise/design-system/commit/547f420b3f8d5b5468f9f9eae00349cafcda835b))

### [10.6.3](https://github.com/baloise/design-system/compare/v10.6.1...v10.6.3) (2022-03-24)

### 10.6.1 (2022-03-24)

### [10.7.2](https://github.com/baloise/design-system/compare/v10.7.1...v10.7.2) (2022-03-29)

### Bug Fixes

- **datepicker:** adds missing days to february ([31a399a](https://github.com/baloise/design-system/commit/31a399a1f6b0e4b12fb770730e22a5231e4737dd))
- **hint:** close label is now optional ([04cd2b3](https://github.com/baloise/design-system/commit/04cd2b3dd962086f2ce2a3780d7e9606cc92312c))
- **modal:** set space as optional ([de62b2d](https://github.com/baloise/design-system/commit/de62b2dcce59e2966bd8e2b352c7f5b2f8e3e186))

## [10.7.0](https://github.com/baloise/design-system/compare/v10.6.3...v10.7.0) (2022-03-29)

### Features

- **modal:** add space property ([103348d](https://github.com/baloise/design-system/commit/103348d01ab1d2f49de73f3d9d042842e2c4f85c))

### Bug Fixes

- **card:** subtitle can have diffrent color and be bold ([be858a8](https://github.com/baloise/design-system/commit/be858a85da35315aba0f4301dd5253bcd5474667))
- **testing:** add missing hint commands ([547f420](https://github.com/baloise/design-system/commit/547f420b3f8d5b5468f9f9eae00349cafcda835b))

### [10.7.1](https://github.com/baloise/design-system/compare/v10.7.0...v10.7.1) (2022-03-29)

### Features

- **modal:** add space property ([103348d](https://github.com/baloise/design-system/commit/103348d01ab1d2f49de73f3d9d042842e2c4f85c))

### Bug Fixes

- **card:** subtitle can have diffrent color and be bold ([be858a8](https://github.com/baloise/design-system/commit/be858a85da35315aba0f4301dd5253bcd5474667))
- **modal:** set space as optional ([de62b2d](https://github.com/baloise/design-system/commit/de62b2dcce59e2966bd8e2b352c7f5b2f8e3e186))
- **testing:** add missing hint commands ([547f420](https://github.com/baloise/design-system/commit/547f420b3f8d5b5468f9f9eae00349cafcda835b))

## [10.7.0](https://github.com/baloise/design-system/compare/v10.6.3...v10.7.0) (2022-03-29)

### Features

- **modal:** add space property ([103348d](https://github.com/baloise/design-system/commit/103348d01ab1d2f49de73f3d9d042842e2c4f85c))

### Bug Fixes

- **card:** subtitle can have diffrent color and be bold ([be858a8](https://github.com/baloise/design-system/commit/be858a85da35315aba0f4301dd5253bcd5474667))
- **testing:** add missing hint commands ([547f420](https://github.com/baloise/design-system/commit/547f420b3f8d5b5468f9f9eae00349cafcda835b))

### [10.6.3](https://github.com/baloise/design-system/compare/v10.6.2...v10.6.3) (2022-03-24)

### Bug Fixes

- **modal:** adjust tesing commands ([00b0f7e](https://github.com/baloise/design-system/commit/00b0f7eaa50e7064d50567a7effe8926fef5b5c3))
- **modal:** remove focus of element to eliminate window scrolling ([f2264df](https://github.com/baloise/design-system/commit/f2264df4362db484b7fefbdd8de445b281626b7f))
- **select-button:** add vertical style ([26199e8](https://github.com/baloise/design-system/commit/26199e818656f8addca35757a2d9465a3e94be64))
- **select-button:** adjust for long labels ([c4496c8](https://github.com/baloise/design-system/commit/c4496c8c38a7c51e0239b78392366945c59b2c2b))

### [10.6.2](https://github.com/baloise/design-system/compare/v10.6.1...v10.6.2) (2022-03-24)

### Bug Fixes

- **modal:** remove focus of element to eliminate window scrolling ([f2264df](https://github.com/baloise/design-system/commit/f2264df4362db484b7fefbdd8de445b281626b7f))
- **select-button:** add vertical style ([26199e8](https://github.com/baloise/design-system/commit/26199e818656f8addca35757a2d9465a3e94be64))
- **select-button:** adjust for long labels ([c4496c8](https://github.com/baloise/design-system/commit/c4496c8c38a7c51e0239b78392366945c59b2c2b))

## 10.6.0 (2022-03-23)

### [10.6.1](https://github.com/baloise/design-system/compare/v10.6.0...v10.6.1) (2022-03-24)

### Bug Fixes

- **modal:** remove focus of element to eliminate window scrolling ([f2264df](https://github.com/baloise/design-system/commit/f2264df4362db484b7fefbdd8de445b281626b7f))

## [10.6.0](https://github.com/baloise/design-system/compare/v10.5.2...v10.6.0) (2022-03-23)

### Features

- **file-upload:** add loading state ([37e60dd](https://github.com/baloise/design-system/commit/37e60ddabdbf7f6262835f6d96cb8fc3fad98bd2))
- **select:** list of options in a typeahead can be uses as a proposal ([ac6f2f2](https://github.com/baloise/design-system/commit/ac6f2f2d8165b10ea5ad1f3deffea6b576da5483))
- update dependencies ([9d76470](https://github.com/baloise/design-system/commit/9d764700d2174aff19a3e74b5694cc2364f5309a))

### Bug Fixes

- **checkbox:** remove opacity from hidden option ([ac49eae](https://github.com/baloise/design-system/commit/ac49eae3d32fbb93e6d60089bc93c6affc631dc8))
- **heading:** set to display block ([9b831df](https://github.com/baloise/design-system/commit/9b831df9774335e7faf430e414e2219eba9ae41c))
- **input-group:** set to width 100% ([44c37ff](https://github.com/baloise/design-system/commit/44c37ff3f0ec95af28ed16a1b8f0408ea83391a2))
- **navbar:** remove ie11 support ([900d76d](https://github.com/baloise/design-system/commit/900d76df88c3a2f94d9a3a220b28e3e3c7b99dc6))

### [10.5.1](https://github.com/baloise/design-system/compare/v10.3.0...v10.5.1) (2022-03-10)

### Features

- export prop types ([6eb0939](https://github.com/baloise/design-system/commit/6eb093919f230434dec69c11b8b26380e46d8930))
- **icon:** inline prop to set display inline-flex ([16f7865](https://github.com/baloise/design-system/commit/16f78657fd5ab10959e207cb45ca628aa77f03bd))
- **stage:** add prop rounded to change the border-radius ([fb8a8e6](https://github.com/baloise/design-system/commit/fb8a8e63cb716c9832dc75997081a11ee5659d0f))

### Bug Fixes

- **heading:** center text with icons ([d1ae35a](https://github.com/baloise/design-system/commit/d1ae35aba5d36724b6537e309313c57aaa46ed95))

### [10.5.2](https://github.com/baloise/design-system/compare/v10.5.1...v10.5.2) (2022-03-18)

### Bug Fixes

- try to fix file upload by adding passive:false to drag and drop events ([62c8390](https://github.com/baloise/design-system/commit/62c839037e184f330f6a02eeb2ad937e79fc7819))

### [10.5.1](https://github.com/baloise/design-system/compare/v10.5.0...v10.5.1) (2022-03-10)

### Bug Fixes

- **angular:** add new output ([7c196bf](https://github.com/baloise/design-system/commit/7c196bf14f780e3ce2ab77e2c8fec2d21e5f9c2f))
- **button:** enable custom content for square buttons ([ea1b7d6](https://github.com/baloise/design-system/commit/ea1b7d673a58a8f6b33e8571a058f8ae60f773f2))

## [10.5.0](https://github.com/baloise/design-system/compare/v10.4.4...v10.5.0) (2022-03-09)

### Features

- **card:** cards can have a hover effect and a selected background ([8cc7182](https://github.com/baloise/design-system/commit/8cc71827324566f82c78c1053345b2d95c87e88e))
- **data:** add multiline prop ([cc93a3a](https://github.com/baloise/design-system/commit/cc93a3a37ea725c66ad9d00b14bcc7f76f182bb8))
- **file-upload:** add events balFilesAdded and balFilesRemoved ([8c869d7](https://github.com/baloise/design-system/commit/8c869d77be3dbde2bbe1e23a28e5845d888ad87d))
- **select:** can be combined with icons and other inputs ([d35aff4](https://github.com/baloise/design-system/commit/d35aff4f989202060a2654b7149539238acef89a))

### Bug Fixes

- **button:** adjust style for danger outlined button ([c901e47](https://github.com/baloise/design-system/commit/c901e479e8590c7c36a013f6fc914d32588b8c94))
- **button:** hide slot content when square prop is set ([90ced0a](https://github.com/baloise/design-system/commit/90ced0ad8bba8a973f70c82deda808db6d91bd2c))
- **card:** remove usless margin bottom ([d31f5a8](https://github.com/baloise/design-system/commit/d31f5a83f5b117f76c85772fed0da9ad34075726))
- **checkbox:** enabling numbers ([768a58c](https://github.com/baloise/design-system/commit/768a58c98164ff8ec81b9bfedcecd6036217705d))
- **data:** enables custom elements between bal-data and bal-data-item ([a4608d0](https://github.com/baloise/design-system/commit/a4608d0bafc654c9d6018f85a2bb9d4a5b7dae04))
- **field:** only add margin to addon button ([d840066](https://github.com/baloise/design-system/commit/d8400668d28a65581a492628b4a9dd909f45a8e7))
- **radio:** enable boolean ([c834292](https://github.com/baloise/design-system/commit/c834292e524fe160d793453c034860d443ef13b5))

### [10.4.4](https://github.com/baloise/design-system/compare/v10.4.3...v10.4.4) (2022-03-08)

### Bug Fixes

- **card:** remove usless margin bottom ([d31f5a8](https://github.com/baloise/design-system/commit/d31f5a83f5b117f76c85772fed0da9ad34075726))
- **checkbox:** enabling numbers ([768a58c](https://github.com/baloise/design-system/commit/768a58c98164ff8ec81b9bfedcecd6036217705d))
- **data:** enables custom elements between bal-data and bal-data-item ([a4608d0](https://github.com/baloise/design-system/commit/a4608d0bafc654c9d6018f85a2bb9d4a5b7dae04))
- **radio:** enable boolean ([c834292](https://github.com/baloise/design-system/commit/c834292e524fe160d793453c034860d443ef13b5))

### [10.4.3](https://github.com/baloise/design-system/compare/v10.4.2...v10.4.3) (2022-03-08)

### Bug Fixes

- **checkbox:** enabling numbers ([768a58c](https://github.com/baloise/design-system/commit/768a58c98164ff8ec81b9bfedcecd6036217705d))
- **data:** enables custom elements between bal-data and bal-data-item ([a4608d0](https://github.com/baloise/design-system/commit/a4608d0bafc654c9d6018f85a2bb9d4a5b7dae04))

### [10.4.2](https://github.com/baloise/design-system/compare/v10.4.1...v10.4.2) (2022-03-08)

### Bug Fixes

- **card:** remove inner p to simplify usage ([0a27202](https://github.com/baloise/design-system/commit/0a27202e3620fddc245a31eaab4a5fef595d0b08))
- **card:** reset spacing of the batton-group ([4775a85](https://github.com/baloise/design-system/commit/4775a85f6111d6fd003d6998a8cc8bab8cedf874))
- **datepicker:** set week start to monday instead of sunday ([66ceaf0](https://github.com/baloise/design-system/commit/66ceaf00003a41f21cab49c32d9defa02d3897b0))
- **file-upload:** adjust styles for field usage ([a3d95df](https://github.com/baloise/design-system/commit/a3d95dfa402be98245a377b536124f5cbf9a3d8c))
- **modal:** disable scroll on body ([b09bd81](https://github.com/baloise/design-system/commit/b09bd81bce780b38297f16011adb73d77d787680))

### [10.4.1](https://github.com/baloise/design-system/compare/v10.4.0...v10.4.1) (2022-03-07)

### Features

- **checkbox:** group can act as a form control ([55b718f](https://github.com/baloise/design-system/commit/55b718fe7c493744976a28f3a61e3aa8aec638b4))

### Bug Fixes

- **angular:** add shared module to each component ([f6d7fa2](https://github.com/baloise/design-system/commit/f6d7fa2991473bf6a0bf1bf10cd433244ac11354))
- **angular:** add shared module to each component ([3eca007](https://github.com/baloise/design-system/commit/3eca007fe0be1b4be040c2f1c49810d62622911b))
- **button:** remove unused css for button in order to fix bal-badge ([3b61c18](https://github.com/baloise/design-system/commit/3b61c187e3c00a8efd0c742a69e30d8de5931f1d))

### [10.3.3](https://github.com/baloise/design-system/compare/v10.3.2...v10.3.3) (2022-03-07)

### Bug Fixes

- **angular:** filter errorType key of the ng-error component ([54c0869](https://github.com/baloise/design-system/commit/54c0869c6886795bb9d9adb2a0be248300dc1b5b))
- **hint:** make subject on field hint optional ([6fe3eae](https://github.com/baloise/design-system/commit/6fe3eaeb3b4b729da9477de42332d302b1118705))

### [10.3.2](https://github.com/baloise/design-system/compare/v10.3.1...v10.3.2) (2022-03-07)

### Bug Fixes

- **angular:** create shared module to have access to the value accessors ([4c37480](https://github.com/baloise/design-system/commit/4c374802455ca68bf850944cfc4c71d5ffa27a0e))

### [10.3.1](https://github.com/baloise/design-system/compare/v10.3.0...v10.3.1) (2022-03-07)

### Bug Fixes

- **angular:** update angular output lib ([2fd80a8](https://github.com/baloise/design-system/commit/2fd80a8f53acf48d8855c13410a69a8890a14d8a))
- **angular:** update angular output lib ([222d792](https://github.com/baloise/design-system/commit/222d79278b302eb4eaaf476f34e8d5a94b8ddc2b))

## [10.3.0](https://github.com/baloise/design-system/compare/v10.2.0...v10.3.0) (2022-03-03)

### Features

- **checkbox:** add new prop hidden ([2b3eb8d](https://github.com/baloise/design-system/commit/2b3eb8d8ec7d7cf8de5897de7ebfa6e33245a588))
- **icons:** add new settings icon ([f48ee52](https://github.com/baloise/design-system/commit/f48ee529f388a524ae6fc2008bead367f35e6439))
- **input:** only trigger change on user change events ([59913d3](https://github.com/baloise/design-system/commit/59913d365ad1e135a59662a775ddc7d70cdf1199))
- **inputs:** adjust input events ([6d9e1c7](https://github.com/baloise/design-system/commit/6d9e1c79427b11935d2fffa1516797be176c753e))
- **number-input:** create new component to improve type safty ([cf6a4db](https://github.com/baloise/design-system/commit/cf6a4db744496e22326652897d3402dac8ef3bed))
- **react:** add custom output ([53d6547](https://github.com/baloise/design-system/commit/53d6547763b262494b3b7051edc23b1f56b5f22e))
- **testing:** add legacy accessors ([82f3023](https://github.com/baloise/design-system/commit/82f3023b99320bea0f94e711e954ef06798f4341))
- **testing:** add legacy mixins ([d1c1fc6](https://github.com/baloise/design-system/commit/d1c1fc65a854db8cee02eed0f8428969e63cf1c0))
- update allowed hosts for footer links ([05fea7a](https://github.com/baloise/design-system/commit/05fea7a260390d1dbc802ca7b4aa956b69c97d00))

### Bug Fixes

- **angular:** add missing child components to the modules ([7e30eec](https://github.com/baloise/design-system/commit/7e30eecf612be3a6a5b6488a3c0d7527ce69959c))
- **angular:** add missing child components to the modules ([942fb79](https://github.com/baloise/design-system/commit/942fb79c8ff2fb991d815f91ffee0bb95ea6756f))
- **angular:** add missing child components to the modules ([a7ab7b1](https://github.com/baloise/design-system/commit/a7ab7b1ccecc90e169f4c1a7903dbe4374390c27))
- **angular:** add missing child components to the modules ([f1beac1](https://github.com/baloise/design-system/commit/f1beac1820bd30cb0a9ce13331a6f5d3178e8212))
- **angular:** add missing child components to the modules ([339a766](https://github.com/baloise/design-system/commit/339a76635a9e4f43808a88d6c48ad95118977a20))
- **close:** add button type ([b9fbfe8](https://github.com/baloise/design-system/commit/b9fbfe87bee21547df1efac90161a99b3a33cea3))
- **input-stepper:** switch buttons ([866b718](https://github.com/baloise/design-system/commit/866b718d55c727f2ad1147eccf4bf25899735e4e))
- **list:** change role to list ([d3a6e14](https://github.com/baloise/design-system/commit/d3a6e14a00953724c6cd0092709f5aa26d11cecc))
- **react:** use fragment for inner child elements ([86d4986](https://github.com/baloise/design-system/commit/86d49867c5f14c2fbad0db0020d2c754589a76c8))
- **select:** enable form submitting ([0d56e7f](https://github.com/baloise/design-system/commit/0d56e7fa20e99f59d845d440184b7041b92bb2f8))
- **stage:** center image ([2f36bdb](https://github.com/baloise/design-system/commit/2f36bdbccd1e6978dace9f465f248ea910d4beec))
- **stage:** create angular component set ([0f14d51](https://github.com/baloise/design-system/commit/0f14d51c03d03d2672968291d181694bc64b3ddd))
- **steps:** override clickable when disabled ([642406a](https://github.com/baloise/design-system/commit/642406adb80f990353e636b0ad8fa45e0a68b332))

## [10.2.0](https://github.com/baloise/design-system/compare/v10.1.0...v10.2.0) (2022-02-21)

### Features

- **field:** add hint props to bal-flield-hint ([a4ee057](https://github.com/baloise/design-system/commit/a4ee057abd1261e136997add251ebfeb58b600e8))
- **footer:** display language selection ([7cf914f](https://github.com/baloise/design-system/commit/7cf914f69a88b0f0bb4960c90efd1bcb059f11c9))
- **footer:** make language selection hideable ([7bd9926](https://github.com/baloise/design-system/commit/7bd9926dbb35ba50722d24a6b75bfbfbd6048d5c))
- **footer:** start to include language links ([4706e85](https://github.com/baloise/design-system/commit/4706e85a2b38e7faca90d6bd5dd9b319c127a729))
- **i18n:** onBalConfigChange ([87af016](https://github.com/baloise/design-system/commit/87af0165b49352befbc26b68cd29239ac4f5c514))
- **input-stepper:** add new component ([5b053c2](https://github.com/baloise/design-system/commit/5b053c299b5ba177d75d7b82221e295ea33d89c1))
- **list:** add native ul & ol styles ([3f3f375](https://github.com/baloise/design-system/commit/3f3f375f11baa0cb431504657baa2df041f851a4))
- **logo:** add new component ([525aef6](https://github.com/baloise/design-system/commit/525aef6fd260fa7200b258b253ac64b277821225)), closes [#484](https://github.com/baloise/design-system/issues/484)
- **navbar:** support tabs and popover ([924db93](https://github.com/baloise/design-system/commit/924db93b6af64a83c31e823d7e771d9901408f6b))
- **stage:** add new component ([7f07b50](https://github.com/baloise/design-system/commit/7f07b501bf1262d65daf53284b941a3fc7973282))
- **tag:** add light variant and combination with the card component ([c0811df](https://github.com/baloise/design-system/commit/c0811dfe831c276af7578b47e2c203add73822cd))

### Bug Fixes

- **button:** adjust spacing for mobile ([ec73ebd](https://github.com/baloise/design-system/commit/ec73ebd97910470788dae08497ebc5c32dd71bad))
- **button:** adjust styles for info ([3a95df1](https://github.com/baloise/design-system/commit/3a95df1eeda6bf0856e050e8eb57d32bd8e92aa7))
- **button:** remove 100% width use flexbox instead ([653a2b6](https://github.com/baloise/design-system/commit/653a2b60e0a641809a3ab37908723c76ac6a49ff))
- **checkbox:** enable grouped checkboxes ([b004c35](https://github.com/baloise/design-system/commit/b004c350587872c08e8619a1bc2dc5f7ebf58e8b)), closes [#497](https://github.com/baloise/design-system/issues/497)
- **datepicker:** improve mobile layout ([16d4e1f](https://github.com/baloise/design-system/commit/16d4e1f4b0a8f11dce56e7c17e95e408250aef2d))
- **field:** add more space for error message ([e09d751](https://github.com/baloise/design-system/commit/e09d751120751cf8e9deca319ad3eaa247f75271))
- **heading:** enable visual headings ([cc27093](https://github.com/baloise/design-system/commit/cc270937f90917226d6adc1ea3a6ca247cb4a03d))
- **i18n:** fix typo in updateBalLanguage ([e3612de](https://github.com/baloise/design-system/commit/e3612deaa30ade446dd278e42ccdacd2f940a6bc))
- **input:** always return the raw value ([50294d2](https://github.com/baloise/design-system/commit/50294d2b8d9280b1b6b2ff8425f5d6d5f875e364))
- **react:** auto define components ([2060327](https://github.com/baloise/design-system/commit/2060327c97339ea7247f47aa3e3fa650a952a143))
- **react:** change .mjs to .esm.js ([7d2f7e5](https://github.com/baloise/design-system/commit/7d2f7e549a1dcff250ef57c214c25ca83e58c634))
- **select:** remove duplicated id ([f585255](https://github.com/baloise/design-system/commit/f585255dd29e7331890318ea4e8e162b53fd84a1))
- **typography:** use rem instead of px, add mobile size variant ([0f5ed12](https://github.com/baloise/design-system/commit/0f5ed128794419b1a52bdeff69c79d89f5a48479))
- use utils from web-app-utils ([ef7432c](https://github.com/baloise/design-system/commit/ef7432c02cec65a6ea09a63ac8869e7f919f83bf))
- **vue:** improve exports ([be51095](https://github.com/baloise/design-system/commit/be51095ac1032fffbdf492cbbc96f3aaf34bba42))

## [10.1.0](https://github.com/baloise/design-system/compare/v10.0.0...v10.1.0) (2022-02-16)

### Features

- **badge:** add new component ([1be6bb6](https://github.com/baloise/design-system/commit/1be6bb6d347d821932ae760b9611acfde035c48e))
- **badge:** add postion for button, tabs and card ([e250a99](https://github.com/baloise/design-system/commit/e250a994fc6c8cc9402f7685fd6e25c2e5d28301))
- **checkbox:** add vertical prop ([85fab4e](https://github.com/baloise/design-system/commit/85fab4e6dd3320ed4d2df5f61668491cf8e2e57e))
- **close:** add new component ([9376e65](https://github.com/baloise/design-system/commit/9376e6541c7a138264d3d23db1b63a459f57916a))
- **input-group:** add new component ([368846f](https://github.com/baloise/design-system/commit/368846f0f2c7daafff45aa2b063046d1c84d7069))
- **radio:** add vertical prop ([ed63b7e](https://github.com/baloise/design-system/commit/ed63b7ef8ca50f9b7d94a701677fd3cb54df7488))
- **spacing:** add mt-auto ([82d71a0](https://github.com/baloise/design-system/commit/82d71a090613aa50f1754d848d0099fe44f82fe8))
- **style:** add opacity css helpers ([d3fd351](https://github.com/baloise/design-system/commit/d3fd3516f70bf83ab45d953b065d7e437ef55051))

### Bug Fixes

- **button-group:** use whole width ([a481f87](https://github.com/baloise/design-system/commit/a481f874c591e934833a049219933557b7a18f66))
- **heading:** add missing styles for h6 ([067153b](https://github.com/baloise/design-system/commit/067153b79308bd923b1af2abae9eb32db4d9ea8b))
- **list:** add large size ([55d6dcf](https://github.com/baloise/design-system/commit/55d6dcfeee47ece4944e0aa9ba3ba90697ac097b))
- **list:** adjust spacing for content items ([50e21a0](https://github.com/baloise/design-system/commit/50e21a0f4d92912b663e4d436e7c48b8fa5e031b))
- **list:** rework flexbox ([0c422b5](https://github.com/baloise/design-system/commit/0c422b58da537a98ee4a4642bcd30d4710e9dacf))
- **modal:** on mobile buttons are at the bottom ([ff93cde](https://github.com/baloise/design-system/commit/ff93cde897fc687b208333d6e7c697f7436df6e1))
- **pagination:** use bal-button ([540cc3f](https://github.com/baloise/design-system/commit/540cc3f40eb73e74deab91cce41f7c04e16bbacb))
- **select-button:** add support for mobile devices ([75647d2](https://github.com/baloise/design-system/commit/75647d2a8424e80b012650b78329f9d86aeedac6))
- **select:** check if option is there ([1fc58d9](https://github.com/baloise/design-system/commit/1fc58d9e9ebd5cd586a96d9216592dbb56b7dd51))

## [10.0.0](https://github.com/baloise/design-system/compare/v9.2.2...v10.0.0) (2022-02-10)

### ⚠ BREAKING CHANGES

- **checkbox:** use checked as the new value property
- **angular:** rename core module and need to add the used component modules.

### Features

- **angular:** component based modules instead of one ([5395696](https://github.com/baloise/design-system/commit/5395696d3d659928a67bebfff216615a9bf6a98a))
- **field:** add hint props to bal-flield-hint ([a4ee057](https://github.com/baloise/design-system/commit/a4ee057abd1261e136997add251ebfeb58b600e8))
- **i18n:** onBalConfigChange ([87af016](https://github.com/baloise/design-system/commit/87af0165b49352befbc26b68cd29239ac4f5c514))
- **list:** add native ul & ol styles ([3f3f375](https://github.com/baloise/design-system/commit/3f3f375f11baa0cb431504657baa2df041f851a4))

### Bug Fixes

- **button:** adjust spacing for mobile ([ec73ebd](https://github.com/baloise/design-system/commit/ec73ebd97910470788dae08497ebc5c32dd71bad))
- **checkbox:** enable grouped checkboxes ([b004c35](https://github.com/baloise/design-system/commit/b004c350587872c08e8619a1bc2dc5f7ebf58e8b)), closes [#497](https://github.com/baloise/design-system/issues/497)
- **heading:** enable visual headings ([cc27093](https://github.com/baloise/design-system/commit/cc270937f90917226d6adc1ea3a6ca247cb4a03d))
- **i18n:** fix typo in updateBalLanguage ([e3612de](https://github.com/baloise/design-system/commit/e3612deaa30ade446dd278e42ccdacd2f940a6bc))
- **input:** always return the raw value ([50294d2](https://github.com/baloise/design-system/commit/50294d2b8d9280b1b6b2ff8425f5d6d5f875e364))
- **sheet:** adjust spacing ([c1e83a5](https://github.com/baloise/design-system/commit/c1e83a551176f135b3aa34ec1a702afa5f5e1085))
- **vue:** improve exports ([be51095](https://github.com/baloise/design-system/commit/be51095ac1032fffbdf492cbbc96f3aaf34bba42))

### [9.2.1](https://github.com/baloise/design-system/compare/v9.2.0...v9.2.1) (2022-02-03)

### Bug Fixes

- improve config usage with proxy libs ([196873c](https://github.com/baloise/design-system/commit/196873ccba17f9807c4bc439591b802ca03fa485))

## [9.2.0](https://github.com/baloise/design-system/compare/v9.1.0...v9.2.0) (2022-02-01)

### Features

- **checkbox:** add group component ([3c5b611](https://github.com/baloise/design-system/commit/3c5b611d33b585a8e5c9408d2f92f787501e0b42))

### Bug Fixes

- **accordion:** add missing spacing in combination with cards ([adc4e85](https://github.com/baloise/design-system/commit/adc4e85779ee44a2e65efeb5b8610f260beb76f8))
- **form:** add name attribute to form controls ([5491305](https://github.com/baloise/design-system/commit/5491305179341b2d3249921287004f2aef8e0f70))
- **radio:** adjust spacing between radio buttons ([8822469](https://github.com/baloise/design-system/commit/8822469ef0fe0944f4eb16420519838719911597))

## [9.1.0](https://github.com/baloise/design-system/compare/v9.0.7...v9.1.0) (2022-01-31)

### Features

- add internationalization ([d50e3ca](https://github.com/baloise/design-system/commit/d50e3ca7462b8991ce0c3941f0465e262679795a))
- **config:** add date and number formats to global config ([8e2b9d0](https://github.com/baloise/design-system/commit/8e2b9d09dca8fcbc63d918ccc83e1e5873952bed))

### Bug Fixes

- **button:** adjust button order on mobile ([2640e1c](https://github.com/baloise/design-system/commit/2640e1c4a85bb5915d83d557234e44d51487ac2a)), closes [#475](https://github.com/baloise/design-system/issues/475)
- **data:** adjust mobile view ([9e3921f](https://github.com/baloise/design-system/commit/9e3921f83bc6a9df18b50b8fb52dc2a124eaca03)), closes [#461](https://github.com/baloise/design-system/issues/461) [#477](https://github.com/baloise/design-system/issues/477)
- **datepicker:** resolve max attribute logic ([8b200b6](https://github.com/baloise/design-system/commit/8b200b625e0cf426957c488fa65eb14a4f62a94c)), closes [#445](https://github.com/baloise/design-system/issues/445)
- **form:** improve invalid style ([cf9902f](https://github.com/baloise/design-system/commit/cf9902fa46bf7253153c2a471f51fa05199cd639))
- **form:** improve sync of props ([98db4a1](https://github.com/baloise/design-system/commit/98db4a1bde80859c8078988cf9ce7d581b9bbfd7))
- **navbar:** remove margin bottom ([a22a072](https://github.com/baloise/design-system/commit/a22a072280ca9f27c52b3df0fb17c8e38cc5067a))
- **pagination:** adjust for mobile view ([c25a04d](https://github.com/baloise/design-system/commit/c25a04dd18f6d5c4070e7cb045e032ec97a31426)), closes [#476](https://github.com/baloise/design-system/issues/476)
- **radio:** remove inconsistent shade ([91aa2e3](https://github.com/baloise/design-system/commit/91aa2e317226eeffc7dcae4a648c5a4c2295ffdf)), closes [#386](https://github.com/baloise/design-system/issues/386)
- **vue:** add plugin function with better typesafty ([b1b29de](https://github.com/baloise/design-system/commit/b1b29de4833944c9d8265943c7d47e3d28eef9fd))

### [9.0.7](https://github.com/baloise/design-system/compare/v9.0.6...v9.0.7) (2022-01-27)

### Bug Fixes

- remove baloiseStencilViteFix from postinstall ([d185d0d](https://github.com/baloise/design-system/commit/d185d0d433f5b48307f78d7f36d0e690b3905f8e))

### [9.0.6](https://github.com/baloise/design-system/compare/v9.0.5...v9.0.6) (2022-01-25)

### Bug Fixes

- **vue:** add vite support ([cf0c356](https://github.com/baloise/design-system/commit/cf0c356db330fad53685146528da23faca4da0cf))

### [9.0.5](https://github.com/baloise/design-system/compare/v9.0.4...v9.0.5) (2022-01-20)

### Bug Fixes

- **modal:** break text in modal title ([f7ccd46](https://github.com/baloise/design-system/commit/f7ccd46f30f7db1bec8a97392839b34df86d7323))
- **vue:** add better vite support ([6503327](https://github.com/baloise/design-system/commit/6503327cb43193f432d5f0bccd47ac5955fefa9a))

### [9.0.4](https://github.com/baloise/design-system/compare/v9.0.3...v9.0.4) (2022-01-19)

### Bug Fixes

- **hint:** adjust mobile view ([df56521](https://github.com/baloise/design-system/commit/df5652119d8dcc5768f417bd47c12176e6a8f61e))
- **list:** remove margin top ([500753d](https://github.com/baloise/design-system/commit/500753d4ce8b459ca0dae795868e24f9df6efe42))
- **vue:** add better vite support ([6503327](https://github.com/baloise/design-system/commit/6503327cb43193f432d5f0bccd47ac5955fefa9a))

### [9.0.3](https://github.com/baloise/design-system/compare/v9.0.2...v9.0.3) (2022-01-18)

### Bug Fixes

- **container:** use real value for the angular scss compiler ([5257ef4](https://github.com/baloise/design-system/commit/5257ef4c59101a73ba551aa835fdb06d5cc64415))
- **proxy:** export ProxyComponent interface ([6d7d085](https://github.com/baloise/design-system/commit/6d7d085a3890fce8a544cd594dfea4af2a75ecfe))

### [9.0.2](https://github.com/baloise/design-system/compare/v9.0.1...v9.0.2) (2022-01-17)

### Bug Fixes

- **card:** add missing subcomponents ([49fef91](https://github.com/baloise/design-system/commit/49fef913afefb44d177a98965bfc5bcc1d65f325))

### [9.0.1](https://github.com/baloise/design-system/compare/v9.0.0...v9.0.1) (2022-01-11)

### Bug Fixes

- **hint:** adjust mobile view ([df56521](https://github.com/baloise/design-system/commit/df5652119d8dcc5768f417bd47c12176e6a8f61e))
- **list:** remove margin top ([500753d](https://github.com/baloise/design-system/commit/500753d4ce8b459ca0dae795868e24f9df6efe42))

## [9.0.0](https://github.com/baloise/design-system/compare/v8.0.1...v9.0.0) (2022-01-10)

Follow the migration guide [Migration from 8.x to 9.x](https://design.baloise.dev/?path=/docs/development-upgrade-guides-updating-to-v10--page)

### ⚠ BREAKING CHANGES

- **card:** remove all card sub-components
- **modal:** remove bal-modal-footer
- **card:** remove all the sub components and use css helpers and existing components
- **angular:** Rename checked to value of the bal-checkbox
- **tabs:** add value prop,
  rename balTabChange to balChange and remove active tab on tab items
- **hint:** Rename open to present and close to dismiss
- **popover:** Renamed is-active to value and balCollapse to balChange
- **accordion:** Renamed is-active to value and balCollapse to balChange
- **form:** Removed prop expanded, removed component bal-dropdown-trigger
  and renamed bal-dropdown to bal-popover
- **modal:** Removed bal-modal-actions

### Features

- **accordion:** add two way binding ([eeda1c0](https://github.com/baloise/design-system/commit/eeda1c018259b75eeeec4c62ed94cb9a8e27551c))
- **button:** add bal-button-group component ([deb9394](https://github.com/baloise/design-system/commit/deb93949d6ccf5ca4c5637f1d884667d1531add9))
- **card:** simplify usage ([66c2d67](https://github.com/baloise/design-system/commit/66c2d676ccd473f4c0348b62a412afa178ad993c))
- **popover:** add two way binding ([e3f01d2](https://github.com/baloise/design-system/commit/e3f01d20dc00e5d5b736aa56954e8d9dff6c1d72))
- **tabs:** able to change value with the active prop on the bal-tab-item ([f9553cb](https://github.com/baloise/design-system/commit/f9553cb501eb390f6964e8dd881228ded36e623c))
- **tabs:** add two way binding ([aaf41a1](https://github.com/baloise/design-system/commit/aaf41a1f8af91a6f8d7907b085e7c66b64ce664f))

### Bug Fixes

- **angular:** adjust boolean accessor for two way binding ([ed57dcc](https://github.com/baloise/design-system/commit/ed57dccec735d65887d44d3d79e4f6cdb94f1877))
- **angular:** enable two way binding ([8602df8](https://github.com/baloise/design-system/commit/8602df8151c075648bed48269a6ca1657f00c80f))
- **form:** set expanded as default and use popper.js for the popovers ([0845ade](https://github.com/baloise/design-system/commit/0845ade7eb5248a912c5eff36bba9f4aa9ed9c1a))
- **hint:** use standard method names ([b1f4040](https://github.com/baloise/design-system/commit/b1f40409f8f7ab5e1fb70ba4551c868d209d4811))
- **modal:** remove action component, improve large content and popovers ([1095dab](https://github.com/baloise/design-system/commit/1095dabee411579744119b03a922e23b8f878d7e))
- **modal:** simplify usage ([69de08d](https://github.com/baloise/design-system/commit/69de08dc66073340f32833db9139639ace88ec5b))
- **notices:** add missing padding ([82333e1](https://github.com/baloise/design-system/commit/82333e13493cd6e67e9d70286fb06472f5cc82f3))
- **notification:** adjust paddings ([f7eab49](https://github.com/baloise/design-system/commit/f7eab497dbe6b84e56ee3da4bbf6966fb37069b7))
- update deps ([a316a3e](https://github.com/baloise/design-system/commit/a316a3ec535329fbea12c0ae3a5ad1639414c22a))

### Code Refactoring

- **card:** reduce amount of components ([905bc0c](https://github.com/baloise/design-system/commit/905bc0c872aeb859896aa58259dd9509d6a8fb22))

### [8.0.1](https://github.com/baloise/design-system/compare/v8.0.0...v8.0.1) (2022-01-05)

### Bug Fixes

- **container:** increase the level of is-compact ([db08332](https://github.com/baloise/design-system/commit/db08332c9947b0c6808d599bdda08a225f03668d))

## [8.0.0](https://github.com/baloise/design-system/compare/v7.0.1...v8.0.0) (2022-01-05)

### ⚠ BREAKING CHANGES

- **tabs:** `rounded` prop is removed use `interface` `tabs-sub`
  - Follow the migration guide [Migration from 7.x to 8.x](https://design.baloise.dev/?path=/docs/development-upgrade-guides-updating-to-v10--page)

### Features

- **tabs:** add sub-navigation ([7822461](https://github.com/baloise/design-system/commit/7822461d09c88030146a94b03785a7cb53b1c418))

### Bug Fixes

- **footer:** adjust hide links ([e48f10f](https://github.com/baloise/design-system/commit/e48f10f5cbbe0335fbc453319dfc98122f968eab))
- **form:** adjust expanded style ([d5ae8d0](https://github.com/baloise/design-system/commit/d5ae8d0404483fbcfe86cd0d619d4cdf45e01d37))
- **style:** remove global styles from utilities ([b943436](https://github.com/baloise/design-system/commit/b94343667b912a9a6735e452a5aab431bdd94e25))

### Code Refactoring

- **tabs:** remove rounded option ([9da1c71](https://github.com/baloise/design-system/commit/9da1c714ee0fa4a19981de69f673983243794e10))

# [7.0.0](https://github.com/baloise/design-system/compare/v6.0.0...v7.0.0) (2022-01-04)

### BREAKING CHANGES

- The unsupported browsers has been moved to [@baloise/web-app-unsupported-browsers](https://github.com/baloise/web-app-utils/tree/master/packages/unsupported-browsers).
  - Follow the migration guide [Migration from 6.x to 7.x](https://design.baloise.dev/?path=/docs/development-upgrade-guides-updating-to-v10--page)

# [6.0.0](https://github.com/baloise/design-system/compare/v5.0.0...v6.0.0) (2021-12-28)

### BREAKING CHANGES

- Added and improved the css helper classes.
  - Follow the migration guide [Migration from 5.x to 6.x](https://design.baloise.dev/?path=/docs/development-upgrade-guides-updating-to-v10--page)

### Features

- **css-helpers:** improve color, border, radius, flexbox, visibility and shadow ([25d1fc](https://github.com/baloise/design-system/commit/25d1fc6c75cb0688e03fd73c7444f39ceb2a49e1))

## [5.0.2](https://github.com/baloise/design-system/compare/v5.0.1...v5.0.2) (2021-12-22)

### Bug Fixes

- **core:** ignore components.d.ts and export types only in the types.d.ts file ([7b1e705](https://github.com/baloise/design-system/commit/7b1e705d290c9d306890d30f3e65b7b5a06bdf92))

# [5.0.0](https://github.com/baloise/design-system/compare/v4.0.0...v5.0.0) (2021-12-20)

### BREAKING CHANGES

- The component `bal-app` lost his props, due better integration for our proxy libraries.
  - Follow the migration guide [Migration from 4.x to 5.x](https://design.baloise.dev/?path=/docs/development-upgrade-guides-updating-to-v10--page)

### Features

- **vue:** add modal controller ([097e08](https://github.com/baloise/design-system/pull/420/commits/097e08a7a01546294ac9a2858e4db1f82e571b50))

## [4.3.1](https://github.com/baloise/design-system/compare/v4.3.0...v4.3.1) (2021-12-15)

### Bug Fixes

- add missing sass files of the components ([2efa8ca](https://github.com/baloise/design-system/commit/2efa8ca11e4f0541f01320485a409ac0a003bf5a))

# [4.3.0](https://github.com/baloise/design-system/compare/v4.2.0...v4.3.0) (2021-12-15)

### Bug Fixes

- **stencil:** adjust build artifacts for the docs ([fec6c9f](https://github.com/baloise/design-system/commit/fec6c9fb1acfb86a642c4fdd7d58dcf20a8948bd))
- **vue:** need to remove experimental vite support ([749ca74](https://github.com/baloise/design-system/commit/749ca74228f7990da6dad07e161abc421bf183c4))

### Features

- add component style to global sass file for customization ([f57d254](https://github.com/baloise/design-system/commit/f57d25485f19650430aa5218af6e3f501bd858b9))
- add component style to global sass file for customization ([17bd5e0](https://github.com/baloise/design-system/commit/17bd5e0d28cb55809e903408595f8ee0547b8712))
- add component style to global sass file for customization ([0b9a471](https://github.com/baloise/design-system/commit/0b9a471a58c7e8d1786819c58153fd0cef9d3c66))
- **hint:** add small variant ([d33f273](https://github.com/baloise/design-system/commit/d33f273d43702441947b61a3b9cd5112456c7260))
- **stencil:** update version 2.11.0 ([b9a8c25](https://github.com/baloise/design-system/commit/b9a8c2561d880e8ced0cf413a9eb190841d9b4f5))

# [4.2.0](https://github.com/baloise/design-system/compare/v4.1.2...v4.2.0) (2021-12-15)

### Bug Fixes

- **vue:** need to remove experimental vite support ([749ca74](https://github.com/baloise/design-system/commit/749ca74228f7990da6dad07e161abc421bf183c4))

### Features

- add component style to global sass file for customization ([f57d254](https://github.com/baloise/design-system/commit/f57d25485f19650430aa5218af6e3f501bd858b9))
- add component style to global sass file for customization ([17bd5e0](https://github.com/baloise/design-system/commit/17bd5e0d28cb55809e903408595f8ee0547b8712))
- add component style to global sass file for customization ([0b9a471](https://github.com/baloise/design-system/commit/0b9a471a58c7e8d1786819c58153fd0cef9d3c66))
- **hint:** add small variant ([d33f273](https://github.com/baloise/design-system/commit/d33f273d43702441947b61a3b9cd5112456c7260))
- **stencil:** update version 2.11.0 ([b9a8c25](https://github.com/baloise/design-system/commit/b9a8c2561d880e8ced0cf413a9eb190841d9b4f5))

## [4.1.2](https://github.com/baloise/design-system/compare/v4.1.1...v4.1.2) (2021-12-15)

### Bug Fixes

- **button:** improve icon inverted style ([28a4147](https://github.com/baloise/design-system/commit/28a4147dbebf22cecd142beb26a7ae761769a2bc))
- **checkbox:** adjust switch style ([fda5174](https://github.com/baloise/design-system/commit/fda517471049fd80a771125882245b872c550313))

# 4.1.0 (2021-12-10)

## [4.1.1](https://github.com/baloise/design-system/compare/v4.1.0...v4.1.1) (2021-12-13)

### Bug Fixes

- **button:** adjust the color of the icon for outlined ([d8f71e0](https://github.com/baloise/design-system/commit/d8f71e0f7ef250e1c55cd6e9a4c62c55ecf2bffe))

# [4.1.0](https://github.com/baloise/design-system/compare/v4.0.3...v4.1.0) (2021-12-10)

### Bug Fixes

- **radio:** adjust space between radio and label ([72f3a88](https://github.com/baloise/design-system/commit/72f3a880ee89cb2884d40c97cefa893544243f38))
- **vue:** element fn parameter will be used as unref ([e2b1302](https://github.com/baloise/design-system/commit/e2b13020a75f3af8a0cd9accd84900d9c444f2d0))

### Features

- **angular:** add element helper function ([6a7e57a](https://github.com/baloise/design-system/commit/6a7e57a0d6bf9f8d6e9f58cfe11b66abb4ef31e1))
- **component:** return helper functions like wait, getAppRoot, componentOnReady ([7797fb3](https://github.com/baloise/design-system/commit/7797fb394ddb802dde43dc95aec49cd129d53475))
- return helper isDescendant ([0c1b8ca](https://github.com/baloise/design-system/commit/0c1b8ca51cd1d17d50b1ae031f1a684bd902a2f0))

## [4.0.3](https://github.com/baloise/design-system/compare/v4.0.2...v4.0.3) (2021-12-09)

### Bug Fixes

- **component:** add 100% width to container ([c3aface](https://github.com/baloise/design-system/commit/c3afacec87653953fd290edf004203b5b1a85314))

## [4.0.1](https://github.com/baloise/design-system/compare/v4.0.0...v4.0.1) (2021-12-09)

### Bug Fixes

- **angular:** use ng-packagr 10.1.2 ([de33875](https://github.com/baloise/design-system/commit/de338758effbc93f6330f2a6f727131430641d18))
- remove lodash.isArray ([53a642b](https://github.com/baloise/design-system/commit/53a642be572218feab5c3218c7c3969d57d233f0))

# [4.0.0](https://github.com/baloise/design-system/compare/v3.0.0...v4.0.0) (2021-12-08)

### BREAKING CHANGES

- The breakpoints and spacing helpers are adjusted to new guidlines and duplicated/old css class are removed.
  - Follow the migration guide [Migration from 3.x to 4.x](https://design.baloise.dev/?path=/docs/development-upgrade-guides-updating-to-v10--page)

### Features

- **spacing:** add responsive spacing helpers ([bc8588d](https://github.com/baloise/design-system/commit/bc8588d6f4e777b9769401f77de5b82be8ef41b7))
- **file-upload:** add prop has-file-list ([5b9d051](https://github.com/baloise/design-system/commit/5b9d051d8293f655d49fc30fd88400870730dfdf))
- **container:** add compact option ([f509fd3](https://github.com/baloise/design-system/commit/f509fd3481b23f66d3b5fa13b84b18bd761521ca))

### Bug Fixes

- **datepicker:** adjust min max behaviour ([f469440](https://github.com/baloise/design-system/commit/f469440d36fd423443971316d6aad1e29c172d6d))
- **select:** adjust selected background ([d9e28ae](https://github.com/baloise/design-system/commit/d9e28aeed7e9df65e88653322ef0f544419645d8))
- **sheet:** improve spacing ([285857f](https://github.com/baloise/design-system/commit/285857f28fd98c14a654da82a5ed68f19af492f1))
- **hint:** adjust spacing and font size ([f2773b7](https://github.com/baloise/design-system/commit/f2773b78fa1acca194cfad3bfb58b66bf0d92e3f))

# [3.0.0](https://github.com/baloise/design-system/compare/v2.0.5...v3.0.0) (2021-12-03)

### BREAKING CHANGES

- `has-sticky-footer` has to be set explicit to the `ba-app` component.
  - Follow the migration guide [Migration from 2.x to 3.x](https://design.baloise.dev/?path=/docs/development-upgrade-guides-updating-to-v10--page)

## [2.0.5](https://github.com/baloise/design-system/compare/v2.0.4...v2.0.5) (2021-11-24)

### Bug Fixes

- **file-upload:** using @baloise/web-app-utils for areArraysEqual ([a0b4793](https://github.com/baloise/design-system/commit/a0b47939bc39a5e97755d2f57504ca554971874b))

## [2.0.3](https://github.com/baloise/design-system/compare/v2.0.2...v2.0.3) (2021-11-23)

### Bug Fixes

- **heading:** add missing subtile color ([7572254](https://github.com/baloise/design-system/commit/7572254cc29ffc298cca4f89327789626f5391ec))

## [2.0.0](https://github.com/baloise/design-system/compare/v1.19.10...v2.0.0) (2021-11-22)

### BREAKING CHANGES

- Moved utils, filters/pipes and validators to [web-app-utils](https://github.com/baloise/web-app-utils) packages.
  - Follow the migration guide [Migration from 1.x to 2.x](https://design.baloise.dev/components/migration/migration-from-1.x.html)

### Bug Fixes

- modal: fix width issue with the close button

## [1.19.10](https://github.com/baloise/design-system/compare/v1.19.9...v1.19.10) (2021-11-17)

### Bug Fixes

- lock version issue ([a557276](https://github.com/baloise/design-system/commit/a557276dc09b972d630c7961efda9c1db0fbf823))

## [1.19.9](https://github.com/baloise/design-system/compare/v1.19.8...v1.19.9) (2021-11-17)

### Bug Fixes

- **testing:** add textarea ([0b9f7b9](https://github.com/baloise/design-system/commit/0b9f7b9091c1a0a95016c5b8dc02423666a5cf62))
- **testing:** improve isElemen function ([531e497](https://github.com/baloise/design-system/commit/531e4976cd57b332d39e89c9f5ee1cb419dedff7))

## [1.19.7](https://github.com/baloise/design-system/compare/v1.19.6...v1.19.7) (2021-11-11)

### Bug Fixes

- **footer:** styling of links ([45abc70](https://github.com/baloise/design-system/commit/45abc70d5e2917e2061f03511b797e273bed061f))

## [1.19.6](https://github.com/baloise/design-system/compare/v1.19.5...v1.19.6) (2021-11-10)

### Bug Fixes

- **footer:** update styling ([30d45c3](https://github.com/baloise/design-system/commit/30d45c310ecc6e812f07b82be2a5e1250de7b72f))

## [1.19.5](https://github.com/baloise/design-system/compare/v1.19.4...v1.19.5) (2021-11-10)

### Bug Fixes

- **select:** Skip one single test to test if the build is working ([516021f](https://github.com/baloise/design-system/commit/516021fc3d93beff9819a9667abc29e6aa4cdd73))

## 1.19.3 (2021-11-09)

## [1.19.4](https://github.com/baloise/design-system/compare/v1.19.3...v1.19.4) (2021-11-10)

### Bug Fixes

- **select:** Skip one single test to test if the build is working ([516021f](https://github.com/baloise/design-system/commit/516021fc3d93beff9819a9667abc29e6aa4cdd73))

## [1.19.2](https://github.com/baloise/design-system/compare/v1.19.1...v1.19.2) (2021-11-09)

### Bug Fixes

- **footer:** Missing import ([3d4eaeb](https://github.com/baloise/design-system/commit/3d4eaebe336883a7cd72378de25963715af5fa08))
- **footer:** Update links when locale changes ([7911b9b](https://github.com/baloise/design-system/commit/7911b9b2e039dae52002d09e33e3fdb441c57503))

## [1.19.1](https://github.com/baloise/design-system/compare/v1.19.0...v1.19.1) (2021-10-08)

# [1.19.0](https://github.com/baloise/design-system/compare/v1.18.15...v1.19.0) (2021-10-08)

### Features

- **footer:** add dynamic baloise links ([263a661](https://github.com/baloise/design-system/commit/263a6617fc59217963149ef480785f89a51de965))

## [1.18.15](https://github.com/baloise/design-system/compare/v1.18.14...v1.18.15) (2021-10-08)

## 1.18.13 (2021-10-08)

**Note:** Version bump only for package root

## [1.18.14](https://github.com/baloise/design-system/compare/v1.18.13...v1.18.14) (2021-10-08)

### Bug Fixes

- **link:** add inverted style ([e801ef6](https://github.com/baloise/design-system/commit/e801ef62237238760e8831ea30398b3bc5e6faf7))

## [1.18.13](https://github.com/baloise/design-system/compare/v1.18.12...v1.18.13) (2021-10-08)

**Note:** Version bump only for package root

## [1.18.12](https://github.com/baloise/design-system/compare/v1.18.11...v1.18.12) (2021-10-07)

### Bug Fixes

- release workflow ([0a0f8f1](https://github.com/baloise/design-system/commit/0a0f8f1324634d1c6681ee5cc4806237be429323))

## [1.18.7](https://github.com/baloise/design-system/compare/v1.18.6...v1.18.7) (2021-10-07)

### Bug Fixes

- **list:** use flexbox ([2c34f09](https://github.com/baloise/design-system/commit/2c34f09033fa2f8b4c9b2790c9209b225240f668))

## [1.18.6](https://github.com/baloise/design-system/compare/v1.18.5...v1.18.6) (2021-10-05)

### Bug Fixes

- **modal:** add card class on user element ([8515746](https://github.com/baloise/design-system/commit/8515746fb0efc68ef029c86f6e5963e0b8e68fd5))

## [1.18.3](https://github.com/baloise/design-system/compare/v1.18.2...v1.18.3) (2021-10-05)

### Bug Fixes

- add fixed sub package versions ([0ab2c03](https://github.com/baloise/design-system/commit/0ab2c03904b732d227fdd1345d2088b9b3a978aa))

## [1.18.2](https://github.com/baloise/design-system/compare/v1.18.1...v1.18.2) (2021-10-05)

### Bug Fixes

- add fixed sub package versions ([da41daf](https://github.com/baloise/design-system/commit/da41dafe664826ffc98c33f74c5625399d388a63))

# [1.18.0](https://github.com/baloise/design-system/compare/v1.17.0...v1.18.0) (2021-10-05)

### Bug Fixes

- **card:** adjust primary color ([da530b7](https://github.com/baloise/design-system/commit/da530b707e5833cbd9546339e787bebf9913183f))
- **datepicker:** limit month & year select when using min and max ([d06fd72](https://github.com/baloise/design-system/commit/d06fd7239856bb4e559fc338267507157465a16b))
- **notification:** adjust padding and link colors ([da48a01](https://github.com/baloise/design-system/commit/da48a010967d9bc151e09513f1aaca7836bb9a1c))

### Features

- **modal:** add mobile solution and fix custom width ([3308957](https://github.com/baloise/design-system/commit/3308957eb7971382904fc8fa58fa5ae05848ea5e))
- **modal:** add mobile view ([0fb0d27](https://github.com/baloise/design-system/commit/0fb0d277bb7213ec29e3855b22f917a2abcca4ea))
- **stepper:** add stepper template ([4b02cae](https://github.com/baloise/design-system/commit/4b02cae763b40fc8f31d3d15f58abb8caf85fffe))

# [1.17.0](https://github.com/baloise/design-system/compare/v1.16.2...v1.17.0) (2021-10-01)

### Bug Fixes

- **card:** adjust spacing ([2b7c745](https://github.com/baloise/design-system/commit/2b7c7459897cb080ccd884183928eb5cfe80a30d))
- **container:** adjust container to new paddings ([d033195](https://github.com/baloise/design-system/commit/d0331959c6de4a7eb53d95f6bfec8582bd36afc6))
- **select:** fix arrow key navigation on focus ([fd77ff4](https://github.com/baloise/design-system/commit/fd77ff4e7485981f29f12b37f1cba9f144d72b0a))
- **tabs:** adjust disabled style ([3813bf7](https://github.com/baloise/design-system/commit/3813bf7d7b942fc4e0f4f2b2de68efe12c0f1428))
- **testing:** fix cy.url().should() ([156d9b4](https://github.com/baloise/design-system/commit/156d9b4d7c38337e6ac5820fa292c527a27e6a14))

### Features

- **button:** add button group helper css class ([a03dcf3](https://github.com/baloise/design-system/commit/a03dcf3a201dd0cc8c851dbca274adfe6e000780))

## [1.16.2](https://github.com/baloise/design-system/compare/v1.16.1...v1.16.2) (2021-09-29)

# 1.16.0 (2021-09-29)

**Note:** Version bump only for package root

## [1.16.1](https://github.com/baloise/design-system/compare/v1.16.0...v1.16.1) (2021-09-29)

**Note:** Version bump only for package root

# [1.16.0](https://github.com/baloise/design-system/compare/v1.15.1...v1.16.0) (2021-09-29)

### Bug Fixes

- **button:** fix loading state with icons ([5d31e89](https://github.com/baloise/design-system/commit/5d31e892fbdb7de6a00b12c45c9cf47ffff3c8a3))
- **modal:** adjust paddings ([d13e24b](https://github.com/baloise/design-system/commit/d13e24b55ccce34773ff7805909ecb068d54e509))
- **radio:** remove debugger statement ([c555113](https://github.com/baloise/design-system/commit/c5551135792e1fe76844c4676b2360b1fc19c011))
- **select:** improve clear and key navigation ([e77479d](https://github.com/baloise/design-system/commit/e77479df925bff61bc39e224309c0a2c95564512))
- **select:** improve disabled look ([069b80d](https://github.com/baloise/design-system/commit/069b80d7c6552349922814f65f376c609fae75be))
- **select:** open dropdown with arrow keys ([f1621dd](https://github.com/baloise/design-system/commit/f1621ddd71651ce8d25e4ac9f1f02b2142201960))

### Features

- **file-upload:** add clear method ([ffcaa84](https://github.com/baloise/design-system/commit/ffcaa84f3b7ec49414a709dc50b5111287b0cbde))
- **filters:** add police number filter ([912e74b](https://github.com/baloise/design-system/commit/912e74b2ac29194e05fa54dc54bc6199a8ed3b26))

## [1.15.1](https://github.com/baloise/design-system/compare/v1.15.0...v1.15.1) (2021-09-22)

### Bug Fixes

- **dropdown:** remove possible border-bottom effect ([fad665e](https://github.com/baloise/design-system/commit/fad665e13fffa1dd311f39decaeae27ed3fd2bcd))

## 1.14.5 (2021-09-13)

# [1.15.0](https://github.com/baloise/design-system/compare/v1.14.5...v1.15.0) (2021-09-20)

### Bug Fixes

- **radio, checkbox:** improve reaction time

### Features

- **modal:** add modal service for angular
- **app:** introduce app component
- **toast, snackbar:** improve services and add duplication support
- **react:** add react proxy library

## [1.14.5](https://github.com/baloise/design-system/compare/v1.14.4...v1.14.5) (2021-09-13)

### Bug Fixes

- **testing:** add label support for checkbox & radio ([47c1dbe](https://github.com/baloise/design-system/commit/47c1dbee1359ec3ee59e60cd85489a2ca9bcaab6))

## [1.14.4](https://github.com/baloise/design-system/compare/v1.14.3...v1.14.4) (2021-09-13)

### Bug Fixes

- **angular:** use event.detail instead of event.target.value ([4709780](https://github.com/baloise/design-system/commit/47097800fc799de3d0c30a43e1a731836d9ed046))

## [1.14.3](https://github.com/baloise/design-system/compare/v1.14.2...v1.14.3) (2021-09-10)

### Bug Fixes

- **testing:** look for label instead of input for radio & checkbox ([9c26641](https://github.com/baloise/design-system/commit/9c2664126e1a2e0e0f159755bb1d95d0ac1dfdb3))

## [1.14.2](https://github.com/baloise/design-system/compare/v1.14.1...v1.14.2) (2021-09-10)

### Bug Fixes

- **testing:** add and command ([acddfb4](https://github.com/baloise/design-system/commit/acddfb4e83b4c180aca08cb848e21528ea6d644a))

## [1.14.1](https://github.com/baloise/design-system/compare/v1.14.0...v1.14.1) (2021-09-09)

### Bug Fixes

- **radio:** improve change emitting for faster reaction time ([3e3e6df](https://github.com/baloise/design-system/commit/3e3e6df3d4c6ba23f9637ef732dcb9e0c1e37d9d))
- **table:** alignt text to center for buttons ([b561840](https://github.com/baloise/design-system/commit/b561840c94fd63b82a3a272abcff67c182a72351))
- **table:** improve deliverments ([6999a48](https://github.com/baloise/design-system/commit/6999a48130876fd583e9657e12dd89226855b916))
- **testing:** remove console log ([e68c022](https://github.com/baloise/design-system/commit/e68c0224605d95eca2871441b45ba0840217da24))
- **toast&snackbar:** fix glitches when leaving the dom ([de9fd0e](https://github.com/baloise/design-system/commit/de9fd0e35430558041ff50e143c51cad3d567142))

# [1.14.0](https://github.com/baloise/design-system/compare/v1.13.3...v1.14.0) (2021-09-08)

### Bug Fixes

- **pagination:** reduce number of pages of mobile devices ([33959ec](https://github.com/baloise/design-system/commit/33959ec6c22d190397caabdbdd05f488182c5736))
- **table:** resolve deps ([00d98a8](https://github.com/baloise/design-system/commit/00d98a896a6961a0e7b3e8f6e82e3ba736421909))
- **tabs:** only fire tab change event ones ([3a15e4f](https://github.com/baloise/design-system/commit/3a15e4fe937d559c50cd45c83c1408891a53e64d))

### Features

- **testing:** add and override commands for accordion, button, datepicker and checkbox ([a80a5f6](https://github.com/baloise/design-system/commit/a80a5f603e7083500bc6a9d3aaf47d3fc3207deb))
- **testing:** add or override cypress commands for dropdown, input, modal, radio, select, tabs and toast ([e088819](https://github.com/baloise/design-system/commit/e088819b946bd5147825a6907bc64861becb2f9c))
- **testing:** add support for hint, pagination, slider and snackbar ([13f882c](https://github.com/baloise/design-system/commit/13f882c609abc108f014d1cefaa2befe95147022))
- **testing:** remove mixins and accessors ([8684a68](https://github.com/baloise/design-system/commit/8684a68c6bec275c07b2f810ad93c364bde7df97))

## [1.13.1](https://github.com/baloise/design-system/compare/v1.12.3...v1.13.1) (2021-09-06)

### Bug Fixes

- **text:** add word break ([28260a7](https://github.com/baloise/design-system/commit/28260a7cd71003c50cdd5b1d66b89210032da58c))

## [1.12.3](https://github.com/baloise/design-system/compare/v1.11.1...v1.12.3) (2021-09-01)

### Bug Fixes

- **testing:** improve select of radios ([ee64a27](https://github.com/baloise/design-system/commit/ee64a2756a1c513be38eaf81fc25312fadfa046e))

### Features

- **testing:** improve select accessor ([5b5a632](https://github.com/baloise/design-system/commit/5b5a6325c2e69b94c0740255073602848897d6e4))

## [1.13.3](https://github.com/baloise/design-system/compare/v1.13.2...v1.13.3) (2021-09-06)

### Bug Fixes

- **card:** don't break words ([0f5d2bf](https://github.com/baloise/design-system/commit/0f5d2bfe1ebb3b1cd2623439f761e86ac88062b7))

## [1.13.2](https://github.com/baloise/design-system/compare/v1.13.1...v1.13.2) (2021-09-06)

### Bug Fixes

- **table:** resolve deps ([00d98a8](https://github.com/baloise/design-system/commit/00d98a896a6961a0e7b3e8f6e82e3ba736421909))

## [1.13.1](https://github.com/baloise/design-system/compare/v1.13.0...v1.13.1) (2021-09-06)

### Bug Fixes

- **angular:** listens for the first given error ([67bd4c4](https://github.com/baloise/design-system/commit/67bd4c491e0e2425df218903caa19b626e34d615))
- only format value if number input is active ([23ba116](https://github.com/baloise/design-system/commit/23ba11659e3d6da588881a03cd53352765f8c659))
- update stencil to version 2.8.0 ([0f80d25](https://github.com/baloise/design-system/commit/0f80d257543619de4e83081cba95b49f55e0581e))

# [1.13.0](https://github.com/baloise/design-system/compare/v1.12.5...v1.13.0) (2021-09-03)

### Features

- **angular:** add bal-ng-error ([7f41482](https://github.com/baloise/design-system/commit/7f4148242640d54fc3ec0b33a39b83a43592492b))

## [1.12.4](https://github.com/baloise/design-system/compare/v1.12.3...v1.12.4) (2021-09-02)

### Bug Fixes

- **input:** enable normal input again ([1a29327](https://github.com/baloise/design-system/commit/1a29327d9f0eeeb707cae61863f63a6aca50a117))

## [1.12.3](https://github.com/baloise/design-system/compare/v1.12.2...v1.12.3) (2021-09-01)

### Bug Fixes

- **vue:** use detail instead of value from the change event ([f979fe9](https://github.com/baloise/design-system/commit/f979fe90acbfbc8abbf6071814647b0195f65d6a))

## [1.12.2](https://github.com/baloise/design-system/compare/v1.12.1...v1.12.2) (2021-09-01)

### Bug Fixes

- **vue:** use detail instead of value from the change event ([5e3c70c](https://github.com/baloise/design-system/commit/5e3c70c09d3fb1d58eb32865ae5ffd5e39cdf5ce))

## [1.12.1](https://github.com/baloise/design-system/compare/v1.12.0...v1.12.1) (2021-09-01)

### Bug Fixes

- **vue:** adjust types of the props ([41f29b1](https://github.com/baloise/design-system/commit/41f29b1175a5da6fc4f67f02e0e602b7ad4b64ec))

# [1.12.0](https://github.com/baloise/design-system/compare/v1.11.3...v1.12.0) (2021-08-31)

### Features

- **input:** add number-input with decimal ([ab473de](https://github.com/baloise/design-system/commit/ab473deacb867ffd44f23e76b0ed6f9400d5072e))

## [1.11.1](https://github.com/baloise/design-system/compare/v1.10.0...v1.11.1) (2021-08-23)

### Features

- **input:** add logic for checking if number entered is valid and add decimal property for number formating ([01818a7](https://github.com/baloise/design-system/commit/01818a7a862664b3733b597cd13569989aeb487a))

# [1.10.0](https://github.com/baloise/design-system/compare/v1.9.0...v1.10.0) (2021-08-16)

### Bug Fixes

- **input:** enable clipboard content ([4d4032e](https://github.com/baloise/design-system/commit/4d4032e15d457f67e9f404375dc767ca6bf58907))

### Features

- **table:** update ag-grid usage ([f083875](https://github.com/baloise/design-system/commit/f0838754edc5d8a907b1bec0fdf8b503e16e674d))

# [1.9.0](https://github.com/baloise/design-system/compare/v1.8.2...v1.9.0) (2021-08-12)

### Bug Fixes

- **datepicker:** fix fullwidth ([cddd3f2](https://github.com/baloise/design-system/commit/cddd3f2a459e7fb428096bda7b61586a29eda986))
- **input:** fix autofocus and add directives for angular and vue ([ef76dcf](https://github.com/baloise/design-system/commit/ef76dcf9b4ff160b3a38f2148081233407964b53))
- **select:** fix fullwidth ([9cf060a](https://github.com/baloise/design-system/commit/9cf060a6cbf269fa7e03f55d56d87497dcabe126))

### Features

- **testing:** add andable.ts and attachable.ts mixin description ([e918b8a](https://github.com/baloise/design-system/commit/e918b8a2db1e19b7eadd2e42deff697040b83e7d))

## [1.8.2](https://github.com/baloise/design-system/compare/v1.8.1...v1.8.2) (2021-08-06)

### Bug Fixes

- **table:** make styles accessable for angular & vue applications ([f5b5de5](https://github.com/baloise/design-system/commit/f5b5de5b9061bd600bf0ad5b9783b825b7b38c1c))

## 1.8.1 (2021-08-05)

## [1.11.3](https://github.com/baloise/design-system/compare/v1.11.2...v1.11.3) (2021-08-27)

### Bug Fixes

- **angular:** use .detail instead of .target.value ([4496cdd](https://github.com/baloise/design-system/commit/4496cdd2a06789eb430dbce1b96390644741352a))

## 1.11.1 (2021-08-23)

## [1.11.2](https://github.com/baloise/design-system/compare/v1.11.1...v1.11.2) (2021-08-27)

### Bug Fixes

- **angular:** use .detail instead of .target.value ([4496cdd](https://github.com/baloise/design-system/commit/4496cdd2a06789eb430dbce1b96390644741352a))

## [1.11.1](https://github.com/baloise/design-system/compare/v1.11.0...v1.11.1) (2021-08-23)

### Bug Fixes

- resolve packages ([2c14a4b](https://github.com/baloise/design-system/commit/2c14a4b0d3068661309f5c442c93f9e4a19b5751))
- **table:** center text of the button ([95945a3](https://github.com/baloise/design-system/commit/95945a39b330a7cb4fcd22b5dd42fad9b1c21e8c))

# [1.11.0](https://github.com/baloise/design-system/compare/v1.10.0...v1.11.0) (2021-08-23)

### Bug Fixes

- **checkbox:** remplace rem with pixel ([2095880](https://github.com/baloise/design-system/commit/20958801cf871f6082649fbdbc4adb8bd346acde))
- **input:** enable clipboard content ([4d4032e](https://github.com/baloise/design-system/commit/4d4032e15d457f67e9f404375dc767ca6bf58907))
- **select:** listen for attribute and text content changes ([9a517e0](https://github.com/baloise/design-system/commit/9a517e0ed6c8bdb05db6dca4fcbcbd55ec4aa7e5))
- **styles:** remove old client lib variables ([9413e38](https://github.com/baloise/design-system/commit/9413e38f5ff44d911eabab7f400f3c838db8d6cb))

### Features

- **components:** update deps ([f650c2b](https://github.com/baloise/design-system/commit/f650c2bf2773a1954dc9f5d99689faac6af0f313))
- **select:** add single value ([b5b536c](https://github.com/baloise/design-system/commit/b5b536ccd62122663b838fa8411a7ca386760922))
- **table:** introduce new table package ([0540144](https://github.com/baloise/design-system/commit/05401440fad284092ecb0220c567ab22eda003b4))
- **table:** update ag-grid usage ([f083875](https://github.com/baloise/design-system/commit/f0838754edc5d8a907b1bec0fdf8b503e16e674d))
- **vue:** rename function validators to rules ([9bad019](https://github.com/baloise/design-system/commit/9bad019a4a02dbf354b799060d454f1729328d45))
- **vue:** update deps ([9323c8d](https://github.com/baloise/design-system/commit/9323c8dd8ecf82126f97d412669756d2c2203b7d))

# [1.9.0](https://github.com/baloise/design-system/compare/v1.8.2...v1.9.0) (2021-08-12)

### Bug Fixes

- **datepicker:** fix fullwidth ([cddd3f2](https://github.com/baloise/design-system/commit/cddd3f2a459e7fb428096bda7b61586a29eda986))
- **input:** fix autofocus and add directives for angular and vue ([ef76dcf](https://github.com/baloise/design-system/commit/ef76dcf9b4ff160b3a38f2148081233407964b53))
- **select:** fix fullwidth ([9cf060a](https://github.com/baloise/design-system/commit/9cf060a6cbf269fa7e03f55d56d87497dcabe126))

### Features

- **testing:** add andable.ts and attachable.ts mixin description ([e918b8a](https://github.com/baloise/design-system/commit/e918b8a2db1e19b7eadd2e42deff697040b83e7d))

## [1.8.2](https://github.com/baloise/design-system/compare/v1.8.1...v1.8.2) (2021-08-06)

### Bug Fixes

- **table:** make styles accessable for angular & vue applications ([f5b5de5](https://github.com/baloise/design-system/commit/f5b5de5b9061bd600bf0ad5b9783b825b7b38c1c))

## 1.8.1 (2021-08-05)

# [1.10.0](https://github.com/baloise/design-system/compare/v1.9.0...v1.10.0) (2021-08-16)

### Bug Fixes

- **datepicker:** fix fullwidth ([cddd3f2](https://github.com/baloise/design-system/commit/cddd3f2a459e7fb428096bda7b61586a29eda986))
- **input:** enable clipboard content ([4d4032e](https://github.com/baloise/design-system/commit/4d4032e15d457f67e9f404375dc767ca6bf58907))
- **input:** fix autofocus and add directives for angular and vue ([ef76dcf](https://github.com/baloise/design-system/commit/ef76dcf9b4ff160b3a38f2148081233407964b53))
- **select:** fix fullwidth ([9cf060a](https://github.com/baloise/design-system/commit/9cf060a6cbf269fa7e03f55d56d87497dcabe126))
- **table:** make styles accessable for angular & vue applications ([f5b5de5](https://github.com/baloise/design-system/commit/f5b5de5b9061bd600bf0ad5b9783b825b7b38c1c))

### Features

- **table:** update ag-grid usage ([f083875](https://github.com/baloise/design-system/commit/f0838754edc5d8a907b1bec0fdf8b503e16e674d))

# [1.9.0](https://github.com/baloise/design-system/compare/v1.8.2...v1.9.0) (2021-08-12)

### Features

- **testing:** add andable.ts and attachable.ts mixin description ([e918b8a](https://github.com/baloise/design-system/commit/e918b8a2db1e19b7eadd2e42deff697040b83e7d))

## [1.8.2](https://github.com/baloise/design-system/compare/v1.8.1...v1.8.2) (2021-08-06)

### Bug Fixes

- **table:** make styles accessable for angular & vue applications ([f5b5de5](https://github.com/baloise/design-system/commit/f5b5de5b9061bd600bf0ad5b9783b825b7b38c1c))

## [1.3.1](https://github.com/baloise/design-system/compare/v1.3.0...v1.3.1) (2021-06-21)

### Bug Fixes

- **radio:** add disabled to radio-group ([5d783b3](https://github.com/baloise/design-system/commit/5d783b3126c1e41b1e12ecf283f6a62ccbc4c51e))

# [1.3.0](https://github.com/baloise/design-system/compare/v1.2.3...v1.3.0) (2021-06-16)

### Features

- **footer:** add new footer component ([2d4cb02](https://github.com/baloise/design-system/commit/2d4cb02391c2fb4ff741cd83852e2a94fea03fdb))
- **hint:** auto detects the placement ([e83fdd3](https://github.com/baloise/design-system/commit/e83fdd3afbdb73ad427c82478fb96fa6faf914e6))
- **slider:** add new form component range slider ([7b89138](https://github.com/baloise/design-system/commit/7b89138bfea2d4f5a763eeb6c36f16fb75394708))

## [1.8.1](https://github.com/baloise/design-system/compare/v1.8.0...v1.8.1) (2021-08-05)

### Bug Fixes

- **data:** add missing disable state for the edit button ([44e2682](https://github.com/baloise/design-system/commit/44e26823ad6d0fb6cf0010e605740698bc60acc5))
- **select:** remove old unused attribute searchInput ([d03c1a8](https://github.com/baloise/design-system/commit/d03c1a85ec7177ea555b09e331ea1d16a99d9765))

# [1.8.0](https://github.com/baloise/design-system/compare/v1.7.1...v1.8.0) (2021-08-02)

### Features

- **heading:** add new space attribute ([f07459d](https://github.com/baloise/design-system/commit/f07459d86c085c99caf6d3d79abb6994d216cef5))

# 1.4.0 (2021-06-23)

**Note:** Version bump only for package root

# [1.7.0](https://github.com/baloise/design-system/compare/v1.6.3...v1.7.0) (2021-07-30)

### Features

- **text:** add new hint color ([3320708](https://github.com/baloise/design-system/commit/3320708723f1e6b733ffbf34e8ebf85cbeb883e9))

## [1.6.3](https://github.com/baloise/design-system/compare/v1.6.2...v1.6.3) (2021-07-30)

### Bug Fixes

- **select:** getValues returns now always an array ([89fd89e](https://github.com/baloise/design-system/commit/89fd89e1f9280ef4450b03e6eed92b5956c1b8d1))
- **validators:** empty values will not get validate unless isRequired is set ([a85a248](https://github.com/baloise/design-system/commit/a85a24882ce7698330e129290d06951c159b9182))
- **vue:** improve rules condition for raised error messages ([cfcfead](https://github.com/baloise/design-system/commit/cfcfead53a88882be3c990adcb47d34f4e178b6f))

## [1.6.2](https://github.com/baloise/design-system/compare/v1.6.1...v1.6.2) (2021-07-29)

### Bug Fixes

- **text:** fix bold style ([5de5051](https://github.com/baloise/design-system/commit/5de5051fde24b378e6edcf6670d33d84fada31a5))

## [1.6.1](https://github.com/baloise/design-system/compare/v1.6.0...v1.6.1) (2021-07-28)

### Bug Fixes

- [#314](https://github.com/baloise/design-system/issues/314), bal-file-upload: clear state of html input file on change to fix the bug, emit change event only if list of files changed - not if rejection happened ([8529906](https://github.com/baloise/design-system/commit/85299063395ae3ddc3237b68839609ee1cff3798))

# [1.6.0](https://github.com/baloise/design-system/compare/v1.5.0...v1.6.0) (2021-07-26)

### Bug Fixes

- change modal background and field height ([eb87f1b](https://github.com/baloise/design-system/commit/eb87f1b639d61028c4712a9229b828358d0896d3))
- **dropdown:** only open menu when there is enough space on top ([6edc40b](https://github.com/baloise/design-system/commit/6edc40bec8a1de460a4b1ef01c45c5d3af397ea8))
- **field:** change min height if label is given or not ([1d1fc2e](https://github.com/baloise/design-system/commit/1d1fc2e6dc849dba0186b7ee2c7342a8e949d22d))

### Features

- **field:** add button addons ([1201eed](https://github.com/baloise/design-system/commit/1201eeda219335db91231b333a52f496b5f1a443))
- **input:** add suffix attribute ([121e585](https://github.com/baloise/design-system/commit/121e585f7ec94b22988fe1c87f85eaf85c21ae15))

# [1.5.0](https://github.com/baloise/design-system/compare/v1.4.1...v1.5.0) (2021-07-22)

### Bug Fixes

- **text:** fix swap slot elements. closes [#303](https://github.com/baloise/design-system/issues/303) ([7cd266b](https://github.com/baloise/design-system/commit/7cd266b4c7c94bf875da03ed492d127e962bc5f3))
- **vue:** change return type of ValidatorFn to string and boolean. closes [#306](https://github.com/baloise/design-system/issues/306) ([52e2b2b](https://github.com/baloise/design-system/commit/52e2b2bcbdf2287b459eaca26d0b92b8d83b9403))

### Features

- **select:** add disabled attribute to the options. closes [#306](https://github.com/baloise/design-system/issues/306) ([c7b38eb](https://github.com/baloise/design-system/commit/c7b38eb06ac8c4d59b4c60651d040189dfee765c))

# [1.4.0](https://github.com/baloise/design-system/compare/v1.3.2...v1.4.0) (2021-06-23)

### Features

- **select:** add prop to turn off the movement ([7c6c495](https://github.com/baloise/design-system/commit/7c6c495424cb37371d4f8ca72a3bc7c00dbce6c8))
- **select:** add prop to turn off the movement ([abe717d](https://github.com/baloise/design-system/commit/abe717d8f1e15074cd44652c5d81617e70a67bcb))

## [1.3.2](https://github.com/baloise/design-system/compare/v1.3.1...v1.3.2) (2021-06-22)

### Bug Fixes

- **radio:** add disabled to radio-group ([5d783b3](https://github.com/baloise/design-system/commit/5d783b3126c1e41b1e12ecf283f6a62ccbc4c51e))

## [1.3.1](https://github.com/baloise/design-system/compare/v1.3.0...v1.3.1) (2021-06-21)

### Bug Fixes

- **slider:** add two-way binding ([a5f948d](https://github.com/baloise/design-system/commit/a5f948d36ba6db75cdc52c4a23de317d1d9ead8d))

# [1.3.0](https://github.com/baloise/design-system/compare/v1.2.3...v1.3.0) (2021-06-16)

### Features

- **footer:** add new footer component ([2d4cb02](https://github.com/baloise/design-system/commit/2d4cb02391c2fb4ff741cd83852e2a94fea03fdb))
- **hint:** auto detects the placement ([e83fdd3](https://github.com/baloise/design-system/commit/e83fdd3afbdb73ad427c82478fb96fa6faf914e6))
- **slider:** add new form component range slider ([7b89138](https://github.com/baloise/design-system/commit/7b89138bfea2d4f5a763eeb6c36f16fb75394708))

## [1.2.1](https://github.com/baloise/design-system/compare/v1.2.0...v1.2.1) (2021-06-09)

### Bug Fixes

- **text:** add bold style ([550d7a2](https://github.com/baloise/design-system/commit/550d7a22a1eb553910ca05a0337488e5fa074c0e))

# [1.2.0](https://github.com/baloise/design-system/compare/v1.1.1...v1.2.0) (2021-06-09)

### Features

- **data:** add edit feature ([d05fdae](https://github.com/baloise/design-system/commit/d05fdae977fe90fe0fbcb1ec1de06d385cf08c75))

## [1.1.1](https://github.com/baloise/design-system/compare/v1.1.0...v1.1.1) (2021-06-03)

### Bug Fixes

- **select:** change empty initial value to empty string ([793c9f4](https://github.com/baloise/design-system/commit/793c9f4fe9a10b964f0d7a2d61cc96219f635a98))

# [1.1.0](https://github.com/baloise/design-system/compare/v1.0.2...v1.1.0) (2021-06-02)

### Bug Fixes

- fix checkbox and radio label handling ([c20eba8](https://github.com/baloise/design-system/commit/c20eba824fa3941d30e61e3214956faac017b227))

### Features

- **table:** add new table component with ag-grid ([6c8d5bf](https://github.com/baloise/design-system/commit/6c8d5bfff372dc320ec58d6231e0dabe0a3e17b9))
- **tabs:** add new style o-steps ([0fb6fe4](https://github.com/baloise/design-system/commit/0fb6fe4e051c1de72257a0146651524a677233a7))

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
  - follow the new style [instalation guide](https://design.baloise.dev/components/getting-started/vue/styles.html)
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

