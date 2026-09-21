---
'@baloise/ds-angular': minor
'@baloise/ds-core': patch
---

**angular**: Add ControlValueAccessor support for ds-counter, so `formControlName`/`ngModel` work without any extra import
**core/counter**: Resolve empty (`null`/`undefined`/`NaN`) and out-of-range `value` writes onto the valid range in `@Watch('value')`, not just on connect
