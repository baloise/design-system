# bal-radio

Select an option from a set

> Two-way binding with `v-model` or `ng-model` is available.

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                     | Type                         | Default        |
| ------------- | -------------- | --------------------------------------------------------------- | ---------------------------- | -------------- |
| `balTabindex` | `bal-tabindex` | The tabindex of the control.                                    | `number`                     | `0`            |
| `checked`     | `checked`      | If `true`, the radio is selected.                               | `boolean`                    | `false`        |
| `disabled`    | `disabled`     | If `true`, the user cannot interact with the checkbox.          | `boolean`                    | `false`        |
| `interface`   | `interface`    | Defines the layout of the radio button                          | `"radio" \| "select-button"` | `'radio'`      |
| `inverted`    | `inverted`     | If `true`, the control works on dark background.                | `boolean`                    | `false`        |
| `label`       | `label`        | The label of the control.                                       | `string`                     | `''`           |
| `name`        | `name`         | The name of the control, which is submitted with the form data. | `string`                     | `this.inputId` |
| `value`       | `value`        | The value of the control.                                       | `string`                     | `''`           |


## Events

| Event      | Description                          | Type                |
| ---------- | ------------------------------------ | ------------------- |
| `balBlur`  | Emitted when the toggle loses focus. | `CustomEvent<void>` |
| `balFocus` | Emitted when the toggle has focus.   | `CustomEvent<void>` |


## Methods

### `setFocus() => Promise<void>`

Sets the focus on the input element.

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [bal-text](../bal-text)

### Graph
```mermaid
graph TD;
  bal-radio --> bal-text
  style bal-radio fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
