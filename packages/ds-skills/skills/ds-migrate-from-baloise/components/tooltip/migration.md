# tooltip

Migrate every `bal-tooltip` usage to `ds-tooltip`. Init has already added the `@helvetia-design/*` packages. This task rewrites usages only.

The legacy folder has no child elements. Rewrite `bal-tooltip` only. Leave slotted content in place, including an Angular `<ng-template>` wrapper. `bal-stack` rendered inside the legacy shadow tree is not a consumer tag.

## 1. Scan

`<project-root>` is the consumer project root that contains the app lockfile. When the skill is invoked from that root, use the current directory.

```bash
node <this-skill-directory>/scripts/scan-bal-tooltip.mjs <project-root>
```

The script prints one JSON object. `total` is the number of findings. `files` groups them by path. Each finding has `line` and `snippet`.

Show that list to the user grouped by file (path, line, snippet) and end with the total count.

Done when the user has seen every finding and the total. If `total` is 0, say there are no `bal-tooltip` usages to migrate and stop.

## 2. Confirm

Ask for one yes/no: rewrite every listed usage?

On no, stop with the files unchanged.

On yes, continue. Editing starts only after that answer.

Done when the user has answered.

## 3. Rewrite

Edit each finding yourself, using the mapping below. Read the whole element when attributes continue past the snippet's first line. This step is finished when every finding matches the mapping.

### Props

