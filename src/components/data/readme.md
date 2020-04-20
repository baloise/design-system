# Data List

The component `bal-data` displays key-value pairs.

## Usage

```html
<bal-data border>
  <bal-data-item>
    <bal-data-label>Tony</bal-data-label>
    <bal-data-value>Stark</bal-data-value>
  </bal-data-item>
  <bal-data-item>
    <bal-data-label required>Steve</bal-data-label>
    <bal-data-value>Rogers</bal-data-value>
  </bal-data-item>
  <bal-data-item disabled>
    <bal-data-label>Nick</bal-data-label>
    <bal-data-value>Fury</bal-data-value>
  </bal-data-item>
  <bal-data-item>
    <bal-data-label>
      Peter
      <bal-hint>
        <bal-hint-title>Spider-Man</bal-hint-title>
        <bal-hint-text>
          Spider-Man is a fictional superhero created by writer-editor Stan Lee
          and writer-artist Steve Ditko. He first appeared in the anthology
          comic book Amazing Fantasy #15 (August 1962) in the Silver Age of
          Comic Books. He appears in American comic books published by Marvel
          Comics, as well as in a number of movies, television shows, and video
          game adaptations set in the Marvel Universe.
        </bal-hint-text>
      </bal-hint>
    </bal-data-label>
    <bal-data-value>Parker</bal-data-value>
  </bal-data-item>
</bal-data>
```

### Horizontal

```html
<bal-data horizontal>
  <bal-data-item>
    <bal-data-label>Tony</bal-data-label>
    <bal-data-value>Stark</bal-data-value>
  </bal-data-item>
  <bal-data-item>
    <bal-data-label>Steve</bal-data-label>
    <bal-data-value>Rogers</bal-data-value>
  </bal-data-item>
  <bal-data-item>
    <bal-data-label>Stephen</bal-data-label>
    <bal-data-value>Strange</bal-data-value>
  </bal-data-item>
</bal-data>
```

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                | Type      | Default |
| ------------ | ------------ | ---------------------------------------------------------- | --------- | ------- |
| `border`     | `border`     | If `true` a bottom border is added to the data-item.       | `boolean` | `false` |
| `horizontal` | `horizontal` | If `true` the data list is horizontal instead of vertical. | `boolean` | `false` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
