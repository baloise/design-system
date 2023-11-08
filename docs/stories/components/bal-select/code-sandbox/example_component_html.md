```html
<bal-field
  [disabled]="args.disabled"
  [readonly]="args.readonly"
  [inverted]="args.inverted"
  [invalid]="args.invalid"
>
  <bal-field-label>Canton</bal-field-label>
  <bal-field-control [loading]="loading">
    <bal-select
      loading
      remote
      selectionOptional
      typeahead
      [value]="args.value"
      (balInput)="onInputDebouced($event)"
      (balChange)="onChange($event)"
    >
      <bal-select-option
        *ngFor="let option of options"
        [label]="option"
        [value]="option"
        >{{option}}</bal-select-option
      >
    </bal-select>
  </bal-field-control>
</bal-field>
```
