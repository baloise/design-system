# Using the Design System with Adobe Experience Manager Core Components

Notes on integrating Helvetia Design System (Shadow DOM Stencil web components) with
[Adobe Experience Manager Core WCM Components](https://github.com/adobe/aem-core-wcm-components),
using the accordion as the worked example. The same pattern applies to other Core
Components with an equivalent DS component (tabs, carousel, etc.).

## Workflow: Figma → DS → AEM

Everything in this document sits inside one pipeline:

1. **Design in Figma.** New patterns are designed against the existing token/component
   library first. Anything not already covered by a DS component is a gap step 2 fills.
2. **Develop in the DS**, as one of four tiers (matching the DS's existing architecture,
   see [ARCHITECTURE.md](docs/ARCHITECTURE.md#hybrid-component-model)):
   - **Style** — CSS utilities and CSS-only component styles: `*.style.scss`, the DS's
     existing "CSS-only" mode — a global stylesheet class, no Shadow DOM, no JS. Right fit
     when the pattern is pure presentation with no interactive/stateful behavior.
   - **Component** — a Shadow DOM web component (`ds-*`, Stencil, the DS's "web component"
     mode) when the pattern needs encapsulated behavior/state — `ds-accordion`, `ds-date`,
     etc., under `packages/core/src/components/*`. Most of this document is about this tier.
   - **Template** — a composed, multi-component pattern (e.g. a validated form layout
     combining `ds-date` + `ds-input` + `ds-button`) documented as a reusable Storybook
     recipe. Not a new custom element — just DS components arranged and documented
     together.
   - **Block** — not a DS deliverable. A larger authored content section assembled _in
     AEM_ out of DS components/templates for a specific page or reusable section pattern
     (a hero, a teaser grid). Authored on the AEM side, not shipped from this repo.
3. **Adopt in AEM with Core Components, when possible.** Wherever a Sites or Adaptive
   Forms Core Component has an equivalent DS style/component/template, integrate by
   overriding its HTL to render the DS output instead of Adobe's own markup — exactly the
   `ds-accordion` and `ds-date` patterns documented below. Where no matching Core
   Component exists, the block is authored directly against the DS's output without a
   Core Components override.

The rest of this document covers step 3 in detail: the accordion (Sites Core Components)
and the date picker (Adaptive Forms Core Components) as the two worked examples.

## The core idea

AEM Core Components ship two independent layers per component:

1. **Server-side rendering** — Sightly/HTL templates + Sling Models that produce markup
   and expose author-editable content (e.g. `core/wcm/components/accordion/v1/accordion`).
2. **Client-side behavior** — `accordion.js` + CSS that manipulates that exact BEM markup
   (`cmp-accordion__item`, `data-cmp-hook-accordion="item"`, etc.) at runtime.

A DS web component like `ds-accordion` already owns its own behavior (open/close state,
ARIA, animation, keyboard handling — see `packages/core/src/components/accordion/accordion.tsx`).
So the integration doesn't bridge the two behavior layers — it **replaces layer 2
entirely** and only reuses layer 1: the Sling Model that stores each item's
title/content/expanded state, and the authoring dialogs for adding/reordering items.

Concretely:

- Override the HTL via `sling:resourceSuperType` = `core/wcm/components/accordion/v1/accordion`,
  and in a custom `accordion.html` render `<ds-accordion>` instead of Adobe's
  `<div data-cmp-hook-accordion="item">`.
- Do **not** touch the Java Sling Model — it just supplies `title`, `expanded`, `id`,
  and child resources.
- Drop the Core Components' `core.wcm.components.accordion.v1` clientlib category from
  the page's clientlib list. `ds-accordion` already does the toggle/animation/ARIA work,
  so shipping Adobe's `accordion.js` on top is redundant and can fight over
  `aria-expanded`.

## Why Shadow DOM isn't a blocker

Two separate concerns:

- **AEM's in-context authoring overlay** (edit bars, "click to add component" toolbar)
  positions itself against DOM nodes in the **light DOM** — the wrapper `<div>`s that
  are author-controlled. It never needs to reach into a component's shadow root, because
  nothing inside the shadow root is author-editable content; it's generated chrome (the
  toggle button, marker icon).
- **Content projection** happens via the DS component's named slots (`slot="summary"`,
  `slot="content"`), which is the platform-native way to hand light-DOM content
  (author-edited, AEM-owned) to a Shadow DOM component for rendering. No custom
  bridging JS needed.

## Example markup

**Adobe's default accordion item** (what `core/wcm/components/accordion/v1` renders):

```html
<div class="cmp-accordion__item" data-cmp-hook-accordion="item">
  <h3 class="cmp-accordion__header" data-cmp-hook-accordion="header">
    <button
      class="cmp-accordion__button"
      data-cmp-hook-accordion="button"
      aria-expanded="false"
      aria-controls="accordion-panel-1"
      id="accordion-header-1"
    >
      <span class="cmp-accordion__title">Item Title</span>
    </button>
  </h3>
  <div
    class="cmp-accordion__panel"
    id="accordion-panel-1"
    data-cmp-hook-accordion="panel"
    aria-labelledby="accordion-header-1"
    hidden
  >
    <!-- authored child components -->
  </div>
</div>
```

**Overridden `accordion.html`**, looping over the same Sling Model items:

```html
<sly data-sly-use.model="com.adobe.cq.wcm.core.components.models.Accordion" data-sly-list.item="${model.items}">
  <ds-accordion
    id="${item.id}"
    open="${item.expanded}"
    group="${model.id}"
    summary-level="h3"
    data-cmp-data-layer="${item.data.json}"
  >
    <span slot="summary">${item.title}</span>
    <div slot="content" data-sly-resource="${item.panelResource}"></div>
  </ds-accordion>
</sly>
```

`open`, `group`, `summary-level`, and the `summary`/`content` slots are real props/slots
on `ds-accordion` (`packages/core/src/components/accordion/accordion.tsx:60-330`). AEM
continues to own authoring (item order, title text, nested components in `content`);
`ds-accordion` continues to own runtime behavior (toggle, ARIA, animation, `dsToggle` /
`dsOpened` / `dsClosed` events).

## Things that still need wiring up

1. **Analytics / Adobe Client Data Layer parity** — if the site relies on Adobe's Client
   Data Layer picking up accordion-toggle events, add a small listener translating
   `dsToggle` → `adobeDataLayer.push(...)`, since Adobe's `accordion.js` (which does this
   today) is no longer running.
