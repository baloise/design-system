# bal-teaser-steps

<!-- START: human documentation top -->

The steps list is useful for tracking progress in multi steps forms or wizards.

::: warning
Only use this component in teasers and not for normal applications. If you need a stepper go to [tabs](/components/bal-tabs.html#stepper).
:::

## Basic

<ClientOnly> <docs-demo-bal-teaser-steps-95></docs-demo-bal-teaser-steps-95></ClientOnly>

```html
<bal-card inverted color="info" teaser>
  <bal-teaser-steps navigation inverted has-back back-label="Übersicht">
    <bal-teaser-step value="step-a" label="Step A" done class="has-text-white">Step A Content</bal-teaser-step>
    <bal-teaser-step value="step-b" label="Step B" active class="has-text-white">Step B Content</bal-teaser-step>
    <bal-teaser-step value="step-c" label="Step C" class="has-text-white">Step C Content</bal-teaser-step>
    <bal-teaser-step value="step-d" label="Step D" disabled class="has-text-white">Step D Content</bal-teaser-step>
    <bal-teaser-step value="step-e" label="Step E" disabled class="has-text-white">Step E Content</bal-teaser-step>
    <bal-teaser-step value="step-f" label="Step F" hidden class="has-text-white">Step F Content</bal-teaser-step>
  </bal-teaser-steps>
</bal-card>
```

## In light theme

The navigation is disabled, so the framework has to do that.

<ClientOnly> <docs-demo-bal-teaser-steps-96></docs-demo-bal-teaser-steps-96></ClientOnly>

```html
<bal-card teaser>
  <bal-teaser-steps id="steps-2">
    <bal-teaser-step value="step-a" label="Step A" done>Step A Content</bal-teaser-step>
    <bal-teaser-step id="step-2" value="step-b" label="One Moment, your premium is being clacluated..." active
      >Step B Content</bal-teaser-step
    >
    <bal-teaser-step value="step-c" label="Step C">Step C Content</bal-teaser-step>
    <bal-teaser-step value="step-d" label="Step D" disabled>Step D Content</bal-teaser-step>
    <bal-teaser-step value="step-e" label="Step E" disabled>Step E Content</bal-teaser-step>
  </bal-teaser-steps>

  <bal-button id="update-label-button">Show Label</bal-button>
</bal-card>
```

## API

### bal-teaser-steps

#### Properties

| Attribute      | Description                                                  | Type      | Default |
| :------------- | :----------------------------------------------------------- | :-------- | :------ |
| **back-label** | Label for back button                                        | `string`  | `''`    |
| **has-back**   | If `true` the steps navigation has back button.              | `boolean` | `false` |
| **hidden**     | If `true` the steps navigation is hidden.                    | `boolean` | `false` |
| **inverted**   | If `true` a the style is ready for a dark background.        | `boolean` | `false` |
| **navigation** | If `true` the navigation is handled by the component         | `boolean` | `false` |
| **show-label** | Hides the navigation circles and adds the step label instead | `boolean` | `false` |

#### Events

| Event                   | Description                               | Type                  |
| :---------------------- | :---------------------------------------- | :-------------------- |
| **balBackClick**        | Emitted when the back button is clicked.  | `void`                |
| **balNavigate**         | Emitted when the link element has clicked | `MouseEvent`          |
| **balTeaserStepChange** | Emitted when the changes has finished.    | `BalTeaserStepOption` |
| **balTeaserStepClick**  | Emitted when the step circle is clicked.  | `BalTeaserStepOption` |

#### Methods

| Method       | Description                    | Signature                                            |
| :----------- | :----------------------------- | :--------------------------------------------------- |
| **`select`** | Go to tab with the given value | `select(step: BalTeaserStepOption) => Promise<void>` |
| **`sync`**   |                                | `sync() => Promise<void>`                            |

### bal-teaser-step

# bal-teaser-step

`bal-teaser-step` is a child component of bal-teaser-steps. This component represents a step.

#### Properties

| Attribute    | Description                                              | Type      | Default |
| :----------- | :------------------------------------------------------- | :-------- | :------ |
| **active**   | Tell's if the step is active and the content is visible. | `boolean` | `false` |
| **disabled** | If `true` the step is disabled.                          | `boolean` | `false` |
| **done**     | If `true` the step is done.                              | `boolean` | `false` |
| **hidden**   | If `true` the step is hidden in the steps navigation.    | `boolean` | `false` |
| **label**    | Label for the step.                                      | `string`  | `''`    |
| **value**    | This is the key of the step.                             | `string`  | `''`    |

#### Methods

| Method           | Description                                | Signature                                      |
| :--------------- | :----------------------------------------- | :--------------------------------------------- |
| **`getOptions`** | Options of the step like label, value etc. | `getOptions() => Promise<BalTeaserStepOption>` |
| **`setActive`**  | Sets the step active.                      | `setActive(active: boolean) => Promise<void>`  |

<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->

## Links

- [Component on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-teaser-steps)

<ClientOnly>
  <docs-component-script tag="balTeaserSteps"></docs-component-script>
</ClientOnly>


## Basic

<ClientOnly>  <docs-demo-bal-teaser-steps-95></docs-demo-bal-teaser-steps-95></ClientOnly>

```html
<bal-card inverted color="info" teaser>
  <bal-teaser-steps navigation inverted has-back back-label="Übersicht">
    <bal-teaser-step value="step-a" label="Step A" done class="has-text-white">Step A Content</bal-teaser-step>
    <bal-teaser-step value="step-b" label="Step B" active class="has-text-white">Step B Content</bal-teaser-step>
    <bal-teaser-step value="step-c" label="Step C" class="has-text-white">Step C Content</bal-teaser-step>
    <bal-teaser-step value="step-d" label="Step D" disabled class="has-text-white">Step D Content</bal-teaser-step>
    <bal-teaser-step value="step-e" label="Step E" disabled class="has-text-white">Step E Content</bal-teaser-step>
    <bal-teaser-step value="step-f" label="Step F" hidden class="has-text-white">Step F Content</bal-teaser-step>
  </bal-teaser-steps>
</bal-card>
```

## In light theme

The navigation is disabled, so the framework has to do that.

<ClientOnly>  <docs-demo-bal-teaser-steps-96></docs-demo-bal-teaser-steps-96></ClientOnly>

```html
<bal-card teaser>
  <bal-teaser-steps id="steps-2">
    <bal-teaser-step value="step-a" label="Step A" done>Step A Content</bal-teaser-step>
    <bal-teaser-step id="step-2" value="step-b" label="One Moment, your premium is being clacluated..." active>Step B Content</bal-teaser-step>
    <bal-teaser-step value="step-c" label="Step C">Step C Content</bal-teaser-step>
    <bal-teaser-step value="step-d" label="Step D" disabled>Step D Content</bal-teaser-step>
    <bal-teaser-step value="step-e" label="Step E" disabled>Step E Content</bal-teaser-step>
  </bal-teaser-steps>

  <bal-button id="update-label-button">Show Label</bal-button>
</bal-card>
```


## API

### bal-teaser-steps

#### Properties

| Attribute      | Description                                                  | Type      | Default |
| :------------- | :----------------------------------------------------------- | :-------- | :------ |
| **back-label** | Label for back button                                        | `string`  | `''`    |
| **has-back**   | If `true` the steps navigation has back button.              | `boolean` | `false` |
| **hidden**     | If `true` the steps navigation is hidden.                    | `boolean` | `false` |
| **inverted**   | If `true` a the style is ready for a dark background.        | `boolean` | `false` |
| **navigation** | If `true` the navigation is handled by the component         | `boolean` | `false` |
| **show-label** | Hides the navigation circles and adds the step label instead | `boolean` | `false` |

#### Events

| Event                   | Description                               | Type                  |
| :---------------------- | :---------------------------------------- | :-------------------- |
| **balBackClick**        | Emitted when the back button is clicked.  | `void`                |
| **balNavigate**         | Emitted when the link element has clicked | `MouseEvent`          |
| **balTeaserStepChange** | Emitted when the changes has finished.    | `BalTeaserStepOption` |
| **balTeaserStepClick**  | Emitted when the step circle is clicked.  | `BalTeaserStepOption` |

#### Methods

| Method       | Description                    | Signature                                            |
| :----------- | :----------------------------- | :--------------------------------------------------- |
| **`select`** | Go to tab with the given value | `select(step: BalTeaserStepOption) => Promise<void>` |
| **`sync`**   |                                | `sync() => Promise<void>`                            |

### bal-teaser-step


# bal-teaser-step

`bal-teaser-step` is a child component of bal-teaser-steps. This component represents a step.

#### Properties

| Attribute    | Description                                              | Type      | Default |
| :----------- | :------------------------------------------------------- | :-------- | :------ |
| **active**   | Tell's if the step is active and the content is visible. | `boolean` | `false` |
| **disabled** | If `true` the step is disabled.                          | `boolean` | `false` |
| **done**     | If `true` the step is done.                              | `boolean` | `false` |
| **hidden**   | If `true` the step is hidden in the steps navigation.    | `boolean` | `false` |
| **label**    | Label for the step.                                      | `string`  | `''`    |
| **value**    | This is the key of the step.                             | `string`  | `''`    |

#### Methods

| Method           | Description                                | Signature                                      |
| :--------------- | :----------------------------------------- | :--------------------------------------------- |
| **`getOptions`** | Options of the step like label, value etc. | `getOptions() => Promise<BalTeaserStepOption>` |
| **`setActive`**  | Sets the step active.                      | `setActive(active: boolean) => Promise<void>`  |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Component on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-teaser-steps)

