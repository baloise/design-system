import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  addBrandToIndex,
  branchExists,
  createBranch,
  createBrandFile,
  createFileOnBranch,
  findOpenPullRequest,
  getBaseTokensFileMeta,
  getBrandTokensFileMeta,
  getFileMeta,
  insertBrandIntoIndexSource,
  listBranches,
  listTokenBrandFiles,
  openPullRequest,
  resolveReadRef,
  updateFileAtPath,
  updateFileOnBranch,
  updatePullRequestBody,
  workingBranchFor,
} from './github-write'

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

describe('getBrandTokensFileMeta', () => {
  it('fetches the named brand file and decodes base64 content', async () => {
    const content = Buffer.from('{"🌐 Global":{}}', 'utf-8').toString('base64')
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ sha: 'brand-sha', content }))
    vi.stubGlobal('fetch', fetchMock)

    const result = await getBrandTokensFileMeta('Tcs')

    expect(result).toEqual({ sha: 'brand-sha', content: { '🌐 Global': {} } })
    const [url] = fetchMock.mock.calls[0] as [string]
    expect(url).toBe(
      'https://api.github.com/repos/baloise/design-system/contents/packages/tokens/tokens/Tcs.tokens.json?ref=next',
    )
  })

  it('throws a descriptive error on a non-OK response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('nope', { status: 404 })))
    await expect(getBrandTokensFileMeta('Tcs')).rejects.toThrow(/404/)
  })
})

describe('getFileMeta', () => {
  it('fetches raw decoded text for an arbitrary path', async () => {
    const content = Buffer.from('const brands = []', 'utf-8').toString('base64')
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ sha: 'sha1', content }))
    vi.stubGlobal('fetch', fetchMock)

    const result = await getFileMeta('packages/tokens/src/index.ts', 'next')

    expect(result).toEqual({ sha: 'sha1', content: 'const brands = []' })
    const [url] = fetchMock.mock.calls[0] as [string]
    expect(url).toBe(
      'https://api.github.com/repos/baloise/design-system/contents/packages/tokens/src/index.ts?ref=next',
    )
  })

  it('throws a descriptive error on a non-OK response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('nope', { status: 404 })))
    await expect(getFileMeta('some/path.ts', 'next')).rejects.toThrow(/404/)
  })
})

describe('listTokenBrandFiles', () => {
  it('returns brand names, excluding Base.tokens.json and non-token-file entries', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse([
        { name: 'Base.tokens.json', type: 'file' },
        { name: 'Tcs.tokens.json', type: 'file' },
        { name: 'Acme.tokens.json', type: 'file' },
        { name: 'README.md', type: 'file' },
        { name: 'subdir', type: 'dir' },
      ]),
    )
    vi.stubGlobal('fetch', fetchMock)

    await expect(listTokenBrandFiles('next')).resolves.toEqual(['Acme', 'Tcs'])
    const [url] = fetchMock.mock.calls[0] as [string]
    expect(url).toBe('https://api.github.com/repos/baloise/design-system/contents/packages/tokens/tokens?ref=next')
  })

  it('throws a descriptive error on a non-OK response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('nope', { status: 500 })))
    await expect(listTokenBrandFiles('next')).rejects.toThrow(/500/)
  })
})

describe('listBranches', () => {
  it('returns branch names sorted alphabetically', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse([{ name: 'next' }, { name: 'main' }, { name: 'beta' }]))
    vi.stubGlobal('fetch', fetchMock)

    await expect(listBranches()).resolves.toEqual(['beta', 'main', 'next'])
    const [url] = fetchMock.mock.calls[0] as [string]
    expect(url).toBe('https://api.github.com/repos/baloise/design-system/branches?per_page=100&page=1')
  })

  it('pages through results until a page comes back short', async () => {
    const fullPage = Array.from({ length: 100 }, (_, i) => ({ name: `branch-${i}` }))
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(fullPage))
      .mockResolvedValueOnce(jsonResponse([{ name: 'last-one' }]))
    vi.stubGlobal('fetch', fetchMock)

    const result = await listBranches()

    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(result).toHaveLength(101)
    const [, secondUrl] = fetchMock.mock.calls.map(call => call[0] as string)
    expect(secondUrl).toContain('page=2')
  })

  it('throws a descriptive error on a non-OK response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('nope', { status: 500 })))
    await expect(listBranches()).rejects.toThrow(/500/)
  })

  it('hides production, version, and dependabot branches', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        jsonResponse([
          { name: 'next' },
          { name: 'production' },
          { name: 'v10' },
          { name: 'v18' },
          { name: 'dependabot/npm_and_yarn/foo-1.2.3' },
          { name: 'main' },
        ]),
      )
    vi.stubGlobal('fetch', fetchMock)

    await expect(listBranches()).resolves.toEqual(['main', 'next'])
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

  it('reads the given base ref instead of the default when one is passed', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ object: { sha: 'base-sha' } }))
      .mockResolvedValueOnce(jsonResponse({}))
    vi.stubGlobal('fetch', fetchMock)

    await createBranch('toky/update-123', 'release/2026-08')

    const [refUrl] = fetchMock.mock.calls[0] as [string]
    expect(refUrl).toBe('https://api.github.com/repos/baloise/design-system/git/ref/heads/release/2026-08')
  })
})

