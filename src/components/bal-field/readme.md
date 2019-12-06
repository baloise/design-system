# Field

All generic form field, designed for consistency 

## Basic Form Field

```html
<bal-field label="Firstname">
    <input class="input" placeholder="Enter firstname here" />
</bal-field>
```

##  Validation

```html
<bal-field label="Lastname" required validation-message="Field is required">
    <input class="input" placeholder="Enter lastname here" />
</bal-field>
```

## Icons

```html
<bal-field label="Lastname" icon-left="bal-icon-account" icon-right="bal-icon-check">
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


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
