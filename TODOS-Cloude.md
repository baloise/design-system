# TODO's for Claude

## Checklist for linting stencil components

1. Add component head comment

- Add to each component the lead text, shouls start with the component name.
- list all slots and describ them simply
- list all parts and describ them simply

**Example**

```ts
/**
 * Accordion displays collapsible content sections with open/close toggle buttons and optional animations.
 * Perfect for organizing large amounts of content into logical, expandable groups.
 *
 * @slot content - The content slot defines the collapsible content of the accordion, which is hidden by default and becomes visible when the accordion is opened.
 * @slot summary - The summary slot defines the summary of the accordion, which is always visible and serves as the toggle button to open or close the accordion.
 * @part accordion - The accordion container element.
 * @part header - The header element that contains the summary and marker.
 * @part summary - The summary element that serves as the toggle button.
 * @part marker - The marker element that indicates the open/close state of the accordion.
 * @part content - The content element that contains the collapsible content of the accordion.
 */
@Component({
  tag: 'ds-accordion',
  styleUrl: 'accordion.host.scss',
  shadow: true,
})
```

2. Describe css variables

- list all css variables and add a simple description

```css
/**
  * Variables
  * --------------------------------
  * Define here the css variables for the component to be able to use it in host or non-host mode
  * These variables can be used in the component styles below and later on be overridden in themes.
  *
  * @prop --accordion-marker-size: Size of the expand/collapse marker icon.
  * @prop --accordion-summary-color: Text color of the summary label.
  * @prop --accordion-summary-family: Font family of the summary label.
  * @prop --accordion-summary-weight: Font weight of the summary label.
  * @prop --accordion-summary-line-height: Line height of the summary label.
  * @prop --accordion-summary-size: Responsive font size of the summary label.
  * @prop --accordion-summary-color-hover: Summary text color on hover.
  * @prop --accordion-summary-color-active: Summary text color when pressed.
  * @prop --accordion-radius-base: Border radius used for the focus ring outline.
 */

:host {
  @include vars.focus(accordion);
  @include vars.local(accordion-marker-size, 1rem);

  @include vars.local(accordion-summary-color, var(--ds-accordion-summary-color-base));
  @include vars.local(accordion-summary-family, var(--ds-accordion-summary-family));
  @include vars.local(accordion-summary-weight, var(--ds-accordion-summary-weight));
  @include vars.local(accordion-summary-line-height, var(--ds-accordion-summary-line-height));
  @include vars.local(accordion-summary-size, var(--ds-accordion-summary-size-device));
  @include vars.local(accordion-summary-color-hover, var(--ds-accordion-summary-color-hover));
  @include vars.local(accordion-summary-color-active, var(--ds-accordion-summary-color-active));
  @include vars.local(accordion-radius-base, var(--ds-accordion-radius-base));
}
```

| Component                              | Done |
| -------------------------------------- | ---- |
| accordion                              | ✅   |
| button                                 | ✅   |
| badge                                  | ✅   |
| heading                                | ✅   |
| text                                   | ✅   |
| label                                  | ✅   |
| link                                   | ~    |
| stack                                  | ✅   |
| divider                                | ✅   |
| tag                                    | ✅   |
| notification                           | ✅   |
| card                                   | ✅   |
| list                                   | ✅   |
| icon                                   | ✅   |
| spinner                                | ✅   |
| logo                                   | ✅   |
| close                                  | ✅   |
| alert/toast                            | ✅   |
| alert/snackbar                         | ✅   |
| input                                  | ✅   |
| textarea                               | ✅   |
| radio                                  | ✅   |
| checkbox                               | ✅   |
| segment/segment + segment/segment-item | ✅   |
| app                                    | ✅   |
| number-input                           | ✅   |
| progress-bar                           | ✅   |
| pagination                             | ✅   |
| content                                | ✅   |
| shape                                  | ✅   |
| toggle                                 | ✅   |