<ClientOnly>
  <docs-component-script tag="balTeaserSteps"></docs-component-script>
</ClientOnly>


## Basic

<ClientOnly>  <docs-demo-bal-teaser-steps-95></docs-demo-bal-teaser-steps-95></ClientOnly>

```html
<bal-card inverted color="info" teaser>
  <bal-teaser-steps navigation inverted has-back back-label="Übersicht">
    <bal-teaser-step value="step-a" label="Step A" done class="has-text-white">Step A Content</bal-teaser-step>
    <bal-teaser-step value="step-b" label="Step B" active class="has-text-white">Step B Content</bal-teaser-step>
    <bal-teaser-step value="step-c" label="Step C" class="has-text-white">Step C Content</bal-teaser-step>
    <bal-teaser-step value="step-d" label="Step D" disabled class="has-text-white">Step D Content</bal-teaser-step>
    <bal-teaser-step value="step-e" label="Step E" disabled class="has-text-white">Step E Content</bal-teaser-step>
    <bal-teaser-step value="step-f" label="Step F" hidden class="has-text-white">Step F Content</bal-teaser-step>
  </bal-teaser-steps>
</bal-card>
```

## In light theme

The navigation is disabled, so the framework has to do that.

<ClientOnly>  <docs-demo-bal-teaser-steps-96></docs-demo-bal-teaser-steps-96></ClientOnly>

```html
<bal-card teaser>
  <bal-teaser-steps id="steps-2">
    <bal-teaser-step value="step-a" label="Step A" done>Step A Content</bal-teaser-step>
    <bal-teaser-step id="step-2" value="step-b" label="One Moment, your premium is being clacluated..." active>Step B Content</bal-teaser-step>
    <bal-teaser-step value="step-c" label="Step C">Step C Content</bal-teaser-step>
    <bal-teaser-step value="step-d" label="Step D" disabled>Step D Content</bal-teaser-step>
    <bal-teaser-step value="step-e" label="Step E" disabled>Step E Content</bal-teaser-step>
  </bal-teaser-steps>

  <bal-button id="update-label-button">Show Label</bal-button>
</bal-card>
```


## API

### bal-teaser-steps

#### Properties

