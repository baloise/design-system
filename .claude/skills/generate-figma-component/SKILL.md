---
name: generate-figma-component
description: >
  Use when linking a Baloise DS component to Figma — creates the figma.spec.json
  (for the generic Figma plugin that generates the ComponentSet with variable bindings)
  and the Figma Code Connect file (.figma.connect.ts). Covers three layers: token sync
  (already done by Style Dictionary), component generation via the shared plugin spec,
  and Code Connect so Dev Mode shows real web component usage code.
---

# Generate Figma Component

Connects a `ds-*` Stencil component to its Figma counterpart across four layers.

| Layer              | What it produces                                                 | Trigger to re-run                |
| ------------------ | ---------------------------------------------------------------- | -------------------------------- |
| 1 — Token sync     | Figma variables (already handled by Style Dictionary)            | Token value change               |
| 2 — Component spec | `<name>.figma.spec.json` → generic plugin generates ComponentSet | New variant or structural change |
| 3 — Code Connect   | `<name>.figma.connect.ts` → Dev Mode shows real usage code       | Prop rename / new prop           |

---

## Key Files

| File                                                          | Purpose                                                                             |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `packages/core/src/components/<name>/<name>.interfaces.ts`    | Variant arrays and types — source of truth for variant axes                         |
| `packages/tokens/tokens/Base.tokens.json`                     | Token variable IDs under `🧩 Component > <PascalName>`                              |
| `packages/core/src/components/<name>/<name>.figma.spec.json`  | **New** — describes variants + token→property bindings for the plugin               |
| `packages/core/src/components/<name>/<name>.figma.connect.ts` | **New** — Figma Code Connect mapping                                                |
| `scripts/figma/plugin/manifest.json`                          | Figma plugin manifest — import once via Plugins → Development in Figma              |
| `scripts/figma/plugin/src/code.ts`                            | Generic plugin source — reads bundled specs, creates ComponentSets                  |
| `scripts/figma/plugin/build.mjs`                              | Build script — collects all `figma.spec.json` files and bundles them into `code.js` |

---

## Step 1 — Identify the Component

Ask the user for the component name if not provided. Derive all paths from it:

- Component directory: `packages/core/src/components/<name>/`
- Interfaces: `packages/core/src/components/<name>/<name>.interfaces.ts`
- Token JSON key: PascalCase of the component name (e.g., `badge` → `Badge`, `number-input` → `NumberInput`)

---

## Step 2 — Extract Variant Axes from Interfaces

Read `<name>.interfaces.ts`. Find every `const` array that is used as `@Prop()` options:

```ts
export const BADGE_COLORS = ['grey', 'danger', 'warning', 'success', 'red', 'yellow', 'green', 'purple', ''] as const
export const BADGE_SIZES = ['sm', 'lg', ''] as const
```

Rules:

- Each array maps to one Figma variant property.
- The empty string `''` = the default/base variant — map it to `'Base'` in Figma (capitalized).
- Deprecated aliases like `'small'` / `'large'` → skip, only keep canonical values.
- Prop name → Figma property name: capitalize first letter (`color` → `Color`, `size` → `Size`).

---

## Step 3 — Extract Token Variable IDs from Base.tokens.json

Read `packages/tokens/tokens/Base.tokens.json`. Navigate to:

```
🧩 Component > <PascalName>
```

Collect every `com.figma.variableId` in that subtree. Group them by property type:

| Token path                          | Maps to                                            |
| ----------------------------------- | -------------------------------------------------- |
| `<Name>.Color.<Variant>.Background` | Fill background for that color variant             |
| `<Name>.Color.<Variant>.Text`       | Fill color of the text node for that color variant |
| `<Name>.Size.<Variant>`             | Height + minWidth for that size variant            |
| `<Name>.Text.Family`                | `fontFamily` binding on text nodes                 |
| `<Name>.Text.Weight`                | `fontStyle` binding on text nodes                  |
| `<Name>.Text.Size.<Variant>`        | `fontSize` binding for each size variant           |

If a token category is missing (e.g., no `<Name>.Text`), skip it — not all components have all categories.

---

## Step 4 — Write `<name>.figma.spec.json`

Create `packages/core/src/components/<name>/<name>.figma.spec.json`:

