# Tabs

Simple responsive horizontal navigation tabs.

## Usage

### Main Navigation

```html
<bal-tabs>
    <bal-tab-item value="tab-a" label="Tab A" active="true">Content of Tab A</bal-tab-item>
    <bal-tab-item value="tab-b" label="Tab B">Content of Tab B</bal-tab-item>
    <bal-tab-item bubble value="tab-c" label="Tab C">Content of Tab C</bal-tab-item>
    <bal-tab-item disabled value="tab-d" label="Tab D">Content of Tab D</bal-tab-item>
    <bal-button slot="action">Schaden melden</bal-button>
</bal-tabs>
```

### Sub Navigation

```html
<bal-tabs rounded>
    <bal-tab-item value="tab-a" label="Tab A" active="true">Content of Tab A</bal-tab-item>
    <bal-tab-item value="tab-b" label="Tab B">Content of Tab B</bal-tab-item>
    <bal-tab-item value="tab-c" label="Tab C">Content of Tab C</bal-tab-item>
</bal-tabs>
```

### Expanded

```html
<bal-tabs rounded expanded>
    <bal-tab-item value="tab-a" label="Tab A" active="true">Content of Tab A</bal-tab-item>
    <bal-tab-item value="tab-b" label="Tab B">Content of Tab B</bal-tab-item>
    <bal-tab-item value="tab-c" label="Tab C">Content of Tab C</bal-tab-item>
</bal-tabs>
```


<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                       | Type      | Default |
| ---------- | ---------- | ------------------------------------------------- | --------- | ------- |
| `expanded` | `expanded` | If `true` the field expands over the whole width. | `boolean` | `false` |
| `rounded`  | `rounded`  | If you want the rounded tab style                 | `boolean` | `false` |


## Events

| Event              | Description                            | Type                          |
| ------------------ | -------------------------------------- | ----------------------------- |
| `balTabsDidChange` | Emitted when the changes has finished. | `CustomEvent<TabItemOptions>` |


## Methods

### `select(value: string) => Promise<void>`

Dropdown a tab by the value of the tab item.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
