---
'@baloise/design-system-components-angular': major
---

Now by default the Baloise Design System will mark a form control as invalid when it's been touched and is indeed invalid.
To disable this feature, set setInvalid to false in the design system configuration.

```ts
BaloiseDesignSystemModule.forRoot({
  defaults: { ... },
  forms: {
    setInvalid: false, // to deactivate it 
  },
})
```
