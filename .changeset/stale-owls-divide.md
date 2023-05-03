---
'@baloise/design-system-components': major
---

accordion & popover renamed property `value` to `active`, since they are not considered as a form control component.

**before**

```html
<bal-accordion value="true">My hidden Content</bal-accordion>
```

**after**

```html
<bal-accordion active="true">My hidden Content</bal-accordion>
```