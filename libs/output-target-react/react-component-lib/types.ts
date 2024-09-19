import { EventName, WebComponentProps } from '@lit/react'

interface RenderToStringOptions {
  fullDocument?: boolean
  serializeShadowRoot?: boolean
  prettyHtml?: boolean
}

export type RenderToString = (
  html: string,
  options: RenderToStringOptions,
) => Promise<{ html: string | null; diagnostics: { level: string; messageText: string }[] }>

export interface CreateComponentForServerSideRenderingOptions {
  tagName: string
  renderToString: RenderToString
}

export type StencilProps<I extends HTMLElement> = WebComponentProps<I> & {
  __resolveTagName?: boolean
}

export type EventNames = Record<string, EventName | string>
