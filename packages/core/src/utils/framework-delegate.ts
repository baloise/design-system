import { componentOnReady } from './helpers'

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type ComponentRef = Function | HTMLElement | string | null

export interface FrameworkDelegate {
  attachViewToDom(container: any, component: any, propsOrDataObj?: any, cssClasses?: string[]): Promise<HTMLElement>
  removeViewFromDom(container: any, component: any): Promise<void>
}

/**
 * Mounts `component` into `container`, via `delegate` when provided.
 *
 * `ds-modal` is shadow DOM, so `container` must be a light-DOM element (the modal host
 * itself) and the no-delegate fallback slots its element into the `body` slot — direct
 * appends elsewhere wouldn't be distributed by shadow-DOM slot projection.
 */
export const attachComponent = async (
  delegate: FrameworkDelegate | undefined,
  container: Element,
  component: ComponentRef,
  cssClasses?: string[],
  componentProps?: { [key: string]: any },
): Promise<HTMLElement> => {
  if (delegate) {
    return delegate.attachViewToDom(container, component, componentProps, cssClasses)
  }
  if (typeof component !== 'string' && !(component instanceof HTMLElement)) {
    throw new Error('framework delegate is missing')
  }

  const el: any =
    typeof component === 'string'
      ? container.ownerDocument && container.ownerDocument.createElement(component)
      : component

  if (cssClasses) {
    cssClasses.forEach(c => el.classList.add(c))
  }
  if (componentProps) {
    Object.assign(el, componentProps)
  }

  el.slot = 'body'
  container.appendChild(el)
  await new Promise(resolve => componentOnReady(el, resolve))

  return el
}

export const detachComponent = (
  delegate: FrameworkDelegate | undefined,
  element: HTMLElement | undefined,
): Promise<void> => {
  if (element) {
    if (delegate) {
      const container = element.parentElement
      return delegate.removeViewFromDom(container, element)
    }
    element.remove()
  }
  return Promise.resolve()
}
