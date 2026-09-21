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

Init is not implemented yet. Tell the user it lands in a follow-up, then stop.

### Components

List every file matching `components/*.md` or `components/*/migration.md` in this skill folder. Build a picker from each file's title (the first Markdown heading). Dispatch to the chosen file's instructions.

If that list is empty, report that no component migrations are available yet, then stop.

### CSS utils (coming soon)

Report "coming soon" and stop.

### Assets (coming soon)

Report "coming soon" and stop.
