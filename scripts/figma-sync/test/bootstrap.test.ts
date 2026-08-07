import { describe, expect, it } from 'vitest'
import { buildBootstrapPayload, resolveBootstrapIds } from '../lib/bootstrap.mjs'

describe('buildBootstrapPayload', () => {
  it('creates one collection and renames its auto-created default mode to Base', () => {
    const { variableCollections, variableModes, collectionTempId, baseModeTempId } = buildBootstrapPayload(['Tcs'])

    expect(variableCollections).toEqual([
      { action: 'CREATE', id: collectionTempId, name: 'Design Tokens', initialModeId: baseModeTempId },
    ])
    expect(variableModes[0]).toEqual({
      action: 'UPDATE',
      id: baseModeTempId,
      name: 'Base',
      variableCollectionId: collectionTempId,
    })
  })

  it('creates one additional mode per brand', () => {
    const { variableModes, collectionTempId } = buildBootstrapPayload(['Tcs', 'Foo'])
    expect(variableModes.slice(1)).toEqual([
      { action: 'CREATE', id: 'temp-mode-Tcs', name: 'Tcs', variableCollectionId: collectionTempId },
      { action: 'CREATE', id: 'temp-mode-Foo', name: 'Foo', variableCollectionId: collectionTempId },
    ])
  })

  it('defaults the collection name to "Design Tokens" but accepts an override', () => {
    expect(buildBootstrapPayload([]).variableCollections[0].name).toBe('Design Tokens')
    expect(buildBootstrapPayload([], 'My Tokens').variableCollections[0].name).toBe('My Tokens')
  })
})

describe('resolveBootstrapIds', () => {
  it('maps every temp id in the payload to its real id from tempIdToRealId', () => {
    const bootstrap = buildBootstrapPayload(['Tcs'])
    const tempIdToRealId = {
      [bootstrap.collectionTempId]: 'VariableCollectionId:1:1',
      [bootstrap.baseModeTempId]: 'm-1',
      'temp-mode-Tcs': 'm-2',
    }

    expect(resolveBootstrapIds(bootstrap, tempIdToRealId)).toEqual({
      collectionId: 'VariableCollectionId:1:1',
      modeIdByBrand: { Base: 'm-1', Tcs: 'm-2' },
    })
  })

  it('throws with the raw response if any temp id failed to resolve, rather than silently continuing with an undefined id', () => {
    const bootstrap = buildBootstrapPayload(['Tcs'])
    const incomplete = { [bootstrap.collectionTempId]: 'VariableCollectionId:1:1', [bootstrap.baseModeTempId]: 'm-1' } // missing Tcs mode
    expect(() => resolveBootstrapIds(bootstrap, incomplete)).toThrow(/didn't resolve every temp id/)
  })
})