2. **Author dialog** — the Core Components' item edit dialog (add/remove/reorder, title
   field, "expanded by default" checkbox) keeps working unchanged, since the Sling Model
   and `_cq_dialog` are untouched — only the front-end render target changed. Extra DS
   props (e.g. `ds-accordion`'s `marker`, `button`, `buttonColor`) need an
   `_cq_editConfig.xml` / dialog override if they should be author-configurable.

## General recipe for other Core Components

1. Identify the DS web component with equivalent behavior (`ds-accordion`, `ds-tabs`, …).
2. Override the Core Component's HTL via `sling:resourceSuperType`; keep the Sling Model.
3. Map Sling Model fields to DS component props/slots.
4. Remove the corresponding Core Components clientlib category; rely on the DS
   component's own Shadow DOM behavior.
5. Re-wire any Adobe Client Data Layer events the removed clientlib used to emit.
6. Keep authoring dialogs pointed at the light DOM wrapper elements so AEM's edit
   overlay keeps working — the Shadow DOM boundary only affects generated chrome, never
   author-editable content.

---

## Delivering the DS to server-rendered AEM pages (dev / staging / prod)

Everything above assumes `ds-accordion` / `ds-date` are simply available on the page.
This section covers how they actually get there — and, specifically, how version
changes can be fast on dev without making prod's version anything other than fixed.

`@baloise/ds-*` packages are published to the public npm registry and version-locked
together via changesets (`.changeset/config.json`: `"fixed": [["@baloise/ds-*"]]`) — a
single version number (e.g. `20.0.0-next.8`) always identifies a matching `ds-core` +
`ds-css` pair.

AEM's own clientlib pipeline is Maven-built: changing a bundled npm version means a
frontend rebuild and a full AEM package deploy, on every environment that uses it. That
model is a fine fit for a fixed, deliberately-promoted prod version — but it can't give
dev a fast version switch without paying the same rebuild cost every time. So the two
environment groups use **different delivery mechanisms**, not just different version
pins:

| Environment | Delivery mechanism                                     | Version control                                                                 |
| ----------- | ------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Dev         | Self-hosted CDN, loaded via `<script>`/`<link>`        | Single shared JCR config node, editable directly by developers                  |
| Staging     | Maven build bundles the npm package into the clientlib | `package.json` pin — always the release candidate for the next prod deploy      |
| Prod        | Same Maven/clientlib build as staging                  | `package.json` pin — promoted from staging via a second, deliberate PR + deploy |

### Publishing to the self-hosted CDN

A CI step, triggered on every npm publish (including `next` prereleases), pushes the
published package's build output to Helvetia's own CDN/object storage under immutable,
version-prefixed paths:

```
https://cdn.helvetia.example/ds/core/{version}/...   ← @baloise/ds-core (Stencil lazy-loader output)
https://cdn.helvetia.example/ds/css/{version}/...    ← @baloise/ds-css
```

Only `ds-core` and `ds-css` are synced — `ds-tokens` is a build-time input already
compiled into `ds-css`'s output and is never served to a browser directly. Paths are
never overwritten (a new version is a new path), so responses can be cached
`immutable, max-age=1y` with no invalidation logic. npm remains the source of truth and
version ledger; the CDN is purely a browser-reachable mirror of what's already
published. There is deliberately no SRI on these tags — the CDN is Helvetia's own
infrastructure, not a third party, so the extra hash bookkeeping isn't buying much.

### Dev: fast version switching

Dev pages render a global `<script type="module">` (Stencil's lazy-loader bootstrap —
lightweight; it code-splits per component, so loading it site-wide doesn't pull in the
whole library) plus a `<link>` for `ds-css`, with the version segment of both URLs read
from a single JCR config node (e.g. `/conf/global/settings/ds-version`) at render time:

```html
<sly
  data-sly-use.dsVersion="${'com.helvetia.aem.core.models.DsVersion' @ path='/conf/global/settings/ds-version'}"
></sly>
<link rel="stylesheet" href="https://cdn.helvetia.example/ds/css/${dsVersion.value}/ds.css" />
<script type="module" src="https://cdn.helvetia.example/ds/core/${dsVersion.value}/ds-core.esm.js"></script>
```

Changing dev's DS version is a one-line edit to that node (CRXDE / package, not Cloud
Manager) — no rebuild, no redeploy. Any developer with repo/CRXDE access can point dev
at any published version (including one not yet promoted to staging) without an ops
ticket, and there is exactly one answer to "what version is dev running" at any given
time — no per-page drift.

