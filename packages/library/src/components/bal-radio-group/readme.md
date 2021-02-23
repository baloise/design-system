<!-- docs:child of bal-radio -->

# bal-radio-group

`bal-radio-group` is a child component of `bal-radio` that groups radio buttons together.

> Two-way binding with `v-model` or `ng-model` is available.

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                     | Type                         | Default        |
| ----------- | ----------- | --------------------------------------------------------------- | ---------------------------- | -------------- |
| `interface` | `interface` | Defines the layout of the radio button                          | `"radio" \| "select-button"` | `'radio'`      |
| `inverted`  | `inverted`  | If `true` the component can be used on dark background          | `boolean`                    | `false`        |
| `name`      | `name`      | The name of the control, which is submitted with the form data. | `string`                     | `this.inputId` |
| `value`     | `value`     | The value of the control.                                       | `string`                     | `''`           |


## Events

| Event       | Description                                    | Type                  |
| ----------- | ---------------------------------------------- | --------------------- |
| `balChange` | Emitted when the checked property has changed. | `CustomEvent<string>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