| Attribute      | Description                                                  | Type      | Default |
| :------------- | :----------------------------------------------------------- | :-------- | :------ |
| **back-label** | Label for back button                                        | `string`  | `''`    |
| **has-back**   | If `true` the steps navigation has back button.              | `boolean` | `false` |
| **hidden**     | If `true` the steps navigation is hidden.                    | `boolean` | `false` |
| **inverted**   | If `true` a the style is ready for a dark background.        | `boolean` | `false` |
| **navigation** | If `true` the navigation is handled by the component         | `boolean` | `false` |
| **show-label** | Hides the navigation circles and adds the step label instead | `boolean` | `false` |

#### Events

| Event                   | Description                               | Type                  |
| :---------------------- | :---------------------------------------- | :-------------------- |
| **balBackClick**        | Emitted when the back button is clicked.  | `void`                |
| **balNavigate**         | Emitted when the link element has clicked | `MouseEvent`          |
| **balTeaserStepChange** | Emitted when the changes has finished.    | `BalTeaserStepOption` |
| **balTeaserStepClick**  | Emitted when the step circle is clicked.  | `BalTeaserStepOption` |

#### Methods

| Method       | Description                    | Signature                                            |
| :----------- | :----------------------------- | :--------------------------------------------------- |
| **`select`** | Go to tab with the given value | `select(step: BalTeaserStepOption) => Promise<void>` |
| **`sync`**   |                                | `sync() => Promise<void>`                            |

### bal-teaser-step


# bal-teaser-step

`bal-teaser-step` is a child component of bal-teaser-steps. This component represents a step.

#### Properties

| Attribute    | Description                                              | Type      | Default |
| :----------- | :------------------------------------------------------- | :-------- | :------ |
| **active**   | Tell's if the step is active and the content is visible. | `boolean` | `false` |
| **disabled** | If `true` the step is disabled.                          | `boolean` | `false` |
| **done**     | If `true` the step is done.                              | `boolean` | `false` |
| **hidden**   | If `true` the step is hidden in the steps navigation.    | `boolean` | `false` |
| **label**    | Label for the step.                                      | `string`  | `''`    |
| **value**    | This is the key of the step.                             | `string`  | `''`    |

#### Methods

| Method           | Description                                | Signature                                      |
| :--------------- | :----------------------------------------- | :--------------------------------------------- |
| **`getOptions`** | Options of the step like label, value etc. | `getOptions() => Promise<BalTeaserStepOption>` |
| **`setActive`**  | Sets the step active.                      | `setActive(active: boolean) => Promise<void>`  |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Component on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-teaser-steps)

<ClientOnly>
  <docs-component-script tag="balTeaserSteps"></docs-component-script>
</ClientOnly>


## Basic

<ClientOnly>  <docs-demo-bal-teaser-steps-95></docs-demo-bal-teaser-steps-95></ClientOnly>

```html
<bal-card inverted color="info" teaser>
  <bal-teaser-steps navigation inverted has-back back-label="Übersicht">
    <bal-teaser-step value="step-a" label="Step A" done class="has-text-white">Step A Content</bal-teaser-step>
    <bal-teaser-step value="step-b" label="Step B" active class="has-text-white">Step B Content</bal-teaser-step>
    <bal-teaser-step value="step-c" label="Step C" class="has-text-white">Step C Content</bal-teaser-step>
    <bal-teaser-step value="step-d" label="Step D" disabled class="has-text-white">Step D Content</bal-teaser-step>
    <bal-teaser-step value="step-e" label="Step E" disabled class="has-text-white">Step E Content</bal-teaser-step>
    <bal-teaser-step value="step-f" label="Step F" hidden class="has-text-white">Step F Content</bal-teaser-step>
  </bal-teaser-steps>
</bal-card>
```

## In light theme

The navigation is disabled, so the framework has to do that.

<ClientOnly>  <docs-demo-bal-teaser-steps-96></docs-demo-bal-teaser-steps-96></ClientOnly>

```html
<bal-card teaser>
  <bal-teaser-steps id="steps-2">
    <bal-teaser-step value="step-a" label="Step A" done>Step A Content</bal-teaser-step>
    <bal-teaser-step id="step-2" value="step-b" label="One Moment, your premium is being clacluated..." active>Step B Content</bal-teaser-step>
    <bal-teaser-step value="step-c" label="Step C">Step C Content</bal-teaser-step>
    <bal-teaser-step value="step-d" label="Step D" disabled>Step D Content</bal-teaser-step>
    <bal-teaser-step value="step-e" label="Step E" disabled>Step E Content</bal-teaser-step>
  </bal-teaser-steps>

  <bal-button id="update-label-button">Show Label</bal-button>
</bal-card>
```


## API

### bal-teaser-steps

#### Properties

| Attribute      | Description                                                  | Type      | Default |
| :------------- | :----------------------------------------------------------- | :-------- | :------ |
| **back-label** | Label for back button                                        | `string`  | `''`    |
| **has-back**   | If `true` the steps navigation has back button.              | `boolean` | `false` |
| **hidden**     | If `true` the steps navigation is hidden.                    | `boolean` | `false` |
| **inverted**   | If `true` a the style is ready for a dark background.        | `boolean` | `false` |
| **navigation** | If `true` the navigation is handled by the component         | `boolean` | `false` |
| **show-label** | Hides the navigation circles and adds the step label instead | `boolean` | `false` |

#### Events

| Event                   | Description                               | Type                  |
| :---------------------- | :---------------------------------------- | :-------------------- |
| **balBackClick**        | Emitted when the back button is clicked.  | `void`                |
| **balNavigate**         | Emitted when the link element has clicked | `MouseEvent`          |
| **balTeaserStepChange** | Emitted when the changes has finished.    | `BalTeaserStepOption` |
| **balTeaserStepClick**  | Emitted when the step circle is clicked.  | `BalTeaserStepOption` |

#### Methods

| Method       | Description                    | Signature                                            |
| :----------- | :----------------------------- | :--------------------------------------------------- |
| **`select`** | Go to tab with the given value | `select(step: BalTeaserStepOption) => Promise<void>` |
| **`sync`**   |                                | `sync() => Promise<void>`                            |

