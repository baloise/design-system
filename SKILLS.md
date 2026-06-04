# Design System Skills Guide

This document provides an overview of all available AI skills for working with the Baloise Design System.

## Project Skills (`.claude/skills/`)

These skills are custom-built for the design system and help automate component and token workflows.

### 1. **ds-create-component**

Create new web components in the design system.

**Usage:** `/ds-create-component`

**What it does:**

- Guided questionnaire to understand your component
- Generates `.tsx`, `.interfaces.ts`, `.host.scss`, and `.visual.html` files
- Sets up Shadow DOM with design tokens
- Creates component scaffolding following design system patterns

**Use when:**

- Building a new component from scratch
- Migrating components from the old design system
- Creating sub-components

**Output:** Complete component scaffold with all required files and proper structure

---

### 2. **ds-create-token**

Create design tokens for a component from its CSS variables.

**Usage:** `/ds-create-token <component-name>`

**Examples:**

```bash
/ds-create-token badge
/ds-create-token button
/ds-create-token footer
```

**What it does:**

- Parses component SCSS files for `@include vars.local()` calls
- Extracts variant `--mod-` variables from CSS classes
- Detects hardcoded values and global tokens
- Suggests component token paths following naming conventions
- Optionally uses `ds-find-token` to find alias matches
- Writes new tokens to `Base.tokens.json`
- Runs `npm run tokens` to compile outputs

**Workflow:**

1. **Step 1:** Extract variables and show preview
2. **Step 2:** Suggest component token paths
3. **Step 3:** User confirms and reviews
4. **Step 4:** Creates tokens and compiles

**Use when:**

- Converting component CSS variables to design tokens
- Standardizing component styling with the design token system
- Creating tokens for component variants

**Output:** Component tokens in `Base.tokens.json` following the naming anatomy

---

### 3. **ds-document-component**

Generate Storybook documentation for a component.

**Usage:** `/ds-document-component <component-name>`

**Examples:**

```bash
/ds-document-component badge
/ds-document-component button
```

**What it does:**

- Creates complete documentation set in `docs/src/components/<component>/`
- Generates 6 MDX files + 2 TypeScript support files
- Uses reusable Storybook blocks for consistency
- Dynamically binds to `components.json` data

**Documentation files generated:**

1. `1-Overview.mdx` — Canvas + Controls + Component info
2. `2-Usage.mdx` — When to use, do's/don'ts, examples
3. `3-Variants.mdx` — All story variants
4. `4-Styling.mdx` — CSS variables, design tokens, styling
5. `5-Accessibility.mdx` — WCAG guidelines
6. `6-Testing.mdx` — Page Object API, test examples
7. `<component>.stories.ts` — Stencil story exports
8. `<component>.stories.config.ts` — Configuration

**Use when:**

- Documenting a new component
- Adding Storybook documentation to existing components
- Updating component documentation

**Output:** Complete documentation scaffold in Storybook format

---

### 4. **ds-lint-component**

Lint and fix components against the design system style guide.

**Usage:**

```bash
/ds-lint-component <component-name> check   # Report violations
/ds-lint-component <component-name> fix     # Auto-fix violations
```

**Examples:**

```bash
/ds-lint-component button check
/ds-lint-component badge fix
```

**What it checks:**

- Prop validation coverage
- Divider comment formatting
- Lifecycle hook setup
- Style guide compliance
- Naming conventions

**Use when:**

- Building or reviewing components
- Ensuring style guide compliance
- Fixing linting issues

**Output:** Violations report or auto-fixed component files

---

### 5. **ds-test-component**

Auto-generate all test files for a component.

**Usage:** `/ds-test-component <component-name>`

**Examples:**

```bash
/ds-test-component badge
/ds-test-component button
```

**What it does:**

- Parses component props, events, slots, parts, states
- Generates all test types in one command
- Creates test scaffolding with proper structure

**Test files generated:**

- `.spec.ts` — Unit tests (Vitest)
- `.component.play.ts` — Interaction tests (Playwright)
- `.visual.play.ts` — Visual regression tests
- `.a11y.play.ts` — Accessibility tests (WCAG 2.2 AA)
- `.po.ts` — Page Object in `packages/playwright/`

