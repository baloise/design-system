import DOMPurify from 'dompurify'

export const sanitizeSvg = (svg: string) => {
  return DOMPurify.sanitize(svg, {
    USE_PROFILES: { svg: true },
    FORBID_ATTR: ['height', 'width'],
  })
}
