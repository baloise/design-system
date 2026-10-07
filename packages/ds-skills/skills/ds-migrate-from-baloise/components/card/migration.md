# card

Migrate every `bal-card` usage to `ds-card`. Init has already added the `@helvetia-design/*` packages. This task rewrites usages only.

The legacy folder has five child elements. `bal-card-content` becomes `ds-card-content`, `bal-card-subtitle` becomes `ds-card-subtitle`, and `bal-card-title` becomes `ds-card-title`, unchanged in meaning. `bal-card-actions` becomes `ds-card-actions` with a renamed prop. `bal-card-button` has no `ds-*` equivalent: it is rewritten into a `ds-button` inside a `ds-card-actions`. `ds-card-header` is new on the `ds-card` side and has no legacy source element; it is synthesized during the rewrite, described under Shape below.

## 1. Scan

`<project-root>` is the consumer project root that contains the app lockfile. When the skill is invoked from that root, use the current directory.

```bash
node <this-skill-directory>/scripts/scan-bal-card.mjs <project-root>
```

The script prints one JSON object. `total` is the number of findings. `files` groups them by path. Each finding has `line` and `snippet`.

Show that list to the user grouped by file (path, line, snippet) and end with the total count.

Done when the user has seen every finding and the total. If `total` is 0, say there are no `bal-card` usages to migrate and stop.

## 2. Confirm

Ask for one yes/no: rewrite every listed usage?

On no, stop with the files unchanged.

On yes, continue. Editing starts only after that answer.

Done when the user has answered.

## 3. Rewrite

Edit each finding yourself, using the mapping below. Read the whole element when attributes continue past the snippet's first line, and read the whole `bal-card` (not just the scanned child tag) before deciding how to restructure it. This step is finished when every finding matches the mapping.

### Shape: synthesizing `ds-card-header`

Legacy `bal-card` had no structural header: `bal-card-title` and `bal-card-subtitle` sat as plain siblings next to `bal-card-content` and `bal-card-actions`. `ds-card` groups the title, subtitle, and any trailing control (a close button, a toggle) into a `ds-card-header`, which lays them out in a dedicated grid. Rewriting the tags 1:1 without that wrapper silently drops the header layout.

When `bal-card-title` or `bal-card-subtitle` appears as a **direct child of `bal-card`**, wrap it, together with every other direct-child element that sits adjacent to it and is not `bal-card-content` or `bal-card-actions` (for example a `bal-close` or `bal-toggle` placed next to the title), in a new `<ds-card-header>`. Preserve the original relative order of the wrapped elements. Leave `direction` unset; it defaults to `row`, which matches the inline title/trailing-control layout. Leave `ds-card-content` and `ds-card-actions` as siblings of the header, not inside it.

```html
<!-- before -->
<bal-card>
  <bal-card-title>Title</bal-card-title>
  <bal-card-subtitle>Subtitle</bal-card-subtitle>
  <bal-card-content>Body</bal-card-content>
</bal-card>

<!-- after -->
<ds-card>
  <ds-card-header>
    <ds-card-title>Title</ds-card-title>
    <ds-card-subtitle>Subtitle</ds-card-subtitle>
  </ds-card-header>
  <ds-card-content>Body</ds-card-content>
</ds-card>
```

When `bal-card` has no `bal-card-title` and no `bal-card-subtitle` among its direct children, there is nothing to wrap: just rename the tags in place.

When a `bal-card-title` or `bal-card-subtitle` is nested deeper than a direct child (for example inside its own wrapper `div`), do not guess how far to lift it. Rename the tag in place and report it in the summary as a header grouping that needs manual review.

### `bal-card-button`

`ds-card` has no button-wrapper component. Rewrite each `bal-card-button` into a `ds-button` inside a `ds-card-actions`: reuse an existing sibling `ds-card-actions` (either already present, or synthesized from a sibling `bal-card-actions` by the rule below) if one exists at the same level; otherwise wrap the new `ds-button` in its own `<ds-card-actions>`.

| old (`bal-card-button`) | new (`ds-button`)                  | handling                                                                                         |
| ----------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| _(always)_              | `color="info"`                     | Legacy always hardcoded `color="info"` internally. Write it explicitly.                          |
| _(always)_              | `wide`                             | Legacy always hardcoded `expanded` internally, the equivalent of `ds-button`'s `wide`. Write it. |
| _(always)_              | _(no `bottom-rounded` equivalent)_ | `ds-button` has no bottom-rounded corner variant. Drop it and report it in the summary.          |
| `icon`                  | `icon`                             | Copy as-is.                                                                                      |
| `iconRight`             | `iconRight`                        | Copy as-is.                                                                                      |
| `elementType`           | `elementType`                      | Copy as-is.                                                                                      |
| `disabled`              | `disabled`                         | Copy as-is.                                                                                      |
| `href`                  | `href`                             | Copy as-is.                                                                                      |
| `target`                | `target`                           | Copy as-is.                                                                                      |
| `rel`                   | `rel`                              | Copy as-is.                                                                                      |
| `loading`               | `loading`                          | Copy as-is.                                                                                      |
| slotted label content   | slotted label content              | Copy as-is.                                                                                      |

