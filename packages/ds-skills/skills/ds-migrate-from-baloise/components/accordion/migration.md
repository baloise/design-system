# accordion

Migrate every `bal-accordion` usage to `ds-accordion`. Init has already added the `@helvetia-design/*` packages. This task rewrites usages only.

The legacy folder has four elements. `bal-accordion` becomes `ds-accordion`. The other three have no `ds-*` equivalent and disappear into it: `bal-accordion-summary` becomes `slot="summary"`, `bal-accordion-details` becomes `slot="content"`, and `bal-accordion-trigger` is dropped because the summary itself is the toggle button. Leave slotted content in place, including legacy tags such as `bal-stack`, `bal-content`, and `bal-label`. Those belong to their own migrations.

## 1. Scan

`<project-root>` is the consumer project root that contains the app lockfile. When the skill is invoked from that root, use the current directory.

```bash
node <this-skill-directory>/scripts/scan-bal-accordion.mjs <project-root>
```

The script prints one JSON object. `total` is the number of findings. `files` groups them by path. Each finding has `line` and `snippet`.

Show that list to the user grouped by file (path, line, snippet) and end with the total count.

Done when the user has seen every finding and the total. If `total` is 0, say there are no `bal-accordion` usages to migrate and stop.

## 2. Confirm

Ask for one yes/no: rewrite every listed usage?

On no, stop with the files unchanged.

On yes, continue. Editing starts only after that answer.

Done when the user has answered.

## 3. Rewrite

Edit each finding yourself, using the mapping below. Read the whole element when attributes continue past the snippet's first line. This step is finished when every finding matches the mapping.

### Shapes

Legacy has two shapes. Decide which one each `bal-accordion` is before rewriting it.

**Shape 2** is a `bal-accordion` that has `bal-accordion-*` element children. Move the `bal-accordion-summary` children into `slot="summary"`, move the `bal-accordion-details` children into `slot="content"`, and drop `bal-accordion-trigger` entirely. The legacy wiring was imperative, so `bal-accordion-details` is allowed to appear **before** `bal-accordion-summary` in the source. Handle both orders, and always write the summary first.

```html
<!-- before -->
<bal-accordion>
  <bal-accordion-summary trigger>
    <bal-stack>
      <bal-content><bal-label>Label</bal-label></bal-content>
      <bal-accordion-trigger></bal-accordion-trigger>
    </bal-stack>
  </bal-accordion-summary>
  <bal-accordion-details><p>Content</p></bal-accordion-details>
</bal-accordion>

<!-- after -->
<ds-accordion>
  <div slot="summary">
    <bal-stack>
      <bal-content><bal-label>Label</bal-label></bal-content>
    </bal-stack>
  </div>
  <div slot="content"><p>Content</p></div>
</ds-accordion>
```

When the summary or the details has exactly one element child, put the `slot` attribute on that child instead of adding a wrapper `div`. When it has text or several children, wrap them in a `div` as above.

**Shape 1** is a `bal-accordion` with no `bal-accordion-*` element children. It rendered its own trigger from `openLabel`, `closeLabel`, `openIcon`, and `closeIcon`. Write the `button` variant and move every child into `slot="content"`.

```html
<!-- before -->
<bal-accordion open-label="Show more" close-label="Show less">
  <p>Content</p>
</bal-accordion>

<!-- after -->
<ds-accordion button button-label-open="Show more" button-label-close="Show less">
  <div slot="content"><p>Content</p></div>
</ds-accordion>
```

### Props

