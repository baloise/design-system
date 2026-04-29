import { isValueEmpty } from './is-value-empty'

export function requiredAnd(checkFactory: (value: any) => (component: any, prop: string) => void) {
  return (value: any) => {
    const checker = checkFactory(value)
    return (component: any, prop: string) => {
      const componentName = component.el.localName
      const propValue = component[prop]
      const message = `The prop \`${prop}\` of the \`${componentName}\` component is not defined.`

      if (isValueEmpty(propValue)) {
        throw new Error(message)
      } else {
        checker(component, prop)
      }
    }
  }
}
