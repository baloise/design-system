# Colors

Out of the box access all the colors form the Baloise Design System.

## Variables

| Color       | SCSS Variable | Value        | Computed value                                                                       |
| ----------- | ------------- | ------------ | ------------------------------------------------------------------------------------ |
| **White**   | `$white`      | `$white`     | <div class="bal-app box"><span class="bd-color has-background-white"></span></div>   |
| **Black**   | `$black`      | `$black`     | <div class="bal-app box"><span class="bd-color has-background-black"></span></div>   |
| **Grey**    | `$grey`       | `$grey`      | <div class="bal-app box"><span class="bd-color has-background-grey"></span></div>    |
| **Light**   | `$light`      | `$white-ter` | <div class="bal-app box"><span class="bd-color has-background-light"></span></div>   |
| **Dark**    | `$dark`       | `$blue`      | <div class="bal-app box"><span class="bd-color has-background-dark"></span></div>    |
| **Primary** | `$primary`    | `$cyan`      | <div class="bal-app box"><span class="bd-color has-background-primary"></span></div> |
| **Info**    | `$info`       | `$blue`      | <div class="bal-app box"><span class="bd-color has-background-info"></span></div>    |
| **Link**    | `$link`       | `$cyan`      | <div class="bal-app box"><span class="bd-color has-background-link"></span></div>    |
| **Success** | `$success`    | `$green`     | <div class="bal-app box"><span class="bd-color has-background-success"></span></div> |
| **Warning** | `$warning`    | `$yellow`    | <div class="bal-app box"><span class="bd-color has-background-warning"></span></div> |
| **Danger**  | `$danger`     | `$red`       | <div class="bal-app box"><span class="bd-color has-background-danger"></span></div>  |

### Shades

| Color                  | Variable              | Computed Value                                                                                  |
| ---------------------- | --------------------- | ----------------------------------------------------------------------------------------------- |
| **Blue darker**        | `$blue-darker`        | <div class="bal-app box"><span class="bd-color has-background-blue-darker"></span></div>        |
| **Blue dark**          | `$blue-dark`          | <div class="bal-app box"><span class="bd-color has-background-blue-dark"></span></div>          |
| **Blue-line-inverted** | `$blue-line-inverted` | <div class="bal-app box"><span class="bd-color has-background-blue-line-inverted"></span></div> |
| **Blue**               | `$blue`               | <div class="bal-app box"><span class="bd-color has-background-blue"></span></div>               |
| **Blue light text**    | `$blue-light-text`    | <div class="bal-app box"><span class="bd-color has-background-blue-light-text"></span></div>    |
| **Blue line**          | `$blue-line`          | <div class="bal-app box"><span class="bd-color has-background-blue-line"></span></div>          |
| **Blue light line**    | `$blue-light-line`    | <div class="bal-app box"><span class="bd-color has-background-blue-light-line"></span></div>    |
| **Blue light hover**   | `$blue-light-hover`   | <div class="bal-app box"><span class="bd-color has-background-blue-light-hover"></span></div>   |
| **Blue light**         | `$blue-light`         | <div class="bal-app box"><span class="bd-color has-background-blue-light"></span></div>         |
| **White ter**          | `$white-ter`          | <div class="bal-app box"><span class="bd-color has-background-white-ter"></span></div>          |
| **White bis**          | `$white-bis`          | <div class="bal-app box"><span class="bd-color has-background-white-bis"></span></div>          |

## Usage

These colors/variables can be used within your style sheets, by import the `global.utilities` into your scss files.

```scss
@import 'node_modules/@baloise/design-system-components/src/styles/global.utilities';
```

## Helpers

[Go to the Bulma documentation](https://bulma.io/documentation/modifiers/color-helpers/).

<docs-demo>
<div class="has-background-info is-padded">
  <p class="has-text-white">Hello World!</p>
</div>
</docs-demo>

```html
<div class="has-background-info is-padded">
  <p class="has-text-white">Hello World!</p>
</div>
```
