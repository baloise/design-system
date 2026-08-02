import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchBaseTokensFile } from './github'

const originalEnv = { ...process.env }

beforeEach(() => {
  process.env.TOKY_GITHUB_TOKEN = 'test-token'
  delete process.env.TOKY_GITHUB_REF
})

afterEach(() => {
  process.env = { ...originalEnv }
  vi.unstubAllGlobals()
})

describe('fetchBaseTokensFile', () => {
  it('throws when TOKY_GITHUB_TOKEN is not set', async () => {
    delete process.env.TOKY_GITHUB_TOKEN
    await expect(fetchBaseTokensFile()).rejects.toThrow('TOKY_GITHUB_TOKEN is not set')
  })

  it('requests the token file with the expected URL, headers, and default ref', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{"ok":true}', { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    await fetchBaseTokensFile()

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.github.com/repos/baloise/design-system/contents/packages/tokens/tokens/Base.tokens.json?ref=next',
      {
        headers: {
          Authorization: 'Bearer test-token',
          Accept: 'application/vnd.github.raw+json',
        },
      },
    )
  })

  it('uses TOKY_GITHUB_REF to override the default ref', async () => {
    process.env.TOKY_GITHUB_REF = 'my-branch'
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    await fetchBaseTokensFile()

    const [url] = fetchMock.mock.calls[0] as [string]
    expect(url).toContain('ref=my-branch')
  })

  it('throws a descriptive error on a non-OK response', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('not found', { status: 404, statusText: 'Not Found' }))
    vi.stubGlobal('fetch', fetchMock)

    await expect(fetchBaseTokensFile()).rejects.toThrow(/404/)
  })

  it('returns the raw response text on success', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{"hello":"world"}', { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    await expect(fetchBaseTokensFile()).resolves.toBe('{"hello":"world"}')
  })
})