```html
<!-- before -->
<bal-card-actions position="right">
  <bal-card-button icon="plus">Add</bal-card-button>
</bal-card-actions>

<!-- after -->
<ds-card-actions align="right">
  <ds-button color="info" wide icon="plus">Add</ds-button>
</ds-card-actions>
```

### Props (`bal-card`)

| old                                     | new (`ds-card`)                         | handling                                                                                                                                                                                                                                          |
| --------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `flat`                                  | `flat`                                  | Copy as-is.                                                                                                                                                                                                                                       |
| `inverted`                              | `inverted`                              | Copy as-is. Both mean "card background becomes blue/primary".                                                                                                                                                                                     |
| `clickable`                             | `clickable`                             | Copy as-is.                                                                                                                                                                                                                                       |
| `selected`                              | `selected`                              | Copy as-is.                                                                                                                                                                                                                                       |
| `fullheight`                            | `fullheight`                            | Copy as-is.                                                                                                                                                                                                                                       |
| `square`                                | _(no equivalent)_                       | Drop it. `ds-card` has no square-corner variant. Mention each dropped `square` in the summary.                                                                                                                                                    |
| `border` alone (no real `color`)        | `color="dashed"`                        | The legacy border look (`var(--bal-border-width-normal) dashed var(--bal-color-grey)`) is now the `dashed` color value, not a separate prop.                                                                                                      |
| `border` together with a real `color`   | drop `border`, keep `color`             | `color` can only be one value in `ds-card`. Keep the mapped `color` (below) and drop `border`. Mention every dropped `border` in the summary.                                                                                                     |
| `space="small"`                         | `space="sm"`                            | Rewrite to the short value.                                                                                                                                                                                                                       |
| `space="large"`                         | `space="lg"`                            | Rewrite to the short value.                                                                                                                                                                                                                       |
| `space="medium"` / `space=""` / omitted | omit `space`                            | `ds-card`'s own unset default padding (1.25rem) is the nearest match; it does not scale responsively by breakpoint like the legacy value did. Mention that loss of responsive scaling in the summary whenever `space` was not `small` or `large`. |
| _(none)_                                | `tile`, `dense`, `imageTeaser`, `align` | New props. Nothing to migrate from. Leave them unset.                                                                                                                                                                                             |

### `color`

The legacy and new color scales do not line up by name. The hex values behind the design tokens prove it: new `color="red"` (`#ffeef1`) is the _same_ color as legacy's lightest `red-1`/`red-light`, while new `color="red-dark"` (`#ffaca6`) is the same color as legacy's plain `red`. Do not rewrite same-named colors onto each other.

| old (`bal-card`)                            | new (`ds-card`)       | match                                                                                               |
| ------------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------- |
| omitted, `color=""`, `color="white"`        | omit `color`          | exact (both render the plain white background)                                                      |
| `color="primary"`                           | `color="primary"`     | exact (same token)                                                                                  |
| `color="info"`                              | `color="primary"`     | exact — legacy `info` and `primary` shared the same background token                                |
| `color="blue"`                              | `color="primary"`     | exact — same reasoning as `info`                                                                    |
| `color="grey"`                              | `color="grey"`        | exact (same token)                                                                                  |
| `color="grey-light"`                        | `color="grey"`        | approximate — `ds-card` has only one grey tier; the lighter shade is lost, mention it               |
| `color="red"` / `color="red-3"`             | `color="red-dark"`    | exact                                                                                               |
| `color="red-light"` / `color="red-1"`       | `color="red"`         | exact                                                                                               |
| `color="red-2"`                             | `color="red"`         | approximate — nearest of the two available tiers, mention it                                        |
| `color="danger"`                            | `color="red-dark"`    | approximate — legacy `danger` used its own color ramp; `red-dark` is the closest hue, mention it    |
| `color="yellow"` / `color="yellow-3"`       | `color="yellow-dark"` | exact                                                                                               |
| `color="yellow-light"` / `color="yellow-1"` | `color="yellow"`      | exact                                                                                               |
| `color="yellow-2"`                          | `color="yellow"`      | approximate — nearest tier, mention it                                                              |
| `color="warning"`                           | `color="yellow"`      | approximate — legacy `warning` used its own color ramp; `yellow` is the closest hue, mention it     |
| `color="purple"` / `color="purple-3"`       | `color="purple-dark"` | exact                                                                                               |
| `color="purple-light"` / `color="purple-1"` | `color="purple"`      | exact                                                                                               |
| `color="purple-2"`                          | `color="purple"`      | approximate — nearest tier, mention it                                                              |
| `color="green"` / `color="green-3"`         | `color="green-dark"`  | exact                                                                                               |
| `color="green-light"` / `color="green-1"`   | `color="green"`       | exact                                                                                               |
| `color="green-2"`                           | `color="green"`       | approximate — nearest tier, mention it                                                              |
| `color="success"`                           | `color="green-dark"`  | approximate — legacy `success` used its own color ramp; `green-dark` is the closest hue, mention it |
| `color` not a string literal                | leave the expression  | Do not guess a runtime color. Mention it in the summary.                                            |

