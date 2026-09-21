import { createElement, type CSSProperties, type ReactNode } from 'react'
import { createComponent as createStencilSsrComponent } from '@stencil/react-output-target/ssr'

const opaqueSsrStyle: CSSProperties = { display: 'contents' }

/**
 * Browser parsing consumes `<template shadowrootmode>` into a real shadow root
 * before React hydrates. Keep that markup as an opaque HTML blob so the
 * reconciler does not look for the template node and throw error 418.
 */
export function asOpaqueSsrMarkup(html: string): ReactNode {
  return createElement('div', {
    suppressHydrationWarning: true,
    style: opaqueSsrStyle,
    dangerouslySetInnerHTML: { __html: html },
  })
}

export function createComponent(options: Parameters<typeof createStencilSsrComponent>[0]) {
  const StencilComponent = createStencilSsrComponent(options) as (
    props: Record<string, unknown>,
  ) => Promise<ReactNode> | ReactNode

  return async function OpaqueSsrComponent(props: Record<string, unknown>) {
    const vnode = await StencilComponent(props)
    const { renderToStaticMarkup } = await import('react-dom/server')
    return asOpaqueSsrMarkup(renderToStaticMarkup(vnode))
  }
}
