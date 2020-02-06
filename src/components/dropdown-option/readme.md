# Dropdown Option

A basic dropdown option.

## Usage

```html
<bal-dropdown-option value="1" label="Label"></bal-dropdown-option>
```

### Activated

```html
<bal-dropdown-option activated="true" value="1" label="Label"></bal-dropdown-option>
```

### Highlighted

```html
<bal-dropdown-option highlight="bel" value="1" label="Label"></bal-dropdown-option>
```


<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                                       | Type                                    | Default |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------- | --------------------------------------- | ------- |
| `activated` | `activated` | TODO: Describe                                                                                    | `boolean`                               | `false` |
| `highlight` | `highlight` | TODO: Describe                                                                                    | `string`                                | `""`    |
| `label`     | `label`     | The value of the dropdown item. This value will be returned by the parent <bal-dropdown> element. | `string`                                | `""`    |
| `value`     | `value`     | The value of the dropdown item. This value will be returned by the parent <bal-dropdown> element. | `boolean \| number \| object \| string` | `false` |


## Methods

### `isHidden() => Promise<boolean>`

Tell's if the item is activated by selection.

#### Returns

Type: `Promise<boolean>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
