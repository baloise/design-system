# bal-hint

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                         | Type      | Default   |
| ------------ | ------------- | --------------------------------------------------- | --------- | --------- |
| `closeLabel` | `close-label` | Text for the close button.                          | `string`  | `'Close'` |
| `disabled`   | `disabled`    | If `true`, the user cannot interact with the input. | `boolean` | `false`   |


## Methods

### `close() => Promise<void>`

Closes the hint box.

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

Opens the hint box.

#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`

Toggles the hint box.

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [bal-field-hint](../bal-field-hint)

### Depends on

- [bal-icon](../bal-icon)
- [bal-button](../bal-button)

### Graph
```mermaid
graph TD;
  bal-hint --> bal-icon
  bal-hint --> bal-button
  bal-button --> bal-spinner
  bal-button --> bal-icon
  bal-button --> bal-text
  bal-field-hint --> bal-hint
  style bal-hint fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