### `bal-card-actions`

| old (`position`)        | new (`align`)    | handling                            |
| ----------------------- | ---------------- | ----------------------------------- |
| `position=""` / omitted | omit `align`     | Leave `align` unset.                |
| `position="right"`      | `align="right"`  | Copy as-is.                         |
| `position="center"`     | `align="center"` | Copy as-is.                         |
| _(none)_                | `align="left"`   | New value. Nothing to migrate from. |

### `bal-card-subtitle`

| old                                                      | new (`ds-card-subtitle`) | handling                                                                                                                                      |
| -------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `inverted`                                               | `inverted`               | Copy as-is.                                                                                                                                   |
| `bold`                                                   | `bold`                   | Copy as-is.                                                                                                                                   |
| `color="primary"`                                        | `color="primary"`        | Copy as-is.                                                                                                                                   |
| `color="blue"` / `color="info"`                          | `color="primary"`        | Same reasoning as the card's own `color`: these shared the same token as `primary`.                                                           |
| `color="white"`                                          | `inverted`               | `ds-card-subtitle`'s `color` no longer has a `white` value; set the `inverted` prop instead (it already renders white text) and drop `color`. |
| `color="success"` / `color="warning"` / `color="danger"` | _(no equivalent)_        | `ds-card-subtitle`'s `color` only accepts `primary` and `inverted`. Drop the attribute and mention each one in the summary.                   |
| `color=""` / omitted                                     | omit `color`             | Leave unset.                                                                                                                                  |

### `bal-card-title`

No prop changes. `level` defaults to `h3` on `ds-card-title`, the same as the legacy hardcoded heading level, so nothing needs to be written. `visualLevel` is new, with nothing to migrate from; leave it unset.

### Tags and imports

- **HTML**: `<bal-card>` becomes `<ds-card>`, including the closing tag. `<bal-card-actions>`, `<bal-card-content>`, `<bal-card-subtitle>`, and `<bal-card-title>` become their `ds-card-*` equivalents. `<bal-card-button>` is removed as described above, replaced by `<ds-button>` inside a `<ds-card-actions>`.
- **Angular**: the same tag rewrites in `.html` templates and in inline `template:` strings. When a file imports `BalCard`, `BalCardActions`, `BalCardButton`, `BalCardContent`, `BalCardSubtitle`, `BalCardTitle`, or `BalCardBundle` from `@baloise/ds-angular`, replace all of them with `import { DsCard, DsCardActions, DsCardContent, DsCardHeader, DsCardSubtitle, DsCardTitle } from '@helvetia-design/angular'`, keeping only the classes actually used in that file, and leave the other symbols on the `@baloise` import. `BalCardBundle` was an array of the six legacy classes; in an `imports:` list it becomes the individual `DsCard*` classes actually used.
- **React**: `<BalCard>` becomes `<DsCard>` and `</BalCard>` becomes `</DsCard>`, same for `BalCardActions`, `BalCardContent`, `BalCardSubtitle`, and `BalCardTitle`. `<BalCardButton>` is removed as described above, replaced by `<DsButton>` inside a `<DsCardActions>`. Import `DsCard`, `DsCardActions`, `DsCardContent`, `DsCardHeader`, `DsCardSubtitle`, and `DsCardTitle` from `@helvetia-design/react`, keeping only the ones actually used. When the existing `@baloise/ds-react` import also binds other symbols, move only the card symbols and leave the rest on the `@baloise` import.

### Events

Neither `bal-card` nor `ds-card`, nor any of their children, emits any custom events.

### Methods

Neither component family has any public methods.

## 4. Report

Print a per-file summary of what changed, including: every synthesized `ds-card-header` and what it wrapped; every `bal-card-button` rewritten into a `ds-button` plus whether a `ds-card-actions` was reused or created, and the dropped `bottom-rounded` look; every dropped `square`; every `border` dropped because a real `color` was also set, and every lone `border` turned into `color="dashed"`; every `space` value that lost its responsive breakpoint scaling; every color rewritten under an "approximate" or "hue only" match in the color table, listed with its old and new value; every `bal-card-title`/`bal-card-subtitle` found nested too deep to auto-wrap into a header; and every non-literal `color` expression left untouched. Leave every change unstaged for the consumer to review. Stop. Do not run `git add` or `git commit`.

Done when the summary is printed and the working tree is still unstaged.
