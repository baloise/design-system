# Responsiveness

UI-Library is mobile first oriented and recommands to do so.

There are 2 ways to solve the daily responsiveness challenges.

## SCSS Mixins

Use the scss mixins in your application like this.

```scss
@import 'node_modules/@baloise/ui-library/src/styles/ui-library.utilities';

.bal-element {
  width: 100%;
}

@include tablet() {
  .bal-element {
    width: 380px;
  }
}

@include desktop() {
  .bal-element {
    width: 570px;
  }
}
```

The file `ui-library.utilities` provides all the defined scss variables like [colors](essentials/colors) and also the mixins.

**Further Documentation**

[Go to the bulma documentation](http://bulma.io/documentation/overview/responsiveness/)

## CSS-Grid

A simple way to build responsive layouts with css-classes.

```html
<div class="columns">
  <div class="column has-background-blue has-text-white">First column</div>
  <div class="column has-background-primary has-text-white">Second column</div>
  <div class="column has-background-warning has-text-white">Third column</div>
  <div class="column has-background-danger has-text-white">Fourth column</div>
</div>
```

**Further Documentation**

[Go to the bulma documentation](http://bulma.io/documentation/columns/basics/)

## Breakpoints

The library supports those 4 breakpoints.

| Device               | Starts at screen width |
| -------------------- | ---------------------- |
| Mobile               | 0px                    |
| Tablet               | 720px                  |
| Desktop              | 960px                  |
| Fullhd or Widescreen | 1200px                 |
