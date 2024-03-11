### bal-tabs
 
#### Properties

| Property               | Attribute                | Description                                                                                                                                                             | Type                                                                                             | Default        |
| ---------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------- |
| `accordion`            | `accordion`              | If `true` the tab items can be open and closed                                                                                                                          | `boolean`                                                                                        | `false`        |
| `border`               | `border`                 | If `true` a light border is shown for the tabs.                                                                                                                         | `boolean`                                                                                        | `false`        |
| `clickable`            | `clickable`              | If `true` the tabs or steps can be clicked.                                                                                                                             | `boolean`                                                                                        | `true`         |
| `context`              | `context`                | Defines the layout of the tabs.                                                                                                                                         | `"meta" `, ` "navbar" `, ` "navigation" `, ` undefined`                                          | `undefined`    |
| `debounce`             | `debounce`               | Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`. | `number`                                                                                         | `0`            |
| `expanded`             | `expanded`               | If `true` the field expands over the whole width.                                                                                                                       | `boolean`                                                                                        | `false`        |
| `float`                | `float`                  | <span style="color:red">**[DEPRECATED]**</span> Defines the layout of the tabs. Right only works from the breakpoint high-definition and beyond.<br/><br/>              | `"left" `, ` "right"`                                                                            | `'left'`       |
| `fullwidth`            | `fullwidth`              | If `true` the tabs is a block element and uses 100% of the width                                                                                                        | `boolean`                                                                                        | `false`        |
| `iconPosition`         | `icon-position`          | Defines the layout of the tabs.                                                                                                                                         | `"horizontal" `, ` "vertical"`                                                                   | `'horizontal'` |
| `inverted`             | `inverted`               | If `true` the tabs can be uses on dark background                                                                                                                       | `boolean`                                                                                        | `false`        |
| `optionalTabSelection` | `optional-tab-selection` | If `true` the tabs selected line is optional                                                                                                                            | `boolean`                                                                                        | `false`        |
| `options`              | --                       | Steps can be passed as a property or through HTML markup.                                                                                                               | `BalTabOption[]`                                                                                 | `[]`           |
| `overflow`             | `overflow`               | If `true` the tabs have a carousel if they need more space than provided.                                                                                               | `boolean`                                                                                        | `true`         |
| `selectOnMobile`       | `select-on-mobile`       | If `true` the tabs are shown as a select component on mobile                                                                                                            | `boolean`                                                                                        | `false`        |
| `spaceless`            | `spaceless`              | If `true` the tabs container does not have a padding left or right.                                                                                                     | `boolean`                                                                                        | `false`        |
| `value`                | `value`                  |                                                                                                                                                                         | `string `, ` undefined`                                                                          | `undefined`    |
| `vertical`             | `vertical`               | If `true` tabs are align vertically.                                                                                                                                    | `"mobile" `, ` "tablet" `, ` boolean`                                                            | `false`        |
| `verticalColSize`      | `vertical-col-size`      | The col size of the tabs on vertical mode.                                                                                                                              | `"full" `, ` "half" `, ` "one-quarter" `, ` "one-third" `, ` "three-quarters" `, ` "two-thirds"` | `'one-third'`  |


#### Events

| Event            | Description                              | Type                               |
| ---------------- | ---------------------------------------- | ---------------------------------- |
| `balChange`      | Emitted when the changes has finished.   | `CustomEvent<string \| undefined>` |
| `balDidAnimate`  | Emitted after the animation has finished | `CustomEvent<string \| undefined>` |
| `balWillAnimate` | Emitted before the animation starts      | `CustomEvent<string \| undefined>` |


#### Methods

| Method             | Description                              | Type                                                                    |
| ------------------ | ---------------------------------------- | ----------------------------------------------------------------------- |
| `getOptionByValue` | Find the options properties by its value | `getOptionByValue(value: string) => Promise<BalTabOption \| undefined>` |
| `select`           | Go to tab with the given value           | `select(tab: BalTabOption) => Promise<void>`                            |
 