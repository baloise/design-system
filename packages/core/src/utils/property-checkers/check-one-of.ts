export function checkOneOf(possibleValues: readonly unknown[]) {
  return (component: any, prop: string) => {
    const componentName = component.el.localName
    const value = component[prop]

    const message = `The prop \`${prop}\` of the \`${componentName}\` component must be one of the following values: ${possibleValues.join(', ')}. Received: ${JSON.stringify(value)}`

    if (!possibleValues.includes(value)) {
      console.error(`${message}\n`, component.el)
    }
  }
}
