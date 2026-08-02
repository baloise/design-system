import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createBranch, getBaseTokensFileMeta, openPullRequest, updateFileOnBranch } from './github-write'

const originalEnv = { ...process.env }

beforeEach(() => {
  process.env.TOKY_GITHUB_TOKEN = 'test-token'
  delete process.env.TOKY_GITHUB_REF
})

afterEach(() => {
  process.env = { ...originalEnv }
  vi.unstubAllGlobals()
})

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status })
}

describe('getBaseTokensFileMeta', () => {
  it('fetches the file metadata and decodes base64 content', async () => {
    const content = Buffer.from('{"foo":"bar"}', 'utf-8').toString('base64')
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ sha: 'abc123', content }))
    vi.stubGlobal('fetch', fetchMock)

    const result = await getBaseTokensFileMeta()

    expect(result).toEqual({ sha: 'abc123', content: { foo: 'bar' } })
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe(
      'https://api.github.com/repos/baloise/design-system/contents/packages/tokens/tokens/Base.tokens.json?ref=next',
    )
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer test-token')
  })

  it('throws a descriptive error on a non-OK response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('nope', { status: 500 })))
    await expect(getBaseTokensFileMeta()).rejects.toThrow(/500/)
  })
})

describe('createBranch', () => {
  it('reads the base ref sha, then creates the new branch from it', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ object: { sha: 'base-sha' } }))
      .mockResolvedValueOnce(jsonResponse({}))
    vi.stubGlobal('fetch', fetchMock)

    await createBranch('toky/update-123')

    expect(fetchMock).toHaveBeenCalledTimes(2)
    const [refUrl] = fetchMock.mock.calls[0] as [string]
    expect(refUrl).toBe('https://api.github.com/repos/baloise/design-system/git/ref/heads/next')

    const [createUrl, createInit] = fetchMock.mock.calls[1] as [string, RequestInit]
    expect(createUrl).toBe('https://api.github.com/repos/baloise/design-system/git/refs')
    expect(JSON.parse(createInit.body as string)).toEqual({ ref: 'refs/heads/toky/update-123', sha: 'base-sha' })
  })

  it('throws if creating the ref fails', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ object: { sha: 'base-sha' } }))
      .mockResolvedValueOnce(new Response('conflict', { status: 422 }))
    vi.stubGlobal('fetch', fetchMock)

    await expect(createBranch('toky/update-123')).rejects.toThrow(/422/)
  })
})

describe('updateFileOnBranch', () => {
  it('PUTs base64-encoded content with the given sha and branch', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    vi.stubGlobal('fetch', fetchMock)

    await updateFileOnBranch('toky/update-123', '{"a":1}', 'file-sha', 'chore: update tokens')

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe(
      'https://api.github.com/repos/baloise/design-system/contents/packages/tokens/tokens/Base.tokens.json',
    )
    expect(init.method).toBe('PUT')
    const body = JSON.parse(init.body as string)
    expect(body.sha).toBe('file-sha')
    expect(body.branch).toBe('toky/update-123')
    expect(body.message).toBe('chore: update tokens')
    expect(Buffer.from(body.content, 'base64').toString('utf-8')).toBe('{"a":1}')
  })
})

describe('openPullRequest', () => {
  it('opens a PR against the base ref and returns its url/number', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(jsonResponse({ html_url: 'https://github.com/baloise/design-system/pull/42', number: 42 }))
    vi.stubGlobal('fetch', fetchMock)

    const result = await openPullRequest('toky/update-123', 'Update tokens', 'body text')

    expect(result).toEqual({ url: 'https://github.com/baloise/design-system/pull/42', number: 42 })
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('https://api.github.com/repos/baloise/design-system/pulls')
    expect(JSON.parse(init.body as string)).toEqual({
      title: 'Update tokens',
      head: 'toky/update-123',
      base: 'next',
      body: 'body text',
    })
  })

  it('throws a descriptive error on a non-OK response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('bad request', { status: 400 })))
    await expect(openPullRequest('toky/update-123', 't', 'b')).rejects.toThrow(/400/)
  })
})
