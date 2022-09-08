### bal-modal
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property                 | Attribute      | Description                                                                                                      | Type                                              | Default     |
| ------------------------ | -------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ----------- |
| `component` _(required)_ | `component`    | The component to display inside of the modal.                                                                    | `Function `, ` HTMLElement `, ` null `, ` string` | `undefined` |
| `componentProps`         | --             | The data to pass to the modal component.                                                                         | `undefined `, ` { [key: string]: any; }`          | `undefined` |
| `cssClass`               | `css-class`    | Additional classes to apply for custom CSS. If multiple classes are provided they should be separated by spaces. | `string `, ` string[] `, ` undefined`             | `undefined` |
| `hasBackdrop`            | `has-backdrop` | If `true`, a backdrop will be displayed behind the modal.                                                        | `boolean`                                         | `true`      |
| `isClosable`             | `is-closable`  | If `true`, the modal can be closed with the escape key or the little close button.                               | `boolean`                                         | `true`      |
| `modalWidth`             | `modal-width`  | Defines the width of the modal body                                                                              | `number`                                          | `640`       |
| `space`                  | `space`        | Defines the space/padding of the modal                                                                           | `"" `, ` "medium" `, ` "small"`                   | `''`        |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event                 | Description                             | Type                                   |
| --------------------- | --------------------------------------- | -------------------------------------- |
| `balModalDidDismiss`  | Emitted after the modal has dismissed.  | `CustomEvent<OverlayEventDetail<any>>` |
| `balModalDidPresent`  | Emitted after the modal has presented.  | `CustomEvent<void>`                    |
| `balModalWillDismiss` | Emitted before the modal has dismissed. | `CustomEvent<OverlayEventDetail<any>>` |
| `balModalWillPresent` | Emitted before the modal has presented. | `CustomEvent<void>`                    |


#### Methods

Follow the [Method Usage](https://design.baloise.dev/?path=/docs/implementation-method--page) guide to learn how to call component methods.

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



##### `present() => Promise<void>`

Presents the modal through the modal controller

###### Returns

Type: `Promise<void>`




 