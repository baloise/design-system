---
name: ds-create-component
description: Create new web components in the Helvetia Design System. Generates Stencil component files with shadow DOM, interfaces, SCSS with design tokens, and visual HTML. Use when building a new component, migrating from the old design system, or creating subcomponents.
---

# ds-create-component

Create new web components in the Helvetia Design System with a guided questionnaire. Generates all necessary files in one pass: `.tsx`, `.interfaces.ts`, `.host.scss`, and `.visual.html`.

## Quick Start

```bash
/ds-create-component
```

The skill will ask you a series of questions to understand your component, then generate all files at once.

## Workflow

### 1. Answer the Questionnaire

The skill asks:

1. **Component name** — e.g., `button`, `card`, `modal`
2. **Component purpose** — What does it do? e.g., "Renders a clickable element with text and optional icon"
3. **Migration?** — Are you migrating from the old design system? If yes, provide the old component name
   - The skill auto-extracts props and events from the old component
4. **Props** — Define component properties (you can edit auto-extracted ones)
   - Format: `propName: PropType = defaultValue` (e.g., `label: string = ''`, `disabled: boolean = false`)
5. **Events** — Define custom events (you can edit auto-extracted ones)
   - Format: `dsEventName` (e.g., `dsClick`, `dsChange`)
6. **Subcomponents?** — Does this component have child components? (e.g., `tab` inside `tabs`)
   - If yes, list them (e.g., `tab, tab-content`)
7. **Variants** — List visual variants for your component (e.g., `primary, secondary, danger`)
   - The skill generates a visual HTML section for each variant

### 2. Skill Generates Files

Once you answer all questions, the skill creates:

- ✅ `<component>.tsx` — Stencil component with all props/events, basic render with `<slot>`
- ✅ `<component>.interfaces.ts` — TypeScript types and enums for props
- ✅ `<component>.host.scss` — Shadow DOM styles with design token structure and variants
- ✅ `<component>.visual.html` — Visual test file with sections for each variant
- ✅ **Subcomponents** (if specified) — Same structure inside `<component>/<subcomponent>/`

### 3. Validation & Registration

The skill:

- ✅ **Pre-checks** — Warns if component already exists (you can overwrite)
- ✅ **Validates tokens** — Scans generated SCSS for token usage:
  - ✅ Alias tokens (`--ds-alias-*`) — all good
  - ✅ Component tokens (`--ds-<component>-*`) — all good
  - ⚠️ Global tokens (`--ds-*` without alias prefix) — **warning** with recommendation to create an alias token
  - 🚫 Hardcoded values — flagged
- ✅ **Registers component** — Adds to `packages/core/src/index.ts`
- ✅ **Migration handling** — If migrating from old design system:
  - Extracts props/events automatically
  - Flags a11y/SEO breaking changes
  - Generates accessible Shadow DOM structure (overrides old structure if needed)

### 4. Next Steps

After generation, the skill prints:

```
✅ Component created: packages/core/src/components/button/

Next steps:
1. Review the generated component files
2. Refine render() logic and add your component-specific code
3. Update SCSS variants if needed
4. Run: npm run play
5. Create tests with /ds-sync-component-tests
```

## Rules Applied

The skill enforces these design system rules:

- ✅ **Web-only** — Creates Stencil components with shadow DOM (`.host.scss` only)
- ✅ **Shadow DOM** — All components use `shadow: true`
- ✅ **Accessibility** — Generates WCAG 2.2 AA compliant structure with `<slot>` for light DOM content
- ✅ **Design tokens** — Uses alias tokens first, warns about globals
- ✅ **Subcomponents** — Nested in parent folder (`tabs/tab.tsx`, not `tabs` and `tab` at same level)
- ✅ **Component registration** — Automatically added to `packages/core/src/index.ts`
- ✅ **Naming conventions** — `ds-` prefix, `ComponentInterface` + `Loggable` implementation (see STYLE_GUIDE.md)

## Examples

