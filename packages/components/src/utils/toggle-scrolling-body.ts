interface ToggleScrollingBodyOptions {
  bodyEl: HTMLBodyElement
  value: boolean
  height: number
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
const blockScrollingBody = async (body: HTMLBodyElement, height: number) => {
  body.style.overflowY = 'hidden'
  body.style.height = `${height}rem`
}

/**
 * Allows the scrolling on the body element
 */
const allowScrollingBody = async (body: HTMLBodyElement) => {
  body.style.overflowY = 'visible'
  body.style.height = 'auto'
}
