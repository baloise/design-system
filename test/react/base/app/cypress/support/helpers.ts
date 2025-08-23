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

export const wrapOptions = (options: any) => ({ log: false, ...options })

export function checkAriaLabel(element, label) {
  if (label === undefined || label === null || label === '') {
    return true
  }
  const ariaLabel = Cypress.$(element).attr('aria-label')
  const title = Cypress.$(element).attr('title')
  const text = Cypress.$(element).text().trim()
  return text === label.trim() || ariaLabel === label.trim() || title === label.trim()
}
