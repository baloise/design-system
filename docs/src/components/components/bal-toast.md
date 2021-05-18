# bal-toast

## Usage

Toast can be created with the `balToastController`. The default duration is 5000 milliseconds.

```typescript
import { balToastController } from '@baloise/design-system-components'

balToastController.create({ message: 'Hi I am a default Toast!', duration: 1000 })
balToastController.create({ message: 'Warning!', color: 'warning' })
balToastController.create({ message: 'Danger zone!', color: 'danger' })
```

<!-- START: human documentation top -->

Toasts are used to inform the user with a simple text message.

<!-- END: human documentation top -->

## Basic

<ClientOnly>  <docs-demo-bal-toast-108></docs-demo-bal-toast-108></ClientOnly>


## Colors

<ClientOnly>  <docs-demo-bal-toast-109></docs-demo-bal-toast-109></ClientOnly>



## API

### bal-toast

#### Properties

| Attribute    | Description                                                    | Type                                                         | Default |
| :----------- | :------------------------------------------------------------- | :----------------------------------------------------------- | :------ |
| **color**    | The theme type of the toast. Given by bulma our css framework. | `"" , "danger" , "info" , "primary" , "success" , "warning"` | `''`    |
| **duration** | The duration of the toast                                      | `number`                                                     | `0`     |

#### Events

| Event        | Description                  | Type     |
| :----------- | :--------------------------- | :------- |
| **balClose** | Emitted when toast is closed | `string` |

#### Methods

| Method        | Description                                     | Signature                                    |
| :------------ | :---------------------------------------------- | :------------------------------------------- |
| **`close`**   | Closes this toast                               | `close() => Promise<void>`                   |
| **`closeIn`** | Closes the toast after the given duration in ms | `closeIn(duration: number) => Promise<void>` |

## Testing

### ToastAccessor

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

#### Methods

| Method                     | Description                                                                                                        | Arguments                                                |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| **assertToast**            | Assert if the toast have content                                                                                   | `content: string`                                        |
| **contains**               | Verifies if the content of the element matches                                                                     | `content: string | number | RegExp`                      |
| **click**                  | Triggers a clicks on the element                                                                                   | `options?: Partial<Cypress.ClickOptions>`                |
| **clickNth**               | Triggers n times a click on the element                                                                            | `index: number, options?: Partial<Cypress.ClickOptions>` |
| **assertVisible**          | Assert that the component is visible for the user                                                                  |                                                          |
| **assertNotVisible**       | Assert that the component is not visible for the user                                                              |                                                          |
| **assertExists**           | Asserts that the element exists in the DOM                                                                         |                                                          |
| **assertNotExists**        | Asserts that the element does not exist in the DOM                                                                 |                                                          |
| **assertIsDisabled**       | Asserts that the element is disabled                                                                               |                                                          |
| **assertIsEnabled**        | Asserts that the element is enabled and can be used                                                                |                                                          |
| **should**                 | Creates an assertion. Find more information here [link](https://docs.cypress.io/api/commands/should.html#Syntax)   | `chainers: string, attribute?: string, content?: string` |
| **selectNth**              | Selects the option at the given index                                                                              | `index: number`                                          |
| **assertAttributeEquals**  | Asserting that the element has the attribute and the value.                                                        | `attribute: string, value: string`                       |
| **assertAttributeInclude** | Asserting that the element has the attribute and include the value.                                                | `attribute: string, value: string`                       |
| **assertFullUrl**          | Asserting if given url argument matches the url of the browser.                                                    | `url: string`                                            |
| **assertPartUrl**          | Asserting if the browser url contains the given url argument.                                                      | `url: string`                                            |
| **wait**                   | Wait for a number of milliseconds or wait for an aliased resource to resolve before moving on to the next command. | `time: number`                                           |

<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-toast.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/components/src/components/bal-toast)
* [Accessor on Github](https://github.com/baloise/ui-library/blob/master/packages/testing/src/accessors/toast.accessor.ts)

<ClientOnly>
  <docs-component-script tag="balToast"></docs-component-script>
</ClientOnly>
