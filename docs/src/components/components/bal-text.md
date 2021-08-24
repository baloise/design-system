---
sidebarDepth: 0
---

# Text


<!-- START: human documentation top -->

A text provides some additional helpers.

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Basic

<ClientOnly><docs-demo-bal-text-112></docs-demo-bal-text-112></ClientOnly>


### Small

<ClientOnly><docs-demo-bal-text-113></docs-demo-bal-text-113></ClientOnly>


### Bold

<ClientOnly><docs-demo-bal-text-114></docs-demo-bal-text-114></ClientOnly>


### Colors

<ClientOnly><docs-demo-bal-text-115></docs-demo-bal-text-115></ClientOnly>



## Code



### Properties


| Attribute | Description                         | Type                                                                  | Default |
| :-------- | :---------------------------------- | :-------------------------------------------------------------------- | :------ |
| **bold**  | If `true` the text is bold          | `boolean`                                                             | `false` |
| **color** | Defines the color of the text.      | `"" , "danger" , "hint" , "info" , "primary" , "success" , "warning"` | `''`    |
| **small** | If `true` the text has a small size | `boolean`                                                             | `false` |

### Testing


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

### Methods

| Method                         | Description                                                                                                        | Arguments                                                |
| :----------------------------- | :----------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| **contains**                   | Verifies if the content of the element matches                                                                     | `content: string | number | RegExp`                      |
| **should**                     | Creates an assertion. Find more information here [link](https://docs.cypress.io/api/commands/should.html#Syntax)   | `chainers: string, attribute?: string, content?: string` |
| **blur**                       | Lose focus of this element                                                                                         | `options?: Partial<Cypress.BlurOptions>`                 |
| **click**                      | Triggers a clicks on the element                                                                                   | `options?: Partial<Cypress.ClickOptions>`                |
| **clickNth**                   | Triggers n times a click on the element                                                                            | `index: number, options?: Partial<Cypress.ClickOptions>` |
| **assertExists**               | Asserts that the element exists/not exists in the DOM                                                              | `exists?: boolean`                                       |
| **assertIsDisabled**           | Asserts that the element is enabled or disabled.                                                                   | `enabled?: boolean`                                      |
| **assertVisible**              | Assert that the component is visible or not visible for the user                                                   | `visible?: boolean`                                      |
| **selectNth**                  | Selects the option at the given index.                                                                             | `index: number`                                          |
| **last**                       | Selects the last option.                                                                                           |                                                          |
| **parent**                     | Selects the parent option.                                                                                         |                                                          |
| **assertAttributeEquals**      | Asserting that the element has the attribute and the value.                                                        | `attribute: string, value: string`                       |
| **assertAttributeInclude**     | Asserting that the element has the attribute and include the value.                                                | `attribute: string, value: string`                       |
| **assertDoesNotHaveAttribute** | Asserting that the element does not have the attribute.                                                            | `attribute: string`                                      |
| **assertFullUrl**              | Asserting if given url argument matches the url of the browser.                                                    | `url: string`                                            |
| **assertPartUrl**              | Asserting if the browser url contains the given url argument.                                                      | `url: string`                                            |
| **wait**                       | Wait for a number of milliseconds or wait for an aliased resource to resolve before moving on to the next command. | `time: number`                                           |

## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-text.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-text)
* [Accessor on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/accessors/text.accessor.ts)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

