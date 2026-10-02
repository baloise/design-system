---
'@helvetia-design/angular': minor
---

**angular**: Support label, modalWidth, closable, and fullscreen options in DsModalService.create() and fix AngularDelegate not being provided, which broke DsModalService injection. Also fix the mounted component's host element not being removed from the DOM on dismiss, and make `DsModalRef` observe dismiss events from creation (one ref per modal, ignoring dismiss events bubbling from nested overlays)
