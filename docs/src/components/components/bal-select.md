# bal-select <Badge text="Two-way binding"/>

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

```html
<bal-select expanded id="bal-select-year" placeholder="Try finding a year" data-test-id="select">
  <bal-select-option value="v1995" label="1995">1995</bal-select-option>
  <bal-select-option value="v1996" label="1996">1996</bal-select-option>
  <bal-select-option value="v1997" label="1997">1997</bal-select-option>
  <bal-select-option value="v1998" label="1998">1998</bal-select-option>
  <bal-select-option value="v1999" label="1999">1999</bal-select-option>
  <bal-select-option value="v2000" label="2000">2000</bal-select-option>
</bal-select>
<br>
<p id="bal-select-year-preview"></p>
<bal-button color="success" id="bal-select-year-add">Add</bal-button>
<bal-button color="danger" id="bal-select-year-remove">Remove</bal-button>
```

### Typeahead

<ClientOnly>  <docs-demo-bal-select-77></docs-demo-bal-select-77></ClientOnly>

```html
<div class="has-background-blue has-padding">
  <bal-select id="bal-select-typeahaed" typeahead inverted expanded placeholder="Try finding your hero" no-data-label="No option available">
    <bal-select-option value="BlackWidow" label="Black Widow">
      <b style="display: block">Black Widow</b>
      <span>S.H.I.E.L.D.</span>
    </bal-select-option>
    <bal-select-option value="BlackPanter" label="Black Panter">
      <b style="display: block">Black Panter</b>
      <span>Wakanda</span>
    </bal-select-option>
    <bal-select-option value="IronMan" label="Iron Man">
      <b style="display: block">Iron Man</b>
      <span>Malibu</span>
    </bal-select-option>
    <bal-select-option value="SpiderMan" label="Spider Man">
      <b style="display: block">Spider Man</b>
      <span>Queens</span>
    </bal-select-option>
    <bal-select-option value="CaptainAmerica" label="Captain America">
      <b style="display: block">Captain America</b>
      <span>Broklyn</span>
    </bal-select-option>
    <bal-select-option value="Thor" label="Thor God of Thunder">
      <b style="display: block">Thor God of Thunder</b>
      <span>Asgard</span>
    </bal-select-option>
  </bal-select>
  <br>
  <p id="bal-select-typeahead-preview" class="has-text-white"></p>
  <bal-button id="bal-select-typeahead-trigger" inverted color="primary">Select Spider Man</bal-button>
  <bal-button id="bal-select-typeahead-clear" inverted outlined color="info">Clear & Focus</bal-button>
</div>
```

### Multi-Select

<ClientOnly>  <docs-demo-bal-select-78></docs-demo-bal-select-78></ClientOnly>

```html
<bal-select multiple expanded placeholder="Try finding your hero">
  <bal-select-option checkbox value="BlackWidow" label="Black Widow">
    <b style="display: block">Black Widow</b>
    <span>S.H.I.E.L.D.</span>
  </bal-select-option>
  <bal-select-option checkbox value="BlackPanter" label="Black Panter">
    <b style="display: block">Black Panter</b>
    <span>Wakanda</span>
  </bal-select-option>
  <bal-select-option checkbox value="IronMan" label="Iron Man">
    <b style="display: block">Iron Man</b>
    <span>Malibu</span>
  </bal-select-option>
  <bal-select-option checkbox value="SpiderMan" label="Spider Man">
    <b style="display: block">Spider Man</b>
    <span>Queens</span>
  </bal-select-option>
  <bal-select-option checkbox value="CaptainAmerica" label="Captain America">
    <b style="display: block">Captain America</b>
    <span>Broklyn</span>
  </bal-select-option>
  <bal-select-option checkbox value="Thor" label="Thor God of Thunder">
    <b style="display: block">Thor God of Thunder</b>
    <span>Asgard</span>
  </bal-select-option>
</bal-select>
```

### Multi-Select with typeahead

<ClientOnly>  <docs-demo-bal-select-79></docs-demo-bal-select-79></ClientOnly>

```html
<bal-select multiple typeahead expanded placeholder="Try finding your hero" no-data-label="No option available">
  <bal-select-option checkbox value="BlackWidow" label="Black Widow">
    <b style="display: block">Black Widow</b>
    <span>S.H.I.E.L.D.</span>
  </bal-select-option>
  <bal-select-option checkbox value="BlackPanter" label="Black Panter">
    <b style="display: block">Black Panter</b>
    <span>Wakanda</span>
  </bal-select-option>
  <bal-select-option checkbox value="IronMan" label="Iron Man">
    <b style="display: block">Iron Man</b>
    <span>Malibu</span>
  </bal-select-option>
  <bal-select-option checkbox value="SpiderMan" label="Spider Man">
    <b style="display: block">Spider Man</b>
    <span>Queens</span>
  </bal-select-option>
  <bal-select-option checkbox value="CaptainAmerica" label="Captain America">
    <b style="display: block">Captain America</b>
    <span>Broklyn</span>
  </bal-select-option>
  <bal-select-option checkbox value="Thor" label="Thor God of Thunder">
    <b style="display: block">Thor God of Thunder</b>
    <span>Asgard</span>
  </bal-select-option>
</bal-select>
```

### Remote Typeahead

<ClientOnly>  <docs-demo-bal-select-80></docs-demo-bal-select-80></ClientOnly>

```html
<bal-field id="bal-field-remote" expanded>
  <bal-field-label>Canton</bal-field-label>
  <bal-field-control>
    <bal-select id="bal-select-remote" typeahead expanded placeholder="Try finding your canton"></bal-select>
  </bal-field-control>
  <bal-field-message id="bal-select-remote-preview"></bal-field-message>
</bal-field>
```


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

| Method         | Description                                               | Signature                                 |
| :------------- | :-------------------------------------------------------- | :---------------------------------------- |
| **`cancel`**   | Cancel the dropdown                                       | `cancel() => Promise<void>`               |
| **`clear`**    | Sets the value to null and resets the value of the input. | `clear(force?: boolean) => Promise<void>` |
| **`close`**    | Closes the dropdown                                       | `close() => Promise<void>`                |
| **`open`**     | Opens the dropdown                                        | `open() => Promise<void>`                 |
| **`setFocus`** | Sets the focus on the input element                       | `setFocus() => Promise<void>`             |

### bal-select-option


# bal-select-option



#### Properties

| Attribute    | Description                                                                                       | Type                 | Default |
| :----------- | :------------------------------------------------------------------------------------------------ | :------------------- | :------ |
| **checkbox** | If `true` the option has a checkbox                                                               | `boolean`            | `false` |
| **focused**  | If `true` the option is focused                                                                   | `boolean`            | `false` |
| **hidden**   | If `true` the option is hidden                                                                    | `boolean`            | `false` |
| **label**    | Label will be shown in the input element when it got selected                                     | `string , undefined` |         |
| **selected** | If `true` the option is selected                                                                  | `boolean`            | `false` |
| **value**    | The value of the select option. This value will be returned by the parent `<bal-select>` element. | `string , undefined` |         |

## Testing

### SelectAccessor

SelectAccessor is a helper object for E-2-E testing.
It maps the select behaviour to the `bal-select` ui component.

```typescript
import { dataTestSelector, SelectAccessor } from '@baloise/ui-library-testing'

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
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-select)
* [Accessor on Github](https://github.com/baloise/ui-library/blob/master/packages/testing/src/accessors/select.accessor.ts)

<ClientOnly>
  <docs-component-script tag="balSelect"></docs-component-script>
</ClientOnly>
