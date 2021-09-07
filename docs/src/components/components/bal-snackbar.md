---
sidebarDepth: 0
---

# Snackbar

<!-- START: human documentation top -->

A snackbar is used to inform the user with a simple text message and a action.

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>

## Examples

### Basic

<ClientOnly><docs-demo-bal-snackbar-96></docs-demo-bal-snackbar-96></ClientOnly>

### Colors

<ClientOnly><docs-demo-bal-snackbar-97></docs-demo-bal-snackbar-97></ClientOnly>

## Code

<!-- START: human documentation code -->

Snackbar can be created with the `balScnackbarController`. The default duration is 5000 milliseconds.
The `create` method return the instance of the created snackbar, so there you can access all the props and methods of it.

```typescript
import { balSnackbarController } from '@baloise/design-system-components'

const mySnachbar = balSnackbarController.create({ message: 'Hi I am a default snackbar!', duration: 1000 })
mySnachbar.close()
```

::: danger <img src="https://angular.io/assets/images/logos/angular/angular.svg" data-origin="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular" style="width: 32px">Angular

In Angular we provide services to create snackbars and toasts.

```typescript{2,9,12-16}
import { Component } from '@angular/core'
import { BalSnackbarService } from '@baloise/design-system-components-angular'

@Component({
  selector: 'app-services',
  templateUrl: './services-page.component.html',
})
export class ServicesPageComponent {
  constructor(public snackbar: BalSnackbarService) {}

  createSnackbar() {
    this.snackbar.create({
      icon: 'github',
      subject: 'Snackbar Title',
      message: 'I am the body of a nice snackbar',
    })
  }
}
```

:::

<!-- END: human documentation code -->

### Properties

| Attribute    | Description                                                       | Type                                                                    | Default         |
| :----------- | :---------------------------------------------------------------- | :---------------------------------------------------------------------- | :-------------- |
| **action**   | Label text for the action button                                  | <code>string</code>                                                     | <code>''</code> |
| **color**    | The theme type of the snackbar. Given by bulma our css framework. | <code>"" , "danger" , "info" , "primary" , "success" , "warning"</code> | <code>''</code> |
| **duration** | The duration of the snackbar                                      | <code>number</code>                                                     | <code>0</code>  |
| **icon**     | The icon of the snackbar header                                   | <code>string</code>                                                     | <code>''</code> |
| **message**  | The message of the snackbar                                       | <code>string</code>                                                     | <code>''</code> |
| **subject**  | The subject of the snackbar header                                | <code>string</code>                                                     | <code>''</code> |

### Events

| Event         | Description                               | Type                |
| :------------ | :---------------------------------------- | :------------------ |
| **balAction** | Emitted when the action button is clicked | <code>string</code> |
| **balClose**  | Emitted when snackbar is closed           | <code>string</code> |

### Methods

| Method      | Description                                        | Signature                                                           |
| :---------- | :------------------------------------------------- | :------------------------------------------------------------------ |
| **close**   | Closes this snackbar                               | <code>close() =&#62; Promise&#60;void&#62;</code>                   |
| **closeIn** | Closes the snackbar after the given duration in ms | <code>closeIn(duration: number) =&#62; Promise&#60;void&#62;</code> |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation testing -->

```typescript
import { dataTestSelector } from '@baloise/design-system-testing'

describe('Snackbar', () => {
  it('should ...', () => {
    cy.balSnackbarFind()
      .first()
      .contains('Hi I am a default Snack!')
  })
})
```

<!-- END: human documentation testing -->

### Custom Commands

A list of the custom commands for this specific component.

| Command             | Description                    | Signature                                  |
| :------------------ | :----------------------------- | :----------------------------------------- |
| **balSnackbarFind** | Returns the visible snackbars. | <code>(): Chainable&#60;JQuery&#62;</code> |

## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->

## Edit this page on Github

- [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-snackbar.md)
- [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-snackbar)
- [Cypress commands on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/commands)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

<ClientOnly>
  <docs-component-script tag="balSnackbar"></docs-component-script>
</ClientOnly>
