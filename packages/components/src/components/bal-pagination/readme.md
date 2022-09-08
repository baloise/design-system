### bal-pagination
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property     | Attribute     | Description                                                      | Type      | Default |
| ------------ | ------------- | ---------------------------------------------------------------- | --------- | ------- |
| `disabled`   | `disabled`    | Disables component                                               | `boolean` | `false` |
| `pageRange`  | `page-range`  | Specify the max visible pages before and after the selected page | `number`  | `2`     |
| `totalPages` | `total-pages` | The total amount of pages                                        | `number`  | `1`     |
| `value`      | `value`       | Current selected page                                            | `number`  | `1`     |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event       | Description                         | Type                  |
| ----------- | ----------------------------------- | --------------------- |
| `balChange` | Triggers when a page change happens | `CustomEvent<number>` |


#### Methods

Follow the [Method Usage](https://design.baloise.dev/?path=/docs/implementation-method--page) guide to learn how to call component methods.

##### `next() => Promise<void>`

Go to the next page

###### Returns

Type: `Promise<void>`



##### `previous() => Promise<void>`

Go to the previous page

###### Returns

Type: `Promise<void>`




 