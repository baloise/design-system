import { type ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { render } from '../test/render'
import { DsRootProvider } from './ds-root-provider'
import { DsRootProvider as DsRootProviderServer } from './ds-root-provider.server'

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

vi.mock('../generated/components.server', () => ({
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

  test('initializes the design system once', () => {
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

  test('passes icons, legalLinks, legalText, and socialLinks to initialize and to DsRoot', () => {
    const legalLinks = { CH: { de: [{ href: 'https://example.com', label: 'Legal' }] } }
    const legalText = { CH: { de: 'Copyright' } }
    const socialLinks = { CH: [{ href: 'https://example.com', label: 'X', icon: 'x', ariaLabel: 'X' }] }
    const icons = { custom: '<svg />' }

    const { unmount } = render(
      <DsRootProvider legalLinks={legalLinks} legalText={legalText} socialLinks={socialLinks} icons={icons} />,
    )

    expect(initialize).toHaveBeenCalledWith({
      legalLinks,
      legalText,
      socialLinks,
      icons,
    })
    // `<ds-root>` itself owns keeping these in sync with the global config (via its own props/watchers),
    // so the provider forwards them as live props rather than only setting them once at init.
    expect(DsRoot).toHaveBeenCalledWith(
      expect.objectContaining({
        legalLinks,
        legalText,
        socialLinks,
        icons,
      }),
    )
    unmount()
  })
})

describe('DsRootProvider (server)', () => {
  beforeEach(() => {
    initialize.mockReset()
    DsRoot.mockClear()
    delete (window as Window & { DesignSystem?: unknown }).DesignSystem
  })

  test('uses the same public props and factory as the client provider', () => {
    const { unmount } = render(
      <DsRootProviderServer brand="helvetia" region="CH" allowedLanguages={['de', 'fr']}>
        <span data-testid="child">Hello</span>
      </DsRootProviderServer>,
    )

    expect(initialize).toHaveBeenCalledWith({
      brand: 'helvetia',
      region: 'CH',
      allowedLanguages: ['de', 'fr'],
    })
    expect(DsRoot).toHaveBeenCalledWith(
      expect.objectContaining({
        brand: 'helvetia',
        region: 'CH',
        allowedLanguages: 'de,fr',
      }),
    )
    unmount()
  })
})