### bal-teaser-step


# bal-teaser-step

`bal-teaser-step` is a child component of bal-teaser-steps. This component represents a step.

#### Properties

| Attribute    | Description                                              | Type      | Default |
| :----------- | :------------------------------------------------------- | :-------- | :------ |
| **active**   | Tell's if the step is active and the content is visible. | `boolean` | `false` |
| **disabled** | If `true` the step is disabled.                          | `boolean` | `false` |
| **done**     | If `true` the step is done.                              | `boolean` | `false` |
| **hidden**   | If `true` the step is hidden in the steps navigation.    | `boolean` | `false` |
| **label**    | Label for the step.                                      | `string`  | `''`    |
| **value**    | This is the key of the step.                             | `string`  | `''`    |

#### Methods

| Method           | Description                                | Signature                                      |
| :--------------- | :----------------------------------------- | :--------------------------------------------- |
| **`getOptions`** | Options of the step like label, value etc. | `getOptions() => Promise<BalTeaserStepOption>` |
| **`setActive`**  | Sets the step active.                      | `setActive(active: boolean) => Promise<void>`  |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Component on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-teaser-steps)

<ClientOnly>
  <docs-component-script tag="balTeaserSteps"></docs-component-script>
</ClientOnly>


## Basic

<ClientOnly>  <docs-demo-bal-teaser-steps-95></docs-demo-bal-teaser-steps-95></ClientOnly>

```html
<bal-card inverted color="info" teaser>
  <bal-teaser-steps navigation inverted has-back back-label="Übersicht">
    <bal-teaser-step value="step-a" label="Step A" done class="has-text-white">Step A Content</bal-teaser-step>
    <bal-teaser-step value="step-b" label="Step B" active class="has-text-white">Step B Content</bal-teaser-step>
    <bal-teaser-step value="step-c" label="Step C" class="has-text-white">Step C Content</bal-teaser-step>
    <bal-teaser-step value="step-d" label="Step D" disabled class="has-text-white">Step D Content</bal-teaser-step>
    <bal-teaser-step value="step-e" label="Step E" disabled class="has-text-white">Step E Content</bal-teaser-step>
    <bal-teaser-step value="step-f" label="Step F" hidden class="has-text-white">Step F Content</bal-teaser-step>
  </bal-teaser-steps>
</bal-card>
```

## In light theme

The navigation is disabled, so the framework has to do that.

<ClientOnly>  <docs-demo-bal-teaser-steps-96></docs-demo-bal-teaser-steps-96></ClientOnly>

```html
<bal-card teaser>
  <bal-teaser-steps id="steps-2">
    <bal-teaser-step value="step-a" label="Step A" done>Step A Content</bal-teaser-step>
    <bal-teaser-step id="step-2" value="step-b" label="One Moment, your premium is being clacluated..." active>Step B Content</bal-teaser-step>
    <bal-teaser-step value="step-c" label="Step C">Step C Content</bal-teaser-step>
    <bal-teaser-step value="step-d" label="Step D" disabled>Step D Content</bal-teaser-step>
    <bal-teaser-step value="step-e" label="Step E" disabled>Step E Content</bal-teaser-step>
  </bal-teaser-steps>

  <bal-button id="update-label-button">Show Label</bal-button>
</bal-card>
```


## API

### bal-teaser-steps

#### Properties

| Attribute      | Description                                                  | Type      | Default |
| :------------- | :----------------------------------------------------------- | :-------- | :------ |
| **back-label** | Label for back button                                        | `string`  | `''`    |
| **has-back**   | If `true` the steps navigation has back button.              | `boolean` | `false` |
| **hidden**     | If `true` the steps navigation is hidden.                    | `boolean` | `false` |
| **inverted**   | If `true` a the style is ready for a dark background.        | `boolean` | `false` |
| **navigation** | If `true` the navigation is handled by the component         | `boolean` | `false` |
| **show-label** | Hides the navigation circles and adds the step label instead | `boolean` | `false` |

#### Events

| Event                   | Description                               | Type                  |
| :---------------------- | :---------------------------------------- | :-------------------- |
| **balBackClick**        | Emitted when the back button is clicked.  | `void`                |
| **balNavigate**         | Emitted when the link element has clicked | `MouseEvent`          |
| **balTeaserStepChange** | Emitted when the changes has finished.    | `BalTeaserStepOption` |
| **balTeaserStepClick**  | Emitted when the step circle is clicked.  | `BalTeaserStepOption` |

#### Methods

| Method       | Description                    | Signature                                            |
| :----------- | :----------------------------- | :--------------------------------------------------- |
| **`select`** | Go to tab with the given value | `select(step: BalTeaserStepOption) => Promise<void>` |
| **`sync`**   |                                | `sync() => Promise<void>`                            |

### bal-teaser-step


# bal-teaser-step

`bal-teaser-step` is a child component of bal-teaser-steps. This component represents a step.

#### Properties

| Attribute    | Description                                              | Type      | Default |
| :----------- | :------------------------------------------------------- | :-------- | :------ |
| **active**   | Tell's if the step is active and the content is visible. | `boolean` | `false` |
| **disabled** | If `true` the step is disabled.                          | `boolean` | `false` |
| **done**     | If `true` the step is done.                              | `boolean` | `false` |
| **hidden**   | If `true` the step is hidden in the steps navigation.    | `boolean` | `false` |
| **label**    | Label for the step.                                      | `string`  | `''`    |
| **value**    | This is the key of the step.                             | `string`  | `''`    |

#### Methods

| Method           | Description                                | Signature                                      |
| :--------------- | :----------------------------------------- | :--------------------------------------------- |
| **`getOptions`** | Options of the step like label, value etc. | `getOptions() => Promise<BalTeaserStepOption>` |
| **`setActive`**  | Sets the step active.                      | `setActive(active: boolean) => Promise<void>`  |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Component on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-teaser-steps)

