# bal-textarea <Badge text="Two-way binding"/>

<!-- START: human documentation top -->

A textarea allows a user to write and edit large texts.

<!-- END: human documentation top -->

## Basic

<ClientOnly>  <docs-demo-bal-textarea-99></docs-demo-bal-textarea-99></ClientOnly>



## API

### bal-textarea

#### Properties

| Attribute          | Description                                                                                                                                                                      | Type                                                                                       | Default        |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- | :------------- |
| **autocapitalize** | Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.                                                                | `string`                                                                                   | `'none'`       |
| **autofocus**      | This Boolean attribute lets you specify that a form control should have input focus when the page loads.                                                                         | `boolean`                                                                                  | `false`        |
| **bal-tabindex**   | The tabindex of the control.                                                                                                                                                     | `number`                                                                                   | `0`            |
| **clickable**      | If `true` the input gets a clickable cursor style                                                                                                                                | `boolean`                                                                                  | `false`        |
| **cols**           | The visible width of the text control, in average character widths. If it is specified, it must be a positive integer.                                                           | `number , undefined`                                                                       |                |
| **debounce**       | Set the amount of time, in milliseconds, to wait to trigger the `ionChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.          | `number`                                                                                   | `0`            |
| **disabled**       | If `true`, the user cannot interact with the textarea.                                                                                                                           | `boolean`                                                                                  | `false`        |
| **inputmode**      | A hint to the browser for which keyboard to display. Possible values: `"none"`, `"text"`, `"tel"`, `"url"`, `"email"`, `"numeric"`, `"decimal"`, and `"search"`.                 | `"decimal" , "email" , "none" , "numeric" , "search" , "tel" , "text" , "url" , undefined` |                |
| **inverted**       | If `true` this component can be placed on dark background                                                                                                                        | `boolean`                                                                                  | `false`        |
| **max-length**     | If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter. | `number , undefined`                                                                       |                |
| **min-length**     | If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter. | `number , undefined`                                                                       |                |
| **name**           | The name of the control, which is submitted with the form data.                                                                                                                  | `string`                                                                                   | `this.inputId` |
| **placeholder**    | Instructional text that shows before the input has a value.                                                                                                                      | `string , undefined`                                                                       |                |
| **readonly**       | If `true`, the user cannot modify the value.                                                                                                                                     | `boolean`                                                                                  | `false`        |
| **required**       | If `true`, the user must fill in a value before submitting a form.                                                                                                               | `boolean`                                                                                  | `false`        |
| **rows**           | The number of visible text lines for the control.                                                                                                                                | `number , undefined`                                                                       |                |
| **value**          | The value of the textarea.                                                                                                                                                       | `string , undefined`                                                                       | `''`           |
| **wrap**           | Indicates how the control wraps text.                                                                                                                                            | `"hard" , "off" , "soft" , undefined`                                                      |                |

#### Events

| Event           | Description                                | Type            |
| :-------------- | :----------------------------------------- | :-------------- |
| **balBlur**     | Emitted when a keyboard input occurred.    | `FocusEvent`    |
| **balChange**   | Emitted when the input value has changed.. | `string`        |
| **balClick**    | Emitted when the input has clicked.        | `MouseEvent`    |
| **balFocus**    | Emitted when the input has focus.          | `FocusEvent`    |
| **balInput**    | Emitted when a keyboard input occurred.    | `string`        |
| **balKeyPress** | Emitted when a keyboard key has pressed.   | `KeyboardEvent` |

#### Methods

| Method                | Description                                                                                                      | Signature                                           |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------- |
| **`getInputElement`** | Returns the native `<textarea>` element used under the hood.                                                     | `getInputElement() => Promise<HTMLTextAreaElement>` |
| **`setFocus`**        | Sets focus on the native `textarea` in `ion-textarea`. Use this method instead of the global
`textarea.focus()`. | `setFocus() => Promise<void>`                       |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-textarea.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/components/src/components/bal-textarea)

<ClientOnly>
  <docs-component-script tag="balTextarea"></docs-component-script>
</ClientOnly>
