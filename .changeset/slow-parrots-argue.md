---
'@baloise/design-system-components': minor
---

Introduce 'horizontal' prop for aligning label and input side by side in Field component, with message displayed below.

```html
<bal-field horizontal>
  <bal-field-label>Firstname</bal-field-label>
  <bal-field-control>
    <bal-input placeholder="Basic"></bal-input>
  </bal-field-control>
  <bal-field-message color="hint">Field Message</bal-field-message>
</bal-field>
```