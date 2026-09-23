---
name: ds-migrate-from-baloise
description: Migrate a consuming app from the Baloise Design System (bal-*) to the Helvetia Design System (ds-*). Use when bootstrapping Helvetia packages alongside Baloise, or when migrating components, CSS utilities, or assets.
---

# ds-migrate-from-baloise

This skill edits files in the consumer's repository and leaves every change unstaged. Reviewing and committing is the consumer's job. This skill never runs `git add` or `git commit`.

## Menu

On invocation, present this menu and wait for one choice:

1. **Init** — bootstrap Helvetia packages alongside the existing Baloise install
2. **Components** — migrate a specific `bal-*` component to `ds-*`
3. **CSS utils (coming soon)**
4. **Assets (coming soon)**

Then follow only the matching section below. Stop when that section says to stop.

### Init

Bootstrap the Helvetia packages alongside the existing Baloise install. Do not remove or edit existing `@baloise/*` dependencies or imports.

Scan `<project-root>`, the consumer project root that contains the app lockfile. When the skill is invoked from that root, use the current directory.

```bash
node <this-skill-directory>/scripts/detect-baloise.mjs <project-root>
```

The script prints one JSON object. It resolves the current `next` dist-tag with `npm view @baloise/ds-core dist-tags`. Use `version` and `aliases` from that JSON. Do not hardcode a version.

The walk skips `node_modules`, `dist`, `build`, `out`, `.next`, `.angular`, `.git`, `.claude`, and `coverage` at any depth.

If `status` is `nothing-to-migrate`, tell the user: no Baloise Design System installation detected, nothing to migrate. Stop. Do not edit files and do not install.

If `status` is `error`, tell the user `message` and stop. Do not edit files and do not install.

If `status` is `ready`, show the detected framework, package manager, version, aliases, and bootstrap files, then ask for one yes/no. On no, stop without editing. On yes:

1. Add each entry in `aliases` to the `dependencies` object of `packageJsonPath` (relative to `<project-root>`). Create `dependencies` if it is missing. Do not change or remove existing keys. If an `@helvetia/*` key is already present, leave its value unchanged and report both the existing value and the alias from the JSON.
2. From `<project-root>`, run `installCommand` exactly (`pnpm install`, `yarn install`, or `npm install`). Do not add extra package arguments.
3. Insert the new CSS/JS import next to the existing `@baloise/*` one:
   - For every `imports` entry with `kind` `bootstrap`, add the `@helvetia` equivalent immediately below that line. Leave the original line unchanged.
   - When the line is HTML, CSS, or a side-effect import, duplicate the line. In the duplicate only, replace `@baloise/ds-core`, `@baloise/ds-react`, `@baloise/ds-angular`, and `@baloise/ds-styles` with the same package name under `@helvetia`.
   - When the line is JSON, such as an `angular.json` styles entry, insert a sibling string with that same scope replacement. Keep the file valid JSON. Do not copy surrounding keys, and do not duplicate the whole file when the match is only one string.
   - If that duplicate would still be an `http://` or `https://` URL, do not write the URL. Insert the local form below instead.
   - Do not duplicate `kind` `reference` lines. Those are component imports; migrating them is a later menu item.
   - If there is no `bootstrap` import, insert the local form immediately after the first `reference` line, without editing that line.
   - Skip the insert when the same `@helvetia` line is already the next line.
   - Local form when `framework` is `html`:

     ```html
     <link rel="stylesheet" href="node_modules/@helvetia/ds-styles/dist/css/design-system.css" />
     <script type="module" src="node_modules/@helvetia/ds-core/dist/design-system/design-system.esm.js"></script>
     ```

   - Local form when `framework` is `react` or `angular`:

     ```ts
     import '@helvetia/ds-styles/css/design-system'
     ```

4. Report the resolved `version`, the aliases written, the install command, and every file touched.
5. Stop. Do not run `git add` or `git commit`. Leave every change unstaged for the consumer to review.

### Components

List every file matching `components/*.md` or `components/*/migration.md` in this skill folder. Build a picker from each file's title (the first Markdown heading). Dispatch to the chosen file's instructions.

If that list is empty, report that no component migrations are available yet, then stop.

### CSS utils (coming soon)

Report "coming soon" and stop.

### Assets (coming soon)

Report "coming soon" and stop.
