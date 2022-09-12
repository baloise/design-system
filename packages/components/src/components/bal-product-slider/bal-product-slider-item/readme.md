### bal-product-slider-item
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property      | Attribute      | Description                                                                                                                                                                                                                                                                               | Type                                                                         | Default     |
| ------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ----------- |
| `color`       | `color`        | Color of the background                                                                                                                                                                                                                                                                   | `"green" `, ` "purple" `, ` "red" `, ` "white" `, ` "yellow" `, ` undefined` | `undefined` |
| `download`    | `download`     | This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want). | `string `, ` undefined`                                                      | `undefined` |
| `elementType` | `element-type` | The type of button.                                                                                                                                                                                                                                                                       | `"button" `, ` "reset" `, ` "submit"`                                        | `'button'`  |
| `href`        | `href`         | Specifies the URL of the page the link goes to                                                                                                                                                                                                                                            | `string `, ` undefined`                                                      | `undefined` |
| `label`       | `label`        | Label or title of the product                                                                                                                                                                                                                                                             | `string `, ` undefined`                                                      | `undefined` |
| `name`        | `name`         | The name of the button, which is submitted with the form data.                                                                                                                                                                                                                            | `string `, ` undefined`                                                      | `''`        |
| `rel`         | `rel`          | Specifies the relationship of the target object to the link object. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).                                                                                                    | `string `, ` undefined`                                                      | `undefined` |
| `src`         | `src`          | Src path to the image                                                                                                                                                                                                                                                                     | `string `, ` undefined`                                                      | `undefined` |
| `target`      | `target`       | Specifies where to display the linked URL. Only applies when an `href` is provided.                                                                                                                                                                                                       | `" _parent" `, ` "_blank" `, ` "_self" `, ` "_top"`                          | `'_self'`   |
| `value`       | `value`        | The value of the button, which is submitted with the form data.                                                                                                                                                                                                                           | `number `, ` string `, ` undefined`                                          | `''`        |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event         | Description                                | Type                      |
| ------------- | ------------------------------------------ | ------------------------- |
| `balBlur`     | Emitted when the button loses focus.       | `CustomEvent<void>`       |
| `balFocus`    | Emitted when the button has focus.         | `CustomEvent<void>`       |
| `balNavigate` | Emitted when the link element has clicked. | `CustomEvent<MouseEvent>` |


 