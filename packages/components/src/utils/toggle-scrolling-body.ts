interface ToggleScrollingBodyOptions {
  bodyEl: HTMLElement
  value: boolean
  height?: string
}

/**
 * Toggles the scrolling on the body element
 */
export const toggleScrollingBody = async (options: ToggleScrollingBodyOptions) => {
  if (options.value) {
    await blockScrollingBody(options.bodyEl, options.height)
  } else {
    await allowScrollingBody(options.bodyEl)
  }
}

/**
 * Blocks the scrolling on the body element
 */
export const blockScrollingBody = async (body: HTMLElement = document.body, height?: string) => {
  body.style.position = 'fixed'
  body.style.width = '100%'
  body.style.overflowY = 'hidden'
  if (height) {
    body.style.height = height
  }
}

/**
 * Allows the scrolling on the body element
 */
export const allowScrollingBody = async (body: HTMLElement = document.body) => {
  body.style.overflowY = 'visible'
  body.style.height = 'auto'
  body.style.position = 'static'
  body.style.width = 'auto'
}