Global loading is deliberate: since Stencil's loader only fetches the JS chunk for a
component actually present on the page, the marginal cost of "always present" is just
the small bootstrap script, not the whole library — cheaper than building and
maintaining per-template conditional inclusion logic.

### Staging and prod: Maven-bundled, pinned, promoted

Staging and prod both consume `@baloise/ds-core` / `@baloise/ds-css` the conventional
way — as an npm dependency of the `ui.frontend` Maven module, pinned by version in
`package.json`, bundled into the AEM clientlib at build time. Staging is the **release
gate**: its `package.json` pin is always the exact candidate being validated for the
next prod release. Promoting to prod is a second, separate PR that bumps prod's pin to
that same, now-validated version — prod never runs a version staging didn't already run.

There is intentionally no fallback path that lets prod read from the CDN in an
emergency. A bad prod version is recovered the same way it shipped — revert the pin,
redeploy through the normal pipeline — because any mechanism that lets prod
conditionally bypass its Maven pin quietly turns "prod's version is fixed" into "prod's
version is fixed, except when it isn't."

---

# Adaptive Forms: connecting `ds-date`

**Adaptive Forms Core Components** (`adobe/aem-core-forms-components`) is a different
product from the Sites Core WCM Components covered above, with a different runtime.

**This section covers Core-Components-rendered Adaptive Forms**: server-rendered HTL on
the AEM instance (the classic "Create a Core Components based Adaptive Form" flow), the
direct analog of the Sites accordion integration above — framework-agnostic HTL + plain
JS, no build step beyond what AEM already requires. If the frontend is a separate
Next.js/React app consuming AEM headlessly instead, see the
[Headless: Next.js + AEM](#headless-nextjs--aem) section below — Adobe's headless
Adaptive Forms renderer is React-only, so that path only makes sense once React is
already the frontend's own choice, not something adopted just to reach `ds-date`.

**What the built-in date picker renders** (`core/fd/components/form/datepicker/v1/datepicker`,
backed by Sling Model `com.adobe.cq.forms.core.components.models.form.DatePicker`):

```html
<div
  class="cmp-adaptiveform-datepicker"
  data-cmp-is="adaptiveFormDatePicker"
  data-cmp-visible="${datePicker.visible ? 'true' : 'false'}"
  data-cmp-enabled="${datePicker.enabled ? 'true' : 'false'}"
  data-cmp-required="${datePicker.required ? 'true' : 'false'}"
  data-cmp-readonly="${datePicker.readOnly ? 'true' : 'false'}"
  id="${datePicker.id}"
  data-cmp-adaptiveformcontainer-path="${formstructparser.formContainerPath}"
>
  <!-- label / description / question-mark partials -->
  <input
    type="date"
    name="${datePicker.name}"
    class="cmp-adaptiveform-datepicker__widget"
    disabled="${!datePicker.enabled}"
    readonly="${datePicker.readOnly}"
    required="${datePicker.required}"
    value="${datePicker.default}"
    data-cmp-data-layer="${datePicker.data.json}"
    id="${widgetId}"
    min="${minDate.formatDate}"
    max="${maxDate.formatDate}"
  />
  <!-- short description / long description / error message partials -->
</div>
```

The **outer `div`'s `data-cmp-*` attributes are the contract**: the Adaptive Forms client
runtime (built on `@aemforms/af-core`'s rule engine — see the `BaseModel` shape: `id`,
`name`, `fieldType`, `value`, `valid`, `visible`, `enabled`, `readOnly`, `required`,
`validate()`) discovers every element carrying `data-cmp-is` on the page and wires it to
the field's live state (visibility/enabled/required/readonly toggling, value
get/set, validation feedback, `dataRef` binding). That contract lives on the **outer
wrapper**, not on the `<input>` itself — which is exactly the light-DOM hook a Shadow DOM
component needs.

