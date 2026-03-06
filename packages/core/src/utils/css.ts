export type CssClassMap = { [className: string]: boolean }

export const getClassMap = (classes: string | string[] | undefined): CssClassMap => {
  const map: CssClassMap = {}
  getClassList(classes).forEach(c => (map[c] = true))
  return map
}

export const getClassList = (classes: string | (string | null | undefined)[] | undefined): string[] => {
  if (classes !== undefined) {
    const array = Array.isArray(classes) ? classes : classes.split(' ')
    return array
      .filter(c => c != null)
      .map(c => (c as string).trim())
      .filter(c => c !== '')
  }
  return []
}

export const cssVariables = (el: HTMLElement) => ({
  value: (variableName: string, fallbackValue: string) => getCssVariable(el, variableName, fallbackValue),
  pixel: (variableName: string, fallbackValue: number) => getCssVariableAsPixel(el, variableName, fallbackValue),
})

const getCssVariable = (el: HTMLElement, variableName: string, fallbackValue: string): string => {
  try {
    const cssVar = el ? getComputedStyle(el).getPropertyValue(variableName).trim() : ''
    if (cssVar) {
      return cssVar
    }
  } catch {
    // Non-fatal; if we can't create it, we'll just skip PID tracking
  }

  return fallbackValue
}

const getCssVariableAsPixel = (el: HTMLElement, variableName: string, fallbackValue: number): number => {
  const value = getCssVariable(el, variableName, `${fallbackValue}px`)
  if (value.endsWith('px')) {
    return parseInt(value.replace('px', ''), 10)
  }
  return parseInt(value, 10)
}
