# Dropdown Option

A basic dropdown option.

## Usage

```html
<bal-dropdown-option value="1" label="Label"></bal-dropdown-option>
```

### Activated

```html
<bal-dropdown-option
  activated="true"
  value="1"
  label="Label"
></bal-dropdown-option>
```

### Highlighted

```html
<bal-dropdown-option
  highlight="bel"
  value="1"
  label="Label"
></bal-dropdown-option>
```

### With Icons

```html
<bal-dropdown-option
  icon="account"
  value="1"
  label="Label"
></bal-dropdown-option>
```

### With a Checkbox

```html
<bal-dropdown-option
  activated
  checkbox
  icon="account"
  value="1"
  label="Label"
></bal-dropdown-option>
<bal-dropdown-option
  checkbox
  icon="account"
  value="1"
  label="Label"
></bal-dropdown-option>
```

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                                       | Type                                    | Default |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------- | --------------------------------------- | ------- |
| `checkbox`  | `checkbox`  |                                                                                                   | `boolean`                               | `false` |
| `focused`   | `focused`   |                                                                                                   | `boolean`                               | `false` |
| `highlight` | `highlight` |                                                                                                   | `string`                                | `""`    |
| `icon`      | `icon`      |                                                                                                   | `string`                                | `""`    |
| `label`     | `label`     | The value of the dropdown item. This value will be returned by the parent <bal-dropdown> element. | `string`                                | `""`    |
| `selected`  | `selected`  |                                                                                                   | `boolean`                               | `false` |
| `value`     | `value`     | The value of the dropdown item. This value will be returned by the parent <bal-dropdown> element. | `boolean \| number \| object \| string` | `false` |


## Methods

### `isHidden() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`




## Dependencies

### Depends on

- [bal-icon](../icon)

### Graph
```mermaid
graph TD;
  bal-dropdown-option --> bal-icon
  style bal-dropdown-option fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
