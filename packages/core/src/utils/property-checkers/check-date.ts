export function checkDate<T extends { el: HTMLElement }>(component: T, prop: keyof T) {
  const componentName = component.el.localName
  const value = component[prop]

  const message = `The prop \`${String(prop)}\` of the \`${componentName}\` component must be a valid date.`

  if (typeof value !== 'string') {
    console.error(`${message}\n`, component.el)
    return
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    console.error(`${message}\n`, component.el)
  }
}
