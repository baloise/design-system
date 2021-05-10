# bal-icon

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
| **name**     | Name of the baloise icon.                                       | `string`                                                                                          | `''`     |
| **rotate**   | If `true` the icon rotates like for a loading spinner           | `boolean`                                                                                         | `false`  |
| **size**     | Defines the size of the icon.                                   | `"" , "large" , "medium" , "small" , "xsmall"`                                                    | `''`     |
| **svg**      | Svg content.                                                    | `string`                                                                                          | `''`     |
| **turn**     | If `true` the icon is rotated 180deg                            | `boolean`                                                                                         | `false`  |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-icon.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/components/src/components/bal-icon)
