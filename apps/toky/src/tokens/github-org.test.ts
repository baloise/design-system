import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { isOrgMember } from './github-org'

const originalEnv = { ...process.env }

beforeEach(() => {
  process.env.TOKY_GITHUB_TOKEN = 'test-token'
})

afterEach(() => {
  process.env = { ...originalEnv }
  vi.unstubAllGlobals()
})

describe('isOrgMember', () => {
  it('requests the expected URL and headers, using TOKY_GITHUB_TOKEN when TOKY_GITHUB_ORG_TOKEN is unset', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }))
    vi.stubGlobal('fetch', fetchMock)

    await isOrgMember('octocat')

    expect(fetchMock).toHaveBeenCalledWith('https://api.github.com/orgs/baloise/members/octocat', {
      cache: 'no-store',
      headers: {
        Authorization: 'Bearer test-token',
        Accept: 'application/vnd.github+json',
      },
    })
  })

  it('prefers TOKY_GITHUB_ORG_TOKEN over TOKY_GITHUB_TOKEN when both are set', async () => {
    process.env.TOKY_GITHUB_ORG_TOKEN = 'org-token'
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }))
    vi.stubGlobal('fetch', fetchMock)

    await isOrgMember('octocat')

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer org-token')
  })

  it('returns true on 204', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 204 })))
    await expect(isOrgMember('octocat')).resolves.toBe(true)
  })

  it('returns false on 404', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('not found', { status: 404 })))
    await expect(isOrgMember('octocat')).resolves.toBe(false)
  })

  it('throws on an unexpected status', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('nope', { status: 403, statusText: 'Forbidden' })))
    await expect(isOrgMember('octocat')).rejects.toThrow(/403/)
  })

  it('percent-encodes the username', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }))
    vi.stubGlobal('fetch', fetchMock)

    await isOrgMember('a b')

    const [url] = fetchMock.mock.calls[0] as [string]
    expect(url).toBe('https://api.github.com/orgs/baloise/members/a%20b')
  })
})
