---
name: ds-create-token
description: Create design tokens for a component from its CSS variables
---

# ds-create-token

Create component design tokens from CSS variables defined in a component's SCSS file. The skill analyzes `vars.local()` calls and variant `--mod-` variables, suggests component token paths, and creates them in `Base.tokens.json`.

## Usage

```
/ds-create-token <component-name>
```

Examples:

```
/ds-create-token badge
/ds-create-token button
/ds-create-token footer
```

## Workflow

### Step 1: Extract & Display

- Parses component SCSS files for `@include vars.local()` and `--mod-` variables
- Shows a table with:
  - Component variable name
  - Current value (alias/global/hardcoded)
  - Value type
  - Status indicator
- Displays **preview** of component tokens that will be created
- User confirms to proceed to Step 2

### Step 2: Suggest Paths & Confirm

For each variable:

- **Hardcoded values** → Uses `ds-find-token` skill to find matching alias tokens
  - If no match found → Suggests creating new Alias token (user confirms)
- **Global tokens** → Suggests replacing with Alias equivalent
- Proposes component token path following: `--ds-[component]-[variant]-[element]-[category]-[property]-[state]`
  - Missing segments are skipped (no placeholders)
  - State segment only included if multiple states exist
- User can review, edit, or confirm each mapping

### Step 3: Write & Compile

- **Backs up** `Base.tokens.json`
- Writes new tokens to `Base.tokens.json`
- Creates any new Alias tokens needed
- Runs `npm run tokens` to compile outputs
- Shows success summary with created tokens

## Token Path Structure

Component tokens always follow this structure:

```
--ds-[component]-[variant]-[element]-[category]-[property]-[state]
```

**Example:** `--ds-badge-primary-color-base-text`

- `component`: badge
- `variant`: primary
- `element`: (skipped if not present)
- `category`: color
- `property`: text
- `state`: base

## Requirements

- Component must exist in `packages/core/src/components/`
- Component must have a `.host.scss` file with `vars.local()` definitions
- Design tokens must already be compiled (run `npm run tokens` first if needed)
