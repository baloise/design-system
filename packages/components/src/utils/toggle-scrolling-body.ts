const getBodyTopOffset = () => {
  const doc = document.documentElement
  return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
}

const getBody = () => document.body
const getHtml = () => document.firstChild?.nextSibling as HTMLElement

const getHtmlStyles = () => getComputedStyle(getHtml())

const hasScrollSmoothOnHtml = () => getHtmlStyles().scrollBehavior === 'smooth'

export const disableSmoothScrolling = () => {
  const body = getBody()

  body.style.scrollBehavior = 'auto'
  if (hasScrollSmoothOnHtml()) {
    const html = getHtml()
    html.style.scrollBehavior = 'auto'
  }
}

export const enableSmoothScrolling = () => {
  const body = getBody()

  body.style.scrollBehavior = 'smooth'
  if (hasScrollSmoothOnHtml()) {
    const html = getHtml()
    html.style.scrollBehavior = 'smooth'
  }
}

export const BodyScrollBlocker = () => {
  const body = getBody()
  const html = getHtml()
  let timer: NodeJS.Timer | undefined = undefined

  let isBlocked = false
  let bodyTopOffset = getBodyTopOffset()

  return {
    isBlocked: () => isBlocked,
    block: () => {
      clearTimeout(timer)
      isBlocked = true
      bodyTopOffset = getBodyTopOffset()
      body.style.scrollBehavior = 'auto'
      if (hasScrollSmoothOnHtml()) {
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
      document.documentElement.scrollTop = bodyTopOffset
      timer = setTimeout(() => {
        isBlocked = false
        body.style.scrollBehavior = 'smooth'
        if (hasScrollSmoothOnHtml()) {
          html.style.scrollBehavior = 'smooth'
        }
      }, 0)
    },
  }
}
