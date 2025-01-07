export interface Padding {
  top: number
  right: number
  bottom: number
  left: number
}

const convert = (value: string) => parseInt(value.slice(0, -2), 10)

export const getComputedPadding = (element: HTMLElement, defaultPadding = 16): Padding => {
  if (typeof (window as any) === 'undefined' || element === undefined) {
    return { top: defaultPadding, right: defaultPadding, bottom: defaultPadding, left: defaultPadding }
  }

  const computedStyle = window.getComputedStyle(element)

  const top = convert(computedStyle.getPropertyValue('padding-top'))
  const right = convert(computedStyle.getPropertyValue('padding-right'))
  const bottom = convert(computedStyle.getPropertyValue('padding-bottom'))
  const left = convert(computedStyle.getPropertyValue('padding-left'))

  return { top, right, bottom, left }
}

export const getComputedWidth = (element: HTMLElement): number => {
  if (typeof (window as any) === 'undefined') {
    return element.clientWidth
  }

  const computedStyle = window.getComputedStyle(element)
  const width = convert(computedStyle.getPropertyValue('width'))
  // use css box-sizing border-box otherwise calc the padding on top
  return width
}

export const getWidthOfOverflowingChildren = (element: HTMLElement) => {
  const children = Array.from(element.children) as HTMLElement[]
  let maxWidth = 0

  for (const child of children) {
    const childWidth = child.offsetLeft + child.offsetWidth
    maxWidth = Math.max(maxWidth, childWidth)
  }

  return maxWidth
}
