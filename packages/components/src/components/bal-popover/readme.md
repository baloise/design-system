### bal-popover
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property    | Attribute    | Description                                                                                      | Type                                                                                                                                                                                                                                     | Default          |
| ----------- | ------------ | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `arrow`     | `arrow`      | If `true` a little arrow is added, which points to the trigger element                           | `boolean`                                                                                                                                                                                                                                | `false`          |
| `backdrop`  | `backdrop`   | If `true` a backdrop is added                                                                    | `boolean`                                                                                                                                                                                                                                | `false`          |
| `closable`  | `closable`   | If `true` a outside click can close the popover                                                  | `boolean`                                                                                                                                                                                                                                | `true`           |
| `hint`      | `hint`       | If `true` the popover has max-width on tablet and desktop. On mobile it uses the whole viewport. | `boolean`                                                                                                                                                                                                                                | `false`          |
| `hover`     | `hover`      | If `true` the popover shows on hover                                                             | `boolean`                                                                                                                                                                                                                                | `false`          |
| `mobileTop` | `mobile-top` | If `true` there will be no backdrop                                                              | `boolean`                                                                                                                                                                                                                                | `false`          |
| `offsetX`   | `offset-x`   | Define the offset of the popover content.                                                        | `number`                                                                                                                                                                                                                                 | `0`              |
| `offsetY`   | `offset-y`   | Define the offset of the popover content.                                                        | `number`                                                                                                                                                                                                                                 | `0`              |
| `padding`   | `padding`    | Define padding of the overflow                                                                   | `number`                                                                                                                                                                                                                                 | `0`              |
| `position`  | `position`   | Define the position of the popover content.                                                      | `"auto" `, ` "auto-end" `, ` "auto-start" `, ` "bottom" `, ` "bottom-end" `, ` "bottom-start" `, ` "left" `, ` "left-end" `, ` "left-start" `, ` "right" `, ` "right-end" `, ` "right-start" `, ` "top" `, ` "top-end" `, ` "top-start"` | `'bottom-start'` |
| `tooltip`   | `tooltip`    | If `true` the popover is shown as a tooltip                                                      | `boolean`                                                                                                                                                                                                                                | `false`          |
| `value`     | `value`      | If `true` the popover content is open.                                                           | `boolean`                                                                                                                                                                                                                                | `false`          |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event       | Description                                                         | Type                   |
| ----------- | ------------------------------------------------------------------- | ---------------------- |
| `balChange` | Listen when the popover opens or closes. Returns the current value. | `CustomEvent<boolean>` |


#### Methods

Follow the [Method Usage](https://design.baloise.dev/?path=/docs/implementation-method--page) guide to learn how to call component methods.

##### `dismiss(options?: PopoverPresentOptions) => Promise<void>`

Closes the popover

###### Returns

Type: `Promise<void>`



##### `present(options?: PopoverPresentOptions) => Promise<void>`

Open the popover

###### Returns

Type: `Promise<void>`



##### `toggle(options?: PopoverPresentOptions) => Promise<void>`

Open or closes the popover

###### Returns

Type: `Promise<void>`




 