### bal-modal
 
#### Properties

| Property                 | Attribute      | Description                                                                                                      | Type                                              | Default     |
| ------------------------ | -------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ----------- |
| `component` _(required)_ | `component`    | The component to display inside of the modal.                                                                    | `Function `, ` HTMLElement `, ` null `, ` string` | `undefined` |
| `componentProps`         | --             | The data to pass to the modal component.                                                                         | `undefined `, ` { [key: string]: any; }`          | `undefined` |
| `cssClass`               | `css-class`    | Additional classes to apply for custom CSS. If multiple classes are provided they should be separated by spaces. | `string `, ` string[] `, ` undefined`             | `undefined` |
| `hasBackdrop`            | `has-backdrop` | If `true`, a backdrop will be displayed behind the modal.                                                        | `boolean`                                         | `true`      |
| `interface`              | `interface`    | Defines the look of the modal. The card interface should be used for scrollable content in the modal.            | `"card" `, ` "light"`                             | `'light'`   |
| `isClosable`             | `is-closable`  | If `true`, the modal can be closed with the escape key or the little close button.                               | `boolean`                                         | `true`      |
| `modalWidth`             | `modal-width`  | Defines the width of the modal body                                                                              | `number`                                          | `640`       |


#### Events

| Event                 | Description                             | Type                                   |
| --------------------- | --------------------------------------- | -------------------------------------- |
| `balModalDidDismiss`  | Emitted after the modal has dismissed.  | `CustomEvent<OverlayEventDetail<any>>` |
| `balModalDidPresent`  | Emitted after the modal has presented.  | `CustomEvent<void>`                    |
| `balModalWillDismiss` | Emitted before the modal has dismissed. | `CustomEvent<OverlayEventDetail<any>>` |
| `balModalWillPresent` | Emitted before the modal has presented. | `CustomEvent<void>`                    |


#### Methods

##### `close() => Promise<void>`

Closes the modal.

###### Returns

Type: `Promise<void>`



##### `dismiss(data?: any, role?: string | undefined) => Promise<boolean>`

Closes the presented modal with the modal controller

###### Returns

Type: `Promise<boolean>`



##### `onDidDismiss<T = any>() => Promise<OverlayEventDetail<T>>`

Returns a promise that resolves when the modal did dismiss.

###### Returns

Type: `Promise<OverlayEventDetail<T>>`



##### `onWillDismiss<T = any>() => Promise<OverlayEventDetail<T>>`

Returns a promise that resolves when the modal will dismiss.

###### Returns

Type: `Promise<OverlayEventDetail<T>>`



##### `open() => Promise<void>`

Opens the modal.

###### Returns

Type: `Promise<void>`



##### `present() => Promise<void>`

Presents the modal through the modal controller

###### Returns

Type: `Promise<void>`




 