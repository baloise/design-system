### bal-pagination
 
#### Properties

| Property     | Attribute     | Description                                                      | Type                         | Default |
| ------------ | ------------- | ---------------------------------------------------------------- | ---------------------------- | ------- |
| `align`      | `align`       | Align the buttons to start, center or end                        | `"" `, ` "end" `, ` "start"` | `''`    |
| `disabled`   | `disabled`    | Disables component                                               | `boolean`                    | `false` |
| `interface`  | `interface`   | Defines the layout of the pagination                             | `"" `, ` "small"`            | `''`    |
| `pageRange`  | `page-range`  | Specify the max visible pages before and after the selected page | `number`                     | `2`     |
| `size`       | `size`        | Size of the buttons                                              | `"" `, ` "small"`            | `''`    |
| `sticky`     | `sticky`      | If 'true, the pagination will be sticky to the top               | `boolean`                    | `false` |
| `top`        | `top`         | If sticky, the top position will be determined by this value     | `number`                     | `0`     |
| `totalPages` | `total-pages` | The total amount of pages                                        | `number`                     | `1`     |
| `value`      | `value`       | Current selected page                                            | `number`                     | `1`     |


#### Events

| Event       | Description                         | Type                  |
| ----------- | ----------------------------------- | --------------------- |
| `balChange` | Triggers when a page change happens | `CustomEvent<number>` |


#### Methods

| Method     | Description             | Type                          |
| ---------- | ----------------------- | ----------------------------- |
| `next`     | Go to the next page     | `next() => Promise<void>`     |
| `previous` | Go to the previous page | `previous() => Promise<void>` |
 