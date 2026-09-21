import { isValidElement, type ReactElement } from 'react'
import { describe, expect, test } from 'vitest'
import { asOpaqueSsrMarkup } from './ssr-create-component'

describe('asOpaqueSsrMarkup', () => {
  test('wraps host markup so React does not reconcile declarative shadow DOM', () => {
    const html =
      '<ds-button suppresshydrationwarning="true"><template shadowrootmode="open"><button>Click me</button></template>Click me</ds-button>'

    const element = asOpaqueSsrMarkup(html) as ReactElement<{
      suppressHydrationWarning?: boolean
      style?: { display?: string }
      dangerouslySetInnerHTML?: { __html: string }
      children?: unknown
    }>

    expect(isValidElement(element)).toBe(true)
    expect(element.type).toBe('div')
    expect(element.props.suppressHydrationWarning).toBe(true)
    expect(element.props.style).toEqual({ display: 'contents' })
    expect(element.props.dangerouslySetInnerHTML).toEqual({ __html: html })
    expect(element.props.children).toBeUndefined()
  })
})