**Overridden `datepicker.html`**, same Sling Model, `ds-date` instead of the native input:

```html
<sly data-sly-use.renderer="${'datepicker.js'}" ...></sly>
<div
  data-sly-use.datePicker="com.adobe.cq.forms.core.components.models.form.DatePicker"
  class="cmp-adaptiveform-datepicker"
  data-cmp-is="adaptiveFormDatePicker"
  data-cmp-visible="${datePicker.visible ? 'true' : 'false'}"
  data-cmp-enabled="${datePicker.enabled ? 'true' : 'false'}"
  data-cmp-required="${datePicker.required ? 'true' : 'false'}"
  data-cmp-readonly="${datePicker.readOnly ? 'true' : 'false'}"
  id="${datePicker.id}"
  data-cmp-adaptiveformcontainer-path="${formstructparser.formContainerPath}"
>
  <ds-date
    id="${widgetId}"
    name="${datePicker.name}"
    label="${datePicker.label.value}"
    description="${datePicker.description}"
    value="${datePicker.default}"
    required="${datePicker.required}"
    disabled="${!datePicker.enabled}"
    readonly="${datePicker.readOnly}"
    min="${minDate.formatDate}"
    max="${maxDate.formatDate}"
    data-cmp-data-layer="${datePicker.data.json}"
  >
    <!-- AEM's runtime writes the computed validation text into this node
         at validate-time — same partial, same target id it always used.
         ds-date now renders it in place via its invalid-text slot, so no
         text copying is needed; the runtime keeps owning this node. -->
    <div
      slot="invalid-text"
      data-sly-call="${errorMessage.errorMessage @componentId=datePicker.id, bemBlock='cmp-adaptiveform-datepicker'}"
      data-sly-unwrap
    ></div>
  </ds-date>
</div>
```

`ds-date` already maps cleanly onto the Sling Model's fields
(`packages/core/src/components/date/date.tsx:97-267`): `value` is ISO `YYYY-MM-DD` (same
format the model exposes), and `name` / `label` / `description` / `required` / `disabled`
/ `readonly` / `min` / `max` are all real props. `label="${datePicker.label.value}"` maps
directly too — `datePicker.label` is an object (`{ value, visible, richText }`, same shape
the built-in `label.html` partial consumes), so `.value` is the plain label text `ds-date`'s
`label` prop expects.

