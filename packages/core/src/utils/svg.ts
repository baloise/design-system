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
    svgCache.set(
      url,
      fetch(url)
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
