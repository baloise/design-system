# bal-select <Badge text="Two-way binding"/>

A select is a collection of options, where the user can select a single one or multiple.

## Option interface

```typescript
export interface BalOptionValue<T> {
  value: string
  label: string
  data?: T
}
```

<!-- START: human documentation top -->

A select is a collection of options, where the user can select a single one or multiple.

## Option interface

```typescript
export interface BalOptionValue<T> {
  value: string
  label: string
  data?: T
}
```

<!-- END: human documentation top -->

## Basic

<ClientOnly>  <docs-demo-bal-select-76></docs-demo-bal-select-76></ClientOnly>


### Typeahead

<ClientOnly>  <docs-demo-bal-select-77></docs-demo-bal-select-77></ClientOnly>


### Multi-Select

<ClientOnly>  <docs-demo-bal-select-78></docs-demo-bal-select-78></ClientOnly>


### Multi-Select with typeahead

<ClientOnly>  <docs-demo-bal-select-79></docs-demo-bal-select-79></ClientOnly>


### Remote Typeahead

<ClientOnly>  <docs-demo-bal-select-80></docs-demo-bal-select-80></ClientOnly>



## API

### bal-select

#### Properties

| Attribute         | Description                                                                       | Type                                         | Default        |
| :---------------- | :-------------------------------------------------------------------------------- | :------------------------------------------- | :------------- |
| **bal-tabindex**  | The tabindex of the control.                                                      | `number`                                     | `0`            |
| **disabled**      | If `true` the component is diabled.                                               | `boolean`                                    | `false`        |
| **expanded**      | If `true` the component uses the whole width.                                     | `boolean`                                    | `false`        |
| **inverted**      | Set this to `true` when the component is placed on a dark background.             | `boolean`                                    | `false`        |
| **loading**       |                                                                                   | `boolean`                                    | `false`        |
| **multiple**      | If `true` multiple option can be selected                                         | `boolean`                                    | `false`        |
| **name**          | The name of the control, which is submitted with the form data.                   | `string`                                     | `this.inputId` |
| **no-data-label** | This label is shown if typeahead is active and all the options are filtered out.  | `string , undefined`                         |                |
| **placeholder**   | The text to display when the select is empty.                                     | `string , undefined`                         |                |
| **scrollable**    | Defines the height of the dropdown list.                                          | `number`                                     | `250`          |
|                   |                                                                                   | `((inputValue: string) => void) , undefined` | `undefined`    |
| **typeahead**     | If `true` the user can search by typing into the input field.                     | `boolean`                                    | `false`        |
|                   | Selected option values. Could also be passed as a string, which gets transformed. | `string[]`                                   | `[]`           |

#### Events

| Event           | Description                                                        | Type            |
| :-------------- | :----------------------------------------------------------------- | :-------------- |
| **balBlur**     | Emitted when the input loses focus.                                | `FocusEvent`    |
| **balCancel**   | Emitted when the user cancels the input.                           | `KeyboardEvent` |
| **balChange**   | Emitted when a option got selected.                                | `string[]`      |
| **balClick**    | Emitted when the input got clicked.                                | `MouseEvent`    |
| **balFocus**    | Emitted when the input has focus.                                  | `FocusEvent`    |
| **balInput**    | Emitted when a keyboard input occurred.                            | `string`        |
| **balKeyPress** | Emitted when the input has focus and key from the keyboard go hit. | `KeyboardEvent` |

#### Methods

| Method         | Description                                                                 | Signature                                |
| :------------- | :-------------------------------------------------------------------------- | :--------------------------------------- |
| **`cancel`**   | Cancel the dropdown                                                         | `cancel() => Promise<void>`              |
| **`clear`**    | Sets the value to `[]`, the input value to ´''´ and the focus index to ´0´. | `clear() => Promise<void>`               |
| **`close`**    | Closes the dropdown                                                         | `close() => Promise<void>`               |
| **`open`**     | Opens the dropdown                                                          | `open() => Promise<void>`                |
| **`select`**   | Select option by passed value                                               | `select(value: string) => Promise<void>` |
| **`setFocus`** | Sets the focus on the input element                                         | `setFocus() => Promise<void>`            |

### bal-select-option


# bal-select-option



#### Properties

| Attribute | Description                                                                                       | Type                 | Default |
| :-------- | :------------------------------------------------------------------------------------------------ | :------------------- | :------ |
| **label** | Label will be shown in the input element when it got selected                                     | `string , undefined` |         |
| **value** | The value of the select option. This value will be returned by the parent `<bal-select>` element. | `string , undefined` |         |

## Testing

### SelectAccessor

SelectAccessor is a helper object for E-2-E testing.
It maps the select behaviour to the `bal-select` ui component.

```typescript
import { dataTestSelector, SelectAccessor } from '@baloise/design-system-components-testing'

describe('Select', () => {
  it('should ...', () => {
     const select = SelectAccessor(dataTestSelector('select-id')).get()
     select.click()
     select.select(1)
     select.contains('value')
 })
})
```

#### Methods

| Method            | Description                    | Arguments                                 |
| :---------------- | :----------------------------- | :---------------------------------------- |
| **click**         | Clicks the input               | `options?: Partial<Cypress.ClickOptions>` |
| **select**        | Selects dropdown item          | `index: number`                           |
| **assertOptions** | Checks the options             | `...options: string[]`                    |
| **contains**      | Checks if input have a content | `content: string | number | RegExp`       |

<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-select.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/components/src/components/bal-select)
* [Accessor on Github](https://github.com/baloise/ui-library/blob/master/packages/testing/src/accessors/select.accessor.ts)

<ClientOnly>
  <docs-component-script tag="balSelect"></docs-component-script>
</ClientOnly>
