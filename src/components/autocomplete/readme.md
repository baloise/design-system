# Autocomplete

The autocomplete is a normal text input enhanced by a panel of suggested options.

```html
<bal-autocomplete expanded>
    <bal-autocomplete-item value="Ant-Man"></bal-autocomplete-item>
    <bal-autocomplete-item value="Black Panter"></bal-autocomplete-item>
    <bal-autocomplete-item value="Black Widow"></bal-autocomplete-item>
    <bal-autocomplete-item value="Captain America"></bal-autocomplete-item>
    <bal-autocomplete-item value="Captain Marvel"></bal-autocomplete-item>
    <bal-autocomplete-item value="Daredevil"></bal-autocomplete-item>
    <bal-autocomplete-item value="Dr. Strange"></bal-autocomplete-item>
    <bal-autocomplete-item value="Hulk"></bal-autocomplete-item>
    <bal-autocomplete-item value="Iron Man"></bal-autocomplete-item>
    <bal-autocomplete-item value="Spider Man"></bal-autocomplete-item>
    <bal-autocomplete-item value="Thor"></bal-autocomplete-item>
    <bal-autocomplete-item value="Wasp"></bal-autocomplete-item>
    <bal-autocomplete-item value="Wolverine"></bal-autocomplete-item>
</bal-autocomplete>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                       | Type      | Default |
| ---------- | ---------- | ------------------------------------------------- | --------- | ------- |
| `disabled` | `disabled` | If `true` the field is disabled                   | `boolean` | `false` |
| `expanded` | `expanded` | If `true` the field expands over the whole width. | `boolean` | `false` |
| `value`    | `value`    | The value of the autocomplete.                    | `string`  | `""`    |


## Events

| Event       | Description                                    | Type                  |
| ----------- | ---------------------------------------------- | --------------------- |
| `balBlur`   | Emitted when the toggle loses focus.           | `CustomEvent<void>`   |
| `balChange` | Emitted when the checked property has changed. | `CustomEvent<string>` |
| `balFocus`  | Emitted when the toggle has focus..            | `CustomEvent<void>`   |


## Methods

### `selectItem(newValue: string) => Promise<void>`

Sets the given value to the input, closes the dropdown and triggers a change event.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
