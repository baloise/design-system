---
sidebarDepth: 0
---

# Datepicker <Badge text="Two-way binding"/>




<!-- START: human documentation top -->

A datepicker allows manual date entry as well as open the dropdown content with a calendar to select a date.

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>

To set the date use the [date utils](/components/tooling/utils.html#dateutil).

```javascript
import { newDateString, now } from '@baloise/design-system-components'

const datepickerDisabled = document.getElementById('datepicker-disabled')
datepickerDisabled.value = newDateString(now())
// or
datepickerDisabled.value = newDateString(2020, 0, 13)
// or
datepickerDisabled.value = newDateString(new Date(2020, 0, 13))
```


## Examples

### Basic

In this example the user can only select a date. For that use the property `readonly`.

<ClientOnly><docs-demo-bal-datepicker-32></docs-demo-bal-datepicker-32></ClientOnly>


### Disabled

<ClientOnly><docs-demo-bal-datepicker-33></docs-demo-bal-datepicker-33></ClientOnly>


### Manual Input

To enable manual input remove the property `readonly` and add the property `trigger-ico`. The `trigger-ico` property only opens the dropdown when the icon gets clicked.

<ClientOnly><docs-demo-bal-datepicker-34></docs-demo-bal-datepicker-34></ClientOnly>


### Inverted & Expanded

<ClientOnly><docs-demo-bal-datepicker-35></docs-demo-bal-datepicker-35></ClientOnly>


### i18n

<ClientOnly><docs-demo-bal-datepicker-36></docs-demo-bal-datepicker-36></ClientOnly>


### Footer

<ClientOnly><docs-demo-bal-datepicker-37></docs-demo-bal-datepicker-37></ClientOnly>


### Range Min & Max

<ClientOnly><docs-demo-bal-datepicker-38></docs-demo-bal-datepicker-38></ClientOnly>


### Allow Dates

You can specify allowed dates using a function.

<ClientOnly><docs-demo-bal-datepicker-39></docs-demo-bal-datepicker-39></ClientOnly>


### Custom Start Date

<ClientOnly><docs-demo-bal-datepicker-40></docs-demo-bal-datepicker-40></ClientOnly>



## Code



### Properties


| Attribute           | Description                                                                                                                                                                                                                                                                                                                                                             | Type                                                           | Default                   |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------- | :------------------------ |
|                     | Callback to determine which date in the datepicker should be selectable.                                                                                                                                                                                                                                                                                                | <code>((datestring: string) =&#62; boolean) , undefined</code> | <code>undefined</code>    |
| **bal-tabindex**    | The tabindex of the control.                                                                                                                                                                                                                                                                                                                                            | <code>number</code>                                            | <code>0</code>            |
| **close-on-select** | Closes the datepicker dropdown after selection                                                                                                                                                                                                                                                                                                                          | <code>boolean</code>                                           | <code>true</code>         |
| **debounce**        | Set the amount of time, in milliseconds, to wait to trigger the `ionChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.                                                                                                                                                                                                 | <code>number</code>                                            | <code>0</code>            |
| **default-date**    | The date to defines where the datepicker popup starts. The prop accepts ISO 8601 date strings (YYYY-MM-DD).                                                                                                                                                                                                                                                             | <code>null , string , undefined</code>                         |                           |
| **disabled**        | If `true` the component is diabled.                                                                                                                                                                                                                                                                                                                                     | <code>boolean</code>                                           | <code>false</code>        |
| **expanded**        | If `true` the component uses the whole width.                                                                                                                                                                                                                                                                                                                           | <code>boolean</code>                                           | <code>false</code>        |
| **inverted**        | Set this to `true` when the component is placed on a dark background.                                                                                                                                                                                                                                                                                                   | <code>boolean</code>                                           | <code>false</code>        |
| **locale**          | If `true` the component uses the whole width.                                                                                                                                                                                                                                                                                                                           | <code>"de" , "en" , "fr" , "it"</code>                         | <code>'en'</code>         |
| **max**             | The maximum datetime allowed. Value must be a date string following the [ISO 8601 datetime format standard](https://www.w3.org/TR/NOTE-datetime), `1996-12-19`. The format does not have to be specific to an exact datetime. For example, the maximum could just be the year, such as `1994`. Defaults to the end of this year.                                        | <code>string , undefined</code>                                |                           |
| **max-year**        | Latest year available for selection                                                                                                                                                                                                                                                                                                                                     | <code>number , undefined</code>                                | <code>undefined</code>    |
| **min**             | The minimum datetime allowed. Value must be a date string following the [ISO 8601 datetime format standard](https://www.w3.org/TR/NOTE-datetime), such as `1996-12-19`. The format does not have to be specific to an exact datetime. For example, the minimum could just be the year, such as `1994`. Defaults to the beginning of the year, 100 years ago from today. | <code>string , undefined</code>                                |                           |
| **min-year**        | Earliest year available for selection                                                                                                                                                                                                                                                                                                                                   | <code>number , undefined</code>                                | <code>undefined</code>    |
| **name**            | The name of the control, which is submitted with the form data.                                                                                                                                                                                                                                                                                                         | <code>string</code>                                            | <code>this.inputId</code> |
| **placeholder**     | The text to display when the select is empty.                                                                                                                                                                                                                                                                                                                           | <code>string , undefined</code>                                |                           |
| **readonly**        | If `true` the use can only select a date.                                                                                                                                                                                                                                                                                                                               | <code>boolean</code>                                           | <code>false</code>        |
| **required**        | If `true` the attribute required is added to the native input.                                                                                                                                                                                                                                                                                                          | <code>boolean</code>                                           | <code>false</code>        |
| **trigger-icon**    | If `true` the datepicker only open on click of the icon                                                                                                                                                                                                                                                                                                                 | <code>boolean</code>                                           | <code>false</code>        |
| **value**           | The value of the form field, which accepts ISO 8601 date strings (YYYY-MM-DD).                                                                                                                                                                                                                                                                                          | <code>null , string , undefined</code>                         |                           |

### Events


| Event         | Description                             | Type                                                 |
| :------------ | :-------------------------------------- | :--------------------------------------------------- |
| **balBlur**   | Emitted when the input loses focus.     | <code>FocusEvent</code>                              |
| **balChange** | Emitted when a option got selected.     | <code>null  &#124;  string  &#124;  undefined</code> |
| **balFocus**  | Emitted when the input has focus.       | <code>FocusEvent</code>                              |
| **balInput**  | Emitted when a keyboard input occurred. | <code>string</code>                                  |

### Methods


| Method              | Description                                               | Signature                                                               |
| :------------------ | :-------------------------------------------------------- | :---------------------------------------------------------------------- |
| **close**           | Closes the dropdown                                       | <code>close() =&#62; Promise&#60;void&#62;</code>                       |
| **getInputElement** | Returns the native `<input>` element used under the hood. | <code>getInputElement() =&#62; Promise&#60;HTMLInputElement&#62;</code> |
| **open**            | Opens the dropdown                                        | <code>open() =&#62; Promise&#60;void&#62;</code>                        |
| **select**          | Selects an option                                         | <code>select(datestring: string) =&#62; Promise&#60;void&#62;</code>    |
| **setFocus**        | Sets the focus on the input element                       | <code>setFocus() =&#62; Promise&#60;void&#62;</code>                    |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation testing -->

```typescript
import { dataTestSelector } from '@baloise/design-system-testing'

describe('Datepicker', () => {
  const datepicker = dataTestSelector('my-datepicker') // [data-test-id="my-datepicker"]

  it('should open and close the datepicker', () => {
    cy.get(datepicker)
      .balDatepickerToggle()
      .balDatepickerIsOpen()
      .balDatepickerToggle()
      .balDatepickerIsClosed()
  })

  it('should pick the date in datepicker', () => {
    cy.get(datepicker)
      .balDatepickerToggle()
      .balDatepickerPick(now())
  })

  it('should type and assert the date in the datepicker', () => {
    cy.get(datepicker)
      .type('20.02.2021')
      .should('have.value', '20.02.2021')
    cy.get(datepicker)
      .clear()
      .type('03.03.2021')
      .should('not.have.value', '20.02.2021')
  })
})
```

<!-- END: human documentation testing -->

### Custom Commands

A list of the custom commands for this specific component.

| Command                           | Description                                                           | Signature                                            |
| :-------------------------------- | :-------------------------------------------------------------------- | :--------------------------------------------------- |
| **balDatepickerToggle**           | Opens and closes the datepicker dropdown.                             | <code>(): Chainable&#60;JQuery&#62;</code>           |
| **balDatepickerIsOpen**           | Assert if the datepicker dropdown is open.                            | <code>(): Chainable&#60;JQuery&#62;</code>           |
| **balDatepickerIsClosed**         | Assert if the datepicker dropdown is closed.                          | <code>(): Chainable&#60;JQuery&#62;</code>           |
| **balDatepickerPick**             | Picks the date in the datepicker like a human.                        | <code>(date: Date): Chainable&#60;JQuery&#62;</code> |
| **balDatepickerIsDateInRange**    | Asserts if the given date is in range in the datepicker dropdown.     | <code>(date: Date): Chainable&#60;JQuery&#62;</code> |
| **balDatepickerIsDateNotInRange** | Asserts if the given date is not in range in the datepicker dropdown. | <code>(date: Date): Chainable&#60;JQuery&#62;</code> |

## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-datepicker.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-datepicker)
* [Cypress commands on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/commands)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).


<ClientOnly>
  <docs-component-script tag="balDatepicker"></docs-component-script>
</ClientOnly>
