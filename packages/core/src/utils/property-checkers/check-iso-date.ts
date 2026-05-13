import { isIsoDate } from './is-iso-date'

export function checkIsoDate() {
  return (component: any, prop: string) => {
    const value = component[prop]
    if (!value) return

    if (!isIsoDate(String(value))) {
      console.error(
        `The prop \`${prop}\` of the \`${component.el.localName}\` component must be in ISO format (YYYY-MM-DD). Received: ${JSON.stringify(value)}\n`,
        component.el,
      )
    }
  }
}
