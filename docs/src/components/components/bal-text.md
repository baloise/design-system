# bal-text

A text provides some additional helpers.

<!-- START: human documentation top -->

A text provides some additional helpers.

<!-- END: human documentation top -->

## Basic

<ClientOnly>  <docs-demo-bal-text-97></docs-demo-bal-text-97></ClientOnly>


## Small

<ClientOnly>  <docs-demo-bal-text-98></docs-demo-bal-text-98></ClientOnly>


## Colors

<ClientOnly>  <docs-demo-bal-text-99></docs-demo-bal-text-99></ClientOnly>



## API

### bal-text

#### Properties

| Attribute | Description                                                    | Type                                                         | Default |
| :-------- | :------------------------------------------------------------- | :----------------------------------------------------------- | :------ |
| **color** | The theme type of the toast. Given by bulma our css framework. | `"" , "danger" , "info" , "primary" , "success" , "warning"` | `''`    |
| **small** | If `true` the text has a small size                            | `boolean`                                                    | `false` |

## Testing

### TextAccessor

TextAccessor is a helper object for E-2-E testing.
It maps the text behaviour to the `bal-text` ui component.

```typescript
import { dataTestSelector, TextAccessor } from '@baloise/design-system-components-testing'

describe('Text', () => {
  it('should ...', () => {
     const text = TextAccessor(dataTestSelector('text-id')).get()
     text.contains('Label')
 })
})
```

#### Methods

| Method                     | Description                                                                                                        | Arguments                                                |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| **contains**               | Verifies if the content of the element matches                                                                     | `content: string | number | RegExp`                      |
| **should**                 | Creates an assertion. Find more information here [link](https://docs.cypress.io/api/commands/should.html#Syntax)   | `chainers: string, attribute?: string, content?: string` |
| **blur**                   | Lose focus of this element                                                                                         | `options?: Partial<Cypress.BlurOptions>`                 |
| **click**                  | Triggers a clicks on the element                                                                                   | `options?: Partial<Cypress.ClickOptions>`                |
| **clickNth**               | Triggers n times a click on the element                                                                            | `index: number, options?: Partial<Cypress.ClickOptions>` |
| **assertExists**           | Asserts that the element exists in the DOM                                                                         |                                                          |
| **assertNotExists**        | Asserts that the element does not exist in the DOM                                                                 |                                                          |
| **assertIsDisabled**       | Asserts that the element is disabled                                                                               |                                                          |
| **assertIsEnabled**        | Asserts that the element is enabled and can be used                                                                |                                                          |
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

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-text.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/components/src/components/bal-text)
* [Accessor on Github](https://github.com/baloise/ui-library/blob/master/packages/testing/src/accessors/text.accessor.ts)
