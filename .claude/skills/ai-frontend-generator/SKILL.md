---
name: ai-frontend-generator
description: Generates Helvetia Design System compliant Angular/HTML/JSON UI layouts from natural language descriptions. Uses get_components(), validate_layout(), and create_file() MCP tools. Use when a developer asks to generate a page, form, or UI layout.
---

# ai-frontend-generator

Generate frontend UI layouts strictly based on the Helvetia Design System. The skill uses MCP tools to fetch allowed components, validate the output, and write files directly to the workspace.

## Quick Start

```
/ai-frontend-generator "Create a login page with email, password and submit button"
```

---

## Workflow

### Step 1 — Analyse Input (Hybrid)

Analyse the developer's description before asking any questions. Only ask what is genuinely missing:

| Situation                                      | Action                                                                        |
| ---------------------------------------------- | ----------------------------------------------------------------------------- |
| Description is clear, format known, path known | Generate immediately — no questions                                           |
| Format not specified                           | Ask once: **Angular** (default) / HTML / JSON?                                |
| Output path not specified                      | Ask once: **Where should the file be created?** (e.g. `src/app/pages/login/`) |
| Page type ambiguous                            | Ask once for clarification                                                    |

**Rule: Never ask more than 2 clarifying questions before generating.**

---

### Step 2 — Get Allowed Components

Call `get_components()` with optional page type filter:

- Clearly a form → `get_components({ pageType: "form" })` — 39 components
- Landing/marketing page → `get_components({ pageType: "landing" })` — 36 components
- Dashboard → `get_components({ pageType: "dashboard" })` — 34 components
- Mixed or unclear → `get_components()` — all 113 components

The result contains:

- `components[]` — the only tags you may use
- `nestingRules` — which children are allowed inside which parents
- `pageStructureRules` — the required page order

---

### Step 3 — Generate Layout

Generate a layout using **only** the components returned by `get_components()`.

**Page structure rules (non-negotiable):**

```
bal-navbar      ← FIRST (if used)
bal-stage       ← SECOND, at most ONCE (if used)
bal-content     ← MAIN CONTENT (wrap all content in bal-stack)
bal-footer      ← LAST (if used)
```

**Nesting rules (examples):**

- `bal-card-content` only inside `bal-card`
- `bal-form-col` only inside `bal-form-grid`
- `bal-tab-item` only inside `bal-tabs`
- `bal-step-item` only inside `bal-steps`
- `bal-accordion-summary` and `bal-accordion-details` only inside `bal-accordion`

**Accessibility rule:**

- Every `bal-input`, `bal-textarea`, `bal-select` must have a `bal-label` sibling

---

### Step 4 — Validate

Call `validate_layout()` with the generated layout JSON.

```
score 80–100 → Proceed to Step 5
score 60–79  → Proceed to Step 5 (note warnings to developer)
score < 60   → Fix errors → retry validate_layout() once
              If still < 60 after retry → explain to developer what could not be fixed
```

**Retry logic:**

```
Attempt 1: Generate → validate_layout()
  PASS (score ≥ 60) → create_file()
  FAIL (score < 60) → fix errors → Attempt 2

Attempt 2: Regenerate with corrections → validate_layout()
  PASS (score ≥ 60) → create_file()
  FAIL (score < 60) → explain errors → stop, ask developer to refine prompt
```

---

### Step 5 — Create File

Call `create_file()` with:

- `path`: developer-specified path (e.g., `src/app/pages/login/login.component.html`)
- `content`: generated HTML or JSON
- `format`: `angular` (default) / `html` / `json`

For Angular format, the tool automatically generates both:

- `*.component.html` — the template
- `*.component.ts` — standalone component with correct `@baloise/ds-core-angular` imports

---

### Step 6 — Report Result

After successful file creation, report:

```
✅ Generated: login page
   Files created:
   - src/app/pages/login/login.component.html
   - src/app/pages/login/login.component.ts

   Validation score: 95/100
   Angular modules: BalFormModule, BalInputModule, BalButtonModule, ...

   Warnings (non-blocking):
   ⚠️  [if any]

   Next steps:
   1. Review the generated files
   2. Add logic to the TypeScript component if needed
   3. Import the component in your routing module
```

