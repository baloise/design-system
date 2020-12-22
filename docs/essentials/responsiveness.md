# Responsiveness

UI-Library is mobile first oriented and recommands to do so.

## Usage

Use the scss mixins in your application like this.

```scss
@import 'path-to/styles/ui-library.utilities';

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

### Breakpoints

| Device               | Starts at screen width |
| -------------------- | --------- |
| Mobile               | 0px       |
| Tablet               | 720px     |
| Desktop              | 960px     |
| Fullhd or Widescreen | 1200px    |

## Further Documentation

[Go to the bulma documentation](http://bulma.io/documentation/overview/responsiveness/)
