# Typography

We use the `bal-heading` and `bal-text` component to crop the font correctly, otherwise it has font margin top of around 2px.

- [bal-heading](/components/components/bal-heading)
- [bal-text](/components/components/bal-text)

## Headline

<docs-demo>
  <bal-heading level="h1">H1 MetaPro Normal</bal-heading>
</docs-demo>

```html
<bal-heading level="h1">H1 MetaPro Normal</bal-heading>
```

## Subheadline / Chapters

<docs-demo>
  <bal-heading level="h2">H2 MetaPro Normal</bal-heading>
</docs-demo>

```html
<bal-heading level="h2">H" MetaPro Normal</bal-heading>
```

## Title

<docs-demo>
  <bal-heading level="h3">H3 MetaPro Medium</bal-heading>
  <bal-heading level="h3" subtitle>H3 MetaPro Normal</bal-heading>
</docs-demo>

```html
<bal-heading level="h3">H3 MetaPro Medium</bal-heading>
```

```html
<bal-heading level="h3" subtitle>H3 MetaPro Normal</bal-heading>
```

## Lead

<docs-demo>
  <bal-heading level="h4">H4 MetaPro Medium</bal-heading>
  <bal-heading level="h4" subtitle>H4 MetaPro Normal</bal-heading>
</docs-demo>

```html
<bal-heading level="h4">H3 MetaPro Medium</bal-heading>
```

```html
<bal-heading level="h4" subtitle>H3 MetaPro Normal</bal-heading>
```

## Paragraph

<docs-demo>
  <bal-text bold>Paragraph MetaPro Normal</bal-text>
  <bal-text>Paragraph MetaPro Normal</bal-text>
  <a class="is-link" href="">
    <bal-text>Link cyan</bal-text>
  </a>
</docs-demo>

```html
<bal-text bold>Paragraph MetaPro Normal</bal-text>
<bal-text>Paragraph MetaPro Normal</bal-text>
<a class="is-link" href="">
  <bal-text>Link cyan</bal-text>
</a>
```

## Small Text

<docs-demo>
  <bal-text small bold>Paragraph MetaPro Normal</bal-text>
  <bal-text small>Paragraph MetaPro Normal</bal-text>
  <a class="is-link" href="">
    <bal-text small>Link cyan</bal-text>
  </a>
</docs-demo>

```html
<bal-text small bold>Paragraph MetaPro Normal</bal-text>
<bal-text small>Paragraph MetaPro Normal</bal-text>
<a class="is-link" href="">
  <bal-text small>Link cyan</bal-text>
</a>
```

## CSS Helper Classes

Out of the typography tokens we create a collection of helper css classes.

[Go to the Bulma documentation](https://bulma.io/documentation/modifiers/typography-helpers/).

<docs-demo>
<div class="has-background-light p-4">
  <p class="is-size-1 has-text-centered">
    a big centered text
  </p>
</div>
</docs-demo>

```html
<div class="has-background-light p-4">
  <p class="is-size-1 has-text-centered">
    a big centered text
  </p>
</div>
```
