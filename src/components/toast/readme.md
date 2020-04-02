# Toast

Toast are used to inform the user with a simple text message.

> Note: Toast are getting queued to not confuse the users.

## Usage

Toast can be created with the `balToastController`. The default duration is 5000 milliseconds.

<bal-button id="toast-default" type="is-success">Show success Toast</bal-button>
<bal-button id="toast-warning" type="is-warning">Show warning Toast</bal-button>
<bal-button id="toast-danger" type="is-danger">Show error Toast</bal-button>

<script type="text/javascript">
    document.getElementById('toast-default').onclick = function() {
        balToastController.create({ message: 'Hi I am a default Toast!', duration: 1000 });
    };
    document.getElementById('toast-warning').onclick = function() {
        balToastController.create({ message: 'Warning!', type: 'is-warning' });
    };
    document.getElementById('toast-danger').onclick = function() {
        balToastController.create({ message: 'Danger zone!', type: 'is-danger' });
    };
</script>

```typescript
import {balToastController} from '@baloise/ui-library';

balToastController.create({ message: 'Hi I am a default Toast!', duration: 1000 });
balToastController.create({ message: 'Warning!', type: 'is-warning' });
balToastController.create({ message: 'Danger zone!', type: 'is-danger' });
```

### Types

Toast have five different types.

```html
<bal-toast type="is-success">The Force will be with you</bal-toast>
```

```html
<bal-toast type="is-warning">A long time ago in a galaxy far, far away</bal-toast>
```

```html
<bal-toast type="is-danger">When gone am I, the last of the Jedi will you be</bal-toast>
```


<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                    | Type                                                                       | Default        |
| -------- | --------- | -------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------- |
| `type`   | `type`    | The theme type of the toast. Given by bulma our css framework. | `"is-danger" \| "is-info" \| "is-primary" \| "is-success" \| "is-warning"` | `"is-primary"` |


## Methods

### `close() => Promise<void>`

Closes this toast

#### Returns

Type: `Promise<void>`



### `closeIn(duration: number) => Promise<void>`

Closes the toast after the given duration in ms

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
