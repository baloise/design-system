const bemReturn = (selector: string) => ({
  class: (condition = true) => ({ [selector]: condition }),
  element: bemElement(selector),
  modifier: bemModifier(selector),
})

const bemElement = (selector: string) => (name: string) => bemReturn(`${selector}__${name}`)

const bemModifier = (selector: string) => (name: string) => bemReturn(`${selector}--${name}`)

export const BEM = { block: (name: string) => bemReturn(`bal-${name}`) }
