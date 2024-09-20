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
                .replace(/>\s+</g, '><')
                // remove any leading or trailing whitespace inside the tags
                .replace(/>\s*(.*?)\s*</g, '>$1<')

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
 * Recursively resolves the types of React components within the given children.
 * This function handles various types of children, including strings, arrays, and React elements.
 * It ensures that the `suppressHydrationWarning` prop is set to `true` for all resolved components.
 *
 * @param {React.ReactNode} children - The children nodes to resolve.
 * @returns {Promise<React.ReactNode>} A promise that resolves to the children with resolved component types.
 */
async function resolveComponentTypes(children: React.ReactNode): Promise<React.ReactNode> {
  if (typeof children === 'undefined' || children === null) {
    return
  }

  /**
   * if the children are a string we can return them as is, e.g.
   * `<div>Hello World</div>`
   */
  if (typeof children === 'string') {
    return children
  }


  const resolveComponentType = async (child) => {

    if (typeof child === 'string') {
      return child
    }

    const newProps = {
      ...child.props,
      suppressHydrationWarning: true,
      children:
        typeof child.props?.children === 'string'
          ? child.props.children
          : await resolveComponentTypes((child.props || {}).children),
    }

    /**
     * Check if the conponent is a function
     * If it is, we need to run the function to get the type
     */
    if (typeof child.type === 'function' ) {
      const newChild = await child.type({
        ...child.props,
        suppressHydrationWarning: true,
      });

      return {
        ...newChild,
        props: newProps,
      }
    }

    // Return the child with the resolved type and children
    return {
      ...child,
      props: newProps,
    }
  }

  if(!Array.isArray(children)) {
    return resolveComponentType(children) as Promise<React.ReactNode>
  }

  return Promise.all(
    children.map(resolveComponentType),
  ) as Promise<React.ReactNode>
}
