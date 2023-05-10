export interface Padding {
  top: number
  right: number
  bottom: number
  left: number
}

export const getPadding = (element: HTMLElement, defaultPadding = 16): Padding => {
  if (typeof (window as any) === 'undefined' || element === undefined) {
    return { top: defaultPadding, right: defaultPadding, bottom: defaultPadding, left: defaultPadding }
  }

  const computedStyle = window.getComputedStyle(element)
  const convert = (value: string) => parseInt(value.slice(0, -2), 10)

  const top = convert(computedStyle.getPropertyValue('padding-top'))
  const right = convert(computedStyle.getPropertyValue('padding-right'))
  const bottom = convert(computedStyle.getPropertyValue('padding-bottom'))
  const left = convert(computedStyle.getPropertyValue('padding-left'))

  return { top, right, bottom, left }
}