<ClientOnly>
  <docs-component-script tag="balTeaserSteps"></docs-component-script>
</ClientOnly>


## Basic

<ClientOnly>  <docs-demo-bal-teaser-steps-95></docs-demo-bal-teaser-steps-95></ClientOnly>

```html
<bal-card inverted color="info" teaser>
  <bal-teaser-steps navigation inverted has-back back-label="Übersicht">
    <bal-teaser-step value="step-a" label="Step A" done class="has-text-white">Step A Content</bal-teaser-step>
    <bal-teaser-step value="step-b" label="Step B" active class="has-text-white">Step B Content</bal-teaser-step>
    <bal-teaser-step value="step-c" label="Step C" class="has-text-white">Step C Content</bal-teaser-step>
    <bal-teaser-step value="step-d" label="Step D" disabled class="has-text-white">Step D Content</bal-teaser-step>
    <bal-teaser-step value="step-e" label="Step E" disabled class="has-text-white">Step E Content</bal-teaser-step>
    <bal-teaser-step value="step-f" label="Step F" hidden class="has-text-white">Step F Content</bal-teaser-step>
  </bal-teaser-steps>
</bal-card>
```

## In light theme

The navigation is disabled, so the framework has to do that.

<ClientOnly>  <docs-demo-bal-teaser-steps-96></docs-demo-bal-teaser-steps-96></ClientOnly>

```html
<bal-card teaser>
  <bal-teaser-steps id="steps-2">
    <bal-teaser-step value="step-a" label="Step A" done>Step A Content</bal-teaser-step>
    <bal-teaser-step id="step-2" value="step-b" label="One Moment, your premium is being clacluated..." active>Step B Content</bal-teaser-step>
    <bal-teaser-step value="step-c" label="Step C">Step C Content</bal-teaser-step>
    <bal-teaser-step value="step-d" label="Step D" disabled>Step D Content</bal-teaser-step>
    <bal-teaser-step value="step-e" label="Step E" disabled>Step E Content</bal-teaser-step>
  </bal-teaser-steps>

  <bal-button id="update-label-button">Show Label</bal-button>
</bal-card>
```


## API

### bal-teaser-steps

#### Properties

| Attribute      | Description                                                  | Type      | Default |
| :------------- | :----------------------------------------------------------- | :-------- | :------ |
| **back-label** | Label for back button                                        | `string`  | `''`    |
| **has-back**   | If `true` the steps navigation has back button.              | `boolean` | `false` |
| **hidden**     | If `true` the steps navigation is hidden.                    | `boolean` | `false` |
| **inverted**   | If `true` a the style is ready for a dark background.        | `boolean` | `false` |
| **navigation** | If `true` the navigation is handled by the component         | `boolean` | `false` |
| **show-label** | Hides the navigation circles and adds the step label instead | `boolean` | `false` |

#### Events

| Event                   | Description                               | Type                  |
| :---------------------- | :---------------------------------------- | :-------------------- |
| **balBackClick**        | Emitted when the back button is clicked.  | `void`                |
| **balNavigate**         | Emitted when the link element has clicked | `MouseEvent`          |
| **balTeaserStepChange** | Emitted when the changes has finished.    | `BalTeaserStepOption` |
| **balTeaserStepClick**  | Emitted when the step circle is clicked.  | `BalTeaserStepOption` |

#### Methods

| Method       | Description                    | Signature                                            |
| :----------- | :----------------------------- | :--------------------------------------------------- |
| **`select`** | Go to tab with the given value | `select(step: BalTeaserStepOption) => Promise<void>` |
| **`sync`**   |                                | `sync() => Promise<void>`                            |

### bal-teaser-step


# bal-teaser-step

`bal-teaser-step` is a child component of bal-teaser-steps. This component represents a step.

#### Properties

| Attribute    | Description                                              | Type      | Default |
| :----------- | :------------------------------------------------------- | :-------- | :------ |
| **active**   | Tell's if the step is active and the content is visible. | `boolean` | `false` |
| **disabled** | If `true` the step is disabled.                          | `boolean` | `false` |
| **done**     | If `true` the step is done.                              | `boolean` | `false` |
| **hidden**   | If `true` the step is hidden in the steps navigation.    | `boolean` | `false` |
| **label**    | Label for the step.                                      | `string`  | `''`    |
| **value**    | This is the key of the step.                             | `string`  | `''`    |

#### Methods

| Method           | Description                                | Signature                                      |
| :--------------- | :----------------------------------------- | :--------------------------------------------- |
| **`getOptions`** | Options of the step like label, value etc. | `getOptions() => Promise<BalTeaserStepOption>` |
| **`setActive`**  | Sets the step active.                      | `setActive(active: boolean) => Promise<void>`  |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-teaser-steps.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-teaser-steps)

<ClientOnly>
  <docs-component-script tag="balTeaserSteps"></docs-component-script>
</ClientOnly>


## Basic

<ClientOnly>  <docs-demo-bal-teaser-steps-95></docs-demo-bal-teaser-steps-95></ClientOnly>

```html
<bal-card inverted color="info" teaser>
  <bal-teaser-steps navigation inverted has-back back-label="Übersicht">
    <bal-teaser-step value="step-a" label="Step A" done class="has-text-white">Step A Content</bal-teaser-step>
    <bal-teaser-step value="step-b" label="Step B" active class="has-text-white">Step B Content</bal-teaser-step>
    <bal-teaser-step value="step-c" label="Step C" class="has-text-white">Step C Content</bal-teaser-step>
    <bal-teaser-step value="step-d" label="Step D" disabled class="has-text-white">Step D Content</bal-teaser-step>
    <bal-teaser-step value="step-e" label="Step E" disabled class="has-text-white">Step E Content</bal-teaser-step>
    <bal-teaser-step value="step-f" label="Step F" hidden class="has-text-white">Step F Content</bal-teaser-step>
  </bal-teaser-steps>
</bal-card>
```

## In light theme

The navigation is disabled, so the framework has to do that.

