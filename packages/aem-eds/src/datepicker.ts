/**
 * Carries Universal Editor's `data-aue-*`/`data-richtext-*` instrumentation attributes
 * from an authored element onto whatever new DOM replaces it, so in-context editing
 * still targets the right element after decoration. Ported from
 * `adobe-rnd/aem-boilerplate-xwalk`'s `scripts/scripts.js` — this app has no live UE
 * content source (see CONTEXT.md), so it's a no-op locally, but is what a real
 * UE-backed project needs here.
 */
function moveInstrumentation(from: Element, to: Element): void {
  for (const { nodeName } of Array.from(from.attributes)) {
    if (nodeName.startsWith('data-aue-') || nodeName.startsWith('data-richtext-')) {
      const value = from.getAttribute(nodeName)
      if (value !== null) to.setAttribute(nodeName, value)
    }
  }
}

/**
 * `datepicker` block — the one block backed by a real DS Shadow DOM custom element,
 * `<ds-date>` (`packages/core/src/components/date`). `ds-core`'s lazy-loader script must
 * already be loaded globally on the page for this element to register. Universal Editor
 * model: `blocks/datepicker/_datepicker.json` (`apps/integration-aem`).
 *
 * Authoring contract (row 0): label, name (optional), required (optional, `"true"`/`"false"`).
 *
 * `ds-date` emits `dsChange` (not a native `change`/`input` event). Any AEM/EDS runtime
 * listening for native DOM events needs the bridge below — the same adapter pattern
 * documented in `AEM-with-DS.md`'s Adaptive Forms `ds-date` section.
 */
export default function decorate(block: HTMLElement): void {
  const row = block.children[0]
  const cells = row?.children
  const label = cells?.[0]?.textContent?.trim() ?? ''
  const name = cells?.[1]?.textContent?.trim() ?? ''
  const required = (cells?.[2]?.textContent?.trim() ?? '').toLowerCase() === 'true'

  const dsDate = document.createElement('ds-date')
  if (label) dsDate.setAttribute('label', label)
  if (name) dsDate.setAttribute('name', name)
  if (required) dsDate.setAttribute('required', '')

  dsDate.addEventListener('dsChange', () => {
    dsDate.dispatchEvent(new Event('change', { bubbles: true }))
  })

  if (row) moveInstrumentation(row, dsDate)
  block.replaceChildren(dsDate)
}
