import { isValueEmpty } from './is-value-empty'

export function requiredAnd<T extends { el: HTMLElement }, K extends keyof T, ExtraArgs extends unknown[]>(
  check: (component: T, prop: K, ...extraArgs: ExtraArgs) => void,
) {
  return (component: T, prop: K, ...extraArgs: ExtraArgs) => {
    const componentName = component.el.localName
    const value = component[prop]
    const message = `The prop \`${String(prop)}\` of the \`${componentName}\` component is not defined.`

    if (isValueEmpty(value)) {
      throw new Error(message)
    } else {
      check(component, prop, ...extraArgs)
    }
  }
}
