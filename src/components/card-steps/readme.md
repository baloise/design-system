# CardSteps

The steps list is useful for tracking progress in multi steps forms or wizards.

## Usage

```html
<bal-card inverted>
    <bal-card-steps inverted>
      <bal-card-step value="step-a" label="Step A" done class="has-text-white">Step A Content</bal-card-step>
      <bal-card-step value="step-b" label="Step B" active class="has-text-white">Step B Content</bal-card-step>
      <bal-card-step value="step-c" label="Step C" class="has-text-white">Step C Content</bal-card-step>
      <bal-card-step value="step-d" label="Step D" disabled class="has-text-white">Step D Content</bal-card-step>
      <bal-card-step value="step-e" label="Step E" disabled class="has-text-white">Step E Content</bal-card-step>
    </bal-card-steps>
</bal-card>
```

```html
<bal-card>
    <bal-card-steps>
      <bal-card-step value="step-a" label="Step A" done>Step A Content</bal-card-step>
      <bal-card-step value="step-b" label="Step B" active>Step B Content</bal-card-step>
      <bal-card-step value="step-c" label="Step C">Step C Content</bal-card-step>
      <bal-card-step value="step-d" label="Step D" disabled>Step D Content</bal-card-step>
      <bal-card-step value="step-e" label="Step E" disabled>Step E Content</bal-card-step>
    </bal-card-steps>
</bal-card>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                           | Type      | Default |
| ---------- | ---------- | ----------------------------------------------------- | --------- | ------- |
| `inverted` | `inverted` | If `true` a the style is ready for a dark background. | `boolean` | `false` |


## Events

| Event                   | Description                            | Type                           |
| ----------------------- | -------------------------------------- | ------------------------------ |
| `balCardStepsDidChange` | Emitted when the changes has finished. | `CustomEvent<CardStepOptions>` |


## Methods

### `select(value: string) => Promise<void>`

Select a step.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
