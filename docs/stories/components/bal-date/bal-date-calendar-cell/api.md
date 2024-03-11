### bal-date-calendar-cell
 
#### Properties

| Property                | Attribute   | Description                                                                | Type                    | Default     |
| ----------------------- | ----------- | -------------------------------------------------------------------------- | ----------------------- | ----------- |
| `day`                   | `day`       | PUBLIC PROPERTY API ------------------------------------------------------ | `number `, ` undefined` | `undefined` |
| `disabled`              | `disabled`  |                                                                            | `boolean`               | `false`     |
| `fullDate` _(required)_ | `full-date` |                                                                            | `string`                | `undefined` |
| `isoDate` _(required)_  | `iso-date`  |                                                                            | `string`                | `undefined` |
| `month`                 | `month`     |                                                                            | `number `, ` undefined` | `undefined` |
| `selected`              | `selected`  |                                                                            | `boolean`               | `false`     |
| `today`                 | `today`     |                                                                            | `boolean`               | `false`     |
| `year`                  | `year`      |                                                                            | `number `, ` undefined` | `undefined` |


#### Events

| Event          | Description                         | Type                               |
| -------------- | ----------------------------------- | ---------------------------------- |
| `balSelectDay` | Emitted when a option got selected. | `CustomEvent<string \| undefined>` |


 