**DS change:** `ds-date` (via the shared `Field` util,
`packages/core/src/components/input/field.util.tsx:81-92`) now exposes an
**`invalid-text` slot**. When `invalid` is `true`, any light-DOM content slotted as
`slot="invalid-text"` renders in place of the `invalidText` prop — the prop still works
unchanged for everyone else, this is additive. That's what removes the need for a
text-mirroring bridge: AEM's `errorMessage.errorMessage` partial keeps writing into the
exact same DOM node it always has (by `id`, via `aria-live="assertive"`); that node now
just lives inside `<ds-date>` instead of next to it, so `ds-date` displays it directly —
no JS needed to move or copy the error text.

**One adapter still needed — not for the text, only for `dsChange`.** `ds-date` is
`formAssociated: true` and participates in native `<form>` submission via
`ElementInternals` (so plain form `POST`/`FormData` already sees its value correctly),
but it emits `dsChange` — not a native `change`/`input` event — when the user picks or
types a date (`packages/core/src/components/date/date.tsx:279-286`). If the Adaptive
Forms runtime's field binding listens for DOM `change`/`input` on the widget (rather than
only reading `FormData` on submit) it won't pick up `dsChange`:

```js
document.querySelectorAll('[data-cmp-is="adaptiveFormDatePicker"] ds-date').forEach(dsDate => {
  dsDate.addEventListener('dsChange', () => {
    dsDate.dispatchEvent(new Event('change', { bubbles: true }))
  })
})
```

Toggling `ds-date`'s `invalid` boolean itself (so the slotted text actually renders) still
has to come from somewhere — the Sling Model has no static `valid` flag, validity is
computed client-side by the rule engine. If the runtime already toggles a validity
indicator (an `is-invalid`/`aria-invalid` class or attribute) on the wrapper when a
constraint fails, mirror that one boolean onto `ds-date.invalid`; if it only ever writes
text into the error node and never signals validity separately, fall back to flipping
`invalid` based on that node's `textContent` being non-empty. Either way this is a single
boolean flip now, not a text copy.

⚠️ **Verify before shipping:** the exact discovery/binding mechanism (which clientlib,
which DOM events it listens for, whether it reads `.value` as a property or an attribute,
and how/whether it signals validity separately from writing the error text) lives in the
compiled `core.forms.components.runtime.*` clientlib JS, which wasn't possible to fully
confirm from documentation alone. Inspect that bundle (or trace it with devtools against a
stock date-picker field) before relying on the bridge above in production — the field discovery
keys off `data-cmp-is` and the empty `errormessage` div target, both confirmed from the
component source; the exact write-timing/event contract is the part to double-check.

Drop the built-in `core.forms.components.base.v1` _widget_ rendering for this field (you
already replaced the markup) but keep the base runtime/rule-engine clientlibs — those are
what make visibility rules, validation, and data binding work at all, and `ds-date` slots
into that system via the same `data-cmp-*` hooks, not by replacing it.

---

# Headless: Next.js + AEM

Everything above assumes AEM renders the page (HTL runs on the AEM instance, the DS
component is dropped into that markup). **Headless is the opposite shape**: AEM only
serves structured content — Content Fragments over GraphQL for regular content, the
`@aemforms/af-core` JSON rule engine for Adaptive Forms — and a separate frontend (here,
Next.js, chosen for its server rendering) owns all markup and rendering. There's no HTL
to override and no Sling Model to map props from; the integration point moves entirely
into the frontend.

One fact drives most of the decisions below: **`@baloise/ds-react`'s Stencil-generated
React wrappers have no SSR/hydrate support** (`packages/react/CONTEXT.md`: _"No SSR/hydrate
support yet (`hydrateModule` is not configured) — client-side only."_). A Next.js Server
Component cannot produce real server-rendered HTML for a Shadow DOM `ds-*` component
today. That single constraint is why the two worked examples below land on opposite
architectures.

## Advantages of headless

- **Rendering stack is fully owned by the frontend** — Next.js's own SSR/ISR/edge caching,
  not AEM's dispatcher/HTL pipeline. Modern DX (TypeScript, hot reload, component-level
  testing) instead of Sightly/HTL.
- **Content/presentation are fully decoupled.** The same Content Fragment or Adaptive
  Form JSON can feed multiple channels (web, native app, another frontend) without AEM
  knowing anything about markup.
