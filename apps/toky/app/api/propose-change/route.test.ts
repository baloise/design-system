import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { TokenDiffEntry } from '@/src/tokens/edit'

const {
  getBaseTokensFileMeta,
  getBrandTokensFileMeta,
  listTokenBrandFiles,
  resolveReadRef,
  createBranch,
  updateFileOnBranch,
  updateFileAtPath,
  createFileOnBranch,
  createBrandFile,
  addBrandToIndex,
  openPullRequest,
  findOpenPullRequest,
  updatePullRequestBody,
} = vi.hoisted(() => ({
  getBaseTokensFileMeta: vi.fn(),
  getBrandTokensFileMeta: vi.fn(),
  listTokenBrandFiles: vi.fn(),
  resolveReadRef: vi.fn(),
  createBranch: vi.fn(),
  updateFileOnBranch: vi.fn(),
  updateFileAtPath: vi.fn(),
  createFileOnBranch: vi.fn(),
  createBrandFile: vi.fn(),
  addBrandToIndex: vi.fn(),
  openPullRequest: vi.fn(),
  findOpenPullRequest: vi.fn(),
  updatePullRequestBody: vi.fn(),
}))

vi.mock('@/src/tokens/github-write', async importOriginal => {
  const actual = await importOriginal<typeof import('@/src/tokens/github-write')>()
  return {
    ...actual,
    getBaseTokensFileMeta,
    getBrandTokensFileMeta,
    listTokenBrandFiles,
    resolveReadRef,
    createBranch,
    updateFileOnBranch,
    updateFileAtPath,
    createFileOnBranch,
    createBrandFile,
    addBrandToIndex,
    openPullRequest,
    findOpenPullRequest,
    updatePullRequestBody,
  }
})

const { POST } = await import('./route')

const fixtureDoc = {
  '🌐 Global': {
    '🌈 Color': {
      White: { $type: 'color', $value: { hex: '#FFFFFF' } },
    },
  },
}

