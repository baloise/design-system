# CardSteps

## Usage

```html
<bal-card-step value="item-a" label="Item A">Hidden Content</bal-card-step>
```

### Activated

```html
<bal-card-step value="item-a" label="Item A" active>Visible Content</bal-card-step>
```


<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                              | Type      | Default |
| ---------- | ---------- | -------------------------------------------------------- | --------- | ------- |
| `active`   | `active`   | Tell's if the step is active and the content is visible. | `boolean` | `false` |
| `bubble`   | `bubble`   | If `true` a small red bubble is added to the step.       | `boolean` | `false` |
| `disabled` | `disabled` | If `true` the step is disabled.                          | `boolean` | `false` |
| `done`     | `done`     | If `true` the step is done.                              | `boolean` | `false` |
| `label`    | `label`    | Label for the step.                                      | `string`  | `''`    |
| `value`    | `value`    | This is the key of the step.                             | `string`  | `''`    |


## Events

| Event                | Description                          | Type               |
| -------------------- | ------------------------------------ | ------------------ |
| `balCardStepChanged` | Emitted when the steps get rendered. | `CustomEvent<any>` |


## Methods

### `getOptions() => Promise<CardStepOptions>`

Options of the step like label, value etc.

#### Returns

Type: `Promise<CardStepOptions>`



### `setActive(active: boolean) => Promise<void>`

Sets the step active.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
