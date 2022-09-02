interface ToggleScrollingBodyOptions {
  bodyEl: HTMLBodyElement
  value: boolean
  height?: number
  mobile?: boolean
}

/**
 * Toggles the scrolling on the body element
 */
export const toggleScrollingBody = async (options: ToggleScrollingBodyOptions) => {
  if (options.value) {
    await blockScrollingBody(options.bodyEl, options.height, options.mobile)
  } else {
    await allowScrollingBody(options.bodyEl)
  }
}

/**
 * Blocks the scrolling on the body element
 */
const blockScrollingBody = async (body: HTMLBodyElement, height?: number, mobile?: boolean) => {
  body.style.overflowY = 'hidden'
  body.style.height = mobile ? '100vh' : `${height}rem`
}

/**
 * Allows the scrolling on the body element
 */
const allowScrollingBody = async (body: HTMLBodyElement) => {
  body.style.overflowY = 'visible'
  body.style.height = 'auto'
}
