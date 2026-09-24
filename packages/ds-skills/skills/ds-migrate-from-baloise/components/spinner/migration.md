# spinner

Migrate every `bal-spinner` usage to `ds-spinner`. Init has already added the `@helvetia/*` aliases. This task rewrites usages only.

## 1. Scan

`<project-root>` is the consumer project root that contains the app lockfile. When the skill is invoked from that root, use the current directory.

```bash
node <this-skill-directory>/scripts/scan-bal-spinner.mjs <project-root>
```

The script prints one JSON object. `total` is the number of findings. `files` groups them by path. Each finding has `line` and `snippet`.

Show that list to the user grouped by file (path, line, snippet) and end with the total count.

Done when the user has seen every finding and the total. If `total` is 0, say there are no `bal-spinner` usages to migrate and stop.

## 2. Confirm

Ask for one yes/no: rewrite every listed usage?

On no, stop with the files unchanged.

On yes, continue. Editing starts only after that answer.

Done when the user has answered.

## 3. Rewrite

Edit each finding yourself, using the mapping below. Read the whole element when attributes continue past the snippet's first line. This step is finished when every finding matches the mapping.

### Props

| old (`bal-spinner`)                       | new (`ds-spinner`)                                 | handling                                                                                                                                                                                                                   |
| ----------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `deactivated`                             | `deactivated`                                      | Copy as-is, including `deactivated="false"` and `deactivated={false}`.                                                                                                                                                     |
| `variation="logo"` / `variation="circle"` | same                                               | Copy as-is.                                                                                                                                                                                                                |
| `inverted`                                | `inverted`                                         | Copy as-is.                                                                                                                                                                                                                |
| `small`, `small="true"`, `small={true}`   | `size="sm"`                                        | Rewrite to `size="sm"`.                                                                                                                                                                                                    |
| `small="false"`, `small={false}`          | omit `size`                                        | Drop `small`. Leave `size` unset.                                                                                                                                                                                          |
| `color="blue"`                            | _(no equivalent prop)_                             | Drop `color`. Default rendering already matches blue. Also drop `color='blue'`, `color={"blue"}`, and `color={'blue'}`.                                                                                                    |
| `color="white"`                           | `inverted`                                         | HTML and Angular: write `inverted="true"`. React: write `inverted`. Also rewrite `color='white'`, `color={"white"}`, and `color={'white'}`. When `inverted` is already present, drop `color` and keep a single `inverted`. |
| _(none)_                                  | `label`                                            | New prop. Nothing to migrate from. Leave it unset.                                                                                                                                                                         |
| _(none)_                                  | `labelPosition="right"` / `labelPosition="bottom"` | New prop. Nothing to migrate from. Leave `labelPosition` unset.                                                                                                                                                            |

### Tags and imports

- **HTML**: `<bal-spinner>` becomes `<ds-spinner>`, including the closing tag.
- **Angular**: `<bal-spinner>` becomes `<ds-spinner>` in `.html` templates and in inline `template:` strings, including the closing tag.
- **React**: `<BalSpinner>` becomes `<DsSpinner>` and `</BalSpinner>` becomes `</DsSpinner>`. Import `DsSpinner` from `@helvetia/ds-react`. When the existing `@baloise/ds-react` import also binds other symbols, move only `BalSpinner` to `import { DsSpinner } from '@helvetia/ds-react'` and leave the other symbols on the `@baloise` import.

### Events

There are no event changes. Neither `bal-spinner` nor `ds-spinner` emits a custom event. Leave existing event bindings unchanged.

## 4. Report

Print a per-file summary of what changed. Leave every change unstaged for the consumer to review. Stop. Do not run `git add` or `git commit`.

Done when the summary is printed and the working tree is still unstaged.
