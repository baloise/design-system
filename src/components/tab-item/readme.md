# Tab-Item

```html
<bal-tab-item value="item-a" label="Item A">Hidden Content</bal-tab-item>
```

## Activated

```html
<bal-tab-item value="item-a" label="Item A" active="true">Visible Content</bal-tab-item>
```


<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                             | Type      | Default |
| ---------- | ---------- | ------------------------------------------------------- | --------- | ------- |
| `active`   | `active`   | Tell's if the tab is active and the content is visible. | `boolean` | `false` |
| `bubble`   | `bubble`   | If `true` a small red bubble is added to the tab.       | `boolean` | `false` |
| `disabled` | `disabled` | If `true` the tab is disabled.                          | `boolean` | `false` |
| `label`    | `label`    | Label for the tab.                                      | `string`  | `""`    |
| `value`    | `value`    | This is the key of the tab.                             | `string`  | `""`    |


## Events

| Event           | Description                         | Type               |
| --------------- | ----------------------------------- | ------------------ |
| `balTabChanged` | Emitted when the tabs get rendered. | `CustomEvent<any>` |


## Methods

### `getOptions() => Promise<TabItemOptions>`

Options of the tab like label, value etc.

#### Returns

Type: `Promise<TabItemOptions>`



### `setActive(active: boolean) => Promise<void>`

Sets the tab active.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
