# AI Frontend Generator — Designsystem Governance

This document defines the rules, architecture, and implementation plan for the AI-based frontend generator.
The system generates UI structures strictly based on the Helvetia Baloise Design System using a Skill + MCP Server architecture.

---

## Table of Contents

- [Key Rules at a Glance](#key-rules-at-a-glance)
- [System Architecture](#system-architecture)
- [Allowed Components by Category](#allowed-components-by-category)
- [Layout Rules](#layout-rules)
- [Component Composition Rules](#component-composition-rules)
- [Generation Rules](#generation-rules)
- [Output Format](#output-format)
- [Governance & Validation](#governance--validation)
- [Umsetzungsplan](#umsetzungsplan)
- [Testfälle](#testfälle)
- [Token & Kosten](#token--kosten)
- [Enforcement](#enforcement)

---

## Key Rules at a Glance

### Core Principle

- **The AI does NOT create designs**
- **The AI ONLY composes existing Designsystem components**
- **All generated layouts must be validated by the MCP Server**

### Allowed

- Structured UI generation using approved components
- Designsystem-based layouts
- Component composition following strict hierarchy rules
- Angular Component output (default) or HTML / JSON

### NOT Allowed

- Free design creation
- New, undefined components
- Raw HTML/CSS outside system constraints
- Custom styling overrides
- Components not in the allowed list
- Breaking component composition hierarchy

---

## System Architecture

```
Developer (VS Code / Claude Code)
    ↓  /ai-frontend-generator "Login page with email and password"

[SKILL] — Orchestration (.claude/skills/ai-frontend-generator/)
    - Analyses input (hybrid: asks only what is missing)
    - Selects output format (Angular default)
    - Controls retry loop (max. 2 retries)

    ↓ calls MCP Tools

[MCP SERVER] — Logic (packages/design-gen-ai/)
    - get_components()     → reads tags-all.ts dynamically (always up to date)
    - validate_layout()    → programmatic check, Score + Errors
    - create_file(path)    → creates file directly in workspace

    ↓ Claude generates code

[CLAUDE] — Generation (Anthropic Claude 3.5 Sonnet)
    - Generates Angular Component (default)
    - Or HTML / JSON on request
    - Max. 2 auto-retries on validation failure
    - Then: honest error explanation to developer

    ↓ File lands at developer-specified path
```

### Tech Stack

| Layer                | Technology                     | Detail                                          |
| -------------------- | ------------------------------ | ----------------------------------------------- |
| **Orchestration**    | Claude Code Skill              | `.claude/skills/ai-frontend-generator/SKILL.md` |
| **Validation Logic** | MCP Server (TypeScript)        | `packages/design-gen-ai/`                       |
| **LLM**              | Anthropic Claude 3.5 Sonnet    | `claude-3-5-sonnet-20241022`                    |
| **Frontend Output**  | Angular 18+                    | `@baloise/ds-core-angular v19.9.4`              |
| **Component Source** | tags-all.ts                    | `packages/core/src/tags-all.ts`                 |
| **API Key**          | `.env.local` (local prototype) | `ANTHROPIC_API_KEY=sk-ant-...`                  |

---

## Allowed Components by Category

### 1. NAVIGATION & STRUCTURE (Page-Level)

These components form the backbone of page layouts and **MUST be used correctly**:

| Component       | Tag Name                | Purpose                 | Rules                               |
| --------------- | ----------------------- | ----------------------- | ----------------------------------- |
| Navigation Bar  | `bal-navbar`            | Main top navigation     | Always at page top (if used)        |
| Navbar Brand    | `bal-navbar-brand`      | Logo/brand in navbar    | Only inside `bal-navbar`            |
| Navbar Menu     | `bal-navbar-menu`       | Menu container          | Only inside `bal-navbar`            |
| Menu Start      | `bal-navbar-menu-start` | Left-aligned items      | Only inside `bal-navbar-menu`       |
| Menu End        | `bal-navbar-menu-end`   | Right-aligned items     | Only inside `bal-navbar-menu`       |
| Footer          | `bal-footer`            | Page footer             | Always at page bottom (if used)     |
| Stage/Hero      | `bal-stage`             | Hero section with image | At most once per page, after navbar |
| Side Navigation | `bal-nav`               | Mega menu / side nav    | For complex navigation structures   |

### 2. LAYOUT & GRID (Page Structure)

Compose page layouts using these components:

| Component       | Tag Name        | Purpose                     | Rules                       |
| --------------- | --------------- | --------------------------- | --------------------------- |
| Stack           | `bal-stack`     | Flex container (row/column) | For flexible layouts        |
| Form Grid       | `bal-form-grid` | Grid for forms              | For form layouts only       |
| Form Column     | `bal-form-col`  | Grid column                 | Only inside `bal-form-grid` |
| Content Wrapper | `bal-content`   | Content container           | For main content areas      |

### 3. CONTENT COMPONENTS (Display Elements)

These render actual content on pages:

| Component    | Tag Name           | Purpose               | Rules                                          |
| ------------ | ------------------ | --------------------- | ---------------------------------------------- |
| Heading      | `bal-heading`      | Headings (H1-H6)      | For page structure and hierarchy               |
| Text         | `bal-text`         | Paragraphs, body text | For flowing text content                       |
| Card         | `bal-card`         | Card container        | For grouped content (e.g., products, articles) |
| Card Title   | `bal-card-title`   | Card heading          | Only inside `bal-card`                         |
| Card Content | `bal-card-content` | Card body             | Only inside `bal-card`                         |
| Card Actions | `bal-card-actions` | Card footer (actions) | Only inside `bal-card`                         |
| List         | `bal-list`         | List container        | For item collections                           |
| List Item    | `bal-list-item`    | Individual list entry | Only inside `bal-list`                         |
| Icon         | `bal-icon`         | Icon element          | For visual indicators                          |
| Badge        | `bal-badge`        | Status/label badge    | For labels and status                          |
| Tag          | `bal-tag`          | Tag/chip element      | For multiple tags/labels                       |
| Tag Group    | `bal-tag-group`    | Grouped tags          | For collections of tags                        |
| Divider      | `bal-divider`      | Visual separator      | Between content sections                       |

### 4. FORM COMPONENTS (User Input)

Use these for collecting user input:

| Component      | Tag Name             | Purpose                | Rules                                          |
| -------------- | -------------------- | ---------------------- | ---------------------------------------------- |
| Form           | `bal-form`           | Form container         | Wrapper for all form fields                    |
| Label          | `bal-label`          | Form field label       | For every form input                           |
| Input          | `bal-input`          | Text input             | For text, email, password, etc.                |
| Textarea       | `bal-textarea`       | Multi-line input       | For longer text input                          |
| Select         | `bal-select`         | Dropdown select        | For choice selection                           |
| Select Option  | `bal-select-option`  | Option item            | Only inside `bal-select`                       |
| Checkbox Group | `bal-checkbox-group` | Multiple checkboxes    | For multiple selections                        |
| Checkbox       | `bal-checkbox`       | Single checkbox        | Only inside `bal-checkbox-group` or standalone |
| Radio Group    | `bal-radio-group`    | Multiple radio buttons | For single selection from multiple             |
| Radio          | `bal-radio`          | Single radio button    | Only inside `bal-radio-group`                  |
| Input Date     | `bal-input-date`     | Date picker input      | For date selection                             |
| Number Input   | `bal-number-input`   | Numeric input          | For numbers                                    |
| Button         | `bal-button`         | Action button          | For form submission or CTAs                    |
| Button Group   | `bal-button-group`   | Grouped buttons        | For related actions                            |

### 5. STRUCTURE & NAVIGATION (Within Page)

Use for navigation within pages:

| Component         | Tag Name                | Purpose              | Rules                       |
| ----------------- | ----------------------- | -------------------- | --------------------------- |
| Tabs              | `bal-tabs`              | Tab container        | For tabbed content          |
| Tab Item          | `bal-tab-item`          | Individual tab       | Only inside `bal-tabs`      |
| Accordion         | `bal-accordion`         | Collapsible sections | For expandable content      |
| Accordion Summary | `bal-accordion-summary` | Accordion header     | Only inside `bal-accordion` |
| Accordion Details | `bal-accordion-details` | Accordion body       | Only inside `bal-accordion` |
| Steps/Stepper     | `bal-steps`             | Progress steps       | For multi-step processes    |
| Step Item         | `bal-step-item`         | Individual step      | Only inside `bal-steps`     |
| Pagination        | `bal-pagination`        | Page navigation      | For multi-page content      |

### 6. OVERLAY & MODAL COMPONENTS (Dialogs)

Use for overlays on top of page content:

| Component    | Tag Name           | Purpose              | Rules                           |
| ------------ | ------------------ | -------------------- | ------------------------------- |
| Modal        | `bal-modal`        | Dialog modal         | For focused user actions        |
| Modal Header | `bal-modal-header` | Modal title area     | Only inside `bal-modal`         |
| Modal Body   | `bal-modal-body`   | Modal content        | Only inside `bal-modal`         |
| Popup        | `bal-popup`        | Popup overlay        | For contextual information      |
| Notification | `bal-notification` | In-page notification | For alerts and messages         |
| Snackbar     | `bal-snackbar`     | Toast notification   | For temporary feedback messages |

### 7. UTILITY & HELPER COMPONENTS

| Component    | Tag Name           | Purpose            | Rules                    |
| ------------ | ------------------ | ------------------ | ------------------------ |
| Tooltip      | `bal-tooltip`      | Hover tooltip      | For additional context   |
| Hint         | `bal-hint`         | Info hint box      | For helpful information  |
| Spinner      | `bal-spinner`      | Loading indicator  | For async operations     |
| Progress Bar | `bal-progress-bar` | Progress indicator | For progress tracking    |
| Close Button | `bal-close`        | Close action       | For dismissible elements |

---

## Layout Rules

### Standard Page Structure

All generated pages **MUST** follow this strict hierarchy:

```
<bal-navbar>          ← FIRST (if used)
  <bal-navbar-brand>
  <bal-navbar-menu>
    <bal-navbar-menu-start>
    <bal-navbar-menu-end>
</bal-navbar>

<bal-stage>           ← SECOND, at most ONCE (if used)

<bal-content>         ← MAIN CONTENT
  <bal-stack>
    <!-- content components -->
  </bal-stack>
</bal-content>

<bal-footer>          ← LAST (if used)
```

### Rules

1. `bal-navbar` must always be **first** if present
2. `bal-stage` may appear **at most once** per page
3. All main content lives inside `bal-content`
4. `bal-footer` must always be **last** if present
5. Components must only appear inside their allowed parent

---

## Component Composition Rules

### Form Pattern

```html
<bal-form>
  <bal-form-grid>
    <bal-form-col>
      <bal-label>Email</bal-label>
      <bal-input type="email" name="email" required></bal-input>
    </bal-form-col>
    <bal-form-col>
      <bal-label>Password</bal-label>
      <bal-input type="password" name="password" required></bal-input>
    </bal-form-col>
  </bal-form-grid>
  <bal-button-group>
    <bal-button type="submit">Login</bal-button>
  </bal-button-group>
</bal-form>
```

### Card Collection Pattern

```html
<bal-stack>
  <bal-card>
    <bal-card-title>Title</bal-card-title>
    <bal-card-content>Content</bal-card-content>
    <bal-card-actions>
      <bal-button>Action</bal-button>
    </bal-card-actions>
  </bal-card>
</bal-stack>
```

### Accordion Pattern

```html
<bal-accordion>
  <bal-accordion-summary>Question?</bal-accordion-summary>
  <bal-accordion-details>Answer.</bal-accordion-details>
</bal-accordion>
```

---

## Generation Rules

### Input Processing (Hybrid)

The Skill analyses the developer's input first:

- If description is clear → generate immediately, no questions
- If format is missing → ask once: Angular / HTML / JSON?
- If path is missing → ask once: where should the file be created?
- If page type is ambiguous → ask once for clarification

**Never ask more than 2 clarifying questions before generating.**

### Mapping Examples

| Developer Input                      | Components Used                                                                                                |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| "Login page with email and password" | `bal-navbar`, `bal-content`, `bal-form`, `bal-form-grid`, `bal-input`, `bal-button`, `bal-footer`              |
| "Product listing with cards"         | `bal-navbar`, `bal-stage`, `bal-content`, `bal-stack`, `bal-card`, `bal-button`, `bal-footer`                  |
| "Insurance form with steps"          | `bal-navbar`, `bal-content`, `bal-steps`, `bal-step-item`, `bal-form`, `bal-input`, `bal-select`, `bal-button` |
| "FAQ with expandable sections"       | `bal-content`, `bal-heading`, `bal-accordion`, `bal-accordion-summary`, `bal-accordion-details`                |

### Retry Logic

```
Generate → validate_layout() → PASS → create_file() → Done ✅
Generate → validate_layout() → FAIL → Retry 1
Retry 1  → validate_layout() → PASS → create_file() → Done ✅
Retry 1  → validate_layout() → FAIL → explain errors to developer ⚠️
```

Maximum **2 attempts**. On final failure: explain exactly which rules were violated and suggest how the developer can refine the prompt.

---

## Output Format

### Angular Component (Default)

Generated as `.component.html` + `.component.ts`:

```typescript
// login.component.ts
import { Component } from '@angular/core'
import { BalFormModule, BalInputModule, BalButtonModule } from '@baloise/ds-core-angular'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [BalFormModule, BalInputModule, BalButtonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {}
```

```html
<!-- login.component.html -->
<bal-navbar>
  <bal-navbar-brand>Helvetia</bal-navbar-brand>
</bal-navbar>

<bal-content>
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
</bal-content>

<bal-footer>© 2026 Helvetia</bal-footer>
```

### HTML (Web Components)

Plain HTML using `bal-*` elements, framework-independent.

### JSON Layout Schema

```json
{
  "layout": [
    {
      "component": "bal-navbar",
      "props": { "sticky": true },
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

## Governance & Validation

### MCP Server Tools

| Tool                         | Input                | Output                                   | Purpose                             |
| ---------------------------- | -------------------- | ---------------------------------------- | ----------------------------------- |
| `get_components()`           | page type (optional) | Component list from `tags-all.ts`        | Always up to date, zero maintenance |
| `validate_layout()`          | generated layout     | `{ valid, errors[], warnings[], score }` | Programmatic, deterministic check   |
| `create_file(path, content)` | path + content       | File created                             | Writes directly to workspace        |

### Validation Checks

Every generated layout **MUST** pass all checks:

| Check                   | Rule                                   | Consequence |
| ----------------------- | -------------------------------------- | ----------- |
| **Component Whitelist** | All components exist in `tags-all.ts`  | ❌ REJECT   |
| **Nesting Rules**       | Components only inside allowed parents | ❌ REJECT   |
| **Page Order**          | navbar → stage → content → footer      | ❌ REJECT   |
| **Single Stage**        | `bal-stage` max once per page          | ❌ REJECT   |
| **Required Labels**     | Every `bal-input` has a `bal-label`    | ⚠️ WARNING  |
| **Content Length**      | Text content is reasonable length      | ⚠️ WARNING  |

### Validation Score

```
100     — Perfect, no issues
80–99   — Good, minor warnings only
60–79   — Acceptable, warnings present
< 60    — Poor, errors present → triggers retry
```

---

## Umsetzungsplan

### Phase 0 — Vorbereitung _(1h)_

- Testfälle definieren (siehe unten)
- `packages/core/src/tags-all.ts` Struktur analysieren
- Nesting-Regeln dokumentieren
- `packages/design-gen-ai/` initialisieren (`package.json` fehlt noch)

### Phase 1 — MCP Server Grundgerüst _(1h)_ ✅

- `packages/design-gen-ai/package.json` erstellt
- TypeScript + MCP SDK (`@modelcontextprotocol/sdk`) installiert
- `.env.example` mit `ANTHROPIC_API_KEY` erstellt
- `src/index.ts` — Server startet via `node --import tsx`
- `src/types/index.ts` — Alle TypeScript Interfaces definiert
- `.mcp.json` — Claude Code erkennt den Server
- Tools registriert: `get_components`, `validate_layout`, `create_file` (Stubs)

### Phase 2 — MCP Tool: get*components() *(45 min)\_ ✅

- `src/generators/registry.ts` erstellt
- Liest `component-registry.json` gecacht beim Start
- Liest `packages/core/src/tags-all.ts` dynamisch via Regex-Parser
- Erkennt neue Komponenten automatisch (`newComponentsDetected`)
- Page-Type-Filtering: `form` → 39, `landing` → 36, `dashboard` → 34, `detail` → 28 Komponenten
- Gibt gefilterte Nesting-Regeln zurück (Token-Optimierung)

### Phase 3 — MCP Tool: validate*layout() *(2h)\_ ✅

- `src/validation/validator.ts` erstellt
- Whitelist-Check gegen live `tags-all.ts` (deterministisch)
- Nesting-Regeln aus `component-registry.json` geprüft
- Seitenreihenfolge geprüft (navbar → stage → content → footer)
- Single-Stage-Rule (bal-stage max 1×) implementiert
- Accessibility-Check: fehlendes `bal-label` vor Inputs → Warning
- Content-Length-Check → Warning
- Score 0–100 mit gewichteten Abzügen

### Phase 4 — MCP Tool: create*file() *(45 min)\_ ✅

- `src/generators/file-creator.ts` erstellt
- Sicherheitsprüfung: Path-Traversal (`..`) blockiert, kein absoluter Pfad
- Format `angular`: erstellt `.component.html` + `.component.ts` gleichzeitig
- Angular-Modul-Erkennung: scannt HTML für `bal-*` Tags → importiert korrekte Module aus `@baloise/ds-core-angular`
- Verzeichnis wird automatisch erstellt (`mkdirSync recursive`)
- Format `html` / `json`: einzelne Datei

### Phase 5 — Skill Entwicklung _(1.5h)_ ✅

- `.claude/skills/ai-frontend-generator/SKILL.md` erstellt
- Hybrid Input-Logik: analysiert Beschreibung, fragt max. 2× nach
- Retry-Loop: max. 2 Versuche, dann konkrete Fehlererklärung
- Format-Auswahl: Angular (Standard), HTML, JSON
- Vollständiger Workflow: get_components → generate → validate → create_file
- Komponenten-Mapping-Referenz (Entwickler-Sprache → bal-\* Komponenten)

### Phase 6 — Angular Output Template _(1h)_ ✅

- `file-creator.ts` komplett überarbeitet (Phase 6 Korrektur)
- Quelle verifiziert: `packages/angular/src/bundles.ts`
- Fake `*Module` Namen ersetzt durch echte `*Bundle` Exports
- Bundle-Spread-Syntax: `imports: [...BalNavbarBundle, ...BalFormBundle, BalNotification]`
- Bundles in sinnvoller Reihenfolge (Navbar → Layout → Typography → Form)
- Individuelle Komponenten (`BalNotification`, `BalBadge`, etc.) korrekt ohne Spread

### Phase 7 — Evaluation _(1h)_ ✅

- `src/evaluation.ts` — automatischer Evaluation-Runner
- Alle 3 Testfälle ausgeführt: `validate_layout()` + `create_file()`
- **Ergebnis: 3/3 bestanden, Average Score: 100/100**

| Testfall                    | Score   | Status | Angular Modules                          |
| --------------------------- | ------- | ------ | ---------------------------------------- |
| TC-01 Login-Seite           | 100/100 | ✅     | Navbar, Layout, Typography, Button, Form |
| TC-02 Versicherungsformular | 100/100 | ✅     | + Steps, Select, Checkbox                |
| TC-03 Dashboard             | 100/100 | ✅     | + Stage, Card, Accordion                 |

- 6 Angular Component Dateien generiert (je .html + .ts)
- Alle Dateien compilierbar mit echten `@baloise/ds-core-angular` Bundles

**Gesamtaufwand: ~9 Stunden**

---

## Testfälle

### Testfall 1: Login-Seite

**Input**: `"Erstelle eine Login-Seite mit Email, Passwort und Login-Button"`

**Erwartete Komponenten**:
`bal-navbar`, `bal-content`, `bal-form`, `bal-form-grid`, `bal-form-col`, `bal-label`, `bal-input` (×2), `bal-button-group`, `bal-button`, `bal-footer`

**Erfolgskriterium**: Datei erstellt, Score ≥ 80, alle Labels vorhanden

---

### Testfall 2: Versicherungsformular

**Input**: `"Erstelle ein Versicherungsformular mit Name, Geburtsdatum, Versicherungstyp (Auswahl), Checkbox für AGB und Absenden-Button"`

**Erwartete Komponenten**:
`bal-steps`, `bal-form`, `bal-form-grid`, `bal-input`, `bal-input-date`, `bal-select`, `bal-select-option`, `bal-checkbox-group`, `bal-checkbox`, `bal-button`

**Erfolgskriterium**: Datei erstellt, Score ≥ 80, Schritte korrekt strukturiert

---

### Testfall 3: Dashboard

**Input**: `"Erstelle ein Dashboard mit Hero-Bereich, drei Produkt-Cards und einer FAQ-Sektion"`

**Erwartete Komponenten**:
`bal-navbar`, `bal-stage`, `bal-content`, `bal-stack`, `bal-card` (×3), `bal-card-title`, `bal-card-content`, `bal-card-actions`, `bal-accordion`, `bal-footer`

**Erfolgskriterium**: Datei erstellt, Score ≥ 80, `bal-stage` nur einmal vorhanden

---

## Token & Kosten

### Kostenabschätzung (Claude 3.5 Sonnet)

| Szenario             | Token      | Kosten     |
| -------------------- | ---------- | ---------- |
| Erfolg im 1. Versuch | ~7.000     | ~$0.03     |
| 1 Retry nötig        | ~14.000    | ~$0.06     |
| 10 Requests/Tag      | ~70.000    | ~$0.30/Tag |
| Pro Entwickler/Monat | ~2.100.000 | ~$9/Monat  |

### Optimierungsmöglichkeiten

- **Smart Filtering**: MCP gibt nur relevante Komponenten zurück (nicht alle 91)
- **Kompaktes Format**: `bal-card[bal-card-title,bal-card-content]` statt Vollobjekt
- **Max. 1 Retry**: Zweiter Retry selten erfolgreich wenn Prompt unklar

---

## Enforcement

### Skill System Prompt

```
You are an AI frontend generator for the Helvetia Design System.

RULES (non-negotiable):
1. ONLY use components returned by get_components() MCP tool
2. ALWAYS call validate_layout() before create_file()
3. If validation fails: retry ONCE with corrections, then explain errors
4. Default output format: Angular Standalone Component
5. NEVER invent new components
6. ALWAYS follow page order: navbar → stage → content → footer

PROCESS:
1. Analyse developer input
2. Call get_components() to get allowed list
3. Generate layout using ONLY those components
4. Call validate_layout() — if score < 60: retry once
5. Call create_file() with developer-specified path
6. Report result to developer
```
