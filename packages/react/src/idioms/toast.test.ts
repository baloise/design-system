import { act } from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import type { Alert } from '@baloise/ds-core'
import { renderHook } from '../test/render'
import { useToast } from './toast'

const create = vi.fn()
const remove = vi.fn()
const defineDsAlertContainer = vi.fn()
const defineDsToast = vi.fn()

vi.mock('@baloise/ds-core', () => ({
  dsToastController: {
    create: (...args: unknown[]) => create(...args),
    remove: (...args: unknown[]) => remove(...args),
    removeAll: vi.fn(),
  },
}))

vi.mock('@baloise/ds-core/components/ds-alert-container.js', () => ({
  defineCustomElement: (...args: unknown[]) => defineDsAlertContainer(...args),
}))

vi.mock('@baloise/ds-core/components/ds-toast.js', () => ({
  defineCustomElement: (...args: unknown[]) => defineDsToast(...args),
}))

const options: Alert = {
  heading: 'Saved',
  message: 'Your changes have been saved.',
  closable: true,
  closeHandler: () => undefined,
  actionHandler: () => undefined,
}

describe('useToast', () => {
  beforeEach(() => {
    create.mockReset()
    remove.mockReset()
    create.mockResolvedValue('toast-1')
    remove.mockResolvedValue(undefined)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('registers overlay custom elements so controllers can create them', () => {
    const { unmount } = renderHook(() => useToast())

    expect(defineDsAlertContainer).toHaveBeenCalled()
    expect(defineDsToast).toHaveBeenCalled()
    unmount()
  })

  test('present creates a toast with the given options', async () => {
    const { result, unmount } = renderHook(() => useToast())
    const [present] = result.current

    await act(async () => {
      await present(options)
    })

    expect(create).toHaveBeenCalledTimes(1)
    expect(create).toHaveBeenCalledWith(options)
    unmount()
  })

  test('dismiss removes the toast that present created', async () => {
    const { result, unmount } = renderHook(() => useToast())
    const [present, dismiss] = result.current

    await act(async () => {
      await present(options)
    })
    await act(async () => {
      await dismiss()
    })

    expect(remove).toHaveBeenCalledTimes(1)
    expect(remove).toHaveBeenCalledWith('toast-1')
    unmount()
  })

  test('dismiss does nothing when no toast was presented', async () => {
    const { result, unmount } = renderHook(() => useToast())
    const [, dismiss] = result.current

    await act(async () => {
      await dismiss()
    })

    expect(remove).not.toHaveBeenCalled()
    unmount()
  })
})
