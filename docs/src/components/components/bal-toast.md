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

::: danger <img src="https://angular.io/assets/images/logos/angular/angular.svg" data-origin="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular" style="width: 32px">Angular

In Angular we provide services to create snackbars and toasts.

```typescript{2,9,12}
import { Component } from '@angular/core'
import { BalToastService } from '@baloise/design-system-components-angular'

@Component({
  selector: 'app-services',
  templateUrl: './services-page.component.html',
})
export class ServicesPageComponent {
  constructor(public toast: BalToastService) {}

  createToast() {
    this.toast.create({ message: 'I am a nice Toast!' })
  }
}
```

:::

<!-- END: human documentation code -->

### Properties


| Attribute    | Description                                                    | Type                                                                    | Default         |
| :----------- | :------------------------------------------------------------- | :---------------------------------------------------------------------- | :-------------- |
| **color**    | The theme type of the toast. Given by bulma our css framework. | <code>"" , "danger" , "info" , "primary" , "success" , "warning"</code> | <code>''</code> |
| **duration** | The duration of the toast                                      | <code>number</code>                                                     | <code>0</code>  |

### Events


| Event        | Description                  | Type                |
| :----------- | :--------------------------- | :------------------ |
| **balClose** | Emitted when toast is closed | <code>string</code> |

### Methods


| Method      | Description                                     | Signature                                                           |
| :---------- | :---------------------------------------------- | :------------------------------------------------------------------ |
| **close**   | Closes this toast                               | <code>close() =&#62; Promise&#60;void&#62;</code>                   |
| **closeIn** | Closes the toast after the given duration in ms | <code>closeIn(duration: number) =&#62; Promise&#60;void&#62;</code> |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation testing -->

```typescript
import { dataTestSelector } from '@baloise/design-system-testing'

describe('Toast', () => {
  it('should ...', () => {
    cy.balToastFind()
      .first()
      .contains('Hi I am a default Toast! Hi I am a default Toast!')
  })
})
```

<!-- END: human documentation testing -->

### Custom Commands

A list of the custom commands for this specific component.

| Command          | Description                 | Signature                                  |
| :--------------- | :-------------------------- | :----------------------------------------- |
| **balToastFind** | Returns the visible toasts. | <code>(): Chainable&#60;JQuery&#62;</code> |

## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-toast.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-toast)
* [Cypress commands on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/commands)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).


<ClientOnly>
  <docs-component-script tag="balToast"></docs-component-script>
</ClientOnly>
