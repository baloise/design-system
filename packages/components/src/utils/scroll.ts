import { isDocumentDefined, isWindowDefined } from './browser'

export const ScrollHandler = () => {
  let target: HTMLElement | Document | undefined
  let x = 0
  let y = 0
  let isDisabled = false

  function enable() {
    if (target) {
      if (isWindowDefined() && isDocumentDefined()) {
        document.body.classList.remove('noscroll')
        document.body.style.position = ''
        document.body.style.top = ''
        window.scrollTo(x, y)
        isDisabled = false
      }
    }
  }

  function disable() {
    if (target) {
      if (isWindowDefined() && isDocumentDefined()) {
        x = window.pageXOffset || document.documentElement.scrollLeft
        y = window.pageYOffset || document.documentElement.scrollTop
        document.body.classList.add('noscroll')
        document.body.style.position = 'fixed'
        document.body.style.top = `-${y}px`
        isDisabled = true
      }
    }
  }

  return {
    connect: (el?: HTMLElement) => {
      if (el) {
        target = el
      } else {
        if (isDocumentDefined()) {
          target = document
        }
      }
      onscroll = null
      onkeydown = null
    },
    disconnect: () => {
      enable()
      target = undefined
      onscroll = null
      onkeydown = null
    },
    isDisabled: () => isDisabled,
    disable: () => disable(),
    enable: () => enable(),
  }
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
