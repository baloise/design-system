<!-- docs:child of bal-field -->

# bal-field-hint

`bal-field-hint` is a child component of `bal-field`.

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description              | Type     | Default |
| --------- | --------- | ------------------------ | -------- | ------- |
| `subject` | `subject` | Text of the inputs label | `string` | `''`    |


## Dependencies

### Depends on

- [bal-hint](../bal-hint)
- [bal-hint-title](../bal-hint-title)
- [bal-hint-text](../bal-hint-text)

### Graph
```mermaid
graph TD;
  bal-field-hint --> bal-hint
  bal-field-hint --> bal-hint-title
  bal-field-hint --> bal-hint-text
  bal-hint --> bal-icon
  bal-hint --> bal-button
  bal-button --> bal-spinner
  bal-button --> bal-icon
  bal-button --> bal-text
  style bal-field-hint fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
