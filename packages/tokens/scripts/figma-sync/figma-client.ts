export interface FigmaVariableAlias {
  type: 'VARIABLE_ALIAS'
  id: string
}

export interface FigmaColorValue {
  r: number
  g: number
  b: number
  a: number
}

export type FigmaVariableValue = FigmaColorValue | FigmaVariableAlias | number | string | boolean

export interface FigmaVariableMode {
  modeId: string
  name: string
}

export interface FigmaVariableCollection {
  id: string
  name: string
  modes: FigmaVariableMode[]
  defaultModeId: string
  variableIds: string[]
}

export type FigmaVariableResolvedType = 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN'

export interface FigmaVariable {
  id: string
  name: string
  resolvedType: FigmaVariableResolvedType
  variableCollectionId: string
  scopes: string[]
  description: string
  valuesByMode: Record<string, FigmaVariableValue>
}

export interface FigmaVariablesResponse {
  status: number
  error: boolean
  meta: {
    variableCollections: Record<string, FigmaVariableCollection>
    variables: Record<string, FigmaVariable>
  }
}

/**
 * Fetches local Variables for a Figma file. Requires an Enterprise org and a
 * PAT with the Variables read scope: https://www.figma.com/developers/api#variables
 */
export async function fetchLocalVariables(fileKey: string, token: string): Promise<FigmaVariablesResponse> {
  const response = await fetch(`https://api.figma.com/v1/files/${fileKey}/variables/local`, {
    headers: { 'X-Figma-Token': token },
  })

  if (!response.ok) {
    throw new Error(`Figma API request failed: ${response.status} ${response.statusText}`)
  }

  const body = (await response.json()) as FigmaVariablesResponse
  if (body.error) {
    throw new Error(`Figma API returned an error for file ${fileKey}`)
  }

  return body
}
