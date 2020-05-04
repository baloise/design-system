# Steps

The steps list is useful for tracking progress in multi steps forms or wizards.

## Usage

```html
<bal-steps>
  <bal-step value="step-a" label="Step A" active>Step A Content</bal-step>
  <bal-step value="step-b" label="Step B">Step B Content</bal-step>
  <bal-step value="step-c" label="Step C" disabled>Step C Content</bal-step>
</bal-steps>
```

<!-- Auto Generated Below -->


## Events

| Event               | Description                            | Type                       |
| ------------------- | -------------------------------------- | -------------------------- |
| `balStepsDidChange` | Emitted when the changes has finished. | `CustomEvent<StepOptions>` |


## Methods

### `select(value: string) => Promise<void>`

Select a step.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
