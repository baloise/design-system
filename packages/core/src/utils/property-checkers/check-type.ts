import { PropertyType } from './property-types'

export function checkType(type: PropertyType) {
  return (component: any, prop: string) => {
    const componentName = component.el.localName
    const value = component[prop]

    const typeIsArray = type === 'array'
    const valueIsArray = Array.isArray(value)

    const message = `The prop \`${prop}\` of the \`${componentName}\` component must be of type \`${type}\`. Received: ${JSON.stringify(value)} (${typeof value})`

    if (typeIsArray || valueIsArray) {
      if (valueIsArray !== typeIsArray) {
        console.error(`${message}\n`, component.el)
      }
    } else if (typeof value !== type) {
      console.error(`${message}\n`, component.el)
    }
  }
}
