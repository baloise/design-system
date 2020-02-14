# Modal

```html
<bal-modal id="bal-modal-example-1">
    <bal-modal-title>Modal Title</bal-modal-title>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <bal-modal-actions>
        <bal-button type="is-info" outlined id="bal-modal-close-1">Okay</bal-button>
        <bal-button type="is-link" id="bal-modal-close-2">Cancel</bal-button>
    </bal-modal-actions>
</bal-modal>

<bal-button id="bal-modal-trigger-example-1">Launch Modal</bal-button>
```



<script type="text/javascript">
    document.getElementById('bal-modal-trigger-example-1').onclick = function() {
        document.getElementById('bal-modal-example-1').open();
    };
    document.getElementById('bal-modal-close-1').onclick = function() {
        document.getElementById('bal-modal-example-1').close();
    };
    document.getElementById('bal-modal-close-2').onclick = function() {
        document.getElementById('bal-modal-example-1').close();
    };
</script>

<!-- Auto Generated Below -->


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
