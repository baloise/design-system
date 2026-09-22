---
'@baloise/ds-core': patch
---

**number-input**: render a value that is assigned after the component has loaded

Stencil invokes `@Watch` handlers only once the host element is flagged as
watch-ready, which in the `dist-custom-elements` build happens in a microtask.
An assignment landing after the first render but before that flag was set got
dropped, and re-assigning the same value afterwards is not a change, so the
handler was never replayed. `bal-number-input` derives the text it renders in
that handler and therefore stayed visibly empty although `element.value` was
set. Angular hits this window whenever the surrounding component is created
inside the Angular zone, for example an overlay opened via `BalModalService`.
