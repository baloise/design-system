# bal-carousel → ds-carousel: differences for PO review

Scratch document for reporting to the PO. Delete before committing.

## Possible bug in ds-carousel (separate from this migration's scope)

Setting `ds-carousel.value` externally (e.g. `el.value = 'item-2'`) updates the active
dot/indicator and the `is-selected` styling, but does **not** scroll the track into view.
`activateItem()` (called internally on click/drag/keyboard) sets `value`, updates `activeIndex`,
emits `dsChange`, and calls `scrollToActive()`. But there is no `@Watch('value')` on the prop, and
`componentDidUpdate()` only calls `updateChildren()` — never `scrollToActive()`. This looks like an
unintentional asymmetry, not a documented limitation. Recommend filing a separate issue against
`ds-carousel` and marking #2335 as blocked by it.

## Capabilities dropped between bal-carousel and ds-carousel

These are reported here for visibility, but handled as accepted losses in the migration skill
itself (each one is also called out per-usage in the skill's own report step):

- **`value` changes type**: 0-based slide index → the active item's `name` (a new, required,
  consumer-assigned string identifier). Items never had identifiers before; the migration
  synthesizes them positionally (`item-1`, `item-2`, ...).
- **`controls="small"`**: small square arrow buttons. No equivalent size; migration rewrites to
  `controls="large"` (nearest shape) and reports the size change.
- **`controls="tabs"`**: a card of tab-style buttons showing each item's label. No equivalent at
  all. Migration drops the attribute (falls back to `dots`) and flags for manual review.
- **`interface` (`card`, `product`, `image`, `''`)**: collapses into `variant` (`slide`, `tile`)
  only. Along with it: enforced aspect ratios (`image`), the card bleed-margin/fade styling
  (`card`), and the fixed-width colored product buttons (`product`) are gone — all superseded by
  the new component's own styling, not independently replaceable.
- **Item link/button rendering**: `bal-carousel-item` rendered its own `<a>` or `<button>`
  internally from `href`/`target`/`rel`/`download`/`elementType`/`name`/`value`. `ds-carousel-item`
  renders neither; the consumer must now slot their own `<a>`/`<button>`. Migration moves the
  attributes onto a literal element in the slot.
- **`svg` prop**: raw SVG markup rendered as the item's icon. No equivalent prop; the new pattern
  slots a `<ds-brand-icon>` component instead, which the migration cannot auto-generate.
- **`next()`/`previous()` methods**: no public equivalent on `ds-carousel`. Calling them throws.
  The only partial workaround (`el.value = name`) does not scroll (see the bug note above).
- **`setFocus()` on carousel items**: no equivalent method.
- **Other dropped props, no equivalent**: `controlsOverflow`, `inverted`, `fullHeight`,
  `aspectRatio`, `controlsSticky`, `scrollY` (only when explicitly `false`), `border`, `htmlRole`
  (already deprecated), `space` (gap is now only customizable via the `--carousel-gap` CSS
  variable, not a prop).
- **`color="white"`** on carousel items: new item colors are `green`/`yellow`/`red`/`purple` only.

## Direct/near-direct mappings (no loss)

- `bal-carousel` → `ds-carousel`, `bal-carousel-item` → `ds-carousel-item`
- `steps`, `itemsPerView`, item `src` — copied as-is
- `controls="dots"`/`"large"`/`"none"` — copied as-is
- item `color` (`green`/`yellow`/`red`/`purple`) — copied as-is
- `balChange` → `dsChange` (detail shape changes from a number index to `{ value: string }`)
- `balNavigate`/`balFocus`/`balBlur` → native `click`/`focus`/`blur` on the slotted element
