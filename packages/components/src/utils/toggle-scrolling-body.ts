interface ToggleScrollingBodyOptions {
  bodyEl: HTMLBodyElement
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
const blockScrollingBody = async (body: HTMLBodyElement) => {
  body.style.overflowY = 'hidden'
  body.style.height = '100vh'
}

/**
 * Allows the scrolling on the body element
 */
const allowScrollingBody = async (body: HTMLBodyElement) => {
  body.style.overflowY = 'visible'
  body.style.height = 'auto'
}
