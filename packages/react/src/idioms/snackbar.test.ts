import { act } from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import type { Alert } from '@baloise/ds-core'
import { renderHook } from '../test/render'
import { useSnackbar } from './snackbar'

const create = vi.fn()
const remove = vi.fn()

vi.mock('@baloise/ds-core', () => ({
  dsSnackbarController: {
    create: (...args: unknown[]) => create(...args),
    remove: (...args: unknown[]) => remove(...args),
    removeAll: vi.fn(),
  },
}))

const options: Alert = {
  heading: 'Offline',
  message: 'You are currently offline.',
  closable: true,
  closeHandler: () => undefined,
  actionHandler: () => undefined,
}

describe('useSnackbar', () => {
  beforeEach(() => {
    create.mockReset()
    remove.mockReset()
    create.mockResolvedValue('snackbar-1')
    remove.mockResolvedValue(undefined)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('present creates a snackbar with the given options', async () => {
    const { result, unmount } = renderHook(() => useSnackbar())
    const [present] = result.current

    await act(async () => {
      await present(options)
    })

    expect(create).toHaveBeenCalledTimes(1)
    expect(create).toHaveBeenCalledWith(options)
    unmount()
  })

  test('dismiss removes the snackbar that present created', async () => {
    const { result, unmount } = renderHook(() => useSnackbar())
    const [present, dismiss] = result.current

    await act(async () => {
      await present(options)
    })
    await act(async () => {
      await dismiss()
    })

    expect(remove).toHaveBeenCalledTimes(1)
    expect(remove).toHaveBeenCalledWith('snackbar-1')
    unmount()
  })
})
