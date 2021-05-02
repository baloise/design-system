# bal-accordion

<!-- START: human documentation top -->

An accordion hides secondary content and requires user interaction to display the content.

<!-- END: human documentation top -->

## Basic

<ClientOnly>  <docs-demo-bal-accordion-0></docs-demo-bal-accordion-0></ClientOnly>

```html
<bal-accordion class="box" open-label="Details einblenden" close-label="Details ausblenden" data-test-id="accordion">
  <p class="has-padding">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</bal-accordion>
```

## Colors

The accordion has 2 colors of themes `is-info` and `is-primary`.

<ClientOnly>  <docs-demo-bal-accordion-1></docs-demo-bal-accordion-1></ClientOnly>

```html
<bal-accordion class="box" color="info" open-label="Details einblenden" close-label="Details ausblenden">
  <p class="has-padding">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</bal-accordion>
```

## Open accordion

<ClientOnly>  <docs-demo-bal-accordion-2></docs-demo-bal-accordion-2></ClientOnly>

```html
<bal-accordion class="box" collapsed="false" open-label="Details einblenden" close-label="Details ausblenden">
  <p class="has-padding">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</bal-accordion>
```

## Trigger label & icon

Use the properties `open-label` & `open-icon` to change the content of the trigger button.

<ClientOnly>  <docs-demo-bal-accordion-3></docs-demo-bal-accordion-3></ClientOnly>

```html
<bal-accordion class="box" open-icon="edit" open-label="Bearbeiten" close-label="Schliessen" close-icon="close">
  <p class="has-padding">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</bal-accordion>
```


## API

### bal-accordion

#### Properties

| Attribute       | Description                                             | Type                 | Default     |
| :-------------- | :------------------------------------------------------ | :------------------- | :---------- |
| **card**        | If `true` the accordion is used on the bottom of a card | `boolean`            | `false`     |
| **close-icon**  | Bal-Icon of the close trigger button                    | `string`             | `'minus'`   |
| **close-label** | Label of the close trigger button                       | `string`             | `''`        |
| **color**       | Type defines the theme of the accordion toggle          | `"info" , "primary"` | `'primary'` |
| **is-active**   | Controls if the accordion is collapsed or not           | `boolean`            | `false`     |
| **open-icon**   | Bal-Icon of the open trigger button                     | `string`             | `'plus'`    |
| **open-label**  | Label of the open trigger button                        | `string`             | `''`        |

#### Events

| Event           | Description                            | Type      |
| :-------------- | :------------------------------------- | :-------- |
| **balCollapse** | Emmited when the accordion has changed | `boolean` |

#### Methods

| Method       | Description            | Signature                   |
| :----------- | :--------------------- | :-------------------------- |
| **`close`**  | Close the accordion    | `close() => Promise<void>`  |
| **`open`**   | Open the accordion     | `open() => Promise<void>`   |
| **`toggle`** | Triggers the accordion | `toggle() => Promise<void>` |

## Testing

### AccordionAccessor

AccordionAccessor is a helper object for E-2-E testing.
It maps the accordion behaviour to the `bal-accordion` ui component.

```typescript
import { dataTestSelector, AccordionAccessor } from '@baloise/ui-library-testing'

describe('Accordion', () => {
  it('should ...', () => {
     const accordion = AccordionAccessor(dataTestSelector('accordion-id')).get()
     accordion.click()
     accordion.assertBodyExists()
     accordion.contains('Label')
 })
})
```

#### Methods

| Method                     | Description                                                                                                        | Arguments                                                |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| **click**                  | Toggle the accordion                                                                                               | `options?: Partial<Cypress.ClickOptions>`                |
| **contains**               | It checks that the accordion label contains the given texts                                                        | `content: string`                                        |
| **assertBodyExists**       | Asserts that accordion is open                                                                                     |                                                          |
| **assertBodyNotExists**    | Asserts that accordion is closed                                                                                   |                                                          |
| **click**                  | Triggers a clicks on the element                                                                                   | `options?: Partial<Cypress.ClickOptions>`                |
| **clickNth**               | Triggers n times a click on the element                                                                            | `index: number, options?: Partial<Cypress.ClickOptions>` |
| **assertExists**           | Asserts that the element exists in the DOM                                                                         |                                                          |
| **assertNotExists**        | Asserts that the element does not exist in the DOM                                                                 |                                                          |
| **should**                 | Creates an assertion. Find more information here [link](https://docs.cypress.io/api/commands/should.html#Syntax)   | `chainers: string, attribute?: string, content?: string` |
| **assertVisible**          | Assert that the component is visible for the user                                                                  |                                                          |
| **assertNotVisible**       | Assert that the component is not visible for the user                                                              |                                                          |
| **selectNth**              | Selects the option at the given index                                                                              | `index: number`                                          |
| **assertAttributeEquals**  | Asserting that the element has the attribute and the value.                                                        | `attribute: string, value: string`                       |
| **assertAttributeInclude** | Asserting that the element has the attribute and include the value.                                                | `attribute: string, value: string`                       |
| **assertFullUrl**          | Asserting if given url argument matches the url of the browser.                                                    | `url: string`                                            |
| **assertPartUrl**          | Asserting if the browser url contains the given url argument.                                                      | `url: string`                                            |
| **wait**                   | Wait for a number of milliseconds or wait for an aliased resource to resolve before moving on to the next command. | `time: number`                                           |

<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-accordion.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-accordion)
* [Accessor on Github](https://github.com/baloise/ui-library/blob/master/packages/testing/src/accessors/accordion.accessor.ts)
