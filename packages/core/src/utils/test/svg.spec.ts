import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { clearSvgCache, fetchSvg } from '../svg'

const MOCK_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>'

const mockFetch = (body: string, ok = true) => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok,
      status: ok ? 200 : 404,
      text: () => Promise.resolve(body),
    }),
  )
}

beforeEach(() => {
  clearSvgCache()
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('fetchSvg', () => {
  test('fetches and returns sanitized SVG content', async () => {
    mockFetch(MOCK_SVG)
    const result = await fetchSvg('/icons/test.svg')
    expect(result).toContain('<svg')
    expect(result).toContain('<circle')
  })

  test('calls fetch only once for the same URL', async () => {
    mockFetch(MOCK_SVG)
    await fetchSvg('/icons/cached.svg')
    await fetchSvg('/icons/cached.svg')
    expect(vi.mocked(fetch)).toHaveBeenCalledTimes(1)
  })

  test('returns empty string and logs error on non-ok response', async () => {
    mockFetch('Not Found', false)
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const result = await fetchSvg('/icons/missing.svg')
    expect(result).toBe('')
    expect(consoleSpy).toHaveBeenCalledOnce()
    consoleSpy.mockRestore()
  })

  test('removes cache entry on fetch failure so next call retries', async () => {
    mockFetch('Not Found', false)
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    await fetchSvg('/icons/retry.svg')

    mockFetch(MOCK_SVG)
    const result = await fetchSvg('/icons/retry.svg')
    expect(result).toContain('<svg')
    expect(vi.mocked(fetch)).toHaveBeenCalledTimes(1)
  })

  test('deduplicates concurrent in-flight requests for the same URL', async () => {
    mockFetch(MOCK_SVG)
    const [a, b] = await Promise.all([fetchSvg('/icons/concurrent.svg'), fetchSvg('/icons/concurrent.svg')])
    expect(a).toContain('<svg')
    expect(b).toContain('<svg')
    expect(vi.mocked(fetch)).toHaveBeenCalledTimes(1)
  })

  test('strips forbidden attributes from fetched SVG', async () => {
    const svgWithForbidden =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="100" width="100"><circle cx="12" cy="12" r="10"/></svg>'
    mockFetch(svgWithForbidden)
    const result = await fetchSvg('/icons/sanitize.svg')
    expect(result).not.toContain('height=')
    expect(result).not.toContain('width=')
    expect(result).toContain('<circle')
  })

  test('returns empty string and logs error when fetch rejects (network error)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network failure')))
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const result = await fetchSvg('/icons/network-error.svg')
    expect(result).toBe('')
    expect(consoleSpy).toHaveBeenCalled()
  })
})
