---
sidebarDepth: 0
---

# Toast

<!-- START: human documentation top -->

Toasts are used to inform the user with a simple text message.

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>

## Examples

### Basic

<ClientOnly><docs-demo-bal-toast-121></docs-demo-bal-toast-121></ClientOnly>

### Colors

<ClientOnly><docs-demo-bal-toast-122></docs-demo-bal-toast-122></ClientOnly>

## Code

<!-- START: human documentation code -->

Toast can be created with the `balToastController`. The default duration is 5000 milliseconds.
The `create` method return the instance of the created toast, so there you can access all the props and methods of it.

```typescript
import { balToastController } from '@baloise/design-system-components'

balToastController.create({ message: 'Hi I am a default Toast!', duration: 1000 })
balToastController.create({ message: 'Warning!', color: 'warning' })

const myToast = balToastController.create({ message: 'Danger zone!', color: 'danger' })
myToast.close()
```

<!-- END: human documentation code -->

### Properties

| Attribute    | Description                                                    | Type                                                         | Default |
| :----------- | :------------------------------------------------------------- | :----------------------------------------------------------- | :------ |
| **color**    | The theme type of the toast. Given by bulma our css framework. | `"" , "danger" , "info" , "primary" , "success" , "warning"` | `''`    |
| **duration** | The duration of the toast                                      | `number`                                                     | `0`     |

### Events

| Event        | Description                  | Type     |
| :----------- | :--------------------------- | :------- |
| **balClose** | Emitted when toast is closed | `string` |

### Methods

| Method        | Description                                     | Signature                                    |
| :------------ | :---------------------------------------------- | :------------------------------------------- |
| **`close`**   | Closes this toast                               | `close() => Promise<void>`                   |
| **`closeIn`** | Closes the toast after the given duration in ms | `closeIn(duration: number) => Promise<void>` |

### Testing

ToastAccessor is a helper object for E-2-E testing.
It maps the toast behaviour to the `bal-toast` ui component.

```typescript
import { dataTestSelector, ToastAccessor } from '@baloise/design-system-components-testing'

describe('Toast', () => {
  it('should ...', () => {
    const toast = ToastAccessor(dataTestSelector('toast-id')).get()
    toast.click()
  })
})
```

### Methods

| Method                         | Description                                                                                                        | Arguments                                                |
| :----------------------------- | :----------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| **assertToast**                | Assert if the toast have content                                                                                   | `content: string`                                        |
| **contains**                   | Verifies if the content of the element matches                                                                     | `content: string | number | RegExp`                      |
| **click**                      | Triggers a clicks on the element                                                                                   | `options?: Partial<Cypress.ClickOptions>`                |
| **clickNth**                   | Triggers n times a click on the element                                                                            | `index: number, options?: Partial<Cypress.ClickOptions>` |
| **assertVisible**              | Assert that the component is visible or not visible for the user                                                   | `visible?: boolean`                                      |
| **assertExists**               | Asserts that the element exists/not exists in the DOM                                                              | `exists?: boolean`                                       |
| **assertIsDisabled**           | Asserts that the element is enabled or disabled.                                                                   | `enabled?: boolean`                                      |
| **should**                     | Creates an assertion. Find more information here [link](https://docs.cypress.io/api/commands/should.html#Syntax)   | `chainers: string, attribute?: string, content?: string` |
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

- [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-toast.md)
- [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-toast)
- [Accessor on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/accessors/toast.accessor.ts)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

<ClientOnly>
  <docs-component-script tag="balToast"></docs-component-script>
</ClientOnly>
