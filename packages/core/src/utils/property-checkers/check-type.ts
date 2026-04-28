import { PropertyType } from './property-types'

export function checkType<T extends { el: HTMLElement }>(component: T, prop: keyof T, type: PropertyType) {
  const componentName = component.el.localName
  const value = component[prop]

  const typeIsArray = type === 'array'
  const valueIsArray = Array.isArray(value)

  const message = `The prop \`${String(prop)}\` of the \`${componentName}\` component must be of type \`${type}\`.`

  if (typeIsArray || valueIsArray) {
    if (valueIsArray !== typeIsArray) {
      console.error(`${message}\n`, component.el)
    }
  } else if (typeof value !== type) {
    console.error(`${message}\n`, component.el)
  }
}
