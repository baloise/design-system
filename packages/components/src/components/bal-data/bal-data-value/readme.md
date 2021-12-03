### bal-data-value
 
#### Properties

| Property   | Attribute  | Description                                                           | Type      | Default |
| ---------- | ---------- | --------------------------------------------------------------------- | --------- | ------- |
| `disabled` | `disabled` | If `true` the button will get disabled.                               | `boolean` | `false` |
| `editable` | `editable` | If `true` a small button with a edit icon will be shown on the right. | `boolean` | `false` |


#### Events

| Event      | Description                               | Type                      |
| ---------- | ----------------------------------------- | ------------------------- |
| `balBlur`  | Emitted when the edit button loses focus. | `CustomEvent<void>`       |
| `balClick` | Emitted when the edit button has focus.   | `CustomEvent<MouseEvent>` |
| `balFocus` | Emitted when the edit button has focus.   | `CustomEvent<void>`       |


 