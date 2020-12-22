<!-- docs:child of bal-select -->

# bal-select-option



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                       | Type      | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `checkbox` | `checkbox` | If `true` the option has a checkbox                                                               | `boolean` | `false`     |
| `focused`  | `focused`  | If `true` the option is focused                                                                   | `boolean` | `false`     |
| `hidden`   | `hidden`   | If `true` the option is hidden                                                                    | `boolean` | `true`      |
| `icon`     | `icon`     | Baloise icon as a prefix                                                                          | `string`  | `''`        |
| `label`    | `label`    | Label will be shown in the input element when it got selected                                     | `string`  | `undefined` |
| `selected` | `selected` | If `true` the option is selected                                                                  | `boolean` | `false`     |
| `value`    | `value`    | The value of the dropdown item. This value will be returned by the parent <bal-dropdown> element. | `string`  | `undefined` |


## Methods

### `getOption() => Promise<BalOptionValue<any>>`



#### Returns

Type: `Promise<BalOptionValue<any>>`




## Dependencies

### Depends on

- [bal-checkbox](../bal-checkbox)

### Graph
```mermaid
graph TD;
  bal-select-option --> bal-checkbox
  bal-checkbox --> bal-text
  style bal-select-option fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
