# bal-notification

<!-- START: human documentation top -->

A notification is used for alerts or to highlight certain content for the user.

<!-- END: human documentation top -->

## Basic

<ClientOnly>  <docs-demo-bal-notification-66></docs-demo-bal-notification-66></ClientOnly>

```html
<bal-notification color="primary"
  >Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, assumenda in ducimus modi animi enim velit molestiae rerum natus, ad culpa explicabo blanditiis architecto
  quo expedita incidunt officiis quaerat delectus.</bal-notification>
```

## Types

<ClientOnly>  <docs-demo-bal-notification-67></docs-demo-bal-notification-67></ClientOnly>

```html
<bal-notification>Default</bal-notification>
<br>
<bal-notification color="primary">Primary</bal-notification>
<br>
<bal-notification color="info">Info</bal-notification>
<br>
<bal-notification color="success">Success</bal-notification>
<br>
<bal-notification color="warning">Warning</bal-notification>
<br>
<bal-notification color="danger">Danger</bal-notification>
```

## Box

<ClientOnly>  <docs-demo-bal-notification-68></docs-demo-bal-notification-68></ClientOnly>

```html
<bal-notification color="info" class="has-text-centered" style="max-width: 400px">
  <h3 class="title is-size-3 has-text-white" style="margin-top: 0">Title</h3>
  <bal-button color="info" outlined inverted>Action</bal-button>
</bal-notification>
```

## Error

<ClientOnly>  <docs-demo-bal-notification-69></docs-demo-bal-notification-69></ClientOnly>

```html
<bal-notification>
  <span class="icon-text">
    <span class="icon">
      <bal-icon color="danger" name="alert-circle"></bal-icon>
    </span>
    <span style="margin-left: 10px">
      <strong style="margin-right: 10px">Error!</strong>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    </span>
  </span>
</bal-notification>
```


## API

### bal-notification

#### Properties

| Attribute | Description                      | Type                                                         | Default |
| :-------- | :------------------------------- | :----------------------------------------------------------- | :------ |
| **color** | Defines the color of the element | `"" , "danger" , "info" , "primary" , "success" , "warning"` | `''`    |



<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-notification.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-notification)