```jsonc
{
  // Filled in manually after the plugin generates the ComponentSet in Figma.
  // Format: "file_key/node_id"  (copy from the Figma URL)
  "figmaNodeId": "",

  // Variant axes — one entry per @Prop() that maps to Figma variant properties.
  // Key = Figma property name, value = prop name on the web component.
  // "values" maps Figma variant label → web component prop value (empty string = default).
  "variants": {
    "Color": {
      "prop": "color",
      "values": {
        "Base": "",
        "Red": "red",
        "Green": "green",
        "Yellow": "yellow",
        "Purple": "purple",
        "Grey": "grey",
        "Success": "success",
        "Warning": "warning",
        "Danger": "danger",
      },
    },
    "Size": {
      "prop": "size",
      "values": {
        "SM": "sm",
        "Base": "",
        "LG": "lg",
      },
    },
  },

  // Token variable IDs — sourced from Base.tokens.json > 🧩 Component > <Name>
  // Structure must match the shape the generic plugin expects (see scripts/figma/plugin/).
  "tokens": {
    "text": {
      "family": "VariableID:...",
      "weight": "VariableID:...",
      "size": {
        "sm": "VariableID:...",
        "base": "VariableID:...",
        "lg": "VariableID:...",
      },
    },
    "size": {
      "sm": "VariableID:...",
      "base": "VariableID:...",
      "lg": "VariableID:...",
    },
    "color": {
      "base": { "text": "VariableID:...", "background": "VariableID:..." },
      "red": { "text": "VariableID:...", "background": "VariableID:..." },
      "green": { "text": "VariableID:...", "background": "VariableID:..." },
      "yellow": { "text": "VariableID:...", "background": "VariableID:..." },
      "purple": { "text": "VariableID:...", "background": "VariableID:..." },
      "grey": { "text": "VariableID:...", "background": "VariableID:..." },
      "success": { "text": "VariableID:...", "background": "VariableID:..." },
      "warning": { "text": "VariableID:...", "background": "VariableID:..." },
      "danger": { "text": "VariableID:...", "background": "VariableID:..." },
    },
  },
}
```

Notes:

- Only include token categories that exist in `Base.tokens.json` for this component.
- If a size variant doesn't exist (e.g., the component has no `lg` size), omit that key.
- `figmaNodeId` is always left empty at creation time — the designer fills it after running the plugin.

---

## Step 5 — Write `<name>.figma.connect.ts`

`@figma/code-connect` is installed as a **root devDependency** (it is a CLI tool, not a per-package import — `figma connect publish` discovers all `.figma.connect.ts` files across the whole monorepo from the root).

Create `packages/core/src/components/<name>/<name>.figma.connect.ts`:

```ts
import figma from '@figma/code-connect'

// Replace <FIGMA_FILE_KEY> and <NODE_ID> with the values from the Figma URL once known.
// URL format: https://figma.com/design/<FIGMA_FILE_KEY>/...?node-id=<NODE_ID>
const FIGMA_URL = 'https://figma.com/design/<FIGMA_FILE_KEY>/ds?node-id=<NODE_ID>'

figma.connect(FIGMA_URL, {
  props: {
    // Map each Figma variant property to the web component prop.
    // Use figma.enum() for variant props; figma.boolean() for boolean props.
    color: figma.enum('Color', {
      Base: undefined, // undefined = omit the prop (use default)
      Red: 'red',
      Green: 'green',
      Yellow: 'yellow',
      Purple: 'purple',
      Grey: 'grey',
      Success: 'success',
      Warning: 'warning',
      Danger: 'danger',
    }),
    size: figma.enum('Size', {
      SM: 'sm',
      Base: undefined,
      LG: 'lg',
    }),
    // Map text/slot content from Figma text layer named "label" (adjust layer name as needed)
    label: figma.string('label'),
  },
  example: ({ color, size, label }) =>
    `<ds-badge${color ? ` color="${color}"` : ''}${size ? ` size="${size}"` : ''}>${label ?? '42'}</ds-badge>`,
})
```

Rules:

- `undefined` for a prop value means "use the default" → the prop is omitted from the snippet.
- The `example` function returns a raw HTML string (this is a web component, not a React component).
- Adjust layer names (`figma.string('label')`) to match the actual Figma text layer name in the generated ComponentSet.
- The file is published via `npx figma connect publish` from the repo root (requires a Figma personal access token).

---

## Step 6 — Run the Generic Figma Plugin

> This step is performed by a designer or developer inside Figma — not automated.

1. Run `npm run figma:build` to bundle all `figma.spec.json` files into `scripts/figma/plugin/code.js`.
2. Open the Figma file that contains the design-system variables.
3. Go to **Plugins → Development → Import plugin from manifest…** and select `scripts/figma/plugin/manifest.json` (one-time setup).
4. Run the plugin — pick the component from the dropdown — the ComponentSet appears on the page.
5. Right-click the ComponentSet → **Copy/Paste as → Copy link** to get the node URL.
6. Paste the file key and node ID into `figmaNodeId` in `<name>.figma.spec.json`.
7. Update the placeholder URL in `<name>.figma.connect.ts`.

---

## Step 7 — Publish Code Connect

Once `figmaNodeId` is filled in and URLs are updated:

```bash
npx figma connect publish --token <FIGMA_ACCESS_TOKEN>
```

This registers the code snippet with the Figma file so Dev Mode shows real usage code.

---

## When to Re-run Each Part

| Change                             | Action                                                                                       |
| ---------------------------------- | -------------------------------------------------------------------------------------------- |
| New color or size variant          | Update `figma.spec.json` variants + tokens, re-run plugin in Figma                           |
| Token value changed                | Nothing — Figma variable binding reflects it automatically                                   |
| Token renamed                      | Re-run `sync-component-tokens` skill, then update `figmaNodeId` if component was regenerated |
| Prop renamed on web component      | Update `figma.connect.ts` prop mapping, re-publish Code Connect                              |
| Figma file moved / node ID changed | Update `figmaNodeId` in spec + URL in connect file                                           |
