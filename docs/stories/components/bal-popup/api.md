### bal-popup
 
#### Properties

| Property          | Attribute          | Description                                                                        | Type                                                                                                                                                                                       | Default     |
| ----------------- | ------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `active`          | `active`           | If `true` the popup is open.                                                       | `boolean`                                                                                                                                                                                  | `false`     |
| `arrow`           | `arrow`            | If `true`, it shows a little indicator to the trigger element.                     | `boolean`                                                                                                                                                                                  | `false`     |
| `backdrop`        | `backdrop`         | If `true`, a backdrop will be displayed behind the modal.                          | `boolean`                                                                                                                                                                                  | `false`     |
| `backdropDismiss` | `backdrop-dismiss` | If `true`, the modal can be closed with the click outside of the modal             | `boolean`                                                                                                                                                                                  | `false`     |
| `closable`        | `closable`         | If `true`, the modal can be closed with the escape key or the little close button. | `boolean`                                                                                                                                                                                  | `false`     |
| `contentWidth`    | `content-width`    | Defines the width of the content                                                   | `number `, ` undefined`                                                                                                                                                                    | `undefined` |
| `label`           | `label`            | Label or title of the popup element                                                | `string`                                                                                                                                                                                   | `''`        |
| `offset`          | `offset`           | Offset form trigger to popup.                                                      | `number`                                                                                                                                                                                   | `0`         |
| `placement`       | `placement`        | If set it turns a popover into a fullscreen or a drawer on touch devices           | `"bottom" `, ` "bottom-end" `, ` "bottom-start" `, ` "left" `, ` "left-end" `, ` "left-start" `, ` "right" `, ` "right-end" `, ` "right-start" `, ` "top" `, ` "top-end" `, ` "top-start"` | `'bottom'`  |
| `reference`       | `reference`        | Id of the reference element default is the trigger element.                        | `string `, ` undefined`                                                                                                                                                                    | `undefined` |
| `variant`         | `variant`          | Defines the variant / type of popup                                                | `"drawer" `, ` "fullscreen" `, ` "popover"`                                                                                                                                                | `'popover'` |


#### Events

| Event            | Description                                     | Type                   |
| ---------------- | ----------------------------------------------- | ---------------------- |
| `balChange`      | Emitted when the accordion has opened or closed | `CustomEvent<boolean>` |
| `balDidAnimate`  | Emitted after the animation has finished        | `CustomEvent<boolean>` |
| `balWillAnimate` | Emitted before the animation starts             | `CustomEvent<boolean>` |


#### Methods

| Method    | Description        | Type                         |
| --------- | ------------------ | ---------------------------- |
| `dismiss` | Closes the popup   | `dismiss() => Promise<void>` |
| `present` | Opens the popup    | `present() => Promise<void>` |
| `toggle`  | Triggers the popup | `toggle() => Promise<void>`  |
 