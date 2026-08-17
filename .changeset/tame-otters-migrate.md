---
'@baloise/ds-core': patch
---

**steps**: fix `ds-steps` hiding a step's panel when its `value` points at a `disabled` step. Disabling the currently-active step (e.g. to block header navigation while keeping its content visible) no longer collapses the panel — only user-driven selection of a disabled step is still blocked.