describe('branchExists', () => {
  it('returns true when the ref lookup succeeds', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ object: { sha: 'sha' } })))
    await expect(branchExists('toky/update-next')).resolves.toBe(true)
  })

  it('returns false on a 404 without throwing', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('not found', { status: 404 })))
    await expect(branchExists('toky/update-next')).resolves.toBe(false)
  })

  it('throws a descriptive error on any other non-OK response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('nope', { status: 500 })))
    await expect(branchExists('toky/update-next')).rejects.toThrow(/500/)
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

describe('createFileOnBranch', () => {
  it('PUTs base64-encoded content at the given path with no sha', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    vi.stubGlobal('fetch', fetchMock)

    await createFileOnBranch(
      'toky/update-123',
      '.changeset/toky-update-123.md',
      '---\nfoo\n---\n',
      'chore: add changeset',
    )

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('https://api.github.com/repos/baloise/design-system/contents/.changeset/toky-update-123.md')
    expect(init.method).toBe('PUT')
    const body = JSON.parse(init.body as string)
    expect(body.sha).toBeUndefined()
    expect(body.branch).toBe('toky/update-123')
    expect(body.message).toBe('chore: add changeset')
    expect(Buffer.from(body.content, 'base64').toString('utf-8')).toBe('---\nfoo\n---\n')
  })

  it('throws a descriptive error on a non-OK response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('nope', { status: 422 })))
    await expect(createFileOnBranch('toky/update-123', '.changeset/x.md', 'content', 'msg')).rejects.toThrow(/422/)
  })
})

describe('updateFileAtPath', () => {
  it('PUTs base64-encoded content at the given path with the given sha and branch', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    vi.stubGlobal('fetch', fetchMock)

    await updateFileAtPath('toky/update-next', 'packages/tokens/src/index.ts', 'const brands = []', 'sha1', 'msg')

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('https://api.github.com/repos/baloise/design-system/contents/packages/tokens/src/index.ts')
    expect(init.method).toBe('PUT')
    const body = JSON.parse(init.body as string)
    expect(body.sha).toBe('sha1')
    expect(body.branch).toBe('toky/update-next')
    expect(Buffer.from(body.content, 'base64').toString('utf-8')).toBe('const brands = []')
  })
})

describe('createBrandFile', () => {
  it('creates an empty sparse tokens.json at the brand path', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    vi.stubGlobal('fetch', fetchMock)

    await createBrandFile('toky/update-next', 'Acme')

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe(
      'https://api.github.com/repos/baloise/design-system/contents/packages/tokens/tokens/Acme.tokens.json',
    )
    const body = JSON.parse(init.body as string)
    expect(Buffer.from(body.content, 'base64').toString('utf-8')).toBe('{}\n')
  })
})

describe('insertBrandIntoIndexSource', () => {
  it('appends a name to an existing single-quoted array', () => {
    const source = "const brands = ['Tcs'] // add new brand names here\n"
    expect(insertBrandIntoIndexSource(source, 'Acme')).toBe(
      "const brands = ['Tcs', 'Acme'] // add new brand names here\n",
    )
  })

  it('handles an empty array', () => {
    const source = 'const brands = []\n'
    expect(insertBrandIntoIndexSource(source, 'Acme')).toBe("const brands = ['Acme']\n")
  })

  it('returns null when the pattern is not found', () => {
    expect(insertBrandIntoIndexSource('export const foo = 1', 'Acme')).toBeNull()
  })
})

describe('addBrandToIndex', () => {
  it('reads the index file, patches it, and writes it back', async () => {
    const content = Buffer.from("const brands = ['Tcs']", 'utf-8').toString('base64')
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ sha: 'index-sha', content }))
      .mockResolvedValueOnce(jsonResponse({}))
    vi.stubGlobal('fetch', fetchMock)

    await addBrandToIndex('toky/update-next', 'Acme')

    expect(fetchMock).toHaveBeenCalledTimes(2)
    const [, writeInit] = fetchMock.mock.calls[1] as [string, RequestInit]
    const body = JSON.parse(writeInit.body as string)
    expect(body.sha).toBe('index-sha')
    expect(Buffer.from(body.content, 'base64').toString('utf-8')).toBe("const brands = ['Tcs', 'Acme']")
  })

  it('throws (without writing) when the brands array pattern is not found', async () => {
    const content = Buffer.from('export const foo = 1', 'utf-8').toString('base64')
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ sha: 'index-sha', content }))
    vi.stubGlobal('fetch', fetchMock)

    await expect(addBrandToIndex('toky/update-next', 'Acme')).rejects.toThrow(/const brands/)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})

