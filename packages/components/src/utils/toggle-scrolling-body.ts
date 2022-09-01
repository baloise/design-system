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
  //body.style.position = 'fixed'
  //body.style.width = '100%'
  body.style.overflowY = 'hidden'
}

/**
 * Allows the scrolling on the body element
 */
const allowScrollingBody = async (body: HTMLBodyElement) => {
  //body.style.position = 'static'
  //body.style.width = 'auto'
  body.style.overflowY = 'visible'
}
