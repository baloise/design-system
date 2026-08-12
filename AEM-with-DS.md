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
