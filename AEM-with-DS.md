# Using the Design System with Adobe Experience Manager Core Components

Notes on integrating Helvetia Design System (Shadow DOM Stencil web components) with
[Adobe Experience Manager Core WCM Components](https://github.com/adobe/aem-core-wcm-components),
using the accordion as the worked example. The same pattern applies to other Core
Components with an equivalent DS component (tabs, carousel, etc.).

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
    <button class="cmp-accordion__button" data-cmp-hook-accordion="button"
      aria-expanded="false" aria-controls="accordion-panel-1" id="accordion-header-1">
      <span class="cmp-accordion__title">Item Title</span>
    </button>
  </h3>
  <div class="cmp-accordion__panel" id="accordion-panel-1"
    data-cmp-hook-accordion="panel" aria-labelledby="accordion-header-1" hidden>
    <!-- authored child components -->
  </div>
</div>
```

**Overridden `accordion.html`**, looping over the same Sling Model items:

```html
<sly data-sly-use.model="com.adobe.cq.wcm.core.components.models.Accordion"
     data-sly-list.item="${model.items}">
  <ds-accordion
    id="${item.id}"
    open="${item.expanded}"
    group="${model.id}"
    summary-level="h3"
    data-cmp-data-layer="${item.data.json}">
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

# Adaptive Forms: connecting `ds-date`

**Adaptive Forms Core Components** (`adobe/aem-core-forms-components`) is a different
product from the Sites Core WCM Components covered above, with a different runtime.
There are two distinct integration paths, and they are not interchangeable — pick the
one matching how your forms are actually delivered.

| | **Core-Components-rendered Adaptive Forms** | **Headless Adaptive Forms** |
|---|---|---|
| Rendering | Server-rendered HTL on the AEM instance (the classic "Create a Core Components based Adaptive Form" flow) | Form is fetched as JSON; a client SPA renders it itself |
| Analogous to | The Sites accordion pattern above | Embedding `ds-date` in any React app |
| Extension point | Override HTL via `sling:resourceSuperType`, keep the Sling Model | A `mappings` object keyed by `fieldType`/resourceType, consumed by `@aemforms/af-react-renderer` |
| Framework | Framework-agnostic (plain HTL + JS) | React only — no documented native web-component contract |

## Path A — Core-Components-rendered Adaptive Forms (recommended default)

This is the direct analog of the Sites accordion integration and should be the default
choice if authors edit forms in the AEM UI and the form is rendered by AEM itself.

**What the built-in date picker renders** (`core/fd/components/form/datepicker/v1/datepicker`,
backed by Sling Model `com.adobe.cq.forms.core.components.models.form.DatePicker`):

```html
<div class="cmp-adaptiveform-datepicker"
     data-cmp-is="adaptiveFormDatePicker"
     data-cmp-visible="${datePicker.visible ? 'true' : 'false'}"
     data-cmp-enabled="${datePicker.enabled ? 'true' : 'false'}"
     data-cmp-required="${datePicker.required ? 'true' : 'false'}"
     data-cmp-readonly="${datePicker.readOnly ? 'true' : 'false'}"
     id="${datePicker.id}"
     data-cmp-adaptiveformcontainer-path="${formstructparser.formContainerPath}">
  <!-- label / description / question-mark partials -->
  <input type="date"
         name="${datePicker.name}"
         class="cmp-adaptiveform-datepicker__widget"
         disabled="${!datePicker.enabled}"
         readonly="${datePicker.readOnly}"
         required="${datePicker.required}"
         value="${datePicker.default}"
         data-cmp-data-layer="${datePicker.data.json}"
         id="${widgetId}"
         min="${minDate.formatDate}"
         max="${maxDate.formatDate}" />
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
<div data-sly-use.datePicker="com.adobe.cq.forms.core.components.models.form.DatePicker"
     class="cmp-adaptiveform-datepicker"
     data-cmp-is="adaptiveFormDatePicker"
     data-cmp-visible="${datePicker.visible ? 'true' : 'false'}"
     data-cmp-enabled="${datePicker.enabled ? 'true' : 'false'}"
     data-cmp-required="${datePicker.required ? 'true' : 'false'}"
     data-cmp-readonly="${datePicker.readOnly ? 'true' : 'false'}"
     id="${datePicker.id}"
     data-cmp-adaptiveformcontainer-path="${formstructparser.formContainerPath}">

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
    data-cmp-data-layer="${datePicker.data.json}">
  </ds-date>

  <div data-sly-call="${errorMessage.errorMessage @componentId=datePicker.id, bemBlock='cmp-adaptiveform-datepicker'}" data-sly-unwrap></div>
</div>
```

`ds-date` already maps cleanly onto the Sling Model's fields
(`packages/core/src/components/date/date.tsx:97-267`): `value` is ISO `YYYY-MM-DD` (same
format the model exposes), and `name` / `label` / `description` / `required` / `disabled`
/ `readonly` / `min` / `max` are all real props.

**The one adapter you need:** `ds-date` is `formAssociated: true` and participates in
native `<form>` submission via `ElementInternals` (so plain form `POST`/`FormData`
already sees its value correctly), but it emits `dsChange` — not a native `change`/`input`
event — when the user picks or types a date
(`packages/core/src/components/date/date.tsx:279-286`). If the Adaptive Forms runtime's
field binding listens for DOM `change`/`input` on the widget (rather than only reading
`FormData` on submit) it won't pick up `dsChange`. Bridge it explicitly:

```js
document.querySelectorAll('ds-date[data-cmp-is="adaptiveFormDatePicker"]').forEach(el => {
  el.addEventListener('dsChange', (ev) => {
    el.dispatchEvent(new Event('change', { bubbles: true }))
  })
})
```

⚠️ **Verify before shipping:** the exact discovery/binding mechanism (which clientlib,
which DOM events it listens for, whether it reads `.value` as a property or an attribute)
lives in the compiled `core.forms.components.runtime.*` clientlib JS, which wasn't
possible to fully confirm from documentation alone. Inspect that bundle (or trace it with
devtools against a stock date-picker field) before relying on the bridge above in
production — the field discovery keys off `data-cmp-is`, that part is confirmed from the
component source; the event contract is the part to double-check.

Drop the built-in `core.forms.components.base.v1` *widget* rendering for this field (you
already replaced the markup) but keep the base runtime/rule-engine clientlibs — those are
what make visibility rules, validation, and data binding work at all, and `ds-date` slots
into that system via the same `data-cmp-*` hooks, not by replacing it.

## Path B — Headless Adaptive Forms (own SPA rendering)

If forms are fetched as JSON (`@aemforms/af-core`) and rendered by your own React app
via `@aemforms/af-react-renderer`, there is no server-rendered HTL to override. Instead,
fields are matched via a `mappings` object keyed by `fieldType` (replaces every field of
that type) or by component resource type (replaces one specific field):

```ts
const customMappings = {
  ...mappings,
  'date-input': DsDateField, // fieldType key, or a resourceType key for a single field
}
```

Each mapped component receives `props: State<FieldJson>` and calls `useRuleEngine(props)`
to get back `[state, handlers]` — `state` carries the same `BaseModel` shape as Path A
(`value`, `valid`, `visible`, `enabled`, `required`, `label`, …). This layer is
**React-only**; there's no documented native-custom-element contract, so `ds-date` needs
a thin wrapper that bridges React ↔ Shadow DOM manually (React's synthetic event system
does not reliably see custom events fired inside a shadow root, so bind imperatively):

```tsx
function DsDateField(props: State<FieldJson>) {
  const [state, handlers] = useRuleEngine(props)
  const ref = useRef<HTMLElement & { value: string | null }>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onChange = (ev: Event) => {
      const value = (ev.target as any).value
      // call whichever handler your installed @aemforms/af-react-renderer
      // version exposes for pushing a value into the rule engine —
      // confirm the exact name/signature against its current API/types.
      handlers.change?.(value)
    }
    el.addEventListener('dsChange', onChange)
    return () => el.removeEventListener('dsChange', onChange)
  }, [handlers])

  useEffect(() => {
    if (ref.current) (ref.current as any).value = state.value ?? null
  }, [state.value])

  return (
    <ds-date
      ref={ref}
      id={state.id}
      name={state.name}
      label={state?.label?.value}
      required={state.required}
      disabled={!state.enabled}
      readonly={state.readOnly}
      hidden={!state.visible}
    />
  )
}
```

⚠️ This example is architecturally sound (imperative ref binding is the standard way to
wrap web components in React) but the exact `handlers` API surface wasn't confirmed from
documentation — check `@aemforms/af-react-renderer`'s current type definitions for the
real method name before using it.

## Which path to use

Default to **Path A** unless the form is genuinely delivered headless (fetched as JSON
and rendered by a separate SPA/app shell) — it keeps AEM's authoring, rules, and
validation engine intact and only swaps the widget markup, exactly like the Sites
accordion pattern. Reach for Path B only when there's no server-rendered HTL at all to
override.
