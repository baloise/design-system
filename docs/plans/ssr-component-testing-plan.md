# Implementation Plan: SSR render test for every component

Status: **agreed via /grilling** — supersedes the earlier draft of this file (which proposed
reusing existing `*.visual.html` fixtures; superseded by the per-component `mountSsr()` design
below). Still scoped down from the broader [ssr-visual-testing-idea.md](./ssr-visual-testing-idea.md)
brainstorm — no full CSR/SSR pixel-parity sweep, no nightly job, no second Playwright browser pass
over every existing variant.

## Goal

Every component must be provably able to server-render via `@helvetia-design/core/hydrate`'s
`renderToString`, and then hydrate cleanly in a real browser, without error — the "window is not
available" class of bug. Confirmed as a real, non-hypothetical risk: the first fixture spiked
against this approach (`button.visual.html`) surfaced a genuine bug in `ds-brand-icon` (relative-URL
`fetch()` throwing under Node's `fetch`, which has no notion of a "current page" to resolve
against). **Already fixed** in `packages/core/src/utils/svg.ts` — `fetchSvg` now resolves the URL
against `document.baseURI` before fetching, a no-op change in the browser (verified) that fixes
Node/SSR (verified against the live dev server).

## Decisions made (via grilling)

1. **Hard CI gate — but only once fully green.** No non-blocking/report-only grace period. If the
   sweep or rollout turns up more pre-existing SSR bugs, they get fixed in the same effort before
   this lands, so it's never red on `next`.
2. **No separate static fixture file.** Rejected in favor of inline markup directly in a
   `.play.ts` file, mirroring the existing `mount()` pattern used by `*.component.play.ts` (see
   `packages/core/src/components/actions/button/test/button.component.play.ts`).
3. **`mountSsr()` — an SSR twin of `mount()`.** Not just a Node-side diagnostics check. Reuses
   `mount()`'s route-interception trick (`packages/playwright/src/lib/page/utils/mount.ts`) so the
   *server-rendered* HTML gets served to a real page, and the test can use the same page-object
   infrastructure (`DsBadge`, `DsCard`, ...) already used by `.component.play.ts` to assert the
   component actually works post-hydration — not just "didn't throw."
4. **One `.ssr.play.ts` per existing component grouping, all ~46+ written now — not phased.**
   Mirrors whatever grouping the existing `.component.play.ts` files already use per component
   family (see "File coverage" below) — no separate per-tag file invented. Full rollout in one
   pass, not pattern-first-then-follow-up, per explicit instruction.
5. **One minimal representative render per component — not the full variant matrix.** A single
   `test()` per file (matching what `.component.play.ts` already does per case) using default/
   representative props. Variant-level SSR coverage (e.g. every color, every size) is out of scope
   for this pass.
6. **Composite components render nested, in one mount.** For component families where children
   only make sense inside a parent (`ds-card` + `ds-card-title`/`ds-card-header`/etc.,
   `ds-select` + `ds-select-option`, `ds-tabs` + `ds-tab-panel`, `ds-modal` + `ds-modal-body`, ...),
   the single `mountSsr()` call nests parent + representative children together, so every child tag
   gets exercised too. This closes the coverage gap found during the spike (`ds-select-option`,
   `ds-select-optgroup`, `ds-alert-container` had zero `*.visual.html`/`*.style.html` coverage
   under the old, rejected approach).
7. **`mountSsr()` bakes in three checks automatically** — no per-file boilerplate needed beyond
   the markup and one visibility/content assertion:
   - Zero `error`-level diagnostics from `renderToString` (the crash check).
   - The rendered output actually contains `shadowrootmode` (confirms real SSR happened, not a
     silent no-op).
   - Zero browser console errors after the page loads and the client claims the server-rendered
     markup (the hydration-mismatch check).
8. **`mountSsr()` lives in `@helvetia-design/playwright`, dependency-injected.** Same package as
   `mount()`, for consistency and shared plumbing (route interception, template wrapper) — but it
   does **not** import `@helvetia-design/core/hydrate` directly. `@helvetia-design/playwright` has zero
   dependency on `@helvetia-design/core` today, and `@helvetia-design/core` already depends on
   `@helvetia-design/playwright` for its own testing — importing `renderToString` directly would create
   a circular workspace dependency. Instead: `mountSsr(page, html, renderToString)` — each
   `*.ssr.play.ts` file in `packages/core` imports `renderToString` from `@helvetia-design/core/hydrate`
   itself and passes it in.

## Key technical fact confirmed during the spike

