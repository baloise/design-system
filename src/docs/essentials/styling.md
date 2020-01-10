# Styling

This project is build on top of the [Bulma CSS framework](https://bulma.io/).

Add the `bal-app` to your root element. Within this css-class we are able to use the defined bulma helpers.

```xml
...
<body class="bal-app">
  <!-- Use helpers & elements here -->
</body>
...
```

## Use helpers & elements

To use the helpers and elements add the css class `bal-app` to the body element or any other root element.

!> Note that the helpers and element can only be used inside of the element with the css class `bal-app`.

<!-- The snippet.plugin looks for the html lang, so to avoid that we use xml here -->

## Responsive helpers

[Go to the Bulma documentation](https://bulma.io/documentation/modifiers/responsive-helpers/).

## Color helpers

[Go to the Bulma documentation](https://bulma.io/documentation/modifiers/color-helpers/).

```html
<div class="has-background-info is-padded">
  <p class="has-text-white">Hello World!</p>
</div>
```

## Typography helpers

[Go to the Bulma documentation](https://bulma.io/documentation/modifiers/typography-helpers/).

```html
<div class="has-background-light is-padded">
  <p class="is-size-1 has-text-centered">
    a big centered text
  </p>
</div>
```
