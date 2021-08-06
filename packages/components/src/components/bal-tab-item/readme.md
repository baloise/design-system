<!-- docs:child of bal-tabs -->

# Tab Item

`bal-tab-item` is a child component of `bal-tabs`.

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                             | Type      | Default |
| ---------- | ---------- | ------------------------------------------------------- | --------- | ------- |
| `active`   | `active`   | Tell's if the tab is active and the content is visible. | `boolean` | `false` |
| `bubble`   | `bubble`   | If `true` a small red bubble is added to the tab.       | `boolean` | `false` |
| `disabled` | `disabled` | If `true` the tab is disabled.                          | `boolean` | `false` |
| `done`     | `done`     | If `true` the step is marked as done.                   | `boolean` | `false` |
| `failed`   | `failed`   | If `true` the step is marked as failed.                 | `boolean` | `false` |
| `href`     | `href`     | Link to path.                                           | `string`  | `''`    |
| `label`    | `label`    | Label for the tab.                                      | `string`  | `''`    |
| `prevent`  | `prevent`  | Tell's if the linking is done by a router.              | `boolean` | `false` |
| `value`    | `value`    | This is the key of the tab.                             | `string`  | `''`    |


## Events

| Event         | Description                               | Type                      |
| ------------- | ----------------------------------------- | ------------------------- |
| `balNavigate` | Emitted when the link element has clicked | `CustomEvent<MouseEvent>` |


## Methods

### `getOptions() => Promise<BalTabOption>`

Options of the tab like label, value etc.

#### Returns

Type: `Promise<BalTabOption>`



### `setActive(active: boolean) => Promise<void>`

Sets the tab active.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
