import DOMPurify from 'dompurify'

export const sanitizeSvg = (svg: string) => {
  return DOMPurify.sanitize(svg, {
    USE_PROFILES: { svg: true },
    FORBID_ATTR: ['height', 'width'],
  })
}

const svgCache = new Map<string, Promise<string>>()

export const clearSvgCache = () => svgCache.clear()

export const fetchSvg = (url: string): Promise<string> => {
  if (!svgCache.has(url)) {
    // Resolve against the document's base URL: browsers already do this for relative fetches,
    // but Node's fetch (used during SSR) has no notion of a "current page" and throws on a bare
    // path like "/assets/icon.svg".
    const resolvedUrl = new URL(url, document.baseURI).href
    svgCache.set(
      url,
      fetch(resolvedUrl)
        .then(r => {
          if (!r.ok) throw new Error(`ds-icon: failed to fetch SVG "${url}" (${r.status})`)
          return r.text()
        })
        .then(text => sanitizeSvg(text))
        .catch(err => {
          console.error(err)
          svgCache.delete(url)
          return ''
        }),
    )
  }
  return svgCache.get(url)!
}
