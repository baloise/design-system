---
'@helvetia-design/core': patch
---

**core/number-input**: Render a value that is assigned after the component has loaded. Stencil only invokes `@Watch` handlers once the host carries the `isWatchReady` flag, which the `dist-custom-elements` build sets in a microtask, so an assignment landing after the first render but before that flag was dropped. Re-assigning the same value afterwards is not a change, so the handler was never replayed and the field stayed visibly empty although `value` was set. `valueChanged` is now declared with `{ immediate: true }`, which makes the watcher independent of that flag.
