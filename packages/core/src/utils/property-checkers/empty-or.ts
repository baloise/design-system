import { isValueEmpty } from './is-value-empty'

export function emptyOr(checkFactory: (value: any) => (component: any, prop: string) => void) {
  return (value: any) => {
    const checker = checkFactory(value)
    return (component: any, prop: string) => {
      const propValue = component[prop]
      if (!isValueEmpty(propValue)) {
        checker(component, prop)
      }
    }
  }
}
