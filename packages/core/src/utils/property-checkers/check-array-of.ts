import { PrimitiveType } from './property-types'

export function checkArrayOf(type: PrimitiveType) {
  return (component: any, prop: string) => {
    const componentName = component.el.localName
    const value = component[prop]

    const message = `The prop \`${prop}\` of the \`${componentName}\` component must be an \`${type}\` array. Received: ${JSON.stringify(value)}`

    if (!Array.isArray(value) || value.some(val => typeof val !== type)) {
      console.error(`${message}\n`, component.el)
    }
  }
}
