import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { render } from '../test/render'
import { DsRootSSRProvider } from './ds-root-ssr-provider'

const initialize = vi.fn()
const defineCustomElements = vi.fn().mockResolvedValue(undefined)

vi.mock('@helvetia-design/core', () => ({
  initializeDesignSystem: (config: unknown) => {
    initialize(config)
    ;(window as Window & { DesignSystem?: { config?: unknown } }).DesignSystem = { config: {} }
  },
}))

vi.mock('@helvetia-design/core/loader', () => ({
  defineCustomElements: () => defineCustomElements(),
}))

const flush = () => new Promise(resolve => setTimeout(resolve, 0))

describe('DsRootSSRProvider', () => {
  beforeEach(() => {
    initialize.mockClear()
    defineCustomElements.mockClear()
    delete (window as Window & { DesignSystem?: unknown }).DesignSystem
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('renders children unchanged, without wrapping them in anything', () => {
    const { container, unmount } = render(
      <DsRootSSRProvider region="CH" language="de">
        <span data-testid="child">Hello</span>
      </DsRootSSRProvider>,
    )

    expect(container.querySelector('[data-testid="child"]')?.textContent).toBe('Hello')
    unmount()
  })

  test('boots the design system and defines custom elements once mounted', async () => {
    const { unmount } = render(
      <DsRootSSRProvider region="CH" language="de" allowedLanguages={['de', 'fr']}>
        <span>Hello</span>
      </DsRootSSRProvider>,
    )

    await flush()

    expect(initialize).toHaveBeenCalledWith({ region: 'CH', language: 'de', allowedLanguages: ['de', 'fr'] })
    expect(defineCustomElements).toHaveBeenCalledTimes(1)
    unmount()
  })

  test('does not initialize when the design system is already configured', async () => {
    ;(window as Window & { DesignSystem?: { config?: unknown } }).DesignSystem = { config: {} }

    const { unmount } = render(<DsRootSSRProvider region="DE" />)

    await flush()

    expect(initialize).not.toHaveBeenCalled()
    expect(defineCustomElements).toHaveBeenCalledTimes(1)
    unmount()
  })
})
