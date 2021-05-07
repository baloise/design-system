# bal-icon

## Icons

<!-- Auto Generated Icons -->

| Icon | Name |
| ---- | ---- |
| <bal-icon name="account" /> | `account` |
| <bal-icon name="alert-circle" /> | `alert-circle` |
| <bal-icon name="alert" /> | `alert` |
| <bal-icon name="answer" /> | `answer` |
| <bal-icon name="call" /> | `call` |
| <bal-icon name="caret-down" /> | `caret-down` |
| <bal-icon name="caret-left" /> | `caret-left` |
| <bal-icon name="caret-right" /> | `caret-right` |
| <bal-icon name="caret-up" /> | `caret-up` |
| <bal-icon name="check-circle" /> | `check-circle` |
| <bal-icon name="check" /> | `check` |
| <bal-icon name="clock" /> | `clock` |
| <bal-icon name="close" /> | `close` |
| <bal-icon name="consultant" /> | `consultant` |
| <bal-icon name="contact" /> | `contact` |
| <bal-icon name="copy" /> | `copy` |
| <bal-icon name="date" /> | `date` |
| <bal-icon name="document" /> | `document` |
| <bal-icon name="download" /> | `download` |
| <bal-icon name="edit" /> | `edit` |
| <bal-icon name="eye-closed" /> | `eye-closed` |
| <bal-icon name="github" /> | `github` |
| <bal-icon name="info-circle" /> | `info-circle` |
| <bal-icon name="info" /> | `info` |
| <bal-icon name="locate" /> | `locate` |
| <bal-icon name="location" /> | `location` |
| <bal-icon name="logo" /> | `logo` |
| <bal-icon name="menu-bars" /> | `menu-bars` |
| <bal-icon name="menu-dots" /> | `menu-dots` |
| <bal-icon name="message" /> | `message` |
| <bal-icon name="minus" /> | `minus` |
| <bal-icon name="nav-back" /> | `nav-back` |
| <bal-icon name="nav-go-down" /> | `nav-go-down` |
| <bal-icon name="nav-go-left" /> | `nav-go-left` |
| <bal-icon name="nav-go-right" /> | `nav-go-right` |
| <bal-icon name="nav-go-up" /> | `nav-go-up` |
| <bal-icon name="plus" /> | `plus` |
| <bal-icon name="print" /> | `print` |
| <bal-icon name="read-only" /> | `read-only` |
| <bal-icon name="refresh" /> | `refresh` |
| <bal-icon name="search" /> | `search` |
| <bal-icon name="send" /> | `send` |
| <bal-icon name="social-facebook-line" /> | `social-facebook-line` |
| <bal-icon name="social-linkedin-line" /> | `social-linkedin-line` |
| <bal-icon name="social-xing-line" /> | `social-xing-line` |
| <bal-icon name="trash" /> | `trash` |
| <bal-icon name="upload" /> | `upload` |
<!-- START: human documentation top -->

All our icons are pure svg files. To add a new icon just place your svg file into the folder `packages/library/src/components/bal-icon/svg`.
Then the build script will automatically optimize the svg and create its own web component.

<!-- END: human documentation top -->

## Basic

<ClientOnly>  <docs-demo-bal-icon-48></docs-demo-bal-icon-48></ClientOnly>

```html
<span class="icon-text">
  <span class="icon">
    <bal-icon name="info-circle"></bal-icon>
  </span>
  <span>info-circle</span>
</span>
```

## Size

Here is how you can change the size:

<ClientOnly>  <docs-demo-bal-icon-49></docs-demo-bal-icon-49></ClientOnly>

```html
<bal-icon name="date" size="xsmall"></bal-icon>
<bal-icon name="date" size="small"></bal-icon>
<bal-icon name="date"></bal-icon>
<bal-icon name="date" size="medium"></bal-icon>
<bal-icon name="date" size="large"></bal-icon>
<bal-icon name="date" size="xlarge"></bal-icon>
```

## Colors

<ClientOnly>  <docs-demo-bal-icon-50></docs-demo-bal-icon-50></ClientOnly>

```html
<bal-icon color="primary" name="github"></bal-icon>
<bal-icon color="info" name="github"></bal-icon>
<bal-icon color="success" name="github"></bal-icon>
<bal-icon color="warning" name="github"></bal-icon>
<bal-icon color="danger" name="github"></bal-icon>
```

## Custom Color

Here is how you can change the color:

<ClientOnly>  <docs-demo-bal-icon-51></docs-demo-bal-icon-51></ClientOnly>

```html
<style type="text/css" scoped>
  .custom-color {
    fill: green !important;
  }
</style>

<bal-icon class="custom-color" name="check-circle"></bal-icon>
```


## API

### bal-icon

#### Properties

| Attribute    | Description                                                     | Type                                                                                              | Default  |
| :----------- | :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ | :------- |
| **color**    | The theme type of the button. Given by bulma our css framework. | `"danger" , "info" , "info-light" , "link" , "primary" , "primary-light" , "success" , "warning"` | `'info'` |
| **inverted** | If `true` the button is inverted                                | `boolean`                                                                                         | `false`  |
| **name**     | The name of the icon without the bal-icon prefix.               | `string`                                                                                          | `''`     |
| **rotate**   | If `true` the icon rotates like for a loading spinner           | `boolean`                                                                                         | `false`  |
| **size**     | Defines the size of the icon.                                   | `"" , "large" , "medium" , "small" , "xsmall"`                                                    | `''`     |
| **turn**     | If `true` the icon is rotated 180deg                            | `boolean`                                                                                         | `false`  |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-icon.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/components/src/components/bal-icon)