- **Independent release cadence.** Frontend deploys aren't coupled to an AEM release; no
  clientlib rebuilds or dispatcher invalidation to ship a UI change.
- **The DS's CSS-only mode is a perfect fit for presentational pieces.** As the Card
  example below shows, a headless page can get genuine SSR with zero hydration risk and
  full SEO parity with a normal Next.js site — arguably a _better_ fit than the HTL path,
  since there's no Shadow DOM to reason about at all.

## Disadvantages of headless

- **No in-context authoring.** Content authors lose AEM's "click to edit on the page"
  experience — they author structured fields in a Content Fragment / Adaptive Form
  model, blind to how it will actually render.
- **Two release trains to coordinate.** A Content Fragment Model or Form JSON schema
  change and the frontend code that consumes it can drift out of sync independently —
  there's no compiler tying them together the way a typed Sling Model does.
- **The Shadow DOM component gap is real.** `@baloise/ds-react` has no SSR path today, so
  anything that needs an actual `ds-*` component (not just its CSS) becomes a client-only
  island — a hydration boundary and a JS payload the CSS-only and HTL paths didn't need.
- **Headless Adaptive Forms locks the forms frontend to React.** Unlike Core Components'
  framework-agnostic HTL + plain JS, `@aemforms/af-react-renderer` is the only officially
  shipped renderer — and parts of its API (exact handler/export names) aren't fully
  documented, as flagged in the code below.
- **More integration surface, not less.** A Core Components HTL override is write-once —
  AEM keeps owning rules, validation, and authoring. Headless means the frontend
  re-implements the rendering _and_ the data-binding wiring itself, per field, per
  component.

## Business advantages and disadvantages of headless

The points above are for engineers. The same decision looks different from a marketing /
content-ops seat — this is what it means day to day for the people who own campaigns,
landing pages, and the forms sitting behind them.

**Advantages**

- **Faster, richer pages for campaigns.** Server-rendered Next.js pages load faster and
  score better on Core Web Vitals / SEO than the current AEM dispatcher pipeline —
  directly helps paid-campaign landing pages and organic search ranking, and makes it
  quicker to launch and update the pages that carry a marketing push.
- **One piece of content, many channels.** A Content Fragment written once (a product
  description, a campaign banner) can feed the website, a future app, or a partner
  channel without re-authoring — less duplicate work for content teams over time.
- **Marketing isn't blocked by AEM release trains.** Frontend changes (a new promo layout,
  an experiment) ship independently of AEM upgrades, so a design/campaign tweak doesn't
  have to wait for the next platform release window.
- **Easier to run experiments.** Because the frontend is a normal modern web app, it's
  simpler to wire up A/B testing, personalization, and analytics tooling than inside the
  HTL/dispatcher stack — useful for conversion-focused work (landing pages, application
  funnels).

**Disadvantages**

- **Authors lose "what you see is what you get" editing.** Today's AEM authors click
  directly on the live page to change text or swap an image. Headless means editing
  structured fields in a form, without seeing the real page layout until it's published or
  previewed — a bigger training/workflow change for content editors than it sounds, and a
  real source of authoring mistakes early on.
- **Content and page changes can drift apart.** Because content structure (in AEM) and
  page design (in the frontend) are now built and released separately, a content model
  change can go live without the frontend being ready for it, or vice versa — needs
  tighter coordination between content and engineering teams than the current one-system
  setup.
- **Interactive forms don't get the speed benefit.** Anything like an application or quote
  form still ships as a heavier, JavaScript-driven page section — so the "faster page"
  advantage above mainly benefits marketing/content pages, not the forms behind them.
- **Bigger upfront investment, less mature tooling.** This is a newer pattern for the team
  than the current AEM setup — expect a slower start while the approach, tooling, and
  author workflows mature, before the speed/flexibility gains are fully realized.

## Example 1 — Card (Content Fragments + GraphQL, fully server-rendered)

Fetch AEM Content Fragment data server-side, render `ds-card`'s **CSS-only** markup
directly as JSX — no custom element, no hydration boundary, real HTML in the first
response:

```ts
// lib/aem.ts
export async function getCards() {
  const res = await fetch(
    `${process.env.AEM_HOST}/graphql/execute.json/my-project/cards`,
    { next: { revalidate: 300 } }, // ISR — re-fetch from AEM every 5 min
  )
  const { data } = await res.json()
  return data.cardList.items as Array<{
    title: string
    subtitle: string
    description: string
    image: { _path: string }
    ctaLabel: string
    ctaHref: string
  }>
}
```

