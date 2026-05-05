export function checkUrl() {
  return (component: any, prop: string) => {
    const componentName = component.el.localName
    const value = component[prop]

    const message = `The prop \`${prop}\` of the \`${componentName}\` component is invalid. Received: ${JSON.stringify(value)}`

    if (typeof value !== 'string' && !(value instanceof URL)) {
      console.error(`${message}\n`, component.el)
      return
    }

    try {
      new URL(value, 'https://www.post.ch')
    } catch {
      console.error(`${message}\n`, component.el)
    }
  }
}
