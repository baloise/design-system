# Autocomplete-Item

A single option of the autocomplete component.

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                      | Type      | Default |
| ------------------ | ------------------- | ------------------------------------------------ | --------- | ------- |
| `activated`        | `activated`         | Highlights the given text in the value.          | `boolean` | `false` |
| `highlightedValue` | `highlighted-value` | Highlights the given text in the value.          | `string`  | `""`    |
| `value`            | `value`             | Value of this item, which is also use as a label | `string`  | `""`    |


## Events

| Event      | Description                       | Type               |
| ---------- | --------------------------------- | ------------------ |
| `balClick` | Click event of the dropdown item. | `CustomEvent<any>` |


## Methods

### `isActive() => Promise<boolean>`

Tell's if the item is activated by selection.

#### Returns

Type: `Promise<boolean>`



### `isDisplayed() => Promise<boolean>`

Tell's if the item is highlighted by the search term.

#### Returns

Type: `Promise<boolean>`



### `isHidden() => Promise<boolean>`

Tell's if the item is activated by selection.

#### Returns

Type: `Promise<boolean>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
