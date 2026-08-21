/**
 * Decorates formatted links as DS buttons. This is Adobe's own `decorateButtons()`
 * contract (identical in both `adobe/aem-boilerplate` and the Universal-Editor-ready
 * `adobe-rnd/aem-boilerplate-xwalk` — same client code runs for both authoring paths):
 * a link alone in a paragraph becomes a button; wrapping it in <strong>/<em> sets the
 * variant. Document-based authoring produces that wrapping directly from bold/italic
 * link text; Universal Editor's Button component (models/_button.json, `linkType`
 * field) produces the identical wrapping from its own backend template — either way,
 * this is the one function that has to run for buttons to render at all.
 *
 * Adobe's own convention emits bare `primary`/`secondary`/`accent` classes, not DS's
 * `is-primary`/`is-secondary` (`packages/core/src/components/button/button.style.scss`)
 * — this is the actual DS-adoption mapping any EDS project using this design system
 * needs, called from the project's own `scripts.js`. DS has no direct "accent"
 * (high-impact, bold+italic) equivalent, so it falls back to `is-primary`.
 */
export default function decorateButtons(main: HTMLElement): void {
  const dsVariant = { primary: 'is-primary', secondary: 'is-secondary', accent: 'is-primary' }

  main.querySelectorAll('p a[href]').forEach(a => {
    const p = a.closest('p')
    const text = a.textContent?.trim() ?? ''
    if (!p || a.querySelector('img') || p.textContent?.trim() !== text) return

    const strong = a.closest('strong')
    const em = a.closest('em')
    if (!strong && !em) return

    p.className = 'button-wrapper'
    a.className = 'button'
    if (strong && em) {
      a.classList.add(dsVariant.accent)
      const outer = strong.contains(em) ? strong : em
      outer.replaceWith(a)
    } else if (strong) {
      a.classList.add(dsVariant.primary)
      strong.replaceWith(a)
    } else {
      a.classList.add(dsVariant.secondary)
      em?.replaceWith(a)
    }
  })
}
