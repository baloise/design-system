### bal-data-value
 
#### Properties

Follow the [Property Usage](https://design.baloise.dev/?path=/docs/implementation-property--page) guide to learn how to change properties of the component.

| Property    | Attribute   | Description                                                           | Type      | Default |
| ----------- | ----------- | --------------------------------------------------------------------- | --------- | ------- |
| `disabled`  | `disabled`  | If `true` the button will get disabled.                               | `boolean` | `false` |
| `editable`  | `editable`  | If `true` a small button with a edit icon will be shown on the right. | `boolean` | `false` |
| `multiline` | `multiline` | If `true` the text will break and the height of the item increases.   | `boolean` | `false` |


#### Events

Follow the [Event Usage](https://design.baloise.dev/?path=/docs/implementation-event--page) guide to learn how to listen to component events.

| Event      | Description                               | Type                      |
| ---------- | ----------------------------------------- | ------------------------- |
| `balBlur`  | Emitted when the edit button loses focus. | `CustomEvent<void>`       |
| `balClick` | Emitted when the edit button has focus.   | `CustomEvent<MouseEvent>` |
| `balFocus` | Emitted when the edit button has focus.   | `CustomEvent<void>`       |


 