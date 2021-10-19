---
sidebarDepth: 0
---

# Textarea <Badge text="Two-way binding"/>


<!-- START: human documentation top -->

A textarea allows a user to write and edit large texts.

- [Form Documentation](/components/foundation/form.html)
- [Form Template with a contact form](/components/templates/contact-form.html)
- [Form Usage Angular](/components/getting-started/angular/usage.html#form-validation)
- [Form Usage Vue](/components/getting-started/vue/usage.html#form-validation)

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Basic

<ClientOnly><docs-demo-bal-textarea-113></docs-demo-bal-textarea-113></ClientOnly>



## Code



### Properties


| Attribute          | Description                                                                                                                                                                      | Type                                                                                                  | Default                   |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- | :------------------------ |
| **autocapitalize** | Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.                                                                | <code>string</code>                                                                                   | <code>'none'</code>       |
| **autofocus**      | This Boolean attribute lets you specify that a form control should have input focus when the page loads.                                                                         | <code>boolean</code>                                                                                  | <code>false</code>        |
| **bal-tabindex**   | The tabindex of the control.                                                                                                                                                     | <code>number</code>                                                                                   | <code>0</code>            |
| **clickable**      | If `true` the input gets a clickable cursor style                                                                                                                                | <code>boolean</code>                                                                                  | <code>false</code>        |
| **cols**           | The visible width of the text control, in average character widths. If it is specified, it must be a positive integer.                                                           | <code>number , undefined</code>                                                                       |                           |
| **debounce**       | Set the amount of time, in milliseconds, to wait to trigger the `ionChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.          | <code>number</code>                                                                                   | <code>0</code>            |
| **disabled**       | If `true`, the user cannot interact with the textarea.                                                                                                                           | <code>boolean</code>                                                                                  | <code>false</code>        |
| **inputmode**      | A hint to the browser for which keyboard to display. Possible values: `"none"`, `"text"`, `"tel"`, `"url"`, `"email"`, `"numeric"`, `"decimal"`, and `"search"`.                 | <code>"decimal" , "email" , "none" , "numeric" , "search" , "tel" , "text" , "url" , undefined</code> |                           |
| **inverted**       | If `true` this component can be placed on dark background                                                                                                                        | <code>boolean</code>                                                                                  | <code>false</code>        |
| **max-length**     | If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter. | <code>number , undefined</code>                                                                       |                           |
| **min-length**     | If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter. | <code>number , undefined</code>                                                                       |                           |
| **name**           | The name of the control, which is submitted with the form data.                                                                                                                  | <code>string</code>                                                                                   | <code>this.inputId</code> |
| **placeholder**    | Instructional text that shows before the input has a value.                                                                                                                      | <code>string , undefined</code>                                                                       |                           |
| **readonly**       | If `true`, the user cannot modify the value.                                                                                                                                     | <code>boolean</code>                                                                                  | <code>false</code>        |
| **required**       | If `true`, the user must fill in a value before submitting a form.                                                                                                               | <code>boolean</code>                                                                                  | <code>false</code>        |
| **rows**           | The number of visible text lines for the control.                                                                                                                                | <code>number , undefined</code>                                                                       |                           |
| **value**          | The value of the textarea.                                                                                                                                                       | <code>string , undefined</code>                                                                       | <code>''</code>           |
| **wrap**           | Indicates how the control wraps text.                                                                                                                                            | <code>"hard" , "off" , "soft" , undefined</code>                                                      |                           |

### Events


| Event           | Description                                | Type                       |
| :-------------- | :----------------------------------------- | :------------------------- |
| **balBlur**     | Emitted when a keyboard input occurred.    | <code>FocusEvent</code>    |
| **balChange**   | Emitted when the input value has changed.. | <code>string</code>        |
| **balClick**    | Emitted when the input has clicked.        | <code>MouseEvent</code>    |
| **balFocus**    | Emitted when the input has focus.          | <code>FocusEvent</code>    |
| **balInput**    | Emitted when a keyboard input occurred.    | <code>string</code>        |
| **balKeyPress** | Emitted when a keyboard key has pressed.   | <code>KeyboardEvent</code> |

### Methods


| Method              | Description                                                                                                      | Signature                                                                  |
| :------------------ | :--------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| **getInputElement** | Returns the native `<textarea>` element used under the hood.                                                     | <code>getInputElement() =&#62; Promise&#60;HTMLTextAreaElement&#62;</code> |
| **setFocus**        | Sets focus on the native `textarea` in `ion-textarea`. Use this method instead of the global
`textarea.focus()`. | <code>setFocus() =&#62; Promise&#60;void&#62;</code>                       |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-textarea.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-textarea)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).


<ClientOnly>
  <docs-component-script tag="balTextarea"></docs-component-script>
</ClientOnly>
