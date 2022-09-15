const getBodyTopOffset = () => {
  const doc = document.documentElement
  return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
}

export const BodyScrollBlocker = () => {
  const body = document.body
  const html = document.firstChild?.nextSibling as HTMLElement
  const htmlStyle = getComputedStyle(html)
  const hasScrollSmoothOnHtml = htmlStyle.scrollBehavior === 'smooth'

  let isBlocked = false
  let bodyTopOffset = getBodyTopOffset()

  return {
    isBlocked: () => isBlocked,
    block: () => {
      isBlocked = true
      bodyTopOffset = getBodyTopOffset()
      body.style.scrollBehavior = 'auto'
      if (hasScrollSmoothOnHtml) {
        html.style.scrollBehavior = 'auto'
      }
      body.style.position = 'fixed'
      body.style.width = '100%'
      body.style.top = `-${bodyTopOffset}px`
    },
    allow: () => {
      body.style.position = 'static'
      body.style.width = 'inherit'
      body.style.top = `inherit`
      document.documentElement.scrollTop = bodyTopOffset
      setTimeout(() => {
        isBlocked = false
        body.style.scrollBehavior = 'smooth'
        if (hasScrollSmoothOnHtml) {
          html.style.scrollBehavior = 'smooth'
        }
      }, 0)
    },
  }
}
