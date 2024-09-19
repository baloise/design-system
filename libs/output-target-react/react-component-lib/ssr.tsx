import React from 'react'
import ReactDOMServer from 'react-dom/server'
import type { ReactWebComponent } from '@lit/react'

import { possibleStandardNames } from './constants'
import { CreateComponentForServerSideRenderingOptions, EventNames, StencilProps } from './types'
import { camelToDashCase, isPrimitive } from './utils'

/**
 * Transform a React component into a Stencil component for server side rendering
 *
 * Note: this code should only be loaded on the server side, as it uses heavy Node.js dependencies
 * that when loaded on the client side would increase the bundle size.
 *
 * @param options - the options for the component
 * @returns - the component for server side rendering
 */
export const createComponentForServerSideRendering = <
  I extends HTMLElement,
  E extends EventNames = Record<string, never>,
>(
  options: CreateComponentForServerSideRenderingOptions,
) => {
  return (async ({ children, ...props }: StencilProps<I> = {}) => {
    /**
     * Ensure we only run on the server
     */
    if (!('process' in globalThis) || typeof window !== 'undefined') {
      throw new Error('`createComponentForServerSideRendering` can only be run on the server')
    }

    /**
     * Get all props from the react component and parse
     */
    const stringProps = Object.entries(props).reduce((acc, [key, value]) => {
      const propValue = isPrimitive(value)
        ? `"${value}"`
        : Array.isArray(value) && value.every(isPrimitive)
          ? JSON.stringify(value)
          : undefined

      if (!propValue) {
        return acc
      }

      const propName = possibleStandardNames[key] || camelToDashCase(key)
      return (acc += ` ${propName}=${propValue}`)
    }, '')

    let serializedChildren = ''
    const toSerialize = `<${options.tagName}${stringProps} suppressHydrationWarning="true">`

    try {
      const awaitedChildren = await resolveComponentTypes(children)
      serializedChildren = ReactDOMServer.renderToString(awaitedChildren as React.ReactElement)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      console.log(
        `Failed to serialize light DOM for ${toSerialize.slice(0, -1)} />: ${
          error.message
        } - this may impact the hydration of the component`,
      )
    }

    const toSerializeWithChildren = `${toSerialize}${serializedChildren}</${options.tagName}>`

    /**
     * Render the stencil component using the renderToString function from the generated hydration script
     */
    const { html } = await options.renderToString(toSerializeWithChildren, {
      fullDocument: false,
      serializeShadowRoot: true,
      prettyHtml: true,
    })

    if (!html) {
      throw new Error('No HTML returned from renderToString')
    }

    const serializedComponentByLine = html.split('\n')
    const hydrationComment = '<!--r.1-->'
    const isShadowComponent = serializedComponentByLine[1].includes('shadowrootmode="open"')
    const templateContent = isShadowComponent
      ? serializedComponentByLine.slice(2, serializedComponentByLine.indexOf(' </template>')).join('\n').trim()
      : undefined

    /**
     * `html-react-parser` is a Node.js dependency so we should make sure to only import it when run on the server
     */
    const { default: parse } = await import('html-react-parser')

    /**
     * parse the string into a React component
     */
    const StencilElement = () =>
      parse(html, {
        transform(reactNode, domNode) {
          if ('name' in domNode && domNode.name === options.tagName) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const props = (reactNode as any).props
            /**
             * remove the outer tag (e.g. `options.tagName`) so we only have the inner content
             */
            const CustomTag = `${options.tagName}`

            /**
             * if the component is not a shadow component we can render it with the light DOM only
             */
            if (!isShadowComponent) {
              const { children, ...customProps } = props || {}
              const __html = serializedComponentByLine
                // remove the components outer tags as we want to set the inner content only
                .slice(1, -1)
                // bring the array back to a string
                .join('\n')
                .trim()
                // remove any whitespace between tags that may cause hydration errors
                .replace(/(?<=>)\s+(?=<)/g, '')

              return <CustomTag {...customProps} suppressHydrationWarning={true} dangerouslySetInnerHTML={{ __html }} />
            }

            return (
              <CustomTag {...props} suppressHydrationWarning>
                {/* Create a shadow root for the component by using the template tag */}
                <template
                  // @ts-expect-error - shadowrootmode is not a valid attribute
                  shadowrootmode="open"
                  suppressHydrationWarning={true}
                  dangerouslySetInnerHTML={{ __html: hydrationComment + templateContent }}
                ></template>
                {children}
              </CustomTag>
            )
          }
        },
      }) as React.ReactElement

    return <StencilElement />
  }) as unknown as ReactWebComponent<I, E>
}

/**
 * Recursively resolves the types of React components within the given children nodes.
 *
 * This function processes the children nodes to handle various types, including strings and
 * React elements. It ensures that the types of the components are resolved, especially when
 * dealing with asynchronous components or components that require special handling.
 *
 * @template I - The type of the HTMLElement.
 * @param {React.ReactNode} children - The children nodes to process.
 * @returns {Promise<React.ReactNode>} A promise that resolves to the processed children nodes
 * with resolved component types.
 */
async function resolveComponentTypes<I extends HTMLElement>(children: React.ReactNode): Promise<React.ReactNode> {
  if (typeof children === 'undefined') {
    return
  }

  /**
   * if the children are a string we can return them as is, e.g.
   * `<div>Hello World</div>`
   */
  if (typeof children === 'string') {
    return children
  }

  if (!children || !Array.isArray(children)) {
    return []
  }

  return Promise.all(
    children.map(async (child): Promise<string | StencilProps<I>> => {
      if (typeof child === 'string') {
        return child
      }

      const newProps = {
        ...child.props,
        children:
          typeof child.props.children === 'string'
            ? child.props.children
            : await resolveComponentTypes((child.props || {}).children),
      }

      /**
       * Check if the conponent is a function
       * If it is, we need to run the function to get the type
       * If the type has a `_payload` property, and it is a promise, we need to await it
       */
      let type = typeof child.type === 'function' ? await child.type({ __resolveTagName: true }) : child.type
      if (type._payload && 'then' in type._payload) {
        type = {
          ...type,
          _payload: await type._payload,
        }
      }

      /**
       * If the type has a `_payload` property, and it is a function, we need to run it
       */
      if (typeof type?._payload === 'function') {
        type = {
          ...type,
          $$typeof: Symbol('react.element'),
          _payload: await type._payload({ __resolveTagName: true }),
        }

        if (typeof type._payload.type === 'function') {
          return type._payload.type()
        }
      }

      // Return the child with the resolved type and children
      return {
        ...child,
        type,
        props: newProps,
      }
    }),
  ) as Promise<React.ReactNode>
}