<ClientOnly>  <docs-demo-bal-teaser-steps-96></docs-demo-bal-teaser-steps-96></ClientOnly>

```html
<bal-card teaser>
  <bal-teaser-steps id="steps-2">
    <bal-teaser-step value="step-a" label="Step A" done>Step A Content</bal-teaser-step>
    <bal-teaser-step id="step-2" value="step-b" label="One Moment, your premium is being clacluated..." active>Step B Content</bal-teaser-step>
    <bal-teaser-step value="step-c" label="Step C">Step C Content</bal-teaser-step>
    <bal-teaser-step value="step-d" label="Step D" disabled>Step D Content</bal-teaser-step>
    <bal-teaser-step value="step-e" label="Step E" disabled>Step E Content</bal-teaser-step>
  </bal-teaser-steps>

  <bal-button id="update-label-button">Show Label</bal-button>
</bal-card>
```


## API

### bal-teaser-steps

#### Properties

| Attribute      | Description                                                  | Type      | Default |
| :------------- | :----------------------------------------------------------- | :-------- | :------ |
| **back-label** | Label for back button                                        | `string`  | `''`    |
| **has-back**   | If `true` the steps navigation has back button.              | `boolean` | `false` |
| **hidden**     | If `true` the steps navigation is hidden.                    | `boolean` | `false` |
| **inverted**   | If `true` a the style is ready for a dark background.        | `boolean` | `false` |
| **navigation** | If `true` the navigation is handled by the component         | `boolean` | `false` |
| **show-label** | Hides the navigation circles and adds the step label instead | `boolean` | `false` |

#### Events

| Event                   | Description                               | Type                  |
| :---------------------- | :---------------------------------------- | :-------------------- |
| **balBackClick**        | Emitted when the back button is clicked.  | `void`                |
| **balNavigate**         | Emitted when the link element has clicked | `MouseEvent`          |
| **balTeaserStepChange** | Emitted when the changes has finished.    | `BalTeaserStepOption` |
| **balTeaserStepClick**  | Emitted when the step circle is clicked.  | `BalTeaserStepOption` |

#### Methods

| Method       | Description                    | Signature                                            |
| :----------- | :----------------------------- | :--------------------------------------------------- |
| **`select`** | Go to tab with the given value | `select(step: BalTeaserStepOption) => Promise<void>` |
| **`sync`**   |                                | `sync() => Promise<void>`                            |

### bal-teaser-step


# bal-teaser-step

`bal-teaser-step` is a child component of bal-teaser-steps. This component represents a step.

#### Properties

| Attribute    | Description                                              | Type      | Default |
| :----------- | :------------------------------------------------------- | :-------- | :------ |
| **active**   | Tell's if the step is active and the content is visible. | `boolean` | `false` |
| **disabled** | If `true` the step is disabled.                          | `boolean` | `false` |
| **done**     | If `true` the step is done.                              | `boolean` | `false` |
| **hidden**   | If `true` the step is hidden in the steps navigation.    | `boolean` | `false` |
| **label**    | Label for the step.                                      | `string`  | `''`    |
| **value**    | This is the key of the step.                             | `string`  | `''`    |

#### Methods

| Method           | Description                                | Signature                                      |
| :--------------- | :----------------------------------------- | :--------------------------------------------- |
| **`getOptions`** | Options of the step like label, value etc. | `getOptions() => Promise<BalTeaserStepOption>` |
| **`setActive`**  | Sets the step active.                      | `setActive(active: boolean) => Promise<void>`  |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-teaser-steps.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-teaser-steps)

<ClientOnly>
  <docs-component-script tag="balTeaserSteps"></docs-component-script>
</ClientOnly>


## Basic

<ClientOnly>  <docs-demo-bal-teaser-steps-95></docs-demo-bal-teaser-steps-95></ClientOnly>

```html
<bal-card inverted color="info" teaser>
  <bal-teaser-steps navigation inverted has-back back-label="Übersicht">
    <bal-teaser-step value="step-a" label="Step A" done class="has-text-white">Step A Content</bal-teaser-step>
    <bal-teaser-step value="step-b" label="Step B" active class="has-text-white">Step B Content</bal-teaser-step>
    <bal-teaser-step value="step-c" label="Step C" class="has-text-white">Step C Content</bal-teaser-step>
    <bal-teaser-step value="step-d" label="Step D" disabled class="has-text-white">Step D Content</bal-teaser-step>
    <bal-teaser-step value="step-e" label="Step E" disabled class="has-text-white">Step E Content</bal-teaser-step>
    <bal-teaser-step value="step-f" label="Step F" hidden class="has-text-white">Step F Content</bal-teaser-step>
  </bal-teaser-steps>
</bal-card>
```

## In light theme

The navigation is disabled, so the framework has to do that.

<ClientOnly>  <docs-demo-bal-teaser-steps-96></docs-demo-bal-teaser-steps-96></ClientOnly>

```html
<bal-card teaser>
  <bal-teaser-steps id="steps-2">
    <bal-teaser-step value="step-a" label="Step A" done>Step A Content</bal-teaser-step>
    <bal-teaser-step id="step-2" value="step-b" label="One Moment, your premium is being clacluated..." active>Step B Content</bal-teaser-step>
    <bal-teaser-step value="step-c" label="Step C">Step C Content</bal-teaser-step>
    <bal-teaser-step value="step-d" label="Step D" disabled>Step D Content</bal-teaser-step>
    <bal-teaser-step value="step-e" label="Step E" disabled>Step E Content</bal-teaser-step>
  </bal-teaser-steps>

  <bal-button id="update-label-button">Show Label</bal-button>
</bal-card>
```


## API

### bal-teaser-steps

#### Properties

