<!-- docs:child of bal-teaser-steps -->

# bal-teaser-step

`bal-teaser-step` is a child component of bal-teaser-steps. This component represents a step.

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                              | Type      | Default |
| ---------- | ---------- | -------------------------------------------------------- | --------- | ------- |
| `active`   | `active`   | Tell's if the step is active and the content is visible. | `boolean` | `false` |
| `disabled` | `disabled` | If `true` the step is disabled.                          | `boolean` | `false` |
| `done`     | `done`     | If `true` the step is done.                              | `boolean` | `false` |
| `hidden`   | `hidden`   | If `true` the step is hidden in the steps navigation.    | `boolean` | `false` |
| `label`    | `label`    | Label for the step.                                      | `string`  | `''`    |
| `value`    | `value`    | This is the key of the step.                             | `string`  | `''`    |


## Methods

### `getOptions() => Promise<BalTeaserStepOption>`

Options of the step like label, value etc.

#### Returns

Type: `Promise<BalTeaserStepOption>`



### `setActive(active: boolean) => Promise<void>`

Sets the step active.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