### Example 1: Simple Component (No Migration)

```
Q: Component name?
A: badge

Q: Component purpose?
A: Displays a small label with customizable color and size

Q: Migration from old design system?
A: no

Q: Props?
A: label: string = '', color: 'primary'|'secondary'|'danger' = '', size: 'sm'|'md'|'lg' = 'md'

Q: Events?
A: (none)

Q: Subcomponents?
A: no

Q: Variants?
A: primary, secondary, danger, small, medium, large
```

Result: Generated `badge.tsx`, `badge.interfaces.ts`, `badge.host.scss`, `badge.visual.html`

### Example 2: Component with Subcomponents (Migration)

```
Q: Component name?
A: tabs

Q: Component purpose?
A: Container for tab content with keyboard navigation and ARIA support

Q: Migration from old design system?
A: yes, old-tabs

(skill auto-extracts props/events from old-tabs)

Q: Props? (pre-filled from old-tabs, you review)
A: (accept defaults)

Q: Events? (pre-filled from old-tabs)
A: (accept defaults)

Q: Subcomponents?
A: yes
   - tab
   - tab-panel

Q: Variants?
A: horizontal, vertical
```

Result: Generated:

- `tabs.tsx`, `tabs.interfaces.ts`, `tabs.host.scss`, `tabs.visual.html`
- `tabs/tab/tab.tsx`, `tabs/tab/tab.interfaces.ts`, `tabs/tab/tab.host.scss`
- `tabs/tab-panel/tab-panel.tsx`, `tabs/tab-panel/tab-panel.interfaces.ts`, `tabs/tab-panel/tab-panel.host.scss`

Plus warnings if old component used global tokens (e.g., _"⚠️ Using global token `--ds-color-primary`. Consider using alias token `--ds-alias-color-primary` or creating component token `--ds-tabs-color-primary`"_)

## What's NOT Included

This skill **only generates components**. The following are handled by other skills:

- ❌ **Tests** — Use `/ds-sync-component-tests` to create unit, interaction, visual, and a11y tests
- ❌ **Storybook stories** — Create `.stories.ts` and `.mdx` files separately
- ❌ **Type definitions** — Auto-generated when you run `npm run build`

## Token Warnings

When the skill validates tokens, it prints warnings like:

```
⚠️ Token Issue: Global token used
   File: button.host.scss, line 25
   Found: var(--ds-color-primary)

   Recommendation:
   1. Use alias token instead: var(--ds-alias-color-primary)
   2. Or create a component token: --ds-button-color-primary
   3. Add to Base.tokens.json and re-run: npm run tokens

   This is a warning only. You can proceed.
   See: docs/agents/domain.md (Design tokens section)
```

## Troubleshooting

**Q: "Component already exists" warning**

A: The skill found an existing component. Review whether you should:

- Use the existing component (check `/ds-find-component`)
- Overwrite it (if intentional)
- Create a subcomponent instead (nested in a parent)

**Q: "No alias token available" warning**

A: A design token (e.g., `--ds-alias-color-status`) doesn't exist yet. Either:

- Use a different alias token that exists
- Create a new alias token in `packages/tokens/tokens/Base.tokens.json`
- Use a global token (with warning) as a temporary solution

**Q: How do I refine the generated component?**

A: The generated `.tsx` file has a basic `render()` with `<slot>`. Add:

- Component logic in methods
- Event handlers
- State management if needed
- Props validation (see STYLE_GUIDE.md)

See [REFERENCE.md](REFERENCE.md) for template structure and patterns.

## See Also

- [STYLE_GUIDE.md](../../STYLE_GUIDE.md) — Code standards
- [packages/core/CONTEXT.md](../../packages/core/CONTEXT.md) — Component patterns and lifecycle
- [packages/tokens/CONTEXT.md](../../packages/tokens/CONTEXT.md) — Design tokens and naming
- [ARCHITECTURE.md](../../ARCHITECTURE.md) — Component file structure and CSS variable cascade
