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
 * `card` block — DS CSS-only primitive (`.card`, `packages/core/src/components/card`).
 * Universal Editor model: `blocks/card/_card.json` (`apps/integration-aem`).
 *
 * Authoring contract (row 0): image, title, subtitle, description, CTA label, CTA href.
 */
export default function decorate(block: HTMLElement): void {
  const row = block.children[0]
  const cells = row?.children
  const image = cells?.[0]?.querySelector('img')?.getAttribute('src') ?? ''
  const title = cells?.[1]?.textContent?.trim() ?? ''
  const subtitle = cells?.[2]?.textContent?.trim() ?? ''
  const description = cells?.[3]?.textContent?.trim() ?? ''
  const ctaLabel = cells?.[4]?.textContent?.trim() ?? ''
  const ctaHref = cells?.[5]?.querySelector('a')?.getAttribute('href') ?? cells?.[5]?.textContent?.trim() ?? ''

  const article = document.createElement('article')
  article.className = 'card'

  if (image) {
    const picture = document.createElement('picture')
    const img = document.createElement('img')
    img.src = image
    img.alt = ''
    picture.append(img)
    article.append(picture)
  }

  const content = document.createElement('div')
  content.className = 'card-content'

  const heading = document.createElement('h3')
  const titleSpan = document.createElement('span')
  titleSpan.className = 'title'
  titleSpan.textContent = title
  heading.append(titleSpan)
  if (subtitle) {
    const subtitleSpan = document.createElement('span')
    subtitleSpan.className = 'subtitle'
    subtitleSpan.textContent = subtitle
    heading.append(subtitleSpan)
  }
  content.append(heading)

  if (description) {
    const paragraph = document.createElement('p')
    paragraph.textContent = description
    content.append(paragraph)
  }
  article.append(content)

  if (ctaLabel) {
    const footer = document.createElement('footer')
    footer.className = 'card-actions'
    const cta = document.createElement('a')
    cta.className = 'button is-link is-flat'
    cta.textContent = ctaLabel
    if (ctaHref) cta.setAttribute('href', ctaHref)
    footer.append(cta)
    article.append(footer)
  }

  // The EDS block wrapper keeps the authored block-name class ("card") on the mount div
  // itself — the exact same class this block renders inside it — so it must come off,
  // otherwise the wrapper picks up DS's `.card` styling too, doubled on top of the real
  // element.
  block.classList.remove(block.dataset['blockName'] ?? '')
  if (row) moveInstrumentation(row, article)
  block.replaceChildren(article)
}
