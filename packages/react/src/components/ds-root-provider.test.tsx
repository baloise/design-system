import { type ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { render } from '../test/render'
import { DsRootProvider } from './ds-root-provider'

const initialize = vi.fn()
const DsRoot = vi.fn(({ children }: { children?: ReactNode }) => <div data-testid="ds-root">{children}</div>)

vi.mock('@baloise/ds-core', () => ({
  initializeDesignSystem: (config: unknown) => {
    initialize(config)
    ;(window as Window & { DesignSystem?: { config?: unknown } }).DesignSystem = { config: {} }
  },
}))

vi.mock('../generated/components', () => ({
  DsRoot: (props: { children?: ReactNode }) => DsRoot(props),
}))

describe('DsRootProvider', () => {
  beforeEach(() => {
    initialize.mockReset()
    DsRoot.mockClear()
    delete (window as Window & { DesignSystem?: unknown }).DesignSystem
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('initializes the design system once with React form defaults', () => {
    const { rerender, unmount } = render(
      <DsRootProvider brand="helvetia" region="CH" language="de">
        <span data-testid="child">Hello</span>
      </DsRootProvider>,
    )

    expect(initialize).toHaveBeenCalledTimes(1)
    expect(initialize).toHaveBeenCalledWith({
      brand: 'helvetia',
      region: 'CH',
      language: 'de',
      httpFormSubmit: false,
    })

    rerender(
      <DsRootProvider brand="helvetia" region="CH" language="fr">
        <span data-testid="child">Hello</span>
      </DsRootProvider>,
    )

    expect(initialize).toHaveBeenCalledTimes(1)
    unmount()
  })

  test('does not initialize when the design system is already configured', () => {
    ;(window as Window & { DesignSystem?: { config?: unknown } }).DesignSystem = { config: {} }

    const { unmount } = render(<DsRootProvider region="DE" />)

    expect(initialize).not.toHaveBeenCalled()
    unmount()
  })

  test('forwards layout and live config props to DsRoot', () => {
    const { container, unmount } = render(
      <DsRootProvider
        className="has-sticky-footer"
        animated={false}
        brand="baloise"
        region="IT"
        language="it"
        fallbackLanguage="en"
        allowedLanguages={['it', 'en']}
      >
        <span data-testid="child">Body</span>
      </DsRootProvider>,
    )

    expect(container.querySelector('[data-testid="child"]')?.textContent).toBe('Body')
    expect(DsRoot).toHaveBeenCalledWith(
      expect.objectContaining({
        className: 'has-sticky-footer',
        animated: false,
        brand: 'baloise',
        region: 'IT',
        language: 'it',
        fallbackLanguage: 'en',
        allowedLanguages: 'it,en',
      }),
    )
    unmount()
  })

  test('passes one-shot config to initialize but not to DsRoot', () => {
    const legalLinks = { CH: { de: [{ href: 'https://example.com', label: 'Legal' }] } }

    const { unmount } = render(<DsRootProvider legalLinks={legalLinks} icons={{ custom: '<svg />' }} />)

    expect(initialize).toHaveBeenCalledWith({
      legalLinks,
      icons: { custom: '<svg />' },
      httpFormSubmit: false,
    })
    expect(DsRoot).toHaveBeenCalledWith(
      expect.not.objectContaining({
        legalLinks,
        icons: { custom: '<svg />' },
      }),
    )
    unmount()
  })
})
