declare const __zone_symbol__requestAnimationFrame: any
declare const requestAnimationFrame: any

export type Platforms = 'mobile' | 'tablet' | 'touch' | 'desktop' | 'highDefinition' | 'widescreen' | 'fullhd'

export const deepReady = async (el: any | undefined, full = false): Promise<void> => {
  const element = el as any
  if (element) {
    if (element.componentOnReady !== null && element.componentOnReady !== undefined) {
      const stencilEl = await element.componentOnReady()
      if (!full && stencilEl !== null && stencilEl !== undefined) {
        return
      }
    }
    await Promise.all(Array.from(element.children).map(child => deepReady(child, full)))
  }
}

export const rIC = (callback: () => void) => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    ;(window as any).requestIdleCallback(callback)
  } else {
    setTimeout(callback, 32)
  }
}

export const waitAfterFramePaint = () => {
  return new Promise(resolve => raf(() => runHighPrioritizedTask(resolve)))
}

export const waitAfterIdleCallback = () => {
  return new Promise(resolve => rIC(() => runHighPrioritizedTask(resolve)))
}

export const raf = (h: any) => {
  if (typeof __zone_symbol__requestAnimationFrame === 'function') {
    return __zone_symbol__requestAnimationFrame(h)
  }
  if (typeof requestAnimationFrame === 'function') {
    return requestAnimationFrame(h)
  }
  return setTimeout(h)
}

export const runHighPrioritizedTask = (callback: (value: unknown) => void) => {
  if (typeof window !== 'undefined' && 'MessageChannel' in window) {
    const messageChannel = new (window as any).MessageChannel()
    messageChannel.port1.onmessage = callback
    messageChannel.port2.postMessage(undefined)
  } else {
    setTimeout(callback, 32)
  }
}

/**
 * Helper fn to identify the element/component
 */
export type isElementType = (el: Cypress.Chainable<JQuery>) => boolean

export const isElement = (el: Cypress.Chainable<JQuery>, name: string) => {
  return typeof el === 'object' && (el as any).length > 0 && (el as any)[0].nodeName === name
}

export const hasClass = (el: Cypress.Chainable<JQuery>, name: string) => {
  return typeof el === 'object' && (el as any).length > 0 && (el as unknown as JQuery).hasClass(name)
}

export const hasTestId = (el: Cypress.Chainable<JQuery>, testId: string) => {
  if (typeof el === 'object' && (el as any).length > 0) {
    const dataTestId = (el as unknown as JQuery).data('testid')
    return dataTestId === testId
  }
  return false
}

export const isLabel: isElementType = el => isElement(el, 'LABEL')
export const isAccordion: isElementType = el => isElement(el, 'BAL-ACCORDION')
export const isButton: isElementType = el => isElement(el, 'BAL-BUTTON')
export const isCheckbox: isElementType = el => isElement(el, 'BAL-CHECKBOX')
export const isDatepicker: isElementType = el => isElement(el, 'BAL-DATEPICKER')
export const isNumberInput: isElementType = el => isElement(el, 'BAL-NUMBER-INPUT')
export const isModal: isElementType = el => isElement(el, 'BAL-MODAL')
export const isRadioGroup: isElementType = el => isElement(el, 'BAL-RADIO-GROUP')
export const isRadio: isElementType = el => isElement(el, 'BAL-RADIO')
export const isSelect: isElementType = el => isElement(el, 'BAL-SELECT')
export const isTag: isElementType = el => isElement(el, 'BAL-TAG')
export const isTabs: isElementType = el => isElement(el, 'BAL-TABS')
export const isSteps: isElementType = el => isElement(el, 'BAL-STEPS')
export const isSlider: isElementType = el => isElement(el, 'BAL-INPUT-SLIDER')
export const isHint: isElementType = el => isElement(el, 'BAL-HINT')
export const isTextarea: isElementType = el => isElement(el, 'BAL-TEXTAREA')
export const isCardTitle: isElementType = el => isElement(el, 'BAL-CARD-TITLE')
export const isHeading: isElementType = el => isElement(el, 'BAL-HEADING')
export const isText: isElementType = el => isElement(el, 'BAL-TEXT')
export const isInputStepper: isElementType = el => isElement(el, 'BAL-INPUT-STEPPER')
export const isInput: isElementType = el => isElement(el, 'BAL-INPUT')
export const isInputDate: isElementType = el => isElement(el, 'BAL-INPUT-DATE')

/**
 * Executes a command on a child element and wraps back to the main element/component
 */
export const wrapOptions = (options: any) => ({ log: false, ...options })

export const wrapCommand = (
  displayName: string,
  element: Cypress.Chainable<JQuery>,
  message: any,
  fn: ($el: any) => Cypress.Chainable<JQuery> | void,
) => {
  return (selector: string) => {
    return cy
      .wrapComponent(element as any, { log: false })
      .waitForComponents()
      .find(selector, { log: false })
      .then($el => {
        Cypress.log({
          type: 'parent',
          $el,
          displayName,
          message,
        })
        return fn($el)
      })
      .wrapComponent(element as any, { log: false })
  }
}

export const shouldLog = (options?: Partial<Cypress.Loggable>) => options === undefined || options.log !== false
export const log = (displayName: string, message: any = '', $el: any, options?: Partial<Cypress.Loggable>) => {
  if (shouldLog(options)) {
    Cypress.log({
      type: 'parent',
      $el: $el as any,
      displayName,
      message,
    })
  }
}

export const areComponentsReady = ($el: any) => {
  const queue = []
  for (let index = 0; index < $el.length; index++) {
    const element = $el[index]
    queue.push(deepReady(element, true))
  }
  return Promise.all(queue)
}

export const testOnPlatforms = (platforms: Platforms[], fn: (platform: Platforms) => Promise<void> | void) => {
  for (let index = 0; index < platforms.length; index++) {
    const platform = platforms[index]

    context(`on ${platform}`, () => {
      beforeEach(() => cy.platform(platform))
      fn(platform)
    })
  }
}

export function checkAriaLabel(element, label) {
  if (label === undefined || label === null || label === '') {
    return true
  }
  const ariaLabel = Cypress.$(element).attr('aria-label')
  const title = Cypress.$(element).attr('title')
  const text = Cypress.$(element).text().trim()
  return text === label.trim() || ariaLabel === label.trim() || title === label.trim()
}
