import { isDocumentDefined, isWindowDefined } from './browser'

const getBodyTopOffset = (win: Window, doc: Document) => {
  return (win.scrollY || doc.documentElement.scrollTop) - (doc.documentElement.clientTop || 0)
}

const getBody = (doc: Document) => doc.body
const getHtml = (doc: Document) => doc.firstChild?.nextSibling as HTMLElement

const getHtmlStyles = (doc: Document) => getComputedStyle(getHtml(doc))

const hasScrollSmoothOnHtml = (doc: Document) => getHtmlStyles(doc).scrollBehavior === 'smooth'

export const disableSmoothScrolling = () => {
  if (isDocumentDefined()) {
    const doc = document
    const body = getBody(doc)

    body.style.scrollBehavior = 'auto'
    if (hasScrollSmoothOnHtml(doc)) {
      const html = getHtml(doc)
      html.style.scrollBehavior = 'auto'
    }
  }
}

export const enableSmoothScrolling = () => {
  if (isDocumentDefined()) {
    const doc = document
    const body = getBody(doc)

    body.style.scrollBehavior = 'smooth'
    if (hasScrollSmoothOnHtml(doc)) {
      const html = getHtml(doc)
      html.style.scrollBehavior = 'smooth'
    }
  }
}

export const BodyScrollBlocker = () => {
  if (!isWindowDefined() || !isDocumentDefined()) {
    return {
      isBlocked: () => false,
      block: () => void 0,
      allow: () => void 0,
    }
  }

  const doc = document
  const win = window

  const body = getBody(doc)
  const html = getHtml(doc)
  let timer: NodeJS.Timer | undefined = undefined

  let isBlocked = false
  let bodyTopOffset = getBodyTopOffset(win, doc)

  return {
    isBlocked: () => isBlocked,
    block: () => {
      clearTimeout(timer)
      isBlocked = true
      bodyTopOffset = getBodyTopOffset(win, doc)
      body.style.scrollBehavior = 'auto'
      if (hasScrollSmoothOnHtml(doc)) {
        html.style.scrollBehavior = 'auto'
      }
      body.style.position = 'fixed'
      body.style.width = '100%'
      body.style.top = `-${bodyTopOffset}px`
    },
    allow: () => {
      clearTimeout(timer)
      body.style.position = 'static'
      body.style.width = 'inherit'
      body.style.top = `inherit`
      doc.documentElement.scrollTop = bodyTopOffset
      timer = setTimeout(() => {
        isBlocked = false
        body.style.scrollBehavior = 'smooth'
        if (hasScrollSmoothOnHtml(doc)) {
          html.style.scrollBehavior = 'smooth'
        }
      }, 0)
    },
  }
}
