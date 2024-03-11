export type Attributes = { [key: string]: any }

const trackingAttributes = ['data-tracking-style', 'data-tracking-topic', 'data-tracking-context', 'data-tracking-id']

/**
 * Elements inside of web components sometimes need to inherit global attributes
 * set on the host. For example, the inner input in `bal-input` should inherit
 * the `title` attribute that developers set directly on `bal-input`. This
 * helper function should be called in componentWillLoad and assigned to a variable
 * that is later used in the render function.
 *
 * This does not need to be reactive as changing attributes on the host element
 * does not trigger a re-render.
 */
export const inheritAttributes = (el: HTMLElement, attributes: string[] = []) => {
  const attributeObject: Attributes = {}

  attributes.forEach(attr => {
    if (el.hasAttribute(attr)) {
      const value = el.getAttribute(attr)
      if (value !== null) {
        attributeObject[attr] = el.getAttribute(attr)
      }
      el.removeAttribute(attr)
    }
  })

  return attributeObject
}

/**
 * Returns an array of tracking attributes that should be copied from
 * the host element to a target within the component.
 * @param el The element that the attributes should be copied from.
 * @param ignoreList The list of aria-attributes to ignore reflecting and removing from the host.
 * Use this in instances where we manually specify aria attributes on the `<Host>` element.
 */
export const inheritTrackingAttributes = (el: HTMLElement, ignoreList?: string[]) => {
  let attributesToInherit = trackingAttributes
  if (ignoreList && ignoreList.length > 0) {
    attributesToInherit = attributesToInherit.filter(attr => !ignoreList.includes(attr))
  }
  return inheritAttributes(el, attributesToInherit)
}