A bare `renderToString(html)` with no live server behind it is **not sufficient** — components
like `ds-icon`/`ds-brand-icon` do a real `fetch()` for their content during `componentWillRender`.
Without an actual HTTP server behind the `url` passed to `renderToString`, such calls fail with a
genuine (but irrelevant-to-this-test) network error. Confirmed: the same fixture renders with
**zero diagnostics** once pointed at the already-running Stencil dev server (`pnpm start`, port
4000) — which `packages/core/playwright.config.mts`'s `webServer` block already starts for the
existing `Visual`/`Component`/`A11Y` projects. `mountSsr()` must therefore run within the Playwright
suite (which already manages that server's lifecycle), passing a `url` based on the project's
`baseURL`, not as a standalone Vitest unit test.

## Implementation steps

### 1. Confirm the fetchSvg fix is the only pre-existing blocker

A sweep script (Node, using `@helvetia-design/core/hydrate` directly) renders all
`src/components/**/test/*.{visual,style}.html` fixtures (~79 files) against the live dev server,
before/after the `svg.ts` fix, to check for any other pre-existing SSR bugs before committing to a
hard gate. **Status: sweep in progress as of this plan being written — results pending.** Any
additional bug found gets the same small, targeted fix (same shape as the brand-icon one), not a
change to this plan.

### 2. Add `mountSsr()` to `@helvetia-design/playwright`

New file: `packages/playwright/src/lib/page/utils/mount-ssr.ts`, alongside `mount.ts`.

```ts
export type RenderToString = (html: string, options?: Record<string, unknown>) => Promise<{
  html: string | null
  diagnostics: { level: string; messageText: string }[]
}>

export const mountSsr = async (
  page: DsPage,
  content: string,
  renderToString: RenderToString,
  testInfo: TestInfo,
) => {
  const baseUrl = testInfo.project.use.baseURL
  if (!baseUrl) throw new Error('mountSsr unavailable: no dev server base URL provided')

  // Same wrapper template mount() already uses (<ds-root><main id="root">...).
  const wrapped = template(content)

  const result = await renderToString(wrapped, {
    fullDocument: true,
    url: `${baseUrl}/`,
    serializeShadowRoot: 'declarative-shadow-dom',
  })

  const errors = result.diagnostics.filter(d => d.level === 'error')
  if (errors.length) {
    throw new Error(`mountSsr: SSR render failed:\n${errors.map(e => e.messageText).join('\n\n')}`)
  }
  if (!result.html?.includes('shadowrootmode')) {
    throw new Error('mountSsr: no declarative shadow DOM found in SSR output — component did not render server-side')
  }

  const consoleErrors: string[] = []
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()) })
  page.on('pageerror', e => consoleErrors.push(e.message))

  // Same route-interception trick as mount(), serving the SSR'd HTML instead of the raw template.
  await page.route(baseUrl + '**', route => {
    const url = route.request().url()
    if (url === `${baseUrl}/` || url === `${baseUrl}/#` || url === baseUrl) {
      route.fulfill({ status: 200, contentType: 'text/html', body: result.html! })
    } else {
      route.continue()
    }
  })
  await page.goto(`${baseUrl}#`, { waitUntil: 'domcontentloaded' })
  await waitForChanges(page)

  if (consoleErrors.length) {
    throw new Error(`mountSsr: console errors during hydration:\n${consoleErrors.join('\n')}`)
  }
}
```

(Sketch — exact template/reuse from `mount.ts` to be finalized during implementation; the two
should share the `template()` helper rather than duplicate it.)

Export `mountSsr` from `packages/playwright/src/index.ts` alongside `mount`/`expect`/`test`.

### 3. Write one `*.ssr.play.ts` per existing component grouping

Mirrors today's `*.component.play.ts` groupings (46 files today — see "File coverage" below).
Each file:

```ts
import { DsBadge, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-badge>New</ds-badge>`, renderToString, testInfo)

    const dsBadge = new DsBadge(page.locator('ds-badge'))
    await dsBadge.assertToBeVisible()
    await dsBadge.assertToContainText('New')
  })
})
```

For composite families (card, select, tabs, modal, steps, segment, carousel, data), the markup
nests parent + representative children in that one call, per decision 6 above.

### 4. File coverage — verify before the hard gate lands

46 `*.component.play.ts` files exist today; not every one of the 75 component tags necessarily has
one. Before enabling the hard gate:

- Diff the full 75-tag list (from `dist/types/components.d.ts`'s `HTMLElementTagNameMap`) against
  every tag referenced across the new `*.ssr.play.ts` files.
- Any tag not covered gets added to the nearest sensible existing file (as a nested child, per
  decision 6) or a new minimal file if it has no natural home.
- Goal: 75/75 tags exercised, verified mechanically, not assumed from the file count.

### 5. Wire into `packages/core/playwright.config.mts`

```ts
{
  name: '🧬 SSR',
  testMatch: '**/*.ssr.play.ts',
  use: { ...devices['Desktop Chrome'] },
},
```

No new `webServer` entry — reuses the existing one (`http://localhost:4000`).

### 6. CI

**No changes needed.** Confirmed: the `playwright` job in `.github/workflows/continuous.yml` runs
`pnpm exec playwright test --shard=N/6` with no `--project` filter — Playwright automatically
distributes tests from every project (including the new `🧬 SSR` one) across the 6 shards.

## Verification

- `pnpm --filter @helvetia-design/core start` (dev server) + `pnpm --filter @helvetia-design/core exec playwright test --project="🧬 SSR"` locally, all files green.
- Existing `Visual`/`Component`/`A11Y` projects unaffected (no shared state, no snapshot changes).
- `pnpm build && pnpm test` (root) still green — confirms the `svg.ts` fix didn't regress anything
  client-side.
- Tag-coverage check (step 4) passes: 75/75.

## Open items

- Fixture sweep (step 1) still running — will confirm whether any component besides
  `ds-brand-icon`/`ds-icon` needs a similar fix before the hard gate can land clean.
- Exact shared-template refactor between `mount.ts` and `mount-ssr.ts` (avoid duplicating the HTML
  wrapper) to be finalized during implementation, not prescribed further here.
