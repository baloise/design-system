# carousel

Migrate every `bal-carousel` usage to `ds-carousel`. Init has already added the `@helvetia-design/*` packages. This task rewrites usages only.

The legacy folder has one child element: `bal-carousel-item` becomes `ds-carousel-item`. Legacy items had no identifier; `ds-carousel-item` requires a unique `name`, so the rewrite synthesizes one. Legacy items could render their own link or button; `ds-carousel-item` renders neither, so the rewrite moves that markup into the slot. `controls` and `interface` both shrink to a smaller set of values on the new side, described under Shape and under Props below.

## 1. Scan

`<project-root>` is the consumer project root that contains the app lockfile. When the skill is invoked from that root, use the current directory.

```bash
node <this-skill-directory>/scripts/scan-bal-carousel.mjs <project-root>
```

The script prints one JSON object. `total` is the number of findings. `files` groups them by path. Each finding has `line` and `snippet`.

Show that list to the user grouped by file (path, line, snippet) and end with the total count.

Done when the user has seen every finding and the total. If `total` is 0, say there are no `bal-carousel` usages to migrate and stop.

## 2. Confirm

Ask for one yes/no: rewrite every listed usage?

On no, stop with the files unchanged.

On yes, continue. Editing starts only after that answer.

Done when the user has answered.

## 3. Rewrite

Edit each finding yourself, using the mapping below. Read the whole element when attributes continue past the snippet's first line, and read the whole `bal-carousel` (not just the scanned child tag) before deciding how to rewrite it. This step is finished when every finding matches the mapping.

### Shape: synthesizing item names and rewriting `value`

Legacy `bal-carousel-item` had no identifying attribute. `ds-carousel-item` requires a unique `name` (`@Required()` — the component throws without one). For every `bal-carousel` being migrated, assign each direct-child `bal-carousel-item` a `name` positionally, in source order: `name="item-1"`, `name="item-2"`, `name="item-3"`, and so on. Do this even when the parent has no `value` at all.

Legacy `value` on `bal-carousel` is a 0-based slide **index**. `ds-carousel`'s `value` is the active item's **name** (a string). Rewrite accordingly:

- A literal numeric `value` (`value="1"`, `value={1}`, a plain number) becomes the synthesized name at that position: index `0` → `item-1`, index `1` → `item-2`, and so on.
- No `value` attribute, or `value="0"` / `value={0}` (the legacy default): omit `value` entirely on `ds-carousel`. It already defaults to the first item's name, same effective behavior as the legacy default index.
- A `value` bound to a variable, prop, or expression cannot be resolved to a position at scan time. Leave the expression untouched, and report it: the surrounding state must now hold the item's **name** (string), not an index, and must stay in sync with the synthesized names above.

```html
<!-- before -->
<bal-carousel value="1">
  <bal-carousel-item src="a.jpg"></bal-carousel-item>
  <bal-carousel-item src="b.jpg"></bal-carousel-item>
  <bal-carousel-item src="c.jpg"></bal-carousel-item>
</bal-carousel>

<!-- after -->
<ds-carousel value="item-2">
  <ds-carousel-item name="item-1" src="a.jpg"></ds-carousel-item>
  <ds-carousel-item name="item-2" src="b.jpg"></ds-carousel-item>
  <ds-carousel-item name="item-3" src="c.jpg"></ds-carousel-item>
</ds-carousel>
```

### Shape: `bal-carousel-item` link and button rewrite

Legacy `bal-carousel-item` rendered its own `<a>` (when `href` was set) or `<button>` (when `elementType`/`name`/`value` were set, with no `href`) around its content. `ds-carousel-item` renders neither — it is always a plain host. The new pattern is slotting the interactive element yourself.

When `href` is present: wrap the item's existing slot content in a literal `<a>`, carrying over `href`, `target`, `rel`, and `download` unchanged, and add the new `navigation` prop to `ds-carousel-item` (it marks the item as "a consumer-provided `<a>` makes this tile interactive").

```html
<!-- before -->
<bal-carousel-item color="green" href="/auto" target="_self">
  <span>Auto</span>
</bal-carousel-item>

<!-- after -->
<ds-carousel-item name="item-1" color="green" navigation>
  <a href="/auto" target="_self">
    <span>Auto</span>
  </a>
</ds-carousel-item>
```

When there is no `href` but `elementType`, `name` (the button's form name — distinct from the `name` synthesized above for `ds-carousel-item` itself), or `value` (the button's form value) are present: wrap the slot content in a literal `<button type={elementType} name={name} value={value}>` instead. Do not add `navigation` in this case — the new component's documentation never shows a button-wrapped tile, so flag every occurrence for manual visual and behavior review.

### `controls`

