# bal-snackbar

<!-- START: human documentation top -->

A snackbar is used to inform the user with a simple text message and a action.

<!-- END: human documentation top -->

## Usage

Toast can be created with the `balScnackbarController`. The default duration is 5000 milliseconds.

```typescript
import { balScnackbarController } from '@baloise/ui-library'

balScnackbarController.create({ message: 'Hi I am a default Toast!', duration: 1000 })
```

## Basic

<ClientOnly> <docs-demo-bal-snackbar-82></docs-demo-bal-snackbar-82></ClientOnly>

```html
<bal-button id="snack-default" color="success" data-test-id="snack">Show success Snack</bal-button>
<bal-button id="snack-warning" color="warning" data-test-id="snack">Show warning Snack</bal-button>
<bal-button id="snack-danger" color="danger" data-test-id="snack">Show error Snack</bal-button>
```

## Colors

<ClientOnly> <docs-demo-bal-snackbar-83></docs-demo-bal-snackbar-83></ClientOnly>

```html
<bal-snackbar subject="Default" icon="info-circle" action="More">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
</bal-snackbar>
<bal-snackbar subject="Primary" icon="info-circle" color="primary" action="More">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
</bal-snackbar>
<bal-snackbar subject="Info" icon="info-circle" color="info" action="More">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
</bal-snackbar>
<bal-snackbar subject="Success" icon="info-circle" color="success" action="More">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
</bal-snackbar>
<bal-snackbar subject="Warning" icon="info-circle" color="warning" action="More">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
</bal-snackbar>
<bal-snackbar subject="Danger" icon="info-circle" color="danger" action="More">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
</bal-snackbar>
```

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

- [Component on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-snackbar)

<ClientOnly>
  <docs-component-script tag="balSnackbar"></docs-component-script>
</ClientOnly>