| Attribute      | Description                                                  | Type      | Default |
| :------------- | :----------------------------------------------------------- | :-------- | :------ |
| **back-label** | Label for back button                                        | `string`  | `''`    |
| **has-back**   | If `true` the steps navigation has back button.              | `boolean` | `false` |
| **hidden**     | If `true` the steps navigation is hidden.                    | `boolean` | `false` |
| **inverted**   | If `true` a the style is ready for a dark background.        | `boolean` | `false` |
| **navigation** | If `true` the navigation is handled by the component         | `boolean` | `false` |
| **show-label** | Hides the navigation circles and adds the step label instead | `boolean` | `false` |

#### Events

| Event                   | Description                               | Type                  |
| :---------------------- | :---------------------------------------- | :-------------------- |
| **balBackClick**        | Emitted when the back button is clicked.  | `void`                |
| **balNavigate**         | Emitted when the link element has clicked | `MouseEvent`          |
| **balTeaserStepChange** | Emitted when the changes has finished.    | `BalTeaserStepOption` |
| **balTeaserStepClick**  | Emitted when the step circle is clicked.  | `BalTeaserStepOption` |

#### Methods

| Method       | Description                    | Signature                                            |
| :----------- | :----------------------------- | :--------------------------------------------------- |
| **`select`** | Go to tab with the given value | `select(step: BalTeaserStepOption) => Promise<void>` |
| **`sync`**   |                                | `sync() => Promise<void>`                            |

### bal-teaser-step


# bal-teaser-step

`bal-teaser-step` is a child component of bal-teaser-steps. This component represents a step.

#### Properties

| Attribute    | Description                                              | Type      | Default |
| :----------- | :------------------------------------------------------- | :-------- | :------ |
| **active**   | Tell's if the step is active and the content is visible. | `boolean` | `false` |
| **disabled** | If `true` the step is disabled.                          | `boolean` | `false` |
| **done**     | If `true` the step is done.                              | `boolean` | `false` |
| **hidden**   | If `true` the step is hidden in the steps navigation.    | `boolean` | `false` |
| **label**    | Label for the step.                                      | `string`  | `''`    |
| **value**    | This is the key of the step.                             | `string`  | `''`    |

#### Methods

| Method           | Description                                | Signature                                      |
| :--------------- | :----------------------------------------- | :--------------------------------------------- |
| **`getOptions`** | Options of the step like label, value etc. | `getOptions() => Promise<BalTeaserStepOption>` |
| **`setActive`**  | Sets the step active.                      | `setActive(active: boolean) => Promise<void>`  |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-teaser-steps.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-teaser-steps)

<ClientOnly>
  <docs-component-script tag="balTeaserSteps"></docs-component-script>
</ClientOnly>


## Basic

<ClientOnly>  <docs-demo-bal-teaser-steps-95></docs-demo-bal-teaser-steps-95></ClientOnly>

```html
<bal-card inverted color="info" teaser>
  <bal-teaser-steps navigation inverted has-back back-label="Übersicht">
    <bal-teaser-step value="step-a" label="Step A" done class="has-text-white">Step A Content</bal-teaser-step>
    <bal-teaser-step value="step-b" label="Step B" active class="has-text-white">Step B Content</bal-teaser-step>
    <bal-teaser-step value="step-c" label="Step C" class="has-text-white">Step C Content</bal-teaser-step>
    <bal-teaser-step value="step-d" label="Step D" disabled class="has-text-white">Step D Content</bal-teaser-step>
    <bal-teaser-step value="step-e" label="Step E" disabled class="has-text-white">Step E Content</bal-teaser-step>
    <bal-teaser-step value="step-f" label="Step F" hidden class="has-text-white">Step F Content</bal-teaser-step>
  </bal-teaser-steps>
</bal-card>
```

## In light theme

The navigation is disabled, so the framework has to do that.

<ClientOnly>  <docs-demo-bal-teaser-steps-96></docs-demo-bal-teaser-steps-96></ClientOnly>

```html
<bal-card teaser>
  <bal-teaser-steps id="steps-2">
    <bal-teaser-step value="step-a" label="Step A" done>Step A Content</bal-teaser-step>
    <bal-teaser-step id="step-2" value="step-b" label="One Moment, your premium is being clacluated..." active>Step B Content</bal-teaser-step>
    <bal-teaser-step value="step-c" label="Step C">Step C Content</bal-teaser-step>
    <bal-teaser-step value="step-d" label="Step D" disabled>Step D Content</bal-teaser-step>
    <bal-teaser-step value="step-e" label="Step E" disabled>Step E Content</bal-teaser-step>
  </bal-teaser-steps>

  <bal-button id="update-label-button">Show Label</bal-button>
</bal-card>
```


## API

### bal-teaser-steps

#### Properties

| Attribute      | Description                                                  | Type      | Default |
| :------------- | :----------------------------------------------------------- | :-------- | :------ |
| **back-label** | Label for back button                                        | `string`  | `''`    |
| **has-back**   | If `true` the steps navigation has back button.              | `boolean` | `false` |
| **hidden**     | If `true` the steps navigation is hidden.                    | `boolean` | `false` |
| **inverted**   | If `true` a the style is ready for a dark background.        | `boolean` | `false` |
| **navigation** | If `true` the navigation is handled by the component         | `boolean` | `false` |
| **show-label** | Hides the navigation circles and adds the step label instead | `boolean` | `false` |

#### Events

| Event                   | Description                               | Type                  |
| :---------------------- | :---------------------------------------- | :-------------------- |
| **balBackClick**        | Emitted when the back button is clicked.  | `void`                |
| **balNavigate**         | Emitted when the link element has clicked | `MouseEvent`          |
| **balTeaserStepChange** | Emitted when the changes has finished.    | `BalTeaserStepOption` |
| **balTeaserStepClick**  | Emitted when the step circle is clicked.  | `BalTeaserStepOption` |

#### Methods

| Method       | Description                    | Signature                                            |
| :----------- | :----------------------------- | :--------------------------------------------------- |
| **`select`** | Go to tab with the given value | `select(step: BalTeaserStepOption) => Promise<void>` |
| **`sync`**   |                                | `sync() => Promise<void>`                            |

### bal-teaser-step


# bal-teaser-step