**Use when:**

- Creating new components
- Setting up comprehensive test coverage
- Generating test scaffolding

**Output:** Complete test suite covering unit, interaction, visual, and accessibility testing

---

## Global Skills

These are available across all Anthropic projects.

### **ds-find-token**

Find design tokens by value or type.

**Usage:**

```bash
/ds-find-token value 16          # Find tokens with value "16"
/ds-find-token type background  # Find all background-related tokens
```

**What it does:**

- Searches design tokens by resolved value
- Searches by category/type (partial matching)
- Shows Figma path, CSS variable, inherited token, and resolved value
- Groups results by Alias and Component tokens

**Use when:**

- Finding which tokens use a specific value
- Looking for all tokens in a category
- Understanding token relationships

---

## Common Workflows

### Creating a New Component

1. **Create component structure:**

   ```bash
   /ds-create-component
   ```

   Answer the questionnaire to generate component files

2. **Create component tokens** (if needed):

   ```bash
   /ds-create-token <component-name>
   ```

   Convert CSS variables to design tokens

3. **Generate tests:**

   ```bash
   /ds-test-component <component-name>
   ```

   Auto-generate test files

4. **Lint and fix:**

   ```bash
   /ds-lint-component <component-name> check
   /ds-lint-component <component-name> fix
   ```

   Ensure style guide compliance

5. **Document component:**
   ```bash
   /ds-document-component <component-name>
   ```
   Generate Storybook documentation

### Finding a Design Token

1. **Search by value:**

   ```bash
   /ds-find-token value #FFFFFF
   ```

2. **Search by category:**

   ```bash
   /ds-find-token type color
   ```

3. **Review results:**
   Look at FigmaName, CSS Variable, Inherit Token, and Resolved Value columns

### Updating Existing Component

1. **Check compliance:**

   ```bash
   /ds-lint-component <component-name> check
   ```

2. **Fix issues:**

   ```bash
   /ds-lint-component <component-name> fix
   ```

3. **Update documentation if needed:**
   ```bash
   /ds-document-component <component-name>
   ```

## Token Path Structure

When creating tokens with `ds-create-token`, paths follow this structure:

```
--ds-[component]-[variant]-[element]-[category]-[property]-[state]
```

**Example breakdown:**

```
--ds-badge-primary-color-base-text
   │   │     │       │      │  │
   │   │     │       │      │  └─ state (base, hover, active)
   │   │     │       │      └─ property (text, background, border)
   │   │     │       └─ category (color, spacing, typography)
   │   │     └─ element (optional - label, icon, etc)
   │   └─ variant (primary, secondary, etc)
   └─ component (badge, button, etc)
```

Missing segments are skipped (no placeholders).

## Token Naming Convention

### Global Tokens

```
--ds-global-[category]-[name]-[number]
```

Example: `--ds-global-color-primary-4`

### Alias Tokens

```
--ds-alias-[category]-[subcategory]-[name]
```

Example: `--ds-alias-background-color-sky`

### Component Tokens

```
--ds-[component]-[variant]-[element]-[category]-[property]-[state]
```

Example: `--ds-button-primary-color-base-text`

## Key Commands Reference

| Task                | Command                           |
| ------------------- | --------------------------------- |
| Create component    | `/ds-create-component`            |
| Create tokens       | `/ds-create-token <name>`         |
| Generate tests      | `/ds-test-component <name>`       |
| Generate docs       | `/ds-document-component <name>`   |
| Lint component      | `/ds-lint-component <name> check` |
| Fix component       | `/ds-lint-component <name> fix`   |
| Find tokens         | `/ds-find-token value <value>`    |
| Find tokens by type | `/ds-find-token type <type>`      |

## See Also

- [ARCHITECTURE.md](ARCHITECTURE.md) — System design and implementation patterns
- [STYLE_GUIDE.md](STYLE_GUIDE.md) — Code standards and conventions
- [packages/tokens/CONTEXT.md](packages/tokens/CONTEXT.md) — Design token architecture
- [packages/core/CONTEXT.md](packages/core/CONTEXT.md) — Component patterns
