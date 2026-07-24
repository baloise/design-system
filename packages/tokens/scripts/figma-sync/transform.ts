import { figmaColorToTokenValue } from './color.js'
import type { FigmaVariable, FigmaVariablesResponse } from './figma-client.js'

export type TokenType = 'color' | 'number' | 'string' | 'boolean'

export interface TokenNode {
  $type: TokenType
  $value: unknown
  $description?: string
  $extensions: {
    'com.figma.variableId': string
    'com.figma.scopes': string[]
  }
}

export interface TokenTree {
  [key: string]: TokenNode | TokenTree
}

export function isTokenNode(value: TokenNode | TokenTree): value is TokenNode {
  return typeof value === 'object' && value !== null && '$value' in value
}

const RESOLVED_TYPE_TO_TOKEN_TYPE: Record<FigmaVariable['resolvedType'], TokenType> = {
  COLOR: 'color',
  FLOAT: 'number',
  STRING: 'string',
  BOOLEAN: 'boolean',
}

function isAlias(value: unknown): value is { type: 'VARIABLE_ALIAS'; id: string } {
  return typeof value === 'object' && value !== null && (value as { type?: string }).type === 'VARIABLE_ALIAS'
}

function setPath(tree: TokenTree, segments: string[], leaf: TokenNode): void {
  let node = tree
  for (let i = 0; i < segments.length - 1; i++) {
    const key = segments[i]
    const existing = node[key]
    if (existing === undefined) {
      node[key] = {}
    }
    node = node[key] as TokenTree
  }
  node[segments[segments.length - 1]] = leaf
}

/**
 * Builds the full nested token tree for one Figma mode (e.g. "Base" or
 * "Tcs") from a single Variables collection. Every variable that has a value
 * for that mode is included — brand-level trimming to only the tokens that
 * differ from Base happens separately, in diff.ts.
 */
export function buildModeTree(
  response: FigmaVariablesResponse,
  collectionId: string,
  modeName: string,
): { tree: TokenTree; modeId: string } {
  const collection = response.meta.variableCollections[collectionId]
  if (!collection) {
    throw new Error(`Figma variable collection ${collectionId} not found in response`)
  }

  const mode = collection.modes.find((candidate) => candidate.name === modeName)
  if (!mode) {
    throw new Error(
      `Mode "${modeName}" not found on collection "${collection.name}". Available modes: ${collection.modes
        .map((candidate) => candidate.name)
        .join(', ')}`,
    )
  }

  const tree: TokenTree = {}

  for (const variable of Object.values(response.meta.variables)) {
    if (variable.variableCollectionId !== collectionId) continue

    const value = variable.valuesByMode[mode.modeId]
    if (value === undefined) continue

    const leaf: TokenNode = {
      $type: RESOLVED_TYPE_TO_TOKEN_TYPE[variable.resolvedType],
      $value: resolveValue(response, variable, value),
      $extensions: {
        'com.figma.variableId': variable.id,
        'com.figma.scopes': variable.scopes,
      },
    }
    if (variable.description) {
      leaf.$description = variable.description
    }

    setPath(tree, variable.name.split('/'), leaf)
  }

  return { tree, modeId: mode.modeId }
}

function resolveValue(response: FigmaVariablesResponse, variable: FigmaVariable, value: unknown): unknown {
  if (isAlias(value)) {
    const target = response.meta.variables[value.id]
    if (!target) {
      throw new Error(`Variable "${variable.name}" aliases unknown variable id "${value.id}"`)
    }
    return `{${target.name.split('/').join('.')}}`
  }

  if (variable.resolvedType === 'COLOR') {
    return figmaColorToTokenValue(value as { r: number; g: number; b: number; a: number })
  }

  return value
}
