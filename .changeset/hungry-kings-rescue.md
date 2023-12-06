---
'@baloise/design-system-components': minor
---

Add vertical divider line feature to input-group component for clearer element separation.

```html
<bal-input-group>
  <bal-icon name="call"></bal-icon>
  <bal-divider layout="vertical"></bal-divider>
  <bal-select style="max-width: 106px" value="DE">
    <bal-select-option label="DE" value="DE">DE</bal-select-option>
    <bal-select-option label="FR" value="FR">FR</bal-select-option>
    <bal-select-option label="IT" value="IT">IT</bal-select-option>
  </bal-select>
  <bal-divider layout="vertical"></bal-divider>
  <bal-input placeholder="Placeholder"></bal-input>
</bal-input-group>
```
