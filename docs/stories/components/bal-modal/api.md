### bal-modal
 
#### Properties

| Property                 | Attribute          | Description                                                                                                      | Type                                              | Default     |
| ------------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ----------- |
| `backdropDismiss`        | `backdrop-dismiss` | If `true`, the modal can be closed with the click outside of the modal                                           | `boolean`                                         | `true`      |
| `component` _(required)_ | `component`        | The component to display inside of the modal.                                                                    | `Function `, ` HTMLElement `, ` null `, ` string` | `undefined` |
| `componentProps`         | --                 | The data to pass to the modal component.                                                                         | `undefined `, ` { [key: string]: any; }`          | `undefined` |
| `cssClass`               | `css-class`        | Additional classes to apply for custom CSS. If multiple classes are provided they should be separated by spaces. | `string `, ` string[] `, ` undefined`             | `undefined` |
| `hasBackdrop`            | `has-backdrop`     | If `true`, a backdrop will be displayed behind the modal.                                                        | `boolean`                                         | `true`      |
| `isClosable`             | `is-closable`      | If `true`, the modal can be closed with the escape key or the little close button.                               | `boolean`                                         | `true`      |
| `modalWidth`             | `modal-width`      | Defines the width of the modal body                                                                              | `number`                                          | `640`       |
| `space`                  | `space`            | Defines the space/padding of the modal                                                                           | `"" `, ` "medium" `, ` "small"`                   | `''`        |


#### Events

| Event                 | Description                             | Type                |
| --------------------- | --------------------------------------- | ------------------- |
| `balModalDidDismiss`  | Emitted after the modal has dismissed.  | `CustomEvent<any>`  |
| `balModalDidPresent`  | Emitted after the modal has presented.  | `CustomEvent<void>` |
| `balModalWillDismiss` | Emitted before the modal has dismissed. | `CustomEvent<any>`  |
| `balModalWillPresent` | Emitted before the modal has presented. | `CustomEvent<void>` |


#### Methods

| Method          | Description                                                  | Type                                                         |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `dismiss`       | Closes the presented modal with the modal controller         | `dismiss(data?: any, role?: string) => Promise<boolean>`     |
| `onDidDismiss`  | Returns a promise that resolves when the modal did dismiss.  | `onDidDismiss<T = any>() => Promise<OverlayEventDetail<T>>`  |
| `onWillDismiss` | Returns a promise that resolves when the modal will dismiss. | `onWillDismiss<T = any>() => Promise<OverlayEventDetail<T>>` |
| `present`       | Presents the modal through the modal controller              | `present() => Promise<void>`                                 |
 