```tsx
// components/Card.tsx — Server Component, zero client JS
export function Card({ title, subtitle, description, image, ctaLabel, ctaHref }: CardProps) {
  return (
    <article className="card is-dense has-space-sm">
      <picture>
        <img src={image._path} alt="" />
      </picture>
      <div className="card-content">
        <h3>
          <span className="title">{title}</span>
          <span className="subtitle">{subtitle}</span>
        </h3>
        <p>{description}</p>
      </div>
      <footer className="card-actions">
        <a className="button" href={ctaHref}>
          {ctaLabel}
        </a>
      </footer>
    </article>
  )
}
```

```tsx
// app/page.tsx — Server Component
import { getCards } from '@/lib/aem'
import { Card } from '@/components/Card'

export default async function Page() {
  const cards = await getCards()
  return (
    <div className="grid">
      {cards.map(c => (
        <Card key={c.title} {...c} />
      ))}
    </div>
  )
}
```

Same `.card` / `.card-content` / `.card-actions` / `.title` markup as the EDS block
adoption pattern — the CSS-only mode is the one piece of the DS that's identical across
every AEM delivery model.

## Example 2 — Form (Adaptive Forms headless, `ds-date` as a client island)

Forms are the opposite case from Card: genuinely interactive (calendar popup, keyboard
nav, masking), so the missing SSR path isn't a real cost here — a form was never going to
be indexable content anyway. The Shadow DOM component is the right tool, mounted
explicitly as a client-only chunk inside an otherwise server-rendered page:

```tsx
// components/forms/DsDateField.tsx — 'use client': useRuleEngine and DOM refs are browser-only
'use client'
import { useRuleEngine } from '@aemforms/af-react-renderer'
import { DsDate } from '@baloise/ds-react'

export function DsDateField(props) {
  const [state, handlers] = useRuleEngine(props)
  return (
    <DsDate
      id={state.id}
      name={state.name}
      label={state?.label?.value}
      required={state.required}
      disabled={!state.enabled}
      readonly={state.readOnly}
      value={state.value ?? undefined}
      invalid={state.valid === false}
      invalidText={state.valid === false ? state.errorMessage : ''}
      onDsChange={ev => handlers.updateValue?.(ev.detail)} // ⚠️ confirm real handler name
    />
  )
}
```

```tsx
// components/forms/mappings.ts
import { mappings as defaultMappings } from '@aemforms/af-react-renderer'
import { DsDateField } from './DsDateField'

export const mappings = { ...defaultMappings, 'date-input': DsDateField }
```

```tsx
// components/forms/AdaptiveForm.tsx
'use client'
import { FormContainer } from '@aemforms/af-react-renderer' // ⚠️ confirm real export name
import { mappings } from './mappings'

export function AdaptiveForm({ formJson }) {
  return <FormContainer formJson={formJson} mappings={mappings} />
}
```

```tsx
// app/insurance-application/page.tsx — Server Component: the shell is still SSR'd
import dynamic from 'next/dynamic'
import { getFormDefinition } from '@/lib/aem'

const AdaptiveForm = dynamic(() => import('@/components/forms/AdaptiveForm'), { ssr: false })

export default async function Page() {
  const formJson = await getFormDefinition('insurance-application') // server-side fetch, cached
  return (
    <main>
      <h1>Apply for coverage</h1> {/* real HTML, indexable */}
      <AdaptiveForm formJson={formJson} />
    </main>
  )
}
```

`ssr:false` on the dynamic import mirrors the EDS block-loading principle from earlier in
this document: the `@aemforms/af-react-renderer` + `af-core` + DS JS chunk only ships on
pages that actually contain a form, never on the rest of the site.

⚠️ `handlers.updateValue` and `FormContainer` are illustrative names, not confirmed
against `@aemforms/af-react-renderer`'s actual API surface — check its type definitions
for your installed version before wiring this up for real. The other field types
(`ds-input`, `ds-select`, …) follow the identical `DsXField` wrapper pattern: one thin
client component per field, binding `useRuleEngine`'s `[state, handlers]` to the matching
DS React prop names.
