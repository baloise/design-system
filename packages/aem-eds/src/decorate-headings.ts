/**
 * Adds DS's `.heading` class (`packages/core/src/components/heading/heading.style.scss`)
 * to every author-placed h1–h6. Unlike `decorateButtons`, this has no upstream Adobe
 * equivalent — Adobe's own default styling targets bare `main h1`/`h2`/… selectors, no
 * class needed. DS's CSS-only heading mode specifically requires the class, so this is
 * purely a DS-adoption necessity, called from the project's own `scripts.js`.
 *
 * Scoped to direct children of the section wrapper div, not `main` as a whole, so it
 * never touches headings a block builds internally (e.g. the card block's own `<h3>`,
 * which intentionally does *not* carry `.heading` — see `card.ts`).
 */
export default function decorateHeadings(main: HTMLElement): void {
  main.querySelectorAll(':scope > div > :is(h1, h2, h3, h4, h5, h6)').forEach(heading => {
    heading.classList.add('heading')
  })
}
