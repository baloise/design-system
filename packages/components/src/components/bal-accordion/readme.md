### bal-accordion
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property     | Attribute     | Description                                                                                                                                                             | Type      | Default   |
| ------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------- |
| `card`       | `card`        | If `true` the accordion is used on the bottom of a card                                                                                                                 | `boolean` | `false`   |
| `closeIcon`  | `close-icon`  | BalIcon of the close trigger button                                                                                                                                     | `string`  | `'close'` |
| `closeLabel` | `close-label` | Label of the close trigger button                                                                                                                                       | `string`  | `''`      |
| `debounce`   | `debounce`    | Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`. | `number`  | `0`       |
| `openIcon`   | `open-icon`   | BalIcon of the open trigger button                                                                                                                                      | `string`  | `'plus'`  |
| `openLabel`  | `open-label`  | Label of the open trigger button                                                                                                                                        | `string`  | `''`      |
| `value`      | `value`       | If `true` the accordion is open.                                                                                                                                        | `boolean` | `false`   |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event       | Description                                     | Type                   |
| ----------- | ----------------------------------------------- | ---------------------- |
| `balChange` | Emitted when the accordion has opened or closed | `CustomEvent<boolean>` |


#### Methods

Follow the [Method Usage](https://design.baloise.dev/?path=/docs/implementation-method--page) guide to learn how to call component methods.

##### `dismiss() => Promise<void>`

Closes the accordion

###### Returns

Type: `Promise<void>`



##### `present() => Promise<void>`

Opens the accordion

###### Returns

Type: `Promise<void>`



##### `toggle() => Promise<void>`

Triggers the accordion

###### Returns

Type: `Promise<void>`




 