import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { TokenDiffEntry } from '@/src/tokens/edit'

const { getBaseTokensFileMeta, createBranch, updateFileOnBranch, openPullRequest } = vi.hoisted(() => ({
  getBaseTokensFileMeta: vi.fn(),
  createBranch: vi.fn(),
  updateFileOnBranch: vi.fn(),
  openPullRequest: vi.fn(),
}))

vi.mock('@/src/tokens/github-write', () => ({
  getBaseTokensFileMeta,
  createBranch,
  updateFileOnBranch,
  openPullRequest,
}))

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

beforeEach(() => {
  vi.clearAllMocks()
  getBaseTokensFileMeta.mockResolvedValue({ sha: 'file-sha', content: fixtureDoc })
})

describe('POST /api/propose-change', () => {
  it('rejects an empty diff without touching GitHub', async () => {
    const response = await POST(makeRequest({ diff: [], description: '' }))
    expect(response.status).toBe(400)
    expect(getBaseTokensFileMeta).not.toHaveBeenCalled()
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

  it('creates a branch, updates the file, and opens a PR when there is no conflict', async () => {
    createBranch.mockResolvedValue(undefined)
    updateFileOnBranch.mockResolvedValue(undefined)
    openPullRequest.mockResolvedValue({ url: 'https://github.com/baloise/design-system/pull/7', number: 7 })

    const diff: TokenDiffEntry[] = [
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

    const response = await POST(makeRequest({ diff, description: 'Lighten white slightly' }))
    expect(response.status).toBe(200)
    const json = await response.json()
    expect(json).toEqual({ url: 'https://github.com/baloise/design-system/pull/7', number: 7 })

    expect(createBranch).toHaveBeenCalledTimes(1)
    expect(updateFileOnBranch).toHaveBeenCalledTimes(1)
    expect(openPullRequest).toHaveBeenCalledTimes(1)

    const [, , sha] = updateFileOnBranch.mock.calls[0]
    expect(sha).toBe('file-sha')
  })
})