describe('openPullRequest', () => {
  it('opens a PR against the base ref and returns its url/number/body', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({
        html_url: 'https://github.com/baloise/design-system/pull/42',
        number: 42,
        body: 'body text',
      }),
    )
    vi.stubGlobal('fetch', fetchMock)

    const result = await openPullRequest('toky/update-123', 'Update tokens', 'body text')

    expect(result).toEqual({ url: 'https://github.com/baloise/design-system/pull/42', number: 42, body: 'body text' })
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

  it('opens the PR against a caller-supplied base instead of the default', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({
        html_url: 'https://github.com/baloise/design-system/pull/42',
        number: 42,
        body: 'body text',
      }),
    )
    vi.stubGlobal('fetch', fetchMock)

    await openPullRequest('toky/update-123', 'Update tokens', 'body text', 'release/2026-08')

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(JSON.parse(init.body as string)).toEqual({
      title: 'Update tokens',
      head: 'toky/update-123',
      base: 'release/2026-08',
      body: 'body text',
    })
  })
})

describe('findOpenPullRequest', () => {
  it('returns the first open PR for the given branch, including its body', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        jsonResponse([
          { html_url: 'https://github.com/baloise/design-system/pull/7', number: 7, body: 'existing body' },
        ]),
      )
    vi.stubGlobal('fetch', fetchMock)

    const result = await findOpenPullRequest('toky/update-next')

    expect(result).toEqual({
      url: 'https://github.com/baloise/design-system/pull/7',
      number: 7,
      body: 'existing body',
    })
    const [url] = fetchMock.mock.calls[0] as [string]
    expect(url).toBe(
      'https://api.github.com/repos/baloise/design-system/pulls?head=baloise:toky/update-next&state=open',
    )
  })

  it('returns null when there is no open PR for the branch', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse([])))
    await expect(findOpenPullRequest('toky/update-next')).resolves.toBeNull()
  })

  it('throws a descriptive error on a non-OK response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('nope', { status: 500 })))
    await expect(findOpenPullRequest('toky/update-next')).rejects.toThrow(/500/)
  })
})

describe('updatePullRequestBody', () => {
  it('PATCHes the pull request with the new body', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    vi.stubGlobal('fetch', fetchMock)

    await updatePullRequestBody(42, 'new body')

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('https://api.github.com/repos/baloise/design-system/pulls/42')
    expect(init.method).toBe('PATCH')
    expect(JSON.parse(init.body as string)).toEqual({ body: 'new body' })
  })

  it('throws a descriptive error on a non-OK response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('nope', { status: 500 })))
    await expect(updatePullRequestBody(42, 'new body')).rejects.toThrow(/500/)
  })
})

describe('workingBranchFor', () => {
  it('flattens slashes in the base into a single path segment', () => {
    expect(workingBranchFor('next')).toBe('toky/update-next')
    expect(workingBranchFor('release/2026-08')).toBe('toky/update-release-2026-08')
  })
})

describe('resolveReadRef', () => {
  it('reads from base directly when no working branch exists yet', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('not found', { status: 404 })))

    const result = await resolveReadRef('next')

    expect(result).toEqual({ ref: 'next', status: { state: 'synced', prUrl: null, prNumber: null } })
  })

  it('reads from the working branch and reports pending when it has an open PR', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ object: { sha: 'sha' } })) // branchExists
      .mockResolvedValueOnce(jsonResponse([{ html_url: 'https://github.com/baloise/design-system/pull/7', number: 7 }])) // findOpenPullRequest
    vi.stubGlobal('fetch', fetchMock)

    const result = await resolveReadRef('next')

    expect(result).toEqual({
      ref: 'toky/update-next',
      status: { state: 'pending', prUrl: 'https://github.com/baloise/design-system/pull/7', prNumber: 7 },
    })
  })

  it('reports pending with no PR link when the branch exists but has no open PR', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ object: { sha: 'sha' } }))
      .mockResolvedValueOnce(jsonResponse([]))
    vi.stubGlobal('fetch', fetchMock)

    const result = await resolveReadRef('next')

    expect(result).toEqual({
      ref: 'toky/update-next',
      status: { state: 'pending', prUrl: null, prNumber: null },
    })
  })
})
