import { balBrowser } from './browser'

export const ScrollHandler = () => {
  let target: HTMLElement | Document | undefined
  let x = 0
  let y = 0
  let isDisabled = false

  function enable() {
    if (target) {
      if (balBrowser.hasWindow && balBrowser.hasDocument) {
        document.body.classList.remove('noscroll')
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        window.scrollTo(x, y)
        isDisabled = false
      }
    }
  }

  function disable() {
    if (target) {
      if (balBrowser.hasWindow && balBrowser.hasDocument) {
        x = window.pageXOffset || document.documentElement.scrollLeft
        y = window.pageYOffset || document.documentElement.scrollTop
        document.body.classList.add('noscroll')
        document.body.style.position = 'fixed'
        document.body.style.top = `-${y}px`
        document.body.style.width = `100%`
        isDisabled = true
      }
    }
  }

  return {
    connect: (el?: HTMLElement) => {
      if (el) {
        target = el
      } else {
        if (balBrowser.hasDocument) {
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
  if (balBrowser.hasDocument) {
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
  if (balBrowser.hasDocument) {
    const doc = document
    const body = getBody(doc)

    body.style.scrollBehavior = 'smooth'
    if (hasScrollSmoothOnHtml(doc)) {
      const html = getHtml(doc)
      html.style.scrollBehavior = 'smooth'
    }
  }
}
