export function checkPattern<T extends { el: HTMLElement }>(component: T, prop: keyof T, pattern: RegExp) {
  const componentName = component.el.localName
  const value = component[prop]

  const message = `The prop \`${String(
    prop,
  )}\` of the \`${componentName}\` component must follow the format \`${pattern}\`.`

  if (typeof value !== 'string' || !pattern.test(value)) {
    console.error(`${message}\n`, component.el)
  }
}
