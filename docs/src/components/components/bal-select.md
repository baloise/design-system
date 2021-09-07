---
sidebarDepth: 0
---

# Select <Badge text="Two-way binding"/>

<!-- START: human documentation top -->

A select is a collection of options, where the user can select a single one or multiple.

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>

For creating a list of options use the `BalOptionValue` interface.

```typescript
export interface BalOptionValue<T> {
  value: string
  label: string
  disabled?: boolean
  data?: T
}
```

## Examples

### Basic

<ClientOnly><docs-demo-bal-select-87></docs-demo-bal-select-87></ClientOnly>

#### Typeahead

<ClientOnly><docs-demo-bal-select-88></docs-demo-bal-select-88></ClientOnly>

#### Multi-Select

<ClientOnly><docs-demo-bal-select-89></docs-demo-bal-select-89></ClientOnly>

#### Multi-Select with typeahead

<ClientOnly><docs-demo-bal-select-90></docs-demo-bal-select-90></ClientOnly>

#### Remote Typeahead

<ClientOnly><docs-demo-bal-select-91></docs-demo-bal-select-91></ClientOnly>

## Code

### Properties

| Attribute         | Description                                                                       | Type                                       | Default                   |
| :---------------- | :-------------------------------------------------------------------------------- | :----------------------------------------- | :------------------------ |
| **bal-tabindex**  | The tabindex of the control.                                                      | <code>number</code>                        | <code>0</code>            |
| **disabled**      | If `true` the component is diabled.                                               | <code>boolean</code>                       | <code>false</code>        |
| **expanded**      | If `true` the component uses the whole width.                                     | <code>boolean</code>                       | <code>false</code>        |
| **has-movement**  | Enables the slide in animation for the option items.                              | <code>boolean</code>                       | <code>false</code>        |
| **inverted**      | Set this to `true` when the component is placed on a dark background.             | <code>boolean</code>                       | <code>false</code>        |
| **loading**       | Defines if the select is in a loading state.                                      | <code>boolean</code>                       | <code>false</code>        |
| **multiple**      | If `true` multiple option can be selected                                         | <code>boolean</code>                       | <code>false</code>        |
| **name**          | The name of the control, which is submitted with the form data.                   | <code>string</code>                        | <code>this.inputId</code> |
| **no-border**     | Removes the border of the input.                                                  | <code>boolean</code>                       | <code>false</code>        |
| **no-data-label** | This label is shown if typeahead is active and all the options are filtered out.  | <code>string , undefined</code>            |                           |
| **placeholder**   | The text to display when the select is empty.                                     | <code>string , undefined</code>            |                           |
| **scrollable**    | Defines the height of the dropdown list.                                          | <code>number</code>                        | <code>250</code>          |
| **typeahead**     | If `true` the user can search by typing into the input field.                     | <code>boolean</code>                       | <code>false</code>        |
| **value**         | Selected option values. Could also be passed as a string, which gets transformed. | <code>string , string[] , undefined</code> | <code>[]</code>           |

### Events

| Event           | Description                                                        | Type                                                 |
| :-------------- | :----------------------------------------------------------------- | :--------------------------------------------------- |
| **balBlur**     | Emitted when the input loses focus.                                | <code>FocusEvent</code>                              |
| **balCancel**   | Emitted when the user cancels the input.                           | <code>KeyboardEvent</code>                           |
| **balChange**   | Emitted when a option got selected.                                | <code>string &#124; string[] &#124; undefined</code> |
| **balClick**    | Emitted when the input got clicked.                                | <code>MouseEvent</code>                              |
| **balFocus**    | Emitted when the input has focus.                                  | <code>FocusEvent</code>                              |
| **balInput**    | Emitted when a keyboard input occurred.                            | <code>string</code>                                  |
| **balKeyPress** | Emitted when the input has focus and key from the keyboard go hit. | <code>KeyboardEvent</code>                           |

### Methods

| Method       | Description                                                                 | Signature                                                                 |
| :----------- | :-------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| **cancel**   | Cancel the dropdown                                                         | <code>cancel() =&#62; Promise&#60;void&#62;</code>                        |
| **clear**    | Sets the value to `[]`, the input value to ´''´ and the focus index to ´0´. | <code>clear() =&#62; Promise&#60;void&#62;</code>                         |
| **close**    | Closes the dropdown                                                         | <code>close() =&#62; Promise&#60;void&#62;</code>                         |
| **getValue** | Sets the focus on the input element                                         | <code>getValue() =&#62; Promise&#60;string[] &#124; undefined&#62;</code> |
| **open**     | Opens the dropdown                                                          | <code>open() =&#62; Promise&#60;void&#62;</code>                          |
| **select**   | Select option by passed value                                               | <code>select(value: string) =&#62; Promise&#60;void&#62;</code>           |
| **setFocus** | Sets the focus on the input element                                         | <code>setFocus() =&#62; Promise&#60;void&#62;</code>                      |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation testing -->

```typescript
import { dataTestSelector } from '@baloise/design-system-testing'

describe('Select', () => {
  const select = dataTestSelector('my-select') // [data-test-id="my-select"]

  it('should ...', () => {
    cy.get(select)
      .click() // opens the select
      .select('1995')
      .should('have.value', '1995')

    cy.get(select)
      .balSelectFindOptions()
      .should('have.length', 6)

    cy.get(select).balSelectShouldHaveOptions(['1995', '1996', '1997', '1998', '1999', '2000'])
  })
})

describe('typeahead', () => {
  const typeahead = dataTestSelector('my-typeahead') // [data-test-id="my-typeahead"]

  it('should clear select and search for the Black Widow', () => {
    cy.get(typeahead)
      .clear()
      .type('Black{enter}')
      .should('have.value', 'Black Widow')
  })
})

describe('multiple', () => {
  const multiple = dataTestSelector('my-multiple') // [data-test-id="my-multiple"]

  it('should ', () => {
    cy.get(multiple)
      .click()
      .select(['Black Widow', 'Black Panter'])
      .should('have.value', ['Black Widow', 'Black Panter'])

    cy.get(multiple)
      .balSelectFindOptions()
      .first()
      .click()

    cy.get(page.multiple)
      .balSelectFindChips()
      .first()
      .contains('Iron Man')
      .click() // clicks the chip to remove the selection
  })
})
```

<!-- END: human documentation testing -->

### Custom Commands

A list of the custom commands for this specific component.

| Command                        | Description                                                | Signature                                                                                     |
| :----------------------------- | :--------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| **balSelectFindOptions**       | Returns the select options.                                | <code>(): Chainable&#60;JQuery&#62;</code>                                                    |
| **balSelectFindChips**         | Returns the closable select chips (only with multiselect). | <code>(): Chainable&#60;JQuery&#62;</code>                                                    |
| **balSelectShouldHaveOptions** | Asserts that the select has the given options.             | <code>(labels: string[], dataType?: 'label' &#124; 'value'): Chainable&#60;JQuery&#62;</code> |

## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->

## Edit this page on Github

- [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-select.md)
- [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-select)
- [Cypress commands on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/commands)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

<ClientOnly>
  <docs-component-script tag="balSelect"></docs-component-script>
</ClientOnly>