| old (`bal-tooltip`)                                                                                                                                                                                               | new (`ds-tooltip`)                                  | handling                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reference`                                                                                                                                                                                                       | `reference`                                         | Copy as-is, including `reference=""`.                                                                                                                                                                                                                                                                                                                                                                          |
| `placement="top"` / `placement="right"` / `placement="bottom"` / `placement="left"`                                                                                                                               | same                                                | Copy as-is, including the `'...'`, `{"..."}`, and `{'...'}` forms.                                                                                                                                                                                                                                                                                                                                             |
| `placement="top-start"` / `placement="top-end"` / `placement="right-start"` / `placement="right-end"` / `placement="bottom-start"` / `placement="bottom-end"` / `placement="left-start"` / `placement="left-end"` | the side only (`top`, `right`, `bottom`, or `left`) | `ds-tooltip` accepts only those four sides. Drop the `start` or `end` alignment. Also rewrite the `'...'`, `{"..."}`, and `{'...'}` forms. Mention each dropped alignment in the summary.                                                                                                                                                                                                                      |
| `placement` not a string literal                                                                                                                                                                                  | leave the expression                                | Do not guess a runtime placement. Say in the summary that a `start` or `end` alignment must be passed as the side only (`top`, `right`, `bottom`, or `left`).                                                                                                                                                                                                                                                  |
| `offset` omitted                                                                                                                                                                                                  | omit `offset`                                       | Leave `offset` unset. Legacy positioning always used 8px and ignored this prop. `ds-tooltip` defaults to 8 and applies the prop.                                                                                                                                                                                                                                                                               |
| `offset` set                                                                                                                                                                                                      | `offset`                                            | Copy the value, including `offset="0"`, `offset={0}`, `offset="16"`, and `offset={16}`. Mention in the summary that the value was ignored before and now changes the gap from 8px.                                                                                                                                                                                                                             |
| `contentWidth` / `content-width`                                                                                                                                                                                  | same                                                | Copy as-is.                                                                                                                                                                                                                                                                                                                                                                                                    |
| `demo`, `demo="true"`, `demo={true}`                                                                                                                                                                              | `open`                                              | Legacy `demo` presents the tooltip on load. HTML and Angular: write `open="true"`. React: write `open`. Also rewrite `demo='true'`, `demo={"true"}`, and `demo={'true'}`.                                                                                                                                                                                                                                      |
| `demo="false"`, `demo={false}`                                                                                                                                                                                    | omit `open`                                         | Drop `demo`. Default `open` is false.                                                                                                                                                                                                                                                                                                                                                                          |
| `label`                                                                                                                                                                                                           | _(no equivalent prop)_                              | Drop `label`, including every value. Old Storybook documents `label`, and the component does not implement it. `ds-tooltip` has no `label`. Mention each dropped `label` in the summary.                                                                                                                                                                                                                       |
| `bal-tooltip-placement` on the trigger                                                                                                                                                                            | `placement` on `ds-tooltip`                         | Legacy `present()` reads this attribute from the trigger and uses it instead of the tooltip `placement`. `ds-tooltip` does not. Move the value onto the tooltip `placement`, applying the alignment row above. When the tooltip already sets `placement`, the trigger attribute still wins, because that is what legacy used. Drop `bal-tooltip-placement` from the trigger. Mention each move in the summary. |
| _(none)_                                                                                                                                                                                                          | `open`                                              | New prop, aside from the `demo` row. Nothing else to migrate from. Leave `open` unset when `demo` was not true.                                                                                                                                                                                                                                                                                                |

### Tags and imports

- **HTML**: `<bal-tooltip>` becomes `<ds-tooltip>`, including the closing tag.
- **Angular**: `<bal-tooltip>` becomes `<ds-tooltip>` in `.html` templates and in inline `template:` strings, including the closing tag. When a file imports `BalTooltip` from `@baloise/ds-angular`, move only `BalTooltip` to `import { DsTooltip } from '@helvetia-design/angular'` and leave the other symbols on the `@baloise` import.
- **React**: `<BalTooltip>` becomes `<DsTooltip>` and `</BalTooltip>` becomes `</DsTooltip>`. Import `DsTooltip` from `@helvetia-design/react`. When the existing `@baloise/ds-react` import also binds other symbols, move only `BalTooltip` to `import { DsTooltip } from '@helvetia-design/react'` and leave the other symbols on the `@baloise` import.

`present()`, `dismiss()`, and `update()` keep those names.

### Events

| old              | new             | handling                                                                                                                                                                                       |
| ---------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `balWillAnimate` | `dsWillAnimate` | Rewrite `addEventListener('balWillAnimate'` to `addEventListener('dsWillAnimate'`. Angular: `(balWillAnimate)` becomes `(dsWillAnimate)`. React: `onBalWillAnimate` becomes `onDsWillAnimate`. |
| `balDidAnimate`  | `dsDidAnimate`  | Same shapes: `addEventListener('balDidAnimate'`, `(balDidAnimate)`, and `onBalDidAnimate` become `dsDidAnimate`, `(dsDidAnimate)`, and `onDsDidAnimate`.                                       |
| event `detail`   | boolean         | Legacy `emit()` sends no detail. `ds-tooltip` emits `true` when showing and `false` when hiding. Mention each listener in the summary.                                                         |
| `update()` emits | none            | Legacy `update()` emits both animate events. `ds-tooltip` `update()` does not. Mention listeners that were observing reposition.                                                               |

In each file that has a finding, also rewrite `balWillAnimate` and `balDidAnimate` listeners that are not on the element, including `addEventListener`. The scan does not list a file that only listens and never uses `bal-tooltip` or `BalTooltip`.

`ds-tooltip` has no arrow. Legacy drew one. There is no prop to migrate. Mention that in the summary.

Legacy skips hover and focus listeners on touch screens. `ds-tooltip` always binds `mouseenter`, `focus`, `mouseleave`, and `blur`. Mention that in the summary.

## 4. Report

Print a per-file summary of what changed, including every dropped `start` or `end` alignment, every `offset` that now applies, every dropped `label`, every `bal-tooltip-placement` moved onto `placement`, every animate listener whose detail is now a boolean, the missing arrow, and the touch-screen listener change. Leave every change unstaged for the consumer to review. Stop. Do not run `git add` or `git commit`.

Done when the summary is printed and the working tree is still unstaged.
