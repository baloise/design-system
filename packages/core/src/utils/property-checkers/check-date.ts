export function checkDate() {
  return (component: any, prop: string) => {
    const componentName = component.el.localName
    const value = component[prop]

    const message = `The prop \`${prop}\` of the \`${componentName}\` component must be a valid date. Received: ${JSON.stringify(value)}`

    if (typeof value !== 'string') {
      console.error(`${message}\n`, component.el)
      return
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
      console.error(`${message}\n`, component.el)
    }
  }
}
