# Tabs

Simple responsive horizontal navigation tabs.

```html
<bal-tabs>
    <bal-tab-item value="item-a" label="Item A" active="true">Content of Item A</bal-tab-item>
    <bal-tab-item value="item-b" label="Item B">Content of Item B</bal-tab-item>
    <bal-tab-item value="item-c" label="Item C">Content of Item C</bal-tab-item>
</bal-tabs>
```


<!-- Auto Generated Below -->


## Events

| Event              | Description                            | Type                          |
| ------------------ | -------------------------------------- | ----------------------------- |
| `balTabsDidChange` | Emitted when the changes has finished. | `CustomEvent<TabItemOptions>` |


## Methods

### `select(value: string) => Promise<void>`

Select a tab by the value of the tab item.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
