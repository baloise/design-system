export function checkPattern(pattern: RegExp) {
  return (component: any, prop: string) => {
    const componentName = component.el.localName
    const value = component[prop]

    const message = `The prop \`${prop}\` of the \`${componentName}\` component must follow the format \`${pattern}\`. Received: ${JSON.stringify(value)}`

    if (typeof value !== 'string' || !pattern.test(value)) {
      console.error(`${message}\n`, component.el)
    }
  }
}
