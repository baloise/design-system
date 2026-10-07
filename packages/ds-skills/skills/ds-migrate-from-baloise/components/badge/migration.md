# badge

Migrate every `bal-badge` usage to `ds-badge`. Init has already added the `@helvetia-design/*` packages. This task rewrites usages only.

The legacy folder has no child elements. Rewrite `bal-badge` only. Leave slotted content in place.

## 1. Scan

`<project-root>` is the consumer project root that contains the app lockfile. When the skill is invoked from that root, use the current directory.

```bash
node <this-skill-directory>/scripts/scan-bal-badge.mjs <project-root>
```

The script prints one JSON object. `total` is the number of findings. `files` groups them by path. Each finding has `line` and `snippet`.

Show that list to the user grouped by file (path, line, snippet) and end with the total count.

Done when the user has seen every finding and the total. If `total` is 0, say there are no `bal-badge` usages to migrate and stop.

## 2. Confirm

Ask for one yes/no: rewrite every listed usage?

On no, stop with the files unchanged.

On yes, continue. Editing starts only after that answer.

Done when the user has answered.

## 3. Rewrite

Edit each finding yourself, using the mapping below. Read the whole element when attributes continue past the snippet's first line. This step is finished when every finding matches the mapping.

### Props

| old (`bal-badge`)                                           | new (`ds-badge`)     | handling                                                                                                                                                                          |
| ----------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `icon`                                                      | `icon`               | Copy as-is, including `icon=""` and the `'...'` form.                                                                                                                             |
| `size` omitted or `size=""`                                 | omit `size`          | Leave `size` unset. Both render the base size.                                                                                                                                    |
| `size="small"` / `small` (boolean)                          | `size="sm"`          | Rewrite to the short value. HTML and Angular: write `size="sm"`. React: write `size="sm"`. Also rewrite `size='small'`, `size={"small"}`, and `size={'small'}`.                   |
| `size="large"` / `large` (boolean)                          | `size="lg"`          | Rewrite to the short value, same forms as above.                                                                                                                                  |
| `color` omitted or `color=""`                               | omit `color`         | Leave `color` unset. Both render the same default background, which is visually identical to `danger` (same token value on both sides).                                           |
| `color="grey"`                                              | `color="disabled"`   | Rename. `ds-badge`'s own stylesheet documents `disabled` as the same grey-on-light-grey palette `grey` used. Also rewrite `color='grey'`, `color={"grey"}`, and `color={'grey'}`. |
| `color="danger"` / `color="red"`                            | `color="danger"`     | Both were aliases for the same background token in the legacy component. Collapse either spelling to `danger`.                                                                    |
| `color="warning"` / `color="yellow"`                        | `color="warning"`    | Same as above: `yellow` was an alias for `warning`. Collapse to `warning`.                                                                                                        |
| `color="success"` / `color="green"`                         | `color="success"`    | Same as above: `green` was an alias for `success`. Collapse to `success`.                                                                                                         |
| `color="purple"`                                            | _(no equivalent)_    | Legacy used `purple` as its only "info"-like accent. `ds-badge` has no purple or info color. Drop the attribute and mention each one in the summary.                              |
| `color` not a string literal                                | leave the expression | Do not guess a runtime color. Say in the summary that `disabled`, `danger`, `warning`, and `success` are the only styled colors now.                                              |
| `position="card"` / `position="button"` / `position="tabs"` | same                 | Copy as-is, including the `'...'`, `{"..."}`, and `{'...'}` forms. All three values are unchanged.                                                                                |
| _(none)_                                                    | `pulse`              | New prop. Nothing to migrate from. Leave it unset.                                                                                                                                |

### Icon and text now render together

Legacy `bal-badge` hid the slotted text whenever `icon` was set — the component doc comment says so directly ("If a icon is present text should be hidden"), and at `size="small"` it hid both the icon and the text, showing an empty dot. `ds-badge` has no such hiding logic: the slot content and the icon always render side by side, except at `size="sm"`, which hides everything (matching the old `small` dot).

So for every finding where `icon` is set and the size is not `small`/`sm`, the migrated badge will show the slotted text next to the icon where before only the icon was visible. Do not invent a hidden-span workaround to restore the old look. Rewrite the tag and props as described above, and mention every one of these findings in the summary so the consumer can decide whether to remove the now-visible text.

### Tags and imports

- **HTML**: `<bal-badge>` becomes `<ds-badge>`, including the closing tag.
- **Angular**: `<bal-badge>` becomes `<ds-badge>` in `.html` templates and in inline `template:` strings, including the closing tag. When a file imports `BalBadge` from `@baloise/ds-angular`, move only `BalBadge` to `import { DsBadge } from '@helvetia-design/angular'` and leave the other symbols on the `@baloise` import.
- **React**: `<BalBadge>` becomes `<DsBadge>` and `</BalBadge>` becomes `</DsBadge>`. Import `DsBadge` from `@helvetia-design/react`. When the existing `@baloise/ds-react` import also binds other symbols, move only `BalBadge` to `import { DsBadge } from '@helvetia-design/react'` and leave the other symbols on the `@baloise` import.

### Events

Neither `bal-badge` nor `ds-badge` emits any custom events.

### Methods

Neither component has any public methods.

## 4. Report

Print a per-file summary of what changed, including every `color="grey"` renamed to `color="disabled"`, every `color="red"` / `"yellow"` / `"green"` collapsed to `"danger"` / `"warning"` / `"success"`, every dropped `color="purple"`, every `size="small"` / `"large"` rewritten to `"sm"` / `"lg"`, and every badge where slotted text now renders next to its icon where only the icon showed before. Leave every change unstaged for the consumer to review. Stop. Do not run `git add` or `git commit`.

Done when the summary is printed and the working tree is still unstaged.
