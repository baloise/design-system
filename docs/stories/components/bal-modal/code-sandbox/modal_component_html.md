```html
<bal-modal-header>Modal Title</bal-modal-header>
<bal-modal-body>
  <p>{{ firstName }}</p>
  <p>{{ lastName }}</p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua.
  </p>
  <bal-button-group position="right" class="mt-medium">
    <bal-button color="link" (click)="closeModal()">Cancel</bal-button>
    <bal-button color="primary" (click)="closeModal()">Okay</bal-button>
  </bal-button-group>
</bal-modal-body>
```
