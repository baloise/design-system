---
'@baloise/ds-angular': minor
'@baloise/ds-core': patch
---

**angular**: add `@baloise/ds-angular`, generated standalone Angular component wrappers for the design system, plus a `bootstrapDesignSystem()` bootstrapping helper (Angular 22+; form component `ControlValueAccessor` integration is not included in this pass)
**core**: wire up the Stencil Angular output target (`@stencil/angular-output-target`) to generate `@baloise/ds-angular`'s bindings on build, replacing the retired custom `libs/output-target-angular`
