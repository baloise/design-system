# bal-timeinput



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                             | Type      | Default |
| ---------- | ---------- | ------------------------------------------------------- | --------- | ------- |
| `disabled` | `disabled` | If `true` the button is disabled                        | `boolean` | `false` |
| `inverted` | `inverted` | If `true` the timeinput can be used on blue background. | `boolean` | `false` |
| `maxTime`  | `max-time` | Latest date available for selection                     | `string`  | `''`    |
| `minTime`  | `min-time` | Earliest date available for selection                   | `string`  | `''`    |
| `value`    | `value`    | The value of the datepicker with the format `hh:mm`.    | `string`  | `''`    |


## Events

| Event       | Description                                                                                                                                                    | Type                      |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `balBlur`   | Emitted when either the hour or minute input field loses focus.                                                                                                | `CustomEvent<FocusEvent>` |
| `balChange` | Emitted when either the hour or the minute input has changed. It will not be triggert if either hour or time input has never been set (i.e. "--" is selected). | `CustomEvent<string>`     |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
