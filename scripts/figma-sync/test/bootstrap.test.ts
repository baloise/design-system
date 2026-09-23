import { describe, expect, it } from 'vitest'
import {
  buildBootstrapPayload,
  buildResponsiveBootstrapPayload,
  resolveBootstrapIds,
  resolveResponsiveBootstrapIds,
} from '../lib/bootstrap.mjs'

describe('buildBootstrapPayload', () => {
  it('creates one collection and renames its auto-created default mode to Base', () => {
    const { variableCollections, variableModes, collectionTempId, baseModeTempId } = buildBootstrapPayload(['Zurich'])

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
    const { variableModes, collectionTempId } = buildBootstrapPayload(['Zurich', 'Foo'])
    expect(variableModes.slice(1)).toEqual([
      { action: 'CREATE', id: 'temp-mode-Zurich', name: 'Zurich', variableCollectionId: collectionTempId },
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
    const bootstrap = buildBootstrapPayload(['Zurich'])
    const tempIdToRealId = {
      [bootstrap.collectionTempId]: 'VariableCollectionId:1:1',
      [bootstrap.baseModeTempId]: 'm-1',
      'temp-mode-Zurich': 'm-2',
    }

    expect(resolveBootstrapIds(bootstrap, tempIdToRealId)).toEqual({
      collectionId: 'VariableCollectionId:1:1',
      modeIdByBrand: { Base: 'm-1', Zurich: 'm-2' },
    })
  })

  it('throws with the raw response if any temp id failed to resolve, rather than silently continuing with an undefined id', () => {
    const bootstrap = buildBootstrapPayload(['Zurich'])
    const incomplete = { [bootstrap.collectionTempId]: 'VariableCollectionId:1:1', [bootstrap.baseModeTempId]: 'm-1' } // missing Zurich mode
    expect(() => resolveBootstrapIds(bootstrap, incomplete)).toThrow(/didn't resolve every temp id/)
  })
})

describe('buildResponsiveBootstrapPayload', () => {
  it('creates one collection and renames its auto-created default mode to Mobile', () => {
    const { variableCollections, variableModes, collectionTempId, mobileModeTempId } = buildResponsiveBootstrapPayload()

    expect(variableCollections).toEqual([
      { action: 'CREATE', id: collectionTempId, name: 'Design Responsive Tokens', initialModeId: mobileModeTempId },
    ])
    expect(variableModes[0]).toEqual({
      action: 'UPDATE',
      id: mobileModeTempId,
      name: 'Mobile',
      variableCollectionId: collectionTempId,
    })
  })

  it('creates Tablet and Desktop as additional modes', () => {
    const { variableModes, collectionTempId } = buildResponsiveBootstrapPayload()
    expect(variableModes.slice(1)).toEqual([
      { action: 'CREATE', id: 'temp-mode-Tablet', name: 'Tablet', variableCollectionId: collectionTempId },
      { action: 'CREATE', id: 'temp-mode-Desktop', name: 'Desktop', variableCollectionId: collectionTempId },
    ])
  })

  it('defaults the collection name to "Design Responsive Tokens" but accepts an override', () => {
    expect(buildResponsiveBootstrapPayload().variableCollections[0].name).toBe('Design Responsive Tokens')
    expect(buildResponsiveBootstrapPayload('My Responsive Tokens').variableCollections[0].name).toBe(
      'My Responsive Tokens',
    )
  })
})

describe('resolveResponsiveBootstrapIds', () => {
  it('maps every temp id in the payload to its real id from tempIdToRealId', () => {
    const bootstrap = buildResponsiveBootstrapPayload()
    const tempIdToRealId = {
      [bootstrap.collectionTempId]: 'VariableCollectionId:2:1',
      [bootstrap.mobileModeTempId]: 'm-mobile',
      'temp-mode-Tablet': 'm-tablet',
      'temp-mode-Desktop': 'm-desktop',
    }

    expect(resolveResponsiveBootstrapIds(bootstrap, tempIdToRealId)).toEqual({
      collectionId: 'VariableCollectionId:2:1',
      modeIdByBreakpoint: { Mobile: 'm-mobile', Tablet: 'm-tablet', Desktop: 'm-desktop' },
    })
  })

  it('throws with the raw response if any temp id failed to resolve', () => {
    const bootstrap = buildResponsiveBootstrapPayload()
    const incomplete = {
      [bootstrap.collectionTempId]: 'VariableCollectionId:2:1',
      [bootstrap.mobileModeTempId]: 'm-mobile',
    } // missing Tablet/Desktop modes
    expect(() => resolveResponsiveBootstrapIds(bootstrap, incomplete)).toThrow(/didn't resolve every temp id/)
  })
})