| old                | new (`ds-carousel`) | handling                                                                                                                                                                                        |
| ------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `controls="dots"`  | `controls="dots"`   | Copy as-is.                                                                                                                                                                                     |
| `controls="large"` | `controls="large"`  | Copy as-is.                                                                                                                                                                                     |
| `controls="none"`  | `controls="none"`   | Copy as-is.                                                                                                                                                                                     |
| `controls="small"` | `controls="large"`  | `ds-carousel` has only one arrow-button size. Rewrite to `large`, the nearest shape (prev/next arrow buttons). Mention the size change in the summary.                                          |
| `controls="tabs"`  | _(no equivalent)_   | `ds-carousel` has no tab-style pagination (a row of buttons showing each item's label). Drop the attribute — it falls back to the `dots` default — and flag every occurrence for manual review. |

### `interface` → `variant`

| old (`interface`)       | new (`variant`)  | handling                                                                                                                                                                                                                                                                                        |
| ----------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| omitted, `interface=""` | omit `variant`   | `slide` is the default on both sides.                                                                                                                                                                                                                                                           |
| `interface="image"`     | omit `variant`   | `slide` is the nearest match (one item visible at a time, scroll-snap). The legacy `aspectRatio` prop enforced a fixed image aspect ratio via padding; `ds-carousel-item` has no such prop — the `<img>` now sizes by its natural content. Mention every `aspectRatio` found (see Props below). |
| `interface="card"`      | `variant="tile"` | `tile` is the nearest match (multiple items, horizontal scroll, edge-fade on overflow). The legacy bleed-margin and shadow styling is superseded by the new tile styling — nothing for the consumer to do, just mention the visual change in the summary.                                       |
| `interface="product"`   | `variant="tile"` | Same as `card`. The legacy fixed-width colored product buttons are superseded by the new tile + item `color` styling (see Props below) — mention the visual change in the summary.                                                                                                              |

### Other `bal-carousel` props

| old                                      | new (`ds-carousel`)               | handling                                                                                                                                                                       |
| ---------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `steps`                                  | `steps`                           | Copy as-is.                                                                                                                                                                    |
| `itemsPerView` / `items-per-view`        | `itemsPerView` / `items-per-view` | Copy as-is. Legacy accepted `'auto' \| 1 \| 2 \| 3 \| 4`; new accepts `'auto' \| number`, a superset — any legacy value is still valid.                                        |
| `controlsOverflow` / `controls-overflow` | _(no equivalent)_                 | Drop it. Controls always overlay the track now, matching the legacy `controlsOverflow={true}` look regardless of the old value. Mention each dropped occurrence.               |
| `inverted`                               | _(no equivalent)_                 | Drop it. `ds-carousel` has no dark-background variant. Mention each dropped occurrence.                                                                                        |
| `fullHeight` / `full-height`             | _(no equivalent)_                 | Drop it. Mention each dropped occurrence.                                                                                                                                      |
| `aspectRatio` / `aspect-ratio`           | _(no equivalent)_                 | Drop it. See the `interface="image"` note above. Mention each dropped occurrence.                                                                                              |
| `controlsSticky` / `controls-sticky`     | _(no equivalent)_                 | Drop it. Only ever had an effect together with `controls="tabs"`, itself dropped. Mention each dropped occurrence.                                                             |
| `scrollY` / `scroll-y`                   | _(no equivalent)_                 | Drop only when explicitly `false` (blocked vertical touch scrolling) and mention it — the default `true` matches current behavior, nothing to report.                          |
| `border`                                 | _(no equivalent)_                 | Drop it. `ds-carousel` has no bottom-border variant. Mention each dropped occurrence.                                                                                          |
| `htmlRole` / `html-role`                 | _(no equivalent)_                 | Drop it. Already `@deprecated` in the legacy component; ARIA roles are automatic now. Mention each dropped occurrence.                                                         |
| `space`                                  | _(no public prop)_                | Drop it. Track gap is customizable only through the `--carousel-gap` CSS custom property, not a component prop. Mention each dropped occurrence and point at the CSS variable. |

### `bal-carousel-item` props

| old                                                                                               | new (`ds-carousel-item`) | handling                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src`                                                                                             | `src`                    | Copy as-is.                                                                                                                                                                                                                                                                                                                                                                     |
| `color="green"` / `"yellow"` / `"red"` / `"purple"`                                               | same value               | Copy as-is.                                                                                                                                                                                                                                                                                                                                                                     |
| `color="white"`                                                                                   | _(no equivalent)_        | Drop it. `ds-carousel-item`'s `color` has no `white` value. Mention each dropped occurrence.                                                                                                                                                                                                                                                                                    |
| `svg`                                                                                             | _(no equivalent prop)_   | Drop it. The new pattern is slotting a `<ds-brand-icon src="...">` component instead of inline SVG markup. Do not attempt to auto-generate that markup from the raw SVG string — flag every occurrence for manual rewrite.                                                                                                                                                      |
| `label`                                                                                           | slot text, or dropped    | When the item has no other slotted content (the typical product-tile usage), move the `label` value into the slot as plain text and drop the attribute. When the item already has slotted content (typical image usage, `label` was only the aria-label), drop `label` and report the lost custom aria-label — image items now get an automatic `aria-label="Slide N"` instead. |
| `htmlRole` / `html-role`                                                                          | _(no equivalent)_        | Drop it. Already `@deprecated`. Mention each dropped occurrence.                                                                                                                                                                                                                                                                                                                |
| `elementType`, item `name` (form name), `value` (form value), `href`, `target`, `rel`, `download` | —                        | Handled under Shape above, not here — these determine whether the item becomes a wrapped `<a>` or `<button>`.                                                                                                                                                                                                                                                                   |

### Tags and imports

- **HTML**: `<bal-carousel>` becomes `<ds-carousel>`, including the closing tag. `<bal-carousel-item>` becomes `<ds-carousel-item>`, including the closing tag.
- **Angular**: the same tag rewrites in `.html` templates and in inline `template:` strings. When a file imports `BalCarousel`, `BalCarouselItem`, or `BalCarouselBundle` from `@baloise/ds-angular`, replace all of them with `import { DsCarousel, DsCarouselItem } from '@helvetia-design/angular'`, keeping only the classes actually used in that file, and leave the other symbols on the `@baloise` import. `BalCarouselBundle` was `[BalCarousel, BalCarouselItem]`; in an `imports:` list it becomes the individual `DsCarousel`/`DsCarouselItem` classes actually used.
- **React**: `<BalCarousel>` becomes `<DsCarousel>` and `</BalCarousel>` becomes `</DsCarousel>`, same for `BalCarouselItem`. Import `DsCarousel` and `DsCarouselItem` from `@helvetia-design/react`, keeping only the ones actually used. When the existing `@baloise/ds-react` import also binds other symbols, move only the carousel symbols and leave the rest on the `@baloise` import.

### Events

| old            | new                 | handling                                                                                                                                                                                                                                                           |
| -------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `balChange`    | `dsChange`          | Rewrite `addEventListener('balChange'` to `addEventListener('dsChange'`. Angular: `(balChange)` becomes `(dsChange)`. React: `onBalChange` becomes `onDsChange`.                                                                                                   |
| event `detail` | `{ value: string }` | Legacy sent the new slide index as a number. `ds-carousel` sends the active item's name. Every handler that read `.detail` directly as a number must read `.detail.value` instead. Report each handler.                                                            |
| `balNavigate`  | `click`             | Only applies to items rewritten into a wrapped `<a>`/`<button>` per the Shape section. Move the listener onto that element: `addEventListener('balNavigate'` → `addEventListener('click'`, Angular `(balNavigate)` → `(click)`, React `onBalNavigate` → `onClick`. |
| `balFocus`     | `focus`             | Same rule as `balNavigate`, targeting `focus`.                                                                                                                                                                                                                     |
| `balBlur`      | `blur`              | Same rule as `balNavigate`, targeting `blur`.                                                                                                                                                                                                                      |

### Methods

`previous()` and `next()` do not exist on `ds-carousel`. Calling them throws at runtime, and there is no direct replacement — scrolling to a slide only happens from real user interaction (arrow click, drag, keyboard, or clicking a tile) inside the component. Setting `el.value = 'item-N'` updates the active dot/highlight, but does not scroll the track into view. Flag every `previous()`/`next()` call site for manual review.

`setFocus()` on `bal-carousel-item` does not exist on `ds-carousel-item`. Flag every call for manual review.

### Files to edit beyond the scan

In each file that has a finding, also rewrite `balChange`, `balNavigate`, `balFocus`, and `balBlur` listeners and `previous()`, `next()`, and `setFocus()` calls that are not on the element itself, including `addEventListener`.

For every finding in a `.html` file, also open the file with the same name and a `.ts` extension in the same folder, and apply the Events and Methods rules there. That is the Angular case where the template holds the tag and the class file holds `@ViewChild` with `next()`/`previous()` or an event handler, and the class file never names `bal-carousel`.

The scan does not list a file that only listens or only calls a method and never uses `bal-carousel` or `BalCarousel`, and that has no scanned `.html` of the same name beside it. Say so in the report.

## 4. Report

Print a per-file summary of what changed, including: every synthesized `ds-carousel-item` name; every `value` rewritten from an index to a name, and every `value` left as a non-literal expression needing a name-based state change; every `controls="small"` rewritten to `large`; every dropped `controls="tabs"`; every `interface`→`variant` collapse and its associated visual-detail note (aspect ratio, card bleed styling, product button styling); every dropped `controlsOverflow`, `inverted`, `fullHeight`, `aspectRatio`, `controlsSticky`, `scrollY`, `border`, `htmlRole`, and `space`; every item rewritten into a wrapped `<a>` (with `navigation` added) or `<button>` (flagged for review); every dropped `color="white"`; every dropped `svg` with the `ds-brand-icon` guidance; every `label` moved into slot text versus dropped; every `balNavigate`/`balFocus`/`balBlur` rewritten to native events; every handler whose event detail changed from a number to `{ value }`; and every `previous()`, `next()`, or `setFocus()` call flagged as having no replacement. End with the note that files which only listen or only call a method, and have no scanned `.html` of the same name beside them, were not scanned. Leave every change unstaged for the consumer to review. Stop. Do not run `git add` or `git commit`.

Done when the summary is printed and the working tree is still unstaged.
