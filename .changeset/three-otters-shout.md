---
'@baloise/design-system-components-angular': minor
---

Angular reactive forms mark a form control as invalid when it's been touched and is indeed invalid.
To enable this feature, set setInvalid in the design system configuration.

```typescript
BaloiseDesignSystemModule.forRoot({
  defaults: { ... },
  forms: {
    setInvalid: true,
     invalidateOn: 'touched' // Alternatively, it can also be set to 'dirty'.
  },
})
```