`bal-teaser-step` is a child component of bal-teaser-steps. This component represents a step.

#### Properties

| Attribute    | Description                                              | Type      | Default |
| :----------- | :------------------------------------------------------- | :-------- | :------ |
| **active**   | Tell's if the step is active and the content is visible. | `boolean` | `false` |
| **disabled** | If `true` the step is disabled.                          | `boolean` | `false` |
| **done**     | If `true` the step is done.                              | `boolean` | `false` |
| **hidden**   | If `true` the step is hidden in the steps navigation.    | `boolean` | `false` |
| **label**    | Label for the step.                                      | `string`  | `''`    |
| **value**    | This is the key of the step.                             | `string`  | `''`    |

#### Methods

| Method           | Description                                | Signature                                      |
| :--------------- | :----------------------------------------- | :--------------------------------------------- |
| **`getOptions`** | Options of the step like label, value etc. | `getOptions() => Promise<BalTeaserStepOption>` |
| **`setActive`**  | Sets the step active.                      | `setActive(active: boolean) => Promise<void>`  |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-teaser-steps.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-teaser-steps)

<ClientOnly>
  <docs-component-script tag="balTeaserSteps"></docs-component-script>
</ClientOnly>


## Basic

<ClientOnly>  <docs-demo-bal-teaser-steps-95></docs-demo-bal-teaser-steps-95></ClientOnly>

```html
<bal-card inverted color="info" teaser>
  <bal-teaser-steps navigation inverted has-back back-label="Übersicht">
    <bal-teaser-step value="step-a" label="Step A" done class="has-text-white">Step A Content</bal-teaser-step>
    <bal-teaser-step value="step-b" label="Step B" active class="has-text-white">Step B Content</bal-teaser-step>
    <bal-teaser-step value="step-c" label="Step C" class="has-text-white">Step C Content</bal-teaser-step>
    <bal-teaser-step value="step-d" label="Step D" disabled class="has-text-white">Step D Content</bal-teaser-step>
    <bal-teaser-step value="step-e" label="Step E" disabled class="has-text-white">Step E Content</bal-teaser-step>
    <bal-teaser-step value="step-f" label="Step F" hidden class="has-text-white">Step F Content</bal-teaser-step>
  </bal-teaser-steps>
</bal-card>
```

## In light theme

The navigation is disabled, so the framework has to do that.

<ClientOnly>  <docs-demo-bal-teaser-steps-96></docs-demo-bal-teaser-steps-96></ClientOnly>

```html
<bal-card teaser>
  <bal-teaser-steps id="steps-2">
    <bal-teaser-step value="step-a" label="Step A" done>Step A Content</bal-teaser-step>
    <bal-teaser-step id="step-2" value="step-b" label="One Moment, your premium is being clacluated..." active>Step B Content</bal-teaser-step>
    <bal-teaser-step value="step-c" label="Step C">Step C Content</bal-teaser-step>
    <bal-teaser-step value="step-d" label="Step D" disabled>Step D Content</bal-teaser-step>
    <bal-teaser-step value="step-e" label="Step E" disabled>Step E Content</bal-teaser-step>
  </bal-teaser-steps>

  <bal-button id="update-label-button">Show Label</bal-button>
</bal-card>
```


## API

### bal-teaser-steps

#### Properties

| Attribute      | Description                                                  | Type      | Default |
| :------------- | :----------------------------------------------------------- | :-------- | :------ |
| **back-label** | Label for back button                                        | `string`  | `''`    |
| **has-back**   | If `true` the steps navigation has back button.              | `boolean` | `false` |
| **hidden**     | If `true` the steps navigation is hidden.                    | `boolean` | `false` |
| **inverted**   | If `true` a the style is ready for a dark background.        | `boolean` | `false` |
| **navigation** | If `true` the navigation is handled by the component         | `boolean` | `false` |
| **show-label** | Hides the navigation circles and adds the step label instead | `boolean` | `false` |

#### Events

| Event                   | Description                               | Type                  |
| :---------------------- | :---------------------------------------- | :-------------------- |
| **balBackClick**        | Emitted when the back button is clicked.  | `void`                |
| **balNavigate**         | Emitted when the link element has clicked | `MouseEvent`          |
| **balTeaserStepChange** | Emitted when the changes has finished.    | `BalTeaserStepOption` |
| **balTeaserStepClick**  | Emitted when the step circle is clicked.  | `BalTeaserStepOption` |

#### Methods

| Method       | Description                    | Signature                                            |
| :----------- | :----------------------------- | :--------------------------------------------------- |
| **`select`** | Go to tab with the given value | `select(step: BalTeaserStepOption) => Promise<void>` |
| **`sync`**   |                                | `sync() => Promise<void>`                            |

### bal-teaser-step


# bal-teaser-step

`bal-teaser-step` is a child component of bal-teaser-steps. This component represents a step.

#### Properties

| Attribute    | Description                                              | Type      | Default |
| :----------- | :------------------------------------------------------- | :-------- | :------ |
| **active**   | Tell's if the step is active and the content is visible. | `boolean` | `false` |
| **disabled** | If `true` the step is disabled.                          | `boolean` | `false` |
| **done**     | If `true` the step is done.                              | `boolean` | `false` |
| **hidden**   | If `true` the step is hidden in the steps navigation.    | `boolean` | `false` |
| **label**    | Label for the step.                                      | `string`  | `''`    |
| **value**    | This is the key of the step.                             | `string`  | `''`    |

#### Methods

| Method           | Description                                | Signature                                      |
| :--------------- | :----------------------------------------- | :--------------------------------------------- |
| **`getOptions`** | Options of the step like label, value etc. | `getOptions() => Promise<BalTeaserStepOption>` |
| **`setActive`**  | Sets the step active.                      | `setActive(active: boolean) => Promise<void>`  |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->
<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-teaser-steps.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-teaser-steps)

<ClientOnly>
  <docs-component-script tag="balTeaserSteps"></docs-component-script>
</ClientOnly>