| old                                                        | new (`ds-accordion`)                                                      | handling                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bal-accordion` `active`, `active="true"`, `active={true}` | `open`                                                                    | HTML and Angular: write `open="true"`. React: write `open`. Also rewrite `active='true'`, `active={"true"}`, and `active={'true'}`.                                                                                                                                                                                        |
| `bal-accordion` `active="false"`, `active={false}`         | omit `open`                                                               | Drop `active`. Default `open` is false.                                                                                                                                                                                                                                                                                    |
| `bal-accordion` `debounce`                                 | _(no equivalent prop)_                                                    | Drop `debounce`, including every value. `ds-accordion` does not debounce `dsToggle`. Mention each dropped `debounce` in the summary.                                                                                                                                                                                       |
| `bal-accordion` `card`                                     | _(no equivalent prop)_                                                    | Drop `card`. Wrap the accordion in `ds-card` and `ds-card-content` instead. Mention each dropped `card` in the summary.                                                                                                                                                                                                    |
| `bal-accordion` `version`                                  | _(no equivalent prop)_                                                    | Drop `version`, including every value. The v1 and v2 rendering switch is gone. Use the shape rules above instead. Mention each dropped `version` in the summary.                                                                                                                                                           |
| `bal-accordion` `openLabel` / `open-label`                 | `buttonLabelOpen` / `button-label-open`                                   | Shape 1 only. Rename and keep the value.                                                                                                                                                                                                                                                                                   |
| `bal-accordion` `closeLabel` / `close-label`               | `buttonLabelClose` / `button-label-close`                                 | Shape 1 only. Rename and keep the value.                                                                                                                                                                                                                                                                                   |
| `bal-accordion` `openIcon` / `open-icon`                   | `buttonIconOpen` / `button-icon-open`                                     | Shape 1 only. Rename and keep the value. The legacy default was `plus` and the new default is empty, so write `button-icon-open="plus"` when the attribute was absent and a marker is still wanted. Mention that in the summary.                                                                                           |
| `bal-accordion` `closeIcon` / `close-icon`                 | `buttonIconClose` / `button-icon-close`                                   | Shape 1 only. Rename and keep the value. The legacy default was `close` and the new default is empty. Mention that in the summary.                                                                                                                                                                                         |
| `bal-accordion-summary` `trigger`                          | _(no equivalent prop)_                                                    | Drop it. The whole summary row is always the button now. Nested `a`, `button`, `input`, `ds-toggle`, and `ds-checkbox` keep working.                                                                                                                                                                                       |
| `bal-accordion-summary` `active` / `state`                 | _(internal)_                                                              | Drop both. They were `@internal` and set by the parent.                                                                                                                                                                                                                                                                    |
| `bal-accordion-trigger` `button`                           | `button`                                                                  | Move onto `ds-accordion`. The legacy prop was deprecated; the new one is not.                                                                                                                                                                                                                                              |
| `bal-accordion-trigger` `variant="button"`                 | `button`                                                                  | Move onto `ds-accordion` as `button`.                                                                                                                                                                                                                                                                                      |
| `bal-accordion-trigger` `variant="icon"` or absent         | _(default)_                                                               | Write nothing. The caret marker is the default.                                                                                                                                                                                                                                                                            |
| `bal-accordion-trigger` `variant="text"`                   | `marker="none"`                                                           | Move onto `ds-accordion` as `marker="none"` and put the open and close wording in the summary slot inside `<span class="is-closed">` and `<span class="is-open">`. Mention each one in the summary.                                                                                                                        |
| `bal-accordion-trigger` `expanded`                         | `buttonWide` / `button-wide`                                              | The legacy default was `true` and the new default is `false`. Write `button-wide` unless the legacy attribute was explicitly `expanded="false"` or `expanded={false}`. Mention each one in the summary.                                                                                                                    |
| `bal-accordion-trigger` `color="info"` or absent           | `buttonColor` / `button-color`                                            | `info` does not exist on `ds-accordion`. Leave `button-color` unset so it falls back to `primary`. Mention each remapped `info` in the summary.                                                                                                                                                                            |
| `bal-accordion-trigger` `color` (other values)             | `buttonColor` / `button-color`                                            | Move onto `ds-accordion` for `primary`, `secondary`, `success`, `warning`, and `danger`. Any other value has no equivalent: drop it and mention it in the summary.                                                                                                                                                         |
| `bal-accordion-trigger` `size="small"`                     | `buttonSize="sm"` / `button-size="sm"`                                    | Move onto `ds-accordion` and rewrite the value. `ds-accordion` accepts `sm`, `lg`, and `xl` only. Drop `size=""`.                                                                                                                                                                                                          |
| `bal-accordion-trigger` `openLabel` / `closeLabel`         | `button-label-open` / `button-label-close`                                | Move onto `ds-accordion` and rename.                                                                                                                                                                                                                                                                                       |
| `bal-accordion-trigger` `openIcon` / `closeIcon`           | `button-icon-open` / `button-icon-close`                                  | Move onto `ds-accordion` and rename. The legacy `openIcon` default was `caret-down`, which is now the implicit default marker, so do not write it out when the attribute was absent.                                                                                                                                       |
| `bal-accordion-trigger` with no label props                | `summary` slot content                                                    | Legacy filled the accessible name from its own translations (`Mehr anzeigen` / `Weniger anzeigen` and nine more languages). `ds-accordion` has no translations. The button has **no accessible name** unless the summary slot has text or `button-label-open` and `button-label-close` are set. Report every one of these. |
| `bal-accordion-details` `state` / `active` / `animated`    | _(internal)_                                                              | Drop all three. They were `@internal`.                                                                                                                                                                                                                                                                                     |
| _(none)_                                                   | `summaryLevel` / `summary-level`                                          | See the heading rule below.                                                                                                                                                                                                                                                                                                |
| _(none)_                                                   | `group`, `summaryVisualLevel`, `summaryTitle`, `marker`, `markerPosition` | New props. Nothing to migrate from. Leave them unset.                                                                                                                                                                                                                                                                      |

### Headings

`ds-accordion` wraps the summary in a real heading element, `h3` by default. `bal-accordion` rendered no heading at all, so every migrated accordion adds a heading to the page outline that was not there before.

When the same file has an unambiguous nearest preceding heading, set `summary-level` one level deeper than it, capped at `h5`. An `<h2>` above the accordion gives `summary-level="h3"`; an `<h4>` gives `summary-level="h5"`. Count `ds-heading`, `bal-heading`, and plain `h1` to `h5` elements. When no heading precedes it in the file, or the nearest one is ambiguous, leave `summary-level` unset and keep the `h3` default.

Report every accordion that now renders a heading, so the consumer can check the page outline.

### Tags and imports

- **HTML**: `<bal-accordion>` becomes `<ds-accordion>`, including the closing tag. `<bal-accordion-summary>`, `<bal-accordion-details>`, and `<bal-accordion-trigger>` are removed as described under Shapes.
- **Angular**: the same tag rewrites in `.html` templates and in inline `template:` strings. When a file imports `BalAccordion`, `BalAccordionSummary`, `BalAccordionTrigger`, `BalAccordionDetails`, or `BalAccordionBundle` from `@baloise/ds-angular`, replace all of them with a single `import { DsAccordion } from '@helvetia-design/angular'` and leave the other symbols on the `@baloise` import. `BalAccordionBundle` was an array of the four legacy classes; in an `imports:` list it becomes `DsAccordion`.
- **React**: `<BalAccordion>` becomes `<DsAccordion>` and `</BalAccordion>` becomes `</DsAccordion>`. `<BalAccordionSummary>`, `<BalAccordionDetails>`, and `<BalAccordionTrigger>` are removed as described under Shapes. Import `DsAccordion` from `@helvetia-design/react`. When the existing `@baloise/ds-react` import also binds other symbols, move only the four accordion symbols and leave the other symbols on the `@baloise` import.

### Events

| old              | new                    | handling                                                                                                                                                                               |
| ---------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `balChange`      | `dsToggle`             | Rewrite `addEventListener('balChange'` to `addEventListener('dsToggle'`. Angular: `(balChange)` becomes `(dsToggle)`. React: `onBalChange` becomes `onDsToggle`.                       |
| event `detail`   | object                 | Legacy sent the new `active` value as a boolean. `ds-accordion` sends `{ id, group, open }`. Every handler that used the value directly must read `.detail.open`. Report each handler. |
| `balWillAnimate` | _(no equivalent)_      | Removed. `ds-accordion` emits nothing before the transition. Drop the binding and report it.                                                                                           |
| `balDidAnimate`  | _(no equivalent)_      | Removed. `ds-accordion` emits nothing after the transition. Drop the binding and report it.                                                                                            |
| _(none)_         | `dsOpened`, `dsClosed` | New events. Nothing to migrate from.                                                                                                                                                   |

Legacy emitted `balChange` only from real user interaction, and so does `dsToggle`. Setting `open` in code emits nothing, exactly as setting `active` emitted nothing.

### Methods

`present()`, `dismiss()`, and `toggle()` do not exist on `ds-accordion`. Calling them throws at runtime.

| old            | new                  |
| -------------- | -------------------- |
| `el.present()` | `el.open = true`     |
| `el.dismiss()` | `el.open = false`    |
| `el.toggle()`  | `el.open = !el.open` |

Unlike the legacy methods, assigning `open` emits no event. When the surrounding code relied on `balChange` firing afterwards, call the handler directly and report it.

### Files to edit beyond the scan

In each file that has a finding, also rewrite `balChange`, `balWillAnimate`, and `balDidAnimate` listeners and `present()`, `dismiss()`, and `toggle()` calls that are not on the element itself, including `addEventListener`.

For every finding in a `.html` file, also open the file with the same name and a `.ts` extension in the same folder, and apply the Events and Methods rules there. That is the Angular case where the template holds the tag and the class file holds `@ViewChild` with `present()` or an event handler, and the class file never names `bal-accordion`.

The scan does not list a file that only listens or only calls a method and never uses `bal-accordion` or `BalAccordion`, and that has no scanned `.html` of the same name beside it. Say so in the report.

## 4. Report

Print a per-file summary of what changed, including every accordion that now renders a heading, every trigger that lost its automatic translations and still needs an accessible name, every dropped `debounce`, `card`, and `version`, every `expanded` turned into `button-wide`, every `color="info"` left to fall back to `primary`, every other dropped `color`, every `openIcon` or `closeIcon` whose default changed, every `variant="text"` turned into `marker="none"`, every handler whose event detail is now an object, every dropped `balWillAnimate` and `balDidAnimate` binding, and every `present()`, `dismiss()`, or `toggle()` call rewritten. End with the note that files which only listen or only call a method, and have no scanned `.html` of the same name beside them, were not scanned. Leave every change unstaged for the consumer to review. Stop. Do not run `git add` or `git commit`.

Done when the summary is printed and the working tree is still unstaged.
