# Grid

A simple way to build responsive layouts with css-classes powerd by flexbox.

::: tip Further Documentation
This grid is build on the grid solution of Bulma, so please have a look at here awesome documentation.

[Go to the bulma documentation](http://bulma.io/documentation/columns/basics/)
:::

## Basics

Building a columns layout with Bulma is very simple:

1. Add a columns container
2. Add as many column elements as you want

Each column will have an equal width, no matter the number of columns.

<docs-demo>
  <div class="columns">
    <div class="column has-background-blue has-text-white">First column</div>
    <div class="column has-background-primary has-text-white">Second column</div>
    <div class="column has-background-warning has-text-white">Third column</div>
    <div class="column has-background-danger has-text-white">Fourth column</div>
  </div>
</docs-demo>

```html
<div class="columns">
  <div class="column has-background-blue has-text-white">First column</div>
  <div class="column has-background-primary has-text-white">Second column</div>
  <div class="column has-background-warning has-text-white">Third column</div>
  <div class="column has-background-danger has-text-white">Fourth column</div>
</div>
```

## Multiple Rows

<docs-demo>
  <div class="columns is-multiline">
    <div class="column is-full has-background-blue has-text-white">Full column</div>
    <div class="column is-half has-background-primary has-text-white">Half column</div>
    <div class="column is-half has-background-success has-text-white">Half column</div>
    <div class="column is-third has-background-warning has-text-white">1 Third column</div>
    <div class="column is-two-thirds has-background-danger has-text-white">2 Third column</div>
  </div>
</docs-demo>

```html
<div class="columns is-multiline">
  <div class="column is-full has-background-blue has-text-white">Full column</div>
  <div class="column is-half has-background-primary has-text-white">Half column</div>
  <div class="column is-half has-background-success has-text-white">Half column</div>
  <div class="column is-third has-background-warning has-text-white">1 Third column</div>
  <div class="column is-two-thirds has-background-danger has-text-white">2 Third column</div>
</div>
```

## Nested grids

You can nest columns to have more flexibility in your design. You only need to follow this structure:

- columns: top-level columns container
  - column
    - columns: nested columns
      - column and so on…

<docs-demo>
  <div class="columns">
    <div class="column is-half has-background-primary has-text-white">Half column</div>
    <div class="column is-half has-background-success has-text-white pb-0">
        <div class="columns is-mobile">
              <div class="column is-half has-background-warning has-text-white">Half column</div>
              <div class="column is-half has-background-danger has-text-white">Half column</div>
        </div>
    </div>
  </div>
</docs-demo>

```html
<div class="columns">
  <div class="column is-half has-background-primary has-text-white">Half column</div>
  <div class="column is-half has-background-success has-text-white pb-0">
    <div class="columns is-mobile">
      <div class="column is-half has-background-warning has-text-white">Half column</div>
      <div class="column is-half has-background-danger has-text-white">Half column</div>
    </div>
  </div>
</div>
```

::: tip Further Documentation
[Go to the bulma documentation](https://bulma.io/documentation/columns/nesting/)
:::

## More Options

- [Column sizes](https://bulma.io/documentation/columns/sizes/)
- [Columns responsiveness](https://bulma.io/documentation/columns/responsiveness/)
- [Columns gap](https://bulma.io/documentation/columns/gap/)
- [Column options](https://bulma.io/documentation/columns/options/)
