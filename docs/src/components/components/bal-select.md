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


| Attribute         | Description                                                                       | Type                            | Default        |
| :---------------- | :-------------------------------------------------------------------------------- | :------------------------------ | :------------- |
| **bal-tabindex**  | The tabindex of the control.                                                      | `number`                        | `0`            |
| **disabled**      | If `true` the component is diabled.                                               | `boolean`                       | `false`        |
| **expanded**      | If `true` the component uses the whole width.                                     | `boolean`                       | `false`        |
| **has-movement**  | Enables the slide in animation for the option items.                              | `boolean`                       | `false`        |
| **inverted**      | Set this to `true` when the component is placed on a dark background.             | `boolean`                       | `false`        |
| **loading**       | Defines if the select is in a loading state.                                      | `boolean`                       | `false`        |
| **multiple**      | If `true` multiple option can be selected                                         | `boolean`                       | `false`        |
| **name**          | The name of the control, which is submitted with the form data.                   | `string`                        | `this.inputId` |
| **no-border**     | Removes the border of the input.                                                  | `boolean`                       | `false`        |
| **no-data-label** | This label is shown if typeahead is active and all the options are filtered out.  | `string , undefined`            |                |
| **placeholder**   | The text to display when the select is empty.                                     | `string , undefined`            |                |
| **scrollable**    | Defines the height of the dropdown list.                                          | `number`                        | `250`          |
| **typeahead**     | If `true` the user can search by typing into the input field.                     | `boolean`                       | `false`        |
| **value**         | Selected option values. Could also be passed as a string, which gets transformed. | `string , string[] , undefined` | `[]`           |

### Events


| Event           | Description                                                        | Type                            |
| :-------------- | :----------------------------------------------------------------- | :------------------------------ |
| **balBlur**     | Emitted when the input loses focus.                                | `FocusEvent`                    |
| **balCancel**   | Emitted when the user cancels the input.                           | `KeyboardEvent`                 |
| **balChange**   | Emitted when a option got selected.                                | `string | string[] | undefined` |
| **balClick**    | Emitted when the input got clicked.                                | `MouseEvent`                    |
| **balFocus**    | Emitted when the input has focus.                                  | `FocusEvent`                    |
| **balInput**    | Emitted when a keyboard input occurred.                            | `string`                        |
| **balKeyPress** | Emitted when the input has focus and key from the keyboard go hit. | `KeyboardEvent`                 |

### Methods


| Method         | Description                                                                 | Signature                                     |
| :------------- | :-------------------------------------------------------------------------- | :-------------------------------------------- |
| **`cancel`**   | Cancel the dropdown                                                         | `cancel() => Promise<void>`                   |
| **`clear`**    | Sets the value to `[]`, the input value to ´''´ and the focus index to ´0´. | `clear() => Promise<void>`                    |
| **`close`**    | Closes the dropdown                                                         | `close() => Promise<void>`                    |
| **`getValue`** | Sets the focus on the input element                                         | `getValue() => Promise<string[] | undefined>` |
| **`open`**     | Opens the dropdown                                                          | `open() => Promise<void>`                     |
| **`select`**   | Select option by passed value                                               | `select(value: string) => Promise<void>`      |
| **`setFocus`** | Sets the focus on the input element                                         | `setFocus() => Promise<void>`                 |

### Testing



#### Commands

| Command                        | Description                                                                               | Signature                                                             |
| :----------------------------- | :---------------------------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| **balSelectFindOptions**       | Custom command to select DOM element by data-cy attribute. @example cy.dataCy('greeting') | `(): Chainable<JQuery>`                                               |
| **balSelectFindChips**         | Custom command to select DOM element by data-cy attribute. @example cy.dataCy('greeting') | `(): Chainable<JQuery>`                                               |
| **balSelectShouldHaveOptions** | Custom command to select DOM element by data-cy attribute. @example cy.dataCy('greeting') | `(labels: string[], dataType?: 'label' | 'value'): Chainable<JQuery>` |

## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-select.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-select)
* [Cypress commands on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/commands)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).


<ClientOnly>
  <docs-component-script tag="balSelect"></docs-component-script>
</ClientOnly>
