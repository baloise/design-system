import { act } from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { renderHook } from '../test/render'
import { useModal } from './modal'

const create = vi.fn()
const dismiss = vi.fn()
const addEventListener = vi.fn()

vi.mock('../generated/components', () => ({
  DsModal: () => null,
}))

vi.mock('@baloise/ds-core', () => ({
  dsModalController: {
    create: (...args: unknown[]) => create(...args),
    dismiss: vi.fn(),
    dismissAll: vi.fn(),
  },
}))

describe('useModal', () => {
  beforeEach(() => {
    create.mockReset()
    dismiss.mockReset()
    addEventListener.mockReset()
    create.mockResolvedValue({
      addEventListener,
      dismiss,
    })
    dismiss.mockResolvedValue(undefined)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('present creates a modal with a detached content element', async () => {
    const { result, unmount } = renderHook(() => useModal())
    const [present] = result.current

    await act(async () => {
      await present(<span>Content</span>, { closable: false, modalWidth: 480 })
    })

    expect(create).toHaveBeenCalledTimes(1)
    const options = create.mock.calls[0]?.[0] as { component: HTMLElement; closable: boolean; modalWidth: number }
    expect(options.component).toBeInstanceOf(HTMLElement)
    expect(options.closable).toBe(false)
    expect(options.modalWidth).toBe(480)
    expect(addEventListener).toHaveBeenCalledWith('dsDidDismiss', expect.any(Function), { once: true })
    unmount()
  })

  test('dismiss forwards data and role to the presented modal', async () => {
    const { result, unmount } = renderHook(() => useModal())
    const [present, dismissModal] = result.current

    await act(async () => {
      await present(<span>Content</span>)
    })
    await act(async () => {
      await dismissModal('done', 'confirm')
    })

    expect(dismiss).toHaveBeenCalledWith('done', 'confirm')
    unmount()
  })

  test('dismiss does nothing when no modal was presented', async () => {
    const { result, unmount } = renderHook(() => useModal())
    const [, dismissModal] = result.current

    await act(async () => {
      await dismissModal()
    })

    expect(dismiss).not.toHaveBeenCalled()
    unmount()
  })
})
