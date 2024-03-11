### bal-popover
 
#### Properties

| Property      | Attribute      | Description                                                                                      | Type                                                                                                                                                                                                                                     | Default          |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `active`      | `active`       | If `true` the popover content is open.                                                           | `boolean`                                                                                                                                                                                                                                | `false`          |
| `arrow`       | `arrow`        | If `true` a little arrow is added, which points to the trigger element                           | `boolean`                                                                                                                                                                                                                                | `false`          |
| `autoTrigger` | `auto-trigger` | If `true` the popover automatically opens on a click                                             | `boolean`                                                                                                                                                                                                                                | `false`          |
| `backdrop`    | `backdrop`     | If `true` a backdrop is added                                                                    | `boolean`                                                                                                                                                                                                                                | `false`          |
| `hint`        | `hint`         | If `true` the popover has max-width on tablet and desktop. On mobile it uses the whole viewport. | `boolean`                                                                                                                                                                                                                                | `false`          |
| `hover`       | `hover`        | If `true` the popover shows on hover                                                             | `boolean`                                                                                                                                                                                                                                | `false`          |
| `mobileTop`   | `mobile-top`   | If `true` there will be no backdrop                                                              | `boolean`                                                                                                                                                                                                                                | `false`          |
| `offsetX`     | `offset-x`     | Define the offset of the popover content.                                                        | `number`                                                                                                                                                                                                                                 | `0`              |
| `offsetY`     | `offset-y`     | Define the offset of the popover content.                                                        | `number`                                                                                                                                                                                                                                 | `0`              |
| `padding`     | `padding`      | Define padding of the overflow                                                                   | `number`                                                                                                                                                                                                                                 | `0`              |
| `position`    | `position`     | Define the position of the popover content.                                                      | `"auto" `, ` "auto-end" `, ` "auto-start" `, ` "bottom" `, ` "bottom-end" `, ` "bottom-start" `, ` "left" `, ` "left-end" `, ` "left-start" `, ` "right" `, ` "right-end" `, ` "right-start" `, ` "top" `, ` "top-end" `, ` "top-start"` | `'bottom-start'` |
| `tooltip`     | `tooltip`      | If `true` the popover is shown as a tooltip                                                      | `boolean`                                                                                                                                                                                                                                | `false`          |


#### Events

| Event            | Description                                                         | Type                   |
| ---------------- | ------------------------------------------------------------------- | ---------------------- |
| `balChange`      | Listen when the popover opens or closes. Returns the current value. | `CustomEvent<boolean>` |
| `balDidAnimate`  | Emitted after the animation has finished                            | `CustomEvent<boolean>` |
| `balWillAnimate` | Emitted before the animation starts                                 | `CustomEvent<boolean>` |


#### Methods

| Method    | Description                | Type                                                        |
| --------- | -------------------------- | ----------------------------------------------------------- |
| `dismiss` | Closes the popover         | `dismiss(options?: PopoverPresentOptions) => Promise<void>` |
| `present` | Open the popover           | `present(options?: PopoverPresentOptions) => Promise<void>` |
| `toggle`  | Open or closes the popover | `toggle(options?: PopoverPresentOptions) => Promise<void>`  |
 