function makeRequest(body: unknown): Request {
  return new Request('http://localhost/api/propose-change', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

const cleanDiff: TokenDiffEntry[] = [
  {
    kind: 'update',
    layer: 'Global',
    oldPath: ['🌐 Global', '🌈 Color', 'White'],
    newPath: ['🌐 Global', '🌈 Color', 'White'],
    type: 'color',
    value: { hex: '#EEEEEE' },
    before: { hex: '#FFFFFF' }, // matches fixtureDoc's current value — clean
  },
]

const tcsFixtureDoc = {
  '🌐 Global': {
    '🌈 Color': {
      Black: { $type: 'color', $value: { hex: '#000000' } },
    },
  },
}

beforeEach(() => {
  vi.clearAllMocks()
  getBaseTokensFileMeta.mockResolvedValue({ sha: 'file-sha', content: fixtureDoc })
  getBrandTokensFileMeta.mockResolvedValue({ sha: 'tcs-sha', content: tcsFixtureDoc })
  listTokenBrandFiles.mockResolvedValue(['Tcs'])
  resolveReadRef.mockResolvedValue({ ref: 'next', status: { state: 'synced', prUrl: null, prNumber: null } })
  createBranch.mockResolvedValue(undefined)
  updateFileOnBranch.mockResolvedValue(undefined)
  updateFileAtPath.mockResolvedValue(undefined)
  createFileOnBranch.mockResolvedValue(undefined)
  createBrandFile.mockResolvedValue(undefined)
  addBrandToIndex.mockResolvedValue(undefined)
  openPullRequest.mockResolvedValue({
    url: 'https://github.com/baloise/design-system/pull/7',
    number: 7,
    body: 'initial body',
  })
  findOpenPullRequest.mockResolvedValue(null)
  updatePullRequestBody.mockResolvedValue(undefined)
})

describe('POST /api/propose-change', () => {
  it('rejects an empty diff without touching GitHub', async () => {
    const response = await POST(makeRequest({ diff: [], description: '' }))
    expect(response.status).toBe(400)
    expect(resolveReadRef).not.toHaveBeenCalled()
  })

  it('returns a 409 conflict and opens nothing when the current value differs from "before"', async () => {
    const diff: TokenDiffEntry[] = [
      {
        kind: 'update',
        layer: 'Global',
        oldPath: ['🌐 Global', '🌈 Color', 'White'],
        newPath: ['🌐 Global', '🌈 Color', 'White'],
        type: 'color',
        value: { hex: '#EEEEEE' },
        before: { hex: '#000000' }, // stale — doesn't match fixtureDoc's current #FFFFFF
      },
    ]

    const response = await POST(makeRequest({ diff, description: '' }))
    expect(response.status).toBe(409)
    const json = await response.json()
    expect(json.conflicts).toEqual([{ path: '🌐 Global.🌈 Color.White', reason: 'changed' }])
    expect(createBranch).not.toHaveBeenCalled()
    expect(updateFileOnBranch).not.toHaveBeenCalled()
    expect(openPullRequest).not.toHaveBeenCalled()
  })

  it('returns a 409 conflict when a create target already exists', async () => {
    const diff: TokenDiffEntry[] = [
      {
        kind: 'create',
        layer: 'Global',
        oldPath: null,
        newPath: ['🌐 Global', '🌈 Color', 'White'],
        type: 'color',
        value: { hex: '#123456' },
        before: undefined,
      },
    ]

    const response = await POST(makeRequest({ diff, description: '' }))
    expect(response.status).toBe(409)
    const json = await response.json()
    expect(json.conflicts).toEqual([{ path: '🌐 Global.🌈 Color.White', reason: 'already-exists' }])
  })

  it('creates a branch, updates the file, adds a changeset, and opens a PR the first time', async () => {
    const response = await POST(makeRequest({ diff: cleanDiff, description: 'Lighten white slightly' }))
    expect(response.status).toBe(200)
    const json = await response.json()
    expect(json).toEqual({ url: 'https://github.com/baloise/design-system/pull/7', number: 7 })

    expect(resolveReadRef).toHaveBeenCalledWith('next')
    expect(createBranch).toHaveBeenCalledTimes(1)
    expect(updateFileOnBranch).toHaveBeenCalledTimes(1)
    expect(createFileOnBranch).toHaveBeenCalledTimes(1)
    expect(openPullRequest).toHaveBeenCalledTimes(1)
    expect(findOpenPullRequest).not.toHaveBeenCalled()
    expect(updatePullRequestBody).not.toHaveBeenCalled()

    const [branch, , sha] = updateFileOnBranch.mock.calls[0]
    expect(branch).toBe('toky/update-next')
    expect(sha).toBe('file-sha') // read from base (synced) — base's sha

    const [changesetBranch, changesetPath, changesetContent] = createFileOnBranch.mock.calls[0]
    expect(changesetBranch).toBe('toky/update-next')
    expect(changesetPath).toMatch(/^\.changeset\/toky-update-next-\d+\.md$/)
    expect(changesetContent).toContain("'@baloise/ds-tokens': patch")
    expect(changesetContent).toContain('**tokens**: Lighten white slightly')

    expect(getBaseTokensFileMeta).toHaveBeenCalledWith('next')
    const [, baseRef] = createBranch.mock.calls[0]
    expect(baseRef).toBe('next')
    const [prBranch, , , base] = openPullRequest.mock.calls[0]
    expect(prBranch).toBe('toky/update-next')
    expect(base).toBe('next')
  })

  it('labels an entry as "via Figma pull" in the PR body when its path is in pulledPaths', async () => {
    await POST(
      makeRequest({
        diff: cleanDiff,
        description: '',
        pulledPaths: ['🌐 Global.🌈 Color.White'],
      }),
    )

    const [, , prBody] = openPullRequest.mock.calls[0]
    expect(prBody).toContain('**Updated (via Figma pull):**\n- 🌐 Global.🌈 Color.White: #FFFFFF → #EEEEEE')
    expect(prBody).not.toMatch(/\*\*Updated:\*\*/)
  })

  it('ignores a pulledPaths entry that does not match any diff path', async () => {
    await POST(makeRequest({ diff: cleanDiff, description: '', pulledPaths: ['not.a.real.path'] }))

    const [, , prBody] = openPullRequest.mock.calls[0]
    expect(prBody).toContain('**Updated:**\n- 🌐 Global.🌈 Color.White: #FFFFFF → #EEEEEE')
    expect(prBody).not.toMatch(/via Figma pull/)
  })

  it('shows the new value for a created token', async () => {
    const createDiff: TokenDiffEntry[] = [
      {
        kind: 'create',
        layer: 'Global',
        oldPath: null,
        newPath: ['🌐 Global', '🌈 Color', 'Brand'],
        type: 'color',
        value: { hex: '#123456' },
        before: undefined,
      },
    ]

    await POST(makeRequest({ diff: createDiff, description: '' }))

    const [, , prBody] = openPullRequest.mock.calls[0]
    expect(prBody).toContain('**Created:**\n- 🌐 Global.🌈 Color.Brand = #123456')
  })

  it('notes a figmaId-only update (Pull adoption backfill) without a value change', async () => {
    const linkOnlyDiff: TokenDiffEntry[] = [
      {
        kind: 'update',
        layer: 'Global',
        oldPath: ['🌐 Global', '🌈 Color', 'White'],
        newPath: ['🌐 Global', '🌈 Color', 'White'],
        type: 'color',
        value: { hex: '#FFFFFF' },
        before: { hex: '#FFFFFF' }, // unchanged — only the figmaId link is new
        figmaId: 'VariableID:38:2',
      },
    ]

    await POST(makeRequest({ diff: linkOnlyDiff, description: '' }))

    const [, , prBody] = openPullRequest.mock.calls[0]
    expect(prBody).toContain(
      '**Updated:**\n- 🌐 Global.🌈 Color.White (linked to Figma variable VariableID:38:2, value unchanged)',
    )
  })

  it('shows a rename combined with a value change', async () => {
    const renameAndValueDiff: TokenDiffEntry[] = [
      {
        kind: 'update',
        layer: 'Global',
        oldPath: ['🌐 Global', '🌈 Color', 'White'],
        newPath: ['🌐 Global', '🌈 Color', 'OffWhite'],
        type: 'color',
        value: { hex: '#EEEEEE' },
        before: { hex: '#FFFFFF' },
      },
    ]

    await POST(makeRequest({ diff: renameAndValueDiff, description: '' }))

    const [, , prBody] = openPullRequest.mock.calls[0]
    expect(prBody).toContain(
      '**Updated:**\n- 🌐 Global.🌈 Color.White → 🌐 Global.🌈 Color.OffWhite: #FFFFFF → #EEEEEE',
    )
  })

  it('shows the removed value for a deleted token', async () => {
    const deleteDiff: TokenDiffEntry[] = [
      {
        kind: 'delete',
        layer: 'Global',
        oldPath: ['🌐 Global', '🌈 Color', 'White'],
        newPath: null,
        type: 'color',
        value: undefined,
        before: fixtureDoc['🌐 Global']['🌈 Color'].White.$value, // matches current value — clean
      },
    ]

    await POST(makeRequest({ diff: deleteDiff, description: '' }))

    const [, , prBody] = openPullRequest.mock.calls[0]
    expect(prBody).toContain('**Deleted:**\n- 🌐 Global.🌈 Color.White (was #FFFFFF)')
  })

  it('reuses the existing branch and appends to the open PR body on a second submit', async () => {
    resolveReadRef.mockResolvedValue({
      ref: 'toky/update-next',
      status: {
        state: 'pending',
        prUrl: 'https://github.com/baloise/design-system/pull/7',
        prNumber: 7,
      },
    })
    getBaseTokensFileMeta.mockResolvedValue({ sha: 'branch-file-sha', content: fixtureDoc })
    findOpenPullRequest.mockResolvedValue({
      url: 'https://github.com/baloise/design-system/pull/7',
      number: 7,
      body: 'Submitted via the Toky web app.\n\n**Updated:** old.path',
    })

    const response = await POST(makeRequest({ diff: cleanDiff, description: 'Another round of edits' }))
    expect(response.status).toBe(200)
    const json = await response.json()
    expect(json).toEqual({ url: 'https://github.com/baloise/design-system/pull/7', number: 7 })

    expect(createBranch).not.toHaveBeenCalled()
    expect(openPullRequest).not.toHaveBeenCalled()
    expect(getBaseTokensFileMeta).toHaveBeenCalledWith('toky/update-next')

    // Uses the branch's own current file sha, not base's, since the branch
    // may already carry an earlier unmerged commit.
    const [, , sha] = updateFileOnBranch.mock.calls[0]
    expect(sha).toBe('branch-file-sha')

    // Appends to the existing body — the prior submit's activity log entry
    // must survive, not get overwritten.
    expect(updatePullRequestBody).toHaveBeenCalledTimes(1)
    const [prNumber, newBody] = updatePullRequestBody.mock.calls[0]
    expect(prNumber).toBe(7)
    expect(newBody).toContain('**Updated:** old.path')
    expect(newBody).toContain('Additional changes')
    expect(newBody).toContain('Another round of edits')
  })

  it('falls back to opening a new PR if the branch exists but has no open PR', async () => {
    resolveReadRef.mockResolvedValue({
      ref: 'toky/update-next',
      status: { state: 'pending', prUrl: null, prNumber: null },
    })
    getBaseTokensFileMeta.mockResolvedValue({ sha: 'branch-file-sha', content: fixtureDoc })
    findOpenPullRequest.mockResolvedValue(null)
    openPullRequest.mockResolvedValue({
      url: 'https://github.com/baloise/design-system/pull/11',
      number: 11,
      body: 'initial body',
    })

    const response = await POST(makeRequest({ diff: cleanDiff, description: '' }))
    expect(response.status).toBe(200)
    const json = await response.json()
    expect(json).toEqual({ url: 'https://github.com/baloise/design-system/pull/11', number: 11 })

    expect(createBranch).not.toHaveBeenCalled()
    expect(openPullRequest).toHaveBeenCalledTimes(1)
    expect(updatePullRequestBody).not.toHaveBeenCalled()
  })

  it('opens the PR against a caller-supplied target branch', async () => {
    resolveReadRef.mockResolvedValue({
      ref: 'release/2026-08',
      status: { state: 'synced', prUrl: null, prNumber: null },
    })

    const response = await POST(makeRequest({ diff: cleanDiff, description: '', targetBranch: 'release/2026-08' }))
    expect(response.status).toBe(200)

    expect(resolveReadRef).toHaveBeenCalledWith('release/2026-08')
    expect(getBaseTokensFileMeta).toHaveBeenCalledWith('release/2026-08')
    const [, baseRef] = createBranch.mock.calls[0]
    expect(baseRef).toBe('release/2026-08')
    const [, , , base] = openPullRequest.mock.calls[0]
    expect(base).toBe('release/2026-08')
  })

  it('rejects a malformed target branch name without touching GitHub', async () => {
    const response = await POST(makeRequest({ diff: cleanDiff, description: '', targetBranch: 'has a space' }))
    expect(response.status).toBe(400)
    expect(resolveReadRef).not.toHaveBeenCalled()
  })

  it('creates a brand file, wires it into the build, and skips the token-file write when there is no diff', async () => {
    const response = await POST(makeRequest({ diff: [], description: '', newBrands: ['Acme'] }))
    expect(response.status).toBe(200)
    const json = await response.json()
    expect(json).toEqual({ url: 'https://github.com/baloise/design-system/pull/7', number: 7 })

    expect(updateFileOnBranch).not.toHaveBeenCalled()
    expect(createBrandFile).toHaveBeenCalledWith('toky/update-next', 'Acme')
    expect(addBrandToIndex).toHaveBeenCalledWith('toky/update-next', 'Acme')

    const [, , changesetContent] = createFileOnBranch.mock.calls[0]
    expect(changesetContent).toContain("'@baloise/ds-tokens': minor")
    expect(changesetContent).toContain('**Created brand:** Acme')
  })

  it('submits a brand alongside a token diff in the same PR', async () => {
    const response = await POST(
      makeRequest({ diff: cleanDiff, description: 'Update white, add Acme', newBrands: ['Acme'] }),
    )
    expect(response.status).toBe(200)

    expect(updateFileOnBranch).toHaveBeenCalledTimes(1)
    expect(createBrandFile).toHaveBeenCalledWith('toky/update-next', 'Acme')
    expect(addBrandToIndex).toHaveBeenCalledWith('toky/update-next', 'Acme')
  })

  it('rejects a badly-formatted brand name with a 400 before touching GitHub', async () => {
    const response = await POST(makeRequest({ diff: [], description: '', newBrands: ['acme'] }))
    expect(response.status).toBe(400)
    expect(resolveReadRef).not.toHaveBeenCalled()
  })

  it('rejects "Base" as a reserved brand name', async () => {
    const response = await POST(makeRequest({ diff: [], description: '', newBrands: ['Base'] }))
    expect(response.status).toBe(400)
  })

  it('rejects the same brand name submitted twice in one request', async () => {
    const response = await POST(makeRequest({ diff: [], description: '', newBrands: ['Acme', 'Acme'] }))
    expect(response.status).toBe(400)
  })

  it('409s when the brand name already exists on GitHub, without creating anything', async () => {
    listTokenBrandFiles.mockResolvedValue(['Tcs', 'Acme'])

    const response = await POST(makeRequest({ diff: [], description: '', newBrands: ['Acme'] }))
    expect(response.status).toBe(409)
    const json = await response.json()
    expect(json.conflicts).toEqual([{ path: 'Acme', reason: 'already-exists' }])
    expect(createBrandFile).not.toHaveBeenCalled()
    expect(createBranch).not.toHaveBeenCalled()
  })

  describe('brandDiffs (overriding an existing brand)', () => {
    const tcsCleanDiff: TokenDiffEntry[] = [
      {
        kind: 'update',
        layer: 'Global',
        oldPath: ['🌐 Global', '🌈 Color', 'Black'],
        newPath: ['🌐 Global', '🌈 Color', 'Black'],
        type: 'color',
        value: { hex: '#111111' },
        before: { hex: '#000000' }, // matches tcsFixtureDoc's current value — clean
      },
    ]

    it('writes the brand overrides to its own file using its own sha', async () => {
      const response = await POST(makeRequest({ diff: [], description: '', brandDiffs: { Tcs: tcsCleanDiff } }))
      expect(response.status).toBe(200)

      expect(getBrandTokensFileMeta).toHaveBeenCalledWith('Tcs', 'next')
      expect(updateFileAtPath).toHaveBeenCalledTimes(1)
      const [branch, path, content, sha] = updateFileAtPath.mock.calls[0]
      expect(branch).toBe('toky/update-next')
      expect(path).toBe('packages/tokens/tokens/Tcs.tokens.json')
      expect(sha).toBe('tcs-sha')
      expect(JSON.parse(content)).toEqual({
        '🌐 Global': { '🌈 Color': { Black: { $type: 'color', $value: { hex: '#111111' } } } },
      })
      // A brand-only change isn't a token edit — Base's own file is untouched.
      expect(updateFileOnBranch).not.toHaveBeenCalled()
    })

    it('409s when the brand file changed since the diff was computed', async () => {
      const staleDiff: TokenDiffEntry[] = [
        { ...tcsCleanDiff[0], before: { hex: '#ABCDEF' } }, // stale — doesn't match tcsFixtureDoc's #000000
      ]

      const response = await POST(makeRequest({ diff: [], description: '', brandDiffs: { Tcs: staleDiff } }))
      expect(response.status).toBe(409)
      const json = await response.json()
      expect(json.conflicts).toEqual([{ path: 'Tcs: 🌐 Global.🌈 Color.Black', reason: 'changed' }])
      expect(updateFileAtPath).not.toHaveBeenCalled()
    })

    it('400s when the brand no longer exists and is not being created in the same request', async () => {
      listTokenBrandFiles.mockResolvedValue([]) // Tcs no longer on GitHub

      const response = await POST(makeRequest({ diff: [], description: '', brandDiffs: { Tcs: tcsCleanDiff } }))
      expect(response.status).toBe(400)
      expect(getBrandTokensFileMeta).not.toHaveBeenCalled()
    })

    it('bakes overrides directly into the initial file when creating and overriding the same brand', async () => {
      const acmeDiff: TokenDiffEntry[] = [
        {
          kind: 'create',
          layer: 'Global',
          oldPath: null,
          newPath: ['🌐 Global', '🌈 Color', 'White'],
          type: 'color',
          value: { hex: '#EEEEEE' },
          before: undefined,
        },
      ]

      const response = await POST(
        makeRequest({
          diff: [],
          description: '',
          newBrands: ['Acme'],
          brandDiffs: { Acme: acmeDiff },
        }),
      )
      expect(response.status).toBe(200)

      expect(createBrandFile).not.toHaveBeenCalled()
      expect(getBrandTokensFileMeta).not.toHaveBeenCalledWith('Acme', expect.anything())
      const [branch, path, content] = createFileOnBranch.mock.calls.find(
        call => call[1] === 'packages/tokens/tokens/Acme.tokens.json',
      )!
      expect(branch).toBe('toky/update-next')
      expect(path).toBe('packages/tokens/tokens/Acme.tokens.json')
      expect(JSON.parse(content)).toEqual({
        '🌐 Global': { '🌈 Color': { White: { $type: 'color', $value: { hex: '#EEEEEE' } } } },
      })
      expect(addBrandToIndex).toHaveBeenCalledWith('toky/update-next', 'Acme')
    })

    it('mentions brand overrides in the changeset and PR body', async () => {
      const response = await POST(makeRequest({ diff: [], description: '', brandDiffs: { Tcs: tcsCleanDiff } }))
      expect(response.status).toBe(200)

      const [, , changesetContent] = createFileOnBranch.mock.calls[0]
      expect(changesetContent).toContain('**Tcs — Overridden:** 🌐 Global/🌈 Color/Black')

      const [, , prBody] = openPullRequest.mock.calls[0]
      expect(prBody).toContain('**Tcs — Overridden:**\n- 🌐 Global.🌈 Color.Black: #000000 → #111111')
    })
  })
})
