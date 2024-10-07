import type { EventName, Options } from '@lit/react'
import { createComponent as createComponentWrapper, type ReactWebComponent, WebComponentProps } from '@lit/react'

import type { RenderToString } from './types'

// A key value map matching React prop names to event names.
type EventNames = Record<string, EventName | string>
export type StencilReactComponent<
  I extends HTMLElement,
  E extends EventNames = Record<string, never>,
> = ReactWebComponent<I, E>

/**
 * Creates a React component that wraps a custom element defined by the provided options.
 *
 * @template I - The type of the custom element.
 * @template E - The type of the event names, defaults to an empty record.
 *
 * @param {Options<I, E> & { defineCustomElement: () => void }} options - The options for creating the component.
 * @param {() => void} options.defineCustomElement - A function to define the custom element.
 * @param {Options<I, E>} options - Additional options for creating the component.
 *
 * @returns {ReactWebComponent<I, E>} - The created React component.
 */
export const createComponent = <I extends HTMLElement, E extends EventNames = Record<string, never>>({
  defineCustomElement,
  ...options
}: Options<I, E> & { defineCustomElement: () => void }) => {
  if (typeof defineCustomElement !== 'undefined') {
    defineCustomElement()
  }
  return createComponentWrapper<I, E>(options)
}

/**
 * Creates a server-side rendering (SSR) component for a given custom element.
 *
 * This function returns a React component that can be used to render the custom element
 * on the server side. It lazy loads the `createComponentForServerSideRendering` function
 * and the `hydrateModule` to avoid bundling them in the runtime and serving them in the browser.
 *
 * @template I - The type of the custom element.
 * @template E - The type of the event names, defaults to an empty record.
 *
 * @param {Object} options - The options for creating the SSR component.
 * @param {Promise<{ renderToString: RenderToString }>} options.hydrateModule - A promise that resolves to an object containing the `renderToString` function.
 * @param {string} options.tagName - The tag name of the custom element.
 *
 * @returns {ReactWebComponent<I, E>} A React component that can be used for server-side rendering of the custom element.
 */
export const createSSRComponent = <I extends HTMLElement, E extends EventNames = Record<string, never>>({
  hydrateModule,
  tagName,
}: {
  hydrateModule: Promise<{ renderToString: RenderToString }>
  tagName: string
}): ReactWebComponent<I, E> => {
  /**
   * IIFE to lazy load the `createComponentForServerSideRendering` function while allowing
   * to return the correct type for the `ReactWebComponent`.
   *
   * Note: we want to lazy load the `./ssr` and `hydrateModule` modules to avoid
   * bundling them in the runtime and serving them in the browser.
   */
  return (async (props: WebComponentProps<I>) => {
    const { createComponentForServerSideRendering } = await import('./ssr')
    return createComponentForServerSideRendering<I, E>({
      tagName,
      renderToString: (await hydrateModule).renderToString,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })(props as any)
  }) as unknown as ReactWebComponent<I, E>
}
