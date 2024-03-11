### bal-progress-bar
 
#### Properties

| Property     | Attribute    | Description                                                                     | Type                  | Default   |
| ------------ | ------------ | ------------------------------------------------------------------------------- | --------------------- | --------- |
| `background` | `background` | The shape color                                                                 | `"grey" `, ` "white"` | `'white'` |
| `value`      | `value`      | The value of the bar in percentage. So min is 0 and 100 would be the max value. | `number`              | `0`       |


#### Methods

| Method          | Description | Type                                                    |
| --------------- | ----------- | ------------------------------------------------------- |
| `configChanged` |             | `configChanged(state: BalConfigState) => Promise<void>` |
 