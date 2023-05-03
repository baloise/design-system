---
'@baloise/design-system-components': major
---

scroll handler blocks scrolling now with JS instead of CSS.
With that we are able to remember the last scroll position of the user.

**before**

```typescript
const scrollHandler = BodyScrollBlocker()
this.bodyScrollBlocker.block()
this.bodyScrollBlocker.allow()
```

**after**

Rename the handler to `ScrollHandler` and call the `connect` function to
connect the handler to the target element (Default is document). `block` and `allow` have been
renamed to `disable` and `enable`. The new function `disconnect` removes all
the defined event listeners and resets the handler.

```typescript
const scrollHandler = ScrollHandler()

// can also pass in a custom element instead of using document
scrollHandler.connect()
scrollHandler.disable()
scrollHandler.enable()
scrollHandler.disconnect()
```
