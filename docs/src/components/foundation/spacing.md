# Spacing

::: tip
Under the hood we use the [Bulma Spacing Helpers](https://bulma.io/documentation/helpers/spacing-helpers/)
:::

Bulma provides **margin** `m*` and **padding** `p*` helpers in all directions:

- `*t` for **top**
- `*r` for **right**
- `*b` for **bottom**
- `*l` for **left**
- `*x` **horizontally** for both left and right
- `*y` **vertically** for both top and bottom

You need to combine a margin/padding prefix with a direction suffix. For example:

- for a `margin-top`, use `mt-*`
- for a `padding-bottom`, use `pb-_`
  vfor both margin-left and margin-right, use `mx-_`

## Values

Each of these property-direction combinations needs to be appended with one of 16 value suffixes:

| Suffix | Value  |     | Suffix | Value   |
| ------ | ------ | --- | ------ | ------- |
| `*-0`  | `0`    |     | `*-9`  | `64px`  |
| `*-1`  | `4px`  |     | `*-10` | `72px`  |
| `*-2`  | `8px`  |     | `*-11` | `80px`  |
| `*-3`  | `16px` |     | `*-12` | `88px`  |
| `*-4`  | `24px` |     | `*-13` | `96px`  |
| `*-5`  | `32px` |     | `*-14` | `104px` |
| `*-6`  | `40px` |     | `*-15` | `112px` |
| `*-7`  | `48px` |     | `*-16` | `120px` |
| `*-8`  | `56px` |     |        |         |

## Usage

<docs-demo>
  <div class="has-background-primary p-4">
    <div class="has-background-info has-text-white py-2 px-4">
      Custom Padding
    </div>
  </div>
  <div class="has-background-info has-text-white mt-6 p-6">
    Margin with Padding
  </div>
</docs-demo>

```html
<div class="has-background-primary p-4">
  <div class="has-background-info has-text-white py-2 px-4">
    Custom Padding
  </div>
</div>
<div class="has-background-info has-text-white mt-6 p-6">
  Margin with Padding
</div>
```

## Responsive Helpers

There are some responsive padding helpers.

### has-padding

Standard padding for cards or modals.

#### Values

`@mobile(16px), @tablet(32px 40px)`

#### Example

<docs-demo>
<div class="has-background-blue has-text-white">
  <p class="has-padding">Some text with padding</p>
</div>
</docs-demo>

```html
<p class="has-padding">Some text with padding</p>
```

### has-large-padding

Padding configurations for forms.

#### Values

`@mobile(16px), @tablet(32px 40px), @desktop(64px 120px)`

#### Example

<docs-demo>
<div class="has-background-blue has-text-white">
  <p class="has-large-padding">Some text with large padding</p>
</div>
</docs-demo>

```html
<p class="has-large-padding">Some text with large padding</p>
```