If the generation failed after 2 retries:

```
⚠️  Could not generate a valid layout after 2 attempts.

Errors that could not be resolved:
- [list errors from validate_layout()]

Suggestions:
- [specific refinements to the prompt]
```

---

## Output Format Details

### Angular (default)

Generates `.component.html` + `.component.ts` (standalone):

```html
<!-- login.component.html -->
<bal-navbar>
  <bal-navbar-brand>Helvetia</bal-navbar-brand>
</bal-navbar>

<bal-content>
  <bal-stack>
    <bal-heading level="1">Login</bal-heading>
    <bal-form>
      <bal-form-grid>
        <bal-form-col>
          <bal-label>Email</bal-label>
          <bal-input type="email" name="email"></bal-input>
        </bal-form-col>
        <bal-form-col>
          <bal-label>Password</bal-label>
          <bal-input type="password" name="password"></bal-input>
        </bal-form-col>
      </bal-form-grid>
      <bal-button-group>
        <bal-button type="submit">Login</bal-button>
      </bal-button-group>
    </bal-form>
  </bal-stack>
</bal-content>

<bal-footer>© 2026 Helvetia</bal-footer>
```

```typescript
// login.component.ts (auto-generated by create_file MCP tool)
import { Component } from '@angular/core'
import { BalNavbarModule, BalContentModule, BalStackModule,
         BalHeadingModule, BalFormModule, BalFormGridModule,
         BalInputModule, BalLabelModule, BalButtonModule,
         BalFooterModule } from '@baloise/ds-core-angular'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [BalNavbarModule, BalContentModule, ...],
  templateUrl: './login.component.html',
})
export class LoginComponent {}
```

### HTML (Web Components)

Plain HTML with `bal-*` elements — framework independent.

### JSON Layout Schema

Structured JSON for further processing:

```json
{
  "layout": [
    {
      "component": "bal-navbar",
      "children": [{ "component": "bal-navbar-brand", "content": "Helvetia" }]
    },
    {
      "component": "bal-content",
      "children": [{ "component": "bal-heading", "props": { "level": 1 }, "content": "Login" }]
    }
  ]
}
```

---

## Rules (Non-Negotiable)

1. **ONLY** use components returned by `get_components()` — never invent new ones
2. **ALWAYS** call `validate_layout()` before `create_file()`
3. **NEVER** use raw `<div>`, `<span>`, custom CSS, or external libraries
4. **ALWAYS** follow page order: `bal-navbar` → `bal-stage` → `bal-content` → `bal-footer`
5. `bal-stage` appears at most **once** per page
6. Every `bal-input` / `bal-textarea` / `bal-select` must have a `bal-label`
7. Default format is **Angular** unless developer specifies otherwise
8. Maximum **2 attempts** before explaining failure to developer

---

## Component Mapping Reference

| Developer says              | Use components                                                                    |
| --------------------------- | --------------------------------------------------------------------------------- |
| "navigation bar" / "header" | `bal-navbar`, `bal-navbar-brand`, `bal-navbar-menu`                               |
| "hero section" / "stage"    | `bal-stage`, `bal-stage-head`, `bal-stage-body`                                   |
| "cards" / "product grid"    | `bal-stack`, `bal-card`, `bal-card-title`, `bal-card-content`, `bal-card-actions` |
| "form" / "input fields"     | `bal-form`, `bal-form-grid`, `bal-form-col`, `bal-label`, `bal-input`             |
| "dropdown" / "select"       | `bal-select`, `bal-select-option`                                                 |
| "steps" / "wizard"          | `bal-steps`, `bal-step-item`                                                      |
| "tabs" / "tabbed content"   | `bal-tabs`, `bal-tab-item`                                                        |
| "accordion" / "FAQ"         | `bal-accordion`, `bal-accordion-summary`, `bal-accordion-details`                 |
| "list" / "items"            | `bal-list`, `bal-list-item`                                                       |
| "notification" / "alert"    | `bal-notification`                                                                |
| "loading" / "spinner"       | `bal-spinner`                                                                     |
| "footer"                    | `bal-footer`                                                                      |
