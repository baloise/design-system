---
'@baloise/design-system-components': patch
'@baloise/design-system-components-angular': patch
---

The BreakpointService will now only respond to state changes, thereby mitigating the Angular error `NG0101: ApplicationRef.tick is called recursively`.