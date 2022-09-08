interface ToggleScrollingBodyOptions {
  bodyEl: HTMLElement
  value: boolean
}

/**
 * Toggles the scrolling on the body element
 */
export const toggleScrollingBody = async (options: ToggleScrollingBodyOptions) => {
  if (options.value) {
    await blockScrollingBody(options.bodyEl)
  } else {
    await allowScrollingBody(options.bodyEl)
  }
}

/**
 * Blocks the scrolling on the body element
 */
export const blockScrollingBody = async (body: HTMLElement = document.body) => {
  body.style.position = 'fixed'
  body.style.width = '100%'
  body.style.overflowY = 'hidden'
}

/**
 * Allows the scrolling on the body element
 */
export const allowScrollingBody = async (body: HTMLElement = document.body) => {
  body.style.position = 'static'
  body.style.width = 'auto'
  body.style.overflowY = 'visible'
}
