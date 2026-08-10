import { beforeEach, describe, expect, it, vi } from 'vitest'

const { getFigmaVariables, requireFigmaApiToken, requireFigmaFileKey } = vi.hoisted(() => ({
  getFigmaVariables: vi.fn(),
  requireFigmaApiToken: vi.fn(),
  requireFigmaFileKey: vi.fn(),
}))

vi.mock('@/src/tokens/figma', async importOriginal => {
  const actual = await importOriginal<typeof import('@/src/tokens/figma')>()
  return {
    ...actual,
    getFigmaVariables,
    requireFigmaApiToken,
    requireFigmaFileKey,
  }
})

const { GET } = await import('./route')

const fixtureMeta = {
  variables: {
    'VariableID:1:1': {
      id: 'VariableID:1:1',
      name: '🌐 Global/🌈 Color/White',
      variableCollectionId: 'VariableCollectionId:1:2',
      resolvedType: 'COLOR',
      valuesByMode: { '1:0': { r: 1, g: 1, b: 1, a: 1 } },
      scopes: [],
    },
  },
  variableCollections: {
    'VariableCollectionId:1:2': {
      id: 'VariableCollectionId:1:2',
      name: 'Tokens',
      modes: [{ modeId: '1:0', name: 'Base' }],
      defaultModeId: '1:0',
    },
  },
}

beforeEach(() => {
  vi.clearAllMocks()
  requireFigmaApiToken.mockReturnValue('figd_test-token')
  requireFigmaFileKey.mockReturnValue('test-file-key')
  getFigmaVariables.mockResolvedValue(fixtureMeta)
})

describe('GET /api/figma-pull', () => {
  it('returns the raw Figma variables meta on success', async () => {
    const response = await GET()
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual(fixtureMeta)
    expect(getFigmaVariables).toHaveBeenCalledWith('test-file-key', 'figd_test-token')
  })

  it('returns 500 without calling Figma when a required env var is missing', async () => {
    requireFigmaApiToken.mockImplementation(() => {
      throw new Error('FIGMA_API_TOKEN is not set — a Figma personal access token is required to pull from Figma.')
    })

    const response = await GET()

    expect(response.status).toBe(500)
    expect((await response.json()).error).toContain('FIGMA_API_TOKEN')
    expect(getFigmaVariables).not.toHaveBeenCalled()
  })

  it('returns 502 when the Figma API call fails', async () => {
    getFigmaVariables.mockRejectedValue(new Error('Failed to fetch Figma variables: 403 Forbidden — invalid scope'))

    const response = await GET()

    expect(response.status).toBe(502)
    expect((await response.json()).error).toContain('403')
  })
})
