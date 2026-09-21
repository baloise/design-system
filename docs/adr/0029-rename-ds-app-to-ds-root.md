# 29. Rename `ds-app` to `ds-root`

Package: `packages/core`, `apps/storybook`, `packages/playwright`

Date: 2026-09-11

## Status

Accepted

## Context

`ds-app` is the root wrapper component: every design-system consumer wraps
their markup in it, and it carries global configuration (brand, region,
language), focus-visible management, and responsive-height wiring
(`--ds-app-height`) for all descendant components. The name implies a
JS-application context, but the design system is also consumed by CMS and
marketing/website integrations that render server-side markup with no
application shell. "App" therefore misrepresents the component's scope —
purely a naming problem, not a functional one; the component's behavior does
not change for either kind of consumer.

This sits next to ADR-0026, which prefixed `ds-navbar`/`ds-footer` as
`ds-app-navbar`/`ds-app-footer` to denote an application-usage-context
scope, explicitly noting at the time that the `ds-app-*` prefix was
"unrelated to `ds-app`, the existing root wrapper component." Renaming the
root wrapper to `ds-root` now makes that disclaimer moot — but it also raises
the question of whether `ds-app-navbar`/`ds-app-footer` should follow along.

Considered alternatives for the new name:

- `ds-provider` — matches the React-ecosystem "Provider" pattern (Fluent UI,
  Spectrum, Polaris) for a component that injects global context. Rejected:
  the Stencil/web-components ecosystem this design system is built on has no
  equivalent convention, so the name would import a mental model that doesn't
  otherwise exist here.
- `ds-shell` — a neutral umbrella term covering both the DOM-root and
  cross-cutting-setup responsibilities. Rejected in favor of the more
  concrete `ds-root`, which describes the component's actual DOM position
  without needing to also imply a "shell" architecture.

A hard rename with no alias (the ADR-0026 navbar/footer precedent) was
considered and rejected: `ds-app` is the page root for every consumer, so
removing the tag would be a breaking change for every integrating app.

## Decision

Rename `ds-app` → `ds-root`, applied consistently across the tag, class
(`App` → `Root`), the canonical folder/file names (`components/root/`,
`root.tsx`, etc.), the CSS custom property (`--ds-app-height` →
`--ds-root-height`), the `getAppRoot()` helper (→ `getRootElement()`), CSS
classes (`.ds-app`/`.ds-app--safari`/`.ds-app--touch` → `.ds-root`/
`.ds-root--safari`/`.ds-root--touch`), Storybook docs, and Playwright page
objects.

Keep compatibility aliases, marked `@deprecated`:

- `<ds-app>` remains a Stencil component with the same public API as `ds-root`
- `getAppRoot()` remains exported and delegates to `getRootElement()`
- `--ds-app-height` continues to be written alongside `--ds-root-height`
- `.ds-app` / `.ds-app--safari` / `.ds-app--touch` continue to be applied
  on the host
- Generated framework wrappers (`DsApp`) and the Playwright `DsApp` page
  object stay public with a deprecation diagnostic pointing at `DsRoot`

`ds-app-navbar` and `ds-app-footer` **keep** their `ds-app-*` prefix. The
prefix denotes "application usage context" as a scope in its own right (as
ADR-0026 already intended), distinct from a planned future "website usage
context" (`ds-web-navbar`/`ds-web-footer`, still unbuilt). The apparent
mismatch between `ds-root` and `ds-app-navbar` is intentional, not leftover
naming debt. Designing the website-context scope itself is out of scope for
this decision.

## Consequences

- Existing consumers of `ds-app`, `getAppRoot()`, and `--ds-app-height`
  keep compiling and rendering. New code should use `ds-root`,
  `getRootElement()`, and `--ds-root-height`.
- ADR-0026's text ("unrelated to `ds-app`, the existing root wrapper
  component") now refers to a renamed component; that ADR is left as a
  historical record and not edited, but `packages/core/CONTEXT.md` is
  updated to reflect the current name.
- Future work introducing a website usage context can name it `ds-web-*`
  without also needing to touch or reconcile `ds-root`.
- Numbered 0029 because [ADR-0028](0028-react-idioms-for-overlay-components.md)
  already occupies 28.
