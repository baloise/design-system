// Server-side Figma REST client for Pull (from Figma) — see
// docs/adr/0002-pull-from-figma-button.md. Hand-rolled the same way
// scripts/figma-sync/lib/figma.mjs is: no SDK, a single endpoint, no
// pagination. Deliberately not imported from there — that file is Node-only
// (outside apps/toky's module boundary) and this repo's existing pattern is
// to reimplement the small equivalent per app rather than cross-import
// (see github.ts vs. scripts/figma-sync/lib/github.mjs).

export interface FigmaVariable {
  id: string
  name: string
  variableCollectionId: string
  resolvedType: string
  valuesByMode: Record<string, unknown>
  scopes: string[]
}

export interface FigmaVariableCollection {
  id: string
  name: string
  modes: { modeId: string; name: string }[]
  defaultModeId: string
}

export interface FigmaVariablesMeta {
  variables: Record<string, FigmaVariable>
  variableCollections: Record<string, FigmaVariableCollection>
}

export function requireFigmaApiToken(): string {
  const token = process.env.FIGMA_API_TOKEN
  if (!token) {
    throw new Error('FIGMA_API_TOKEN is not set — a Figma personal access token is required to pull from Figma.')
  }
  return token
}

export function requireFigmaFileKey(): string {
  const fileKey = process.env.FIGMA_FILE_KEY
  if (!fileKey) {
    throw new Error('FIGMA_FILE_KEY is not set — the Figma file key is required to pull from Figma.')
  }
  return fileKey
}

export async function getFigmaVariables(fileKey: string, token: string): Promise<FigmaVariablesMeta> {
  const response = await fetch(`https://api.figma.com/v1/files/${fileKey}/variables/local`, {
    // Always fetch live — a pull must never show a stale cached snapshot of
    // Figma's variables (same reasoning as fetchBaseTokensFile's no-store).
    cache: 'no-store',
    headers: {
      'X-Figma-Token': token,
    },
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Failed to fetch Figma variables: ${response.status} ${response.statusText} — ${body}`)
  }

  const json = (await response.json()) as { meta: FigmaVariablesMeta }
  return json.meta
}
