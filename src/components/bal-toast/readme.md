# Toast

Toast are used to inform the user with a simple text message.

> Note: Toast are getting queued to not confuse the users.

## Types

Toast have five different types.

```html
<bal-toast message="Primary Message"></bal-toast>
<bal-toast type="is-info" message="Info Message"></bal-toast>
<bal-toast type="is-success" message="Success Message"></bal-toast>
<bal-toast type="is-warning" message="Warn Message"></bal-toast>
<bal-toast type="is-danger" message="Danger Message"></bal-toast>
```

## In Action

Toast can also be created with the `balToastController`.

<bal-button id="toast-default">Show default Toast</bal-button>
<bal-button id="toast-danger" type="is-danger">Show danger Toast</bal-button>

<script type="text/javascript">
    document.getElementById('toast-default').onclick = function() {
      window.BalUILibrary.toastController.create({ message: 'Hi I am a default Toast!' });
    };
    document.getElementById('toast-danger').onclick = function() {
      window.BalUILibrary.toastController.create({ message: 'Danger zone!', type: 'is-danger' });
    };
</script>

```typescript
document.getElementById('toast-default').onclick = function() {
  window.BalUILibrary.toastController.create({ message: 'Hi I am a default Toast!' });
};
document.getElementById('toast-danger').onclick = function() {
  window.BalUILibrary.toastController.create({ message: 'Danger zone!', type: 'is-danger' });
};
```


<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                    | Type                                                                       | Default        |
| --------- | --------- | -------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------- |
| `message` | `message` | Message text                                                   | `string`                                                                   | `undefined`    |
| `type`    | `type`    | The theme type of the toast. Given by bulma our css framework. | `"is-danger" \| "is-info" \| "is-primary" \| "is-success" \| "is-warning"` | `"is-primary"` |


## Methods

### `close() => Promise<void>`

Closes this toast

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
