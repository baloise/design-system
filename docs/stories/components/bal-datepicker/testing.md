## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

<a class="sb-unstyled button is-primary" href="../?path=/docs/development-testing--page">Go to testing guide</a>

<!-- START: human documentation -->

```typescript
import { byTestId } from '@baloise/design-system-testing'

describe('Datepicker', () => {
  const datepicker = byTestId('my-datepicker') // [data-testid="my-datepicker"]

  it('should open and close the datepicker', () => {
    cy.get(datepicker).balDatepickerToggle().balDatepickerIsOpen().balDatepickerToggle().balDatepickerIsClosed()
  })

  it('should pick the date in datepicker', () => {
    cy.get(datepicker).balDatepickerToggle().balDatepickerPick(now())
  })

  it('should type and assert the date in the datepicker', () => {
    cy.get(datepicker).type('20.02.2021').should('have.value', '20.02.2021')
    cy.get(datepicker).clear().type('03.03.2021').should('not.have.value', '20.02.2021')
  })
})
```

<!-- END: human documentation -->

### Commands

A list of the custom commands for this specific component.

| Command                         | Description                                                          | Signature                                             |
| ------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------- |
| `balDatepickerToggle`           | Opens and closes the datepicker popover.                             | (options?: Partial\<Loggable>): Chainable             |
| `balDatepickerIsOpen`           | Assert if the datepicker popover is open.                            | (options?: Partial\<Loggable>): Chainable             |
| `balDatepickerIsClosed`         | Assert if the datepicker popover is closed.                          | (options?: Partial\<Loggable>): Chainable             |
| `balDatepickerPick`             | Picks the date in the datepicker like a human.                       | (date: Date, options?: Partial\<Loggable>): Chainable |
| `balDatepickerIsDateInRange`    | Asserts if the given date is in range in the datepicker popover.     | (date: Date, options?: Partial\<Loggable>): Chainable |
| `balDatepickerIsDateNotInRange` | Asserts if the given date is not in range in the datepicker popover. | (date: Date, options?: Partial\<Loggable>): Chainable |


### Selectors

| Selector           | Element               |
| ------------------ | --------------------- |
| `datepicker.input` | Native input element. |

