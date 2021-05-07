# bal-tag

<!-- START: human documentation top -->

A tag highlights a label for quick recognition.

<!-- END: human documentation top -->

## Basic

<ClientOnly>  <docs-demo-bal-tag-91></docs-demo-bal-tag-91></ClientOnly>

```html
<bal-tag>Default</bal-tag>
<bal-tag color="primary">Primary</bal-tag>
<bal-tag color="info">Info</bal-tag>
<bal-tag color="success">Success</bal-tag>
<bal-tag color="warning">Warning</bal-tag>
<bal-tag color="danger">Danger</bal-tag>
```

## Size

<ClientOnly>  <docs-demo-bal-tag-92></docs-demo-bal-tag-92></ClientOnly>

```html
<bal-tag color="primary" size="small">Small</bal-tag>
<bal-tag color="info" size="medium">Medium</bal-tag>
<bal-tag color="success" size="large">Large</bal-tag>
```

## Closable

<ClientOnly>  <docs-demo-bal-tag-93></docs-demo-bal-tag-93></ClientOnly>

```html
<bal-tag color="primary" size="small" closable>Small</bal-tag>
<bal-tag color="info" size="medium" closable>Medium</bal-tag>
<bal-tag color="success" size="large" closable>Large</bal-tag>
```

## Dense

<ClientOnly>  <docs-demo-bal-tag-94></docs-demo-bal-tag-94></ClientOnly>

```html
<bal-tag color="primary" size="small" dense closable>Small</bal-tag>
<bal-tag color="info" size="medium" dense closable>Medium</bal-tag>
<bal-tag color="success" size="large" dense closable>Large</bal-tag>
```


## API

### bal-tag

#### Properties

| Attribute    | Description                                                  | Type                                                         | Default |
| :----------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :------ |
| **closable** | The theme type of the tag. Given by bulma our css framework. | `boolean`                                                    | `false` |
| **color**    | The theme type of the tag. Given by bulma our css framework. | `"" , "danger" , "info" , "primary" , "success" , "warning"` | `''`    |
| **size**     | The size of the tag element                                  | `"" , "large" , "medium" , "small"`                          | `''`    |

#### Events

| Event             | Description                         | Type         |
| :---------------- | :---------------------------------- | :----------- |
| **balCloseClick** | Emitted when the input got clicked. | `MouseEvent` |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-tag.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/components/src/components/bal-tag)
