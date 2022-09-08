### bal-tabs
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property          | Attribute           | Description                                                                                                                                                             | Type                                                                                             | Default        |
| ----------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------- |
| `border`          | `border`            | If `true` a light border is shown for the tabs.                                                                                                                         | `boolean`                                                                                        | `false`        |
| `clickable`       | `clickable`         | If `true` the tabs or steps can be clicked.                                                                                                                             | `boolean`                                                                                        | `true`         |
| `debounce`        | `debounce`          | Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`. | `number`                                                                                         | `0`            |
| `expanded`        | `expanded`          | If `true` the field expands over the whole width.                                                                                                                       | `boolean`                                                                                        | `false`        |
| `float`           | `float`             | Defines the layout of the tabs.                                                                                                                                         | `"left" `, ` "right"`                                                                            | `'left'`       |
| `fullwidth`       | `fullwidth`         | If `true` the tabs is a block element and uses 100% of the width                                                                                                        | `boolean`                                                                                        | `false`        |
| `iconPosition`    | `icon-position`     | Defines the layout of the tabs.                                                                                                                                         | `"horizontal" `, ` "vertical"`                                                                   | `'horizontal'` |
| `interface`       | `interface`         | Defines the layout of the tabs.                                                                                                                                         | `"meta" `, ` "navbar" `, ` "navigation" `, ` "o-steps" `, ` "steps" `, ` "tabs" `, ` "tabs-sub"` | `'tabs'`       |
| `inverted`        | `inverted`          | If `true` the field expands over the whole width.                                                                                                                       | `boolean`                                                                                        | `false`        |
| `selectOnMobile`  | `select-on-mobile`  | If `true` the tabs are shown as a select component on mobile                                                                                                            | `boolean`                                                                                        | `false`        |
| `spaceless`       | `spaceless`         | If `true` the tabs container does not have a padding left or right.                                                                                                     | `boolean`                                                                                        | `false`        |
| `value`           | `value`             |                                                                                                                                                                         | `string `, ` undefined`                                                                          | `undefined`    |
| `vertical`        | `vertical`          | If `true` tabs are align vertically.                                                                                                                                    | `"mobile" `, ` "tablet" `, ` boolean`                                                            | `false`        |
| `verticalColSize` | `vertical-col-size` | The col size of the tabs on vertical mode.                                                                                                                              | `"full" `, ` "half" `, ` "one-quarter" `, ` "one-third" `, ` "three-quarters" `, ` "two-thirds"` | `'one-third'`  |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event       | Description                            | Type                  |
| ----------- | -------------------------------------- | --------------------- |
| `balChange` | Emitted when the changes has finished. | `CustomEvent<string>` |


#### Methods

Follow the [Method Usage](https://design.baloise.dev/?path=/docs/implementation-method--page) guide to learn how to call component methods.

##### `select(tab: BalTabOption) => Promise<void>`

Go to tab with the given value

###### Returns

Type: `Promise<void>`




 