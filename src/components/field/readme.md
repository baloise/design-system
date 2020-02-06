# Field

All generic form field, designed for consistency 

## Usage

```html
<bal-field label="Firstname">
    <input class="input" placeholder="Enter firstname here" />
</bal-field>
```

###  Validation

```html
<bal-field label="Lastname" required validation-message="Field is required">
    <input class="input" placeholder="Enter lastname here" />
</bal-field>
```

### Icons

```html
<bal-field label="Lastname" icon-left="account" icon-right="check">
    <input class="input" placeholder="Enter lastname here" />
</bal-field>
```


<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                                        | Type      | Default |
| ------------------- | -------------------- | -------------------------------------------------- | --------- | ------- |
| `iconLeft`          | `icon-left`          | Baloise icon for the left side of the input        | `string`  | `""`    |
| `iconRight`         | `icon-right`         | Baloise icon for the right side of the input       | `string`  | `""`    |
| `label`             | `label`              | Label text                                         | `string`  | `""`    |
| `required`          | `required`           | If `true` a asterix (*) is added to the label text | `boolean` | `false` |
| `validationMessage` | `validation-message` | Validation message text                            | `string`  | `""`    |


## Dependencies

### Depends on

- [bal-icon](../icon)

### Graph
```mermaid
graph TD;
  bal-field --> bal-icon
  style bal-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
