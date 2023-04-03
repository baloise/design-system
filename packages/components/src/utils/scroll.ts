import { isDocumentDefined, isWindowDefined } from './browser'

// PREVENT DEFAULT HANDLER
function preventDefault(event: Event) {
  event = event || window.event
  if (event.preventDefault) {
    event.preventDefault()
  }
}

// PREVENT MOUSE WHEEL
function wheel(event: Event) {
  event.preventDefault()
  event.stopPropagation()
  return false
}

// PREVENT SCROLL KEYS
function keydown(event: KeyboardEvent) {
  const keys = [
    'Space',
    'PageUp',
    'PageDown',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'Left',
    'Right',
    'Up',
    'Down',
  ]
  for (let i = keys.length; i--; ) {
    if (event.code === keys[i]) {
      preventDefault(event)
      return
    }
  }
}

export const ScrollHandler = () => {
  let target: HTMLElement | Document | undefined
  let x = 0
  let y = 0
  let onscroll: any = null
  let onkeydown: any = null
  let isDisabled = false

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
      target = undefined
      onscroll = null
      onkeydown = null
    },
    isDisabled: () => isDisabled,
    disable: () => {
      if (target) {
        target.addEventListener('wheel', wheel, { passive: false })
        target.addEventListener('mousewheel', wheel, { passive: false })
        target.addEventListener('DOMMouseScroll', wheel, { passive: false })

        onkeydown = target.onkeydown
        target.onkeydown = keydown

        if (isWindowDefined() && isDocumentDefined()) {
          x = window.pageXOffset || document.documentElement.scrollLeft
          y = window.pageYOffset || document.documentElement.scrollTop
          onscroll = window.onscroll
          window.onscroll = () => window.scrollTo(x, y)
        }

        target.addEventListener('touchmove', preventDefault, { passive: false })
        isDisabled = true
      }
    },
    enable: () => {
      if (target) {
        target.removeEventListener('wheel', wheel, { capture: false })
        target.removeEventListener('mousewheel', wheel, { capture: false })
        target.removeEventListener('DOMMouseScroll', wheel, { capture: false })
        target.onkeydown = onkeydown

        if (isWindowDefined() && isDocumentDefined()) {
          x = window.pageXOffset || document.documentElement.scrollLeft
          y = window.pageYOffset || document.documentElement.scrollTop
          window.onscroll = onscroll
        }

        target.removeEventListener('touchmove', preventDefault, { capture: false })
        isDisabled = false
      }
    },
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
