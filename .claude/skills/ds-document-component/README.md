# ds-document-component Skill

Auto-generates Storybook documentation for Helvetia Design System components.

## Overview

This skill automatically creates comprehensive component documentation by:
1. Reading component metadata from `components.json`
2. Analyzing visual test files (`visual.html`) and extracting sections
3. Detecting component type (web-component-only, hybrid, CSS-only)
4. Presenting a checklist of visual sections to document
5. Generating 6 numbered MDX files with AI-written content
6. Creating interactive Storybook stories from selected sections
7. Auto-detecting and documenting sub-components

**Invocation:** `ds-document-component button`

## Files

- **SKILL.md** — User documentation with quick start and examples
- **REFERENCE.md** — Technical details (MDX templates, story generation, algorithms)
- **README.md** — This file
- **index.js** — CLI entry point
- **implementation.js** — Core logic

## Implementation Status

✅ **Complete:**
- Component type detection (WC-only, hybrid, CSS-only)
- Visual.html section extraction and parsing
- Checklist presentation (auto-selects all by default)
- Generation preview before file write
- MDX file generation (6 files with contextual content)
- stories.ts generation (with selected sections as story exports)
- doc-config.ts generation
- Sub-component detection and recursive documentation
- File writing to disk

🔄 **Future Enhancements:**
- Interactive checklist UI (currently auto-selects all)
- User confirmation flow (y/n prompts)
- Smart section naming and mapping
- JSDoc comment extraction from .tsx files
- Advanced MDX content generation (more context-aware)

❌ **Out of Scope:**
- Git operations (user commits manually)
- npm command execution (user runs `npm run docs`)
- Figma metadata synchronization

## Core Workflow

```
1. Detect component type (WC-only, hybrid, CSS-only)
2. Parse visual.html and extract sections
3. Show checklist (auto-select all)
4. Show generation preview
5. Generate MDX files:
   - 1-Overview: Component description and use cases
   - 2-Usage: Props, events, slots, basic example
   - 3-Variants: Visual variations from selected sections
   - 4-Styling: CSS variables and theming
   - 5-Accessibility: WCAG compliance and keyboard support
   - 6-Testing: Test patterns and commands
6. Generate stories.ts (WC-only) with selected sections
7. Generate doc-config.ts with component metadata
8. Auto-detect sub-components
9. Repeat steps 2-7 for each sub-component
```

## Component Type Detection

- **Only .host.scss** → Web-component-only
- **Only .style.scss** → CSS-only
- **Both files** → Hybrid

Treatment:
- Web-component-only: Full stories + all 6 MDX with rich content
- Hybrid: Minimal/no stories + all 6 MDX (4-5 full, others placeholder)
- CSS-only: No stories + all 6 MDX (4-5 full, others placeholder)

## MDX File Generation

Content sources (in priority order):
1. JSDoc comments from component .tsx file
2. Component metadata from components.json
3. Visual.html section names and content
4. AI-generated contextual content

Files are written to `docs/src/components/[component]/`:
- `1-Overview.mdx` — Overview and use cases
- `2-Usage.mdx` — Props, events, slots API documentation
- `3-Variants.mdx` — Visual variations
- `4-Styling.mdx` — CSS variables and theming (full content for all types)
- `5-Accessibility.mdx` — WCAG compliance (full content for all types)
- `6-Testing.mdx` — Testing patterns

## Story Generation

For web-component-only components:
- One story per selected visual.html section
- Story names with emoji prefixes: `🧩 ComponentVersion`
- Full prop controls from components.json via `withComponentControls()`
- HTML extracted and cleaned from visual.html sections

Stories file: `docs/src/components/[component]/[component].stories.ts`

## Sub-Component Handling

Auto-detects subdirectories with `.tsx` files (e.g., `button-group` in `button/`).

For each sub-component:
1. Check for `[subcomponent]/test/[subcomponent].visual.html`
2. If exists: parse sections and generate documentation
3. If not: generate MDX boilerplate only
4. Create in subdirectory: `docs/src/components/button/button-group/`

## Example Output

```
✅ Generated documentation for button

Created files:
  docs/src/components/button/
    ✓ 1-Overview.mdx
    ✓ 2-Usage.mdx
    ✓ 3-Variants.mdx
    ✓ 4-Styling.mdx
    ✓ 5-Accessibility.mdx
    ✓ 6-Testing.mdx
    ✓ button.stories.ts
    ✓ button.doc-config.ts

  docs/src/components/button/button-group/
    ✓ 1-Overview.mdx
    ✓ 2-Usage.mdx
    ✓ 3-Variants.mdx
    ✓ 4-Styling.mdx
    ✓ 5-Accessibility.mdx
    ✓ 6-Testing.mdx
    ✓ button-group.stories.ts
    ✓ button-group.doc-config.ts
```

## Testing

Test the skill manually:

```bash
# Document the button component
ds-document-component button

# Check generated files
ls -la docs/src/components/button/
cat docs/src/components/button/1-Overview.mdx

# Start Storybook to preview
npm run docs
```

## Related Context

- Component structure: `packages/core/src/components/[component]/`
- Visual test files: `packages/core/src/components/[component]/test/[component].visual.html`
- Component metadata: `docs/src/assets/data/components.json` (auto-generated by Stencil)
- Storybook utilities: `docs/src/utils/controls.ts`
- Documentation location: `docs/src/components/[component]/`

## Next Steps

1. **Interactive checklist** — Add prompts library for user selection (currently auto-selects all)
2. **JSDoc extraction** — Parse .tsx files for more detailed prop/event descriptions
3. **Smart content** — Use component props/events to infer and write better MDX content
4. **Template customization** — Allow user-defined MDX templates
5. **Batch operations** — Document multiple components at once
