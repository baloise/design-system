# bal-snackbar

## Usage

Toast can be created with the `balScnackbarController`. The default duration is 5000 milliseconds.

```typescript
import { balScnackbarController } from '@baloise/design-system-components'

balScnackbarController.create({ message: 'Hi I am a default Toast!', duration: 1000 })
```

<!-- START: human documentation top -->

A snackbar is used to inform the user with a simple text message and a action.

<!-- END: human documentation top -->

## Basic

<ClientOnly><docs-demo-bal-snackbar-93></docs-demo-bal-snackbar-93></ClientOnly>


## Colors

<ClientOnly><docs-demo-bal-snackbar-94></docs-demo-bal-snackbar-94></ClientOnly>



## API

### bal-snackbar

#### Properties

| Attribute    | Description                                                       | Type                                                         | Default |
| :----------- | :---------------------------------------------------------------- | :----------------------------------------------------------- | :------ |
| **action**   | Label text for the action button                                  | `string`                                                     | `''`    |
| **color**    | The theme type of the snackbar. Given by bulma our css framework. | `"" , "danger" , "info" , "primary" , "success" , "warning"` | `''`    |
| **duration** | The duration of the snackbar                                      | `number`                                                     | `0`     |
| **icon**     | The icon of the snackbar header                                   | `string`                                                     | `''`    |
| **message**  | The message of the snackbar                                       | `string`                                                     | `''`    |
| **subject**  | The subject of the snackbar header                                | `string`                                                     | `''`    |

#### Events

| Event         | Description                               | Type     |
| :------------ | :---------------------------------------- | :------- |
| **balAction** | Emitted when the action button is clicked | `string` |
| **balClose**  | Emitted when snackbar is closed           | `string` |

#### Methods

| Method        | Description                                        | Signature                                    |
| :------------ | :------------------------------------------------- | :------------------------------------------- |
| **`close`**   | Closes this snackbar                               | `close() => Promise<void>`                   |
| **`closeIn`** | Closes the snackbar after the given duration in ms | `closeIn(duration: number) => Promise<void>` |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-snackbar.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-snackbar)

<ClientOnly>
  <docs-component-script tag="balSnackbar"></docs-component-script>
</ClientOnly>
