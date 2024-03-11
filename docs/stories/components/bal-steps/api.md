### bal-steps
 
#### Properties

| Property    | Attribute   | Description                                                                                                                                                             | Type                    | Default     |
| ----------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ----------- |
| `clickable` | `clickable` | If `true` the tabs or steps can be clicked.                                                                                                                             | `boolean`               | `true`      |
| `debounce`  | `debounce`  | Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`. | `number`                | `0`         |
| `options`   | --          | Steps can be passed as a property or through HTML markup.                                                                                                               | `BalStepOption[]`       | `[]`        |
| `value`     | `value`     | Value of the current active step                                                                                                                                        | `string `, ` undefined` | `undefined` |


#### Events

| Event       | Description                            | Type                               |
| ----------- | -------------------------------------- | ---------------------------------- |
| `balChange` | Emitted when the changes has finished. | `CustomEvent<string \| undefined>` |


#### Methods

| Method             | Description                              | Type                                                                     |
| ------------------ | ---------------------------------------- | ------------------------------------------------------------------------ |
| `getOptionByValue` | Find the options properties by its value | `getOptionByValue(value: string) => Promise<BalStepOption \| undefined>` |
| `select`           | Go to tab with the given value           | `select(step: BalStepOption) => Promise<void>`                           |
 