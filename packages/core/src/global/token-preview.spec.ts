import { describe, expect, test, vi } from 'vitest'

import { initializeTokenPreview } from './token-preview'

describe('initializeTokenPreview', () => {
  test('is a no-op when parent is null, as in a Node hydrate window', () => {
    const win = {
      parent: null,
      addEventListener: vi.fn(),
    } as unknown as Window

    expect(() => initializeTokenPreview(win)).not.toThrow()
    expect(win.addEventListener).not.toHaveBeenCalled()
  })
})
