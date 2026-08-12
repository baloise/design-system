import { TokenPreviewMessage } from './token-preview.types'

/**
 * Live token preview: applies token changes posted by an embedding parent window (Toky's live
 * preview sidebar) directly to `document.documentElement.style`, so a component's rendered
 * output reflects in-progress token edits without a rebuild. No-ops outside an iframe, so it
 * never activates during normal component consumption or Playwright visual-regression runs.
 * No origin allowlist yet - MVP is localhost-only (see packages/core/CONTEXT.md).
 */
export const initializeTokenPreview = (win: Window = window): void => {
  if (win.parent === win) {
    return
  }

  const appliedProperties = new Set<string>()
  const injectedBrandStylesheets = new Set<string>()

  const applyTokens = (tokens: { name: string; value: string | null }[]) => {
    for (const { name, value } of tokens) {
      if (value === null) {
        win.document.documentElement.style.removeProperty(name)
        appliedProperties.delete(name)
      } else {
        win.document.documentElement.style.setProperty(name, value)
        appliedProperties.add(name)
      }
    }
  }

  const applyBrand = (brand: string | null) => {
    if (!brand || brand === 'Base') {
      delete win.document.documentElement.dataset['theme']
      return
    }

    const href = `/assets/tokens/${brand.toLowerCase()}.tokens.css`
    if (!injectedBrandStylesheets.has(href)) {
      const link = win.document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      win.document.head.appendChild(link)
      injectedBrandStylesheets.add(href)
    }

    // packages/tokens emits the brand stylesheet's selector lowercased (config.brand.ts:
    // `[data-theme="${mode.toLowerCase()}"]`) - matching that here is what makes the injected
    // stylesheet above actually apply.
    win.document.documentElement.dataset['theme'] = brand.toLowerCase()
  }

  const reset = () => {
    for (const name of appliedProperties) {
      win.document.documentElement.style.removeProperty(name)
    }
    appliedProperties.clear()
    delete win.document.documentElement.dataset['theme']
  }

  win.addEventListener('message', (event: MessageEvent<TokenPreviewMessage>) => {
    if (event.source !== win.parent) {
      return
    }
    const message = event.data
    if (!message || message.source !== 'ds-token-preview') {
      return
    }

    switch (message.type) {
      case 'set-tokens':
        applyTokens(message.tokens)
        break
      case 'set-brand':
        applyBrand(message.brand)
        break
      case 'reset':
        reset()
        break
    }
  })

  win.parent.postMessage({ source: 'ds-token-preview', type: 'ready' }, '*')
}
