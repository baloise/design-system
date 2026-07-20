import { HTMLStencilElement } from '@stencil/core/internal'

export type Attributes = { [key: string]: any }

/**
 * Elements inside of web components sometimes need to inherit global attributes
 * set on the host. For example, the inner input in `ds-input` should inherit
 * the `title` attribute that developers set directly on `ds-input`. This
 * helper function should be called in componentWillLoad and assigned to a variable
 * that is later used in the render function.
 * This function also removes the attribute from the parent when its set on child.
 *
 * This does not need to be reactive as changing attributes on the host element
 * does not trigger a re-render.
 */
export const inheritAttributes = (el: HTMLElement | HTMLStencilElement, attributes: string[] = []) => {
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
